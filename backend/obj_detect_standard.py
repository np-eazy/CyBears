# Required Imports
import streamlit as st
from PIL import Image
import torch
from torchvision.transforms import functional as F
from pytorch_lightning import LightningModule, Trainer
import io

# Define the YOLOv5 Model
class YOLOv5(LightningModule):
    def __init__(self):
        super(YOLOv5, self).__init__()
        self.model = torch.hub.load('ultralytics/yolov5', 'yolov5s')

    def forward(self, x):
        return self.model(x)

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

                # Load the YOLOv5 model
                model = YOLOv5()
                trainer = Trainer(gpus=1)
                trainer.test(model)

                # Run object detection on the image
                results = model(image)

                # For each detection, if the label matches the object name, crop the object from the image
                for label, box in zip(results.xyxy[0][:, -1], results.xyxy[0][:, :4]):
                    if model.model.names[int(label)] == object_name:
                        cropped_image = image.crop(box)

                        # Display the cropped image
                        st.image(cropped_image)

            except Exception as e:
                st.write("Error:", str(e))
        else:
            st.write("Please enter an object name and upload an image")

if __name__ == "__main__":
    app()
