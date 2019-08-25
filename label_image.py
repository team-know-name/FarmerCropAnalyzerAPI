import numpy as np
import pickle
import sys
import tensorflow
import keras
from keras.preprocessing import image
from keras.models import Sequential, load_model
from keras.layers.normalization import BatchNormalization
from keras.layers.convolutional import Conv2D
from keras.layers.convolutional import MaxPooling2D
from keras.layers.core import Activation, Flatten, Dropout, Dense
from keras.optimizers import Adam
from sklearn.preprocessing import LabelEncoder


class Model:
    def __init__(self, model_path = "model.h5", encoder_path = "encoder.pkl"):
        self.model = load_model(model_path)
        print("Model loaded")
        self.encoder = pickle.load(open(encoder_path, "rb"))
        print("Label encoder")

    def predict(self, image_path):
        img = image.load_img(path=image_path,color_mode="rgb",target_size=(256,256,3))
        print("Image loaded")
        img = image.img_to_array(img)
        # image_resize = np.array(cv2.resize(image, (256, 256), interpolation=cv2.INTER_AREA))
        # image_resize = np.reshape(image_resize, (1, 256, 256, 3))
        # output = new_model.predict(img.reshape(1,28,28,1)) # To do it for a new data point
        prediction = self.model.predict(img.reshape(1,256,256,3))
        #   print(prediction.argmax())
        return self.encoder.inverse_transform([prediction.argmax()])

def main(file_name):
    model = Model()
    print(model.predict(file_name))

if __name__ == "__main__":
    file_name = sys.argv[1];
    print(file_name)
    print(sys.version)
    main(file_name)