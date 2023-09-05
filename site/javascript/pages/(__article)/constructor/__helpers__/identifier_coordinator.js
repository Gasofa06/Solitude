export class IdentifierCoordinator {
    constructor() {
        /**
         * Array para almacenar las secciones
         * del artículo que contengan ID. Los
         * elementos de esta, se utilizarán
         * para generar la tabla de contenidos.
         */
        this.arr_sections_id = [];

        this.table_curr_idx = 0;
        this.chart_curr_idx = 0;
    }

    generate_section_id(_sec_name) {
        let name = _sec_name.replace(' ', '-');
        let id = `section-${name}`;

        this.arr_sections_id.push(_sec_name);

        return id;
    }

    get_sections_with_id() {
        return this.arr_sections_id;
    }

    generate_table_id() {
        let num = this.table_curr_idx;
        let id = `table-${num}`;

        this.table_curr_idx = num + 1;

        return id;
    }

    generate_chart_id() {
        let num = this.chart_curr_idx;
        let id = `chart-${num}`;

        this.chart_curr_idx = num + 1;

        return id;
    }
}
