var dados = [];
const contaId = sessionStorage.getItem('contaId');
var nome = '';
var rows = 8;
var currentPage = 1;
var pagesToShow = 5;
var isAtivo = '';
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
		url: url_base + "/turnoProfessor",
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

		if (item.ativo == 'N') {
			ativo = '<i  style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não'
		}
		else {
			ativo = "<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim"
		}

		return (
			"<tr>" +
			"<td>" +
			item.turnoProfessor +
			"</td>" +
			"<td>" +
			ativo +
			"</td>" +
			'<td class="d-flex"><span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-id="' +
			item.idTurnoProfessor +
			'" data-nome="' +
			item.turnoProfessor +
			'" data-ativo="' +
			item.ativo +
			'" onclick="showModal(this)" data-bs-toggle="modal" data-bs-target="#editAto"><i class="fa-solid fa-pen fa-lg"></i></span></td>' +
			"</tr>"
		);
	}).join("");

	$("#cola-tabela").html(html);
}

function showModal(ref) {
	id = ref.getAttribute("data-id");
	nome = ref.getAttribute("data-nome");
	isAtivo = ref.getAttribute("data-ativo");

		if (isAtivo == "S") {
			$(".ativar").hide();
			$(".desativar").show()
		}
		else {
			$(".desativar").hide();
			$(".ativar").show();
		}

	$('#edit-nome').val(nome);
}

function editar() {
	var objeto = {
		idTurnoProfessor: Number(id),
		turnoProfessor: $('#edit-nome').val(),
		contaId: contaId
	}

	$.ajax({
		url: url_base + "/turnoProfessor",
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
		turnoProfessor: $('#cadastro-nome').val(),
		contaId: contaId
	}

	$.ajax({
		url: url_base + "/turnoProfessor",
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
	$('#edit-nome').val('');
}