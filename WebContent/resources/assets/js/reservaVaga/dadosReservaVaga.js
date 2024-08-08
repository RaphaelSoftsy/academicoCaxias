const contaId = localStorage.getItem('contaId')
const escolaId = sessionStorage.getItem('escolaId')
let idCandidato = params.get("id");
let listaDocumentos = []
let idDoc = ''
let idPessoa = ''
let idResponsavel = ''
let idFichaMedica = ''
let nomeCandidato = ""

$(document).ready(function() {
	var triggerTabList = [].slice.call(document.querySelectorAll('#nav-tab button'))
	triggerTabList.forEach(function(triggerEl) {
		var tabTrigger = new bootstrap.Tab(triggerEl)
		triggerEl.addEventListener('click', function(event) {
			event.preventDefault()
			tabTrigger.show()
		})
	})

	/*$.ajax({
		url: url_base + "/responsavel/candidato/" + idCandidato,
		type: "GET",
		contentType: "application/json; charset=utf-8",
		error: function(e) {
			console.log(e);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível encontrar os responsáveis do candidato!",
			});
		}
	}).done(function(data) {
		$.each(data, function(index, item) {
			console.log(item);
			$('#responsavelEmergenciaFichaMedica').append($('<option>', {
				value: item.pessoa.idPessoa,
				text: item.pessoa.nomeCompleto,
				name: item.pessoa.nomeCompleto
			}));
		});
	});*/

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

	/*	getDocumentos()*/
	loadSelects()
	getDadosCandidato()
	/*getDadosResponsavel()*/


	$('#nav-dados-aluno input, #nav-dados-aluno select').attr('disabled', true);
	$('#nav-responsavel input, #nav-responsavel select').attr('disabled', true);
	$('#nav-disabled input, #nav-disabled select').attr('disabled', true);
})

/*const getDadosResponsavel = () => {
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
		
		if(data != "Nenhum resultado encontrado para os parâmetros informados.")
			listarFichaMedica(data)
	});
}*/

/*const listarDados = (dadosTabela) => {
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
			'<td class="d-flex justify-content-center"><span style="width: 63px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-primary btn-sm" data-id="' +
			item.idResponsavel +
			'" onclick="show(this)"><i class="fa-solid fa-file-lines"></i></span></td>' +
			"</tr>"
		);
	}).join("");

	$("#cola-tabela").html(html);
};

const show = (ref) => {
	var tabTrigger = new bootstrap.Tab($('#nav-responsavel-tab'));
	tabTrigger.show();

	idResponsavel = ref.getAttribute("data-id")

	getResponsavel(idResponsavel)
}

const getResponsavel = (id) => {
	$.ajax({
		url: url_base + '/responsavel/' + id,
		type: "get",
		async: false,
		error: function(e) {
			console.log(e);
		}
	}).done(function(data) {

		var cpf = data.pessoa.cpf
			? data.pessoa.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4")
			: "";


		console.log(data)
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
			$('#certidaoNascimentoUfCartorioIdResponsavel').val(data.pessoa.certidaoNascimentoMunicipioCartorio.ufId);
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

		let numRg = data.pessoa.rgNumero

		// Preenchendo campos de input
		$('#nomeCompletoResponsavel').val(data.pessoa.nomeCompleto);
		$('#nomeSocialResponsavel').val(data.pessoa.nomeSocial);
		$('#cpfResponsavel').val(cpf)
		$('#rgNumeroResponsavel').val(numRg ? numRg.replace(/^(\d{2})(\d{3})(\d{3})(\d{1})$/, "$1.$2.$3-$4") : "");
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
		$('#telefoneResponsavel').val(data.pessoa.telefone.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3"));
		$('#celularResponsavel').val(data.pessoa.celular.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3"));
		$('#emailResponsavel').val(data.pessoa.email);
		$('#empresaResponsavel').val(data.pessoa.empresa);
		$('#ocupacaoResponsavel').val(data.pessoa.ocupacao);
		$('#telefoneComercialResponsavel').val(data.pessoa.telefoneComercial != null ? data.pessoa.telefoneComercial.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3") : '');

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
		$('#rgUfEmissorIdResponsavel').val(data.pessoa.rgUfEmissor != null ? data.pessoa.rgUfEmissor.idUf : '');
		$('#rgNumeroResponsavel').val(numRg.replace(/^(\d{2})(\d{3})(\d{3})(\d{1})$/, "$1.$2.$3-$4"))


		// Exemplo para estado civil usando radio button
		$('input[name="estadoCivilResponsavel"][value="' + data.pessoa.estadoCivil + '"]').prop('checked', true); // Supondo que o valor de 'estadoCivil' seja uma string como 'SO' ou 'CA'

		$(".bg-loading").addClass("none");
		$(".bg-loading").fadeOut();
	});
}*/

