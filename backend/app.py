# Import necessary modules
import streamlit as st
import torch
from tqdm.auto import tqdm
from point_e.diffusion.configs import DIFFUSION_CONFIGS, diffusion_from_config
from point_e.diffusion.sampler import PointCloudSampler
from point_e.models.download import load_checkpoint
from point_e.models.configs import MODEL_CONFIGS, model_from_config
from point_e.util.plotting import plot_point_cloud

# Set up necessary constants
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# Initialize models
base_name = 'base40M-textvec'
base_model = model_from_config(MODEL_CONFIGS[base_name], device)
base_model.eval()
base_diffusion = diffusion_from_config(DIFFUSION_CONFIGS[base_name])

upsampler_model = model_from_config(MODEL_CONFIGS['upsample'], device)
upsampler_model.eval()
upsampler_diffusion = diffusion_from_config(DIFFUSION_CONFIGS['upsample'])

# Load model weights
base_model.load_state_dict(load_checkpoint(base_name, device))
upsampler_model.load_state_dict(load_checkpoint('upsample', device))

# Set up point cloud sampler
sampler = PointCloudSampler(
    device=device,
    models=[base_model, upsampler_model],
    diffusions=[base_diffusion, upsampler_diffusion],
    num_points=[1024, 4096 - 1024],
    aux_channels=['R', 'G', 'B'],
    guidance_scale=[3.0, 0.0],
    model_kwargs_key_filter=('texts', ''), # Do not condition the upsampler at all
)

# Set up Streamlit interface
st.title('Point Cloud Model Visualization')
prompt = st.text_input('Enter a prompt:', value='a red motorcycle')
grid_size = st.slider('Grid Size', min_value=1, max_value=10, value=3)

if st.button('Generate point cloud from prompt'):
    # Use existing code for model sampling
    samples = None
    for x in tqdm(sampler.sample_batch_progressive(batch_size=1, model_kwargs=dict(texts=[prompt]))):
        samples = x
    pc = sampler.output_to_point_clouds(samples)[0]
    fig = plot_point_cloud(pc, grid_size=grid_size, fixed_bounds=((-0.75, -0.75, -0.75),(0.75, 0.75, 0.75)))

    # Display the generated plot in Streamlit
    st.pyplot(fig)
