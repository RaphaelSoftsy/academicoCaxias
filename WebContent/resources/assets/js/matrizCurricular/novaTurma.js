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


	/*
		$.ajax({
			url: url_base + "/escolas/usuario/" + contaId + "/" + usuarioId,
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
		});*/

	/*$.ajax({
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
	}*/
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

function cadastrar() {
	$('.contTable').show()

	var objeto = {
		escolaId: $('#escolaId').val(),
		nomeEscola: $('#escolaId option:selected').text(),
		turnoId: $('#turnoId').val(),
		nomeTurno: $('#turnoId option:selected').text(),
		periodoLetivoId: $('#periodoLetivoId').val(),
		anoPeriodo: $('#periodoLetivoId option:selected').text(),
		gradeCurricularId:'',
		nomeTurma: $('#nomeTurma').val(),
		codTurmaInep: $('#codTurmaInep').val(),
		vagas: $('#vagas').val(),
		libras: $('input[name="isLibra"]:checked').val(),
		controlaVagas: $('input[name="isControlaVagas"]:checked').val(),
		disciplinaId: '',
		nomeDisciplina: '',
		obrigatoria: '',
		retemSerie: ''
	}
	
	console.log(grades)

	$.each(grades, function(index, item) {
		console.log(item)
		objeto.serie = item.serie.serie
		objeto.disciplinaId = item.disciplina.idDisciplina
		objeto.nomeDisciplina = item.disciplina.nome
		objeto.gradeCurricularId = item.idGradeCurricular
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

	var html = turmas.map(function(item) {

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

			"</tr>"
		);
	}).join("");

	$("#cola-tabela-turma").html(html);

	/*$.ajax({
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
				
				
				
			})
		})
	return false;*/
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
	if (idTurma != undefined) {
		editar()
	} else {
		cadastrar();
	}
	return false;
});