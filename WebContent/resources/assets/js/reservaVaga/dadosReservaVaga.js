const contaId = sessionStorage.getItem('contaId')
const escolaId = sessionStorage.getItem('escolaId')
/*const usuarioId = sessionStorage.getItem("usuarioId")*/
let idCandidato = params.get("id");
let listaDocumentos = []
let idDoc = ''
let idPessoa = ''

$(document).ready(function() {
	var buttonId;
	$('#nav-dados-aluno input, #nav-dados-aluno select').attr('disabled', true);
	$('#nav-responsavel input, #nav-responsavel select').attr('disabled', true);
	localStorage.setItem("idCandidato", idCandidato)
	$('#municipioNascimentoId').attr('disabled', true);

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

	getDocumentos()
	loadSelects()
	getDadosCandidato()
	getDadosResponsavel()
	/*getDadosResponsavel()*/
	/*if ($('input[id="qualPreencher"]').is(':checked')) {
		$("#certidaoCasamento").hide()
		$("#certidaoNascimento").show()
	} else {
		$("#certidaoNascimento").hide()
		$("#certidaoCasamento").show()
	}*/
	$('#nav-dados-aluno input, #nav-dados-aluno select').attr('disabled', true);
	$('#nav-responsavel input, #nav-responsavel select').attr('disabled', true);
	$('#nav-disabled input, #nav-disabled select').attr('disabled', true);
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


	$('#municipioNascimentoIdResponsavel').attr('disabled', true);
	$('#certidaoNascimentoMunicipioCartorioIdResponsavel').attr('disabled', true);
	$('#certidaoNascimentoMunicipioCartorioIdResponsavel').attr('disabled', true);

	$("isEnderecoAluno").hide();
	console.log(idPessoa)

	$.ajax({
		url: url_base + '/responsavel/candidato/' + idCandidato,
		type: "get",
		async: false,
		error: function(e) {
			console.log(e);
		}
	}).done(function(data) {
		listarDados(data)
	});

	$.ajax({
		url: url_base + '/fichasMedicas/pessoa/' + idPessoa,
		type: "get",
		async: false,
		error: function(e) {
			console.log(e);
		}
	}).done(function(data) {
		listarFichaMedica(data)
	});
}

const listarDados = (dadosTabela) => {
	var html = dadosTabela.map(function(item) {
		console.log(item);

		let estadoCivil = '';

		if (item.pessoa.estadoCivil === 'so') {
			estadoCivil = 'Solteiro';
		} else if (item.pessoa.estadoCivil === 'ca') {
			estadoCivil = 'Casado';
		} else if (item.pessoa.estadoCivil === 'di') {
			estadoCivil = 'Divorciado';
		} else if (item.pessoa.estadoCivil === 'vi') {
			estadoCivil = 'Viúvo';
		} else if (item.pessoa.estadoCivil === 'se') {
			estadoCivil = 'Separado';
		}

		return (
			"<tr>" +
			"<td>" + item.pessoa.nomeCompleto + "</td>" +
			"<td>" + item.papelPessoa + "</td>" +
			"<td>" + estadoCivil + "</td>" +
			'<td class="d-flex justify-content-center"><span style="width: 63px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-id="' +
			item.idResponsavel +
			'" onclick="showResponsavel(this)"><i class="fa-solid fa-pen fa-lg"></i></span></td>' +
			"</tr>"
		);
	}).join("");

	$("#cola-tabela").html(html);
};

const listarFichaMedica = (dadosTabela) => {
	var html = dadosTabela.map(function(item) {
		console.log(item);

		return (
			"<tr>" +
			"<td>" + item.peso + "</td>" +
			"<td>" + item.altura + "</td>" +
			"<td>" + item.planoSaude + "</td>" +
			'<td class="d-flex justify-content-center"><span style="width: 63px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-id="' +
			item.idPessoaFichaMedica +
			'" onclick="showFichaMedica(this)"><i class="fa-solid fa-pen fa-lg"></i></span></td>' +
			"</tr>"
		);
	}).join("");

	$("#tabela-ficha").html(html);
};

const showFichaMedica = (ref) => {
	window.location.href = "reserva-ficha?idPessoaFichaMedica=" + ref.getAttribute("data-id");
}

const showResponsavel = (ref) => {
	window.location.href = "dadosResponsavel?idResponsavel=" + ref.getAttribute("data-id");
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
		console.log(idPessoa)

		if (response.aprovado == 'S') {
			$('#aprovarCandidato').hide()
			$('#reprovarCandidato').css('display', 'flex')
			$('#reprovarCandidato').css('gap', '0.5rem')
			$('#reprovarCandidato').css('align-items', 'center')
		} else if (response.aprovado == 'N') {
			$('#reprovarCandidato').hide()
			$('#aprovarCandidato').css('display', 'flex')
			$('#aprovarCandidato').css('gap', '0.5rem')
			$('#aprovarCandidato').css('align-items', 'center')
		} else {
			$('#aprovarCandidato').css('display', 'flex')
			$('#aprovarCandidato').css('gap', '0.5rem')
			$('#aprovarCandidato').css('align-items', 'center')
			$('#reprovarCandidato').css('display', 'flex')
			$('#reprovarCandidato').css('gap', '0.5rem')
			$('#reprovarCandidato').css('align-items', 'center')
		}


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

				$('input[id="qualPreencher"]').attr('checked', true)

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

	$('#municipioNascimentoId').attr('disabled', true)
	$('#certidaoNascimentoMunicipioCartorioId').attr('disabled', true)
	$('#certidaoNascimentoMunicipioCartorioId').attr('disabled', true)

	$("isEnderecoAluno").hide()

}

const getDocumentos = () => {
	$.ajax({
		url: url_base + "/candidatoDocumentoIngresso/candidato/" + idCandidato,
		type: "GET",
		async: false,
	}).done(function(data) {
		if (data.length == 0) {
			$('.containerBtnCR').attr("hidden", true);
			$('.containerBtnCN').attr("hidden", true);
		} else if (data.length == 1) {
			$('.containerBtnCR').css('display', 'flex')
			$('.containerBtnCR').css('gap', '0.5rem')
			$('.containerBtnCN').attr("hidden", true);
			$('.semDocCR').hide()
		} else {
			$('.containerBtnCR').css('display', 'flex')
			$('.containerBtnCR').css('gap', '0.5rem')
			$('.containerBtnCN').css('display', 'flex')
			$('.containerBtnCN').css('gap', '0.5rem')
			$('.semDocCR').hide()
			$('.semDocCN').hide()
			$.each(data, function(index, item) {
				let img = { "caminho": item.docFileServer }
				let text = ''
				let color = null

				if (item.docAprovado == null) {
					text = 'Em aprovação'
					if (index == 0) {
						$('#reprovarCR').attr('data-id', item.idCandidatoDocumentoIngresso);
						$('#aprovarCR').attr('data-id', item.idCandidatoDocumentoIngresso);
						$('#docCR').attr('href', '../../../resources/js/reservaVaga/pdfCR.pdf');

						const message = $("<p class='form-label fw-semibold'></p>").text(text)
						$("#boxTxtCR").append(message)
					} else {
						$('#reprovarCN').attr('data-id', item.idCandidatoDocumentoIngresso);
						$('#aprovarCN').attr('data-id', item.idCandidatoDocumentoIngresso);
						$('#docCN').attr('href', '../../../resources/js/reservaVaga/pdfCN.pdf');

						const message = $("<p class='form-label fw-semibold'></p>").text(text)
						$("#boxTxtCN").append(message)
					}
				} else {
					if (item.docAprovado == 'S') {
						text = 'Aprovado'
						color = '#157347'
					} else {
						text = 'Reprovado'
						color = '#BB2D3B'
					}

					if (index == 0) {
						if (item.docAprovado == 'S') {
							$('#aprovarCR').hide()
							$('#reprovarCR').attr('data-id', item.idCandidatoDocumentoIngresso);
						} else {
							$('#reprovarCR').hide()
							$('#aprovarCR').attr('data-id', item.idCandidatoDocumentoIngresso);
						}

						$('#docCR').attr('href', '../../../resources/js/reservaVaga/pdfCR.pdf');
						const message = $("<p class='form-label fw-semibold'></p>").text(text).css('color', color != null ? color : '');
						$("#boxTxtCR").append(message)
					} else {
						if (item.docAprovado == 'S') {
							$('#aprovarCN').hide()
							$('#reprovarCN').attr('data-id', item.idCandidatoDocumentoIngresso);
						} else {
							$('#reprovarCN').hide()
							$('#aprovarCN').attr('data-id', item.idCandidatoDocumentoIngresso);
						}

						$('#docCN').attr('href', '../../../resources/js/reservaVaga/pdfCR.pdf');
						const message = $("<p class='form-label fw-semibold'></p>").text(text).css('color', color != null ? color : '');
						$("#boxTxtCN").append(message)
					}
				}
			})
		}
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação imagens 2 AJAX:", textStatus, errorThrown);
	});
}


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

const editarCandidato = () => {
	window.location.href = "dados-aluno?idCandidato=" + idCandidato;
}


$('#reprovarCR').click(() => {
	$('#obsAprovacao').attr('disabled', false);
	$('#obsAprovacaoID').attr('disabled', false);
	$('#title-edit').text('Comprovante de residência')
	idDoc = $('#reprovarCR').attr('data-id')
	console.log(idDoc)
})

$('#aprovarCR').click(() => {
	$('#obsAprovacaoID').attr('disabled', false);
	$('#obsAprovacao').attr('disabled', false);
	$('#title-aprovar').text('Comprovante de residência')
	idDoc = $('#aprovarCR').attr('data-id')
	console.log(idDoc)
})

$('#reprovarCN').click(() => {
	$('#obsAprovacao').attr('disabled', false);
	$('#obsAprovacaoID').attr('disabled', false);
	$('#title-edit').text('Certidão de nascimento')
	idDoc = $('#reprovarCN').attr('data-id')
	console.log(idDoc)
})

$('#aprovarCN').click(() => {
	$('#obsAprovacaoID').attr('disabled', false);
	$('#obsAprovacao').attr('disabled', false);
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
		}).then(result => {
			window.location.reload()
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
		}).then(result => {
			window.location.reload()
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
	console.log($('input[name="qualPreencher"]').is(':checked'))
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

$('input[name="qualPreencherResponsavel"]').click(function() {
	console.log($('input[name="qualPreencher"]').attr('checked'))
	console.log($('input[name="qualPreencher"]').is(':checked'))
	if ($(this).is(':checked')) {
		$("#certidaoNascimentoResponsavel").show();
		$("#certidaoCasamentoResponsavel").hide();
		$("[name='certidaoNascimentoNumeroResponsavel']").attr("required", true);
		$("[name='certidaoNascimentoCidadeCartorioResponsavel']").attr("required", true);
		$("[name='certidaoNascimentoCartorioResponsavel']").attr("required", true);
		$("[name='certidaoNascimentoUfCartorioIdResponsavel']").attr("required", true);
		$("[name='certidaoNascimentoDataEmissaoResponsavel']").attr("required", true);
		$("[name='certidaoNascimentoFolhaResponsavel']").attr("required", true);
		$("[name='certidaoNascimentoLivroResponsavel']").attr("required", true);
		$("[name='certidaoNascimentoOrdemResponsavel']").attr("required", true);

		$("[name='certidaoCasamentoNumeroResponsavel']").attr("required", false);
		$("[name='certidaoCasamentoCartorioResponsavel']").attr("required", false);
		$("[name='certidaoCasamentoUfCartorioIdResponsavel']").attr("required", false);
		$("[name='certidaoCasamentoCidadeCartorioResponsavel']").attr("required", false);
		$("[name='certidaoCasamentoFolhaResponsavel']").attr("required", false);
		$("[name='certidaoCasamentoLivroResponsavel']").attr("required", false);
		$("[name='certidaoCasamentoOrdemResponsavel']").attr("required", false);
		$("[name='certidaoCasamentoDataEmissaoResponsavel']").attr("required", false);
	} else {
		$("#certidaoNascimentoResponsavel").hide();
		$("#certidaoCasamentoResponsavel").show();
		$("[name='certidaoCasamentoNumeroResponsavel']").attr("required", true);
		$("[name='certidaoCasamentoCartorioResponsavel']").attr("required", true);
		$("[name='certidaoCasamentoUfCartorioIdResponsavel']").attr("required", true);
		$("[name='certidaoCasamentoCidadeCartorioResponsavel']").attr("required", true);
		$("[name='certidaoCasamentoFolhaResponsavel']").attr("required", true);
		$("[name='certidaoCasamentoLivroResponsavel']").attr("required", true);
		$("[name='certidaoCasamentoOrdemResponsavel']").attr("required", true);
		$("[name='certidaoCasamentoDataEmissaoResponsavel']").attr("required", true);

		$("[name='certidaoNascimentoNumeroResponsavel']").attr("required", false);
		$("[name='certidaoNascimentoCidadeCartorioResponsavel']").attr("required", false);
		$("[name='certidaoNascimentoCartorioResponsavel']").attr("required", false);
		$("[name='certidaoNascimentoUfCartorioIdResponsavel']").attr("required", false);
		$("[name='certidaoNascimentoDataEmissaoResponsavel']").attr("required", false);
		$("[name='certidaoNascimentoFolhaResponsavel']").attr("required", false);
		$("[name='certidaoNascimentoLivroResponsavel']").attr("required", false);
		$("[name='certidaoNascimentoOrdemResponsavel']").attr("required", false);
	}
});

const aprovarCandidato = () => {
	Swal.fire({
		title: "Deseja mesmo aprovar esse candidato?",
		icon: "question",
		showCancelButton: true,
		showConfirmButton: true,
		showDenyButton: false,
		confirmButtonText: 'Aprovar',
		cancelButtonText: 'Cancelar'
	}).then(result => {
		if (result.isConfirmed) {
			$.ajax({
				url: url_base + "/candidatos/" + Number(idCandidato) + '/aprovar',
				type: "put",
				contentType: "application/json; charset=utf-8",
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
				Swal.fire({
					title: "Aprovado com sucesso",
					icon: "success",
				}).then((data) => {
					window.location.href = 'reservas'
				})
			})
		} else if (result.isCanceled) { }
	})
}

const reprovarCandidato = () => {
	Swal.fire({
		title: "Deseja mesmo reprovar esse candidato?",
		icon: "question",
		showCancelButton: true,
		showConfirmButton: false,
		showDenyButton: true,
		denyButtonText: 'Reprovar',
		cancelButtonText: 'Cancelar'
	}).then(result => {
		if (result.isDenied) {
			$.ajax({
				url: url_base + "/candidatos/" + Number(idCandidato) + '/reprovar',
				type: "put",
				contentType: "application/json; charset=utf-8",
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
				Swal.fire({
					title: "Reprovado com sucesso",
					icon: "success",
				}).then((data) => {
					window.location.href = 'reservas'
				})
			})
		} else if (result.isCanceled) { }
	})
}

function showPage(page) {
	var start = (page - 1) * rows;
	var end = start + rows;

	$('#cola-tabela tr').hide();
	$('#cola-tabela tr').slice(start, end).show();
}

function toggleNavigation() {
	var totalRows = $('#tabela-ficha tr').length;
	var totalPages = Math.ceil(totalRows / rows);

	$('#prevFicha').prop('disabled', currentPage === 1);
	$('#nextFicha').prop('disabled', currentPage === totalPages);

	$('#pagination-ficha').toggle(totalRows > 0);

	$('#page-numbers-ficha').empty();

	if (totalRows > 0) {
		var startPage = Math.max(1, Math.min(currentPage - Math.floor(pagesToShow / 2), totalPages - pagesToShow + 1));
		var endPage = Math.min(totalPages, startPage + pagesToShow - 1);

		if (startPage > 1) {
			$('#page-numbers-ficha').append('<button class="btn btn-sm btn-page" data-page="1">1</button>');
			if (startPage > 2) {
				$('#page-numbers-ficha').append('<span>...</span>');
			}
		}

		for (var i = startPage; i <= endPage; i++) {
			var btnClass = (i === currentPage) ? 'btn btn-sm btn-page active-page' : 'btn btn-sm btn-page';
			$('#page-numbers-ficha').append('<button class="' + btnClass + '" data-page="' + i + '">' + i + '</button>');
		}

		if (endPage < totalPages) {
			if (endPage < totalPages - 1) {
				$('#page-numbers-ficha').append('<span>...</span>');
			}
			$('#page-numbers-ficha').append('<button class="btn btn-sm btn-page" data-page="' + totalPages + '">' + totalPages + '</button>');
		}

		$('.btn-page-ficha').click(function() {
			goToPage(parseInt($(this).data('page')));

		});
	}
}


function updatePagination() {
	toggleNavigation();
}

function goToPage(page) {
	if (page >= 1 && page <= Math.ceil($('#tabela-ficha tr').length / rows)) {
		currentPage = page;
		showPage(currentPage);
		updatePagination();

	}
}


$('#prevFicha').click(function() {
	goToPage(currentPage - 1);
});

$('#nextFicha').click(function() {
	goToPage(currentPage + 1);
});



