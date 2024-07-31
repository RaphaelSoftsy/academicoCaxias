var dados = [];
const contaId = localStorage.getItem('contaId');;
var nome = '';
var nome2 = '';
var nome3 = '';
var rows = 8;
var currentPage = 1;
var pagesToShow = 5;
let descricao = ''
let id = ''
const idTurma = params.get("id");

$(document).ready(function() {

	$.ajax({
		url: url_base + "/escolas/conta/" + contaId,
		type: "GET",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#escolaId").append(
				$("<option>", {
					value: item.idEscola,
					text: item.nomeEscola,
					name: item.nomeEscola,
				})
			);
		});
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	});

	$.ajax({
		url: url_base + "/turno/conta/" + contaId,
		type: "GET",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#turnoId").append(
				$("<option>", {
					value: item.idTurno,
					text: item.turno,
					name: item.turno,
				})
			);
		});
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	});

	$.ajax({
		url: url_base + "/periodoletivo/conta/" + contaId,
		type: "GET",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#periodoLetivoId").append(
				$("<option>", {
					value: item.idPeriodoLetivo,
					text: `Ano: ${item.ano} - Semestre: ${item.periodo}`,
					name: item.periodo,
				})
			);
		});
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	});

	$.ajax({
		url: url_base + "/gradeCurricular",
		type: "GET",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#gradeCurricularId").append(
				$("<option>", {
					value: item.idGradeCurricular,
					text: item.idGradeCurricular,
					name: item.idGradeCurricular,
				})
			);
		});
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	});

	if (idTurma != undefined) {
		$('#span-title').text('Editar Cadastro')
		$('#tituloForm').text('Atualizar Turma')
		$('#btn-submit').text('Atualizar')
		$.ajax({
			url: url_base + "/turma/" + idTurma,
			type: "GET",
			async: false,
		}).done(function(data) {
			$('#escolaId').val(data.escolaId)
			$('#turnoId').val(data.turno.idTurno)
			$('#periodoLetivoId').val(data.periodoLetivo.idPeriodoLetivo)
			$('#gradeCurricularId').val(data.gradeCurricularId)
			$('#nomeTurma').val(data.nomeTurma)
			$('#codTurmaInep').val(data.codTurmaInep)
			$('#vagas').val(data.vagas)
			$('#libras').val(data.libras)
			$('#controlaVagas').val(data.controlaVagas)
		}).fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});
	}
})

function cadastrar() {

	var objeto = {
		escolaId: $('#escolaId').val(),
		turnoId: $('#turnoId').val(),
		periodoLetivoId: $('#periodoLetivoId').val(),
		gradeCurricularId: $('#gradeCurricularId').val(),
		nomeTurma: $('#nomeTurma').val(),
		codTurmaInep: $('#codTurmaInep').val(),
		vagas: $('#vagas').val(),
		libras: $('#libras').val(),
		controlaVagas: $('#controlaVagas').val(),
	}

	$.ajax({
		url: url_base + "/turma",
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
			console.log(e.responseJSON.message)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",

			});
		}
	})
		.done(function(data) {
			Swal.close()
			Swal.fire({
				title: "Cadastrado com sucesso",
				icon: "success",
			}).then(result => {
				window.location.href = 'turma-matriz-curricular'
			})
		})
	return false;
}

function editar() {
	var objeto = {
		idTurma: idTurma,
		escolaId: $('#escolaId').val(),
		turnoId: $('#turnoId').val(),
		periodoLetivoId: $('#periodoLetivoId').val(),
		gradeCurricularId: $('#gradeCurricularId').val(),
		nomeTurma: $('#nomeTurma').val(),
		codTurmaInep: $('#codTurmaInep').val(),
		vagas: $('#vagas').val(),
		libras: $('#libras').val(),
		controlaVagas: $('#controlaVagas').val(),
	}

	$.ajax({
		url: url_base + "/turma",
		type: "PUT",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(e)
			console.log(e.responseJSON.message)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",

			});
		}
	})
		.done(function(data) {
			Swal.close()
			Swal.fire({
				title: "Editado com sucesso",
				icon: "success",
			}).then(result => {
				window.location.href = 'turma-matriz-curricular'
			})
		})
	return false;
}

$('#formNovoCadastro').on('submit', function(e) {
	e.preventDefault();
	if (idTurma != undefined) {
		editar()
	} else {
		cadastrar();
	}
	return false;
});