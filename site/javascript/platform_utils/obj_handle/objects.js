export function Contains_Obj(_obj, _list) {
    for (var i = 0; i < _list.length; i++) {
        if (_list[i] === _obj) return true;
    }

    return false;
}

export function Find_Key_Index(_obj, _key_to_find) {
    let keys = Object.keys(_obj);

    for (let i = 0; i < keys.length; i++) {
        if (keys[i] === _key_to_find) {
            return i;
        }
    }

    return -1;
}
