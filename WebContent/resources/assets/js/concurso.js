var dados = [];
var ufs = [];
const contaId = localStorage.getItem('contaId');
var nome = '';
var nome2 = '';
var dataIni = '';
var dataFim = '';
var periodoLetivoId = 0
var rows = 8;
var currentPage = 1;
var pagesToShow = 5;
var id = 0;

$(document).ready(function() {

	getDados()

	$.ajax({
		url: url_base + '/periodoletivo/conta/' + contaId,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {

			if (item.ativo == "S") {
				$('#periodoLetivoEdit').append($('<option>', {
					value: item.idPeriodoLetivo,
					text: item.periodo + ' - ' + item.descricao,
					name: item.periodo
				}));
			}

		});
		$.each(data, function(index, item) {
			if (item.ativo == "S") {
				$('#periodoLetivo').append($('<option>', {
					value: item.idPeriodoLetivo,
					text: item.ano + '/' + item.periodo + " - " + formatarPeriodo(item.tipoPeriodicidade) + " - " + item.descricao,
					name: item.periodo
				}));
			}

		});
	})

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
	
		$('.checkbox-toggle').each(function() {
		var status = $(this).data('status');
		if (status !== 'S') {
			$(this).prop('checked', false);
		}
	});

	showPage(currentPage);
	updatePagination();

});


function formatarPeriodo(tipoPeriodicidade){
	if(tipoPeriodicidade == "A"){
		return "Anual"
	}else if(tipoPeriodicidade == "B"){
		return "Bimestral"
	}else if(tipoPeriodicidade == "T"){
		return "Trimestral"
	}else if(tipoPeriodicidade == "S"){
		return "Semestral"
	}
	
}

function formatarDataParaBR(data) {
	var dataISO = data + "T00:00:00";
	var dataObj = new Date(dataISO);
	var dia = String(dataObj.getUTCDate()).padStart(2, "0");
	var mes = String(dataObj.getUTCMonth() + 1).padStart(2, "0");
	var ano = dataObj.getUTCFullYear();
	return dia + "/" + mes + "/" + ano;
}


function getDados() {
	$.ajax({
		url: url_base + "/concursos/conta/" + contaId,
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

		if (item.ativo == "N") {
			ativo = '<i  style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não';
		} else {
			ativo = "<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim";
		}

		return (
			"<tr>" +
			"<td>" +
			item.concurso +
			"</td>" +
			"<td>" +
			formatarDataParaBR(item.dataAbertura) +
			"</td>" +
			"<td>" +
			formatarDataParaBR(item.dataFechamento) +
			"</td>" +
			"<td><div class='d-flex align-items-center gap-1'>" +
			'<input type="checkbox" data-status="' +
			item.ativo +
			'" data-id="' +
			item.idConcurso +
			' " onChange="alteraStatus(this)" checked data-toggle="toggle" data-onstyle="success" data-offstyle="danger" data-on="Sim" data-off="Não" data-width="63" class="checkbox-toggle" data-size="sm">' +
			"</div></td>" +
			'<td class="d-flex justify-content-center"><span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-id="' +
			item.idConcurso +
			'" data-nome="' +
			item.concurso +
			'" data-dataInicio="' +
			item.dataAbertura +
			'" data-dataFim="' +
			item.dataFechamento +
			'" data-idPeriodoLetivo="' +
			item.periodoLetivo.idPeriodoLetivo +
			'" data-ativo="' +
			item.ativo +
			'" onclick="showModal(this)" data-bs-toggle="modal" data-bs-target="#editAto"><i class="fa-solid fa-pen fa-lg"></i></span></td>' +
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
		url: url_base + `/concursos/${id}${status === "S" ? '/desativar' : '/ativar'}`,
		type: "put",
		error: function(e) {
			Swal.close();
			console.log(e.responseJSON);
			Swal.fire({
				icon: "error",
				title: e.responseJSON.message
			});
		}
	}).then(data => {
		window.location.href = 'concurso'
	})
}
function showModal(ref) {
	id = ref.getAttribute("data-id");
	nome = ref.getAttribute("data-nome");
	dataIni = ref.getAttribute("data-dataInicio");
	dataFim = ref.getAttribute("data-dataFim");
	isAtivo = ref.getAttribute("data-ativo");
	periodoLetivoId = ref.getAttribute("data-idPeriodoLetivo")

	if (isAtivo == "S") {
		$(".ativar").hide();
		$(".desativar").show()
	}
	else {
		$(".desativar").hide();
		$(".ativar").show();
	}

	$('#edit-nome').val(nome);
	$("#dataInicioEdit").val(dataIni);
	$("#dataFimEdit").val(dataFim);


	$("#periodoLetivoEdit").val(periodoLetivoId).attr('selected', true);


}

function formatarHoraParaAPI(hora) {
	if (/^\d{2}:\d{2}$/.test(hora)) {
		return hora + ":00";
	}
	return hora;
}

function editar() {
	var objeto = {
		idConcurso: id,
		concurso: $('#edit-nome').val(),
		dataAbertura: $('#dataInicioEdit').val(),
		dataFechamento: $("#dataFimEdit").val(),
		periodoLetivoId: $("#periodoLetivoEdit").val(),
		contaId: contaId

	}


	$.ajax({
		url: url_base + "/concursos",
		type: "PUT",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(e.responseJSON)
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
		concurso: $('#cadastro-nome').val(),
		dataAbertura: $('#dataInicio').val(),
		dataFechamento: $("#dataFechamento").val(),
		periodoLetivoId: $("#periodoLetivo").val(),
		contaId: contaId

	}


	$.ajax({
		url: url_base + "/concursos",
		type: "POST",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(e.responseJSON)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
			});
		}
	})
		.done(function(data) {
			$('#cadastro-nome').val('');
			$("#dataInicio").val('');
			$("#dataFechamento").val('');
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