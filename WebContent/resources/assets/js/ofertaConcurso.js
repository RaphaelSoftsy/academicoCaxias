var dados = [];
var ufs = [];
var dadosOriginais = [];
var concursoId = 0;
var cursoId = 0
var idEscola = 0
var idTurno = 0
var descricaoOferta = ''
var serie = 0
var minVagasAbertTurma = 0
var vagas = 0
const contaId = localStorage.getItem('contaId');
var rows = 8;
var currentPage = 1;
var pagesToShow = 5;
var id = 0;

$(document).ready(function() {



	$('.dropdown-toggle-form').click(function() {
		console.log('TESTE');
		$(this).siblings('.dropdown-content-form').toggleClass('show');
	});

	$('.searchButton').click(function() {
		var searchInput = $(this).siblings('.searchInput').val().toLowerCase();
		console.log("Search Input:", searchInput);

		var columnToSearch = $(this).closest('.sortable').data('column');
		console.log("Column to Search:", columnToSearch);

		var filteredData = dadosOriginais.filter(function(item) {
			console.log(item)
			var valueToCheck = item[columnToSearch] ? item[columnToSearch].toString().toLowerCase() : '';
			return valueToCheck.toString().includes(searchInput.toLowerCase());
		});

		console.log("Filtered Data:", filteredData);
		listarDados(filteredData);

		$(this).siblings('.searchInput').val('');
		$(this).closest('.dropdown-content-form').removeClass('show');
	});


	$.ajax({
		url: url_base + '/concursos/conta/' + contaId,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {

			console.log(item)

			if (item.ativo == "S") {
				$('#concursoEdit').append($('<option>', {
					value: item.idConcurso,
					text: item.concurso,
					name: item.concurso
				}));
			}

		});
		$.each(data, function(index, item) {
			if (item.ativo == "S") {
				$('#concursoSelect').append($('<option>', {
					value: item.idConcurso,
					text: item.concurso,
					name: item.concurso
				}));
			}

		});
	})



	$.ajax({
		url: url_base + '/cursos/conta/' + contaId,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {

			if (item.ativo == "S") {
				$('#cursoEdit').append($('<option>', {
					value: item.idCurso,
					text: item.nome,
					name: item.nome
				}));
			}

		});
		$.each(data, function(index, item) {
			if (item.ativo == "S") {
				$('#cursoSelect').append($('<option>', {
					value: item.idCurso,
					text: item.nome,
					name: item.nome
				}));
			}

		});
	})

	$.ajax({
		url: url_base + "/escolas/usuario/" + contaId + "/" + usuarioId,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {

			if (item.ativo == "S") {
				$('#escolaEdit').append($('<option>', {
					value: item.idEscola,
					text: item.nomeEscola,
					name: item.nomeEscola
				}));
			}

		});
		$.each(data, function(index, item) {
			if (item.ativo == "S") {
				$('#escola').append($('<option>', {
					value: item.idEscola,
					text: item.nomeEscola,
					name: item.nomeEscola
				}));
			}

		});
	})
	$.ajax({
		url: url_base + '/turno/conta/' + contaId,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {

			if (item.ativo == "S") {
				$('#turnoEdit').append($('<option>', {
					value: item.idTurno,
					text: item.turno + ' - ' + item.mnemonico,
					name: item.turno
				}));
			}

		});
		$.each(data, function(index, item) {
			if (item.ativo == "S") {
				$('#turno').append($('<option>', {
					value: item.idTurno,
					text: item.turno + ' - ' + item.mnemonico,
					name: item.turno
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
	showPage(currentPage);
	updatePagination();
	getDados()


	$('.checkbox-toggle').each(function() {
		var status = $(this).data('status');
		if (status !== 'S') {
			$(this).prop('checked', false);
		}
	});

});

$('#limpa-filtros').click(function() {
	listarDados(dadosOriginais);
	$('.searchInput').val('');
});

function getDados() {
	$.ajax({
		url: url_base + "/ofertasConcurso/cursoUsuario/" + usuarioId,
		type: "GET",
		async: false,
	})
		.done(function(data) {
			dadosOriginais = data;
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
			ativo = '<i style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não';
		} else {
			ativo = "<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim";
		}

		return (
			"<tr>" +
			"<td>" + item.concurso + "</td>" +
			"<td>" + item.nomeCurso + "</td>" +
			"<td>" + item.nomeEscola + "</td>" +
			"<td>" + item.turno + "</td>" +
			"<td>" + item.serie + "</td>" +
			"<td>" + item.descricaoOferta + "</td>" +
			"<td>" + item.vagas + "</td>" +
			"<td>" + item.minVagasAbertTurma + "</td>" +
			"<td><div class='d-flex align-items-center gap-1'>" +
			'<input type="checkbox" data-status="' + item.ativo + '" data-id="' + item.idOfertaConcurso + '" onchange="alteraStatus(this)" ' + (item.ativo == "S" ? "checked" : "") + ' data-toggle="toggle" data-onstyle="success" data-offstyle="danger" data-on="Sim" data-off="Não" data-width="63" class="checkbox-toggle" data-size="sm">' +
			"</div></td>" +
			'<td class="d-flex justify-content-center"><button style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm edit-table" data-concursoId="' + item.idConcurso + '" data-cursoId="' + item.idCurso + '" data-escolaId="' + item.idEscola + '" data-turnoId="' + item.idTurno + '" data-serie="' + item.serie + '" data-descricaoOferta="' + item.descricaoOferta + '" data-vagas="' + item.vagas + '" data-minVagasAbertTurma="' + item.minVagasAbertTurma + '" data-id="' + item.idOfertaConcurso + '" data-ativo="' + item.ativo + '" onclick="showModal(this)" data-bs-toggle="modal" data-bs-target="#editAto"><i class="fa-solid fa-pen fa-lg"></i></button></td>' +
			"</tr>"
		);
	}).join("");

	$("#cola-tabela").html(html);

	// Reaplicar a estilização do toggle
	$('input[data-toggle="toggle"]').bootstrapToggle();
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
		url: url_base + `/ofertasConcurso/${id}${status === "S" ? '/desativar' : '/ativar'}`,
		type: "PUT",
		error: function(e) {
			Swal.close();
			console.log(e.responseJSON);
			Swal.fire({
				icon: "error",
				title: e.responseJSON.message
			});
		}
	}).then(data => {
		window.location.href = 'oferta-concurso'
	})
}


function showModal(ref) {
	id = ref.getAttribute("data-id")
	concursoId = ref.getAttribute("data-concursoId");
	cursoId = ref.getAttribute("data-cursoId");
	escolaId = ref.getAttribute("data-escolaId");
	turnoId = ref.getAttribute("data-turnoId");
	serie = ref.getAttribute("data-serie");
	descricaoOferta = ref.getAttribute("data-descricaoOferta");
	vagas = ref.getAttribute("data-vagas");
	minVagasAbertTurma = ref.getAttribute("data-minVagasAbertTurma");
	isAtivo = ref.getAttribute("data-ativo");

	if (isAtivo == "S") {
		$(".ativar").hide();
		$(".desativar").show()
	}
	else {
		$(".desativar").hide();
		$(".ativar").show();
	}


	$("#serieEdit").val(serie);
	$("#descricaoEdit").val(descricaoOferta);
	$("#vagasEdit").val(vagas);
	$("#vagasMinEdit").val(minVagasAbertTurma);
	$('#concursoEdit').val(concursoId).attr('selected', true);
	$('#cursoEdit').val(cursoId).attr('selected', true);
	$('#escolaEdit').val(escolaId).attr('selected', true);
	$('#turnoEdit').val(turnoId).attr('selected', true);
}

function formatarHoraParaAPI(hora) {
	if (/^\d{2}:\d{2}$/.test(hora)) {
		return hora + ":00";
	}
	return hora;
}

function editar() {
	var objeto = {

		"idOfertaConcurso": id,
		"concursoId": Number($('#concursoEdit').val()),
		"cursoId": Number($('#cursoEdit').val()),
		"escolaId": Number($('#escolaEdit').val()),
		"turnoId": Number($('#turnoEdit').val()),
		"serie": $("#serieEdit").val(),
		"descricaoOferta": $("#descricaoEdit").val(),
		"vagas": $("#vagasEdit").val(),
		"minVagasAbertTurma": $("#vagasMinEdit").val()
	}

	console.log(objeto)


	$.ajax({
		url: url_base + "/ofertasConcurso",
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
			$('#serieEdit').val('');
			$('#descricaoEdit').val('');
			$("#vagasMinEdit").val('');
			$("#vagasEdit").val('');
			getDados();

			Swal.fire({
				title: "Editado com sucesso",
				icon: "success",
			})
			window.location.href = 'oferta-concurso'
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
		"concursoId": Number($('#concursoSelect').val()),
		"cursoId": Number($('#cursoSelect').val()),
		"escolaId": Number($('#escola').val()),
		"turnoId": Number($('#turno').val()),
		"serie": $("#serie").val(),
		"descricaoOferta": $("#descricao").val(),
		"vagas": $("#vagas").val(),
		"minVagasAbertTurma": $("#vagasMin").val()
	}

	console.log(objeto)

	$.ajax({
		url: url_base + "/ofertasConcurso",
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
			$('#serie').val('');
			$('#descricao').val('');
			$("#vagasMin").val('');
			$("#vagas").val('');
			getDados();
			showPage(currentPage);
			updatePagination();
			showPage(currentPage);
			Swal.fire({
				title: "Cadastrado com sucesso",
				icon: "success",
			})
			window.location.href("oferta-concurso")
		})
	return false;
}

function limpaCampo() {
	$('#cadastro-nome').val('');
	$('#cadastro-nome2').val('');
	$("#horaInicio").val('');
	$("#horaFim").val('');
}