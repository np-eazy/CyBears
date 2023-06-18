import streamlit as st
from PIL import Image
import tempfile
import base64
import plotly.graph_objects as go
import torch
from tqdm.auto import tqdm
from point_e.diffusion.configs import DIFFUSION_CONFIGS, diffusion_from_config
from point_e.diffusion.sampler import PointCloudSampler
from point_e.models.download import load_checkpoint
from point_e.models.configs import MODEL_CONFIGS, model_from_config
from point_e.util.pc_to_mesh import marching_cubes_mesh
import os

# Helper function to download PLY files
def get_ply_download_link(data, filename):
    tmp = tempfile.NamedTemporaryFile(suffix=".ply", delete=False)
    data.write_ply(tmp)
    tmp.close()
    with open(tmp.name, 'rb') as f:
        ply_data = f.read()
    os.remove(tmp.name)
    b64 = base64.b64encode(ply_data).decode()
    return f'<a href="data:application/octet-stream;base64,{b64}" download="{filename}">Download PLY file</a>'

# Setup models
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# Load base model
base_name = 'base1B' # use base300M or base1B for better results
base_model = model_from_config(MODEL_CONFIGS[base_name], device)
base_model.eval()
base_model.load_state_dict(load_checkpoint(base_name, device))

# Load upsampler model
upsampler_model = model_from_config(MODEL_CONFIGS['upsample'], device)
upsampler_model.eval()
upsampler_model.load_state_dict(load_checkpoint('upsample', device))

# Load sdf model
name = 'sdf'
model_sdf = model_from_config(MODEL_CONFIGS[name], device)
model_sdf.eval()
model_sdf.load_state_dict(load_checkpoint(name, device))

base_diffusion = diffusion_from_config(DIFFUSION_CONFIGS[base_name])
upsampler_diffusion = diffusion_from_config(DIFFUSION_CONFIGS['upsample'])

sampler = PointCloudSampler(
    device=device,
    models=[base_model, upsampler_model],
    diffusions=[base_diffusion, upsampler_diffusion],
    num_points=[1024, 4096 - 1024],
    aux_channels=['R', 'G', 'B'],
    guidance_scale=[3.0, 3.0],
)

# Streamlit App
st.title('3D Point Cloud and Mesh Generator')

# Upload image
uploaded_file = st.file_uploader("Upload Image", type=['png', 'jpg', 'jpeg'])
if uploaded_file is not None:
    img = Image.open(uploaded_file)
    st.image(img, caption='Uploaded Image', use_column_width=True)
    
    # Generate point cloud
    with st.spinner('Generating 3D point cloud...'):
        samples = None
        for x in tqdm(sampler.sample_batch_progressive(batch_size=1, model_kwargs=dict(images=[img]))):
            samples = x
        pc = sampler.output_to_point_clouds(samples)[0]

    # Show point cloud
    st.success('Generated 3D point cloud.')
    fig_plotly = go.Figure(
        data=[
            go.Scatter3d(
                x=pc.coords[:,0], y=pc.coords[:,1], z=pc.coords[:,2], 
                mode='markers',
                marker=dict(
                    size=2,
                    color=['rgb({},{},{})'.format(r,g,b) for r,g,b in zip(pc.channels["R"], pc.channels["G"], pc.channels["B"])],
                )
            )
        ],
        layout=dict(
            scene=dict(
                xaxis=dict(visible=False),
                yaxis=dict(visible=False),
                zaxis=dict(visible=False)
            )
        ),
    )

    st.plotly_chart(fig_plotly)
    download_link_pc = get_ply_download_link(pc, "point_cloud.ply")
    st.markdown(download_link_pc, unsafe_allow_html=True)

    # Produce a mesh (with vertex colors)
    with st.spinner('Generating 3D mesh...'):
        mesh = marching_cubes_mesh(
            pc=pc,
            model=model_sdf,
            batch_size=4096,
            grid_size=200, # increase to 128 for resolution used in evals
            progress=True,
        )

    st.success('Generated 3D mesh.')
    download_link_mesh = get_ply_download_link(mesh, "mesh.ply")
    st.markdown(download_link_mesh, unsafe_allow_html=True)
