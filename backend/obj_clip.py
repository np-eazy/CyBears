# Required Imports
import streamlit as st
from PIL import Image
import torch
import clip
from torchvision.transforms import Compose, Resize, CenterCrop, ToTensor, Normalize
from pytorch_lightning import LightningModule, Trainer
import io

# Define the CLIP Model
class CLIPModel(LightningModule):
    def __init__(self):
        super(CLIPModel, self).__init__()
        self.model, self.preprocess = clip.load("ViT-B/32")

    def forward(self, image, text):
        return self.model(image, text)

# Define the Streamlit interface
def app():
    st.title("Image Object Identifier")

    object_description = st.text_input("Enter the description of the object")
    image_file = st.file_uploader("Upload Image", type=["png", "jpg", "jpeg"])

    if st.button("Identify"):
        if image_file and object_description:
            try:
                # Convert the uploaded file to an image
                image = Image.open(image_file)

                # Load the CLIP model
                model = CLIPModel()
                trainer = Trainer(gpus=1)
                trainer.test(model)

                # Preprocess the image and text
                image = model.preprocess(image).unsqueeze(0)
                text = clip.tokenize([object_description])

                # Run inference on the image and text
                image_features, text_features = model(image, text)

                # Calculate the cosine similarity between the image and text features
                similarity = (image_features @ text_features.T).softmax(dim=-1)

                # If the similarity is above the threshold, the object is present in the image
                if similarity > 0.5:
                    st.write("The object is present in the image")
                else:
                    st.write("The object is not present in the image")

            except Exception as e:
                st.write("Error:", str(e))
        else:
            st.write("Please enter a description and upload an image")

if __name__ == "__main__":
    app()
