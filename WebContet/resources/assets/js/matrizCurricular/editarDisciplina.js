var id = '';
var areaConhecimento = ''
const contaId = sessionStorage.getItem('contaId')

var idEscola = ''
$(document).ready(function() {

	$(".desativar").toggleClass("btn-secondary btn-danger")
	$(".ativar").toggleClass("btn-secondary btn-success")
	/*	idEscola = getSearchParams("escola");*/
	id = getSearchParams("id");
	areaConhecimento = getSearchParams("areaConhecimento")

	console.log(areaConhecimento)

	$.ajax({
		url: url_base + '/areaConhecimento/',
		type: "get",
		async: false,
	}).done(function(data) {

		var refAreaConhecimento = data.find((item) => item.idAreaConhecimento == areaConhecimento)

		console.log(refAreaConhecimento.areaConhecimento)

		$.each(data, function(index, item) {
			$('#areaConhecimentoId').append($('<option>', {
				value: item.idAreaConhecimento,
				text: item.areaConhecimento,
				name: item.areaConhecimento
			}));
		});


		$("#areaConhecimentoId").val(refAreaConhecimento.idAreaConhecimento)
	})


	$.ajax({
		url: url_base + "/disciplina/conta/" + contaId,
		type: "GET",
		async: false,
	})
		.done(function(data) {

			var ref = data.find((item) => item.idDisciplina == id)
			$('#horasSemanal').val(ref.horasSemanal)
			$('#horasAno').val(ref.horasAno)
			$('#nome').val(ref.nome)
			$('#disciplina').val(ref.codDiscip)

			if (ref.ativo == "S") {
				$(".ativar").hide();
				$(".desativar").show()
			}
			else {
				$(".desativar").hide();
				$(".ativar").show();
			}




		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

});


$("#formEditar").submit(function(e) {
	e.preventDefault();

	var dadosFormulario = {
		idDisciplina: id,
		contaId: Number(contaId),
		areaConhecimentoId: Number(areaConhecimento),
		creditos: null,
		horasAula: null,
		horasLab: null,
		horasEstagio: null,
		horasAtiv: null,
		codDiscip: $("#disciplina").val(),
		nome: $("#nome").val(),
		horasAno: $("#horasAno").val(),
		horasSemanal: $("#horasSemanal").val()
	};

	$.ajax({
		url: url_base + '/disciplina',
		type: "PUT",
		data: JSON.stringify(dadosFormulario),
		contentType: "application/json; charset=utf-8",
		error: function(e) {
			console.log(e)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
			});
		}
	}).done(function(data) {
		Swal.fire({
			title: "Editado com sucesso",
			icon: "success",
		})
		window.location.href = "disciplinas";
	});

});