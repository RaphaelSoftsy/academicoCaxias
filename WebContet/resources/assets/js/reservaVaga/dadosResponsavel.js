const contaId = sessionStorage.getItem('contaId')
const idCandidadto = localStorage.getItem("idCandidato")


$(document).ready(function() {


	if ($('input[id="qualPreencher"]').is(':checked')) {
		$("#certidaoCasamento").hide()
		$("#certidaoNascimento").show()
	} else {
		$("#certidaoNascimento").hide()
		$("#certidaoCasamento").show()
	}


	$.ajax({
		url: url_base + '/papelPessoa/conta/' + contaId,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#relacionamentoId').append($('<option>', {
				value: item.idPapelPessoa,
				text: item.papelPessoa,
				name: item.papelPessoa
			}));
		});
	})

	$.ajax({
		url: url_base + '/raca',
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#racaId').append($('<option>', {
				value: item.idRaca,
				text: item.raca,
				name: item.raca
			}));
		});
	})

	$.ajax({
		url: url_base + '/paises',
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#paisNascimentoId').append($('<option>', {
				value: item.idPais,
				text: item.nomePais,
				name: item.nomePais
			}));
			$('#nacionalidadeId').append($('<option>', {
				value: item.idPais,
				text: item.codigoIso,
				name: item.codigoIso
			}));
		});
		$.each(data, function(index, item) {
			$('#paisResidenciaId').append($('<option>', {
				value: item.idPais,
				text: item.nomePais,
				name: item.nomePais
			}));
		});

	})

	$.ajax({
		url: url_base + '/uf',
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#ufNascimentoId').append($('<option>', {
				value: item.idUf,
				text: item.codUf,
				name: item.codUf
			}));

			$('#rgUfEmissorId').append($('<option>', {
				value: item.idUf,
				text: item.codUf,
				name: item.codUf
			}));

			$('#rneUfEmissorId').append($('<option>', {
				value: item.idUf,
				text: item.codUf,
				name: item.codUf
			}));

			$('#certidaoNascimentoUfCartorioId').append($('<option>', {
				value: item.idUf,
				text: item.codUf,
				name: item.codUf
			}));

			$('#certidaoCasamentoUfCartorioId').append($('<option>', {
				value: item.idUf,
				text: item.codUf,
				name: item.codUf
			}));
		});
	})

	$.ajax({
		url: url_base + '/municipio',
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#municipioNascimentoId').append($('<option>', {
				value: item.idMunicipio,
				text: item.nomeMunicipio,
				name: item.nomeMunicipio
			}));
		});
	})

	$("#cep").blur(function() {
		$.ajax({
			url: 'https://viacep.com.br/ws/' + $('#cep').val().replace(/[^\d]+/g, '') + '/json/',
			type: "GET",
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
			$("#endereco").val(data.logradouro);
			$("#bairro").val(data.bairro);
			$("#municipio").val(data.localidade);
			$("#uf").val(data.uf);
		});

	});
})


function cpfValido(cpf) {
	cpf = cpf.replace(/[^\d]+/g, '');

	if (cpf.length != 11)
		return false;

	var soma = 0;
	var resto;
	for (var i = 1; i <= 9; i++) {
		soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
	}
	resto = (soma * 10) % 11;

	if ((resto == 10) || (resto == 11)) {
		resto = 0;
	}

	if (resto != parseInt(cpf.substring(9, 10))) {
		return false;
	}

	soma = 0;
	for (var i = 1; i <= 10; i++) {
		soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
	}
	resto = (soma * 10) % 11;

	if ((resto == 10) || (resto == 11)) {
		resto = 0;
	}

	if (resto != parseInt(cpf.substring(10, 11))) {
		return false;
	}

	return true;
}




