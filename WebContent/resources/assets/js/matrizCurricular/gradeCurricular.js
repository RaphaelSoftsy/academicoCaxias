var dados = [];
const contaId = localStorage.getItem('contaId');;
const curriculoIdSession = sessionStorage.getItem("curriculoId")
const cursoIdSession = sessionStorage.getItem("cursoId")
var nome = '';
var nome2 = '';
var nome3 = '';
var rows = 5;
var currentPage = 1;
var pagesToShow = 5;
let descricao = ''
let id = ''

$(document).ready(function() {

	if (curriculoIdSession !== null && curriculoIdSession !== undefined && curriculoIdSession !== 0) {
		$('#curriculoIdLista').removeAttr('disabled');

		$.ajax({
			url: url_base + `/curriculo/curso/${cursoIdSession}`,
			type: "get",
			async: false,
		}).done(function(data) {
			console.log(data)
			$.each(data, function(index, item) {
				$('#curriculoIdLista').append($('<option>', {
					value: item.idCurriculo,
					text: item.curriculo,
					name: item.curriculo
				}));
			});
		});

		$('#curriculoIdLista').val(curriculoIdSession);
		$('#cursoIdLista').val(cursoIdSession);
		getDados(curriculoIdSession);
	}



	$.ajax({
		url: url_base + "/cursos/conta/" + contaId,
		type: "GET",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#cursoIdLista").append(
				$("<option>", {
					value: item.idCurso,
					text: item.nome,
					name: item.nome,
				})
			);
		});
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	});



	$('#cursoIdLista').change(() => {

		$('#curriculoIdLista').empty()
		$('#curriculoIdLista').removeAttr('disabled');
		$('#curriculoIdLista').append(`<option value='0' selected disabled>Selecione o currículo</option>`)

		let curso = $('#cursoIdLista').val()
		$.ajax({
			url: url_base + `/curriculo/curso/${curso}`,
			type: "get",
			async: false,
		}).done(function(data) {
			console.log(data)
			$.each(data, function(index, item) {
				$('#curriculoIdLista').append($('<option>', {
					value: item.idCurriculo,
					text: item.curriculo,
					name: item.curriculo
				}));
			});
		})
	});

	$.ajax({
		url: url_base + "/serie",
		type: "GET",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#serieId").append(
				$("<option>", {
					value: item.idSerie,
					text: item.serie,
					name: item.serie,
				})
			);
		});
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	});

	$.ajax({
		url: url_base + "/curriculo",
		type: "GET",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#curriculoId").append(
				$("<option>", {
					value: item.idCurriculo,
					text: item.curriculo,
					name: item.curriculo,
				})
			);
		});
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	});

	$.ajax({
		url: url_base + "/disciplina",
		type: "GET",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#disciplinaId").append(
				$("<option>", {
					value: item.idDisciplina,
					text: item.codDiscip + " - " + item.nome,
					name: item.nome,
				})
			);

			$("#disciplinaIdEdit").append(
				$("<option>", {
					value: item.idDisciplina,
					text: item.codDiscip + " - " + item.nome,
					name: item.nome,
				})
			);
		});
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	});

	$.ajax({
		url: url_base + "/serie",
		type: "GET",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#serieIdEdit").append(
				$("<option>", {
					value: item.idSerie,
					text: item.serie,
					name: item.serie,
				})
			);
		});
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	});

	$.ajax({
		url: url_base + "/curriculo",
		type: "GET",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#curriculoIdEdit").append(
				$("<option>", {
					value: item.idCurriculo,
					text: item.curriculo,
					name: item.curriculo,
				})
			);
		});
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	});


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


