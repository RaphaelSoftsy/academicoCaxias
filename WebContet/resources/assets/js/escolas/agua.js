
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
		url: url_base + `/escolaAgua/escola/${escolaId}`,
		type: "GET",
		async: false,
	})
		.done(function(data) {

			console.log(data)

			if (data[0].semAgua == "S") {
				$('input[id="isAguaTratadaN"]').prop('checked', true)
				$('input[id="isAguaTratadaN"]').prop('disabled', true)
				$('input[id="isAguaTratadaS"]').prop('disabled', true)
				$('input[id="isPocoArtesianoN"]').prop('checked', true)
				$('input[id="isPocoArtesianoN"]').prop('disbled', true)
				$('input[id="isPocoArtesianoS"]').prop('disbled', true)
				$('input[id="isCacimbaN"]').prop('checked', true)
				$('input[id="isCacimbaN"]').prop('disabled', true)
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


})


$('input[id="isSemAguaS"]').click(() => {
	$('input[id="isAguaTratadaN"]').prop('checked', true)
	$('input[id="isAguaTratadaN"]').prop('disabled', true)
	$('input[id="isAguaTratadaS"]').prop('disabled', true)
	$('input[id="isPocoArtesianoN"]').prop('checked', true)
	$('input[id="isPocoArtesianoN"]').prop('disbled', true)
	$('input[id="isPocoArtesianoS"]').prop('disbled', true)
	$('input[id="isCacimbaN"]').prop('checked', true)
	$('input[id="isCacimbaN"]').prop('disabled', true)
	$('input[id="isCacimbaS"]').prop('disabled', true)
	$('input[id="isFonteRioN"]').prop('checked', true)
	$('input[id="isFonteRioN"]').prop('disabled', true)
	$('input[id="isFonteRioS"]').prop('disabled', true)
})

$("#formNovoCadastro").submit(function(e) {

	e.preventDefault();

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
			showPage(currentPage);
			updatePagination();
			Swal.fire({
				title: "Cadastrado com sucesso",
				icon: "success",
			})
		})
	return false;

})
