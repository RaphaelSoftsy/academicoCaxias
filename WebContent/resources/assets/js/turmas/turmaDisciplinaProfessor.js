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
let idProfessor = null
let idProfessorSelecionado = ''
let url = ''
var listaProfessores
let idDisciplina
let idEscola

$(document).ready(function() {
	$('.container-table').hide()
	$('#btn-save').hide()
	$('#escolaIdDisable, #disciplinaIdDisable').prop('disabled', true)
	$.ajax({
		url: url_base + "/disciplina/conta/" + contaId,
		type: "GET",
		async: false,
	}).done(function(data) {
		console.log(data)

		$.each(data, function(index, item) {
			$("#disciplinaId").append(
				$("<option>", {
					value: item.idDisciplina,
					text: `${item.codDiscip} - ${item.nome}`,
					name: item.nome,
				})
			);

			$("#disciplinaIdDisable").append(
				$("<option>", {
					value: item.idDisciplina,
					text: `${item.codDiscip} - ${item.nome}`,
					name: item.nome,
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
		error: function(e) {
			console.log(e);
			console.log(e.responseJSON);
		}
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

			$("#escolaIdDisable").append(
				$("<option>", {
					value: item.idEscola,
					text: item.nomeEscola,
					name: item.nomeEscola,
				})
			);
		});
	})
})

function listarProfessores(dados) {
	var html = dados.map(function(item) {
		var ativo;

		if (item.ativo == "N") {
			ativo = '<i  style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não';
		} else {
			ativo = "<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim";
		}

		let colorBtn = 'btn-warning'

		if (idProfessorSelecionado == item.idProfessor) {
			colorBtn = 'btn-primary'
		}

		return (
			"<tr>" +

			'<td class="d-flex justify-content-center"><span style="width: 50%; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn ' + colorBtn + ' btn-sm" data-id="' +
			item.idProfessor +
			'" data-nome="' +
			item.nomeCompleto +
			'"onclick="selecionar(this)"><i class="fa-solid fa-right-to-bracket fa-lg"></i></span></td>' +

			"<td>" +
			item.nomeCompleto +
			"</td>" +

			"<td>" +
			item.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4") +
			"</td>" +

			"<td>" +
			item.matricula +
			"</td>" +

			"<td>" +
			item.emailInstitucional +
			"</td>" +

			"</tr>"
		);
	}).join("");

	$("#cola-tabela-professor").html(html);
}

function listarTurmas(dados) {
	var html = dados.map(function(item) {
		var ativo;

		if (item.ativo == "N") {
			ativo = '<i  style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não';
		} else {
			ativo = "<i  style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim";
		}

		return (
			"<tr>" +

			"<td>" +
			item.turma.nomeTurma +
			"</td>" +


			"<td>" +
			item.turma.codTurmaInep +
			"</td>" +

			"<td>" +
			item.turma.gradeCurricular.disciplina.codDiscip + ' - ' + item.turma.gradeCurricular.disciplina.nome +
			"</td>" +

			"<td>" +
			item.turma.periodoLetivo.ano + '/' + item.turma.periodoLetivo.periodo +
			"</td>" +

			"<td>" +
			item.turma.turno.turno +
			"</td>" +

			"<td><div class='d-flex align-items-center gap-1'>" +
			'<input type="checkbox" data-status="' +
			item.ativo +
			'" data-id="' +
			item.idTurmaProfessor +
			' " onChange="alteraStatus(this)" '+ `${item.ativo === "S" ? "checked" : ""}` +' data-toggle="toggle" data-onstyle="success" data-offstyle="danger" data-on="Sim" data-off="Não" data-width="63" class="checkbox-toggle" data-size="sm">' +
			"</div></td>" +
			"</tr>"
		);
	}).join("");

	$("#cola-tabela-disciplina").html(html);
	
	
}

function alteraStatus(element) {
	var id = element.getAttribute("data-id");
	var status = element.getAttribute("data-status");

	console.log(id)
	console.log(status)

	const button = $(element).closest("tr").find(".btn-status");
	if (status === "S") {
		button.removeClass("btn-success").addClass("btn-danger");
		button.find("i").removeClass("fa-check").addClass("fa-xmark");
		element.setAttribute("data-status", "N");
	} else {
		button.removeClass("btn-danger").addClass("btn-success");
		button.find("i").removeClass("fa-xmark").addClass("fa-check");
		element.setAttribute("data-status", "S");
	}

	console.log(id)

	$.ajax({
		url: url_base + `/turmaProfessor/${id}${status === "S" ? '/desativar' : '/ativar'}`,
		type: "put",
		error: function(e) {
			Swal.close();
			console.log(e);
			console.log(e.responseJSON);
			Swal.fire({
				icon: "error",
				title: "Não foi possivel desativar no momento! Tente novamente após alguns instantes."
			});
		}
	}).then(data => {
		console.log(data)
		getDisciplinas()
	})
}

const selecionar = (element) => {
	idProfessorSelecionado = element.getAttribute("data-id")
	listarProfessores(listaProfessores)
	getTurmas()
}

const getTurmas = () => {
	$.ajax({
		url: url_base + '/turmaProfessor/professor/' + idProfessorSelecionado,
		type: "GET",
		async: false,
		error: function(e) {
			console.log(url)
			console.log(e)
		}
	}).done(function(data) {
		console.log(data)

		listarTurmas(data)
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.log(url)
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	})
}

const getTurmasByDisciplina = () => {

	$.ajax({
		url: url_base + '/turma/filtrar?idEscola=' + idEscola + '&idDisciplina=' + idDisciplina,
		type: "GET",
		async: false,
		error: function(e) {
			console.log(e)
		}
	}).done(function(data) {
		console.log(data)

		$('#turmaId').empty()
		if (data.data.length > 0) {
			$('#turmaId').removeAttr('disabled');
			$('#turmaId').append(`<option value='0' selected disabled>Selecione uma turma</option>`)

			$.each(data.data, function(index, item) {
				$("#turmaId").append(
					$("<option>", {
						value: item.idTurma,
						text: item.nomeTurma,
						name: item.nomeTurma,
					})
				);
			});
		} else {
			$('#turmaId').append(`<option value='0' selected disabled>Nenhuma turma encontrada</option>`)
		}
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.log(url)
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	})
}

$('#btn-buscar').click(() => {
	let escolaId = $('#escolaId').val()
	let disciplinaId = $('#disciplinaId').val()

	idDisciplina = disciplinaId
	idEscola = escolaId

	let escolaPath = escolaId != null ? `idEscola=${escolaId}&` : ''
	let disciplinaPath = disciplinaId != null ? `idDisciplina=${disciplinaId}&` : ''

	url = url_base + `/professores/filtrarDisciplinaEscola?` + escolaPath + disciplinaPath
	/*	url = url_base + `/professores`*/

	$.ajax({
		url: url,
		type: "GET",
		async: false,
		error: function(e) {
			console.log(url)
			console.log(e)
		}
	}).done(function(data) {
		$('.container-table').show()
		$('#btn-save').show()
		$("#messageInfo").addClass("none")
		console.log(data)
		listaProfessores = data.data
		listarProfessores(data.data)
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.log(url)
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	});
})

const adicionar = () => {
	let objeto = {
		"professorId": idProfessorSelecionado,
		"turmaId": $('#turmaId').val()
	}

	if (idProfessorSelecionado == '') {

	} else {
		$.ajax({
			url: url_base + "/turmaProfessor",
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
				if (e.responseJSON != undefined) {
					if (e.responseJSON.error == "Duplicidade de registro") {
						Swal.fire({
							icon: "error",
							title: "Erro de duplicidade",
							text: "Essa disciplina já foi adicionada para esse professor!",

						});
					}
				} else {
					Swal.fire({
						icon: "error",
						title: "Oops...",
						text: "Não foi possível realizar esse comando!",

					});
				}
			}
		}).done(function(data) {
			Swal.close()
			Swal.fire({
				title: "Adicionado com sucesso",
				icon: "success",
			}).then(result => {
				$('#turmaId').val('')
				getTurmas()
			})
		})
	}
}


$('#periodoLetivoId').change(() => {

	$('#turnoId').empty()
	$('#turnoId').removeAttr('disabled');
	$('#turnoId').append(`<option value='0' selected disabled>Selecione o currículo</option>`)

	$('#turmaId').prop('disabled', true)
	$('#turmaId').empty()
	$('#turmaId').append(`<option value='0' selected disabled>Selecione uma turma</option>`)

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
});

$('#turnoId').change(() => {
	getTurmasByDisciplina()
});

$('#escolaId').change(() => {
	$('#disciplinaId, #disciplinaIdDisable').empty()
	$('#disciplinaId, #disciplinaIdDisable').append(`<option value='0' selected disabled>Selecione uma opção</option>`)
	$.ajax({
		url: url_base + "/disciplina/conta/" + contaId,
		type: "GET",
		async: false,
	}).done(function(data) {
		console.log(data)

		$.each(data, function(index, item) {
			$("#disciplinaId").append(
				$("<option>", {
					value: item.idDisciplina,
					text: `${item.codDiscip} - ${item.nome}`,
					name: item.nome,
				})
			);

			$("#disciplinaIdDisable").append(
				$("<option>", {
					value: item.idDisciplina,
					text: `${item.codDiscip} - ${item.nome}`,
					name: item.nome,
				})
			);
		});
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	});

	idProfessorSelecionado = ''
	$("#cola-tabela-professor").empty()
	$("#cola-tabela-disciplina").empty()

});

$('#disciplinaId').change(() => {
	idProfessorSelecionado = ''
	$("#cola-tabela-professor").empty()
	$("#cola-tabela-disciplina").empty()
})

const adicionarTurma = () => {
	$('#escolaIdDisable').val($('#escolaId').val())
	$('#disciplinaIdDisable').val($('#disciplinaId').val())
	$('#turmaId').prop('disabled', true)
	$('#turmaId, #turnoId, #periodoLetivoId').empty()
	$('#turmaId').append(`<option value='0' selected disabled>Selecione uma turma</option>`)
	$('#turnoId').append(`<option value='0' selected disabled>Selecione um turno</option>`)
	$('#periodoLetivoId').append(`<option value='0' selected disabled>Selecione um periodo letivo</option>`)

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
					text: `Ano: ${item.ano} - Período: ${item.periodo}`,
					name: item.periodo,
				})
			);
		});
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	});
}


$('#editItem').on('show.bs.modal', function(event) {
	if (idProfessorSelecionado == '') {
		event.preventDefault();
		Swal.fire({
			title: "Selecione um professor!!",
			icon: "info",
		})
	}
});

$("#editItem").on("submit", function(e) {
	e.preventDefault();

	if (idProfessorSelecionado != null) {
		adicionar();
	} else {
		Swal.fire({
			title: "Selecione um professor!!",
			icon: "info",
		})
	}
	return false;
});