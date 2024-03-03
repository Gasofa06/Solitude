from base64 import b64encode
import json
import bz2
import sys
import os
import re


def Compress(text):
    return bz2.compress(text.encode("utf-8"))


def Compress_JSON(obj):
    json_string = json.dumps(obj)
    compressed = {"bz2": b64encode(Compress(json_string)).decode("ascii")}

    return compressed


def Load_Articles(articles_path):
    arr_articles = []

    for filename in os.listdir(articles_path):
        if filename.endswith(".txt"):
            article_path = os.path.join(articles_path, filename)

            with open(article_path, "r", encoding="utf-8") as f:
                article = f.read()
                arr_articles.append(article)

    return arr_articles


def Pack_Articles(articles, target_size):
    sorted_articles = sorted(articles, key=lambda article: len(article), reverse=True)

    curr_group = ""
    arr_groups = []

    dict_title_idx_topics = {}

    for article in sorted_articles:
        compressed_group = Compress(curr_group + article)
        size = sys.getsizeof(compressed_group)

        if size > target_size:
            compressed_curr_group = Compress(curr_group)

            # Rellena el grupo con espacios si es
            # necesario para lograr el tamaño deseado.
            new_size = sys.getsizeof(compressed_curr_group)
            spaces = b" " * (target_size - new_size + 33)
            compressed_curr_group += spaces

            arr_groups.append(compressed_curr_group)
            curr_group = ""
        else:
            curr_group += article

        # Dentro del artículo, su título se
        # ubica entre "T:" y "‽".
        title_regex = r"T:(.*?)‽"
        title_match = re.search(title_regex, article)

        if title_match:
            title = title_match.group(1)
            idx = len(arr_groups)

            # En el artículo, los temas a los que
            # pertenece están entre "C:" y "‽".
            # Y se separan entre sí por "&".
            topic_regex = r"C:(.*?)‽"
            topic_match = re.search(topic_regex, article)
            arr_topics = topic_match.group(1).split("&") if topic_match else []

            dict_title_idx_topics[title] = [idx, arr_topics]

    spaces = b" " * (target_size - size + 33)
    compressed_group += spaces

    arr_groups.append(compressed_group)

    return (arr_groups, dict_title_idx_topics)


def Main(target_size):
    articles_path = os.getcwd() + "/articles/"
    arr_articles = Load_Articles(articles_path)

    (arr_groups, dict_title_idx_topics) = Pack_Articles(arr_articles, target_size)

    with open(os.getcwd() + "/server-only/db.txt", "wb") as f:
        f.write(b"".join(arr_groups))

    with open(
        os.getcwd() + "\\shared-with-client\\main-dict.json",
        "w",
    ) as json_f:
        comp_dict_title_idx_topics = Compress_JSON(dict_title_idx_topics)
        json.dump(comp_dict_title_idx_topics, json_f)