function getDados(idCurriculo) {
	$.ajax({
		url: url_base + "/gradeCurricular/curriculo/" + idCurriculo,
		type: "GET",
		async: false,
	}).done(function(data) {
		if (data.length > 0) {
			console.log(data)
			listarDados(data)
		} else {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não existe nenhuma grade vinculada a este currículo!"
			}).then();
			$("#cola-tabela tbody").empty()
		}

	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	});
}
function listarDados(dados) {
	var html = dados.map(function(item) {
		var obrigatorio = item.obrigatoria == "N" ? "Não" : "Sim";
		var retemAluno = item.retemSerie == "N" ? "Não" : "Sim";

		return (
			"<tr>" +
			"<td>" + item.serie.serie + "</td>" +
			"<td>" + `${item.disciplina.codDiscip} - ${item.disciplina.nome}` + "</td>" +
			"<td>" + obrigatorio + "</td>" +
			"<td>" + item.curriculo.aulasPrevistas + "</td>" +
			"<td>" + retemAluno + "</td>" +
			"<td>" +
			'<input type="checkbox" data-status="' + item.ativo + '" data-id="' + item.idGradeCurricular + '" onChange="alteraStatus(this)" checked data-toggle="toggle" data-onstyle="success" data-offstyle="danger" data-on="Sim" data-off="Não" data-width="63" class="checkbox-toggle" data-size="sm">' +
			"</td>" +
			'<td class="d-flex justify-content-center"><span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-id="' + item.idGradeCurricular + '" onclick="showModal(this)" data-bs-toggle="modal" data-bs-target="#editAto"><i class="fa-solid fa-pen fa-lg"></i></span></td>' +
			"</tr>"
		);
	}).join("");

	$("#cola-tabela").html(html);
/*
	// Limitar o número de linhas exibidas
	var maxRows = 6;

	// Mostrar apenas as linhas que estão dentro do limite
	$('#myTable tbody tr').each(function(index) {
		if (index >= maxRows) {
			$(this).addClass('hidden-row');
		}
	});*/

	// Inicializar o toggle
	$('.checkbox-toggle').each(function() {
		var status = $(this).data('status');
		if (status !== 'S') {
			$(this).prop('checked', false);
		}
	});

	// Certifique-se de que o Bootstrap Toggle esteja inicializado corretamente
	$('input[data-toggle="toggle"]').bootstrapToggle();
}



$("#btnModalCadastrar").click(() => {
	$("#curriculoId").val($("#curriculoIdLista").val())
})

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

	$.ajax({
		url: url_base + `/gradeCurricular/${id}${status === "S" ? '/desativar' : '/ativar'}`,
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
		window.location.href = 'grade-curricular-matriz-curricular'
	})
}

function showModal(ref) {
	id = ref.getAttribute("data-id");

	$.ajax({
		url: url_base + "/gradeCurricular/" + id,
		type: "GET",
		async: false,
	}).done(function(data) {
		$('#serieIdEdit').val(data.serie.idSerie)
		$('#disciplinaIdEdit').val(data.disciplina.idDisciplina)
		$('#curriculoIdEdit').val(data.curriculo.idCurriculo)
		$('#obrigatoriaEdit').val(data.obrigatoria)
		$('#retemSerieEdit').val(data.retemSerie)
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	});
}

function listarGrade() {
	const idCurriculo = $("#curriculoIdLista").val()
	console.log(idCurriculo)

	if (idCurriculo != null || idCurriculo != undefined || idCurriculo != 0) {
		getDados(idCurriculo)
	} else {
		Swal.fire({
			icon: "error",
			title: "Oops...",
			text: "Você deve preencher os dois campos antes de listar as grades!",

		});
	}

}

function editar() {
	var objeto = {
		idGradeCurricular: id,
		serieId: $('#serieIdEdit').val(),
		disciplinaId: $('#disciplinaIdEdit').val(),
		curriculoId: $('#curriculoIdEdit').val(),
		obrigatoria: $('#obrigatoriaEdit').val(),
		retemSerie: $('#retemSerieEdit').val(),
	}

	$.ajax({
		url: url_base + "/gradeCurricular",
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
				window.location.href = 'grade-curricular-matriz-curricular'
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
		serieId: $('#serieId').val(),
		disciplinaId: $('#disciplinaId').val(),
		curriculoId: $('#curriculoId').val(),
		obrigatoria: $('#obrigatoria').val(),
		retemSerie: $('#retemSerie').val(),
	}

	$.ajax({
		url: url_base + "/gradeCurricular",
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
				sessionStorage.setItem("cursoId", $("#cursoIdLista").val())
				sessionStorage.setItem("curriculoId", $("#curriculoIdLista").val())
				window.location.href = 'grade-curricular-matriz-curricular'
			})
		})
	return false;
}

function limpaCampo() {
	$('#nomeSerie').val('');
	$('#descricao').val('');
}