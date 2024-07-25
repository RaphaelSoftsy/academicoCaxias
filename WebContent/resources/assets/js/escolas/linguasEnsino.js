var dados = [];
var sortOrder = {};
var dadosOriginais = [];
var rows = 7;
var currentPage = 1;
var pagesToShow = 5;
var escolas = [];
var id = '';
var idEscola = '';
var idSelect2 = '';
const contaId = Number(localStorage.getItem('contaId'))
var idEscola = localStorage.getItem("escolaId");
var pefilEscola = localStorage.getItem("perfil")
var escola = JSON.parse(pefilEscola)
var nomeEscola = escola.nome

$(document).ready(function() {
	$('#escolaIdStyleEdit').css('display', 'none')

	$.ajax({
		url: url_base + `/escolas/conta/${contaId}`,
		type: "GET",
		async: false,
	})
		.done(function(data) {
			escolas = data;
			$.each(data, function(index, item) {
				$('#escolaIdEdit').append($('<option>', {
					value: item.idEscola,
					text: item.nomeEscola,
					name: item.nomeEscola
				}));
			});
			$.each(data, function(index, item) {
				$('#escolaId').append($('<option>', {
					value: item.idEscola,
					text: item.nomeEscola,
					name: item.nomeEscola
				}));
			});
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

	$.ajax({
		url: url_base + `/linguaEnsino/conta/${contaId}`,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#idLinguaEnsino').append($('<option>', {
				value: item.idLinguaEnsino,
				text: item.linguaEnsino,
				name: item.linguaEnsino
			}));
		});
		$.each(data, function(index, item) {
			$('#idLinguaEnsinoEdit').append($('<option>', {
				value: item.idLinguaEnsino,
				text: item.linguaEnsino,
				name: item.linguaEnsino
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

		if (columnToSearch === 'linguaEnsino') {
			filteredData = dadosOriginais.filter(function(item) {
				return item.linguaEnsino.linguaEnsino.toLowerCase().includes(searchInput);
			});
		} else if (columnToSearch === 'escolaId') {
			filteredData = dadosOriginais.filter(function(item) {
				var escola = escolas.find(function(school) {
					return school.idEscola === item.escola;
				});
				var nomeEscola = escola ? escola.nomeEscola.toLowerCase() : "";
				return nomeEscola.includes(searchInput);
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
			if (column === 'linguaEnsino') {
				var valueA = a.linguaEnsino.linguaEnsino.toLowerCase();
				var valueB = b.linguaEnsino.linguaEnsino.toLowerCase();
				if (order === 'asc') {
					return valueA.localeCompare(valueB);
				} else {
					return valueB.localeCompare(valueA);
				}
			} else if (column === 'escolaId') {
				var escolaA = escolas.find(function(school) {
					return school.idEscola === a.escola;
				});
				var escolaB = escolas.find(function(school) {
					return school.idEscola === b.escola;
				});
				var nomeEscolaA = escolaA ? escolaA.nomeEscola.toLowerCase() : "";
				var nomeEscolaB = escolaB ? escolaB.nomeEscola.toLowerCase() : "";
				if (order === 'asc') {
					return nomeEscolaA.localeCompare(nomeEscolaB);
				} else {
					return nomeEscolaB.localeCompare(nomeEscolaA);
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

		url: url_base + `/escolaLingua/escola/${idEscola}`,
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

		var escola = escolas.find(function(school) {
			return school.idEscola === item.escola;
		});

		var nomeEscola = escola
			? escola.nomeEscola
			: "Escola não encontrada";

		return (
			"<tr>" +
			"<td>" +
			nomeEscola +
			"</td>" +
			"<td>" +
			item.linguaEnsino.linguaEnsino +
			"</td>" +
			'<td class="d-flex justify-content-center"><span style="width: 80%; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-idEscola="' +
			item.escola +
			'" data-id="' +
			item.idEscolaLingua +
			'" data-idSelect2="' +
			item.linguaEnsino.idLinguaEnsino +
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

	XLSX.writeFile(livro, "linguasDeEnsino.xlsx");
});


// Abrir modal

function showModal(ref) {
	id = ref.getAttribute("data-id");
	idEscola = ref.getAttribute("data-idEscola");
	idSelect2 = ref.getAttribute("data-idSelect2");

	$("#escolaIdEdit").val(idEscola).attr('selected', true);
	$("#idLinguaEnsinoEdit").val(idSelect2).attr('selected', true);
}


// Editar

function editar() {
	var objeto = {
		idEscolaLingua: Number(id),
		escolaId: Number(idEscola),
		linguaEnsinoId: Number($('#idLinguaEnsinoEdit').val())
	}

	$.ajax({
		url: url_base + "/escolaLingua",
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
			$("#escolaIdEdit").val('');
			$("#idLinguaEnsinoEdit").val('');
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
		escolaId: Number(idEscola),
		linguaEnsinoId: Number($('#idLinguaEnsino').val())
	}

	$.ajax({
		url: url_base + "/escolaLingua",
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
			$("#escolaId").val('');
			$("#idLinguaEnsino").val('');
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
	$("#escolaId").val('');
	$("#idLinguaEnsino").val('');
}
