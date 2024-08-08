const contaId = localStorage.getItem('contaId')
var idPessoa = 0
var numeroCandidato = 0
var ofertaConcursoId = 0
var aprovado = ""
var usuarioAprovacaoId = 0
var classificacao = ""


$(document).ready(function() {

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



	/*$.ajax({
		url: url_base + "/pessoas",
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#pessoaId").append(
				$("<option>", {
					value: item.idPessoa,
					text: item.nome,
					name: item.nome,
				})
			);
		});
	});

	$.ajax({
		url: url_base + "/situacaoProfessor",
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#situacaoProfessorId").append(
				$("<option>", {
					value: item.idSituacaoProfessor,
					text: item.situacaoProfessor,
					name: item.situacaoProfessor,
				})
			);
		});
	});

	$.ajax({
		url: url_base + "/nivelEscolaridade",
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#nivelEscolaridadeId").append(
				$("<option>", {
					value: item.idNivelEscolaridade,
					text: item.nivelEscolaridade,
					name: item.nivelEscolaridade,
				})
			);
		});
	});

	$.ajax({
		url: url_base + "/tipoEnsinoMedio",
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#tipoEnsinoMedioId").append(
				$("<option>", {
					value: item.idTipoEnsinoMedio,
					text: item.tipoEnsinoMedio,
					name: item.tipoEnsinoMedio,
				})
			);
		});
	});*/
});

$('#formNovoCadastro').submit(function(event) {
	event.preventDefault();

	let cpf = $('#cpf').val().replace(/[^\d]+/g, '')

	if (cpf == "") {
		cpf = null
	}
	
	const formDataLimpoPessoaDTO = {};
	const formDataLimpoProfessorDTO = {};


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
			"pessoaId": 2,
		},
		professorDTO: {
			"pessoaId": 2,
			"contaId": contaId,
			"codigoInep": $("#codigoInep").val(),
			"matricula": $("#matricula").val(),
			"usuario": $("#usuario").val(),
			"senha": $("#senha").val(),
<<<<<<< Updated upstream
			"emailInstitucional": $("#emailInstucional").val(),
=======
			"emailInstitucional": $("#emailInstitucional").val(),
>>>>>>> Stashed changes
			"dataContratacao": $("#dataContratacao").val(),
			"dataDemissao": $("#dataDemissao").val()
		}
	}
<<<<<<< Updated upstream
=======

	$.ajax({
		url: url_base + "/professores/pessoa-professor",
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
		window.location.href = "professores";
	});
});
>>>>>>> Stashed changes

	for (const key in dadosFormulario.pessoaDTO) {
		if (Object.hasOwnProperty.call(dadosFormulario.pessoaDTO, key)) {
			if (dadosFormulario.pessoaDTO[key] == 0) {
				dadosFormulario.pessoaDTO[key] = null
			}
			formDataLimpoPessoaDTO[key] = dadosFormulario.pessoaDTO[key]
		}
	}

	for (const key in dadosFormulario.professorDTO) {
		if (Object.hasOwnProperty.call(dadosFormulario.professorDTO, key)) {
			if (dadosFormulario.professorDTO[key] == 0) {
				dadosFormulario.professorDTO[key] = null
			}
			formDataLimpoProfessorDTO[key] = dadosFormulario.professorDTO[key]
		}
	}

	dadosFormulario.pessoaDTO = formDataLimpoPessoaDTO
	dadosFormulario.professorDTO = formDataLimpoProfessorDTO
	
	
	$.ajax({
		url: url_base + "/professores",
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
			$('#certidaoCasamentoCidadeCartorioId').append($('<option>', {
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
