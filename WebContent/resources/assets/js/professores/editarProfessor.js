let id = "";
const contaId = localStorage.getItem('contaId')
let pessoaId = 0
let professorId = 0

$(document).ready(function() {




	id = getSearchParams("id");

	var tamanhoBody = $("body").width()


	if (tamanhoBody < 768) {
		$("#qualPreencher").show()
		$("#qualPreencherSwitch").hide()
	} else {
		$("#qualPreencher").hide()
		$("#qualPreencherSwitch").show()
	}

	if ($('input[name="qualPreencher"]').is(':checked')) {
		$("#certidaoNascimento").show();
		$("#certidaoCasamento").hide();



		$("input[name='certidaoCasamentoNumero']").attr("required", false);
		$("input[name='certidaoCasamentoCartorio']").attr("required", false);
		$("select[name='certidaoCasamentoUfCartorioId']").attr("required", false).select2(); // Remove required e inicializa select2
		$("select[name='certidaoCasamentoMunicipioCartorioId']").attr("required", false).select2(); // Remove required e inicializa select2
		$("input[name='certidaoCasamentoFolha']").attr("required", false);
		$("input[name='certidaoCasamentoLivro']").attr("required", false);
		$("input[name='certidaoCasamentoOrdem']").attr("required", false);
		$("input[name='certidaoCasamentoDataEmissao']").attr("required", false);


		$("[name='certidaoNascimentoNumero']").attr("required", false);
		$("[name='certidaoNascimentoCidadeCartorio']").attr("required", false);
		$("[name='certidaoNascimentoCartorio']").attr("required", false);
		$("[name='certidaoNascimentoUfCartorioId']").attr("required", false);
		$("[name='certidaoNascimentoDataEmissao']").attr("required", false);
		$("[name='certidaoNascimentoFolha']").attr("required", false);
		$("[name='certidaoNascimentoLivro']").attr("required", false);
		$("[name='certidaoNascimentoOrdem']").attr("required", false);
	} else {
		$("#certidaoNascimento").hide();
		$("#certidaoCasamento").show();



		$("[name='certidaoCasamentoNumero']").attr("required", false);
		$("[name='certidaoCasamentoCartorio']").attr("required", false);
		$("[name='certidaoCasamentoUfCartorioId']").attr("required", false);
		$("[name='certidaoCasamentoCidadeCartorio']").attr("required", false);
		$("[name='certidaoCasamentoFolha']").attr("required", false);
		$("[name='certidaoCasamentoLivro']").attr("required", false);
		$("[name='certidaoCasamentoOrdem']").attr("required", false);
		$("[name='certidaoCasamentoDataEmissao']").attr("required", false);

		$("input[name='certidaoNascimentoNumero']").attr("required", false);
		$("select[name='certidaoNascimentoMunicipioCartorioId']").attr("required", false).select2(); // Remove required e inicializa select2
		$("input[name='certidaoNascimentoCartorio']").attr("required", false);
		$("select[name='certidaoNascimentoUfCartorioId']").attr("required", false).select2(); // Remove required e inicializa select2
		$("input[name='certidaoNascimentoDataEmissao']").attr("required", false);
		$("input[name='certidaoNascimentoFolha']").attr("required", false);
		$("input[name='certidaoNascimentoLivro']").attr("required", false);
		$("input[name='certidaoNascimentoOrdem']").attr("required", false);
	}


	$.ajax({
		url: url_base + '/tiposIngresso/conta/' + contaId,
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
			if (item.ativo == "S") {
				$('#racaId').append($('<option>', {
					value: item.idRaca,
					text: item.raca,
					name: item.raca
				}));
			}
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

			$('#paisResidenciaId').append($('<option>', {
				value: item.idPais,
				text: item.nomePais,
				name: item.nomePais
			}));

		});


	})



	$.ajax({
		url: url_base + '/nacionalidade',
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#nacionalidadeId').append($('<option>', {
				value: item.idNacionalidade,
				text: item.nacionalidade,
				name: item.nacionalidade
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

			$('#certidaoNascimentoMunicipioCartorioId').append($('<option>', {
				value: item.idMunicipio,
				text: item.nomeMunicipio,
				name: item.nomeMunicipio
			}));

			$('#certidaoCasamentoCidadeCartorioId').append($('<option>', {
				value: item.idMunicipio,
				text: item.nomeMunicipio,
				name: item.nomeMunicipio
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
				text: item.codUf + " - " + item.nomeUf,
				name: item.codUf
			}));

			$('#rgUfEmissorId').append($('<option>', {
				value: item.idUf,
				text: item.codUf + " - " + item.nomeUf,
				name: item.codUf
			}));

			$('#rneUfEmissorId').append($('<option>', {
				value: item.idUf,
				text: item.codUf + " - " + item.nomeUf,
				name: item.codUf
			}));

			$('#certidaoNascimentoUfCartorioId').append($('<option>', {
				value: item.idUf,
				text: item.codUf + " - " + item.nomeUf,
				name: item.codUf
			}));

			$('#certidaoCasamentoUfCartorioId').append($('<option>', {
				value: item.idUf,
				text: item.codUf + " - " + item.nomeUf,
				name: item.codUf
			}));
		});
	})


	getDados2();
	$("select").select2();
});

