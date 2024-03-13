var atos = [];
var idAto = '';
var nome = '';

$(document).ready(function() {


	$.ajax({
		url: url_base + "/atoRegulatorio",
		type: "GET",
		async: false,
	})
		.done(function(data) {
			listarAtos(data);
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

	function listarAtos(atos) {
		var html = atos.map(function(item) {

			return (
				"<tr>" +
				"<td>" +
				item.atoRegulatorio +
				"</td>" +
				'<td class="d-flex"><span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-id="' +
				item.idAtoRegulatorio +
				'" data-nome="' +
				item.atoRegulatorio +
				'" onclick="showModal(this)" data-bs-toggle="modal" data-bs-target="#editAto"><i class="fa-solid fa-pen fa-lg"></i></span></td>' +
				"</tr>"
			);
		}).join("");

		$("#cola-atos").html(html);
	}

	$("#inputBusca").on("keyup", function() {
		var valorBusca = $(this).val().toLowerCase();

		if (valorBusca === '') {
			busca()
			$("#cola-atos tr").show();
		} else {
			$("#cola-atos tr").hide().filter(function() {
				return $(this).text().toLowerCase().indexOf(valorBusca) > -1;
			}).show();
		}
	});

	function realizarBusca(valorInput) {
		if (valorInput === '') {
			showPage(currentPage);
		} else {
			$("#cola-atos tr").hide().filter(function() {
				return $(this).text().toLowerCase().indexOf(valorInput) > -1;
			}).show();
		}
	}

	$("#inputBusca").on("input", function() {
		var valorBusca = $(this).val().toLowerCase();
		realizarBusca(valorBusca);
	});

	var rows = 8;
	var currentPage = 1;

	showPage(currentPage);
	toggleNavigation();

	function showPage(page) {
		var start = (page - 1) * rows;
		var end = start + rows;

		$('.tabela-atos tbody tr').hide();
		$('.tabela-atos tbody tr').slice(start, end).show();
	}


	$('#prev').click(function() {
		if (currentPage > 1) {
			currentPage--;
			showPage(currentPage);
			toggleNavigation();
		}
	});

	$('#next').click(function() {
		var totalRows = $('.tabela-atos tbody tr').length;
		var totalPages = Math.ceil(totalRows / rows);

		if (currentPage < totalPages) {
			currentPage++;
			showPage(currentPage);
			toggleNavigation();
		}
	});

});


function showModal(ato) {
	idAto = ato.getAttribute("data-id");
	nome = ato.getAttribute("data-nome");

	$('#edit-nome').val(nome);
}

function editar() {

	var objeto = {
		idAtoRegulatorio: Number(idAto),
		atoRegulatorio: $('#edit-nome').val()
	}

	$.ajax({
		url: url_base + "/atoRegulatorio",
		type: "PUT",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		async: false,
	})
		.done(function(data) {
			$('#edit-nome').val('');
			alert('Editado com Sucesso!')
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});
}
function cadastrar() {

	var objeto = {
		atoRegulatorio: $('#cadastro-nome').val()
	}

	$.ajax({
		url: url_base + "/atoRegulatorio",
		type: "POST",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		async: false,
	})
		.done(function(data) {
			$('#cadstro-nome').val('');
			alert('Cadastrado com Sucesso!')
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});
}