$('#formSubmit').submit(function(event) {

	event.preventDefault();

	let cpf = $('#cpf').val().replace(/[^\d]+/g, '')

	const formDataLimpoPessoaDTO = {};
	const formDataLimpoCandidatoRelacionamentoDTO = {};


	if (cpf == "") {
		var dadosFormulario = {
			"pessoaDTO": {
				"contaId": contaId,
				"nomeCompleto": $('#nomeCompleto').val(),
				"sexo": $('input[name="sexo"]:checked').val(),
				dtNascimento: $('#dtNascimento').val(),
				"cpf": null,
				"racaId": $('#racaId').val(),
				"paisResidenciaId": $('#paisResidenciaId').val(),
				"paisNascimentoId": $('#paisNascimentoId').val(),
				"ufNascimentoId": Number($('#ufNascimentoId').val()),
				"municipioNascimentoId": Number($('#municipioNascimentoId').val()),
				"nacionalidadeId": $('#nacionalidadeId').val(),
				"nacionalidade": $('#nacionalidadeId').find(":selected").text().substring(0,2),
				"estadoCivil": $('input[name="estadoCivil"]:checked').val(),
				"rgNumero": $('#rgNumero').val().replace(/[^\d]+/g, ''),
				"rgDataExpedicao": $('#rgDataExpedicao').val(),
				rgOrgaoExpedidor: $('#rgOrgaoExpedidor').val(),
				rgUfEmissorId: Number($('#rgUfEmissorId').val()),
				certidaoNascimentoNumero: $('#certidaoNascimentoNumero').val(),
				certidaoNascimentoCidadeCartorio: $('#certidaoNascimentoCidadeCartorio').val(),
				certidaoNascimentoCartorio: $('#certidaoNascimentoCartorio').val(),
				certidaoNascimentoUfCartorioId: Number($('#certidaoNascimentoUfCartorioId').val()),
				certidaoNascimentoDataEmissao: $('#certidaoNascimentoDataEmissao').val(),
				certidaoNascimentoFolha: $('#certidaoNascimentoFolha').val(),
				certidaoNascimentoLivro: $('#certidaoNascimentoLivro').val(),
				certidaoNascimentoOrdem: $('#certidaoNascimentoOrdem').val(),
				certidaoCasamentoNumero: $('#certidaoCasamentoNumero').val(),
				certidaoCasamentoCartorio: $('#certidaoCasamentoCartorio').val(),
				certidaoCasamentoUfCartorioId: Number($('#certidaoCasamentoUfCartorioId').val()),
				certidaoCasamentoCidadeCartorio: $('#certidaoCasamentoCidadeCartorio').val(),
				certidaoCasamentoFolha: $('#certidaoCasamentoFolha').val(),
				certidaoCasamentoLivro: $('#certidaoCasamentoLivro').val(),
				certidaoCasamentoOrdem: $('#certidaoCasamentoOrdem').val(),
				certidaoCasamentoDataEmissao: $('#certidaoCasamentoDataEmissao').val(),
				rneNumero: $("#rneNumero").val(),
				rneOrgaoExpedidor: $("#rneOrgaoExpedidor").val(),
				rneUfEmissorId: Number($("#rneUfEmissorId").val()),
				rneDataExpedicao: $("#rneDataExpedicao").val(),
				cep: $("#cep").val().replace(/[^\d]+/g, ''),
				endereco: $("#endereco").val(),
				numero: $("#numero").val(),
				complemento: $("#complemento").val(),
				bairro: $("#bairro").val(),
				municipio: $("#municipio").val(),
				distrito: $("#distrito").val(),
				uf: $("#uf").val(),
				"empresa": $("#empresa").val(),
				"ocupacao": $("#ocupacao").val(),
				"telefoneComercial": $("#telefoneComercial").val().replace(/[^\d]+/g, ''),
				"email": $('#email').val(),
				"telefone": $('#telefone').val().replace(/[^\d]+/g, ''),
				"celular": $('#celular').val(),
				"senha": "teste",
				"nomePai": null,
				"nomeMae": null
			},
			"candidatoRelacionamentoDTO": {
				"candidatoId": Number(idCandidadto),
				"pessoaId": 1,
				"papelPessoaId": Number($('#relacionamentoId').val())
			}
		};

	} else {
		var dadosFormulario = {
			"pessoaDTO": {
				"contaId": contaId,
				"nomeCompleto": $('#nomeCompleto').val(),
				"sexo": $('input[name="sexo"]:checked').val(),
				"dtNascimento": $('#dtNascimento').val(),
				"cpf": cpf,
				"racaId": $('#racaId').val(),
				"paisResidenciaId": $('#paisResidenciaId').val(),
				"paisNascimentoId": $('#paisNascimentoId').val(),
				"ufNascimentoId": Number($('#ufNascimentoId').val()),
				"municipioNascimentoId": Number($('#municipioNascimentoId').val()),
				"nacionalidadeId": $('#nacionalidadeId').val(),
				"nacionalidade": $('#nacionalidadeId').find(":selected").text().substring(0,2),
				"estadoCivil": $('input[name="estadoCivil"]:checked').val(),
				"rgNumero": $('#rgNumero').val().replace(/[^\d]+/g, ''),
				"rgDataExpedicao": $('#rgDataExpedicao').val(),
				rgOrgaoExpedidor: $('#rgOrgaoExpedidor').val(),
				rgUfEmissorId: Number($('#rgUfEmissorId').val()),
				certidaoNascimentoNumero: $('#certidaoNascimentoNumero').val(),
				certidaoNascimentoCidadeCartorio: $('#certidaoNascimentoCidadeCartorio').val(),
				certidaoNascimentoCartorio: $('#certidaoNascimentoCartorio').val(),
				certidaoNascimentoUfCartorioId: Number($('#certidaoNascimentoUfCartorioId').val()),
				certidaoNascimentoDataEmissao: $('#certidaoNascimentoDataEmissao').val(),
				certidaoNascimentoFolha: $('#certidaoNascimentoFolha').val(),
				certidaoNascimentoLivro: $('#certidaoNascimentoLivro').val(),
				certidaoNascimentoOrdem: $('#certidaoNascimentoOrdem').val(),
				certidaoCasamentoNumero: $('#certidaoCasamentoNumero').val(),
				certidaoCasamentoCartorio: $('#certidaoCasamentoCartorio').val(),
				certidaoCasamentoUfCartorioId: Number($('#certidaoCasamentoUfCartorioId').val()),
				certidaoCasamentoCidadeCartorio: $('#certidaoCasamentoCidadeCartorio').val(),
				certidaoCasamentoFolha: $('#certidaoCasamentoFolha').val(),
				certidaoCasamentoLivro: $('#certidaoCasamentoLivro').val(),
				certidaoCasamentoOrdem: $('#certidaoCasamentoOrdem').val(),
				certidaoCasamentoDataEmissao: $('#certidaoCasamentoDataEmissao').val(),
				rneNumero: $("#rneNumero").val(),
				rneOrgaoExpedidor: $("#rneOrgaoExpedidor").val(),
				rneUfEmissorId: Number($("#rneUfEmissorId").val()),
				rneDataExpedicao: $("#rneDataExpedicao").val(),
				cep: $("#cep").val().replace(/[^\d]+/g, ''),
				endereco: $("#endereco").val(),
				numero: $("#numero").val(),
				complemento: $("#complemento").val(),
				bairro: $("#bairro").val(),
				municipio: $("#municipio").val(),
				distrito: $("#distrito").val(),
				uf: $("#uf").val(),
				"empresa": $("#empresa").val(),
				"ocupacao": $("#ocupacao").val(),
				"telefoneComercial": $("#telefoneComercial").val().replace(/[^\d]+/g, ''),
				"email": $('#email').val(),
				"telefone": $('#telefone').val().replace(/[^\d]+/g, ''),
				"celular": $('#celular').val(),
				"senha": "teste",
				"nomePai": null,
				"nomeMae": null
			},
			"candidatoRelacionamentoDTO": {
				"candidatoId": Number(idCandidadto),
				"pessoaId": 1,
				"papelPessoaId": Number($('#relacionamentoId').val())
			}

		};

	}


	for (const key in dadosFormulario.pessoaDTO) {
		if (Object.hasOwnProperty.call(dadosFormulario.pessoaDTO, key)) {
			if (dadosFormulario.pessoaDTO[key] == 0) {
				dadosFormulario.pessoaDTO[key] = null
			}
			formDataLimpoPessoaDTO[key] = dadosFormulario.pessoaDTO[key]
		}
	}

	for (const key in dadosFormulario.candidatoRelacionamentoDTO) {
		if (Object.hasOwnProperty.call(dadosFormulario.candidatoRelacionamentoDTO, key)) {
			if (dadosFormulario.candidatoRelacionamentoDTO[key] == 0) {
				dadosFormulario.candidatoRelacionamentoDTO[key] = null
			}
			formDataLimpoCandidatoRelacionamentoDTO[key] = dadosFormulario.candidatoRelacionamentoDTO[key]
		}
	}

	dadosFormulario.pessoaDTO = formDataLimpoPessoaDTO
	dadosFormulario.candidatoRelacionamentoDTO = formDataLimpoCandidatoRelacionamentoDTO




	$.ajax({
		url: url_base + '/responsavel/pessoa-candidato',
		type: "POST",
		data: JSON.stringify(dadosFormulario),
		contentType: "application/json; charset=utf-8",
		beforeSend: function() {
			Swal.showLoading()
		},
		error: function(e) {
			Swal.close()
			console.log(e)
			console.log(e.responseJSON)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
			});
		}
	}).done(function(data) {

		Swal.close()
		Swal.fire({
			title: "Cadastrado com sucesso",
			icon: "success",

		})

		window.location.href = "listaResponsavel";


	});

	// Aqui você pode acessar os valores dos campos de input usando jQuery

	// Aqui você pode enviar o objeto formData para onde for necessário, como uma requisição AJAX
	// Exemplo:

	/*$.ajax({
		url: url_base + '/pessoas',
		type: "POST",
		data: JSON.stringify(dadosFormulario),
		contentType: "application/json; charset=utf-8",
		beforeSend: function() {
			Swal.showLoading()
		},
		error: function(e) {
			Swal.close()
			console.log(e)
			console.log(e.responseJSON)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
			});
		}
	}).done(function(data) {
		Swal.close()
		Swal.fire({
			title: "Editado com sucesso",
			icon: "success",
		})
		
	});*/

});



