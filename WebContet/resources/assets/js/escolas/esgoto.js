
var pefilEscola = localStorage.getItem("perfil");
var escola = JSON.parse(pefilEscola);
var nomeEscola = escola.nome;
var dados = [];
var rows = 8;
var currentPage = 1;
var pagesToShow = 5;
var escolaId = localStorage.getItem('escolaId');
var idEscolaEsgoto = 0
let checkS = $("#isOutrosS")
let checkN = $("#isOutrosN")

$(document).ready(function() {

	$('#tituloForm').text(nomeEscola);

	getDados()

})

$('input[id="isInexistenteS"]').click(() => {
	$('input[id="isFossaN"]').prop('checked', true)
	$('input[id="isFossaN"]').prop('disabled', true)
	$('input[id="isFossaS"]').prop('disabled', true)
})

$('input[id="isInexistenteN"]').click(() => {
	$('input[id="isFossaN"]').prop('checked', false)
	$('input[id="isFossaN"]').prop('disabled', false)
	$('input[id="isFossaS"]').prop('disabled', false)

})


$("#formNovoCadastro").submit(function(e) {

	e.preventDefault();
	
	if(dados.length > 0){
		atualizar()
	}else{
		cadastrar()
	}
	

})

function getDados (){
	$.ajax({
		url: url_base + `/escolaEsgoto/escola/${escolaId}`,
		type: "GET",
		async: false,
	})
		.done(function(data) {
			
			console.log(data)
			dados = data
			idEscolaEsgoto = data[0].idEscolaEsgoto

			if (data[0].redePublica == "S") {
				$('input[id="isRedePublicaS"]').prop('checked', true)
			} else {
				$('input[id="isRedePublicaN"]').prop('checked', true)
			}

			if (data[0].fossa == "S") {
				$('input[id="isFossaS"]').prop('checked', true)
			} else {
				$('input[id="isFossaN"]').prop('checked', true)
			}

			if (data[0].inexistente == "S") {
				$('input[id="isInexistenteS"]').prop('checked', true)
				$('input[id="isFossaN"]').prop('checked', true)	
				$('input[id="isFossaN"]').prop('disabled', true)
			} else {
				$('input[id="isInexistenteN"]').prop('checked', true)
			}

		})

		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

}

function atualizar (){
	var objeto = {
		"idEscolaEsgoto": idEscolaEsgoto,
		"escolaId": Number(escolaId),
		"redePublica": $('input[name="isRedePublica"]:checked').val(),
		"fossa": $('input[name="isFossa"]:checked').val(),
		"inexistente": $('input[name="isInexistente"]:checked').val()
	}
	
	$.ajax({
		url: url_base + "/escolaEsgoto",
		type: "PUT",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(e.responseJSON);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
				footer: "Verifique se você selecionou todos os dados!"
			});
		}
	})
		.done(function(data) {

			getDados();
			showPage(currentPage);
			updatePagination();
			Swal.fire({
				title: "Editado com sucesso",
				icon: "success",
			})
		});
	return false;
}

function cadastrar (){
	var objeto = {
		"escolaId": Number(escolaId),
		"redePublica": $('input[name="isRedePublica"]:checked').val(),
		"fossa": $('input[name="isFossa"]:checked').val(),
		"inexistente": $('input[name="isInexistente"]:checked').val()
	}
	$.ajax({
		url: url_base + "/escolaEsgoto",
		type: "POST",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(objeto)
			console.log(e)
			console.log(e.responseJSON[0].mensagem)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Este item já foi cadastrado!",

			});
		}
	})
		.done(function(data) {
			
			dados = data
			
			showPage(currentPage);
			updatePagination();
			Swal.fire({
				title: "Cadastrado com sucesso",
				icon: "success",
			})
		})
	return false;
}
