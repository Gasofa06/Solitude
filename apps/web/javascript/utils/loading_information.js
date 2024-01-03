/**
 * @info Realiza las acciones necesarias
 * al iniciar la carga.
 *
 * @param {string} _message - El mensaje a mostrar
 * en la interfaz mientras la carga es ejecutada.
 *
 * @param {boolean} _is_manually_progress - Indica
 * si se asignará la longitud de la barra de progreso
 * manualmente en JavaScript (true) o automáticamente
 * en CSS (false).
 */
export function Start_Loading(_message, _is_manually_progress) {
    window.make_query.disabled = true;
    window.make_query.classList.add('loading');

    window.search_bar.readOnly = true;

    window.loading_notifier.innerHTML = _message;

    /*
     * Si `_is_manually_progress == true`,
     * coloclamos `manually_progress` para
     * que CSS sepa que se asignara la longitud
     * de la barra manualmente (en JS).
     */
    if (_is_manually_progress) {
        window.loading_spinner.classList.add('manually_progress');
    }
}

/**
 * @info Realiza las acciones necesarias al
 * detener la carga.
 *
 * @param {string} _message - El mensaje a mostrar
 * en la interfaz cuando la carga es detenida.
 */
export function Stop_Loading(_message) {
    window.make_query.disabled = false;
    window.make_query.classList.remove('loading');

    window.search_bar.readOnly = false;

    window.loading_notifier.innerHTML = _message;

    /*
     * Si `html_loading_spinner` tiene
     * `.manually_progress`, eliminamos
     * dicha clase.
     */
    if (window.loading_spinner.classList.contains('manually_progress')) {
        window.loading_spinner.classList.remove('manually_progress');
    }
}

/**
 * @info Asigna y muestra el progreso de
 * carga manualmente.
 *
 * @param {number} _loaded - El número de carga actual.
 *
 * @param {number} _total_to_load - El número máximo de carga.
 */
export function Set_Progress(_loaded, _total_to_load) {
    if (!window.loading_spinner.classList.contains('manually_progress')) {
        alert(
            'Error, the loading circle must have `.manually_progress` class assigned.',
        );
    }

    if (!is_valid) return;

    let progress = Math.round((_loaded / _total_to_load) * 130);
    window.loading_spinner.style.stroke_dasharray = progress + ', 130';
}
