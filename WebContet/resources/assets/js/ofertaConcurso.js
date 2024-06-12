var dados = [];
var ufs = [];
var concursoId = 0;
var cursoId = 0
var idEscola = 0
var idTurno = 0
var descricaoOferta = ''
var serie = 0
var minVagasAbertTurma = 0
var vagas = 0
const contaId = sessionStorage.getItem('contaId');
var rows = 8;
var currentPage = 1;
var pagesToShow = 5;
var id = 0;

$(document).ready(function() {

	getDados()

	$.ajax({
		url: url_base + '/concursos/conta/' + contaId,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {

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
		url: url_base + '/escolas/conta/' + contaId,
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

});


function getConcurso(dadosOfertaConcurso, callback) {
	var concurso = []; // Array para armazenar os resultados dos concursos

	dadosOfertaConcurso.forEach(function(item, index) {
		$.ajax({
			url: url_base + "/concursos/" + item.concursoId,
			type: "GET",
			async: false,
		})
			.done(function(data) {
				concurso[index] = data.concurso;
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
			});
	});

	// Chamada do callback passando os resultados dos concursos
	callback(concurso);
}

function getCurso(dadosOfertaConcurso, callback) {
	var curso = []; // Array para armazenar os resultados dos cursos

	dadosOfertaConcurso.forEach(function(item, index) {
		$.ajax({
			url: url_base + "/cursos/" + item.cursoId,
			type: "GET",
			async: false,
		})
			.done(function(data) {
				curso[index] = data.nome;
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
			});
	});

	// Chamada do callback passando os resultados dos cursos
	callback(curso);
}



function getEscola(dadosOfertaConcurso, callback) {
	var escola = []; // Array para armazenar os resultados dos cursos

	dadosOfertaConcurso.forEach(function(item, index) {
		$.ajax({
			url: url_base + "/escolas/" + item.escolaId,
			type: "GET",
			async: false,
		})
			.done(function(data) {
				escola[index] = data.nomeEscola;
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
			});
	});

	// Chamada do callback passando os resultados dos cursos
	callback(escola);
}


function getTurno(dadosOfertaConcurso, callback) {
	var turno = []; // Array para armazenar os resultados dos cursos

	dadosOfertaConcurso.forEach(function(item, index) {
		$.ajax({
			url: url_base + "/turno/" + item.turnoId,
			type: "GET",
			async: false,
		})
			.done(function(data) {
				turno[index] = data.turno;
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
			});
	});

	// Chamada do callback passando os resultados dos cursos
	callback(turno);
}
function getDados() {
	$.ajax({
		url: url_base + "/ofertasConcurso/",
		type: "GET",
		async: false,
	})
		.done(function(data) {

			getEscola(data, function(escolaData) {
				getTurno(data, function(turnoData) {
					getConcurso(data, function(concursoData) {
						getCurso(data, function(cursoData) {

							listarDados(data, concursoData, cursoData, escolaData, turnoData);
						});
					});
				});
			});
			/* getConcurso(data, function(concursoData) {
				 getCurso(data, function(cursoData) {
					 listarDados(data, concursoData, cursoData);
				 });
			 });*/
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});
}


function listarDados(dados, concurso, curso, escola, turno) {
	var html = dados.map(function(item, index) {
		var ativo;

		if (item.ativo == "N") {
			ativo = '<i  style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não';
		} else {
			ativo = "<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim";
		}

		return (
			"<tr>" +
			"<td>" +
			concurso[index] +
			"</td>" +
			"<td>" +
			curso[index] +
			"</td>" +
			"<td>" +
			escola[index] +
			"</td>" +
			"<td>" +
			turno[index] +
			"</td>" +
			"<td>" +
			item.serie +
			"</td>" +
			"<td>" +
			item.descricaoOferta +
			"</td>" +
			"<td>" +
			item.vagas +
			"</td>" +
			"<td>" +
			item.minVagasAbertTurma +
			"</td>" +
			"<td>" +
			ativo +
			"</td>" +
			'<td class="d-flex"><span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-concursoId="' +
			item.concursoId +
			'" data-cursoId="' +
			item.cursoId +
			'" data-escolaId="' +
			item.escolaId +
			'" data-turnoId="' +
			item.turnoId +
			'" data-serie="' +
			item.serie +
			'" data-descricaoOferta="' +
			item.descricaoOferta +
			'" data-vagas="' +
			item.vagas +
			'" data-minVagasAbertTurma="' +
			item.minVagasAbertTurma +
			'" data-id="' +
			item.idOfertaConcurso +
			'" data-ativo="' +
			item.ativo +
			'" onclick="showModal(this)" data-bs-toggle="modal" data-bs-target="#editAto"><i class="fa-solid fa-pen fa-lg"></i></span></td>' +
			"</tr>"
		);



	}).join("");

	$("#cola-tabela").html(html);
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
		})
	return false;
}

function limpaCampo() {
	$('#cadastro-nome').val('');
	$('#cadastro-nome2').val('');
	$("#horaInicio").val('');
	$("#horaFim").val('');
}