function formatarDataParaBR(data) {
	var dataObj = new Date(data);

	var dia = String(dataObj.getUTCDate()).padStart(2, "0");
	var mes = String(dataObj.getUTCMonth() + 1).padStart(2, "0");
	var ano = dataObj.getUTCFullYear();
	return dia + "/" + mes + "/" + ano;
}

/*const listarFichaMedica = (dadosTabela) => {
	var html = dadosTabela.map(function(item) {


		let data = formatarDataParaBR(item.dataCadastro.split('.')[0])

		return (
			"<tr>" +
			"<td>" + nomeCandidato + "</td>" +
			"<td>" + item.nomeCompleto + "</td>" +
			"<td>" + data + "</td>" +
			'<td class="d-flex justify-content-center"><span style="width: 63px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-primary btn-sm" data-id="' +
			item.idPessoaFichaMedica +
			'" onclick="fichaMedica(this)"><i class="fa-solid fa-file-lines"></i></span></td>' +
			"</tr>"
		);
	}).join("");

	$("#tabela-ficha").html(html);
};

const fichaMedica = (ref) => {
	var tabTrigger = new bootstrap.Tab($('#nav-det-ficha-tab'));
	tabTrigger.show();

	idFichaMedica = ref.getAttribute("data-id")

	getFicha(idFichaMedica)
}

const getFicha = (id) => {
	$.ajax({
		url: url_base + "/fichasMedicas/" + id,
		type: "GET",
		contentType: "application/json; charset=utf-8",
		error: function(e) {
			console.log(e);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar a busca da Ficha Médica!",
			});
		}
	}).done(function(data) {
		console.log(data)
		console.log($('#tipoSanguineoFichaMedica').val())
		$('#responsavelEmergenciaFichaMedica').val(data.responsavelPessoaId);
		$('#pesoFichaMedica').val(data.peso);
		$('#alturaFichaMedica').val(data.altura);
		$('#tipoSanguineoFichaMedica').val(data.tipoSanguineo);
		$('#transfusaoFichaMedica').prop('checked', data.aceitaTransfusao === 'S');
		$('#numeroSUSFichaMedica').val(data.numeroCartSus);
		$('#planoSaudeFichaMedica').val(data.planoSaude);
		$('#numCarterinhaFichaMedica').val(data.numeroCarteirinha);
		$('#cepFichaMedica').val(data.psEmergenciaCep);
		$('#enderecoFichaMedica').val(data.psEmergenciaEndereco);
		$('#numeroFichaMedica').val(data.psEmergenciaNumero);
		$('#complementoFichaMedica').val(data.psEmergenciaComplemento);
		$('#bairroFichaMedica').val(data.psEmergenciaBairro);
		$('#municipioFichaMedica').val(data.psEmergenciaMunicipio);
		$('#ufFichaMedica').val(data.psEmergenciaUf);
		$('#telefoneFichaMedica').val(data.psEmergenciaTelefone.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3"));
		$('#isAlergicoFichaMedica').prop('checked', data.alergia === 'S');
		$('#descIsAlergicoFichaMedica').val(data.descricaoAlergia);
		$('#tratamentoMedicoFichaMedica').prop('checked', data.tratamentoMedico === 'S');
		$('#descTratamentoMedicoFichaMedica').val(data.descricaoTratamentoMedico);
		$('#possuiDoencaFichaMedica').prop('checked', data.comorbidades === 'S');
		$('#descDoencaFichaMedica').val(data.descricaoComorbidades);
		$('#outrasDoencasFichaMedica').val(data.outrasDoencas);
		console.log($('#tipoSanguineoFichaMedica').val())

		// Inicializar Select2
		$('#responsavelEmergenciaFichaMedica').select2();
		$('#tipoSanguineoFichaMedica').select2();

		if (data.alergia === 'S') {
			$("#divDescIsAlergico").show();
		}
		if (data.tratamentoMedico === 'S') {
			$("#divDescTratamentoMedico").show();
		}
		if (data.comorbidades === 'S') {
			$("#divDescDoenca").show();
		}

		$('#nav-det-ficha input, #nav-det-ficha select').attr('disabled', true);
	});
}*/

const showFichaMedica = (ref) => {
	window.location.href = "reserva-ficha?idFichaMedica=" + idFichaMedica;
}

