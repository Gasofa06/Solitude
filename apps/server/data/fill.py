import os
from lists import titles_list

def Empty(articles_path):
    for f in os.listdir(articles_path):
        os.remove(os.path.join(articles_path, f))

def Fill(articles_path):
    with open("sample.txt", "r", encoding="utf-8") as f:
        sample = f.read()
    
    for title in titles_list:
        file_path = articles_path + title.replace(" ", "-") + ".txt"
        file_content = sample.replace("insert-title", title)

        with open(file_path, "w", encoding="utf-8") as f:
            f.write(file_content)

def Main():
    articles_path = os.getcwd() + "/articles/"

    Empty(articles_path)
    Fill(articles_path)