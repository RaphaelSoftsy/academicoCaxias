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

function desativar(endpoint){
	$.ajax({
		url: url_base + `/${endpoint}/${id}/desativar`,
		type: "PUT",
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(e.responseJSON.message)
			alert(e.responseJSON.message)
		}
	})
		.done(function(data) {
			$('#edit-nome').val('');
			getAtos();
			alert('Desativado com Sucesso!')
		})
	return false;
}

function ativar(endpoint){
	$.ajax({
		url: url_base + `/${endpoint}/${id}/ativar`,
		type: "PUT",
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(e.responseJSON.message)
			alert(e.responseJSON.message)
		}
	})
		.done(function(data) {
			$('#edit-nome').val('');
			getAtos();
			alert('Ativado com Sucesso!')
		})
	return false;
}
