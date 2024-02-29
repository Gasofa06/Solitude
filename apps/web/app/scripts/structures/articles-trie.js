function Process_Title(title) {
    let processed_title = title
        .toLowerCase()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '');

    return processed_title;
}

class TrieNode {
    constructor() {
        this.children = {};
        this.data = [];
    }

    update_childrens(key, obj) {
        this.children[key] = obj;
    }

    update_data(data) {
        this.data = data;
    }
}

export class ArticlesTrie {
    constructor(dict_titles) {
        this.root = new TrieNode();
        this.build_trie(dict_titles);
    }

    build_trie(dict_titles) {
        for (let title in dict_titles) {
            let node = this.root;
            let processed_title = Process_Title(title);

            for (let char of processed_title) {
                if (node.children[char] == undefined) {
                    node.update_childrens(char, new TrieNode());
                }

                node = node.children[char];
            }

            node.update_data(dict_titles[title]);
        }
    }

    search_data(title) {
        let node = this.root;
        let processed_title = Process_Title(title);

        for (let char of processed_title) {
            if (node.children[char] == undefined) return;
            else node = node.children[char];
        }

        return node.data;
    }

    get_server_idx(_title) {
        let arr_data = this.search_data(_title);
        let server_idx = arr_data[0];

        return server_idx;
    }

    get_topics(_title) {
        let arr_data = this.search_data(_title);
        let date = arr_data[1];

        return date;
    }

    get_release_date(_title) {
        let arr_data = this.search_data(_title);
        let date = arr_data[2];

        return date;
    }

    /**
     * @info Función auxiliar para sugerir títulos basados en un prefijo.
     *
     * @param {_root} - El nodo raíz desde donde comenzar las sugerencias.
     * @param {_suggestions} - Un array para almacenar los títulos sugeridos.
     * @param {_curr} - El título actual que se está formando durante la traversía.
     * @param {_max_suggestions} - El número máximo de sugerencias a generar.
     */
    suggest_helper(_root, _suggestions, _curr, _max_suggestions) {
        let data_exists = !!_root.data.length;
        if (data_exists) _suggestions.push(_curr);

        let childrens_not_exists = !Object.keys(_root.children).length;
        if (childrens_not_exists) return;

        for (let _chracter in _root.children) {
            if (_suggestions.length > _max_suggestions) return;

            let node = _root.children[_chracter];

            this.suggest_helper(
                node,
                _suggestions,
                _curr + _chracter,
                _max_suggestions,
            );
        }
    }

    /**
     * @info Genera sugerencias de títulos basadas en un prefijo.
     *
     * @param {_prefix} - El prefijo en el que basar las sugerencias.
     * @param {_max_suggestions} - El número máximo de sugerencias a generar.
     * @return {Array} Un array de títulos que comienzan con el prefijo dado.
     */
    suggest(prefix, max_suggestions) {
        let node = this.root;
        let processed_prefix = Process_Title(prefix);

        let curr = '';

        for (let char of processed_prefix) {
            if (node.children[char] == undefined) {
                return [];
            } else {
                node = node.children[char];
                curr += char;
            }
        }

        let suggestions = [];
        max_suggestions -= 1;

        this.suggest_helper(node, suggestions, curr, max_suggestions);

        return suggestions;
    }
}
