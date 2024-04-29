var id = '';

var idEscola = ''
$(document).ready(function() {
	idEscola = getSearchParams("escola");
	id = getSearchParams("id");

	$.ajax({
		url: url_base + '/escolas',
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#escolaId').append($('<option>', {
				value: item.idEscola,
				text: item.nomeEscola,
				name: item.nomeEscola
			}));
		});
	})

	$.ajax({
		url: url_base + '/dependenciaAdministrativa',
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#dependenciaAdmId').append($('<option>', {
				value: item.idDependenciaAdministrativa,
				text: item.dependenciaAdministrativa,
				name: item.dependenciaAdministrativa
			}));
		});
	})

	$.ajax({
		url: url_base + "/disciplina/escola/" + idEscola,
		type: "GET",
		async: false,
	})
		.done(function(data) {

			var ref = data.find((item) => item.idDisciplina == id)

			$('#creditos').val(ref.creditos)
			$('#horasAula').val(ref.horasAula)
			$('#horasLab').val(ref.horasLab)
			$('#horasEstagio').val(ref.horasEstagio)
			$('#horasAtiv').val(ref.horasAtiv)
			$('#nome').val(ref.nome)
			$('#disciplina').val(ref.disciplina)
			
			if (ref.ativo == "S") {
				$(".ativar").hide();
				$(".desativar").show()
			}
			else {
				$(".desativar").hide();
				$(".ativar").show();
			}

			$("#escolaId").val(ref.escolaId).attr('selected', true);
			$("#dependenciaAdmId").val(ref.dependenciaAdmId.idDependenciaAdministrativa).attr('selected', true);
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

});


$("#formEditar").submit(function(e) {
	e.preventDefault();

	var dadosFormulario = {
		idDisciplina: id,
		escolaId: Number($("#escolaId").val()),
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
		url: url_base + '/disciplina',
		type: "PUT",
		data: JSON.stringify(dadosFormulario),
		contentType: "application/json; charset=utf-8",
		error: function(e) {
			console.log(e)
			alert(e.responseJSON.message)
		}
	}).done(function(data) {
		alert('Editado com sucesso!')
		window.location.href = "disciplinas";
	});

});