var dados = [];
var ufs = [];
var id = '';
var nome = '';
var nome2 = '';
var idSelect = '';
var rows = 8;
var currentPage = 1;
var pagesToShow = 5;
const contaId = localStorage.getItem('contaId');


$(document).ready(function() {

	if (isNaN(contaId)) {
		Swal.fire({
			title: "Nenhum usuário localizado, logue novamente",
			icon: "info",
		}).then(result => {
			if (result) {
				window.location.href = "login"
			}
		})
	}


	$.ajax({
		url: url_base + "/uf",
		type: "GET",
		async: false,
	})
		.done(function(data) {
			ufs = data;
			$.each(data, function(index, item) {
				$('#selectEdit').append($('<option>', {
					value: item.idUf,
					text: item.codUf,
					name: item.codUf
				}));
			});
			$.each(data, function(index, item) {
				$('#selectCadastro').append($('<option>', {
					value: item.idUf,
					text: item.codUf,
					name: item.codUf
				}));
			});
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

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
		url: url_base + "/municipio",
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

		var uf = ufs.find(function(ufId) {
			return ufId.idUf === item.ufId;
		});

		var nomeUf = uf
			? uf.codUf
			: "UF não encontrada";

		return (
			"<tr>" +
			"<td>" +
			item.nomeMunicipio +
			"</td>" +
			"<td>" +
			nomeUf +
			"</td>" +
			"<td>" +
			item.codIbge +
			"</td>" +
			'<td class="d-flex"><span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-id="' +
			item.idMunicipio +
			'" data-nome="' +
			item.nomeMunicipio +
			'" data-nome2="' +
			item.codIbge +
			'" data-selectId="' +
			item.ufId +
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
	idSelect = ref.getAttribute("data-selectId");

	$('#edit-nome').val(nome);
	$('#edit-nome2').val(nome2);
	$("#selectEdit").val(idSelect).attr('selected', true);
}

function editar() {
	var objeto = {
		idMunicipio: Number(id),
		nomeMunicipio: $('#edit-nome').val(),
		codIbge: $('#edit-nome2').val(),
		ufId: $('#selectEdit').val(),
		contaId : contaId


	}

	$.ajax({
		url: url_base + "/municipio",
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
			$('#edit-nome').val('');
			$('#edit-nome2').val('');
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
		nomeMunicipio: $('#cadastro-nome').val(),
		codIbge: $('#cadastro-nome2').val(),
		ufId: $('#selectCadastro').val(),
		contaId : contaId


	}

	$.ajax({
		url: url_base + "/municipio",
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
			$('#cadastro-nome').val('');
			$('#cadastro-nome2').val('');
			$('#selectCadastro').val('');
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
	$('#cadastro-nome').val('');
	$('#cadastro-nome2').val('');
	$('#selectCadastro').val('');
}