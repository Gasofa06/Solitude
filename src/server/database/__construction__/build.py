from base64 import b64encode
import json
import bz2
import sys
import os
import re


def Compress(_txt):
    return bz2.compress(_txt.encode("utf-8"))


def Compress_JSON(_obj):
    json_string = json.dumps(_obj)

    comp_json = {"bz2": b64encode(Compress(json_string)).decode("ascii")}

    return comp_json


def Load_Articles(_articles_folder_path):
    arr_articles = []

    for filename in os.listdir(_articles_folder_path):
        if filename.endswith(".txt"):
            article_path = os.path.join(_articles_folder_path, filename)

            with open(article_path, "r", encoding="utf-8") as f:
                article = f.read()
                arr_articles.append(article)

    return arr_articles


def Pack_Articles(_articles, _target_size):
    # Ordenar los artículos en orden
    # descendente según su tamaño.
    sorted_articles = sorted(_articles, key=lambda article: len(article), reverse=True)

    # [Curr]ent
    curr_group = ""
    arr_groups = []

    # [Dict]ionaries
    dict_title_and_idx = {}
    dict_title_and_topics = {}

    for article in sorted_articles:
        # [Comp]ressed article group
        comp_article_group = Compress(curr_group + article)
        size = sys.getsizeof(comp_article_group)

        if size > _target_size:
            comp_curr_group = Compress(curr_group)

            # Rellena el grupo con espacios si es
            # necesario para lograr el tamaño deseado.
            new_size = sys.getsizeof(comp_curr_group)
            spaces = b" " * (_target_size - new_size + 33)
            comp_curr_group += spaces

            arr_groups.append(comp_curr_group)
            curr_group = ""
        else:
            curr_group += article

        # Dentro del artículo, su título se
        # ubica entre "T:" y "‽".
        title_regex = r"T:(.*?)‽"
        title_match = re.search(title_regex, article)

        if title_match:
            # Si hay coincidencia, agregamos un
            # par título-índice.
            title = title_match.group(1)
            idx = len(arr_groups)
            dict_title_and_idx[title] = idx

            # En el artículo, los temas a los que
            # pertenece están entre "C:" y "‽".
            # Y se separan entre sí por "&".
            topic_regex = r"C:(.*?)‽"
            topic_match = re.search(topic_regex, article)

            arr_topics = topic_match.group(1).split("&") if topic_match else []
            dict_title_and_topics[title] = arr_topics

    # Llena el último grupo con espacios.
    spaces = b" " * (_target_size - size + 33)
    comp_article_group += spaces

    arr_groups.append(comp_article_group)

    return (arr_groups, dict_title_and_idx, dict_title_and_topics)


def Main():
    articles_folder_path = "server/database/articles"
    arr_articles = Load_Articles(articles_folder_path)

    # Cada grupo de artículos debe tener
    # exactamente 100KB.
    target_size = 100 * 1000

    (arr_groups, dict_title_and_idx, dict_title_and_topics) = Pack_Articles(
        arr_articles, target_size
    )

    with open("server/database/db/db.txt", "wb") as f:
        f.write(b"".join(arr_groups))

    with open("server/database/shared/title_and_idx.json", "w") as json_f:
        comp_dict_title_and_idx = Compress_JSON(dict_title_and_idx)
        json.dump(comp_dict_title_and_idx, json_f)

    with open("server/database/shared/title_and_topics.json", "w") as json_f:
        comp_dict_title_and_topics = Compress_JSON(dict_title_and_topics)
        json.dump(comp_dict_title_and_topics, json_f)


if __name__ == "__main__":
    Main()
