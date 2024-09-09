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
let turmas = []
let idTurmaSelecionada = ''

$(document).ready(function() {
	/*$('.container-table').hide()*/
	$('#btn-save').hide()
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
					name: item.nome,
				})
			);
		});
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	});
})

function listarTurmas(dados) {
	var html = dados.map(function(item) {
		var ativo;

		if (item.ativo == "N") {
			ativo = '<i  style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não';
		} else {
			ativo = "<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim";
		}

		let colorBtn = 'btn-warning'

		if (idTurmaSelecionada == item.idTurma) {
			colorBtn = 'btn-primary'
		}

		return (
			"<tr>" +

			'<td class="d-flex justify-content-center"><span style="width: 50%; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn ' + colorBtn + ' btn-sm" data-id="' +
			item.turnoId +
			'" data-nome="' +
			item.numTurma +
			'"onclick="selecionar(this)"><i class="fa-solid fa-right-to-bracket fa-lg"></i></span></td>' +

			"<td>" +
			item.numTurma +
			"</td>" +

			"<td>" +
			item.codTurmaInep +
			"</td>" +

			"</tr>"
		);
	}).join("");

	$("#cola-tabela-professor").html(html);
}

$('#btn-buscar').click(() => {
	buscar()
})

const buscar = () => {
	$.ajax({
		url: url_base + `/professores/filtrar?`,
		type: "GET",
		async: false,
		error: function(e) {
			console.log(url)
			console.log(e)
		}
	}).done(function(data) {
		$('.container-table').show()
		$("#messageInfo").addClass("none")
		turmas = data.data
		listarTurmas(data.data)
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.log(url)
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	});
}

const selecionar = (element) => {
	idTurmaSelecionada = element.getAttribute("data-id")
	let objetoPesquisa = {
		turmaId: idTurmaSelecionada,
		escolaId: $('#escolaId').val(),
		cursoId: $('#disciplinaId').val(),
		disciplinaId: $('#disciplinaId').val(),
		turnoId: $('#turnoId').val(),
		periodoLetivoId: $('#periodoLetivoId').val(),
	}

	localStorage.setItem('turma', objetoPesquisa)
}
