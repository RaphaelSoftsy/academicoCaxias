var idEscola = localStorage.getItem("escolaId");
var pefilEscola = localStorage.getItem("perfil")
var escola = JSON.parse(pefilEscola)
var nomeEscola = escola.nome

$(document).ready(function() {
	$.ajax({
		url: url_base + "/escolas",
		type: "get",
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
	});

	$.ajax({
		url: url_base + "/dependenciaAdministrativa",
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#dependenciaAdmId").append(
				$("<option>", {
					value: item.idDependenciaAdministrativa,
					text: item.dependenciaAdministrativa,
					name: item.dependenciaAdministrativa,
				})
			);
		});
	});
});

$("#formNovoCadastro").submit(function(e) {
	e.preventDefault();

	var dadosFormulario = {
		escolaId: Number(idEscola),
		dependenciaAdmId: Number($("#dependenciaAdmId").val()),
		creditos: Number($("#creditos").val()),
		horasAula: Number($("#horasAula").val()),
		horasLab: Number($("#horasLab").val()),
		horasEstagio: Number($("#horasEstagio").val()),
		horasAtiv: Number($("#horasAtiv").val()),
		disciplina: $("#disciplina").val(),
		nome: $("#nome").val()
	};

	$.ajax({
		url: url_base + "/disciplina",
		type: "POST",
		data: JSON.stringify(dadosFormulario),
		contentType: "application/json; charset=utf-8",
		error: function(e) {
			console.log(e);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
			});
		},
	}).done(function(data) {
		Swal.fire({
				title: "Cadastrado com sucesso",
				icon: "success",
			})
		window.location.href = "disciplinas";
	});
});
