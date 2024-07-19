const contaId = sessionStorage.getItem('contaId')
const escolaId = sessionStorage.getItem('escolaId')
/*const usuarioId = sessionStorage.getItem("usuarioId")*/
let idCandidato = params.get("id");
let listaDocumentos = []
let idDoc = ''
let idPessoa = ''

$(document).ready(function() {
	var buttonId;

	loadSelects()
	getDadosCandidato()
	getDocumentos()
	/*getDadosResponsavel()*/

	if ($('input[id="qualPreencherResponsavel"]').is(':checked')) {
		$("#certidaoCasamentoResponsavel").hide()
		$("#certidaoNascimentoResponsavel").show()
	} else {
		$("#certidaoNascimentoResponsavel").hide()
		$("#certidaoCasamentoResponsavel").show()
	}

	/*if ($('input[id="qualPreencher"]').is(':checked')) {
		$("#certidaoCasamento").hide()
		$("#certidaoNascimento").show()
	} else {
		$("#certidaoNascimento").hide()
		$("#certidaoCasamento").show()
	}*/

	$.ajax({
		url: url_base + "/motivoReprovacaoDocumento/conta/" + contaId,
		type: "GET",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#motivoReprovacaoDocumentoId').append($('<option>', {
				value: item.idMotivoReprovacaoDocumento,
				text: item.motivoReprovacaoDocumento,
				name: item.motivoReprovacaoDocumento
			}));
		});
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação imagens 2 AJAX:", textStatus, errorThrown);
	});

})


