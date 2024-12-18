var dados = [];
const contaId = localStorage.getItem("contaId");
var nome = "";
var nome2 = "";
var nome3 = "";
var rows = 8;
var currentPage = 1;
var pagesToShow = 5;
let descricao = "";
let id = "";
let idProva = null;
let idProvaSelecionado = "";
let url = "";
var listaAvaliacao;
let idDisciplina;
let idEscola;
const idTurma = params.get("turma");
let turma = null

function formatarPeriodo(tipoPeriodicidade) {
	if (tipoPeriodicidade == "A") {
		return "Anual"
	} else if (tipoPeriodicidade == "B") {
		return "Bimestral"
	} else if (tipoPeriodicidade == "T") {
		return "Trimestral"
	} else if (tipoPeriodicidade == "S") {
		return "Semestral"
	}

}

$(document).ready(function() {
	var ano = document.getElementById("ano");
	var anoAtual = new Date().getFullYear();

	var anosRetroativos = anoAtual - 2000;
	var anosFuturos = 10;

	var anoInicial = anoAtual + anosFuturos;
	var anoFinal = anoAtual - anosRetroativos;

	for (var i = anoInicial; i >= anoFinal; i--) {
		var option = document.createElement("option");
		option.value = i;
		option.text = i;
		ano.appendChild(option);
	}
	
	$("#btn-save").hide();
	$(".container-table").hide();
	$(
		"#escolaIdDisable, #disciplinaId, #turno, #turmaId, #ano, #periodo"
	).prop("disabled", true);

	$.ajax({
		url: url_base + "/escolas/conta/" + contaId,
		type: "GET",
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#escolaId").append(
				$("<option>", {
					value: item.idEscola,
					text: item.nomeEscola,
				})
			);
		});
	});

	$.ajax({
		url: url_base + "/anos",
		type: "GET",
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#ano").append(
				$("<option>", {
					value: item.idAno,
					text: item.anoEscolar,
				})
			);
		});
	});

	$.ajax({
		url: url_base + "/periodoletivo/conta/" + contaId,
		type: "GET",
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#periodo").append(
				$("<option>", {
					value: item.idPeriodoLetivo,
					text: item.ano + '/' + item.periodo + " - " + formatarPeriodo(item.tipoPeriodicidade) + " - " + item.descricao,
				})
			);
		});
	});



	$.ajax({
		url: url_base + "/turno/conta/" + contaId,
		type: "GET",
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#turno").append(
				$("<option>", {
					value: item.idTurno,
					text: item.turno,
				})
			);
		});
	});

	$.ajax({
		url: url_base + "/turma",
		type: "GET",
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#turmaId").append(
				$("<option>", {
					value: item.idTurma,
					text: item.nomeTurma + " - " + item.gradeCurricular.disciplina.nome,
				})
			);
		});
	});

	$.ajax({
		url: url_base + "/disciplina/conta/" + contaId,
		type: "GET",
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#disciplinaId").append(
				$("<option>", {
					value: item.idDisciplina,
					text: `${item.codDiscip} - ${item.nome}`,
				})
			);
		});
	});


	$("#escolaId, #disciplinaId, #turno, #turmaId, #ano, #periodo").select2();
	$("#turmaId").select2();

	if (idTurma != undefined) {
		$.ajax({
			url: url_base + "/turma/" + idTurma,
			type: "GET",
		}).done(function(data) {
			$('#turno').val(data.turno.idTurno)
			$('#disciplinaId').val(data.gradeCurricular.disciplina.idDisciplina)
			$('#turmaId').val(idTurma)
			$('#periodo').val(data.periodoLetivo.idPeriodoLetivo)
			$('#ano').val(data.periodoLetivo.ano)
			$('#escolaId').val(data.escola.idEscola)

			$("#escolaId, #disciplinaId, #turno, #turmaId, #ano, #periodo").prop("disabled", true);
			$('select').select2();
			
			buscar()
		});
	}

	$("#escolaId, #disciplinaId, #turno, #turmaId, #ano, #periodo").select2();
});

$("#ano").change(() => {
	$("#periodo").prop("disabled", false).val(null).trigger("change");
	$("#turno, #turmaId, #disciplinaId")
		.prop("disabled", true)
		.val(null)
		.trigger("change");

	$("#turno, #turmaId, #disciplinaId").prop("disabled", true);
});

