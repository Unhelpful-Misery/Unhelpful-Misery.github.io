function search_results(n) {
    let input = document.getElementById('searchbar').value
    searchBarResults=document.getElementById("searchBarResults")
    if (window.myPythonFunction) {
        txt=document.createTextNode(main_body_function(input, false, 10));
        searchBarResults.replaceChildren(txt);
    }
}