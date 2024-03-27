var dados = [];
var sortOrder = {};
var dadosOriginais = [];
var rows = 7;
var currentPage = 1;
var pagesToShow = 5;
var turmas = [];
var id = '';
var idTurma = '';
var horaIni = '';
var horaFim = '';
var diaSemana = '';

$(document).ready(function() {


	$.ajax({
		url: url_base + "/turma",
		type: "GET",
		async: false,
	})
		.done(function(data) {
			turmas = data;
			$.each(data, function(index, item) {
				$('#turmaIdEdit').append($('<option>', {
					value: item.idTurma,
					text: item.anoEscolar.anoEscolar + ' - ' + item.numTurma,
					name: item.numTurma
				}));
			});
			$.each(data, function(index, item) {
				$('#turmaId').append($('<option>', {
					value: item.idTurma,
					text: item.anoEscolar.anoEscolar + ' - ' + item.numTurma,
					name: item.numTurma
				}));
			});
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown, jqXHR);
		});

	getDados()

	// Dropdown de Pesquisa
	$('.dropdown-toggle-form').click(function() {
		$(this).siblings('.dropdown-content-form').toggleClass('show');
	});

	$('.searchButton').click(function() {
		var searchInput = $(this).siblings('.searchInput').val().toLowerCase();
		var columnToSearch = $(this).closest('.sortable').data('column');
		var filteredData;

		if (columnToSearch === 'turmaId') {
			filteredData = dadosOriginais.filter(function(item) {
				var turma = turmas.find(function(school) {
					return school.idTurma === item.turmaId;
				});
				var numTurma = turma ? turma.numTurma.toLowerCase() : "";
				return numTurma.includes(searchInput);
			});
		} else if (columnToSearch === 'diaSemana') {
			var filteredData = dadosOriginais.filter(function(item) {
				return item.diaSemana == searchInput;
			});
		} else {
			filteredData = dadosOriginais.filter(function(item) {
				return item[columnToSearch].toString().toLowerCase().includes(searchInput);
			});
		}

		listarDados(filteredData);

		$(this).siblings('.searchInput').val('');
		$(this).closest('.dropdown-content-form').removeClass('show');
	});

	$(document).on('click', '.sortable .col', function() {
		var column = $(this).closest('th').data("column");
		var currentOrder = sortOrder[column] || 'vazio';
		var newOrder;

		if (currentOrder === 'vazio') {
			newOrder = 'asc';
		} else if (currentOrder === 'asc') {
			newOrder = 'desc';
		} else {
			newOrder = 'vazio';
		}

		$(".sortable span").removeClass("asc desc");
		$(this).find('span').addClass(newOrder);

		var icon = $(this).find("i");
		icon.removeClass("fa-sort-up fa-sort-down fa-sort");

		if (newOrder === 'asc') {
			icon.addClass("fa-sort-up");
			sortData(column, newOrder);
		} else if (newOrder === 'desc') {
			icon.addClass("fa-sort-down");
			sortData(column, newOrder);
		} else {
			icon.addClass("fa-sort");
			listarDados(dadosOriginais);
		}

		sortOrder[column] = newOrder;
	});

	function sortData(column, order) {
		var dadosOrdenados = dadosOriginais.slice();

		dadosOrdenados.sort(function(a, b) {
			if (column === 'turmaId') {
				var turmaA = turmas.find(function(school) {
					return school.idTurma === a.turmaId;
				});
				var turmaB = turmas.find(function(school) {
					return school.idTurma === b.turmaId;
				});
				var nomeTurmaA = turmaA ? turmaA.numTurma.toLowerCase() : "";
				var nomeTurmaB = turmaB ? turmaB.numTurma.toLowerCase() : "";
				if (order === 'asc') {
					return nomeTurmaA.localeCompare(nomeTurmaB);
				} else {
					return nomeTurmaB.localeCompare(nomeTurmaA);
				}
			} else if (column === 'horaInicio' || column === 'horaFim') {
				var timeA = a[column].split(':').reduce((acc, val, i) => acc + val * Math.pow(60, -i), 0);
				var timeB = b[column].split(':').reduce((acc, val, i) => acc + val * Math.pow(60, -i), 0);
				if (order === 'asc') {
					return timeA - timeB;
				} else {
					return timeB - timeA;
				}
			} else {
				var valueA = a[column].toString().toLowerCase();
				var valueB = b[column].toString().toLowerCase();
				if (order === 'asc') {
					return valueA.localeCompare(valueB);
				} else {
					return valueB.localeCompare(valueA);
				}
			}

		});
		listarDados(dadosOrdenados);
	}



	showPage(currentPage);
	updatePagination();

});

$('#limpa-filtros').click(function() {
	listarDados(dadosOriginais);
	$('.searchInput').val('');
});