function getDados2() {
	$.ajax({
		url: url_base + "/professores/" + id,
		type: "GET",
		async: false,
	})
		.done(function(data) {

			pessoaId = data.pessoa.idPessoa
			professorId = data.idProfessor




			$('#municipioNascimentoId').attr('disabled', false)
			$('#certidaoNascimentoMunicipioCartorioId').attr('disabled', false)
			$('#certidaoNascimentoMunicipioCartorioId').attr('disabled', false)

			console.log(data)
			// Verificar se os dados de certidão de nascimento estão preenchidos
			if (data.pessoa.certidaoNascimentoNumero !== null &&
				data.pessoa.certidaoNascimentoDataEmissao !== null &&
				data.pessoa.certidaoNascimentoFolha !== null &&
				data.pessoa.certidaoNascimentoLivro !== null &&
				data.pessoa.certidaoNascimentoOrdem !== null) {

				$('input[id="qualPreencher"]').attr('checked', true)

				$("#certidaoCasamento").hide()
				$("#certidaoNascimento").show()


				$('#certidaoNascimentoNumero').val(data.pessoa.certidaoNascimentoNumero);
				$('#certidaoNascimentoCartorio').val(data.pessoa.certidaoNascimentoCartorio);
				$('#certidaoNascimentoUfCartorioId').val(data.pessoa.certidaoNascimentoMunicipioCartorio != null ? data.pessoa.certidaoNascimentoMunicipioCartorio.ufId : "")
				$('#certidaoNascimentoMunicipioCartorioId').val(data.pessoa.certidaoNascimentoMunicipioCartorio != null ? data.pessoa.certidaoNascimentoMunicipioCartorio.idMunicipio : "");
				$('#certidaoNascimentoMunicipioCartorioId').removeAttr("disabled")
				$('#certidaoNascimentoDataEmissao').val(data.pessoa.certidaoNascimentoDataEmissao);
				$('#certidaoNascimentoFolha').val(data.pessoa.certidaoNascimentoFolha);
				$('#certidaoNascimentoLivro').val(data.pessoa.certidaoNascimentoLivro);
				$('#certidaoNascimentoOrdem').val(data.pessoa.certidaoNascimentoOrdem);



				$("[name='certidaoCasamentoNumero']").attr("required", false);
				$("[name='certidaoCasamentoCartorio']").attr("required", false);
				$("[name='certidaoCasamentoUfCartorioId']").attr("required", false);
				$("[name='certidaoCasamentoCidadeCartorio']").attr("required", false);
				$("[name='certidaoCasamentoFolha']").attr("required", false);
				$("[name='certidaoCasamentoLivro']").attr("required", false);
				$("[name='certidaoCasamentoOrdem']").attr("required", false);
				$("[name='certidaoCasamentoDataEmissao']").attr("required", false);

				$("[name='certidaoNascimentoNumero']").attr("required", false);
				$("[name='certidaoNascimentoCidadeCartorio']").attr("required", false);
				$("[name='certidaoNascimentoCartorio']").attr("required", false);
				$("[name='certidaoNascimentoUfCartorioId']").attr("required", false);
				$("[name='certidaoNascimentoDataEmissao']").attr("required", false);
				$("[name='certidaoNascimentoFolha']").attr("required", false);
				$("[name='certidaoNascimentoLivro']").attr("required", false);
				$("[name='certidaoNascimentoOrdem']").attr("required", false);
			} else if (data.pessoa.certidaoCasamentoCartorio !== null &&
				data.pessoa.certidaoCasamentoMunicipioCartorio !== null &&
				data.pessoa.certidaoCasamentoDataEmissao !== null &&
				data.pessoa.certidaoCasamentoFolha !== null &&
				data.pessoa.certidaoCasamentoLivro !== null &&
				data.certidaoCasamentoOrdem !== null) {
				// Verificar se os dados de certidão de casamento estão preenchidos
				$('input[id="qualPreencher"]').attr('checked', false)
				$("#certidaoNascimento").hide()
				$("#certidaoCasamento").show()
				$('#certidaoCasamentoNumero').val(data.pessoa.certidaoCasamentoNumero);
				$('#certidaoCasamentoCartorio').val(data.pessoa.certidaoCasamentoCartorio);
				$('#certidaoCasamentoUfCartorioId').val(data.pessoa.certidaoCasamentoMunicipioCartorio !== null ? data.pessoa.certidaoCasamentoMunicipioCartorio.ufId : "").trigger('change');
				$('#certidaoCasamentoMunicipioCartorioId').removeAttr("disabled")
				$('#certidaoCasamentoMunicipioCartorioId').val(data.pessoa.certidaoCasamentoMunicipioCartorio !== null ? data.pessoa.certidaoCasamentoMunicipioCartorio.idMunicipio : "").trigger('change');
				$('#certidaoCasamentoDataEmissao').val(data.pessoa.certidaoCasamentoDataEmissao);
				$('#certidaoCasamentoOrdem').val(data.pessoa.certidaoCasamentoOrdem);
				$('#certidaoCasamentoFolha').val(data.pessoa.certidaoCasamentoFolha);
				$('#certidaoCasamentoLivro').val(data.pessoa.certidaoCasamentoLivro);

				$("[name='certidaoCasamentoNumero']").attr("required", false);
				$("[name='certidaoCasamentoCartorio']").attr("required", false);
				$("[name='certidaoCasamentoUfCartorioId']").attr("required", false);
				$("[name='certidaoCasamentoCidadeCartorio']").attr("required", false);
				$("[name='certidaoCasamentoFolha']").attr("required", false);
				$("[name='certidaoCasamentoLivro']").attr("required", false);
				$("[name='certidaoCasamentoOrdem']").attr("required", false);
				$("[name='certidaoCasamentoDataEmissao']").attr("required", false);


				$("[name='certidaoNascimentoNumero']").attr("required", false);
				$("[name='certidaoNascimentoCidadeCartorio']").attr("required", false);
				$("[name='certidaoNascimentoCartorio']").attr("required", false);
				$("[name='certidaoNascimentoUfCartorioId']").attr("required", false);
				$("[name='certidaoNascimentoDataEmissao']").attr("required", false);
				$("[name='certidaoNascimentoFolha']").attr("required", false);
				$("[name='certidaoNascimentoLivro']").attr("required", false);
				$("[name='certidaoNascimentoOrdem']").attr("required", false);

			}
			// Preenchendo campos de input
			$('#nomeCompleto').val(data.pessoa.nomeCompleto);
			$('#cpf').val(data.pessoa.cpf !== null ? data.pessoa.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4") : "");
			$('#rgNumero').val(data.pessoa.rgNumero !== null ? data.pessoa.rgNumero.replace(/^(\d{2})(\d{3})(\d{3})(\d{1})$/, "$1.$2.$3-$4") : "");
			$('#rgOrgaoExpedidor').val(data.pessoa.rgOrgaoExpedidor);
			$('#rgDataExpedicao').val(data.pessoa.rgDataExpedicao);
			$('#dtNascimento').val(data.pessoa.dtNascimento);
			$('#sexo_' + data.pessoa.sexo).prop('checked', true); // Supondo que o valor de 'sexo' seja uma string como 'M' ou 'F'
			$('#sexo_' + data.pessoa.estadoCivil).prop('checked', true); // Supondo que o valor de 'sexo' seja uma string como 'M' ou 'F'
			$('#telefone').val(data.telefone);
			$('#celular').val(data.celular);
			$('#email').val(data.email);
			$('#empresa').val(data.empresa);
			$('#ocupacao').val(data.ocupacao);
			$('#telefoneComercial').val(data.telefoneComercial);

			// Preenchendo campos de select (exemplo com raca, nacionalidade, paisNascimento, paisResidencia)
			$('#racaId').val(data.pessoa.raca.idRaca);
			$('#nacionalidadeId').val(data.pessoa.nacionalidadeId.idNacionalidade);
			$('#paisNascimentoId').val(data.pessoa.paisNascimento.idPais);
			$('#paisResidenciaId').val(data.pessoa.paisResidencia.idPais);
			/*	$('#nacionalidadeId').val(data.nacionalidadeId.idNacionalidade).attr("selected", true);;
				$('#paisNascimentoId').val(data.paisNascimento.idPais).attr("selected", true);;
				$('#paisResidenciaId').val(data.paisResidencia.idPais).attr("selected", true);;
				$('#ufNascimentoId').val(data.municipioNascimento.ufId).attr("selected", true);*/

			// Exemplo de preenchimento para campos específicos como certidaoNascimentoNumero, certidaoCasamentoNumero, etc.
			/*$('#certidaoNascimentoNumero').val(data.pessoa.certidaoNascimentoNumero);
			$('#certidaoCasamentoNumero').val(data.certidaoCasamentoNumero);*/

			// Aqui você pode adicionar os demais campos conforme necessário
			// Exemplo para preenchimento de campo select com município de nascimento
			$('#municipioNascimentoId').val(data.pessoa.municipioNascimento.idMunicipio);
			$('#ufNascimentoId').val(data.pessoa.municipioNascimento.ufId);
			$('#rgUfEmissorId').val(data.pessoa.rgUfEmissor !== null ? data.pessoa.rgUfEmissor.idUf : "");

			// Exemplo para estado civil usando radio button
			$('input[name="estadoCivil"][value="' + data.pessoa.estadoCivil + '"]').prop('checked', true); // Supondo que o valor de 'estadoCivil' seja uma string como 'SO' ou 'CA'

			$("#codigoInep").val(data.codigoInep);
			$("#matricula").val(data.matricula);
			$("#dataContratacao").val(data.dataContratacao);
			$("#dataDemissao").val(data.dataDemissao);
			$("#emailInstucional").val(data.emailInstitucional);
			$("#usuario").val(data.usuario);

		})

		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});
}


