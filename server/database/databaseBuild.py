import json
import bz2
import sys
import os
import re


def Compress_Article(_article):
    # Comprimir el artículo utilizando bz2.
    compressed_article = bz2.compress(_article.encode("utf-8"))
    return compressed_article


def Load_Articles(_articles_folder_path):
    # `Array`` con todos los artículos.
    arr_articles = []

    for filename in os.listdir(_articles_folder_path):
        # Procesar solo los archivos `.txt`.
        if filename.endswith(".txt"):
            article_path = os.path.join(_articles_folder_path, filename)

            # Abrir el archivo en modo de lectura.
            with open(article_path, "r", encoding="utf-8") as f:
                article = f.read()
                arr_articles.append(article)

    return arr_articles


def Pack_Articles(_articles, _target_size):
    # Ordenar los artículos en orden descendente según su tamaño.
    sorted_articles = sorted(_articles, key=lambda article: len(article), reverse=True)

    # Lista para almacenar los grupos de artículos.
    groups = []

    # Grupo actual siendo procesado.
    current_group = ""

    # Diccionario para almacenar los títulos de los artículos y sus índices.
    title_and_indices = {}

    for article in sorted_articles:
        compressed_article_group = Compress_Article(current_group + article)
        size = sys.getsizeof(compressed_article_group)

        if size > _target_size:
            # Si agregar el artículo excediera el tamaño deseado, comienza un nuevo grupo.
            compressed_current_group = Compress_Article(current_group)
            current_group = ""

            # Llena el grupo con espacios si es necesario, para alcanzar el tamaño objetivo (nota: un espacio = un byte).
            size = sys.getsizeof(compressed_current_group)
            spaces_needed = _target_size - size
            spaces = b" " * spaces_needed
            compressed_current_group += spaces

            groups.append(compressed_current_group)

        # Añadir el artículo al grupo actual.
        current_group += article

        # Dentro del artículo, su título se ubica entre "T:" y "‽".
        pattern_for_title = r"T:(.*?)‽"
        match_title = re.search(pattern_for_title, article)

        if match_title:
            # Agregar un par título-índice al diccionario de títulos e índices.
            article_group_idx = len(groups)
            article_title = match_title.group(1).lower()
            title_and_indices[article_title] = article_group_idx

            print(f"The article '{article_title}' is in index {article_group_idx}.")
        else:
            error_article_group_idx = len(groups)
            print(f"Error in index {error_article_group_idx}, title not found.")

    # Llena el último grupo con espacios.
    spaces_needed = _target_size - size
    spaces = b" " * spaces_needed
    compressed_article_group += spaces

    # Añade el último grupo a la lista de grupos.
    groups.append(compressed_article_group)

    return groups, title_and_indices


def Main():
    target_size = 100 * 1024  # 100 KB in bytes.
    articles = Load_Articles("server/database/articles")

    articles_groups, title_and_indices = Pack_Articles(articles, target_size)

    # Crear un solo archivo que contenga todos los grupos de artículos.
    with open("server/database/db/db.txt", "wb") as f:
        f.write(b"".join(articles_groups))

    # Crear un archivo JSON (para compartir) que contenga los títulos los artículos y el índice del grupo en el que se encuentran.
    with open("server/database/shared/title_and_indices.json", "w") as json_f:
        json.dump(title_and_indices, json_f, indent=4)


if __name__ == "__main__":
    Main()
