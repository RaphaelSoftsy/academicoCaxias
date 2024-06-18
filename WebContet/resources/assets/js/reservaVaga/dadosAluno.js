const contaId = sessionStorage.getItem('contaId')

$(document).ready(function() {


	if ($('input[id="qualPreencher"]').is(':checked')) {
		$("#certidaoCasamento").hide()
		$("#certidaoNascimento").show()
	} else {
		$("#certidaoNascimento").hide()
		$("#certidaoCasamento").show()
	}

	$.ajax({
		url: url_base + '/tiposIngresso',
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {

			if (item.ativo == "S") {
				$('#tipoIngressoId').append($('<option>', {
					value: item.idTipoIngresso,
					text: item.tipoIngresso,
					name: item.tipoIngresso
				}));
			}

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



	// Função para capturar os dados do formulário ao ser submetido
	$('#formSubmit').submit(function(event) {

		event.preventDefault();

		let cpf = $('#cpf').val().replace(/[^\d]+/g, '')

		if (cpf == "") {
			var dadosFormulario = {
				pessoaDTO: {
					contaId: contaId,
					nomeCompleto: $('#nomeCompleto').val(),
					tipoIngressoId: $('#tipoIngressoId').val(),
					nomeMae: $('#nomeMae').val(),
					nomePai: $('#nomePai').val(),
					sexo: $('input[name="sexo"]:checked').val(),
					dtNascimento: $('#dtNascimento').val(),
					cpf: null,
					racaId: $('#racaId').val(),
					paisNascimentoId: $('#paisNascimentoId').val(),
					ufNascimentoId: $('#ufNascimentoId').val(),
					municipioNascimentoId: $('#municipioNascimentoId').val(),
					nacionalidadeId: $('#nacionalidadeId').val(),
					estadoCivil: $('input[name="estadoCivil"]:checked').val(),
					rgNumero: $('#rgNumero').val().replace(/[^\d]+/g, ''),
					rgDataExpedicao: $('#rgDataExpedicao').val(),
					rgOrgaoExpedidor: $('#rgOrgaoExpedidor').val(),
					rgUfEmissorId: $('#rgUfEmissorId').val(),
					certidaoNascimentoNumero: $('#certidaoNascimentoNumero').val(),
					certidaoNascimentoCidadeCartorio: $('#certidaoNascimentoCidadeCartorio').val(),
					certidaoNascimentoCartorio: $('#certidaoNascimentoCartorio').val(),
					certidaoNascimentoUfCartorioId: $('#certidaoNascimentoUfCartorioId').val(),
					certidaoNascimentoDataEmissao: $('#certidaoNascimentoDataEmissao').val(),
					certidaoNascimentoFolha: $('#certidaoNascimentoFolha').val(),
					certidaoNascimentoLivro: $('#certidaoNascimentoLivro').val(),
					certidaoNascimentoOrdem: $('#certidaoNascimentoOrdem').val(),
					certidaoCasamentoNumero: $('#certidaoCasamentoNumero').val(),
					certidaoCasamentoCartorio: $('#certidaoCasamentoCartorio').val(),
					certidaoCasamentoUfCartorioId: $('#certidaoCasamentoUfCartorioId').val(),
					certidaoCasamentoCidadeCartorio: $('#certidaoCasamentoCidadeCartorio').val(),
					certidaoCasamentoFolha: $('#certidaoCasamentoFolha').val(),
					certidaoCasamentoLivro: $('#certidaoCasamentoLivro').val(),
					certidaoCasamentoOrdem: $('#certidaoCasamentoOrdem').val(),
					certidaoCasamentoDataEmissao: $('#certidaoCasamentoDataEmissao').val(),
					rneNumero: $("#rneNumero").val(),
					rneOrgaoExpedidor: $("#rneOrgaoExpedidor").val(),
					rneUfEmissorId: $("#rneUfEmissorId").val(),
					rneDataExpedicao: $("#rneDataExpedicao").val()
				},
				candidatoDTO: {
					contaId: contaId,
					"pessoaId": 2,
					"candidato": parseInt(Math.random() * 100000),
					"ofertaConcursoId": 3,
					"tipoIngressoId": $('#tipoIngressoId').val(),
					"classificacao": 3,
					"aluno": "9",
					"aprovado": "S",
					"usuarioAprovacaoId": 1
				}


			};

		} else {
			var dadosFormulario = {
				pessoaDTO: {
					contaId: contaId,
					nomeCompleto: $('#nomeCompleto').val(),
					nomeMae: $('#nomeMae').val(),
					nomePai: $('#nomePai').val(),
					sexo: $('input[name="sexo"]:checked').val(),
					dtNascimento: $('#dtNascimento').val(),
					cpf: cpf,
					racaId: $('#racaId').val(),
					paisNascimentoId: $('#paisNascimentoId').val(),
					ufNascimentoId: $('#ufNascimentoId').val(),
					municipioNascimentoId: $('#municipioNascimentoId').val(),
					nacionalidadeId: $('#nacionalidadeId').val(),
					estadoCivil: $('input[name="estadoCivil"]:checked').val(),
					rgNumero: $('#rgNumero').val().replace(/[^\d]+/g, ''),
					rgDataExpedicao: $('#rgDataExpedicao').val(),
					rgOrgaoExpedidor: $('#rgOrgaoExpedidor').val(),
					rgUfEmissorId: $('#rgUfEmissorId').val(),
					certidaoNascimentoNumero: $('#certidaoNascimentoNumero').val(),
					certidaoNascimentoCidadeCartorio: $('#certidaoNascimentoCidadeCartorio').val(),
					certidaoNascimentoCartorio: $('#certidaoNascimentoCartorio').val(),
					certidaoNascimentoUfCartorioId: $('#certidaoNascimentoUfCartorioId').val(),
					certidaoNascimentoDataEmissao: $('#certidaoNascimentoDataEmissao').val(),
					certidaoNascimentoFolha: $('#certidaoNascimentoFolha').val(),
					certidaoNascimentoLivro: $('#certidaoNascimentoLivro').val(),
					certidaoNascimentoOrdem: $('#certidaoNascimentoOrdem').val(),
					certidaoCasamentoNumero: $('#certidaoCasamentoNumero').val(),
					certidaoCasamentoCartorio: $('#certidaoCasamentoCartorio').val(),
					certidaoCasamentoUfCartorioId: $('#certidaoCasamentoUfCartorioId').val(),
					certidaoCasamentoCidadeCartorio: $('#certidaoCasamentoCidadeCartorio').val(),
					certidaoCasamentoFolha: $('#certidaoCasamentoFolha').val(),
					certidaoCasamentoLivro: $('#certidaoCasamentoLivro').val(),
					certidaoCasamentoOrdem: $('#certidaoCasamentoOrdem').val(),
					certidaoCasamentoDataEmissao: $('#certidaoCasamentoDataEmissao').val(),
					rneNumero: $("#rneNumero").val(),
					rneOrgaoExpedidor: $("#rneOrgaoExpedidor").val(),
					rneUfEmissorId: $("#rneUfEmissorId").val(),
					rneDataExpedicao: $("#rneDataExpedicao").val()
				},
				candidatoDTO: {
					contaId: contaId,
					"pessoaId": 2,
					"candidato": parseInt(Math.random() * 100000),
					"ofertaConcursoId": null,
					"tipoIngressoId": $('#tipoIngressoId').val(),
					"classificacao": null,
					"aluno": null,
					"aprovado": null,
					"usuarioAprovacaoId": null
				}

			};

		}

		console.log(cpf)


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

		localStorage.setItem('jsonAluno', JSON.stringify(dadosFormulario))
		window.location.href = "endereco-aluno";
	});
})



$('input[name="isRne"]').click(function() {
	if ($(this).is(':checked')) {
		$("#rneSec").show();
	} else {
		$("#rneSec").hide();
	}
});

$('input[name="qualPreencher"]').click(function() {
	if ($(this).is(':checked')) {
		$("#certidaoNascimento").show();
		$("#certidaoCasamento").hide();
	} else {
		$("#certidaoNascimento").hide();
		$("#certidaoCasamento").show();
	}
});



$("#nacionalidadeId").on("blur", () => {
	if ($('#nacionalidadeId').find(":selected").text() != "BRA") {
		$("#rne").show()
	} else {
		$("#rne").hide()
	}
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



