import os
import base64
import tempfile
from PIL import Image
import trimesh
import torch
from tqdm.auto import tqdm
import streamlit as st
import plotly.graph_objects as go
from point_e.diffusion.configs import DIFFUSION_CONFIGS, diffusion_from_config
from point_e.diffusion.sampler import PointCloudSampler
from point_e.models.download import load_checkpoint
from point_e.models.configs import MODEL_CONFIGS, model_from_config
from pygltflib import GLTF2, BufferFormat
import pywavefront
import numpy as np

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# Create base model
base_name = 'base1B' # use base300M or base1B for better results
base_model = model_from_config(MODEL_CONFIGS[base_name], device)
base_model.eval()
base_diffusion = diffusion_from_config(DIFFUSION_CONFIGS[base_name])

# Create upsample model
upsampler_model = model_from_config(MODEL_CONFIGS['upsample'], device)
upsampler_model.eval()
upsampler_diffusion = diffusion_from_config(DIFFUSION_CONFIGS['upsample'])

# Download base checkpoint
base_model.load_state_dict(load_checkpoint(base_name, device))

# Download upsampler checkpoint
upsampler_model.load_state_dict(load_checkpoint('upsample', device))

sampler = PointCloudSampler(
    device=device,
    models=[base_model, upsampler_model],
    diffusions=[base_diffusion, upsampler_diffusion],
    num_points=[1024, 4096 - 1024],
    aux_channels=['R', 'G', 'B'],
    guidance_scale=[3.0, 3.0],
)

def ply_to_gltf(ply_file, gltf_file):
    # Load mesh from ply file
    mesh = trimesh.load(ply_file)
    # Export to gltf
    mesh.export(gltf_file, file_type="glb")

def ply_to_gltf(ply_file, gltf_file):
    # Load mesh from ply file
    mesh = trimesh.load(ply_file)
    # Export to gltf
    mesh.export(gltf_file, file_type="glb")


def get_gltf_download_link(pc, filename):
    ply_temp = tempfile.NamedTemporaryFile(suffix=".ply", delete=False)
    pc.write_ply(ply_temp)
    ply_temp.close()

    gltf_temp = tempfile.NamedTemporaryFile(suffix=".gltf", delete=False)
    ply_to_gltf(ply_temp.name, gltf_temp.name)
    os.remove(ply_temp.name)

    with open(gltf_temp.name, 'rb') as f:
        gltf_data = f.read()
    os.remove(gltf_temp.name)

    b64 = base64.b64encode(gltf_data).decode()
    return f'<a href="data:application/octet-stream;base64,{b64}" download="{filename}">Download GLTF file</a>'

st.title('3D Point Cloud Generation from an Image')

uploaded_file = st.file_uploader("Choose an image...", type="jpg")
if uploaded_file is not None:
    img = Image.open(uploaded_file)
    samples = None
    for x in tqdm(sampler.sample_batch_progressive(batch_size=1, model_kwargs=dict(images=[img]))):
        samples = x
    pc = sampler.output_to_point_clouds(samples)[0]

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

    if pc is not None:
        gltf_link = get_gltf_download_link(pc, "generated_point_cloud.gltf")
        st.markdown(gltf_link, unsafe_allow_html=True)