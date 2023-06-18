# Required Imports
import streamlit as st
import openai
from PIL import Image
import requests
from io import BytesIO

# Define the Streamlit interface
def app():
    st.title("Image Object Cropper")

    object_name = st.text_input("Enter the object name to crop from the image")
    image_file = st.file_uploader("Upload Image", type=["png", "jpg", "jpeg"])

    if st.button("Crop"):
        if image_file and object_name:
            try:
                # Convert the uploaded file to an image
                image = Image.open(image_file)
                image.save("uploaded_image.png")

                # Call the OpenAI Image API to generate a new image where only the object is present
                response = openai.Image.create_edit(
                    image=open("uploaded_image.png", "rb"),
                    mask=open("mask.png", "rb"),
                    prompt=object_name,
                    n=1,
                    size="1024x1024"
                )

                # Get the image URL from the response
                image_url = response['data'][0]['url']

                # Download the image from the URL and display it
                image_data = requests.get(image_url).content
                image = Image.open(BytesIO(image_data))
                st.image(image, caption='Cropped image')

            except Exception as e:
                st.write("Error:", str(e))
        else:
            st.write("Please enter an object name and upload an image")

if __name__ == "__main__":
    app()
