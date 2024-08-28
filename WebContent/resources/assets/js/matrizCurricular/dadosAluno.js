const contaId = localStorage.getItem('contaId')
const escolaId = sessionStorage.getItem('escolaId')
let idAluno = params.get("id");
let listaDocumentos = []
let idDoc = ''
let idPessoa = ''
let aluno = {}

$(document).ready(function() {
	var triggerTabList = [].slice.call(document.querySelectorAll('#nav-tab button'))
	triggerTabList.forEach(function(triggerEl) {
		var tabTrigger = new bootstrap.Tab(triggerEl)
		triggerEl.addEventListener('click', function(event) {
			event.preventDefault()
			tabTrigger.show()
		})
	})

	$('#nav-dados-pessoais input, #nav-dados-pessoais select').attr('disabled', true);
	$('#nav-responsavel input, #nav-responsavel select').attr('disabled', true);
	$('#municipioNascimentoId').attr('disabled', true);

	localStorage.setItem("idAluno", idAluno)
	loadSelects()
	loadSelectsAcademico()
	getDadosAluno()
})

const getDadosAluno = () => {
	$.ajax({
		url: url_base + "/alunos/" + idAluno,
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
	}).done(function(res) {
		let response = res
		idPessoa = response.pessoa
		aluno = response

		let data = response.pessoa

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
		$('#tipoIngressoId').val(response.candidato.tipoIngresso.idTipoIngresso)
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

const loadSelectsAcademico = () => {
	$.ajax({
		url: url_base + '/escolas/conta/' + contaId,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {

			if (item.ativo == "S") {
				$('#escolaId').append($('<option>', {
					value: item.idEscola,
					text: item.nomeEscola,
					name: item.nomeEscola
				}));
			}

		});
	})

	$.ajax({
		url: url_base + '/turno/conta/' + contaId,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {

			if (item.ativo == "S") {
				$('#turnoId').append($('<option>', {
					value: item.idEscola,
					text: item.turno,
					name: item.turno
				}));
			}

		});
	})

	$.ajax({
		url: url_base + '/situacoesAluno/conta/' + contaId,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#situacaoAlunoId').append($('<option>', {
				value: item.idSituacaoAluno,
				text: item.situacaoAluno,
				name: item.situacaoAluno
			}));
		});
	})

	$.ajax({
		url: url_base + '/serie/conta/' + contaId,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#serieId').append($('<option>', {
				value: item.idSerie,
				text: item.serie,
				name: item.serie
			}));
		});
	})

	$.ajax({
		url: url_base + '/cursos/conta/' + contaId,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#cursoId').append($('<option>', {
				value: item.idCurso,
				text: item.nome,
				name: item.nome
			}));
		});
	})
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