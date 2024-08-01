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

$(document).ready(function() {
	$.ajax({
		url: url_base + "/escolas/conta/" + contaId,
		type: "GET",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#escolaId").append(
				$("<option>", {
					value: item.idEscola,
					text: item.nomeEscola,
					name: item.nomeEscola,
				})
			);
		});
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	});

	$.ajax({
		url: url_base + "/turno/conta/" + contaId,
		type: "GET",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#turnoId").append(
				$("<option>", {
					value: item.idTurno,
					text: item.turno,
					name: item.turno,
				})
			);
		});
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	});

	$.ajax({
		url: url_base + "/periodoletivo/conta/" + contaId,
		type: "GET",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#periodoletivoId").append(
				$("<option>", {
					value: item.idPeriodoLetivo,
					text: `Ano: ${item.ano} - Semestre: ${item.periodo}`,
					name: item.periodo,
				})
			);
		});
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	});

	$.ajax({
		url: url_base + "/gradeCurricular",
		type: "GET",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#gradeCurricularId").append(
				$("<option>", {
					value: item.idGradeCurricular,
					text: item.idGradeCurricular,
					name: item.idGradeCurricular,
				})
			);
		});
	}).fail(function(jqXHR, textStatus, errorThrown) {
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
		url: url_base + "/turma",
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
		
		var libras;

		if (item.ativo == "N") {
			ativo = '<i  style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não';
		} else {
			ativo = "<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim";
		}
		
		if(item.libras == "N"){
			libras = "Não"
		}else{
			libras = "Sim"
		}

		return (
			"<tr>" +

			"<td>" +
			item.nomeTurma +
			"</td>" +

			"<td>" +
			item.periodoLetivo.ano + '/' + item.periodoLetivo.periodo +
			"</td>" +

			"<td>" +
			item.turno.turno +
			"</td>" +

			"<td>" +
			item.vagas +
			"</td>" +

			"<td>" +
			libras +
			"</td>" +

			"<td><div class='d-flex align-items-center gap-1'>" +
			'<input type="checkbox" data-status="' +
			item.ativo +
			'" data-id="' +
			item.idTurma +
			' " onChange="alteraStatus(this)" checked data-toggle="toggle" data-onstyle="success" data-offstyle="danger" data-on="Sim" data-off="Não" data-width="63" class="checkbox-toggle" data-size="sm">' +
			"</div></td>" +
			'<td class="d-flex justify-content-center"><span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-id="' +
			item.idTurma +
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
	alert(status)

	$.ajax({
		url: url_base + `/serie/${id}${status === "S" ? '/desativar' : '/ativar'}`,
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
		window.location.href = 'serie-matriz-curricular'
	})
}

function showModal(ref) {
	limpaCampo()
	id = ref.getAttribute("data-id");
	
	window.location.href = "nova-turma-matriz-curricular?id=" + id

	/*$.ajax({
		url: url_base + "/turma/" + id,
		type: "GET",
		async: false,
	}).done(function(data) {
		$('#escolaId').val(data.escolaId)
		$('#turnoId').val(data.turno.idTurno)
		$('#periodoLetivoId').val(data.periodoLetivo.idPeriodoLetivo)
		$('#gradeCurricularId').val(data.gradeCurricularId)
		$('#nomeTurma').val(data.nomeTurma)
		$('#codTurmaInep').val(data.codTurmaInep)
		$('#vagas').val(data.vagas)
		$('#libras').val(data.libras)
		$('#controlaVagas').val(data.controlaVagas)
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	});*/
}

function editar() {
	var objeto = {
		idSerie: Number(id),
		serie: $('#nomeSerieEdit').val(),
		descricao: $('#descricaoEdit').val(),
		contaId: contaId
	}

	$.ajax({
		url: url_base + "/serie",
		type: "PUT",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(e)
			console.log(e.responseJSON.message)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",

			});
		}
	})
		.done(function(data) {
			Swal.close()
			Swal.fire({
				title: "Editado com sucesso",
				icon: "success",
			}).then(result => {
				window.location.href = 'serie-matriz-curricular'
			})
		})
	return false;
}
/*$('#formEdit').on('submit', function(e) {
	e.preventDefault();
	editar();
	return false;
});*/
$('#formCadastro').on('submit', function(e) {
	e.preventDefault();
	if (id != '') {
		editar()
	} else {
		cadastrar();
	}
	return false;
});

function cadastrar() {

	var objeto = {
		escolaId: $('#escolaId').val(),
		turnoId: $('#turnoId').val(),
		periodoLetivoId: $('#periodoLetivoId').val(),
		gradeCurricularId: $('#gradeCurricularId').val(),
		nomeTurma: $('#nomeTurma').val(),
		codTurmaInep: $('#codTurmaInep').val(),
		vagas: $('#vagas').val(),
		libras: $('#libras').val(),
		controlaVagas: $('#controlaVagas').val(),
	}

	$.ajax({
		url: url_base + "/serie",
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
			console.log(e.responseJSON.message)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",

			});
		}
	})
		.done(function(data) {
			Swal.close()
			Swal.fire({
				title: "Cadastrado com sucesso",
				icon: "success",
			}).then(result => {
				window.location.href = 'serie-matriz-curricular'
			})
		})
	return false;
}

function limpaCampo() {
	$('#escolaId').val('')
	$('#turnoId').val('')
	$('#periodoLetivoId').val('')
	$('#gradeCurricularId').val('')
	$('#nomeTurma').val('')
	$('#codTurmaInep').val('')
	$('#vagas').val('')
	$('#libras').val('')
	$('#controlaVagas').val('')
}