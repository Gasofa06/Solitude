export const Clear_Search_Text_Input = () => {
    window.search_bar.value = '';
};

export const Clear_Suggestions = () => {
    while (window.search_suggestions.firstChild) {
        window.search_suggestions.firstChild.remove();
    }
};
