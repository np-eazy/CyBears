import streamlit as st
import trimesh
import tempfile
import base64
from pygltflib import GLTF2, BufferFormat

def create_mesh_from_gltf(file_bytes):
    # Create a new file in /tmp and write the contents of the uploaded file to it
    gltf_file_path = tempfile.mkstemp(suffix=".gltf")[1]
    with open(gltf_file_path, "wb") as f:
        f.write(file_bytes)

    # Load the mesh from the new file
    point_cloud = trimesh.load_mesh(gltf_file_path)
    
    # Create a mesh from the point cloud
    mesh = trimesh.voxel.ops.points_to_marching_cubes(point_cloud.vertices)

    return mesh

def get_gltf_download_link(mesh, filename):
    # Save the mesh as a GLTF file
    gltf_file_path = tempfile.mkstemp(suffix=".gltf")[1]
    mesh.export(gltf_file_path, file_type='glb')

    # Create a download link for the GLTF file
    with open(gltf_file_path, "rb") as f:
        bytes = f.read()
        b64 = base64.b64encode(bytes).decode()
        href = f'<a href="data:file/gltf;base64,{b64}" download="{filename}">Download GLTF file</a>'

    return href

def main():
    st.title('GLTF to Solid Mesh Converter')

    uploaded_file = st.file_uploader("Choose a GLTF file", type='gltf')
    if uploaded_file is not None:
        file_bytes = uploaded_file.read()
        mesh = create_mesh_from_gltf(file_bytes)
        st.write(mesh)

        gltf_link = get_gltf_download_link(mesh, "solid_mesh.gltf")
        st.markdown(gltf_link, unsafe_allow_html=True)

if __name__ == "__main__":
    main()