var dados = [];
var sortOrder = {};
var dadosOriginais = [];
var rows = 12;
var currentPage = 1;
var pagesToShow = 5;

$(document).ready(function() {
	getDados()

	// Dropdown de Pesquisa
	$('.dropdown-toggle-form').click(function() {
		
	});

	$('.searchButton').click(function() {
		var searchInput = $(this).siblings('.searchInput').val().toLowerCase();
		var columnToSearch = $(this).closest('.sortable').data('column');
		var filteredData;

		if (columnToSearch === 'pessoa') {
			filteredData = dadosOriginais.filter(function(item) {
				return item.pessoa.nome.toLowerCase().includes(searchInput);
			});
		}  else {
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
			if (column === 'pessoa') {
				var valueA = a.pessoa.nome.toLowerCase();
				var valueB = b.pessoa.nome.toLowerCase();
				if (order === 'asc') {
					return valueA.localeCompare(valueB);
				} else {
					return valueB.localeCompare(valueA);
				}
			} else if (column === 'situacaoProfessor') {
				var valueA = a.situacaoProfessor.toLowerCase();
				var valueB = b.situacaoProfessor.toLowerCase();
				if (order === 'asc') {
					return valueA.localeCompare(valueB);
				} else {
					return valueB.localeCompare(valueA);
				}
			} else if (column === 'codigoInep') {
				var valueA = parseFloat(a[column]);
				var valueB = parseFloat(b[column]);
				if (order === 'asc') {
					return valueA - valueB;
				} else {
					return valueB - valueA;
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
		url: url_base + "/professores",
		type: "GET",
		async: false,
	})
		.done(function(data) {
			dados = data
			dadosOriginais = data;
			listarDados(data);  $('input[data-toggle="toggle"]').bootstrapToggle();$('input[data-toggle="toggle"]').bootstrapToggle();
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", jqXHR);
		});
}

function formatarDataParaBR(data) {
	var dataObj = new Date(data);
	var dia = String(dataObj.getDate()).padStart(2, '0');
	var mes = String(dataObj.getMonth() + 1).padStart(2, '0');
	var ano = dataObj.getFullYear();
	return dia + '/' + mes + '/' + ano;
}

function listarDados(dados) {
	var html = dados.map(function(item) {
        var ativo = '';
        var autista = '';
        var deficiente = '';

        if (item.ativo == 'N') {
			ativo = '<i  style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não'
		}
		else {
			ativo = "<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim"
		}

		if (item.deficiente == 'N') {
			deficiente = '<i  style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não'
		}
		else {
			deficiente = "<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim"
		}

		if (item.autista == 'N') {
			autista = '<i  style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não'
		}
		else {
			autista = "<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim"
		}

		return (
			"<tr>" +
			"<td>" +
			item.pessoa.nome +
			"</td>" +
			"<td>" +
			item.codigoInep +
			"</td>" +
			"<td>" +
			item.situacaoProfessor.situacaoProfessor +
			"</td>" +
			"<td>" +
			deficiente +
			"</td>" +
			"<td>" +
			autista +
			"</td>" +
            "<td>" +
			ativo +
			"</td>" +
			'<td class="d-flex"><span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-id="' +
			item.idProfessor +
			'" onclick="editar(this)"><i class="fa-solid fa-pen fa-lg"></i></span></td>' +
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

	XLSX.writeFile(livro, "professores.xlsx");
});

// redirect para edicao

function editar(ref){
	id = ref.getAttribute("data-id");
	 window.location.href="editarProfessor?id="+id;
}