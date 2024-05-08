$(document).ready(function() {
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
		url: url_base + '/provedorInternet',
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
});

$("#formNovoCadastro").submit(function(e) {
	e.preventDefault();

	var dadosFormulario = {
		escolaId: Number($('#escolaId').val()),
		provedorInternetId: Number($('#provedorInternetId').val()),
		velocidadeMb: Number($('#velocidadeMb').val()),
		administrativo: $('input[name="administrativo"]:checked').val(),
		estudante: $('input[name="estudante"]:checked').val()
	};


	$.ajax({
		url: url_base + '/escolaLinkInternet',
		type: "POST",
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
			title: "Cadastrado com sucesso",
			icon: "success",
		})
		window.location.href = "link-internet";
	});

});