var dados = [];
const contaId = sessionStorage.getItem('contaId');;
var nome = '';
var nome2 = '';
var nome3 = '';
var rows = 8;
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


function getDados() {
	$.ajax({
		url: url_base + "/paises",
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

		return (
			"<tr>" +
			"<td>" +
			item.codPais +
			"</td>" +
			"<td>" +
			item.nomePais +
			"</td>" +
			"<td>" +
			item.codigoIso +
			"</td>" +
			'<td class="d-flex"><span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-id="' +
			item.idPais +
			'" data-nome="' +
			item.codPais +
			'" data-nome2="' +
			item.nomePais +
			'" data-nome3="' +
			item.codigoIso +
			'" onclick="showModal(this)" data-bs-toggle="modal" data-bs-target="#editAto"><i class="fa-solid fa-pen fa-lg"></i></span></td>' +
			"</tr>"
		);
	}).join("");

	$("#cola-tabela").html(html);
}

function showModal(ref) {
	id = ref.getAttribute("data-id");
	nome = ref.getAttribute("data-nome");
	nome2 = ref.getAttribute("data-nome2");
	nome3 = ref.getAttribute("data-nome3");

	$('#edit-nome').val(nome);
	$('#edit-nome2').val(nome2);
	$('#edit-input3').val(nome3);
}

function editar() {
	var objeto = {
		idPais: Number(id),
		codPais: $('#edit-nome').val(),
		nomePais: $('#edit-nome2').val(),
		codigoIso: $('#edit-input3').val(),
		contaId: contaId

	}

	$.ajax({
		url: url_base + "/paises",
		type: "PUT",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(e.responseJSON.message)
			alert(e.responseJSON.message)
		}
	})
		.done(function(data) {
			$('#edit-nome').val('');
			$('#edit-nome2').val('');
			$('#edit-input3').val('');
			getDados();
			showPage(currentPage);
			updatePagination();
			alert('Editado com Sucesso!')
		})
	return false;
}
$('#formEdit').on('submit', function(e) {
	e.preventDefault();
	editar();
	return false;
});
$('#formCadastro').on('submit', function(e) {
	e.preventDefault();
	cadastrar();
	return false;
});

function cadastrar() {

	var objeto = {
		codPais: $('#cadastro-nome').val(),
		nomePais: $('#cadastro-nome2').val(),
		codigoIso: $('#cadastro-input3').val(),
		contaId : contaId

	}

	$.ajax({
		url: url_base + "/paises",
		type: "POST",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(e.responseJSON.message)
			alert(e.responseJSON.message)
		}
	})
		.done(function(data) {
			$('#cadastro-nome').val('');
			$('#cadastro-nome2').val('');
			$('#cadastro-input3').val('');
			getDados();
			showPage(currentPage);
			updatePagination();
			showPage(currentPage);
			alert('Cadastrado com Sucesso!')
		})
	return false;
}

function limpaCampo() {
	$('#cadastro-nome').val('');
	$('#cadastro-nome2').val('');
	$('#cadastro-input3').val('')
}