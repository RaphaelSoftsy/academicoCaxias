	const contaId = sessionStorage.getItem('contaId')
	const id = getSearchParams("id")
	var url_base = "http://10.40.110.2:8080/api-educacional";
	const idCandidato = localStorage.getItem('idCandidato')
	var idPessoa = 0
	var idPessoaResponsavel = 0
	
	function getSearchParams(k) {
		var p = {};
		location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(s, key, value) {
			p[key] = value;
		});
		return k ? p[k] : p;
	}
	
	$(document).ready(function() {
	
		var tamanhoBody = $("body").width()
	
	
	
		$.ajax({
			url: url_base + "/candidatos/" + idCandidato,
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
			idPessoa = data.pessoa
		})
		
		$.ajax({
			url: url_base + "/responsavel/candidato/" + idCandidato,
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
			$.each(data, function(index, item) {
					$('#responsavelEmergencia').append($('<option>', {
						value: item.pessoa.idPessoa,
						text: item.pessoa.nomeCompleto,
						name: item.pessoa.nomeCompleto
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
	
		$('select ').select2();
	
		function getAswer(input) {
	
			if ($(input).is(':checked')) {
				return 'S'
			} else {
				return 'N'
			}
	
		}
		// Função para capturar os dados do formulário ao ser submetido
		$('#formSubmit').submit(function(event) {
	
			event.preventDefault();
	
	
			var dadosFormulario = {
				"pessoaId": idPessoa,
				"responsavelPessoaId":$('#responsavelEmergencia').val(),
				"peso": $("#peso").val(),
				"altura": $("#altura").val(),
				"tipoSanguineo": $("#tipoSanguineo").val(),
				"aceitaTransfusao": getAswer('#transfusao'),
				"numeroCartSus": $("#numeroSUS").val(),
				"planoSaude": $("#planoSaude").val(),
				"numeroCarteirinha": $("#numCarterinha").val(),
				"psEmergenciaCep": $("#cep").val(),
				"psEmergenciaEndereco": $("#endereco").val(),
				"psEmergenciaNumero": $("#numero").val(),
				"psEmergenciaComplemento": $("#complemento").val(),
				"psEmergenciaBairro": $("#bairro").val(),
				"psEmergenciaMunicipio": $("#municipio").val(),
				"psEmergenciaDistrito": $("#distrito").val(),
				"psEmergenciaUf": $("#uf").val(),
				"psEmergenciaTelefone": $("#telefone").val(),
				"alergia": getAswer('#isAlergico'),
				"descricaoAlergia": $("#descIsAlergico").val(),
				"tratamentoMedico": getAswer('#tratamentoMedico'),
				"descricaoTratamentoMedico": $("#descTratamentoMedico").val(),
				"comorbidades": getAswer('#possuiDoenca'),
				"descricaoComorbidades": $("#descDoenca").val(),
				"outrasDoencas": $("#outrasDoencas").val()
			};
	
			console.log(dadosFormulario)
	
			// Aqui você pode acessar os valores dos campos de input usando jQuery
	
			// Aqui você pode enviar o objeto formData para onde for necessário, como uma requisição AJAX
			// Exemplo:
	
			$.ajax({
				url: url_base + '/fichasMedicas',
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
				
				window.location.href = "reservas";
				
			});
	
	
			
	
		});
	})
	
	
	
	
	function carregarDados(id) {
	
		if (id != undefined) {
			$(".bg-loading").fadeIn();
	
			$('#municipioNascimentoId').attr('disabled', false)
			$('#certidaoNascimentoMunicipioCartorioId').attr('disabled', false)
			$('#certidaoNascimentoMunicipioCartorioId').attr('disabled', false)
	
			$.ajax({
				url: url_base + '/candidatos/' + id,
				type: "get",
				async: false,
			}).done(function(data) {
	
				$("#tipoIngressoId").val(data.tipoIngresso.idTipoIngresso)
	
	
	
				$.ajax({
					url: url_base + '/pessoas/' + data.pessoa,
					type: "get",
					async: false,
				}).done(function(data) {
					// Verificar se os dados de certidão de nascimento estão preenchidos
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
						$('#certidaoNascimentoUfCartorioId').val(data.certidaoNascimentoMunicipioCartorio.ufId);
						$('#certidaoNascimentoMunicipioCartorioId').val(data.certidaoNascimentoMunicipioCartorio.idMunicipio);
						$('#certidaoNascimentoDataEmissao').val(data.certidaoNascimentoDataEmissao);
						$('#certidaoNascimentoFolha').val(data.certidaoNascimentoFolha);
						$('#certidaoNascimentoLivro').val(data.certidaoNascimentoLivro);
						$('#certidaoNascimentoOrdem').val(data.certidaoNascimentoOrdem);
	
						$("[name='certidaoCasamentoNumero']").attr("required", false);
						$("[name='certidaoCasamentoCartorio']").attr("required", false);
						$("[name='certidaoCasamentoUfCartorioId']").attr("required", false);
						$("[name='certidaoCasamentoCidadeCartorio']").attr("required", false);
						$("[name='certidaoCasamentoFolha']").attr("required", false);
						$("[name='certidaoCasamentoLivro']").attr("required", false);
						$("[name='certidaoCasamentoOrdem']").attr("required", false);
						$("[name='certidaoCasamentoDataEmissao']").attr("required", false);
					} else if (data.certidaoCasamentoCartorio !== null ||
						data.certidaoCasamentoMunicipioCartorio !== null ||
						data.certidaoCasamentoDataEmissao !== null ||
						data.certidaoCasamentoFolha !== null ||
						data.certidaoCasamentoLivro !== null ||
						data.certidaoCasamentoOrdem !== null) {
						// Verificar se os dados de certidão de casamento estão preenchidos
						$('input[id="qualPreencher"]').attr('checked', false)
						$("#certidaoNascimento").hide()
						$("#certidaoCasamento").show()
						$('#certidaoCasamentoNumero').val(data.certidaoCasamentoNumero);
						$('#certidaoCasamentoCartorio').val(data.certidaoCasamentoCartorio);
						$('#certidaoCasamento').val(data.certidaoCasamentoMunicipioCartorio);
						$('#certidaoCasamentoDataEmissao').val(data.certidaoCasamentoDataEmissao);
						$('#certidaoCasamentoOrdem').val(data.certidaoCasamentoOrdem);
						$('#certidaoCasamentoFolha').val(data.certidaoCasamentoFolha);
						$('#certidaoCasamentoLivro').val(data.certidaoCasamentoLivro);
	
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
					$('#nomeCompleto').val(data.nomeCompleto);
					$('#nomeMae').val(data.nomeMae);
					$('#nomePai').val(data.nomePai);
					$('#nomeSocial').val(data.nomeSocial);
					$('#cpf').val(data.cpf);
					$('#rgNumero').val(data.rgNumero);
					$('#rgOrgaoExpedidor').val(data.rgOrgaoExpedidor);
					$('#rgDataExpedicao').val(data.rgDataExpedicao);
					$('#dtNascimento').val(data.dtNascimento);
					$('#sexo_' + data.sexo).prop('checked', true); // Supondo que o valor de 'sexo' seja uma string como 'M' ou 'F'
					$('#sexo_' + data.estadoCivil).prop('checked', true); // Supondo que o valor de 'sexo' seja uma string como 'M' ou 'F'
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
					/*	$('#nacionalidadeId').val(data.nacionalidadeId.idNacionalidade).attr("selected", true);;
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
	
					// Exemplo para estado civil usando radio button
					$('input[name="estadoCivil"][value="' + data.estadoCivil + '"]').prop('checked', true); // Supondo que o valor de 'estadoCivil' seja uma string como 'SO' ou 'CA'
	
	
	
				})
			})
			$(".bg-loading").addClass("none");
			$(".bg-loading").fadeOut()
		} else {
			return false
		}
	
	
	}
	
	
	
	
	$('input[name="isAlergico"]').click(function() {
		if ($(this).is(':checked')) {
			$("#divDescIsAlergico").show();
			$('input[name="descIsAlergico"]').attr("required", true)
	
	
		} else {
			$("#divDescIsAlergico").hide();
			$('input[name="descIsAlergico"]').attr("required", false)
	
		}
	});
	
	$('input[name="tratamentoMedico"]').click(function() {
		if ($(this).is(':checked')) {
			$("#divDescTratamentoMedico").show();
			$('input[name="descTratamentoMedico"]').attr("required", true)
	
	
		} else {
			$("#divDescTratamentoMedico").hide();
			$('input[name="descTratamentoMedico"]').attr("required", false)
	
		}
	});
	
	$('input[name="possuiDoenca"]').click(function() {
		if ($(this).is(':checked')) {
			$("#divDescDoenca").show();
			$('input[name="descDoenca"]').attr("required", true)
	
	
		} else {
			$("#divDescDoenca").hide();
			$('input[name="descDoenca"]').attr("required", false)
	
		}
	});
	
	
	
	
	
	
