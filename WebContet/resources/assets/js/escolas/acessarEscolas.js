var dados = [];
var sortOrder = {};
var dadosOriginais = [];
// var id = '';
const contaId = sessionStorage.getItem('contaId')
var rows = 7;
var currentPage = 1;
var pagesToShow = 5;

$(document).ready(function() {

	getDados()

	// Dropdown de Pesquisa
    $('.dropdown-toggle-form').click(function() {
        $(this).siblings('.dropdown-content-form').toggleClass('show');
    });

    $('.searchButton').click(function() {
        var searchInput = $(this).siblings('.searchInput').val().toLowerCase();

        var columnToSearch = $(this).closest('.sortable').data('column');

        var filteredData = dadosOriginais.filter(function(item) {
            return item[columnToSearch].toLowerCase().includes(searchInput);
        });

        listarDados(filteredData);

        $(this).siblings('.searchInput').val('');
        $(this).closest('.dropdown-content-form').removeClass('show');
    });

    $(document).click(function(event) {
        if (!$(event.target).closest('.dropdown-form').length) {
            $('.dropdown-content-form').removeClass('show');
        }
    });

	$("#inputBusca").on("keyup", function() {
		var valorBusca = $(this).val().toLowerCase();

		if (valorBusca === '') {
			busca()
			$("#cola-tabela tr").show();
		} else {
			$("#cola-tabela tr").hide().filter(function() {
				return $(this).text().toLowerCase().indexOf(valorBusca) > -1;
			}).show();
		}
	});

	$("#inputBusca").on("input", function() {
		var valorBusca = $(this).val().toLowerCase();
		realizarBusca(valorBusca);
	});

	function realizarBusca(valorInput) {
		if (valorInput === '') {
			showPage(currentPage);
		} else {
			$("#cola-tabela tr").hide().filter(function() {
				return $(this).text().toLowerCase().indexOf(valorInput) > -1;
			}).show();
		}
	}


	showPage(currentPage);
	updatePagination();

	function sortData(column, order) {
		var dadosOrdenados = dadosOriginais.slice();

		dadosOrdenados.sort(function(a, b) {
			var valueA = a[column].toLowerCase();
			var valueB = b[column].toLowerCase();
			if (order === 'asc') {
				return valueA.localeCompare(valueB);
			} else {
				return valueB.localeCompare(valueA);
			}
		});
		listarDados(dadosOrdenados);
	}

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

});

$('#limpa-filtros').click(function() {
        listarDados(dadosOriginais);
        $('.searchInput').val('');
    });

function getDados() {
	$.ajax({
		url: url_base + "/escolas/conta/" + contaId,
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
		var ativo;

		if (item.ativo == 'N') {
			ativo = '<i  style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não'
		}
		else {
			ativo = "<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim"
		}

		return (
			"<tr>" +
			"<td>" +
			item.nomeEscola +
			"</td>" +
			"<td>" +
			item.municipio +
			"</td>" +
			"<td>" +
			item.uf +
			"</td>" +
			"<td>" +
			item.cnpj +
			"</td>" +
			"<td><div class='d-flex align-items-center gap-1'>" +
			ativo +
			"</div></td>" +
			'<td class="d-flex justify-content-center"><span style="width: 80%; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-id="' +
			item.idEscola +
			'" data-nome="' +
			item.nomeEscola +
			'" data-logo="' +
			item.logoEscola +
			'" onclick="acessar(this)"><i class="fa-solid fa-right-to-bracket fa-lg"></i></span></td>' +
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

	XLSX.writeFile(livro, "dados.xlsx");
});


// Acessar perfil

function acessar(element) {
    var id = $(element).data('id');
    var nome = $(element).data('nome');
    var logo = $(element).data('logo');
    
    console.log(logo)

    localStorage.setItem('perfil', JSON.stringify({perfil: 'escola', id, nome, logo}));
    localStorage.setItem('escolaId', id)

    window.location.href = 'acessar-escolas';
}
