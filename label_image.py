import numpy as np
import pickle
import sys
import tensorflow
import keras
from keras.preprocessing import image
from google_drive_downloader import GoogleDriveDownloader as gdd
from keras.models import Sequential, load_model
from keras.layers.normalization import BatchNormalization
from keras.layers.convolutional import Conv2D
from keras.layers.convolutional import MaxPooling2D
from keras.layers.core import Activation, Flatten, Dropout, Dense
from keras.optimizers import Adam
from sklearn.preprocessing import LabelEncoder

class Model:
    def __init__(self, model_path = "./model.h5", encoder_path = "encoder.pkl"):
        gdd.download_file_from_google_drive(file_id='1642JgezyxVSlowH9kiTuB6xCWr6KleEb',
                                            dest_path=model_path,
                                            unzip=True)
        self.model = load_model(model_path)
        self.encoder = pickle.load(open(encoder_path, "rb"))

    def download_model(self, model_url = "https://drive.google.com/file/d/1642JgezyxVSlowH9kiTuB6xCWr6KleEb/view?usp=sharing"):
        response = urllib2.urlopen(model_url)
        html = load_model(response.read())
        return html

    def predict(self, image_path):
        image_resize = image.load_img(path=image_path,color_mode="rgb",target_size=(256,256,3))
        image_resize = np.reshape(image_resize, (1, 256, 256, 3))
        prediction = self.model.predict(image_resize)
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