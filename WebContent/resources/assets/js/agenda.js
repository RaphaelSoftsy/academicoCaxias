var dados = [];
var sortOrder = {};
var dadosOriginais = [];
var rows = 7;
var currentPage = 1;
var pagesToShow = 5;
var id = '';
var dataAgenda = '';
var horaInicio = '';
var horaFim = '';
var realizada = '';
var tituloAula = '';
var resumoAula = '';
var turmaId = '';
const contaId = localStorage.getItem('contaId')

$(document).ready(function() {

	getDados()


	$.ajax({
		url: url_base + "/agendas",
		type: "GET",
		async: false,
	})
		.done(function(data) {
			turmas = data;
			$.each(data, function(index, item) {
				$('#agendaIdEdit').append($('<option>', {
					value: item.idAgenda,
					text: item.tituloAula,
					name: item.tituloAula
				}));
			});
			$.each(data, function(index, item) {
				$('#agendaId').append($('<option>', {
					value: item.idAgenda,
					text: item.tituloAula,
					name: item.tituloAula
				}));
			});
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown, jqXHR);
		});


	$.ajax({
		url: url_base + "/turma",
		type: "GET",
		async: false,
	})
		.done(function(data) {
			turmas = data;
			$.each(data, function(index, item) {
				$('#turmaIdEdit').append($('<option>', {
					value: item.idTurma,
					text: item.nomeTurma,
					name: item.nomeTurma
				}));
			});
			$.each(data, function(index, item) {
				$('#turmaId').append($('<option>', {
					value: item.idTurma,
					text: item.nomeTurma,
					name: item.nomeTurma
				}));
			});
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown, jqXHR);
		});


	// Dropdown de Pesquisa
	$('.dropdown-toggle-form').click(function() {
		$(this).siblings('.dropdown-content-form').toggleClass('show');
	});

	$('.searchButton').click(function() {
		var searchInput = $(this).siblings('.searchInput').val().toLowerCase();
		var columnToSearch = $(this).closest('.sortable').data('column');
		var filteredData;


		filteredData = dadosOriginais.filter(function(item) {
			return item[columnToSearch].toString().toLowerCase().includes(searchInput);
		});


		listarDados(filteredData);
		$('input[data-toggle="toggle"]').bootstrapToggle();

		$(this).siblings('.searchInput').val('');
		$(this).closest('.dropdown-content-form').removeClass('show');
	});

	$(document).on('click', '.sortable .col', function() {
		var column = $(this).closest('th').data("column");
		var currentOrder = sortOrder[column] || 'vazio';
		var newOrder;

		if (currentOrder === 'vazio') {
			newOrder = 'asc';
		} else if (currentOrder === 'asc') {
			newOrder = 'desc';
		} else {
			newOrder = 'vazio';
		}

		$(".sortable span").removeClass("asc desc");
		$(this).find('span').addClass(newOrder);

		var icon = $(this).find("i");
		icon.removeClass("fa-sort-up fa-sort-down fa-sort");

		if (newOrder === 'asc') {
			icon.addClass("fa-sort-up");
			sortData(column, newOrder);
		} else if (newOrder === 'desc') {
			icon.addClass("fa-sort-down");
			sortData(column, newOrder);
		} else {
			icon.addClass("fa-sort");
			listarDados(dadosOriginais);
		}

		sortOrder[column] = newOrder;
	});

	function sortData(column, order) {
		var dadosOrdenados = dadosOriginais.slice();

		dadosOrdenados.sort(function(a, b) {
			if (column === 'turmaId') {
				var turmaA = turmas.find(function(school) {
					return school.idTurma === a.turmaId;
				});
				var turmaB = turmas.find(function(school) {
					return school.idTurma === b.turmaId;
				});
				var nomeTurmaA = turmaA ? turmaA.numTurma.toLowerCase() : "";
				var nomeTurmaB = turmaB ? turmaB.numTurma.toLowerCase() : "";
				if (order === 'asc') {
					return nomeTurmaA.localeCompare(nomeTurmaB);
				} else {
					return nomeTurmaB.localeCompare(nomeTurmaA);
				}
			} else if (column === 'horaInicio' || column === 'horaFim') {
				var timeA = a[column].split(':').reduce((acc, val, i) => acc + val * Math.pow(60, -i), 0);
				var timeB = b[column].split(':').reduce((acc, val, i) => acc + val * Math.pow(60, -i), 0);
				if (order === 'asc') {
					return timeA - timeB;
				} else {
					return timeB - timeA;
				}
			} else {
				var valueA = a[column].toString().toLowerCase();
				var valueB = b[column].toString().toLowerCase();
				if (order === 'asc') {
					return valueA.localeCompare(valueB);
				} else {
					return valueB.localeCompare(valueA);
				}
			}

		});
		listarDados(dadosOrdenados);

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

$('#limpa-filtros').click(function() {
	listarDados(dadosOriginais);
	$('input[data-toggle="toggle"]').bootstrapToggle();
	$('.searchInput').val('');
});

function getDados() {

	$.ajax({

		url: url_base + "/agendas",
		type: "GET",
		async: false,
	})
		.done(function(data) {
			dados = data
			dadosOriginais = data;
			listarDados(data);
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});
}



function formatarHoraParaAMPM(hora) {
	if (!hora) {
		console.error('Hora não está definida ou é inválida:', hora);
		return ''; // Ou algum valor padrão, como "00:00 AM"
	}

	let [horas, minutos, segundos] = hora.split(':');
	horas = parseInt(horas, 10);
	const periodo = horas >= 12 ? 'PM' : 'AM';
	horas = horas % 12 || 12;
	return `${('0' + horas).slice(-2)}:${minutos} ${periodo}`;
}


function listarDados(dados) {
	var html = dados.map(function(item) {



		const dataAgenda = item.dataAgenda

		const horaInicioFormatada = formatarHoraParaAMPM(item.horaInicio)
		const horaFimFormatada = formatarHoraParaAMPM(item.horaFim)
		const realizada = item.realizada === "S" ? "Sim" : "Não"
		// Dividir a string nos componentes ano, mês e dia
		const [ano, mes, dia] = dataAgenda.split('-');

		// Formatar a data no formato "dd/mm/aaaa"
		const dataFormatada = `${dia}/${mes}/${ano}`;

		console.log(dataFormatada); // Saída: "01/01/2024"

		return (
			"<tr>" +
			"<td>" +
			item.turma.nomeTurma +
			"</td>" +
			"<td>" +
			dataFormatada +
			"</td>" +
			"<td>" +
			horaInicioFormatada +
			"</td>" +
			"<td>" +
			horaFimFormatada +
			"</td>" +
			"<td>" +
			item.tituloAula +
			"</td>" +
			"<td>" +
			item.resumoAula +
			"</td>" +
			"<td>" +
			realizada +
			"</td>" +
			"<td><div class='d-flex align-items-center gap-1'>" +
			'<input type="checkbox" data-status="' +
			item.ativo +
			'" data-id="' +
			item.idAgenda +
			' " onChange="alteraStatus(this)" checked data-toggle="toggle" data-onstyle="success" data-offstyle="danger" data-on="Sim" data-off="Não" data-width="63" class="checkbox-toggle" data-size="sm">' +
			"</div></td>" +
			'<td style="display:flex "><span style=" margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm"' +
			' data-id="' +
			item.idAgenda +
			'" data-turmaId="' +
			item.turmaId +
			'" data-horaInicioFormatada="' +
			item.horaInicio +
			'" data-horaFimFormatada="' +
			item.horaFim +
			'" data-realizada="' +
			item.realizada +
			'" data-tituloAula="' +
			item.tituloAula +
			'" data-resumoAula="' +
			item.resumoAula +
			'" data-dataAgenda="' +
			item.dataAgenda +
			'" data-realizada="' +
			realizada +
			'" onclick="showModal(this)" data-bs-toggle="modal" data-bs-target="#editItem"><i class="fa-solid fa-pen fa-lg"></i></span>' +
			'<span style=" margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-primary btn-sm"' +
			' data-id="' +
			item.idAgenda +
			'" onclick="showModalAnexo(this)" data-bs-toggle="modal" data-bs-target="#anexoAgenda"><i class="fa-solid fa-file-lines"></span>' +
			"</td> </tr>"
		);
	}).join("");

	// Reaplicar a estilização do toggle
	$('input[data-toggle="toggle"]').bootstrapToggle();
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
		url: url_base + `/agendas/${id}${status === "S" ? '/desativar' : '/ativar'}`,
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
		window.location.href = 'agenda'
	})
}


