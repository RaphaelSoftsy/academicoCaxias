
var pefilEscola = localStorage.getItem("perfil");
var escola = JSON.parse(pefilEscola);
var nomeEscola = escola.nome;
var rows = 8;
var currentPage = 1;
var pagesToShow = 5;
var escolaId = localStorage.getItem('escolaId');
let checkS = $("#isOutrosS")
let checkN = $("#isOutrosN")
var idEscolaAgua = 0
var dados = []

$(document).ready(function() {

	$('#tituloForm').text(nomeEscola);

	getDados()


})



function getDados() {
	$.ajax({
		url: url_base + `/escolaAgua/escola/${escolaId}`,
		type: "GET",
		async: false,
	})
		.done(function(data) {

			dados = data

			idEscolaAgua = data[0].idEscolaAgua

			console.log(data)

			if (data[0].semAgua == "N") {
				$('input[id="isAguaTratadaN"]').prop('checked', true)
				$('input[id="isAguaTratadaN"]').prop('disabled', true)
				$('input[id="isAguaTratadaS"]').prop('disabled', true)
				$('input[id="isPocoArtesianoN"]').prop('checked', true)
				$('input[id="isFonteRioN"]').prop('disabled', true)
				$('input[id="isPocoArtesianoS"]').prop('disabled', true)
				$('input[id="isPocoArtesianoN"]').prop('disabled', true)
				$('input[id="isPocoArtesianoN"]').prop('checked', true)
				$('input[id="isCacimbaN"]').prop('disabled', true)
				$('input[id="isCacimbaN"]').prop('checked', true)
				$('input[id="isCacimbaS"]').prop('disabled', true)
				$('input[id="isFonteRioN"]').prop('checked', true)
				$('input[id="isFonteRioN"]').prop('disabled', true)
				$('input[id="isFonteRioS"]').prop('disabled', true)

			} else {
				if (data[0].aguaTratada == "S") {
					$('input[id="isAguaTratadaS"]').prop('checked', true)
				} else {
					$('input[id="isAguaTratadaN"]').prop('checked', true)
				}

				if (data[0].aguaPocoArtesiano == "S") {
					$('input[id="isPocoArtesianoS"]').prop('checked', true)
				} else {
					$('input[id="isPocoArtesianoN"]').prop('checked', true)
				}

				if (data[0].aguaCacimba == "S") {
					$('input[id="isCacimbaS"]').prop('checked', true)
				} else {
					$('input[id="isCacimbaN"]').prop('checked', true)
				}

				if (data[0].fonteRio == "S") {
					$('input[id="isFonteRioS"]').prop('checked', true)
				} else {
					$('input[id="isFonteRioN"]').prop('checked', true)
				}
			}

			if (data[0].semAgua == "S") {
				$('input[id="isSemAguaS"]').prop('checked', true)
			} else {
				$('input[id="isSemAguaN"]').prop('checked', true)
			}


		})

		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

	return false
}
$('input[id="isSemAguaN"]').click(() => {
	$('input[id="isAguaTratadaN"]').prop('checked', true)
	$('input[id="isAguaTratadaN"]').prop('disabled', true)
	$('input[id="isAguaTratadaS"]').prop('disabled', true)
	$('input[id="isPocoArtesianoN"]').prop('checked', true)
	$('input[id="isFonteRioN"]').prop('disabled', true)
	$('input[id="isPocoArtesianoS"]').prop('disabled', true)
	$('input[id="isPocoArtesianoN"]').prop('disabled', true)
	$('input[id="isPocoArtesianoN"]').prop('checked', true)
	$('input[id="isCacimbaN"]').prop('disabled', true)
	$('input[id="isCacimbaN"]').prop('checked', true)
	$('input[id="isCacimbaS"]').prop('disabled', true)
	$('input[id="isFonteRioN"]').prop('checked', true)
	$('input[id="isFonteRioN"]').prop('disabled', true)
	$('input[id="isFonteRioS"]').prop('disabled', true)
})

$('input[id="isSemAguaS"]').click(() => {
	$('input[id="isAguaTratadaN"]').prop('checked', false)
	$('input[id="isAguaTratadaN"]').prop('disabled', false)
	$('input[id="isAguaTratadaS"]').prop('disabled', false)
	$('input[id="isPocoArtesianoN"]').prop('checked', false)
	$('input[id="isPocoArtesianoS"]').prop('disabled', false)
	$('input[id="isPocoArtesianoN"]').prop('disabled', false)
	$('input[id="isCacimbaN"]').prop('checked', false)
	$('input[id="isCacimbaN"]').prop('disabled', false)
	$('input[id="isCacimbaS"]').prop('disabled', false)
	$('input[id="isFonteRioN"]').prop('checked', false)
	$('input[id="isFonteRioN"]').prop('disabled', false)
	$('input[id="isFonteRioS"]').prop('disabled', false)
})



$("#formNovoCadastro").submit(function(e) {

	e.preventDefault();

	console.log(dados)

	if (dados.length > 0) {
		atualizar()
	} else {
		cadastrar()
	}

})


function atualizar() {
	var objeto = {
		"idEscolaAgua": idEscolaAgua,
		"escolaId": escolaId,
		"aguaTratada": $('input[name="isAguaTratada"]:checked').val(),
		"aguaPocoArtesiano": $('input[name="isPocoArtesiano"]:checked').val(),
		"aguaCacimba": $('input[name="isCacimba"]:checked').val(),
		"aguaFonteRio": $('input[name="isFonteRio"]:checked').val(),
		"semAgua": $('input[name="isSemAgua"]:checked').val()
	}

	$.ajax({
		url: url_base + "/escolaAgua",
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

	var objeto = {
		"escolaId": Number(escolaId),
		"aguaTratada": $('input[name="isAguaTratada"]:checked').val(),
		"aguaPocoArtesiano": $('input[name="isPocoArtesiano"]:checked').val(),
		"aguaCacimba": $('input[name="isCacimba"]:checked').val(),
		"aguaFonteRio": $('input[name="isFonteRio"]:checked').val(),
		"semAgua": $('input[name="isSemAgua"]:checked').val()
	}


	$.ajax({
		url: url_base + "/escolaAgua",
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
