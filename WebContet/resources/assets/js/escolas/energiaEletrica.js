
var pefilEscola = localStorage.getItem("perfil");
var escola = JSON.parse(pefilEscola);
var nomeEscola = escola.nome;
var rows = 8;
var currentPage = 1;
var pagesToShow = 5;
var escolaId = localStorage.getItem('escolaId');
let checkS = $("#isOutrosS")
let checkN = $("#isOutrosN")
var idEscolaEnergiaEletrica = 0
var dados = []


$(document).ready(function() {

	$('#tituloForm').text(nomeEscola);

	getDados()

})


$("#formNovoCadastro :input").change(function() {
   $("#btn-submit").removeAttr('disabled')
});

function getDados() {
	$.ajax({
		url: url_base + `/escolaEnergiaEletrica/escola/${escolaId}`,
		type: "GET",
		async: false,
	})
		.done(function(data) {

			dados = data

			idEscolaEnergiaEletrica = data[0].idEscolaEnergiaEletrica

			console.log(data)



			if (data[0].redePublica == "S") {
				$('input[id="isRedePublica"]').attr('checked', true)
			} else {
				$('input[id="isRedePublica"]').attr('checked', false)
			}


			if (data[0].gerador == "S") {
				$('input[id="isGerador"]').attr('checked', true)
			} else {
				$('input[id="isGerador"]').attr('checked', false)
			}

			if (data[0].outros == "S") {
				$('input[id="isOutros"]').attr('checked', true)
			} else {
				$('input[id="isOutros"]').attr('checked', false)
			}

			if (data[0].descricaoOutros == null) {
				$("#cardDesc").hide()
				$('input[id="isRedePublica"]').attr('checked', true)
			} else {
				$("#cardDesc").show()
				$("#cardDesc").val(data[0].descricaoOutros)
			}

			if (data[0].semEnergiaEletrica == 'N') {
				$('input[id="isSemEnergiaEletrica"]').attr('checked', false)
				$('input[id="isGerador"]').attr('checked', false)
				$('input[id="isGerador"]').prop('disabled', true)
				$('input[id="isOutros"]').attr('checked', false)
				$('input[id="isOutros"]').prop('disabled', true)
				$("#cardDesc").hide()
			}

		})

		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

	return false
}


/*$('input[id="isInexistente"]').click(() => {
	if ($('input[id="isInexistente"]').is(':checked') == true) {
		$('input[id="isFossa"]').prop('checked', false)
		$('input[id="isFossa"]').prop('disabled', true)
	} else {
		$('input[id="isFossa"]').attr('checked', false)
		$('input[id="isFossa"]').prop('disabled', false)
	}
})*/


$('input[id="isSemEnergiaEletrica"]').click(() => {
	if ($('input[id="isSemEnergiaEletrica"]').is(':checked') == true) {
		$('input[id="isGerador"]').prop('checked', true)
		$('input[id="isGerador"]').prop('disabled', false)
		$('input[id="isOutros"]').prop('checked', true)
		$('input[id="isOutros"]').prop('disabled', false)
		$("#cardDesc").show()
		
	} else {
		$('input[id="isGerador"]').prop('checked', false)
		$('input[id="isGerador"]').prop('disabled', true)
		$('input[id="isOutros"]').prop('checked', false)
		$('input[id="isOutros"]').prop('disabled', true)
		$("#cardDesc").hide()
	}
})


$('input[id="isOutros"]').click(() => {
	if ($('input[id="isOutros"]').is(':checked') == true) {
		$("#cardDesc").show()
	} else {
		$("#cardDesc").hide()
	}
})



$("#formNovoCadastro").submit(function(e) {

	e.preventDefault();

	if (dados.length > 0) {
		atualizar()
	} else {
		cadastrar()
	}


})

function getAswer(input) {

	if ($(input).is(':checked')) {
		return 'S'
	} else {
		return 'N'
	}

}

function atualizar() {
	if ($('input[id="isOutros"]').is(':checked')) {
		var objeto = {
			"idEscolaEnergiaEletrica": idEscolaEnergiaEletrica,
			"escolaId": Number(escolaId),
			"redePublica": getAswer("#isRedePublica"),
			"gerador": getAswer("#isGerador"),
			"outros": getAswer("#isOutros"),
			"descricaoOutros": $("#descricao").val(),
			"semEnergiaEletrica": getAswer("#isSemEnergiaEletrica")
		}
	} else {
		var objeto = {
			"idEscolaEnergiaEletrica": idEscolaEnergiaEletrica,
			"escolaId": Number(escolaId),
			"redePublica": getAswer("#isRedePublica"),
			"gerador": getAswer("#isGerador"),
			"outros": getAswer("#isOutros"),
			"semEnergiaEletrica": getAswer("#isSemEnergiaEletrica")
		}
	}


	$.ajax({
		url: url_base + "/escolaEnergiaEletrica",
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

function cadastrar() {
	if ($('input[id="isOutros"]').is(':checked')) {
		var objeto = {
			"escolaId": Number(escolaId),
			"redePublica": getAswer("#isRedePublica"),
			"gerador": getAswer("#isGerador"),
			"outros": getAswer("#isOutros"),
			"descricaoOutros": $("#descricao").val(),
			"semEnergiaEletrica": getAswer("#isSemEnergiaEletrica")
		}
	} else {
		var objeto = {
			"escolaId": Number(escolaId),
			"redePublica": getAswer("#isRedePublica"),
			"gerador": getAswer("#isGerador"),
			"outros": getAswer("#isOutros"),
			"semEnergiaEletrica": getAswer("#isSemEnergiaEletrica")
		}
	}
	$.ajax({
		url: url_base + "/escolaEnergiaEletrica",
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