function getDados() {

	$.ajax({

		url: url_base + "/turmaDiaSemana",
		type: "GET",
		async: false,
	})
		.done(function(data) {
			dados = data
			dadosOriginais = data;
			listarDados(data);
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});
}

function obterNomeDiaSemana(numeroDia) {
	const diasSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
	return diasSemana[numeroDia - 1];
}

function listarDados(dados) {
	var html = dados.map(function(item) {

		var turma = turmas.find(function(school) {
			return school.idTurma === item.turmaId;
		});

		var numTurma = turma
			? turma.anoEscolar.anoEscolar + ' - ' + turma.numTurma
			: "Turma não encontrada.";

		var horaInicioFormatada = item.horaInicio.substring(0, 5);
		var horaFimFormatada = item.horaFim.substring(0, 5);

		var nomeDiaSemana = obterNomeDiaSemana(item.diaSemana);


		return (
			"<tr>" +
			"<td>" +
			numTurma +
			"</td>" +
			"<td>" +
			nomeDiaSemana +
			"</td>" +
			"<td>" +
			'Às ' +
			horaInicioFormatada
			+
			"</td>" +
			"<td>" +
			'Às ' +
			horaFimFormatada
			+
			"</td>" +
			'<td><span style="width: 70%; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-idTurma="' +
			item.turmaId +
			'" data-id="' +
			item.idTurmaDiaSemana +
			'" data-horaIni="' +
			item.horaInicio +
			'" data-horaFim="' +
			item.horaFim +
			'" data-diaSemana="' +
			item.diaSemana +
			'" onclick="showModal(this)" data-bs-toggle="modal" data-bs-target="#editItem"><i class="fa-solid fa-pen fa-lg"></i></span></td>' +
			"</tr>"
		);
	}).join("");

	$("#cola-tabela").html(html);
}


// Exportar Dados

$('#exportar-excel').click(function() {

	var planilha = XLSX.utils.json_to_sheet(dados);

	var livro = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(livro, planilha, "Planilha1");

	XLSX.writeFile(livro, "diasSemana.xlsx");
});


// Abrir modal

function showModal(ref) {
	id = ref.getAttribute("data-id");
	idTurma = ref.getAttribute("data-idTurma");
	horaIni = ref.getAttribute("data-horaIni");
	horaFim = ref.getAttribute("data-horaFim");
	diaSemana = ref.getAttribute("data-diaSemana");

	$("#turmaIdEdit").val(idTurma).attr('selected', true);
	$("#horaInicioEdit").val(horaIni);
	$("#horaFimEdit").val(horaFim);
	$("#diaSemanaEdit").val(diaSemana).attr('selected', true);
	
}

function formatarHoraParaAPI(hora) {
	if (/^\d{2}:\d{2}$/.test(hora)) {
		return hora + ":00";
	}
	return hora;
}

// Editar

function editar() {

	var objeto = {
		idTurmaDiaSemana: id,
		turmaId: Number($('#turmaIdEdit').val()),
		horaInicio: formatarHoraParaAPI($("#horaInicioEdit").val()),
		horaFim: formatarHoraParaAPI($("#horaFimEdit").val()),
		diaSemana: $("#diaSemanaEdit").val(),
	};

	console.log(objeto)

	$.ajax({
		url: url_base + "/turmaDiaSemana",
		type: "PUT",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(e.responseJSON);
			alert(e.responseJSON.message);
		}
	})
		.done(function(data) {
			$("#turmaIdEdit").val('');
			$("#horaInicioEdit").val('');
			$("#horaFimEdit").val('');
			$("#diaSemanaEdit").val('');
			getDados();
			showPage(currentPage);
			updatePagination();
			alert('Editado com Sucesso!');
		});

	return false;
}

$('#formEdit').on('submit', function(e) {
	e.preventDefault();
	editar();
	return false;
});


// Cadastrar


function cadastrar() {

	var objeto = {
		turmaId: Number($('#turmaId').val()),
		horaInicio: formatarHoraParaAPI($("#horaInicio").val()),
		horaFim: formatarHoraParaAPI($("#horaFim").val()),
		diaSemana: $("#diaSemana").val(),
	};

	$.ajax({
		url: url_base + "/turmaDiaSemana",
		type: "POST",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(e.responseJSON);
			alert(e.responseJSON.message);
		}
	})
		.done(function() {
			$("#turmaId").val('');
			$("#horaInicio").val('');
			$("#horaFim").val('');
			$("#diaSemana").val('');
			getDados();
			showPage(currentPage);
			updatePagination();
			alert('Cadastrado com Sucesso!');
		});
	return false;
}

$('#formCadastro').on('submit', function(e) {
	e.preventDefault();
	cadastrar();
	return false;
});


// Limpa input

function limpaCampo() {
	$("#turmaId").val('');
	$("#horaInicio").val('');
	$("#horaFim").val('');
	$("#diaSemana").val('');
}
