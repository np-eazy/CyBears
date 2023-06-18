import streamlit as st
import tempfile
import base64
import open3d as o3d
import numpy as np

# Helper function to download TXT files
def get_txt_download_link(pc, filename):
    tmp = tempfile.NamedTemporaryFile(suffix=".txt", delete=False)
    data = np.asarray(pc.points, pc.colors, pc.normals)
    np.savetxt(tmp, data)
    tmp.close()
    with open(tmp.name, 'rb') as f:
        txt_data = f.read()
    b64 = base64.b64encode(txt_data).decode()
    return f'<a href="data:application/octet-stream;base64,{b64}" download="{filename}">Download TXT file</a>'

# Streamlit App
st.title('PLY to TXT Converter')

# Upload PLY file
uploaded_file = st.file_uploader("Upload PLY", type=['ply'])
if uploaded_file is not None:
    with tempfile.NamedTemporaryFile(suffix=".ply", delete=False) as tmp:
        tmp.write(uploaded_file.read())
        pc = o3d.io.read_point_cloud(tmp.name)

    st.success('Loaded PLY file.')
    download_link = get_txt_download_link(pc, "point_cloud.txt")
    st.markdown(download_link, unsafe_allow_html=True)