const getDadosResponsavel = () => {
	$.ajax({
		url: url_base + '/papelPessoa/conta/' + contaId,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			if (item.ativo == "S") {
				$('#relacionamentoIdResponsavel').append($('<option>', {
					value: item.idPapelPessoa,
					text: item.papelPessoa,
					name: item.papelPessoa
				}));
			}
		});
	});

	$.ajax({
		url: url_base + '/raca',
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			if (item.ativo == "S") {
				$('#racaIdResponsavel').append($('<option>', {
					value: item.idRaca,
					text: item.raca,
					name: item.raca
				}));
			}
		});
	});

	$.ajax({
		url: url_base + '/paises',
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#paisNascimentoIdResponsavel').append($('<option>', {
				value: item.idPais,
				text: item.nomePais,
				name: item.nomePais
			}));

			$('#paisResidenciaIdResponsavel').append($('<option>', {
				value: item.idPais,
				text: item.nomePais,
				name: item.nomePais
			}));
		});
	});

	$.ajax({
		url: url_base + '/uf',
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#ufNascimentoIdResponsavel').append($('<option>', {
				value: item.idUf,
				text: item.codUf + " - " + item.nomeUf,
				name: item.codUf
			}));

			$('#rgUfEmissorIdResponsavel').append($('<option>', {
				value: item.idUf,
				text: item.codUf + " - " + item.nomeUf,
				name: item.codUf
			}));

			$('#rneUfEmissorIdResponsavel').append($('<option>', {
				value: item.idUf,
				text: item.codUf + " - " + item.nomeUf,
				name: item.codUf
			}));

			$('#certidaoNascimentoUfCartorioIdResponsavel').append($('<option>', {
				value: item.idUf,
				text: item.codUf + " - " + item.nomeUf,
				name: item.codUf
			}));

			$('#certidaoCasamentoUfCartorioIdResponsavel').append($('<option>', {
				value: item.idUf,
				text: item.codUf + " - " + item.nomeUf,
				name: item.codUf
			}));
		});
	});

	$.ajax({
		url: url_base + '/nacionalidade',
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#nacionalidadeIdResponsavel').append($('<option>', {
				value: item.idNacionalidade,
				text: item.nacionalidade,
				name: item.nacionalidade
			}));
		});
	});

	$.ajax({
		url: url_base + '/municipio',
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#municipioNascimentoIdResponsavel').append($('<option>', {
				value: item.idMunicipio,
				text: item.nomeMunicipio,
				name: item.nomeMunicipio
			}));

			$('#certidaoNascimentoMunicipioCartorioIdResponsavel').append($('<option>', {
				value: item.idMunicipio,
				text: item.nomeMunicipio,
				name: item.nomeMunicipio
			}));

			$('#certidaoNascimentoMunicipioCartorioIdResponsavel').append($('<option>', {
				value: item.idMunicipio,
				text: item.nomeMunicipio,
				name: item.nomeMunicipio
			}));
		});
	});

	$("#cep").blur(function() {
		$.ajax({
			url: 'https://viacep.com.br/ws/' + $('#cep').val().replace(/[^\d]+/g, '') + '/json/',
			type: "GET",
			contentType: "application/json; charset=utf-8",
			error: function(e) {
				console.log(e);
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Não foi possível realizar esse comando!",
				});
			}
		}).done(function(data) {
			$("#enderecoResponsavel").val(data.logradouro);
			$("#bairroResponsavel").val(data.bairro);
			$("#municipioResponsavel").val(data.localidade);
			$("#ufResponsavel").val(data.uf);
		});
	});


	$('#municipioNascimentoIdResponsavel').attr('disabled', false);
	$('#certidaoNascimentoMunicipioCartorioIdResponsavel').attr('disabled', false);
	$('#certidaoNascimentoMunicipioCartorioIdResponsavel').attr('disabled', false);

	$("isEnderecoAluno").hide();
	$.ajax({
		url: url_base + '/responsavel/pessoa/' + idPessoa,
		type: "get",
		async: false,
		error: function(e) {
			console.log(e);
		}
	}).done(function(data) {
		console.log(data);

		// Verificar se os dados de certidão de nascimento estão preenchidos
		if (data.certidaoNascimentoNumero !== null ||
			data.pessoa.certidaoNascimentoDataEmissao !== null ||
			data.pessoa.certidaoNascimentoFolha !== null ||
			data.pessoa.certidaoNascimentoLivro !== null ||
			data.pessoa.certidaoNascimentoOrdem !== null) {

			$('input[id="qualPreencherResponsavel"]').attr('checked', true);

			$("#certidaoCasamentoResponsavel").hide();
			$("#certidaoNascimentoResponsavel").show();

			$('#certidaoNascimentoNumeroResponsavel').val(data.pessoa.certidaoNascimentoNumero);
			$('#certidaoNascimentoCartorioResponsavel').val(data.pessoa.certidaoNascimentoCartorio);
			$('#certidaoNascimentoUfCartorioIdResponsavel').val(data.pessoa.certidaoNascimentoMunicipioCartorio.uf.idUf);
			$('#certidaoNascimentoMunicipioCartorioIdResponsavel').val(data.pessoa.certidaoNascimentoMunicipioCartorio.idMunicipio);
			$('#certidaoNascimentoDataEmissaoResponsavel').val(data.pessoa.certidaoNascimentoDataEmissao);
			$('#certidaoNascimentoFolhaResponsavel').val(data.pessoa.certidaoNascimentoFolha);
			$('#certidaoNascimentoLivroResponsavel').val(data.pessoa.certidaoNascimentoLivro);
			$('#certidaoNascimentoOrdemResponsavel').val(data.pessoa.certidaoNascimentoOrdem);
		} else if (data.pessoa.certidaoCasamentoCartorio !== null ||
			data.pessoa.certidaoCasamentoMunicipioCartorio !== null ||
			data.pessoa.certidaoCasamentoDataEmissao !== null ||
			data.pessoa.certidaoCasamentoFolha !== null ||
			data.pessoa.certidaoCasamentoLivro !== null ||
			data.pessoa.certidaoCasamentoOrdem !== null) {
			// Verificar se os dados de certidão de casamento estão preenchidos
			$('input[id="qualPreencherResponsavel"]').attr('checked', false);
			$("#certidaoNascimentoResponsavel").hide();
			$("#certidaoCasamentoResponsavel").show();
			$('#certidaoCasamentoNumeroResponsavel').val(data.pessoa.certidaoCasamentoNumero);
			$('#certidaoCasamentoCartorioResponsavel').val(data.pessoa.certidaoCasamentoCartorio);
			$('#certidaoCasamentoResponsavel').val(data.pessoa.certidaoCasamentoMunicipioCartorio);
			$('#certidaoCasamentoDataEmissaoResponsavel').val(data.pessoa.certidaoCasamentoDataEmissao);
			$('#certidaoCasamentoOrdemResponsavel').val(data.pessoa.certidaoCasamentoOrdem);
			$('#certidaoCasamentoFolhaResponsavel').val(data.pessoa.certidaoCasamentoFolha);
			$('#certidaoCasamentoLivroResponsavel').val(data.pessoa.certidaoCasamentoLivro);
		}

		// Preenchendo campos de input
		$('#nomeCompletoResponsavel').val(data.pessoa.nomeCompleto);
		$('#nomeSocialResponsavel').val(data.pessoa.nomeSocial);
		$('#cpfResponsavel').val(data.pessoa.cpf);
		$('#rgNumeroResponsavel').val(data.pessoa.rgNumero);
		$('#rgOrgaoExpedidorResponsavel').val(data.pessoa.rgOrgaoExpedidor);
		$('#rgDataExpedicaoResponsavel').val(data.pessoa.rgDataExpedicao);
		$('#dtNascimentoResponsavel').val(data.pessoa.dtNascimento);
		$('#sexo_' + data.pessoa.sexo + 'Responsavel').prop('checked', true); // Supondo que o valor de 'sexo' seja uma string como 'M' ou 'F'
		$('#estadoCivil_' + data.pessoa.estadoCivil + 'Responsavel').prop('checked', true); // Supondo que o valor de 'estadoCivil' seja uma string como 'SO' ou 'CA'
		$('#cepResponsavel').val(data.pessoa.cep);
		$('#enderecoResponsavel').val(data.pessoa.endereco);
		$('#numeroResponsavel').val(data.pessoa.numero);
		$('#complementoResponsavel').val(data.pessoa.complemento);
		$('#bairroResponsavel').val(data.pessoa.bairro);
		$('#municipioResponsavel').val(data.pessoa.municipio);
		$('#distritoResponsavel').val(data.pessoa.distrito);
		$('#ufResponsavel').val(data.pessoa.uf);
		$('#telefoneResponsavel').val(data.pessoa.telefone);
		$('#celularResponsavel').val(data.pessoa.celular);
		$('#emailResponsavel').val(data.pessoa.email);
		$('#empresaResponsavel').val(data.pessoa.empresa);
		$('#ocupacaoResponsavel').val(data.pessoa.ocupacao);
		$('#telefoneComercialResponsavel').val(data.pessoa.telefoneComercial);

		// Preenchendo campos de select (exemplo com raca, nacionalidade, paisNascimento, paisResidencia)
		$('#racaIdResponsavel').val(data.pessoa.raca.idRaca);
		$('#nacionalidadeIdResponsavel').val(data.pessoa.nacionalidadeId.idNacionalidade);
		$('#paisNascimentoIdResponsavel').val(data.pessoa.paisNascimento.idPais);
		$('#paisResidenciaIdResponsavel').val(data.pessoa.paisResidencia.idPais);
		$('#relacionamentoIdResponsavel').val(data.idPapelPessoa);

		// Exemplo de preenchimento para campos específicos como certidaoNascimentoNumero, certidaoCasamentoNumero, etc.
		$('#certidaoNascimentoNumeroResponsavel').val(data.pessoa.certidaoNascimentoNumero);
		$('#certidaoCasamentoNumeroResponsavel').val(data.pessoa.certidaoCasamentoNumero);

		// Aqui você pode adicionar os demais campos conforme necessário

		// Exemplo para preenchimento de campo select com município de nascimento
		$('#municipioNascimentoIdResponsavel').val(data.pessoa.municipioNascimento.idMunicipio);
		$('#ufNascimentoIdResponsavel').val(data.pessoa.municipioNascimento.uf.idUf);
		$('#rgUfEmissorIdResponsavel').val(data.pessoa.rgUfEmissor.idUf);

		// Exemplo para estado civil usando radio button
		$('input[name="estadoCivilResponsavel"][value="' + data.pessoa.estadoCivil + '"]').prop('checked', true); // Supondo que o valor de 'estadoCivil' seja uma string como 'SO' ou 'CA'

		$(".bg-loading").addClass("none");
		$(".bg-loading").fadeOut();
	});

}

