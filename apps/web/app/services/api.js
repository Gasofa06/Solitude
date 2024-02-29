import { API_URL, CHECK_URL, SETUP_URL, QUERY_URL } from '../constants.js';

import { Get_Data } from './get.js';
import { Post_Data } from './post.js';

export const api = {
    check: async uuid => Get_Data(API_URL + CHECK_URL + '?uuid=' + uuid, true),
    setup: async data => Post_Data(API_URL + SETUP_URL, data, true),
    query: async data => Post_Data(API_URL + QUERY_URL, data, false),
};
