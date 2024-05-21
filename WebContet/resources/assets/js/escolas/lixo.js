
var pefilEscola = localStorage.getItem("perfil");
var escola = JSON.parse(pefilEscola);
var nomeEscola = escola.nome;
var dados = []
var rows = 8;
var idEscolaLixo = 0
var currentPage = 1;
var pagesToShow = 5;
var escolaId = localStorage.getItem('escolaId');
let checkS = $("#isOutrosS")
let checkN = $("#isOutrosN")

$(document).ready(function() {

	$('#tituloForm').text(nomeEscola);

	getDados()
})


checkS.on('click', function() {
	$("#cardDesc").show()
})

checkN.on('click', function() {
	$("#cardDesc").hide()
})


$("#formNovoCadastro").submit(function(e) {


	e.preventDefault();
	
	if(dados.length > 0){
		atualizar()
	}else{
		cadastrar()
	}
	
})

function atualizar() {
	if (checkS.is(':checked')) {
		var objeto = {
			"idEscolaLixo": idEscolaLixo,
			"escolaId": Number(escolaId),
			"coletaPeriodica": $('input[name="isColetaPeriodica"]:checked').val(),
			"queimaLixo": $('input[name="isQueimaLixo"]:checked').val(),
			"jogaOutraArea": $('input[name="isJogaOutraArea"]:checked').val(),
			"reciclagem": $('input[name="isReciclagem"]:checked').val(),
			"enterra": $('input[name="isEnterra"]:checked').val(),
			"outros": "S",
			"descricaoOutros": $('#descricao').val()
		}
	} else {
		var objeto = {
			"idEscolaLixo": idEscolaLixo,
			"escolaId": Number(escolaId),
			"coletaPeriodica": $('input[name="isColetaPeriodica"]:checked').val(),
			"queimaLixo": $('input[name="isQueimaLixo"]:checked').val(),
			"jogaOutraArea": $('input[name="isJogaOutraArea"]:checked').val(),
			"reciclagem": $('input[name="isReciclagem"]:checked').val(),
			"enterra": $('input[name="isEnterra"]:checked').val(),
			"outros": "N"
		}
	}

	$.ajax({
		url: url_base + "/escolaLixo",
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

function getDados (){
	$.ajax({
		url: url_base + `/escolaLixo/escola/${escolaId}`,
		type: "GET",
		async: false,
	})
		.done(function(data) {
			
			idEscolaLixo = data[0].idEscolaLixo
			dados = data
			
			if (data[0].coletaPeriodica == "S") {
				$('input[id="isColetaPeriodica"]').attr('checked', true);
			} else {
				$('input[id="isColetaPeriodica"]').attr('checked', false);
			}
			
			if (data[0].queimaLixo == "S") {
				$('input[id="isQueimaLixo"]').attr('checked', true);
			} else {
				$('input[id="isQueimaLixo"]').attr('checked', false);
			}
			
			if (data[0].jogaOutraArea == "S") {
				$('input[id="isJogaOutraArea"]').attr('checked', true);
			} else {
				$('input[id="isJogaOutraArea"]').attr('checked', false);
			}

			if (data[0].reciclagem == "S") {
				$('input[id="isReciclagem"]').attr('checked', true)
			} else {
				$('input[id="isReciclagem"]').attr('checked', true)
			}

			if (data[0].enterra == "S") {
				$('input[id="isEnterra"]').attr('checked', true)
			} else {
				$('input[id="isEnterra"]').attr('checked', true)
			}

			if (data[0].outros == "S") {
				$('input[id="isOutros"]').attr('checked', true)
			} else {
				$('input[id="isOutros"]').attr('checked', true)
			}

			if (data[0].descricaoOutros == null) {
				$("#cardDesc").hide()
			} else {
				$("#cardDesc").show()
				$('input[id="descricao"]').val(data[0].descricaoOutros)
			}
		})
}

function cadastrar (){
	if (checkS.is(':checked')) {
		var objeto = {
			"escolaId": Number(escolaId),
			"coletaPeriodica": $('input[name="isColetaPeriodica"]:checked').val(),
			"queimaLixo": $('input[name="isQueimaLixo"]:checked').val(),
			"jogaOutraArea": $('input[name="isJogaOutraArea"]:checked').val(),
			"reciclagem": $('input[name="isReciclagem"]:checked').val(),
			"enterra": $('input[name="isEnterra"]:checked').val(),
			"outros": "S",
			"descricaoOutros": $('#descricao').val()
		}
	} else {
		var objeto = {
			"escolaId": Number(escolaId),
			"coletaPeriodica": $('input[name="isColetaPeriodica"]:checked').val(),
			"queimaLixo": $('input[name="isQueimaLixo"]:checked').val(),
			"jogaOutraArea": $('input[name="isJogaOutraArea"]:checked').val(),
			"reciclagem": $('input[name="isReciclagem"]:checked').val(),
			"enterra": $('input[name="isEnterra"]:checked').val(),
			"outros": "N"
		}
	}



	$.ajax({
		url: url_base + "/escolaLixo",
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
			showPage(currentPage);
			updatePagination();
			Swal.fire({
				title: "Cadastrado com sucesso",
				icon: "success",
			})
		})
	return false;

}