$('input[name="isRne"]').click(function() {
	if ($(this).is(':checked')) {
		$("#rneSec").show();
	} else {
		$("#rneSec").hide();
	}
});

$("#nacionalidadeId").on("blur", () => {
	if ($('#nacionalidadeId').find(":selected").text() != "BRA") {
		$("#rne").show()
	} else {
		$("#rne").hide()
	}
})

$('input[name="qualPreencher"]').click(function() {
	if ($(this).is(':checked')) {
		$("#certidaoNascimento").show();
		$("#certidaoCasamento").hide();
		$("[name='certidaoNascimentoNumero']").attr("required", true);
		$("[name='certidaoNascimentoCidadeCartorio']").attr("required", true);
		$("[name='certidaoNascimentoCartorio']").attr("required", true);
		$("[name='certidaoNascimentoUfCartorioId']").attr("required", true);
		$("[name='certidaoNascimentoDataEmissao']").attr("required", true);
		$("[name='certidaoNascimentoFolha']").attr("required", true);
		$("[name='certidaoNascimentoLivro']").attr("required", true);
		$("[name='certidaoNascimentoOrdem']").attr("required", true);

		$("[name='certidaoCasamentoNumero']").attr("required", false);
		$("[name='certidaoCasamentoCartorio']").attr("required", false);
		$("[name='certidaoCasamentoUfCartorioId']").attr("required", false);
		$("[name='certidaoCasamentoCidadeCartorio']").attr("required", false);
		$("[name='certidaoCasamentoFolha']").attr("required", false);
		$("[name='certidaoCasamentoLivro']").attr("required", false);
		$("[name='certidaoCasamentoOrdem']").attr("required", false);
		$("[name='certidaoCasamentoDataEmissao']").attr("required", false);

	} else {
		$("#certidaoNascimento").hide();
		$("#certidaoCasamento").show();
		$("[name='certidaoCasamentoNumero']").attr("required", true);
		$("[name='certidaoCasamentoCartorio']").attr("required", true);
		$("[name='certidaoCasamentoUfCartorioId']").attr("required", true);
		$("[name='certidaoCasamentoCidadeCartorio']").attr("required", true);
		$("[name='certidaoCasamentoFolha']").attr("required", true);
		$("[name='certidaoCasamentoLivro']").attr("required", true);
		$("[name='certidaoCasamentoOrdem']").attr("required", true);
		$("[name='certidaoCasamentoDataEmissao']").attr("required", true);

		$("[name='certidaoNascimentoNumero']").attr("required", false);
		$("[name='certidaoNascimentoCidadeCartorio']").attr("required", false);
		$("[name='certidaoNascimentoCartorio']").attr("required", false);
		$("[name='certidaoNascimentoUfCartorioId']").attr("required", false);
		$("[name='certidaoNascimentoDataEmissao']").attr("required", false);
		$("[name='certidaoNascimentoFolha']").removeattr("required", false);
		$("[name='certidaoNascimentoLivro']").attr("required", false);
		$("[name='certidaoNascimentoOrdem']").attr("required", false);

	}
});


function ValidarCpf() {
	const cpf = $('#cpf');
	const message = $("<p id='errMessage'></p>").text("CPF Inválido").css('color', '#FF0000');
	if (cpfValido(cpf.val())) {
		$("#btn-submit").removeAttr('disabled');
		cpf.removeClass('err-message')
		$('#errMessage').css('display', 'none')
	} else {
		if ($("#cardCpf").find('#errMessage').length > 0) {
			$('#errMessage').remove()
		}
		$("#btn-submit").attr("disabled", "disabled");
		cpf.addClass('err-message')
		$("#cardCpf").append(message)
		message.show()
	}

}
$("#cpf").blur(function() {
	ValidarCpf()
});