const showResponsavel = () => {
	window.location.href = "dadosResponsavel?idResponsavel=" + idResponsavel;
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
			url: url_base + '/pessoas/' + idPessoa,
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

			console.log(data)
			nomeCandidato = data.nomeCompleto

			var cpfCandidato = data.cpf
				? data.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4")
				: '';



			let numRg = data.rgNumero

			// Preenchendo campos de input
			$('#nomeCompleto').val(data.nomeCompleto);
			$('#nomeMae').val(data.nomeMae);
			$('#nomePai').val(data.nomePai);
			$('#nomeSocial').val(data.nomeSocial);
			$('#cpf').val(cpfCandidato);
			$('#rgNumero').val(
				numRg != null
					? numRg.replace(/^(\d{2})(\d{3})(\d{3})(\d{1})$/, "$1.$2.$3-$4")
					: ''
			);
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
			$('#telefone').val(data.telefone != null && data.telefone != '' ? data.telefone.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3") : '')
			$('#celular').val(data.celular != null && data.celular != '' ? data.celular.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3") : '')
			$('#email').val(data.email);
			$('#empresa').val(data.empresa);
			$('#ocupacao').val(data.ocupacao);
			$('#telefoneComercial').val(data.telefoneComercial != null && data.telefoneComercial != '' ? data.telefoneComercial.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3") : '')

			// Preenchendo campos de select (exemplo com raca, nacionalidade, paisNascimento, paisResidencia)
			$('#racaId').val(data.raca.idRaca);
			$('#nacionalidadeId').val(data.nacionalidadeId.idNacionalidade);
			$('#paisNascimentoId').val(data.paisNascimento.idPais);
			$('#paisResidenciaId').val(data.paisResidencia.idPais);
			$('#relacionamentoId').val(data.idPapelPessoa);

			// Exemplo de preenchimento para campos específicos como certidaoNascimentoNumero, certidaoCasamentoNumero, etc.
			$('#certidaoNascimentoNumero').val(data.certidaoNascimentoNumero);
			$('#certidaoCasamentoNumero').val(data.certidaoCasamentoNumero);

			// Aqui você pode adicionar os demais campos conforme necessário
			// Exemplo para preenchimento de campo select com município de nascimento
			$('#municipioNascimentoId').val(data.municipioNascimento.idMunicipio);
			$('#ufNascimentoId').val(data.municipioNascimento.ufId);
			$('#rgUfEmissorId').val(data.rgUfEmissor != null ? data.rgUfEmissor : 0);

			if (data.certidaoNascimentoNumero !== null &&
				data.certidaoNascimentoDataEmissao !== null &&
				data.certidaoNascimentoFolha !== null &&
				data.certidaoNascimentoLivro !== null &&
				data.certidaoNascimentoOrdem !== null) {

				$('input[id="qualPreencher"]').attr('checked', true)

				$("#certidaoCasamento").hide()
				$("#certidaoNascimento").show()


				$('#certidaoNascimentoNumero').val(data.certidaoNascimentoNumero);
				$('#certidaoNascimentoCartorio').val(data.certidaoNascimentoCartorio);
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
				$('#certidaoNascimentoUfCartorioId').val(data.certidaoNascimentoMunicipioCartorio != null ? data.certidaoNascimentoMunicipioCartorio.ufId : "")
				$('#certidaoNascimentoMunicipioCartorioId').val(data.certidaoNascimentoMunicipioCartorio != null ? data.certidaoNascimentoMunicipioCartorio.idMunicipio : "");
				$('#certidaoNascimentoDataEmissao').val(data.certidaoNascimentoDataEmissao);
				$('#certidaoNascimentoFolha').val(data.certidaoNascimentoFolha);
				$('#certidaoNascimentoLivro').val(data.certidaoNascimentoLivro);
				$('#certidaoNascimentoOrdem').val(data.certidaoNascimentoOrdem);
			} else if (data.certidaoCasamentoCartorio !== null &&
				data.certidaoCasamentoMunicipioCartorio !== null &&
				data.certidaoCasamentoDataEmissao !== null &&
				data.certidaoCasamentoFolha !== null &&
				data.certidaoCasamentoLivro !== null &&
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
				$('#certidaoCasamentoUfCartorioId').val(data.certidaoCasamentoMunicipioCartorio.ufId);
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
				$('#certidaoCasamentoCidadeCartorioId').val(data.certidaoCasamentoMunicipioCartorio.idMunicipio);

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

const editarCandidato = () => {
	window.location.href = "dados-aluno?idCandidato=" + idCandidato;
}

/*const getDocumentos = () => {
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
}*/

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



