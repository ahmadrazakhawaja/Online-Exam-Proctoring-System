import face_recognition
import os

def match_faces(img1,img2):
    script_dir = os.path.dirname(__file__)
    
    uploaded = face_recognition.load_image_file(script_dir + '/images/' + img1)
    stored = face_recognition.load_image_file(script_dir + '/images/' + img2)

    uploaded_encoding = face_recognition.face_encodings(uploaded)[0]
    stored_encoding = face_recognition.face_encodings(stored)[0]

    results = face_recognition.compare_faces([uploaded_encoding], stored_encoding,tolerance=0.4)

    return results

