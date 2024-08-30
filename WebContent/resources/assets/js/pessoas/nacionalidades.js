var dados = [];
var id = '';
var nome = '';
var rows = 8;
var currentPage = 1;
var pagesToShow = 5;
var valor1 = '';
var valor2 = '';
var pessoas = '';

$(document).ready(function() {

	$.ajax({
		url: url_base + '/pessoas',
		type: "get",
		async: false,
	}).done(function(data) {
		pessoas = data
		$.each(data, function(index, item) {
			$('#selectCadastro').append($('<option>', {
				value: item.idPessoa,
				text: item.nome,
				name: item.nome
			}));
		});
		$.each(data, function(index, item) {
			$('#selectEdit').append($('<option>', {
				value: item.idPessoa,
				text: item.nome,
				name: item.nome
			}));
		});
	})

	$.ajax({
		url: url_base + '/nacionalidade',
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#selectCadastro2').append($('<option>', {
				value: item.idNacionalidade,
				text: item.nacionalidade,
				name: item.nacionalidade
			}));
		});
		$.each(data, function(index, item) {
			$('#selectEdit2').append($('<option>', {
				value: item.idNacionalidade,
				text: item.nacionalidade,
				name: item.nacionalidade
			}));
		});
	})

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
		url: url_base + "/pessoasNacionalidade",
		type: "GET",
		async: false,
	})
		.done(function(data) {
			listarDados(data); $('input[data-toggle="toggle"]').bootstrapToggle();
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});
}

function listarDados(dados) {
	var html = dados.map(function(item) {

		var pessoa = pessoas.find(function(school) {
			return school.idPessoa === item.pessoaId;
		});

		var nomePessoa = pessoa
			? pessoa.nome
			: "Pessoa não encontrada";

		return (
			"<tr>" +
			"<td>" +
			nomePessoa +
			"</td>" +
			"<td>" +
			item.nacionalidade.nacionalidade +
			"</td>" +
			'<td class="d-flex"><span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-id="' +
			item.idPessoaNacionalidade +
			'" data-nome="' +
			item.pessoaId +
			'" data-nome2="' +
			item.nacionalidade.idNacionalidade +
			'" onclick="showModal(this)" data-bs-toggle="modal" data-bs-target="#editAto"><i class="fa-solid fa-pen fa-lg"></i></span></td>' +
			"</tr>"
		);
	}).join("");

	$("#cola-tabela").html(html); 
}

function showModal(ref) {
	id = ref.getAttribute("data-id");
	valor1 = ref.getAttribute("data-nome");
	valor2 = ref.getAttribute("data-nome2");

	$('#selectEdit').val(valor1);
	$('#selectEdit2').val(valor2);
}

function editar() {
	var objeto = {
		idPessoaNacionalidade: id,
		pessoaId: $('#selectEdit').val(),
		nacionalidadeId: $('#selectEdit2').val()
	}

	$.ajax({
		url: url_base + "/pessoasNacionalidade",
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
			$('#selectEdit2').val('');
			$('#selectEdit').val('');
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
$('#formCadastro').on('submit', function(e) {
	e.preventDefault();
	cadastrar();
	return false;
});

function cadastrar() {

	var objeto = {
		pessoaId: $('#selectCadastro').val(),
		nacionalidadeId: $('#selectCadastro2').val()
	}

	$.ajax({
		url: url_base + "/pessoasNacionalidade",
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
			$('#selectCadastro').val('')
			$('#selectCadastro2').val('')
			getDados();
			showPage(currentPage);
			updatePagination();
			showPage(currentPage);
			Swal.fire({
				title: "Cadastrado com sucesso",
				icon: "success",
			})
		})
	return false;
}

function limpaCampo() {
	$('#selectCadastro').val('')
			$('#selectCadastro2').val('')
}