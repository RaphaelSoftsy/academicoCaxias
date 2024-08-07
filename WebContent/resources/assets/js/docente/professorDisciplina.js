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

$(document).ready(function() {
	$('.container-table').hide()
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
})

function listarProfessores(dados) {
	var html = dados.map(function(item) {
		var ativo;

		if (item.ativo == "N") {
			ativo = '<i  style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não';
		} else {
			ativo = "<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim";
		}

		return (
			"<tr>" +

			'<td class="d-flex justify-content-center"><span style="width: 50%; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-id="' +
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

function listarDisciplinas(dados) {
	var html
	if (dados.length > 0) {
		html = dados.map(function(item) {
			var ativo;

			if (item.ativo == "N") {
				ativo = '<i  style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não';
			} else {
				ativo = "<i  style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim";
			}

			return (
				"<tr>" +

				"<td>" +
				item.nome +
				"</td>" +

				"<td>" +
				item.codDiscip +
				"</td>" +

				"<td>" +
				item.horasAno +
				"</td>" +

				"<td>" +
				item.horasSemanal +
				"</td>" +

				"</tr>"
			);
		}).join("");
	} else {
		html = "<tr>"+"</tr>"
	}


	$("#cola-tabela-disciplina").html(html);
}

const selecionar = (element) => {
	listarProfessores(listaProfessores)
	$(element).css('background-color', 'red')

	idProfessorSelecionado = element.getAttribute("data-id")
	getDisciplinas()
}

const getDisciplinas = () => {
	$.ajax({
		url: url_base + '/professores/disciplinas?idProfessor=' + idProfessorSelecionado,
		type: "GET",
		async: false,
		error: function(e) {
			console.log(url)
			console.log(e)
		}
	}).done(function(data) {
		console.log(data)

		listarDisciplinas(data)
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.log(url)
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	})
}

$('#btn-buscar').click(() => {
	let nome = $('#nomeProfessor').val()
	let cpf = $('#cpf').val()
	let matricula = $('#matricula').val()

	/*let url = url_base + `/professores/filtrar?cpf${cpf}=&nome=${nome}&matricula=${matricula}`*/
	let cpfPath = cpf != '' ? `cpf=${cpf}&` : ''
	let nomePath = nome != '' ? `nome=${nome}&` : ''
	let matriculaPath = matricula != '' ? `matricula=${matricula}&` : ''

	url = url_base + `/professores/filtrar?` + cpfPath + nomePath + matriculaPath

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
		console.log(data)
		listaProfessores = data
		listarProfessores(data)
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.log(url)
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	});
})

const adicionar = () => {
	let objeto = {
		"professorId": idProfessorSelecionado,
		"disciplinaId": $('#disciplinaId').val()
	}

	$.ajax({
		url: url_base + "/professorDisciplina",
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
		Swal.close()
		Swal.fire({
			title: "Adicionado com sucesso",
			icon: "success",
		}).then(result => {
			getDisciplinas()
		})
	})
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