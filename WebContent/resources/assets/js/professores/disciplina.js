var dados = [];
var id = "";
var nome = "";
var rows = 8;
var currentPage = 1;
var pagesToShow = 5;
var valor1 = "";
var valor2 = "";
var professores = [];
var disciplinas = [];
var isAtivo = ''

$(document).ready(function() {
	$.ajax({
		url: url_base + "/professores",
		type: "get",
		async: false,
	}).done(function(data) {
		professores = data;
		$.each(data, function(index, item) {
			$("#selectCadastro").append(
				$("<option>", {
					value: item.idProfessor,
					text: item.pessoa.nome,
					name: item.pessoa.nome,
				})
			);
		});
		$.each(data, function(index, item) {
			$("#selectEdit").append(
				$("<option>", {
					value: item.idProfessor,
					text: item.pessoa.nome,
					name: item.pessoa.nome,
				})
			);
		});
	});

	$.ajax({
		url: url_base + "/disciplina",
		type: "get",
		async: false,
	}).done(function(data) {
		disciplinas = data;
		$.each(data, function(index, item) {
			$("#selectCadastro2").append(
				$("<option>", {
					value: item.idDisciplina,
					text: item.nome,
					name: item.nome,
				})
			);
		});
		$.each(data, function(index, item) {
			$("#selectEdit2").append(
				$("<option>", {
					value: item.idDisciplina,
					text: item.nome,
					name: item.nome,
				})
			);
		});
	});

	getDados();

	$("#inputBusca").on("keyup", function() {
		var valorBusca = $(this).val().toLowerCase();

		if (valorBusca === "") {
			busca();
			$("#cola-tabela tr").show();
		} else {
			$("#cola-tabela tr")
				.hide()
				.filter(function() {
					return $(this).text().toLowerCase().indexOf(valorBusca) > -1;
				})
				.show();
		}
	});

	$("#inputBusca").on("input", function() {
		var valorBusca = $(this).val().toLowerCase();
		realizarBusca(valorBusca);
	});

	function realizarBusca(valorInput) {
		if (valorInput === "") {
			showPage(currentPage);
		} else {
			$("#cola-tabela tr")
				.hide()
				.filter(function() {
					return $(this).text().toLowerCase().indexOf(valorInput) > -1;
				})
				.show();
		}
	}

	showPage(currentPage);
	updatePagination();
});

function getDados() {
	$.ajax({
		url: url_base + "/professorDisciplina",
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
	var html = dados
		.map(function(item) {
			var professor = professores.find(function(school) {
				return school.idProfessor === item.professorId;
			});

			var nome = professor ? professor.pessoa.nome : "professor não encontrado";

			var disciplina = disciplinas.find(function(school) {
				return school.idDisciplina === item.disciplinaId;
			});

			var nome2 = disciplina ? disciplina.nome : "Disciplina não encontrada";

			if (item.ativo == "N") {
				ativo =
					'<i  style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não';
			} else {
				ativo =
					"<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim";
			}

			return (
				"<tr>" +
				"<td>" +
				nome +
				"</td>" +
				"<td>" +
				nome2 +
				"</td>" +
				"<td>" +
				ativo +
				"</td>" +
				'<td class="d-flex"><span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-id="' +
				item.idProfessorDisciplina +
				'" data-nome="' +
				item.professorId +
				'" data-nome2="' +
				item.disciplinaId +
				'" data-ativo="' +
				item.ativo +
				'" onclick="showModal(this)" data-bs-toggle="modal" data-bs-target="#editAto"><i class="fa-solid fa-pen fa-lg"></i></span></td>' +
				"</tr>"
			);
		})
		.join("");

	$("#cola-tabela").html(html); $('input[data-toggle="toggle"]').bootstrapToggle();
}

function showModal(ref) {
	id = ref.getAttribute("data-id");
	valor1 = ref.getAttribute("data-nome");
	valor2 = ref.getAttribute("data-nome2");

	isAtivo = ref.getAttribute("data-ativo");

	if (isAtivo == "S") {
		$(".ativar").hide();
		$(".desativar").show();
	} else {
		$(".desativar").hide();
		$(".ativar").show();
	}

	$("#selectEdit").val(valor1).attr("selected", true);
	$("#selectEdit2").val(valor2).attr("selected", true);
}

function editar() {
	var objeto = {
		idProfessorDisciplina: id,
		professorId: $("#selectEdit").val(),
		disciplinaId: $("#selectEdit2").val(),
	};

	$.ajax({
		url: url_base + "/professorDisciplina",
		type: "PUT",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(e.responseJSON.message);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
			});
		},
	}).done(function(data) {
		$("#selectEdit2").val("");
		$("#selectEdit").val("");
		getDados();
		showPage(currentPage);
		updatePagination();
		Swal.fire({
			title: "Editado com sucesso",
			icon: "success",
		})
	});
	return false;
}
$("#formEdit").on("submit", function(e) {
	e.preventDefault();
	editar();
	return false;
});
$("#formCadastro").on("submit", function(e) {
	e.preventDefault();
	cadastrar();
	return false;
});

function cadastrar() {
	var objeto = {
		professorId: $("#selectCadastro").val(),
		disciplinaId: $("#selectCadastro2").val(),
	};

	$.ajax({
		url: url_base + "/professorDisciplina",
		type: "POST",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(e.responseJSON.message);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
			});
		},
	}).done(function(data) {
		$("#selectCadastro").val("");
		$("#selectCadastro2").val("");
		getDados();
		showPage(currentPage);
		updatePagination();
		showPage(currentPage);
		Swal.fire({
			title: "Cadastrado com sucesso",
			icon: "success",
		})
	});
	return false;
}

function limpaCampo() {
	$("#selectCadastro").val("");
	$("#selectCadastro2").val("");
}