const loadSelects = () => {
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
}

const getDadosCandidato = () => {
	$.ajax({
		url: url_base + "/candidatos/" + idCandidato,
		type: "GET",
		async: false,
		error: function(e) {
			console.log(e)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!"

			});
		}
	}).done(function(response) {
		idPessoa = response.pessoa
		$.ajax({
			url: url_base + '/pessoas/' + response.pessoa,
			type: "get",
			async: false,
			error: function(e) {
				console.log(e)
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Não foi possível realizar esse comando!"

				});
			}
		}).done(function(data) {
			// Preenchendo campos de input
			$('#nomeCompleto').val(data.nomeCompleto);
			$('#nomeMae').val(data.nomeMae);
			$('#nomePai').val(data.nomePai);
			$('#nomeSocial').val(data.nomeSocial);
			$('#cpf').val(data.cpf);
			$('#rgNumero').val(data.rgNumero);
			$('#rgOrgaoExpedidor').val(data.rgOrgaoExpedidor);
			$('#rgDataExpedicao').val(data.rgDataExpedicao);
			$('#dtNascimento').val(data.dtNascimento);
			$('#tipoIngressoId').val(response.tipoIngresso.idTipoIngresso)
			if (data.sexo === 'M') {
				$('input[id="masculino"]').prop('checked', true)
			} else {
				$('input[id="feminino"]').prop('checked', true)
			} // Supondo que o valor de 'sexo' seja uma string como 'M' ou 'F'
			$('#sexo_' + data.estadoCivil).prop('checked', true);
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

			// Preenchendo campos de select (exemplo com raca, nacionalidade, paisNascimento, paisResidencia)
			$('#racaId').val(data.raca.idRaca);
			$('#nacionalidadeId').val(data.nacionalidadeId.idNacionalidade);
			$('#paisNascimentoId').val(data.paisNascimento.idPais);
			$('#paisResidenciaId').val(data.paisResidencia.idPais);
			$('#relacionamentoId').val(data.idPapelPessoa);
			/*  $('#nacionalidadeId').val(data.nacionalidadeId.idNacionalidade).attr("selected", true);;
				$('#paisNascimentoId').val(data.paisNascimento.idPais).attr("selected", true);;
				$('#paisResidenciaId').val(data.paisResidencia.idPais).attr("selected", true);;
				$('#ufNascimentoId').val(data.municipioNascimento.ufId).attr("selected", true);*/

			// Exemplo de preenchimento para campos específicos como certidaoNascimentoNumero, certidaoCasamentoNumero, etc.
			$('#certidaoNascimentoNumero').val(data.certidaoNascimentoNumero);
			$('#certidaoCasamentoNumero').val(data.certidaoCasamentoNumero);

			// Aqui você pode adicionar os demais campos conforme necessário
			// Exemplo para preenchimento de campo select com município de nascimento
			$('#municipioNascimentoId').val(data.municipioNascimento.idMunicipio);
			$('#ufNascimentoId').val(data.municipioNascimento.ufId);
			$('#rgUfEmissorId').val(data.rgUfEmissor.idUf);

			if (data.certidaoNascimentoNumero !== null ||
				data.certidaoNascimentoDataEmissao !== null ||
				data.certidaoNascimentoFolha !== null ||
				data.certidaoNascimentoLivro !== null ||
				data.certidaoNascimentoOrdem !== null) {

				$('input[id="qualPreencher"]').prop('checked', true)

				$("#certidaoCasamento").hide()
				$("#certidaoNascimento").show()


				$('#certidaoNascimentoNumero').val(data.certidaoNascimentoNumero);
				$('#certidaoNascimentoCartorio').val(data.certidaoNascimentoCartorio);
				$('#certidaoNascimentoUfCartorioId').val(data.certidaoNascimentoMunicipioCartorio.idUf);
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
					$('#certidaoNascimentoMunicipioCartorioId').val(data.certidaoNascimentoMunicipioCartorio.idMunicipio);
				})
				$('#certidaoNascimentoDataEmissao').val(data.certidaoNascimentoDataEmissao);
				$('#certidaoNascimentoFolha').val(data.certidaoNascimentoFolha);
				$('#certidaoNascimentoLivro').val(data.certidaoNascimentoLivro);
				$('#certidaoNascimentoOrdem').val(data.certidaoNascimentoOrdem);
			} else if (data.certidaoCasamentoCartorio !== null ||
				data.certidaoCasamentoMunicipioCartorio !== null ||
				data.certidaoCasamentoDataEmissao !== null ||
				data.certidaoCasamentoFolha !== null ||
				data.certidaoCasamentoLivro !== null ||
				data.certidaoCasamentoOrdem !== null) {
				$('input[id="qualPreencher"]').attr('checked', false)
				$("#certidaoNascimento").hide()
				$("#certidaoCasamento").show()
				$('#certidaoCasamentoNumero').val(data.certidaoCasamentoNumero);
				$('#certidaoCasamentoCartorio').val(data.certidaoCasamentoCartorio);
				$('#certidaoCasamentoDataEmissao').val(data.certidaoCasamentoDataEmissao);
				$('#certidaoCasamentoOrdem').val(data.certidaoCasamentoOrdem);
				$('#certidaoCasamentoFolha').val(data.certidaoCasamentoFolha);
				$('#certidaoCasamentoLivro').val(data.certidaoCasamentoLivro);
				$('#certidaoCasamentoUfCartorioId').val(data.certidaoCasamentoMunicipioCartorio);
				$('#certidaoCasamento').val(data.certidaoCasamentoMunicipioCartorio);

			}

			// Exemplo para estado civil usando radio button
			$('input[name="estadoCivil"][value="' + data.estadoCivil + '"]').prop('checked', true); // Supondo que o valor de 'estadoCivil' seja uma string como 'SO' ou 'CA'

			$(".bg-loading").addClass("none");
			$(".bg-loading").fadeOut();
		})
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação candidato AJAX:", textStatus, errorThrown);
	});

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

	$('#municipioNascimentoId').attr('disabled', false)
	$('#certidaoNascimentoMunicipioCartorioId').attr('disabled', false)
	$('#certidaoNascimentoMunicipioCartorioId').attr('disabled', false)

	$("isEnderecoAluno").hide()
}

