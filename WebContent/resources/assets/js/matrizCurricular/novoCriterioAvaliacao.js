var dados = [];
const contaId = localStorage.getItem('contaId');
var nome = '';
var nome2 = '';
var nome3 = '';
var rows = 8;
var currentPage = 1;
var pagesToShow = 5;
let descricao = ''
let id = ''
const idCriterioAvaliacao = params.get("id");

$(document).ready(function() {
	$.ajax({
		url: url_base + "/turma",
		type: "GET",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#turmaId").append(
				$("<option>", {
					value: item.idTurma,
					text: `${item.nomeTurma} - ${item.gradeCurricular.disciplina.nome} - ${item.gradeCurricular.disciplina.codDiscip}`,
					name: `${item.nomeTurma} - ${item.gradeCurricular.disciplina.nome} - ${item.gradeCurricular.disciplina.codDiscip}`,
				})
			);
		});
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	});

	if (idCriterioAvaliacao != undefined) {
		$("#tituloPagina, #tituloForm").text("Editar critério")
		$("#h1-curso").text("Editar critério")
		$("#btn-save").text("Editar")
		
		$.ajax({
			url: url_base + "/criteriosAvaliacao/" + idCriterioAvaliacao,
			type: "GET",
			async: false,
		}).done(function(data) {
			$('#turmaId').val(data.turmaId),
				$('#criterioAvaliacao').val(data.criterioAvaliacao),
				$('#ordem').val(data.ordem),
				$('#dataProva').val(data.dataProva)
		}).fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});
	}

})

const cadastrar = () => {

	let objeto = {
		"turmaId": $('#turmaId').val(),
		"criterioAvaliacao": $('#criterioAvaliacao').val(),
		"ordem": $('#ordem').val(),
		"dataProva": $('#dataProva').val()
	}

	$.ajax({
		url: url_base + "/criteriosAvaliacao",
		type: "POST",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		async: false,
		beforeSend: function() {
			Swal.showLoading()
		},
		error: function(e) {
			Swal.close()
			console.log(e)
			console.log(e.responseJSON)
			console.log(e.responseJSON.message)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",

			});
		}
	}).done(function(data) {

		Swal.close()
		Swal.fire({
			title: "Cadastrado com sucesso",
			icon: "success",
		}).then(result => {
			window.location.href = "criterio-avaliacao"
		})
	})
}

function editar() {
	let objeto = {
		"idCriterioAvaliacao": idCriterioAvaliacao,
		"turmaId": $('#turmaId').val(),
		"criterioAvaliacao": $('#criterioAvaliacao').val(),
		"ordem": $('#ordem').val(),
		"dataProva": $('#dataProva').val()
	}

	$.ajax({
		url: url_base + "/criteriosAvaliacao",
		type: "PUT",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(e)
			console.log(e.responseJSON)
			console.log(e.responseJSON.message)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",

			});
		}
	}).done(function(data) {
		Swal.close()
		Swal.fire({
			title: "Editado com sucesso",
			icon: "success",
		}).then(result => {
			window.location.href = 'criterio-avaliacao'
		})
	})
}

$('#btn-save').on('click', function(e) {
	e.preventDefault();
	if (idCriterioAvaliacao != undefined) {
		editar()
	} else {
		cadastrar()
	}
	return false;
});