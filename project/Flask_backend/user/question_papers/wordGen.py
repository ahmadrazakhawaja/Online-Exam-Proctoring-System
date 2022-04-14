import re

my_stopwords = ['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', "you're", "you've", "you'll", "you'd", 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', "she's", 'her', 'hers', 'herself', 'it', "it's", 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', "that'll", 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', "don't", 'should', "should've", 'now', 'd', 'll', 'm', 'o', 're', 've', 'y', 'ain', 'aren', "aren't", 'couldn', "couldn't", 'didn', "didn't", 'doesn', "doesn't", 'hadn', "hadn't", 'hasn', "hasn't", 'haven', "haven't", 'isn', "isn't", 'ma', 'mightn', "mightn't", 'mustn', "mustn't", 'needn', "needn't", 'shan', "shan't", 'shouldn', "shouldn't", 'wasn', "wasn't", 'weren', "weren't", 'won', "won't", 'wouldn', "wouldn't"]


def remove_mystopwords(sentence):
    text_tokens = sentence.split(" ")
    tokens_filtered = [word for word in text_tokens if not word in my_stopwords]
    return (" ").join(tokens_filtered)


text = "Nick likes to play football, however he is not too fond of tennis."
more_stopword = [".", ",", "!", ";", "/"]

with open(
    "C:\\Users\\Hp\\Desktop\\Years\\FYP\\Fyp_group\\Fyp_project\\fyp_project\\project\\Flask_backend\\user\\question_papers\\findWord.txt"
) as f, open(
    "C:\\Users\\Hp\\Desktop\\Years\\FYP\\Fyp_group\\Fyp_project\\fyp_project\\project\\Flask_backend\\user\\question_papers\\wordList.txt",
    "w",
) as f1:
    f1.write(" ".join(set(re.findall("[a-zA-Z\-\.'/]+", f.read()))))

my_stopwords.append(more_stopword)

with open(
    "C:\\Users\\Hp\\Desktop\\Years\\FYP\\Fyp_group\\Fyp_project\\fyp_project\\project\\Flask_backend\\user\\question_papers\\wordList.txt",
    "r",
) as readFile:
    for line in readFile:
        op_string = re.sub(r"[^\w\s]", "", line)
        filtered_text = remove_mystopwords(op_string)
        print(filtered_text)