const getDocumentos = () => {
	$.ajax({
		url: url_base + "/candidatoDocumentoIngresso/candidato/" + idCandidato,
		type: "GET",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			let img = { "caminho": item.docFileServer }
			console.log(item)
			/*$.ajax({
				url: url_base + `/candidatoDocumentoIngresso/${item.idCandidatoDocumentoIngresso}/arquivo`,
				type: "GET",
				data: JSON.stringify(img),
				async: false,
			}).done(function(response) {
				alert(item.obsAprovacao + ' ' + index)
				if (item.obsAprovacao == 'CN') {
					$('#docCN').attr('href', './pdfCN.pdf');
				} else {
					$('#docCR').attr('href', './pdfCR.pdf');
				}
			}).fail(function(jqXHR, textStatus, errorThrown) {
				console.error("Erro na solicitação de imagens AJAX:", textStatus, errorThrown);
			});*/
			if (index == 0) {
				$('#reprovarCR').attr('data-id', item.idCandidatoDocumentoIngresso);
				$('#aprovarCR').attr('data-id', item.idCandidatoDocumentoIngresso);
				$('#docCR').attr('href', '../../../resources/js/reservaVaga/pdfCR.pdf');
			} else {
				$('#reprovarCN').attr('data-id', item.idCandidatoDocumentoIngresso);
				$('#aprovarCN').attr('data-id', item.idCandidatoDocumentoIngresso);
				$('#docCN').attr('href', '../../../resources/js/reservaVaga/pdfCN.pdf');
			}
		});

	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação imagens 2 AJAX:", textStatus, errorThrown);
	});

	// Configura o evento de clique para iniciar o download
	$('#docCN, #docCR').on('click', function(event) {
		// Impede o comportamento padrão do link
		event.preventDefault();

		// Obtém o URL do arquivo a ser baixado do atributo href
		var downloadUrl = $(this).attr('href');

		console.log(downloadUrl)

		// Cria um link temporário para iniciar o download
		var link = document.createElement('a');
		link.href = downloadUrl;
		link.download = 'documento.pdf'; // Nome do arquivo a ser baixado

		// Adiciona o link ao corpo do documento e simula um clique para iniciar o download
		document.body.appendChild(link);
		link.click();

		// Remove o link do corpo do documento depois que o download começar
		document.body.removeChild(link);
	});
}

