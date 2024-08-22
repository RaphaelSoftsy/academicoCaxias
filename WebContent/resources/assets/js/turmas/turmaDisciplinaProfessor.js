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
			' " onChange="alteraStatus(this)" checked data-toggle="toggle" data-onstyle="success" data-offstyle="danger" data-on="Sim" data-off="Não" data-width="63" class="checkbox-toggle" data-size="sm">' +
			"</div></td>" +
			"</tr>"
		);
	}).join("");

	$("#cola-tabela-disciplina").html(html);
	$('.checkbox-toggle').each(function() {
		var status = $(this).data('status');
		if (status !== 'S') {
			$(this).prop('checked', false);
		}
	});
	$('input[data-toggle="toggle"]').bootstrapToggle();
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

/*const removerDisciplina = (element) => {
	idDisciplina = element.getAttribute("data-id")
	Swal.fire({
		title: "Deseja tirar essa disciplina do professor?",
		icon: "warning",
		showCancelButton: true,
		showConfirmButton: false,
		showDenyButton: true,
		denyButtonText: 'Retirar',
		cancelButtonText: 'Cancelar'
	}).then(result => {
		if (result.isDenied) {
			$.ajax({
				url: url_base + "/contaPadraoAcessos/" + Number(id),
				type: "delete",
				contentType: "application/json; charset=utf-8",
				async: false,
				error: function(e) {
					console.log(e)
					Swal.fire({
						icon: "error",
						title: "Oops...",
						text: "Não foi possível realizar esse comando!"

					});
				}
			}).done(function(data) {
				Swal.fire({
					title: "Deletado com sucesso",
					icon: "success",
				}).then((data) => {
					window.location.href = 'padraoAcesso'
				})
			})
		} else if (result.isCanceled) { }
	})
}*/

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
	getTurmasByDisciplina()

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