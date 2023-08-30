import {
    API_URL,
    CHECK_URL,
    SETUP_URL,
    QUERY_URL,
} from '../__constants__/__constants.js';

import { Get_Data } from './server_interaction/get_data.js';
import { Post_Data } from './server_interaction/post_data.js';

export const api = {
    check: async uuid => Get_Data(API_URL + CHECK_URL + '?uuid=' + uuid, true),
    setup: async data => Post_Data(API_URL + SETUP_URL, data, true),
    query: async data => Post_Data(API_URL + QUERY_URL, data, false),
};
