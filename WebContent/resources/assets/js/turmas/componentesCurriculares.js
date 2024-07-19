var dados = [];
var sortOrder = {};
var dadosOriginais = [];
var rows = 7;
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
		url: url_base + '/componentesCurriculares',
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#componentesCurricularesId').append($('<option>', {
				value: item.idComponentesCurriculares,
				text: item.componentesCurriculares,
				name: item.componentesCurriculares
			}));
		});
		$.each(data, function(index, item) {
			$('#componentesCurricularesIdEdit').append($('<option>', {
				value: item.idComponentesCurriculares,
				text: item.componentesCurriculares,
				name: item.componentesCurriculares
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

		if (columnToSearch === 'componentesCurriculares') {
			filteredData = dadosOriginais.filter(function(item) {
				return item.componentesCurriculares.componentesCurriculares.toLowerCase().includes(searchInput);
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
			if (column === 'componentesCurriculares') {
				var valueA = a.componentesCurriculares.componentesCurriculares.toLowerCase();
				var valueB = b.componentesCurriculares.componentesCurriculares.toLowerCase();
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

		url: url_base + "/turmaComponentesCurriculares",
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
			item.componentesCurriculares.componentesCurriculares +
			"</td>" +
			'<td class="d-flex justify-content-center"><span style="width: 80%; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-idTurma="' +
			item.turmaId +
			'" data-id="' +
			item.idTurmaComponentesCurriculares +
			'" data-idSelect2="' +
			item.componentesCurriculares.idComponentesCurriculares +
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

	XLSX.writeFile(livro, "componentesCurriculares.xlsx");
});


// Abrir modal

function showModal(ref) {
	id = ref.getAttribute("data-id");
	idTurma = ref.getAttribute("data-idTurma");
	idSelect2 = ref.getAttribute("data-idSelect2");

	$("#turmaIdEdit").val(idTurma).attr('selected', true);
	$("#componentesCurricularesIdEdit").val(idSelect2).attr('selected', true);
}


// Editar

function editar() {
	var objeto = {
		idTurmaComponentesCurriculares: Number(id),
		turmaId: Number($('#turmaIdEdit').val()),
		componentesCurricularesId: Number($('#componentesCurricularesIdEdit').val())
	}

	$.ajax({
		url: url_base + "/turmaComponentesCurriculares",
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
			$("#componentesCurricularesIdEdit").val('');
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
		componentesCurricularesId: Number($('#componentesCurricularesId').val())
	}

	$.ajax({
		url: url_base + "/turmaComponentesCurriculares",
		type: "POST",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(e.responseJSON.message)
			Swal.fire({
				title: "Editado com sucesso",
				icon: "success",
			})
		}
	})
		.done(function(data) {
			$("#turmaId").val('');
			$("#componentesCurricularesId").val('');
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
	$("#componentesCurricularesId").val('');
}