$('#formNovoCadastro').submit(function(event) {
	event.preventDefault();

	let cpf = $('#cpf').val().replace(/[^\d]+/g, '')

	if (cpf == "") {
		cpf = null
	}



	var dadosFormulario = {
		pessoaDTO: {
			contaId: contaId,
			nomeCompleto: $('#nomeCompleto').val(),
			nomeMae: null,
			nomePai: null,
			sexo: $('input[name="sexo"]:checked').val(),
			dtNascimento: $('#dtNascimento').val(),
			cpf: cpf,
			racaId: $('#racaId').val(),
			paisNascimentoId: $('#paisNascimentoId').val(),
			paisResidenciaId: $('#paisResidenciaId').val(),
			ufNascimentoId: $('#ufNascimentoId').val(),
			municipioNascimentoId: $('#municipioNascimentoId').val(),
			nacionalidadeId: $('#nacionalidadeId').val(),
			"nacionalidade": $('#nacionalidadeId').find(":selected").text().substring(0, 3),
			estadoCivil: $('input[name="estadoCivil"]:checked').val(),
			rgNumero: $('#rgNumero').val().replace(/[^\d]+/g, ''),
			rgDataExpedicao: $('#rgDataExpedicao').val(),
			rgOrgaoExpedidor: $('#rgOrgaoExpedidor').val(),
			rgUfEmissorId: $('#rgUfEmissorId').val(),
			certidaoNascimentoNumero: $('#certidaoNascimentoNumero').val(),
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
			rneDataExpedicao: $("#rneDataExpedicao").val(),
			"certidaoNascimentoMunicipioCartorioId": $('#certidaoNascimentoMunicipioCartorioId').val(),
			"certidaoCasamentoMunicipioCartorioId": $('#certidaoCasamentoCidadeCartorioId').val(),
			"idPessoa": pessoaId,
		},
		professorDTO: {
			"idProfessor": professorId,
			"pessoaId": pessoaId,
			"contaId": contaId,
			"codigoInep": $("#codigoInep").val(),
			"matricula": $("#matricula").val(),
			"usuario": $("#usuario").val(),
			"senha": $("#senha").val(),
			"emailInstitucional": $("#emailInstucional").val(),
			"dataContratacao": $("#dataContratacao").val(),
			"dataDemissao": $("#dataDemissao").val()
		}
	}

	console.log(dadosFormulario)


	$.ajax({
		url: url_base + "/professores/pessoa-professor",
		type: "PUT",
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
			title: "Editado com sucesso",
			icon: "success",
		})
		window.location.href = "professores";
	});

});

