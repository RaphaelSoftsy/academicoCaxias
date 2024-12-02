var dados = [];
var ufs = [];
var id = '';
var motivo = '';
var nome2 = '';
var idSelect = '';
var rows = 8;
var currentPage = 1;
var pagesToShow = 5;
const contaId = localStorage.getItem('contaId');
const turmaId = params.get("id");

$(document).ready(function() {
	
	
	 tinymce.init({
            selector: '#mensagem',
            height: 300,
            menubar: false,
            plugins: 'link image code lists',
            toolbar: 'undo redo | bold italic underline | bullist numlist | link image | code',
            content_style: 'body { font-family:Arial,sans-serif; font-size:14px }'
        });


	$.ajax({
		url: url_base + "/tipoAviso/conta/" + contaId,
		type: "GET",
		async: false,
	}).done(function(data) {
		console.log(data)

		$.each(data, function(index, item) {
			$("#tipoAvisoId").append(
				$("<option>", {
					value: item.idTipoAviso,
					text: item.descricao,
					name: item.idTipoAviso,
				})
			);


		});
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	});

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
		url: url_base + "/turma/alunos?idTurma=" + turmaId,
		type: "GET",
		async: false,
	})
		.done(function(data) {
			dados = data
			listarDados(data.data);
			$('input[data-toggle="toggle"]').bootstrapToggle();
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
			"<input type='checkbox' class='form-check-input' data-id='" + item.id + "' />" +
			"</td>" +
			"<td>" +
			item.aluno +
			"</td>" +
			"<td>" +
			item.nomeCompleto +
			"</td>" +
			"<td>" +
			item.emailInterno +
			"</td>" +
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

	console.log(id)
	console.log(status)
	$.ajax({
		url: url_base + `/motivoReprovacaoDocumento/${id}${status === "S" ? '/desativar' : '/ativar'}`,
		type: "put",
		error: function(e) {
			Swal.close();
			console.log(e.responseJSON);
			Swal.fire({
				icon: "error",
				title: e.responseJSON.message
			});
		}
	})
}

function showModal(ref) {
	id = ref.getAttribute("data-id");
	motivo = ref.getAttribute("data-motivo");

	$('#motivoEdit').val(motivo);
}

function editar() {
	var objeto = {
		"idMotivoReprovacaoDocumento": id,
		"contaId": contaId,
		"motivoReprovacaoDocumento": $("#motivoEdit").val(),
		"obrigatorio": "N"
	}

	$.ajax({
		url: url_base + "/motivoReprovacaoDocumento",
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


// Atualizando o evento para lidar com checkboxes dinâmicos
$('#checkAll').on('change', function() {
	const isChecked = $(this).is(':checked');

	// Altera todos os checkboxes dentro da tabela
	$('#cola-tabela input[type="checkbox"]').prop('checked', isChecked);
});

// Garantindo a sincronização de `#checkAll` quando itens individuais são alterados
$('#cola-tabela').on('change', 'input[type="checkbox"]', function() {
	const totalCheckboxes = $('#cola-tabela input[type="checkbox"]').length;
	const checkedCheckboxes = $('#cola-tabela input[type="checkbox"]:checked').length;

	// Sincroniza o estado do checkbox principal
	$('#checkAll').prop('checked', totalCheckboxes === checkedCheckboxes);
});

function cadastrar() {

	var objeto = {
		"contaId": contaId,
		"motivoReprovacaoDocumento": $("#motivo").val(),
		"obrigatorio": "N"
	}

	$.ajax({
		url: url_base + "/motivoReprovacaoDocumento",
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