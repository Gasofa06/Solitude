import {
    Contains_Obj,
    Process_Title,
} from '../../../platform_utils/__utils.js';

/**
 * @class Trie Node.
 *
 * @info Representa un nodo en la estructura del trie.
 */
class TrieNode {
    constructor() {
        this.children = {};
        this.data = [];
    }

    /**
     * @info Actualiza los nodos secundarios de este nodo.
     *
     * @param {_key} - Clave que representa el carácter asociado
     * al nodo secundario.
     * @param {_obj} - Objeto TrieNode que representa el nodo secundario.
     */
    update_childrens(_key, _obj) {
        this.children[_key] = _obj;
    }

    /**
     * @info Actualiza los datos almacenados en este nodo.
     *
     * @param {_data} - Datos que se vincularán al nodo.
     */
    update_data(_data) {
        this.data = _data;
    }
}

/**
 * @class Trie.
 *
 * @info Representa una estructura de datos Trie utilizada para
 * almacenar y buscar información sobre los artículos.
 */
export class ArticlesTrie {
    /**
     * @param {_dict_title_information} - Un diccionario que contiene
     * información de los artículos para construir el trie.
     */
    constructor(_dict_title_information) {
        this.root = new TrieNode();
        this.build_trie(_dict_title_information);
    }

    /**
     * @info Construye el trie utilizando el diccionario dado.
     *
     * @param {_dict_title_information}
     */
    build_trie(_dict_title_information) {
        let node = this.root;

        for (let _title in _dict_title_information) {
            let title = Process_Title(_title);

            for (let _character of title) {
                let contains_character = Contains_Obj(
                    _character,
                    node.children,
                );

                if (!contains_character) {
                    node.update_childrens(_character, new TrieNode());
                }

                node = node.children[_character];
            }

            node.update_data(_dict_title_information[_title]);
        }
    }

    /**
     * @info Busca datos asociados con un título dado.
     *
     * @param {_title} - El título que se va a buscar.
     * @return {Array} Los datos asociados con el título.
     */
    search_data(_title) {
        let node = this.root;
        let title = Process_Title(_title);

        for (let _character of title) {
            let contains_obj = Contains_Obj(
                _character,
                Object.keys(node.children),
            );

            if (!contains_obj) {
                alert(`The title (${_title}) does not exist.`);
                return;
            }

            node = node.children[_character];
        }

        return node.data;
    }

    /**
     * @info Busca el índice del servidor asociado con un título dado.
     *
     * @param {_title} - El título para el cual se busca el índice del servidor.
     * @return {number} El índice del servidor asociado con el título.
     */
    search_server_index(_title) {
        let arr_data = this.search_data(_title);
        let server_idx = arr_data[0];

        return server_idx;
    }

    /**
     * @info Busca la fecha de lanzamiento asociada con un título dado.
     *
     * @param {_title} - El título para el cual se busca la fecha de lanzamiento.
     * @return {string} La fecha de lanzamiento asociada con el título.
     */
    search_topics(_title) {
        let arr_data = this.search_data(_title);
        let date = arr_data[1];

        return date;
    }

    /**
     * @info Busca la fecha de lanzamiento asociada con un título dado.
     *
     * @param {_title} - El título para el cual se busca la fecha de lanzamiento.
     * @return {string} La fecha de lanzamiento asociada con el título.
     */
    search_release_date(_title) {
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
    suggest(_prefix, _max_suggestions) {
        let node = this.root;
        let prefix = Process_Title(_prefix);
        let max_suggestions = _max_suggestions - 1;

        let curr = '';

        for (let _character of prefix) {
            let not_exists = !node.children[_character];

            if (not_exists) {
                alert(
                    `There are no articles that start with the prefix: ${_prefix}.`,
                );

                return [];
            }

            node = node.children[_character];
            curr += _character;
        }

        let suggestions = [];
        this.suggest_helper(node, suggestions, curr, max_suggestions);
        return suggestions;
    }
}