$('#certidaoCasamentoUfCartorioId').change(() => {
	$("#certidaoCasamentoCidadeCartorioId").attr("disabled", false)
	$("#certidaoCasamentoCidadeCartorioId").empty()
	$("#certidaoCasamentoCidadeCartorioId").append("<option selected disabled>Selecione uma opção</option>")
	$.ajax({
		url: url_base + '/municipio/uf/' + $('#certidaoCasamentoUfCartorioId').val(),
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#certidaoCasamentoMunicipioCartorioId').append($('<option>', {
				value: item.idMunicipio,
				text: item.nomeMunicipio,
				name: item.nomeMunicipio
			}));
		});


	})
})


$('#certidaoNascimentoUfCartorioId').change(() => {
	$("#certidaoNascimentoMunicipioCartorioId").attr("disabled", false)
	$("#certidaoNascimentoMunicipioCartorioId").empty()
	$("#certidaoNascimentoMunicipioCartorioId").append("<option selected disabled>Selecione uma opção</option>")
	$.ajax({
		url: url_base + '/municipio/uf/' + $('#certidaoNascimentoUfCartorioId').val(),
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#certidaoNascimentoMunicipioCartorioId').append($('<option>', {
				value: item.idMunicipio,
				text: item.nomeMunicipio,
				name: item.nomeMunicipio
			}));
		});


	})
})


