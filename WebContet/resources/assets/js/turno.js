var dados = [];
var ufs = [];
const contaId = sessionStorage.getItem('contaId');
var nome = '';
var nome2 = '';
var horaIni = '';
var horaFim = '';
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
		url: url_base + "/turno",
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

		var horaInicioFormatada = item.horaInicio.substring(0, 5);
		var horaFimFormatada = item.horaFim.substring(0, 5);

		var ativo;

		if (item.ativo == "N") {
			ativo = '<i  style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não';
		} else {
			ativo = "<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim";
		}

		return (
			"<tr>" +
			"<td>" +
			item.turno +
			"</td>" +
			"<td>" +
			item.mnemonico +
			"</td>" +
			"<td>" +
			horaInicioFormatada +
			"</td>" +
			"<td>" +
			horaFimFormatada +
			"</td>" +
			"<td>" +
			ativo +
			"</td>" +
			'<td class="d-flex"><span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-id="' +
			item.idTurno +
			'" data-nome="' +
			item.turno +
			'" data-nome2="' +
			item.mnemonico +
			'" data-horaIni="' +
			item.horaInicio +
			'" data-horaFim="' +
			item.horaFim +
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
	nome2 = ref.getAttribute("data-nome2");
	horaIni = ref.getAttribute("data-horaIni");
	horaFim = ref.getAttribute("data-horaFim");
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
	$('#edit-nome2').val(nome2);
	$("#horaInicioEdit").val(horaIni);
	$("#horaFimEdit").val(horaFim);
}

function formatarHoraParaAPI(hora) {
	if (/^\d{2}:\d{2}$/.test(hora)) {
		return hora + ":00";
	}
	return hora;
}

function editar() {
	var objeto = {
		idTurno: Number(id),
		turno: $('#edit-nome').val(),
		mnemonico: $('#edit-nome2').val(),
		horaInicio: formatarHoraParaAPI($("#horaInicioEdit").val()),
		horaFim: formatarHoraParaAPI($("#horaFimEdit").val()),
		contaId: contaId

	}

	$.ajax({
		url: url_base + "/turno",
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
			$("#horaInicioEdit").val('');
			$("#horaFimEdit").val('');
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
		turno: $('#cadastro-nome').val(),
		mnemonico: $('#cadastro-nome2').val(),
		horaInicio: formatarHoraParaAPI($("#horaInicio").val()),
		horaFim: formatarHoraParaAPI($("#horaFim").val()),
		contaId: contaId

	}


	$.ajax({
		url: url_base + "/turno",
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
			$("#horaInicio").val('');
			$("#horaFim").val('');
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
	$("#horaInicio").val('');
	$("#horaFim").val('');
}