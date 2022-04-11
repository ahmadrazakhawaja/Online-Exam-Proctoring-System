from fileinput import filename
import requests
import time
import os


script_dir = os.path.dirname(__file__)
def upload(name):
    
    filename = script_dir + '/audio/' + name


    def read_file(filename, chunk_size=5242880):
        with open(filename, 'rb') as _file:
            while True:
                data = _file.read(chunk_size)
                if not data:
                    break
                yield data

    headers = {'authorization': "58e4e7597da8422a8633b70ab1d1b784"}
    response = requests.post('https://api.assemblyai.com/v2/upload',
                            headers=headers,
                            data=read_file(filename))

    print(response.json())
    return response.json()

def checkCompletion(data):
    #old code
    endpoint = "https://api.assemblyai.com/v2/transcript"
    upload_url = data['upload_url']
    json = {
        "audio_url": upload_url
    }
    headers = {
        "authorization": "58e4e7597da8422a8633b70ab1d1b784",
        "content-type": "application/json"
    }
    response = requests.post(endpoint, json=json, headers=headers)
    transcript_id = response.json()['id']
    print(transcript_id)

    while True: 
        polling_endpoint = endpoint + '/' + transcript_id
        response = requests.get(polling_endpoint,
        headers= headers) 
        print(response.json())
        print( "\n")

        if response.json()['status'] == 'completed':
            return response.json()
            # with open(filename, 'w') as f:
            #     f.write(response.json()['text'])
            break
        else:
            time.sleep(6)	

def checkQuestion(data,question_paper):
    #Question paper file path


    file_path = script_dir + '/question_papers/' + 'QuestionPaper.txt'

    # open question paper file
    # with open("QuestionPaper.txt", "r") as file: 
    with open(file_path, "r") as file: 
        newline_breaks=""
        for line in file: 
            stripped_line = line.strip()
            newline_breaks += stripped_line
            word_search = newline_breaks
            # print(word_search)
        
        

    headers = {'authorization': "58e4e7597da8422a8633b70ab1d1b784"}
    word_search ='hello,testing'
    endpoint_word_search = 'https://api.assemblyai.com/v2/transcript/' + data['id'] + '/word-search?words=' + word_search

    response = requests.get(endpoint_word_search,
                            headers=headers)
    print(response.json())
    return response.json()


    


    










