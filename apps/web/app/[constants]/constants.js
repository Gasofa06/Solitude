/**
 * El tamaño (en `bytes`) de la clave.
 */
export const KEY_SIZE = 32;

/**
 * El nombre que recibe la clave (y sus
 * demas datos) en el almacenamiento
 * local (`localStorage`).
 */
export const KEY_NAME = 'spiralKey';

/**
 * El tiempo máximo de validez de la clave
 * en milisegundos. En este caso 1 semana.
 */
export const MAX_VALID_KEY_TIME = 604800000;

export const MAX_ARTICELS_IN_PAGE = 40;

export const SEARCH_TYPES = {
    Title: {
        placeholder: 'Search article by title (e.g. Conan Edogawa)',
    },

    Topic: {
        placeholder: 'Search posts by topic (e.g. Anime; Music;)',
    },

    'Ref.': {
        placeholder: 'Search article by reference (e.g. 286)',
    },
};

export const API_URL = '/api';

export const CHECK_URL = '/check';

export const SETUP_URL = '/setup';

export const QUERY_URL = '/query';