$('#reprovarCR').click(() => {
	$('#title-edit').text('Comprovante de residência')
	idDoc = $('#reprovarCR').attr('data-id')
	console.log(idDoc)
})

$('#aprovarCR').click(() => {
	$('#title-aprovar').text('Comprovante de residência')
	idDoc = $('#aprovarCR').attr('data-id')
	console.log(idDoc)
})

$('#reprovarCN').click(() => {
	$('#title-edit').text('Certidão de nascimento')
	idDoc = $('#reprovarCN').attr('data-id')
	console.log(idDoc)
})

$('#aprovarCN').click(() => {
	$('#title-aprovar').text('Certidão de nascimento')
	idDoc = $('#aprovarCN').attr('data-id')
	console.log(idDoc)
})

const reprovarDocumento = () => {
	var now = new Date();
	var isoDateTime = now.toISOString();

	let dadosFormulario = {
		"idCandidatoDocumentoIngresso": idDoc,
		"candidatoId": idCandidato,
		"docAprovado": 'N',
		"dataAprovacao": isoDateTime,
		"motivoReprovacaoDocumentoId": $('#motivoReprovacaoDocumentoId').val(),
		"obsAprovacao": $('#obsAprovacao').val() == '' ? null : $('obsAprovacao').val(),
		"usuarioAprovacaoId": usuarioId
	}

	console.log(dadosFormulario)


	$.ajax({
		url: url_base + '/candidatoDocumentoIngresso',
		type: "PUT",
		data: JSON.stringify(dadosFormulario),
		contentType: "application/json; charset=utf-8",
		beforeSend: function() {
			Swal.showLoading();
		},
		error: function(e) {
			Swal.close();
			console.log(e)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível reprovar esse documento no momento!",
			});
		}
	}).done(function(data) {
		Swal.close();
		Swal.fire({
			title: "Documento Reprovado",
			icon: "success",
		})
	});
}

