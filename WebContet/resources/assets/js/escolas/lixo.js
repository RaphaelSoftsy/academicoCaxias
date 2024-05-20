
var pefilEscola = localStorage.getItem("perfil");
var escola = JSON.parse(pefilEscola);
var nomeEscola = escola.nome;
var rows = 8;
var currentPage = 1;
var pagesToShow = 5;
var escolaId = localStorage.getItem('escolaId');
let checkS = $("#isOutrosS")
let checkN = $("#isOutrosN")

$(document).ready(function() {

	$('#tituloForm').text(nomeEscola);

	$.ajax({
		url: url_base + `/escolaLixo/escola/${escolaId}`,
		type: "GET",
		async: false,
	})
		.done(function(data) {
			if (data[0].coletaPeriodica == "S") {
				$('input[id="isColetaPeriodicaS"]').prop('checked', true)
			} else {
				$('input[id="isColetaPeriodicaN"]').prop('checked', true)
			}
			
			if (data[0].queimaLixo == "S") {
				$('input[id="isQueimaLixoS"]').prop('checked', true)
			} else {
				$('input[id="isQueimaLixoN"]').prop('checked', true)
			}
			
			if (data[0].jogaOutraArea == "S") {
				$('input[id="isJogaOutraAreaS"]').prop('checked', true)
			} else {
				$('input[id="isJogaOutraAreaN"]').prop('checked', true)
			}
			
			if (data[0].reciclagem == "S") {
				$('input[id="isReciclagemS"]').prop('checked', true)
			} else {
				$('input[id="isReciclagemN"]').prop('checked', true)
			}
			
			if (data[0].enterra == "S") {
				$('input[id="isEnterraS"]').prop('checked', true)
			} else {
				$('input[id="isEnterraN"]').prop('checked', true)
			}
			
			if (data[0].outros == "S") {
				$('input[id="isOutrosS"]').prop('checked', true)
			} else {
				$('input[id="isOutrosN"]').prop('checked', true)
			}
			
			if (data[0].descricaoOutros == null) {
				$("#cardDesc").hide()
			} else {
				$("#cardDesc").show()
				$('input[id="descricao"]').val(data[0].descricaoOutros)
			}
			
			

		})



	checkS.on('click', function() {
		$("#cardDesc").show()
	})

	checkN.on('click', function() {
		$("#cardDesc").hide()
	})

})


$("#formNovoCadastro").submit(function(e) {

	e.preventDefault();

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

})