$("#escolaId").change(() => {
	$("#ano").prop("disabled", false).val(null).trigger("change");

	$("#periodo, #turno, #turmaId, #disciplinaId")
		.prop("disabled", true)
		.val(null)
		.trigger("change");

	$("#disciplinaId, #turno, #turmaId, #periodo").prop("disabled", true);
});

$("#periodo").change(() => {
	$("#turno").prop("disabled", false).val(null).trigger("change");
	$("#turmaId, #disciplinaId")
		.prop("disabled", true)
		.val(null)
		.trigger("change");

	$("#turmaId, #disciplinaId").prop("disabled", true);
});


$("#turno").change(() => {
	$("#turmaId").prop("disabled", false).val(null).trigger("change");
	$("#disciplinaId").prop("disabled", true).val(null).trigger("change");
});

$("#turmaId").change(() => {
	$("#disciplinaId").prop("disabled", false).val(null).trigger("change");
});

const adicionarAvaliacao = () => {
	alert('Criar avaliação')
}

const buscar = () => {
	$("#messageInfo").hide();
	$(".container-table").show();
	$("#btn-save").show();

	$.ajax({
		url: url_base + "/prova",
		type: "GET",
	}).done(function(data) {
		listaAvaliacao = data
		listarDados(data)
		$('input[data-toggle="toggle"]').bootstrapToggle();
	});
}

function formatarDataParaBR(data) {
	var dataObj = new Date(data);

	var dia = String(dataObj.getUTCDate()).padStart(2, "0");
	var mes = String(dataObj.getUTCMonth() + 1).padStart(2, "0");
	var ano = dataObj.getUTCFullYear();
	return dia + "/" + mes + "/" + ano;
}

const listarDados = (dados) => {
	var html = dados
		.map(function(item) {

			let simulado;

			if (item.ehSimulado == "N") {
				simulado =
					'<i style="color:#ff1f00; font-size: 28px" class="fa-regular fa-circle-xmark"></i>';
			} else {
				simulado =
					"<i style='color:#2eaa3a; font-size: 28px' class='fa-regular fa-circle-check'></i>";
			}

			let colorBtn = 'btn-warning'

			if (idProvaSelecionado == item.idProva) {
				colorBtn = 'btn-primary'
			}

			return (
				"<tr>" +
				'<td class="d-flex justify-content-center"><span style="width: 50%; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn ' + colorBtn + ' btn-sm" data-id="' +
				item.idProva +
				'"onclick="selecionar(this)"><i class="fa-solid fa-right-to-bracket fa-lg"></i></span></td>' +
				"<td>" +
				item.nomeAbreviado +
				"</td>" +
				"<td>" +
				item.descricao +
				"</td>" +
				'<td class="text-center align-middle">' +
				simulado +
				"</td>" +
				"<td>" +
				formatarDataParaBR(item.dataDivulgacao) +
				"</td>" +
				"<td>" +
				formatarDataParaBR(item.dataAgendaProva) +
				"</td>" +
				"<td>" +
				'<input type="checkbox" data-status="' +
				item.ativo +
				'" data-id="' +
				item.idProva +
				' " onChange="alteraStatus(this)" ' +
				`${item.ativo === "S" ? "checked" : ""}` +
				' data-toggle="toggle" data-onstyle="success" data-offstyle="danger" data-on="Sim" data-off="Não" data-width="63" class="checkbox-toggle" data-size="sm">' +
				"</td>" +
				"</tr>"
			);
		})
		.join("");

	$("#cola-tabela-professor").html(html);
}

const selecionar = (element) => {
	idProvaSelecionado = element.getAttribute("data-id")
	listarDados(listaAvaliacao)
	$('input[data-toggle="toggle"]').bootstrapToggle();
	/*getTurmas()*/
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
		url: url_base + `/prova/${id}${status === "S" ? "/desativar" : "/ativar"}`,
		type: "put",
		error: function(e) {
			Swal.close();
			console.log(e.responseJSON);
			Swal.fire({
				icon: "error",
				title: e.responseJSON.message,
			});
		},
	}).then((data) => {
	});
}


$("#formBuscar").submit(function(e) {
	e.preventDefault();

	buscar()
});
