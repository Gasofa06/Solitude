class TreeNode {
    constructor() {
        this.subtopics = {};
        this.articles = [];
    }

    /**
     * @info Actualiza el diccionario de hijos con un nuevo nodo.
     * @param {string} _key - La clave para identificar el nodo hijo.
     * @param {TreeNode} _obj - El nodo hijo a agregar.
     */
    update_childrens(_key, _obj) {
        this.subtopics[_key] = _obj;
    }

    /**
     * @info Agrega un título de artículo a la lista de artículos.
     * @param {string} _title - El título del artículo a agregar.
     */
    push_article(_title) {
        this.articles.push(_title);
    }
}

export class NestedHierarchicalTree {
    /**
     * @param {object} _obj_main_dict - Un diccionario de títulos de artículos y temas asociados.
     * @param {string[]} _topics - Una lista de temas disponibles.
     * @param {number} _max_tree_levels - Número máximo de temas que puede tener un artículo. Que viene siendo lo mismo que el numero maximo de niveles del arbol.
     */
    constructor(_obj_main_dict, _topics, _max_tree_levels) {
        this.root = new TreeNode();
        this.max_tree_levels = _max_tree_levels;

        this.build_structure(_topics, _max_tree_levels);
        this.insert_data(_obj_main_dict, _topics, _max_tree_levels);
    }

    /**
     * @info Función auxiliar para construir de manera recursiva la estructura jerárquica del árbol.
     * @param {TreeNode} _root - Nodo raíz actual.
     * @param {string[]} _arr_topics - Matriz con los temas que se agregarán.
     * @param {number} _curr_tree_level - Nivel actual del árbol.
     */
    build_structure_helper(_root, _arr_topics, _curr_tree_level) {
        let tree_level = _curr_tree_level + 1;
        if (tree_level > this.max_tree_levels) return;

        _arr_topics.forEach((_topic, _idx) => {
            let idx = _idx + 1;

            _root.update_childrens(_topic, new TreeNode());
            let node = _root.subtopics[_topic];

            let sub_groups = _arr_topics.slice(idx, _arr_topics.length);
            if (sub_groups.length === 0) return;

            this.build_structure_helper(node, sub_groups, tree_level);
        });
    }

    /**
     * @info Construye la estructura jerárquica del árbol.
     * @param {string[]} _topics
     */
    build_structure(_topics) {
        let node = this.root;
        let tree_level = 0;
        let arr_topics = _topics.sort();

        this.build_structure_helper(node, arr_topics, tree_level);
    }

    /**
     * @info Inserta datos (artículos) en la estructura jerárquica.
     * @param {object} _obj_main_dict
     */
    insert_data(_obj_main_dict, _topics) {
        for (let _title in _obj_main_dict) {
            let node = this.root;
            let arr_topics = _obj_main_dict[_title][1]; ////////////
            console.log(_obj_main_dict);

            if (arr_topics.length > this.max_tree_levels) {
                // alert(
                //     `The article entitled '${_title}' covers more topics than what
                //     is allowed (allowed: ${this.max_tree_levels}). We will eliminate
                //     some of them.`,
                // );

                arr_topics = arr_topics.slice(0, this.max_tree_levels);
            }

            arr_topics = arr_topics.sort();

            arr_topics.forEach((_topic, _idx) => {
                try {
                    node = node.subtopics[_topic];

                    if (_idx + 1 === arr_topics.length) {
                        node.push_article(_title);
                    }
                } catch {
                    // alert(
                    //     `The article titled '${_title}' is associated with the
                    //     topic '${_topic}', but this topic does not exist.`,
                    // );

                    return;
                }
            });
        }
    }

    /**
     * @info Función auxiliar para buscar de manera recursiva artículos dentro de un nodo y sus subnodos.
     * @param {TreeNode} _root - Nodo raíz actual.
     * @param {string[]} _arr_articles - Lista de títulos de artículos encontrados.
     * @returns {string[]} Lista de títulos encontrados.
     */
    search_articles_in_node_helper(_root, _arr_articles) {
        for (let _topic in _root.subtopics) {
            let node = _root.subtopics[_topic];
            _arr_articles = _arr_articles.concat(node.articles);

            this.search_articles_in_node_helper(node, _arr_articles);
        }

        return _arr_articles;
    }

    /**
     * @info Busca artículos dentro de un nodo específico.
     * @param {TreeNode} _node - El nodo en el que se va a buscar.
     * @returns {string[]} Lista de títulos encontrados.
     */
    search_articles_in_node(_node) {
        let first_arr = _node.articles;
        let second_arr = this.search_articles_in_node_helper(_node, []);

        let arr_articles = first_arr.concat(second_arr);
        return arr_articles;
    }

    /**
     * @info Busca artículos basados en temas.
     * @param {string[]} _arr_topics - Lista de temas para buscar.
     * @param {boolean} _intersaction - Determina si la búsqueda debe devolver la intersección o la unión de artículos.
     * @returns {string[]} Lista de títulos de encontrados.
     */
    search_articles(_arr_topics, _intersaction) {
        let node = this.root;

        if (_arr_topics.length > this.max_tree_levels) {
            // alert(
            //     `Requesting an article with more topics than what is allowed
            //     (allowed: ${this.max_tree_levels}).`,
            // );

            return;
        }

        let arr_topics = _arr_topics.sort();
        var arr_articles = [];

        if (_intersaction) {
            arr_topics.forEach((_topic, _idx) => {
                try {
                    node = node.subtopics[_topic];

                    if (_idx + 1 === arr_topics.length) {
                        arr_articles = this.search_articles_in_node(node);
                    }
                } catch {
                    // alert(`The topic '${_topic}' does not exist.`);
                }
            });
        } else {
            arr_articles = arr_topics
                .map(_topic => {
                    try {
                        let n = node.subtopics[_topic];
                        return this.search_articles_in_node(n);
                    } catch {
                        // alert(`The topic '${_topic}' does not exist.`);
                        return;
                    }
                })
                .flat();
        }

        return arr_articles;
    }
}

// let tree = new NestedHierarchicalTree(
//     {
//         Title: ['A', 'B'],
//         Caca: ['A', 'B'],
//         Pipi: ['A'],
//         Pedo: ['B'],
//         TETE: ['A', 'B', 'C', 'D', 'E', 'G'],
//     },
//     ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
//     5,
// );
//
// console.log(tree.search_articles(['B'], true));
