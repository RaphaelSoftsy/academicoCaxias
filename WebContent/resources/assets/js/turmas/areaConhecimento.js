var dados = [];
var sortOrder = {};
var dadosOriginais = [];
var rows = 12;
var currentPage = 1;
var pagesToShow = 5;
var turmas = [];
var id = '';
var idTurma = '';
var idSelect2 = '';

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
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

	$.ajax({
		url: url_base + '/areaConhecimento',
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#areaConhecimentoId').append($('<option>', {
				value: item.idAreaConhecimento,
				text: item.areaConhecimento,
				name: item.areaConhecimento
			}));
		});
		$.each(data, function(index, item) {
			$('#areaConhecimentoIdEdit').append($('<option>', {
				value: item.idAreaConhecimento,
				text: item.areaConhecimento,
				name: item.areaConhecimento
			}));
		});

	})

	getDados()

	// Dropdown de Pesquisa
	$('.dropdown-toggle-form').click(function() {
		$(this).siblings('.dropdown-content-form').toggleClass('show');
	});

	$('.searchButton').click(function() {
		var searchInput = $(this).siblings('.searchInput').val().toLowerCase();
		var columnToSearch = $(this).closest('.sortable').data('column');
		var filteredData;

		if (columnToSearch === 'areaConhecimento') {
			filteredData = dadosOriginais.filter(function(item) {
				return item.areaConhecimento.areaConhecimento.toLowerCase().includes(searchInput);
			});
		} else if (columnToSearch === 'turmaId') {
			filteredData = dadosOriginais.filter(function(item) {
				var turma = turmas.find(function(school) {
					return school.idTurma === item.turmaId;
				});
				var numTurma = turma ? turma.numTurma.toLowerCase() : "";
				return numTurma.includes(searchInput);
			});
		} else {
			filteredData = dadosOriginais.filter(function(item) {
				return item[columnToSearch].toString().toLowerCase().includes(searchInput);
			});
		}

		listarDados(filteredData);  $('input[data-toggle="toggle"]').bootstrapToggle();$('input[data-toggle="toggle"]').bootstrapToggle();

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
			listarDados(dadosOriginais);  $('input[data-toggle="toggle"]').bootstrapToggle();$('input[data-toggle="toggle"]').bootstrapToggle();
		}

		sortOrder[column] = newOrder;
	});

	function sortData(column, order) {
		var dadosOrdenados = dadosOriginais.slice();

		dadosOrdenados.sort(function(a, b) {
			if (column === 'areaConhecimento') {
				var valueA = a.areaConhecimento.areaConhecimento.toLowerCase();
				var valueB = b.areaConhecimento.areaConhecimento.toLowerCase();
				if (order === 'asc') {
					return valueA.localeCompare(valueB);
				} else {
					return valueB.localeCompare(valueA);
				}
			} else if (column === 'turmaId') {
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
		listarDados(dadosOrdenados); $('input[data-toggle="toggle"]').bootstrapToggle();$('input[data-toggle="toggle"]').bootstrapToggle();
	}



	showPage(currentPage);
	updatePagination();

});

$('#limpa-filtros').click(function() {
	listarDados(dadosOriginais);  $('input[data-toggle="toggle"]').bootstrapToggle();$('input[data-toggle="toggle"]').bootstrapToggle();
	$('.searchInput').val('');
});

function getDados() {

	$.ajax({

		url: url_base + "/turmaAreaConhecimento",
		type: "GET",
		async: false,
	})
		.done(function(data) {
			dados = data
			dadosOriginais = data;
			listarDados(data);  $('input[data-toggle="toggle"]').bootstrapToggle();$('input[data-toggle="toggle"]').bootstrapToggle();
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});
}

function listarDados(dados) {
	var html = dados.map(function(item) {

		var turma = turmas.find(function(school) {
			return school.idTurma === item.turmaId;
		});

		var numTurma = turma
			? turma.anoEscolar.anoEscolar + ' - ' + turma.numTurma
			: "Turma não encontrada";

		return (
			"<tr>" +
			"<td>" +
			numTurma +
			"</td>" +
			"<td>" +
			item.areaConhecimento.areaConhecimento +
			"</td>" +
			'<td class="d-flex justify-content-center"><span style="width: 80%; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-idTurma="' +
			item.turmaId +
			'" data-id="' +
			item.idTurmaAreaConhecimento +
			'" data-idSelect2="' +
			item.areaConhecimento.idAreaConhecimento +
			'"  onclick="showModal(this)" data-bs-toggle="modal" data-bs-target="#editItem"><i class="fa-solid fa-pen fa-lg"></i></span></td>' +
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

	XLSX.writeFile(livro, "areasConhecimento.xlsx");
});


// Abrir modal

function showModal(ref) {
	id = ref.getAttribute("data-id");
	idTurma = ref.getAttribute("data-idTurma");
	idSelect2 = ref.getAttribute("data-idSelect2");

	$("#turmaIdEdit").val(idTurma).attr('selected', true);
	$("#areaConhecimentoIdEdit").val(idSelect2).attr('selected', true);
}


// Editar

function editar() {
	var objeto = {
		idTurmaAreaConhecimento: Number(id),
		turmaId: Number($('#turmaIdEdit').val()),
		areaConhecimentoId: Number($('#areaConhecimentoIdEdit').val())
	}

	$.ajax({
		url: url_base + "/turmaAreaConhecimento",
		type: "PUT",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(e.responseJSON.message)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
			});
		}
	})
		.done(function(data) {
			$("#turmaIdEdit").val('');
			$("#areaConhecimentoIdEdit").val('');
			getDados();
			showPage(currentPage);
			updatePagination();
			Swal.fire({
				title: "Editado com sucesso",
				icon: "success",
			})
		})
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
		areaConhecimentoId: Number($('#areaConhecimentoId').val())
	}

	$.ajax({
		url: url_base + "/turmaAreaConhecimento",
		type: "POST",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(e.responseJSON.message)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
			});
		}
	})
		.done(function(data) {
			$("#turmaId").val('');
			$("#areaConhecimentoId").val('');
			getDados();
			showPage(currentPage);
			updatePagination();
			Swal.fire({
				title: "Cadastrado com sucesso",
				icon: "success",
			})
		})
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
	$("#areaConhecimentoId").val('');
}
