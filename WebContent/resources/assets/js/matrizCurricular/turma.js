var dados = [];
const contaId = localStorage.getItem('contaId');
var nome = '';
var nome2 = '';
var nome3 = '';
var rows = 8;
var currentPage = 1;
var pagesToShow = 5;
let descricao = '';
let id = '';
var sortOrder = {};
var dadosOriginais = [];

$(document).ready(function() {

	$('.dropdown-toggle-form').click(function() {
		$(this).siblings('.dropdown-content-form').toggleClass('show');
	});

	$('.searchButton').click(function() {
		var searchInput = $(this).siblings('.searchInput').val().toLowerCase();
		var columnToSearch = $(this).closest('.sortable').data('column');

		var filteredData = dadosOriginais.filter(function(item) {
			item.turnoPes = item.turno.turno;
			item.anoPeriodoPes = item.periodoLetivo.ano + '/' + item.periodoLetivo.periodo;
			item.disciplinaPes = item.gradeCurricular.disciplina.codDiscip + ' - ' + item.gradeCurricular.disciplina.nome;
			item.librasPes = item.libras == 'S' ? 'Sim' : 'Não';
			item.escolaPes = item.escola.nomeEscola;

			var valueToCheck = item[columnToSearch] ? item[columnToSearch].toString().toLowerCase() : '';
			return valueToCheck.includes(searchInput);
		});

		listarDados(filteredData);
		$('input[data-toggle="toggle"]').bootstrapToggle();

		$(this).siblings('.searchInput').val('');
		$(this).closest('.dropdown-content-form').removeClass('show');
		$('.checkbox-toggle').each(function() {
			var status = $(this).data('status');
			if (status !== 'S') {
				$(this).prop('checked', false);
			}
		});

		$('input[data-toggle="toggle"]').bootstrapToggle();
	});

	// Funções AJAX para popular dropdowns omitidas para brevidade

	getDados();

	showPage(currentPage);
	updatePagination();

	$('.checkbox-toggle').each(function() {
		var status = $(this).data('status');
		if (status !== 'S') {
			$(this).prop('checked', false);
		}
	});
});

function getDados() {
	$.ajax({
		url: url_base + "/turma",
		type: "GET",
		async: false,
	})
		.done(function(data) {
			console.log('Turmas: ')
			console.log(data)
			dadosOriginais = data;
			listarDados(data);
			$('input[data-toggle="toggle"]').bootstrapToggle();
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});
}

$('#limpa-filtros').click(function() {
	listarDados(dadosOriginais);
	$('input[data-toggle="toggle"]').bootstrapToggle();
	$('.searchInput').val('');
});

function listarDados(dados) {

	if (dados.length > 0) {
		console.log('Dados: ')
		console.log(dados)
		var html = dados.map(item => {
			var ativo = item.ativo == "N" ?
				'<i  style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não' :
				"<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim";

			var libras = item.libras == "N" ? "Não" : "Sim";

			const isChecked = item.ativo === 'S' ? 'checked' : '';

			console.log(item.nomeTurma)
			console.log(item.gradeCurricular.disciplina.codDiscip)
			console.log(item.gradeCurricular.disciplina.nome)
			console.log(item.escola.nomeEscola)
			console.log(item.periodoLetivo.periodo)

			return (
				"<tr>" +
				"<td>" + item.nomeTurma + "</td>" +
				"<td>" + item.gradeCurricular.disciplina.codDiscip + ' - ' + item.gradeCurricular.disciplina.nome + "</td>" +
				"<td>" + item.escola.nomeEscola + "</td>" +
				"<td>" + item.periodoLetivo.ano + '/' + item.periodoLetivo.periodo + "</td>" +
				"<td>" + item.turno.turno + "</td>" +
				"<td>" + item.vagas + "</td>" +
				"<td><div class='d-flex align-items-center gap-1'>" +
				'<input type="checkbox" data-status="' + item.ativo +
				'" data-id="' + item.idTurma + '" onChange="alteraStatus(this)" ' + isChecked +
				' data-toggle="toggle" data-onstyle="success" data-offstyle="danger" data-on="Sim" data-off="Não" data-width="63" class="checkbox-toggle" data-size="sm">' +
				"</div></td>" +
				'<td class="d-flex justify-content-center"><span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-id="' + item.idTurma + '" onclick="showModal(this)"><i class="fa-solid fa-pen fa-lg"></i></span></td>' +
				"</tr>"
			);
		}).join("");

		$("#cola-tabela").html(html);
	}
}

function alteraStatus(element) {
	var id = element.getAttribute("data-id");
	var status = element.getAttribute("data-status");

	status = status === "S" ? "N" : "S";
	element.setAttribute("data-status", status);

	$.ajax({
		url: url_base + `/turma/${id}${status === "S" ? '/ativar' : '/desativar'}`,
		type: "PUT",
		error: function(e) {
			Swal.close();
			console.error(e);
			Swal.fire({
				icon: "error",
				title: e.responseJSON.message
			});
		}
	}).then(() => {
		window.location.href = 'turma';
	});
}

function showModal(ref) {
	limpaCampo();
	id = ref.getAttribute("data-id");
	window.location.href = "cadastro-turma?id=" + id;
}

function limpaCampo() {
	$('#escolaId').val('');
	$('#turnoId').val('');
	$('#periodoLetivoId').val('');
	$('#gradeCurricularId').val('');
	$('#nomeTurma').val('');
	$('#codTurmaInep').val('');
	$('#vagas').val('');
	$('#libras').val('');
	$('#controlaVagas').val('');
}
