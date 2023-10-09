export const Clear_Search_Text_Input = () => {
    window.search_bar.value = '';
};

export const Clear_Suggestions = () => {
    var search_suggestions_container = window.search_suggestions.firstChild;

    if (search_suggestions_container) search_suggestions_container.remove();
};