$("#usuario").blur(() => {

	const usuario = $("#usuario")
	$.ajax({
		url: url_base + '/professores/verificar-usuario?usuario=' + usuario.val(),
		type: "get"
	}).done(function(data) {
		if (data.data.length != 0) {
			const messageUsuario = $("<p id='errMessageUsuario'></p>").text("Usuário já utilizado").css('color', '#FF0000');
			if ($("#cardMatricula").find('#errMessageUsuario').length > 0) {
				$('#errMessageUsuario').remove()
			}
			$("#btn-adicionar").attr("disabled", "disabled");
			usuario.addClass('err-message')
			$("#cardUsuario").append(messageUsuario)
			messageUsuario.show()
		} else {
			$("#btn-adicionar").removeAttr('disabled');
			usuario.removeClass('err-message')
			$('#errMessageUsuario').css('display', 'none')


		}
	});
})


$("#matricula").blur(() => {

	const matricula = $("#matricula")
	$.ajax({
		url: url_base + '/professores/verificar-matricula?matricula=' + matricula.val(),
		type: "get",
	}).done(function(data) {
		if (data.data.length != 0) {
			const messageEmail = $("<p id='errMessageMatricula'></p>").text("Matrícula já utilizada").css('color', '#FF0000');
			if ($("#cardMatricula").find('#errMessageMatricula').length > 0) {
				$('#errMessageMatricula').remove()
			}
			$("#btn-adicionar").attr("disabled", "disabled");
			matricula.addClass('err-message')
			$("#cardMatricula").append(messageEmail)
			messageEmail.show()
		} else {
			$("#btn-adicionar").removeAttr('disabled');
			matricula.removeClass('err-message')
			$('#errMessageMatricula').css('display', 'none')


		}
	});
})

$("#cnpj").blur(function() {
	let cnpj = $('#cnpj')
	const message = $("<p id='errMessageCnpj'></p>").text("CNPJ Inválido").css('color', '#FF0000');

	if (cnpjValido(cnpj.val())) {
		$("#btn-submit").removeAttr('disabled');
		cnpj.removeClass('err-message')
		$('#errMessageCnpj').css('display', 'none')
	} else {
		if ($("#cardCNPJ").find('#errMessageCnpj').length == 1) {
			$("#cardCNPJ").find('#errMessageCnpj' + this.value).remove()
		}
		$("#btn-submit").attr("disabled", "disabled");
		cnpj.addClass('err-message')
		$("#cardCNPJ").append(message)
		message.show()
	}
});


