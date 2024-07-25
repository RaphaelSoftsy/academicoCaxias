const contaId = localStorage.getItem('contaId')
var idPessoa = '';

$(document).ready(function() {
	idPessoa = getSearchParams("id");

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

	if (idPessoa != undefined) {
		$("#tituloPagina, #tituloForm").text("Dados da Pessoa")
		$("#h1-pessoa").text("Editar Dados")
		$("#btn-submit").text("Editar")
		let icon = $("#icon")

		if (icon.hasClass('fa-plus')) {
			icon.removeClass('fa-plus').addClass('fa-pen');
		}

		$.ajax({
			url: url_base + '/pessoas/' + idPessoa,
			type: 'GET',
			async: false,
		}).done(function(data) {
			console.log(data)
			
			$('#contaId').val(data.conta.idConta);
			$('#nomeCompleto').val(data.nomeCompleto);
			$('#nomeSocial').val(data.nomeSocial);
			$('#cpf').val(data.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4"));
			$('#rgNumero').val(data.rgNumero.replace(/^(\d{2})(\d{3})(\d{3})(\d{1})$/, "$1.$2.$3-$4"));
			$('#rgOrgaoExpedidor').val(data.rgOrgaoExpedidor);
			$('#rgUfEmissorId').val(data.rgUfEmissor.idUf);
			$('#rgDataExpedicao').val(data.rgDataExpedicao);
			$('#rneNumero').val(data.rneNumero);
			$('#rneOrgaoExpedidor').val(data.rneOrgaoExpedidor);
			$('#rneUfEmissorId').val(data.rneUfEmissor.idUf);
			$('#rneDataExpedicao').val(data.rneDataExpedicao);
			$('#certidaoNascimentoNumero').val(data.certidaoNascimentoNumero);
			$('#certidaoNascimentoCartorio').val(data.certidaoNascimentoCartorio);
			$('#certidaoNascimentoUfCartorioId').val(data.certidaoNascimentoUfCartorio.idUf);
			$('#certidaoNascimentoDataEmissao').val(data.certidaoNascimentoDataEmissao);
			$('#certidaoNascimentoFolha').val(data.certidaoNascimentoFolha);
			$('#certidaoNascimentoLivro').val(data.certidaoNascimentoLivro);
			$('#certidaoNascimentoOrdem').val(data.certidaoNascimentoOrdem);
			$('#certidaoCasamentoNumero').val(data.certidaoCasamentoNumero);
			$('#certidaoCasamentoCartorio').val(data.certidaoCasamentoCartorio);
			$('#certidaoCasamentoUfCartorioId').val(data.certidaoCasamentoUfCartorio.idUf);
			$('#certidaoCasamentoDataEmissao').val(data.certidaoCasamentoDataEmissao);
			$('#certidaoCasamentoFolha').val(data.certidaoCasamentoFolha);
			$('#certidaoCasamentoLivro').val(data.certidaoCasamentoLivro);
			$('#certidaoCasamentoOrdem').val(data.certidaoCasamentoOrdem);
			$('#dtNascimento').val(data.dtNascimento);
			$('input[name="sexo"][value="' + data.sexo + '"]').prop('checked', true);
			$('#racaId').val(data.raca.idRaca);
			$('#paisNascimentoId').val(data.paisNascimento.idPais);
			$('#ufNascimentoId').val(data.ufNascimento.idUf);
			$('#nacionalidadeId').val(data.nacionalidadeId.idNacionalidade);
			$('#municipioNascimentoId').val(data.municipioNascimento.idMunicipio);
			$('#paisResidenciaId').val(data.paisResidencia.idPais);
			$('#nacionalidadeId option').filter(function() {
				return $(this).text().substring(0, 2) === data.nacionalidade;
			}).prop('selected', true);
			$('#nomePai').val(data.nomePai);
			$('#nomeMae').val(data.nomeMae);
			$('#cep').val(data.cep);
			$('#endereco').val(data.endereco);
			$('#numero').val(data.numero);
			$('#complemento').val(data.complemento);
			$('#bairro').val(data.bairro);
			$('#municipio').val(data.municipio);
			$('#distrito').val(data.distrito);
			$('#uf').val(data.uf);
			$('#telefone').val(data.telefone);
			$('#celular').val(data.celular);
			$('#email').val(data.email);
			$('#empresa').val(data.empresa);
			$('#ocupacao').val(data.ocupacao);
			$('#telefoneComercial').val(data.telefoneComercial);
			$('#usuario').val(data.usuario);
			$('#senha').val(data.senha);
		}).fail(function(error) {
			console.error('Erro ao buscar dados da pessoa:', error);
		});

	}
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

$("#formSubmit").submit(function(e) {
	e.preventDefault();

	if (idPessoa == undefined) {
		cadastrarPessoa()
	} else {
		editarPessoa()
	}
});

const editarPessoa = () => {
	var dadosFormulario = {
		idPessoa: idPessoa,
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
		racaId: parseInt($('#racaId').val()),
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
		type: "PUT",
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
		window.location.href = "listarPessoas";
	});
}

const cadastrarPessoa = () => {
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
		racaId: parseInt($('#racaId').val()),
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
		window.location.href = "listarPessoas";
	});
}