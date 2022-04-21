import face_recognition
import os

def match_faces(img1,img2):
    script_dir = os.path.dirname(__file__)
    
    uploaded = face_recognition.load_image_file(script_dir + '/images/' + img1)
    stored = face_recognition.load_image_file(script_dir + '/images/' + img2)

    uploaded_encoding = face_recognition.face_encodings(uploaded)
    stored_encoding = face_recognition.face_encodings(stored)
    
    if len(uploaded_encoding) == 0:
        return False
    
    if len(stored_encoding) == 0:
        return False
    

    results = face_recognition.compare_faces([uploaded_encoding[0]], stored_encoding[0],tolerance=0.6)
    print(results, 'in match faces',img1)
    return results[0]