$('#ufNascimentoId').change(() => {
	$("#municipioNascimentoId").attr("disabled", false)
	$("#municipioNascimentoId").empty()
	$("#municipioNascimentoId").append("<option selected disabled>Selecione uma opção</option>")
	$.ajax({
		url: url_base + '/municipio/uf/' + $('#ufNascimentoId').val(),
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
})




$('#paisNascimentoId').change(() => {
	if ($('#paisNascimentoId').val() != 31) {

		$('#ufNascimentoId').val(28).trigger('change')
		$("#municipioNascimentoId").val(5571).trigger('change')
		$("#ufNascimentoId").attr("disabled", "disabled");
		$("#municipioNascimentoId").attr("disabled", "disabled");
	} else {
		$("#ufNascimentoId").removeAttr("disabled");
		$("#municipioNascimentoId").removeAttr("disabled");
	}
})


$('input[name="qualPreencher"]').click(function() {
	if ($(this).is(':checked')) {
		$("#certidaoNascimento").show();
		$("#certidaoCasamento").hide();

		$("input[name='certidaoNascimentoNumero']").attr("required", true);
		$("select[name='certidaoNascimentoMunicipioCartorioId']").attr("required", true).select2(); // Adiciona required e inicializa select2
		$("input[name='certidaoNascimentoCartorio']").attr("required", true);
		$("select[name='certidaoNascimentoUfCartorioId']").attr("required", true).select2(); // Adiciona required e inicializa select2
		$("input[name='certidaoNascimentoDataEmissao']").attr("required", true);
		$("input[name='certidaoNascimentoFolha']").attr("required", true);
		$("input[name='certidaoNascimentoLivro']").attr("required", true);
		$("input[name='certidaoNascimentoOrdem']").attr("required", true);

		$("input[name='certidaoCasamentoNumero']").attr("required", false);
		$("input[name='certidaoCasamentoCartorio']").attr("required", false);
		$("select[name='certidaoCasamentoUfCartorioId']").attr("required", false).select2(); // Remove required e inicializa select2
		$("select[name='certidaoCasamentoCidadeCartorioId']").attr("required", false).select2(); // Remove required e inicializa select2
		$("input[name='certidaoCasamentoFolha']").attr("required", false);
		$("input[name='certidaoCasamentoLivro']").attr("required", false);
		$("input[name='certidaoCasamentoOrdem']").attr("required", false);
		$("input[name='certidaoCasamentoDataEmissao']").attr("required", false);
	} else {
		$("#certidaoNascimento").hide();
		$("#certidaoCasamento").show();

		$("input[name='certidaoCasamentoNumero']").attr("required", true);
		$("input[name='certidaoCasamentoCartorio']").attr("required", true);
		$("select[name='certidaoCasamentoUfCartorioId']").attr("required", true).select2(); // Adiciona required e inicializa select2
		$("select[name='certidaoCasamentoCidadeCartorioId']").attr("required", true).select2(); // Adiciona required e inicializa select2
		$("input[name='certidaoCasamentoFolha']").attr("required", true);
		$("input[name='certidaoCasamentoLivro']").attr("required", true);
		$("input[name='certidaoCasamentoOrdem']").attr("required", true);
		$("input[name='certidaoCasamentoDataEmissao']").attr("required", true);

		$("input[name='certidaoNascimentoNumero']").attr("required", false);
		$("select[name='certidaoNascimentoMunicipioCartorioId']").attr("required", false).select2(); // Remove required e inicializa select2
		$("input[name='certidaoNascimentoCartorio']").attr("required", false);
		$("select[name='certidaoNascimentoUfCartorioId']").attr("required", false).select2(); // Remove required e inicializa select2
		$("input[name='certidaoNascimentoDataEmissao']").attr("required", false);
		$("input[name='certidaoNascimentoFolha']").attr("required", false);
		$("input[name='certidaoNascimentoLivro']").attr("required", false);
		$("input[name='certidaoNascimentoOrdem']").attr("required", false);
	}
});
