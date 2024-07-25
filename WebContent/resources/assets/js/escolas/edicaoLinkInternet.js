var id = '';
var idItem = ''
const contaId = Number(localStorage.getItem('contaId'))
var idEscola = localStorage.getItem("escolaId");
var pefilEscola = localStorage.getItem("perfil")
var escola = JSON.parse(pefilEscola)
var nomeEscola = escola.nome


$(document).ready(function() {
	idItem = getSearchParams("id");

	$.ajax({
		url: url_base + `/escolas/conta/${contaId}`,
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
		url: url_base + `/provedorInternet/conta/${contaId}`,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#provedorInternetId').append($('<option>', {
				value: item.idProvedorInternet,
				text: item.provedorInternet,
				name: item.provedorInternet
			}));
		});
	})

	$.ajax({
		url: url_base + "/escolaLinkInternet/escola/" + idItem,
		type: "GET",
		async: false,
	})
		.done(function(data) {
			const ref = data[0]
			
			id = ref.idEscolaLinkInternet

			$('#velocidadeMb').val(ref.velocidadeMb)
			
			if (ref.ativo == "S") {
				$(".ativar").hide();
				$(".desativar").show()
			}
			else {
				$(".desativar").hide();
				$(".ativar").show();
			}

			if (ref.administrativo === 'S') {
				$('input[id="administrativoS"]').prop('checked', true)
			} else {
				$('input[id="administrativoN"]').prop('checked', true)
			}

			if (ref.estudante === 'S') {
				$('input[id="estudanteS"]').prop('checked', true)
			} else {
				$('input[id="estudanteN"]').prop('checked', true)
			}

			$("#escolaId").val(ref.escolaId).attr('selected', true);
			$("#provedorInternetId").val(ref.provedorInternet.idProvedorInternet).attr('selected', true);
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

});


$("#formEditar").submit(function(e) {
	e.preventDefault();

	var dadosFormulario = {
		idEscolaLinkInternet: id,
		escolaId: Number($('#escolaId').val()),
		provedorInternetId: Number($('#provedorInternetId').val()),
		velocidadeMb: Number($('#velocidadeMb').val()),
		administrativo: $('input[name="administrativo"]:checked').val(),
		estudante: $('input[name="estudante"]:checked').val()
	};


	$.ajax({
		url: url_base + '/escolaLinkInternet',
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
		window.location.href = "escola-internet";
	});

});