const aprovarDocumento = () => {
	var now = new Date();
	var isoDateTime = now.toISOString();

	let dadosFormulario = {
		"idCandidatoDocumentoIngresso": idDoc,
		"candidatoId": idCandidato,
		"docAprovado": 'S',
		"dataAprovacao": isoDateTime,
		"motivoReprovacaoDocumentoId": null,
		"obsAprovacao": $('#obsAprovacao').val() == '' ? null : $('obsAprovacao').val(),
		"usuarioAprovacaoId": usuarioId
	}

	console.log(dadosFormulario)


	$.ajax({
		url: url_base + '/candidatoDocumentoIngresso',
		type: "PUT",
		data: JSON.stringify(dadosFormulario),
		contentType: "application/json; charset=utf-8",
		beforeSend: function() {
			Swal.showLoading();
		},
		error: function(e) {
			Swal.close();
			console.log(e)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível reprovar esse documento no momento!",
			});
		}
	}).done(function(data) {
		Swal.close();
		Swal.fire({
			title: "Documento Aprovado",
			icon: "success",
		})
	});
}

$("#formDoc").on("submit", function(e) {
	e.preventDefault();
	reprovarDocumento();
	limparCampos()
	return false;
});

$("#formDocAprovar").on("submit", function(e) {
	e.preventDefault();
	aprovarDocumento();
	limparCampos()
	return false;
});

const limparCampos = () => {
	$('#motivoReprovacaoDocumentoId').val(0)
	$('#obsAprovacao').val('')
}

$('input[name="qualPreencher"]').click(function() {
	console.log($('input[name="qualPreencher"]').attr('checked'))
	console.log($('input[name="qualPreencher"]').val())
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
		$("[name='certidaoNascimentoFolha']").attr("required", false);
		$("[name='certidaoNascimentoLivro']").attr("required", false);
		$("[name='certidaoNascimentoOrdem']").attr("required", false);

	}
});