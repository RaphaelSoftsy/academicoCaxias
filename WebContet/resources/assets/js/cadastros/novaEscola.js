var dados = [];
var id = '';
var rows = 7;
var currentPage = 1;
var pagesToShow = 5;

$(document).ready(function() {

	getDados()

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

});

function showPage(page) {
	var start = (page - 1) * rows;
	var end = start + rows;

	$('#cola-tabela tr').hide();
	$('#cola-tabela tr').slice(start, end).show();
}

function toggleNavigation() {
    var totalRows = $('#cola-tabela tr').length;
    var totalPages = Math.ceil(totalRows / rows);

    $('#prev').prop('disabled', currentPage === 1);
    $('#next').prop('disabled', currentPage === totalPages);

    $('#page-numbers').empty();

    $('#page-numbers').append('<button class="btn btn-sm btn-page ' + (currentPage === 1 ? 'active-page' : '') + '" data-page="1">1</button>');

    var startPage = Math.max(2, Math.min(currentPage - Math.floor(pagesToShow / 2), totalPages - pagesToShow + 2));
    var endPage = Math.min(totalPages - 1, startPage + pagesToShow - 3);

    for (var i = startPage; i <= endPage; i++) {
        var btnClass = (i === currentPage) ? 'btn btn-sm btn-page active-page' : 'btn btn-sm btn-page';
        $('#page-numbers').append('<button class="' + btnClass + '" data-page="' + i + '">' + i + '</button>');
    }

    $('#page-numbers').append('<button class="btn btn-sm btn-page ' + (currentPage === totalPages ? 'active-page' : '') + '" data-page="' + totalPages + '">' + totalPages + '</button>');

    $('.btn-page').click(function() {
        goToPage(parseInt($(this).data('page')));
    });
}

function updatePagination() {
    toggleNavigation();
}

function goToPage(page) {
    if (page >= 1 && page <= Math.ceil($('#cola-tabela tr').length / rows)) {
        currentPage = page;
        showPage(currentPage);
        updatePagination();
    }
}

$('#prev').click(function() {
    goToPage(currentPage - 1);
});

$('#next').click(function() {
    goToPage(currentPage + 1);
});


function getDados() {
	$.ajax({
		url: url_base + "/escolas",
		type: "GET",
		async: false,
	})
		.done(function(data) {
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
			"<td>" +
			ativo +
			"</td>" +
			'<td class="d-flex"><span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-id="' +
			item.idEscola +
			'" onclick="editar(this)"><i class="fa-solid fa-pen fa-lg"></i></span></td>' +
			"</tr>"
		);
	}).join("");

	$("#cola-tabela").html(html);
}
