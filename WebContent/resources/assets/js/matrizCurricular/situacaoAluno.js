var dados = [];
const contaId = localStorage.getItem('contaId');;
var nome = '';
var nome2 = '';
var nome3 = '';
var rows = 8;
var currentPage = 1;
var pagesToShow = 5;
let descricao = ''
let id = ''
var sortOrder = {};
var dadosOriginais = [];

$(document).ready(function() {

	$('.dropdown-toggle-form').click(function() {
		console.log('TESTE');
		
	});

	$('.searchButton').click(function() {
		var searchInput = $(this).siblings('.searchInput').val().toLowerCase();
		console.log("Search Input:", searchInput);

		var columnToSearch = $(this).closest('.sortable').data('column');
		console.log("Column to Search:", columnToSearch);

		var filteredData = dadosOriginais.filter(function(item) {
			console.log(item)
			var valueToCheck = item[columnToSearch] ? item[columnToSearch].toString().toLowerCase() : '';
			console.log(searchInput.toLowerCase())
			return valueToCheck.toString().includes(searchInput.toLowerCase());
		});

		console.log("Filtered Data:", filteredData);
		listarDados(filteredData);  $('input[data-toggle="toggle"]').bootstrapToggle();$('input[data-toggle="toggle"]').bootstrapToggle();

		$(this).siblings('.searchInput').val('');
		$(this).closest('.dropdown-content-form').removeClass('show')
		$('.checkbox-toggle').each(function() {
			var status = $(this).data('status');
			if (status !== 'S') {
				$(this).prop('checked', false);
			}
		})

		$('input[data-toggle="toggle"]').bootstrapToggle()
	});

	getDados()

	showPage(currentPage);
	updatePagination();

	$('.checkbox-toggle').each(function() {
		var status = $(this).data('status');
		if (status !== 'S') {
			$(this).prop('checked', false);
		}
	});
});

const cadastrar = () => {
	var objeto = {
		situacaoAluno: $('#situacaoAluno').val(),
		contaId: contaId
	}

	$.ajax({
		url: url_base + "/situacoesAluno",
		type: "POST",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		async: false,
		beforeSend: function() {
			Swal.showLoading()
		},
		error: function(e) {
			Swal.close()
			console.log(e)
			console.log(e.responseJSON)
			console.log(e.responseJSON.message)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",

			});
		}
	}).done(function(data) {
		Swal.close()
		Swal.fire({
			title: "Cadastrado com sucesso",
			icon: "success",
		}).then(result => {
			window.location.href = 'situacao-aluno'
		})
	})
}

const editar = () => {
	var objeto = {
		idSituacaoAluno: id,
		situacaoAluno: $('#situacaoAlunoEdit').val(),
		contaId: contaId
	}

	$.ajax({
		url: url_base + "/situacoesAluno",
		type: "PUT",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		async: false,
		beforeSend: function() {
			Swal.showLoading()
		},
		error: function(e) {
			Swal.close()
			console.log(e)
			console.log(e.responseJSON)
			console.log(e.responseJSON.message)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",

			});
		}
	}).done(function(data) {
		Swal.close()
		Swal.fire({
			title: "Editado com sucesso",
			icon: "success",
		}).then(result => {
			window.location.href = 'situacao-aluno'
		})
	})
}


function getDados() {
	$.ajax({
		url: url_base + "/situacoesAluno",
		type: "GET",
		async: false,
	}).done(function(data) {
		dados = data
		dadosOriginais = data
		listarDados(data);  
		$('input[data-toggle="toggle"]').bootstrapToggle();
		$('.searchInput').val('');
		$('.checkbox-toggle').each(function() {
			var status = $(this).data('status');
			if (status !== 'S') {
				$(this).prop('checked', false);
			}
		})

		$('input[data-toggle="toggle"]').bootstrapToggle()
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	});
}

$('#limpa-filtros').click(function() {
	listarDados(dadosOriginais);  $('input[data-toggle="toggle"]').bootstrapToggle();$('input[data-toggle="toggle"]').bootstrapToggle();
	$('.searchInput').val('');
	$('.checkbox-toggle').each(function() {
		var status = $(this).data('status');
		if (status !== 'S') {
			$(this).prop('checked', false);
		}
	})

	$('input[data-toggle="toggle"]').bootstrapToggle()
});

function listarDados(dados) {
	var html = dados.map(function(item) {
		var ativo;

		if (item.ativo == "N") {
			ativo = '<i  style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não';
		} else {
			ativo = "<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim";
		}

		return (
			"<tr>" +

			"<td>" +
			item.situacaoAluno +
			"</td>" +

			'<td class="d-flex justify-content-center">' +
			'<span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-id="' +
			item.idSituacaoAluno +
			'" data-situacao="' +
			item.situacaoAluno
			+
			'" onclick="showModal(this)" data-bs-toggle="modal" data-bs-target="#editarSituacao"><i class="fa-solid fa-pen fa-lg"></i></span>' +
			'<span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-danger btn-sm" data-id="' +
			item.idSituacaoAluno +
			'" onclick="excluirSituacao(this)"><i class="fa-solid fa-xmark"></i></span>' +
			'</td>' +
			"</tr>"
		);
	}).join("");

	$("#cola-tabela").html(html); 
}

function alteraStatus(element) {
	var id = element.getAttribute("data-id");
	var status = element.getAttribute("data-status");

	const button = $(element).closest("tr").find(".btn-status");
	if (status === "S") {
		button.removeClass("btn-success").addClass("btn-danger");
		button.find("i").removeClass("fa-check").addClass("fa-xmark");
		element.setAttribute("data-status", "N");
	} else {
		button.removeClass("btn-danger").addClass("btn-success");
		button.find("i").removeClass("fa-xmark").addClass("fa-check");
		element.setAttribute("data-status", "S");
	}

	$.ajax({
		url: url_base + `/situacoesAluno/${id}${status === "S" ? '/desativar' : '/ativar'}`,
		type: "put",
		error: function(e) {
			Swal.close();
			console.log(e);
			console.log(e.responseJSON);
			Swal.fire({
				icon: "error",
				title: e.responseJSON.message
			});
		}
	}).then(data => {
		getDados()
	})
}

function showModal(ref) {
	limpaCampo()
	id = ref.getAttribute("data-id");
	let situacao = ref.getAttribute("data-situacao")
	$('#situacaoAlunoEdit').val(situacao)
}

const excluirSituacao = (element) => {
	Swal.fire({
		title: "Deseja mesmo excluir?",
		icon: "warning",
		showCancelButton: true,
		showConfirmButton: false,
		showDenyButton: true,
		denyButtonText: 'Deletar',
		cancelButtonText: 'Cancelar'
	}).then(result => {
		if (result.isDenied) {
			$.ajax({
				url: url_base + "/situacoesAluno/" + Number(element.getAttribute("data-id")),
				type: "delete",
				contentType: "application/json; charset=utf-8",
				async: false,
				error: function(e) {
					console.log(e)
					Swal.fire({
						icon: "error",
						title: "Oops...",
						text: "Não foi possível realizar esse comando!"

					});
				}
			}).done(function(data) {
				Swal.fire({
					title: "Deletado com sucesso",
					icon: "success",
				}).then((data) => {
					window.location.href = 'situacao-aluno'
				})
			})
		} else if (result.isCanceled) { }
	})
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

function limpaCampo() {
	$('#situacaoAluno').val('')
}