// Exportar Dados

$('#exportar-excel').click(function() {

	var planilha = XLSX.utils.json_to_sheet(dados);

	var livro = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(livro, planilha, "Planilha1");

	XLSX.writeFile(livro, "diasSemana.xlsx");
});


// Abrir modal

function showModal(ref) {
	id = ref.getAttribute("data-id");
	turmaId = ref.getAttribute("data-turmaId")
	horaInicio = ref.getAttribute("data-horaInicioFormatada");
	horaFim = ref.getAttribute("data-horaFimFormatada");
	tituloAula = ref.getAttribute("data-tituloAula");
	resumoAula = ref.getAttribute("data-resumoAula");
	dataAgenda = ref.getAttribute("data-dataAgenda");
	realizada = ref.getAttribute("data-realizada");

	$("#turmaIdEdit").val(turmaId)
	$("#dataAgendaEdit").val(dataAgenda);
	$("#tituloAulaEdit").val(tituloAula);
	$("#horaIniEdit").val(horaInicio);
	$("#horaFimEdit").val(horaFim);
	$("#resumoEdit").val(resumoAula);

	if (realizada == "S") {
		$('#isRealizadaEdit').attr('checked', true)
	} else {
		$('#isRealizadaEdit').attr('checked', false)
	}

}


function showModalAnexo(ref) {
	limpaCampo()
	id = ref.getAttribute("data-id");

	$("#agendaId").val(id)

}

