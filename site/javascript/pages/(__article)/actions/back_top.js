/**
 * @info Desplazamiento suave hasta la parte superior del cuerpo del documento.
 */
export function Back_Top() {
    document.body.scrollIntoView({ behavior: 'smooth' });
}
