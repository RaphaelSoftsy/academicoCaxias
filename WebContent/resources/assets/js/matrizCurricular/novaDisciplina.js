var idEscola = localStorage.getItem("escolaId");
var pefilEscola = localStorage.getItem("perfil")
var escola = JSON.parse(pefilEscola)
const contaId = Number(localStorage.getItem('contaId'))


$(document).ready(function() {
	$('select').select2();
	/*$.ajax({
		url: url_base + "/escolas",
		type: "get",
		async: false,
	}).done(function(data) {
		
		});
		});*/


	$.ajax({
		url: url_base + "/areaConhecimento/conta/" + contaId,
		type: "GET",
		async: false,
	})
		.done(function(data) {
			$.each(data, function(index, item) {
				$("#areaConhecimentoId").append(
					$("<option>", {
						value: item.idAreaConhecimento,
						text: item.areaConhecimento,
						name: item.areaConhecimento,
					})
				);
			})
			$('select').select2();
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});


})

$("#formNovoCadastro").submit(function(e) {
	e.preventDefault();

	var dadosFormulario = {
		"contaId": contaId,
		"areaConhecimentoId": $("#areaConhecimentoId").val(),
		"codDiscip": $("#disciplina").val(),
		"nome": $("#nome").val(),
		"creditos": null,
		"horasAula": null,
		"horasLab": null,
		"horasEstagio": null,
		"horasAtiv": null,
		"horasAno": Number($("#horasAnual").val()), // Converter para número
		"horasSemanal": Number($("#horasSemanal").val()) // Converter para número
	};
	
	console.log(dadosFormulario)

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