function formatarDataParaAPI(data) {
	// Usar UTC para evitar problemas de fuso horário
	var year = data.getUTCFullYear();
	var month = ('0' + (data.getUTCMonth() + 1)).slice(-2);
	var day = ('0' + data.getUTCDate()).slice(-2);

	return year + '-' + month + '-' + day;
}


// Editar

function editar() {

	const dataFeriado = new Date($("#dataFeriadoEdit").val())

	const dataFormatada = formatarDataParaAPI(dataFeriado)

	var objeto = {
		"idAgenda": id,
		"turmaId": $("#turmaIdEdit").val(),
		"dataAgenda": $("#dataAgendaEdit").val(),
		"horaInicio": $("#horaIniEdit").val(),
		"horaFim": $("#horaFimEdit").val(),
		"realizada": getAswer("#isRealizadaEdit"),
		"tituloAula": $("#tituloAulaEdit").val(),
		"resumoAula": $("#resumoEdit").val()
	}

	console.log(objeto)

	$.ajax({
		url: url_base + "/agendas",
		type: "PUT",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(e.responseJSON);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
			});
		}
	})
		.done(function(data) {
			$("#dataFeriadoEdit").val('');
			$("#descricaoEdit").val('');

			getDados();
			showPage(currentPage);
			updatePagination();
			Swal.fire({
				title: "Editado com sucesso",
				icon: "success",
			}).then(() => {
				window.location.href = "agenda"
			})
		});

	return false;
}

$('#formEdit').on('submit', function(e) {
	e.preventDefault();
	editar();
	return false;
});

function getAswer(input) {

	if ($(input).is(':checked')) {
		return 'S'
	} else {
		return 'N'
	}

}

// Cadastrar


function cadastrar() {

	const dataAgenda = new Date($("#dataAgenda").val())

	const dataFormatada = formatarDataParaAPI(dataAgenda)

	var objeto = {
		"turmaId": $("#turmaId").val(),
		"dataAgenda": dataFormatada,
		"horaInicio": $("#horaIni").val(),
		"horaFim": $("#horaFim").val(),
		"realizada": getAswer("#isRealizada"),
		"tituloAula": $("#tituloAula").val(),
		"resumoAula": $("#resumo").val()
	};
	console.log(objeto)

	$.ajax({
		url: url_base + "/agendas",
		type: "POST",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(e.responseJSON);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
			});
		}
	})
		.done(function() {
			getDados();
			showPage(currentPage);
			updatePagination();
			Swal.fire({
				title: "Cadastrado com sucesso",
				icon: "success",
			}).then(() => {
				window.location.href = "agenda"
			})
		});
	return false;
}


function cadastrarAnexo() {
	function convertToBase64(file, callback) {
		var reader = new FileReader();
		reader.onload = function(event) {
			callback(event.target.result);
		};
		reader.readAsDataURL(file);
	}

	let anexoAgendaFile = $('#anexoAgendaInput')[0].files[0];
	convertToBase64(anexoAgendaFile, function(base64String) {
		// Pegue apenas a parte base64 da string
		var base64Data = base64String.split(',')[1];

		var dadosFormulario = {
			agendaId: $("#agendaId").val(),
			caminhoArquivo: base64Data  // Envie a string base64 diretamente
		};

		console.log(dadosFormulario);

		$.ajax({
			url: url_base + '/agendaAnexo',
			type: "POST",
			data: JSON.stringify(dadosFormulario),
			contentType: "application/json; charset=utf-8",
			error: function(e) {
				console.log(e);
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Não foi possível cadastrar a escola!",
				});
			}
		}).done(function(data) {
			Swal.fire({
				title: "Anexo cadastrado com sucesso",
				icon: "success",
			});
			window.location.href = "agenda";
		});
	});
}


$('#formCadastro').on('submit', function(e) {
	e.preventDefault();
	cadastrar();
	return false;
});


$('#formCadastroAnexo').on('submit', function(e) {
	e.preventDefault();
	cadastrarAnexo();
	return false;
});

// Limpa input

function limpaCampo() {
	$("#descricao").val('');
	$("#anexoAgendaInput").val('');
}
