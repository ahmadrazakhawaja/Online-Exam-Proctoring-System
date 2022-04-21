import re
import os
import docx2txt
import PyPDF2

script_dir = os.path.dirname(__file__)


# text = "Nick likes to play football, however he is not too fond of tennis."
my_stopwords = ['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', "you're", "you've", "you'll", "you'd", 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', "she's", 'her', 'hers', 'herself', 'it', "it's", 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', "that'll", 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', "don't", 'should', "should've", 'now', 'd', 'll', 'm', 'o', 're', 've', 'y', 'ain', 'aren', "aren't", 'couldn', "couldn't", 'didn', "didn't", 'doesn', "doesn't", 'hadn', "hadn't", 'hasn', "hasn't", 'haven', "haven't", 'isn', "isn't", 'ma', 'mightn', "mightn't", 'mustn', "mustn't", 'needn', "needn't", 'shan', "shan't", 'shouldn', "shouldn't", 'wasn', "wasn't", 'weren', "weren't", 'won', "won't", 'wouldn', "wouldn't"]
more_stopword = [".", "!", ";", "/"]

my_stopwords.append(more_stopword)

def remove_mystopwords(sentence):
    text_tokens = sentence.split(" ")
    tokens_filtered = [word for word in text_tokens if not word in my_stopwords]
    return (",").join(tokens_filtered)

def create_txt(name, type):

    if type == '.txt':
        with open(
            script_dir + "/question_papers/" + name + type
        ) as f, open(
        script_dir + "/question_papers/" + name + '.txt',
            "w",
        ) as f1:
            str1 = ",".join(set(re.findall("[a-zA-Z\-\.'/]+", f.read())))
            op_string = re.sub(r"[^\w\s]", ",", str1.lower())
            filtered_text = remove_mystopwords(op_string.lower())
            f1.write(filtered_text)

    if type == '.docx':
        text = docx2txt.process(script_dir + "/question_papers/" + name + type)
        print(text)
        with open(
        script_dir + "/question_papers/" + name + '.txt',
            "w",
        ) as f1:
            str1 = ",".join(set(re.findall("[a-zA-Z\-\.'/]+", text)))
            op_string = re.sub(r"[^\w\s]", ",", str1.lower())
            filtered_text = remove_mystopwords(op_string.lower())
            f1.write(filtered_text)

    if type == '.pdf':
        pdf_obj=open(script_dir + "/question_papers/" + name + type,'rb')
        pdfreader=PyPDF2.PdfFileReader(pdf_obj)

        x=pdfreader.numPages
        print(x)
        pageobj=pdfreader.getPage(0)

        text=pageobj.extractText()

        print(text)
        with open(
        script_dir + "/question_papers/" + name + '.txt',
            "w",
        ) as f1:
            str1 = ",".join(set(re.findall("[a-zA-Z\-\.'/]+", text)))
            op_string = re.sub(r"[^\w\s]", ",", str1.lower())
            filtered_text = remove_mystopwords(op_string.lower())
            f1.write(filtered_text)
            
    








# with open(
#    script_dir + "/question_papers/wordList.txt",
#     "r",
# ) as readFile:
#     for line in readFile:
        
        
#         print(filtered_text)
