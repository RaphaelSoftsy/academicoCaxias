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
const idTurma = params.get("id");
let grades = []
let turmas = []

$(document).ready(function() {
	$('.container-table').hide()
	$('.row-hidden').hide()
	$('#btn-submit').hide()
	$('#btn-save').hide()
	$('#serieId').prop('disabled', true);
	$('#curriculoId').prop('disabled', true);

	$.ajax({
		url: url_base + "/cursos/conta/" + contaId,
		type: "GET",
		async: false,
	}).done(function(data) {
		console.log(data)

		$.each(data, function(index, item) {
			$("#cursoId").append(
				$("<option>", {
					value: item.idCurso,
					text: item.nome,
					name: item.nome,
				})
			);
		});
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	});

	$.ajax({
		url: url_base + "/serie/conta/" + contaId,
		type: "GET",
		async: false,
	}).done(function(data) {
		console.log(data)

		$.each(data, function(index, item) {
			$("#serieId").append(
				$("<option>", {
					value: item.idSerie,
					text: item.serie,
					name: item.serie,
				})
			);
		});
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	});

	$.ajax({
		url: url_base + "/escolas/conta/" + contaId,
		type: "GET",
		async: false,
	}).done(function(data) {
		console.log(data)

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
		url: url_base + "/periodoletivo/conta/" + contaId,
		type: "GET",
		async: false,
	}).done(function(data) {
		console.log(data)

		$.each(data, function(index, item) {
			$("#periodoLetivoId").append(
				$("<option>", {
					value: item.idPeriodoLetivo,
					text: `${item.ano}/${item.periodo}`,
					name: `${item.ano}/${item.periodo}`,
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
		console.log(data)

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



	if (idTurma != undefined) {
		$('#span-title').text('Editar Cadastro')
		$('#tituloForm').text('Atualizar Turma')
		$('#btn-submit').text('Atualizar')
		$.ajax({
			url: url_base + "/turma/" + idTurma,
			type: "GET",
			async: false,
		}).done(function(data) {
			/*$('#escolaId').val(data.escolaId)
			$('#turnoId').val(data.turno.idTurno)
			$('#periodoLetivoId').val(data.periodoLetivo.idPeriodoLetivo)
			$('#gradeCurricularId').val(data.gradeCurricularId)
			$('#nomeTurma').val(data.nomeTurma)
			$('#codTurmaInep').val(data.codTurmaInep)
			$('#vagas').val(data.vagas)
			$('#libras').val(data.libras)
			$('#controlaVagas').val(data.controlaVagas)*/
			$('.container-table').show()
			$('.row-hidden').show()
			$('#btn-submit').show()
			$('#btn-save').show()
			$('#serieId').prop('disabled', false);
			$('#curriculoId').prop('disabled', false);

			let lista = [data]
			listarTurmas(lista)

		}).fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});
	}
})

$('#cursoId').change(() => {
	$('#serieId').removeAttr('disabled');
	$('#curriculoId').removeAttr('disabled');

	let cursoId = $('#cursoId').val()

	$.ajax({
		url: url_base + "/curriculo/curso/" + cursoId,
		type: "GET",
		async: false,
	}).done(function(data) {
		console.log(data)
		$('#curriculoId').empty()

		$("#curriculoId").append(
			$("<option>", {
				value: 0,
				text: 'Selecione uma opção',
				name: 'Selecione uma opção'
			}).prop('disabled', true).prop('selected', true)
		);

		$.each(data, function(index, item) {
			$("#curriculoId").append(
				$("<option>", {
					value: item.idCurriculo,
					text: item.curriculo,
					name: item.curriculo,
				})
			);
		});
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	});
})

$('#btn-buscar').click(() => {
	if ($('#curriculoId').val() == null ||
		$('#serieId').val() == null ||
		$('#cursoId').val() == null
	) {
		Swal.fire({
			icon: "info",
			title: "Informe os tres valores",
		});
	} else {
		let curriculoId = $('#curriculoId').val()
		let serieId = $('#serieId').val()
		$.ajax({
			url: url_base + "/gradeCurricular/curriculo/" + curriculoId + '/serie/' + serieId,
			type: "GET",
			async: false,
		}).done(function(data) {
			grades = data
			listarGradeCurricular(data);
			$('.container-table').not('.contTable').show()
			$('.row-hidden').show()
			$('#btn-submit').show()

		}).fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});
	}
})

function listarGradeCurricular(dados) {
	var html = dados.map(function(item) {
		var ativo;

		var obrigatoria;
		var retemSerie;


		if (item.ativo == "N") {
			ativo = '<i  style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não';
		} else {
			ativo = "<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim";
		}

		if (item.obrigatoria == "N") {
			obrigatoria = "Não"
		} else {
			obrigatoria = "Sim"
		}

		if (item.retemSerie == "N") {
			retemSerie = "Não"
		} else {
			retemSerie = "Sim"
		}

		return (
			"<tr>" +

			"<td>" +
			item.serie.serie +
			"</td>" +

			"<td>" +
			item.disciplina.nome +
			"</td>" +

			"<td>" +
			obrigatoria +
			"</td>" +

			"<td>" +
			retemSerie +
			"</td>" +

			"</tr>"
		);
	}).join("");

	$("#cola-tabela-grade").html(html);
}

function listarTurmas(dados) {
	let index = 0
	var html = turmas.map(function(item) {
		let indexItem = index
		index += 1

		return (
			"<tr>" +

			"<td>" +
			item.nomeTurma +
			"</td>" +

			"<td>" +
			item.nomeEscola +
			"</td>" +

			"<td>" +
			item.anoPeriodo +
			"</td>" +

			"<td>" +
			item.nomeTurno +
			"</td>" +

			"<td>" +
			item.serie +
			"</td>" +

			"<td>" +
			item.nomeDisciplina +
			"</td>" +


			"<td>" +
			item.obrigatoria +
			"</td>" +

			"<td>" +
			item.retemSerie +
			"</td>" +

			'<td class="d-flex justify-content-center"><span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-danger btn-sm" data-id="' +
			indexItem +
			'" onclick="removerTurma(this)"><i class="fa-solid fa-xmark"></i></span></td>' +

			"</tr>"
		)
	}).join("");



	$("#cola-tabela-turma").html(html);
}

const removerTurma = (element) => {
	var index = element.getAttribute("data-id")

	turmas.splice(index, 1)
	listarTurmas(turmas)
}

function getAswer(input) {

	if ($(input).is(':checked')) {
		return 'S'
	} else {
		return 'N'
	}

}

function adicionar() {
	$('.contTable').show()
	$('#btn-save').show()
	console.log(grades)

	$.each(grades, function(index, item) {
		console.log(item)
		var objeto = {
			escolaId: $('#escolaId').val(),
			nomeEscola: $('#escolaId option:selected').text(),
			turnoId: $('#turnoId').val(),
			nomeTurno: $('#turnoId option:selected').text(),
			periodoLetivoId: $('#periodoLetivoId').val(),
			anoPeriodo: $('#periodoLetivoId option:selected').text(),
			gradeCurricularId: item.idGradeCurricular,
			nomeTurma: $('#nomeTurma').val(),
			codTurmaInep: $('#codTurmaInep').val(),
			vagas: $('#vagas').val(),
			libras: getAswer($("#isLibra")),
			controlaVagas: getAswer($("#isControlaVagas")),
			disciplinaId: item.disciplina.idDisciplina,
			nomeDisciplina: item.disciplina.nome,
			obrigatoria: '',
			retemSerie: ''
		}
		objeto.serie = item.serie.serie
		if (item.obrigatoria == "N") {
			objeto.obrigatoria = "Não"
		} else {
			objeto.obrigatoria = "Sim"
		}
		if (item.retemSerie == "N") {
			objeto.retemSerie = "Não"
		} else {
			objeto.retemSerie = "Sim"
		}

		console.log(objeto)

		turmas.push(objeto)
	});

	listarTurmas(turmas)
}

const cadastrar = () => {
	$.each(turmas, function(index, objeto) {

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
		}).done(function(data) {
			const len = turmas.length - 1

			if (index == len) {
				Swal.close()
				Swal.fire({
					title: "Cadastrado com sucesso",
					icon: "success",
				}).then(result => {
					window.location.href = "turma-matriz-curricular"
				})
			}
		})
	});
}


/*function editar() {
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
*/
$('#formNovoCadastro').on('submit', function(e) {
	e.preventDefault();
	cadastrar()
	/*	if (idTurma != undefined) {
			editar()
		} else {
			cadastrar();
		}*/
	return false;
});

$('#btn-submit').on('click', function(e) {
	e.preventDefault();
	adicionar();
	return false;
});