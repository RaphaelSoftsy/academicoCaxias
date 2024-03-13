var url_base = "http://localhost:8080";

const queryString = window.location.search;

const params = new URLSearchParams(queryString);

const path_base="http://localhost:8090/front-educacional-caxias/resources/menu";


window.addEventListener("load", function() {
	$("#menu").load(path_base+"/menu.html" );
    const loader = document.querySelector(".bg-loading");
    loader.parentElement.removeChild(loader);
    $(".bg-loading").addClass("none");
});
