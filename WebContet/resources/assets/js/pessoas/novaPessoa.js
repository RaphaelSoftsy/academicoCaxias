const contaId = sessionStorage.getItem('contaId')

$(document).ready(function() {
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
});

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
		$("#btn-submit").attr("disabled", "disabled");
		cpf.addClass('err-message')
		$("#cardCpf").append(message)
		message.show()
	}

}
$("#cpf").blur(function() {
	ValidarCpf()
});
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

$("#formNovoCadastro").submit(function(e) {
	e.preventDefault();

	var dadosFormulario = {
		contaId: parseInt(contaId), 
		nomeCompleto: $('#nomeCompleto').val(),
		nomeSocial: $('#nomeSocial').val(),
		cpf: $('#cpf').val().replace(/[^\d]+/g, ''),
		rgNumero: $('#rgNumero').val().replace(/[^\d]+/g, ''),
		rgOrgaoExpedidor: $('#rgOrgaoExpedidor').val(),
		rgUfEmissorId: parseInt($('#rgUfEmissorId').val()),
		rgDataExpedicao: $('#rgDataExpedicao').val(),
		rneNumero: $('#rneNumero').val(),
		rneOrgaoExpedidor: $('#rneOrgaoExpedidor').val(),
		rneUfEmissorId: parseInt($('#rneUfEmissorId').val()),
		rneDataExpedicao: $('#rneDataExpedicao').val(),
		certidaoNascimentoNumero: $('#certidaoNascimentoNumero').val(),
		certidaoNascimentoCartorio: $('#certidaoNascimentoCartorio').val(),
		certidaoNascimentoUfCartorioId: parseInt($('#certidaoNascimentoUfCartorioId').val()),
		certidaoNascimentoDataEmissao: $('#certidaoNascimentoDataEmissao').val(),
		certidaoNascimentoFolha: $('#certidaoNascimentoFolha').val(),
		certidaoNascimentoLivro: $('#certidaoNascimentoLivro').val(),
		certidaoNascimentoOrdem: $('#certidaoNascimentoOrdem').val(),
		certidaoCasamentoNumero: $('#certidaoCasamentoNumero').val(),
		certidaoCasamentoCartorio: $('#certidaoCasamentoCartorio').val(),
		certidaoCasamentoUfCartorioId: parseInt($('#certidaoCasamentoUfCartorioId').val()),
		certidaoCasamentoDataEmissao: $('#certidaoCasamentoDataEmissao').val(),
		certidaoCasamentoFolha: $('#certidaoCasamentoFolha').val(),
		certidaoCasamentoLivro: $('#certidaoCasamentoLivro').val(),
		certidaoCasamentoOrdem: $('#certidaoCasamentoOrdem').val(),
		dtNascimento: $('#dtNascimento').val(),
		sexo: $('input[name="sexo"]:checked').val(),
		racaId:parseInt( $('#racaId').val()),
		paisNascimentoId: parseInt($('#paisNascimentoId').val()),
		ufNascimentoId: parseInt($('#ufNascimentoId').val()),
		nacionalidadeId: parseInt($('#nacionalidadeId').val()),
		municipioNascimentoId: parseInt($('#municipioNascimentoId').val()),
		paisResidenciaId: parseInt($('#paisResidenciaId').val()),
		nacionalidade: $('#nacionalidadeId option:selected').text().substring(0, 2),
		nomePai: $('#nomePai').val(),
		nomeMae: $('#nomeMae').val(),
		cep: $('#cep').val().replace(/[^\d]+/g, ''),
		endereco: $('#endereco').val(),
		numero: $('#numero').val(),
		complemento: $('#complemento').val(),
		bairro: $('#bairro').val(),
		municipio: $('#municipio').val(),
		distrito: $('#distrito').val(),
		uf: $('#uf').val(),
		telefone: $('#telefone').val().replace(/[^\d]+/g, ''),
		celular: $('#celular').val().replace(/[^\d]+/g, ''),
		email: $('#email').val(),
		empresa: $('#empresa').val(),
		ocupacao: $('#ocupacao').val(),
		telefoneComercial: $('#telefoneComercial').val().replace(/[^\d]+/g, ''),
		usuario: $('#usuario').val(),
		senha: $('#senha').val()
	};

	console.log(dadosFormulario)

	$.ajax({
		url: url_base + '/pessoas',
		type: "POST",
		data: JSON.stringify(dadosFormulario),
		contentType: "application/json; charset=utf-8",
		error: function(e) {
			console.log(e)
			console.log(e.responseJSON)
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
		window.location.href = "listarPessoas";
	});

});