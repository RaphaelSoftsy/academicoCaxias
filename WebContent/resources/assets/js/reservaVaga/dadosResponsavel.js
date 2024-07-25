const contaId = localStorage.getItem('contaId')
var url_base = "http://10.40.110.2:8080/api-educacional-dev";
const idCandidadto = localStorage.getItem("idCandidato")
let id = getSearchParams("id");
let responsavelIdParams = getSearchParams("idResponsavel");
let idCandidatoRelacionamento = 0

function getSearchParams(k) {
	var p = {};
	location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(s, key, value) {
		p[key] = value;
	});
	return k ? p[k] : p;
}


$(document).ready(function() {


	var tamanhoBody = $("body").width()

	if (tamanhoBody < 768) {
		$("#qualPreencher").show()
		$("#qualPreencherSwitch").hide()
		$('input[name="qualPreencher"]').attr("required", false)
	} else {
		$("#qualPreencher").hide()
		$("#qualPreencherSwitch").show()

	}


	$('select').select2();


	if ($('input[id="qualPreencher"]').is(':checked')) {
		$("#certidaoCasamento").hide()
		$("#certidaoNascimento").show()
	} else {
		$("#certidaoNascimento").hide()
		$("#certidaoCasamento").show()
	}
	if (id != undefined) {
		$.ajax({
			url: url_base + '/candidatoRelacionamento/pessoa/' + id,
			type: "get",
			async: false,
		}).done(function(data) {
			if (data.length == 0) {
				$(".bg-loading").fadeOut()
				Swal.fire({
					title: "O responsável não possui nenhum relacionamento, selecione outro responsável",
					icon: "info",
				}).then(result => {
					if (result) {
						window.location.href = "listaResponsavel"
					}
				})
			}
		})
	}


	$.ajax({
		url: url_base + '/papelPessoa/conta/' + contaId,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			if (item.ativo == "S") {
				$('#relacionamentoId').append($('<option>', {
					value: item.idPapelPessoa,
					text: item.papelPessoa,
					name: item.papelPessoa
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

			$('#certidaoNascimentoMunicipioCartorioId').append($('<option>', {
				value: item.idMunicipio,
				text: item.nomeMunicipio,
				name: item.nomeMunicipio
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


	if (id != undefined || responsavelIdParams != undefined) {
		console.log(responsavelIdParams)
		const loader = document.querySelector(".bg-loading");
		loader.parentElement.removeChild(loader);


		$('#municipioNascimentoId').attr('disabled', false)
		$('#certidaoNascimentoMunicipioCartorioId').attr('disabled', false)
		$('#certidaoNascimentoMunicipioCartorioId').attr('disabled', false)

		$("isEnderecoAluno").hide()
		let pathPut = responsavelIdParams != undefined ? `/responsavel/${responsavelIdParams}` :
			`/responsavel/pessoa/${id}`
		$.ajax({
			url: url_base + pathPut,
			type: "get",
			async: false,
		}).done(function(data) {
			console.log(data)

			id = data.pessoa.idPessoa

			$.ajax({
				url: url_base + '/candidatoRelacionamento/pessoa/' + data.pessoa.idPessoa,
				type: "get",
				async: false,
			}).done(function(res) {
				idCandidatoRelacionamento = res[0].idCandidatoRelacionamento
			})


			// Verificar se os dados de certidão de nascimento estão preenchidos
			if (data.certidaoNascimentoNumero !== null ||
				data.pessoa.certidaoNascimentoDataEmissao !== null ||
				data.pessoa.certidaoNascimentoFolha !== null ||
				data.pessoa.certidaoNascimentoLivro !== null ||
				data.pessoa.certidaoNascimentoOrdem !== null) {

				$('input[id="qualPreencher"]').attr('checked', true)

				$("#certidaoCasamento").hide()
				$("#certidaoNascimento").show()


				$('#certidaoNascimentoNumero').val(data.pessoa.certidaoNascimentoNumero);
				$('#certidaoNascimentoCartorio').val(data.pessoa.certidaoNascimentoCartorio);
				$('#certidaoNascimentoUfCartorioId').val(data.pessoa.certidaoNascimentoMunicipioCartorio.uf.idUf);
				$('#certidaoNascimentoMunicipioCartorioId').val(data.pessoa.certidaoNascimentoMunicipioCartorio.idMunicipio);
				$('#certidaoNascimentoDataEmissao').val(data.pessoa.certidaoNascimentoDataEmissao);
				$('#certidaoNascimentoFolha').val(data.pessoa.certidaoNascimentoFolha);
				$('#certidaoNascimentoLivro').val(data.pessoa.certidaoNascimentoLivro);
				$('#certidaoNascimentoOrdem').val(data.pessoa.certidaoNascimentoOrdem);
			} else if (data.pessoa.certidaoCasamentoCartorio !== null ||
				data.pessoa.certidaoCasamentoMunicipioCartorio !== null ||
				data.pessoa.certidaoCasamentoDataEmissao !== null ||
				data.pessoa.certidaoCasamentoFolha !== null ||
				data.pessoa.certidaoCasamentoLivro !== null ||
				data.pessoa.certidaoCasamentoOrdem !== null) {
				// Verificar se os dados de certidão de casamento estão preenchidos
				$('input[id="qualPreencher"]').attr('checked', false)
				$("#certidaoNascimento").hide()
				$("#certidaoCasamento").show()
				$('#certidaoCasamentoNumero').val(data.pessoa.certidaoCasamentoNumero);
				$('#certidaoCasamentoCartorio').val(data.pessoa.certidaoCasamentoCartorio);
				$('#certidaoCasamento').val(data.pessoa.certidaoCasamentoMunicipioCartorio);
				$('#certidaoCasamentoDataEmissao').val(data.pessoa.certidaoCasamentoDataEmissao);
				$('#certidaoCasamentoOrdem').val(data.pessoa.certidaoCasamentoOrdem);
				$('#certidaoCasamentoFolha').val(data.pessoa.certidaoCasamentoFolha);
				$('#certidaoCasamentoLivro').val(data.pessoa.certidaoCasamentoLivro);

			}
			// Preenchendo campos de input
			$('#nomeCompleto').val(data.pessoa.nomeCompleto);
			$('#nomeSocial').val(data.pessoa.nomeSocial);
			$('#cpf').val(data.pessoa.cpf);
			$('#rgNumero').val(data.pessoa.rgNumero);
			$('#rgOrgaoExpedidor').val(data.pessoa.rgOrgaoExpedidor);
			$('#rgDataExpedicao').val(data.pessoa.rgDataExpedicao);
			$('#dtNascimento').val(data.pessoa.dtNascimento);
			$('#sexo_' + data.pessoa.sexo).prop('checked', true); // Supondo que o valor de 'sexo' seja uma string como 'M' ou 'F'
			$('#estadoCivil_' + data.pessoa.estadoCivil).prop('checked', true); // Supondo que o valor de 'sexo' seja uma string como 'M' ou 'F'
			$('#cep').val(data.pessoa.cep);
			$('#endereco').val(data.pessoa.endereco);
			$('#numero').val(data.pessoa.numero);
			$('#complemento').val(data.pessoa.complemento);
			$('#bairro').val(data.pessoa.bairro);
			$('#municipio').val(data.pessoa.municipio);
			$('#distrito').val(data.pessoa.distrito);
			$('#uf').val(data.pessoa.uf);
			$('#telefone').val(data.pessoa.telefone);
			$('#celular').val(data.pessoa.celular);
			$('#email').val(data.pessoa.email);
			$('#empresa').val(data.pessoa.empresa);
			$('#ocupacao').val(data.pessoa.ocupacao);
			$('#telefoneComercial').val(data.pessoa.telefoneComercial);



			// Preenchendo campos de select (exemplo com raca, nacionalidade, paisNascimento, paisResidencia)
			$('#racaId').val(data.pessoa.raca.idRaca);
			$('#nacionalidadeId').val(data.pessoa.nacionalidadeId.idNacionalidade);
			$('#paisNascimentoId').val(data.pessoa.paisNascimento.idPais);
			$('#paisResidenciaId').val(data.pessoa.paisResidencia.idPais);
			$('#relacionamentoId').val(data.idPapelPessoa);
			/*	$('#nacionalidadeId').val(data.nacionalidadeId.idNacionalidade).attr("selected", true);;
				$('#paisNascimentoId').val(data.paisNascimento.idPais).attr("selected", true);;
				$('#paisResidenciaId').val(data.paisResidencia.idPais).attr("selected", true);;
				$('#ufNascimentoId').val(data.municipioNascimento.ufId).attr("selected", true);*/



			// Exemplo de preenchimento para campos específicos como certidaoNascimentoNumero, certidaoCasamentoNumero, etc.
			$('#certidaoNascimentoNumero').val(data.pessoa.certidaoNascimentoNumero);
			$('#certidaoCasamentoNumero').val(data.pessoa.certidaoCasamentoNumero);

			// Aqui você pode adicionar os demais campos conforme necessário

			// Exemplo para preenchimento de campo select com município de nascimento
			$('#municipioNascimentoId').val(data.pessoa.municipioNascimento.idMunicipio);
			$('#ufNascimentoId').val(data.pessoa.municipioNascimento.uf.idUf);
			$('#rgUfEmissorId').val(data.pessoa.rgUfEmissor.idUf);

			// Exemplo para estado civil usando radio button
			$('input[name="estadoCivil"][value="' + data.pessoa.estadoCivil + '"]').prop('checked', true); // Supondo que o valor de 'estadoCivil' seja uma string como 'SO' ou 'CA'

			$(".bg-loading").addClass("none");
			$(".bg-loading").fadeOut();
		})
	} else {
		$(".bg-loading").addClass("none");
		$(".bg-loading").fadeOut();
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




$('#formSubmit').submit(function(event) {

	event.preventDefault();

	let cpf = $('#cpf').val().replace(/[^\d]+/g, '')

	const formDataLimpoPessoaDTO = {};
	const formDataLimpoCandidatoRelacionamentoDTO = {};


	if (cpf == "") {
		var dadosFormulario = {
			"pessoaDTO": {
				"contaId": Number(contaId),
				"nomeCompleto": $('#nomeCompleto').val(),
				"sexo": $('input[name="sexo"]:checked').val(),
				dtNascimento: $('#dtNascimento').val(),
				"cpf": null,
				"racaId": $('#racaId').val(),
				"paisResidenciaId": $('#paisResidenciaId').val(),
				"paisNascimentoId": $('#paisNascimentoId').val(),
				/*"ufNascimentoId": Number($('#ufNascimentoId').val()),*/
				"municipioNascimentoId": Number($('#municipioNascimentoId').val()),
				"nacionalidadeId": $('#nacionalidadeId').val(),
				"nacionalidade": $('#nacionalidadeId').find(":selected").text().substring(0, 3),
				"estadoCivil": $('input[name="estadoCivil"]:checked').val(),
				"rgNumero": $('#rgNumero').val().replace(/[^\d]+/g, ''),
				"rgDataExpedicao": $('#rgDataExpedicao').val(),
				rgOrgaoExpedidor: $('#rgOrgaoExpedidor').val(),
				rgUfEmissorId: Number($('#rgUfEmissorId').val()),
				certidaoNascimentoNumero: $('#certidaoNascimentoNumero').val(),
				certidaoNascimentoCidadeCartorio: $('#certidaoNascimentoCidadeCartorio').val(),
				certidaoNascimentoCartorio: $('#certidaoNascimentoCartorio').val(),
				/*certidaoNascimentoUfCartorioId: Number($('#certidaoNascimentoUfCartorioId').val()),*/
				certidaoNascimentoDataEmissao: $('#certidaoNascimentoDataEmissao').val(),
				certidaoNascimentoFolha: $('#certidaoNascimentoFolha').val(),
				certidaoNascimentoLivro: $('#certidaoNascimentoLivro').val(),
				certidaoNascimentoOrdem: $('#certidaoNascimentoOrdem').val(),
				certidaoCasamentoNumero: $('#certidaoCasamentoNumero').val(),
				certidaoCasamentoCartorio: $('#certidaoCasamentoCartorio').val(),
				/*certidaoCasamentoUfCartorioId: Number($('#certidaoCasamentoUfCartorioId').val()),*/
				certidaoCasamentoCidadeCartorio: $('#certidaoCasamentoCidadeCartorio').val(),
				certidaoCasamentoFolha: $('#certidaoCasamentoFolha').val(),
				certidaoCasamentoLivro: $('#certidaoCasamentoLivro').val(),
				certidaoCasamentoOrdem: $('#certidaoCasamentoOrdem').val(),
				certidaoCasamentoDataEmissao: $('#certidaoCasamentoDataEmissao').val(),
				rneNumero: $("#rneNumero").val(),
				rneOrgaoExpedidor: $("#rneOrgaoExpedidor").val(),
				rneUfEmissorId: Number($("#rneUfEmissorId").val()),
				rneDataExpedicao: $("#rneDataExpedicao").val(),
				cep: $("#cep").val().replace(/[^\d]+/g, ''),
				endereco: $("#endereco").val(),
				numero: $("#numero").val(),
				complemento: $("#complemento").val(),
				bairro: $("#bairro").val(),
				municipio: $("#municipio").val(),
				distrito: $("#distrito").val(),
				uf: $("#uf").val(),
				"empresa": $("#empresa").val(),
				"ocupacao": $("#ocupacao").val(),
				"telefoneComercial": $("#telefoneComercial").val().replace(/[^\d]+/g, ''),
				"email": $('#email').val(),
				"telefone": $('#telefone').val().replace(/[^\d]+/g, ''),
				"celular": $('#celular').val(),
				"senha": "teste",
				"nomePai": null,
				"nomeMae": null,
				"certidaoNascimentoMunicipioCartorioId": 1,
				"certidaoCasamentoMunicipioCartorioId": 1
			},
			"candidatoRelacionamentoDTO": {
				"candidatoId": Number(idCandidadto),
				"pessoaId": 1,
				"papelPessoaId": Number($('#relacionamentoId').val())
			}
		};

	} else {
		var dadosFormulario = {
			"pessoaDTO": {
				"contaId": Number(contaId),
				"nomeCompleto": $('#nomeCompleto').val(),
				"sexo": $('input[name="sexo"]:checked').val(),
				"dtNascimento": `${$('#dtNascimento').val()}T00:00:00`,
				"cpf": cpf,
				"racaId": $('#racaId').val(),
				"paisResidenciaId": $('#paisResidenciaId').val(),
				"paisNascimentoId": $('#paisNascimentoId').val(),
				/*"ufNascimentoId": Number($('#ufNascimentoId').val()),*/
				"municipioNascimentoId": Number($('#municipioNascimentoId').val()),
				"nacionalidadeId": $('#nacionalidadeId').val(),
				"nacionalidade": $('#nacionalidadeId').find(":selected").text().substring(0, 3),
				"estadoCivil": $('input[name="estadoCivil"]:checked').val(),
				"rgNumero": $('#rgNumero').val().replace(/[^\d]+/g, ''),
				"rgDataExpedicao": $('#rgDataExpedicao').val(),
				rgOrgaoExpedidor: $('#rgOrgaoExpedidor').val(),
				rgUfEmissorId: Number($('#rgUfEmissorId').val()),
				certidaoNascimentoNumero: $('#certidaoNascimentoNumero').val(),
				certidaoNascimentoCidadeCartorio: $('#certidaoNascimentoCidadeCartorio').val(),
				certidaoNascimentoCartorio: $('#certidaoNascimentoCartorio').val(),
				/*certidaoNascimentoUfCartorioId: Number($('#certidaoNascimentoUfCartorioId').val()),*/
				certidaoNascimentoDataEmissao: $('#certidaoNascimentoDataEmissao').val(),
				certidaoNascimentoFolha: $('#certidaoNascimentoFolha').val(),
				certidaoNascimentoLivro: $('#certidaoNascimentoLivro').val(),
				certidaoNascimentoOrdem: $('#certidaoNascimentoOrdem').val(),
				certidaoCasamentoNumero: $('#certidaoCasamentoNumero').val(),
				certidaoCasamentoCartorio: $('#certidaoCasamentoCartorio').val(),
				/*certidaoCasamentoUfCartorioId: Number($('#certidaoCasamentoUfCartorioId').val()),*/
				certidaoCasamentoCidadeCartorio: $('#certidaoCasamentoCidadeCartorio').val(),
				certidaoCasamentoFolha: $('#certidaoCasamentoFolha').val(),
				certidaoCasamentoLivro: $('#certidaoCasamentoLivro').val(),
				certidaoCasamentoOrdem: $('#certidaoCasamentoOrdem').val(),
				certidaoCasamentoDataEmissao: $('#certidaoCasamentoDataEmissao').val(),
				rneNumero: $("#rneNumero").val(),
				rneOrgaoExpedidor: $("#rneOrgaoExpedidor").val(),
				rneUfEmissorId: Number($("#rneUfEmissorId").val()),
				rneDataExpedicao: $("#rneDataExpedicao").val(),
				cep: $("#cep").val().replace(/[^\d]+/g, ''),
				endereco: $("#endereco").val(),
				numero: $("#numero").val(),
				complemento: $("#complemento").val(),
				bairro: $("#bairro").val(),
				municipio: $("#municipio").val(),
				distrito: $("#distrito").val(),
				uf: $("#uf").val(),
				"empresa": $("#empresa").val(),
				"ocupacao": $("#ocupacao").val(),
				"telefoneComercial": $("#telefoneComercial").val().replace(/[^\d]+/g, ''),
				"email": $('#email').val(),
				"telefone": $('#telefone').val().replace(/[^\d]+/g, ''),
				"celular": $('#celular').val(),
				"senha": "teste",
				"nomePai": null,
				"nomeMae": null,
				"certidaoNascimentoMunicipioCartorioId": Number($('#certidaoNascimentoMunicipioCartorioId').val()),
				"certidaoCasamentoMunicipioCartorioId": Number($('#certidaoCasamentoCidadeCartorioId').val())
			},
			"candidatoRelacionamentoDTO": {
				"candidatoId": Number(idCandidadto),
				"pessoaId": 1,
				"papelPessoaId": Number($('#relacionamentoId').val())
			}

		};

	}


	for (const key in dadosFormulario.pessoaDTO) {
		if (Object.hasOwnProperty.call(dadosFormulario.pessoaDTO, key)) {
			if (dadosFormulario.pessoaDTO[key] == 0) {
				dadosFormulario.pessoaDTO[key] = null
			}
			formDataLimpoPessoaDTO[key] = dadosFormulario.pessoaDTO[key]
		}
	}

	for (const key in dadosFormulario.candidatoRelacionamentoDTO) {
		if (Object.hasOwnProperty.call(dadosFormulario.candidatoRelacionamentoDTO, key)) {
			if (dadosFormulario.candidatoRelacionamentoDTO[key] == 0) {
				dadosFormulario.candidatoRelacionamentoDTO[key] = null
			}
			formDataLimpoCandidatoRelacionamentoDTO[key] = dadosFormulario.candidatoRelacionamentoDTO[key]
		}
	}

	dadosFormulario.pessoaDTO = formDataLimpoPessoaDTO
	dadosFormulario.candidatoRelacionamentoDTO = formDataLimpoCandidatoRelacionamentoDTO


	console.log("dados do formulario: " + JSON.stringify(dadosFormulario, null, 2))



	if (id != undefined || responsavelIdParams != undefined) {
		dadosFormulario.candidatoRelacionamentoDTO.candidatoId = Number(idCandidadto)
		dadosFormulario.candidatoRelacionamentoDTO.pessoaId = Number(id)
		dadosFormulario.pessoaDTO.idPessoa = Number(id)
		dadosFormulario.candidatoRelacionamentoDTO.idCandidatoRelacionamento = idCandidatoRelacionamento


		console.log("dados do formulario para editar: " + JSON.stringify(dadosFormulario, null, 2))
		$.ajax({
			url: url_base + '/responsavel/pessoa-candidatoRelacionamento',
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

			}).then(result => {
				if (id != undefined || responsavelIdParams != undefined) {
					window.location.href = "dados-reserva-vaga?id=" + idCandidadto;
				} else {
					window.location.href = "listaResponsavel";
				}
			})



		});
	} else {
		console.log("dados do formulario para cadastrar: " + JSON.stringify(dadosFormulario, null, 2))
		$.ajax({
			url: url_base + '/responsavel/pessoa-candidatoRelacionamento',
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

			/*\vpnlocalStorage.setItem("idCandidatoRelacionamento", data.)*/

			window.location.href = "listaResponsavel";


		});
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


$('#certidaoCasamentoUfCartorioId').change(() => {
	$("#certidaoCasamentoCidadeCartorioId").attr("disabled", false)
	$("#certidaoCasamentoCidadeCartorioId").empty()
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


$('input[name="isRne"]').click(function() {
	if ($(this).is(':checked')) {
		$("#rneSec").show();
	} else {
		$("#rneSec").hide();
	}
});

$('input[name="isEnderecoAluno"]').click(function() {
	if ($(this).is(':checked')) {

		const enderecoAluno = localStorage.getItem("enderecoAluno")
		const enderecoAlunoJson = JSON.parse(enderecoAluno)
		console.log(enderecoAlunoJson.cep)

		$("#cep").val(enderecoAlunoJson.cep)
		$("#endereco").val(enderecoAlunoJson.endereco)
		$("#numero").val(enderecoAlunoJson.numero)
		$("#complemento").val(enderecoAlunoJson.complemento)
		$("#bairro").val(enderecoAlunoJson.bairro)
		$("#municipio").val(enderecoAlunoJson.municipio)
		$("#distrito").val(enderecoAlunoJson.distrito)
		$("#uf").val(enderecoAlunoJson.uf)

	} else {
		$("#cep").val("")
		$("#endereco").val("")
		$("#numero").val("")
		$("#complemento").val("")
		$("#bairro").val("")
		$("#municipio").val("")
		$("#distrito").val("")
		$("#uf").val("")
	}
});






$("#nacionalidadeId").on("blur", () => {
	if ($('#nacionalidadeId').find(":selected").text() != "Brasileiro" && $('#nacionalidadeId').find(":selected").text() != "Selecione uma opção") {
		$("#rne").show()
	} else {
		$("#rne").hide()
	}
})

$('input[name="qualPreencher"]').click(function() {
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


$('input[id="isCertidaoNascimento"]').click(function() {
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
	}
});

$('input[id="isCertidaoCasamento"]').click(function() {
	if ($(this).is(':checked')) {

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
		$("[name='certidaoNascimentoFolha']").removeattr("required", false);
		$("[name='certidaoNascimentoLivro']").attr("required", false);
		$("[name='certidaoNascimentoOrdem']").attr("required", false);

	}
});



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


//nomeBox: Mande o nome do id do elemento que envolve o input e label
//valorDataNascimento: mande o VALOR do input de data de nascimento
//valorComparado: mande o valor do input de data que tem que ser MAIOR que a data de nascimento
const validarDatas = (nomeBox, valorDataNascimento, idElementoComparado) => {
	const rgDataExpedicao = $(`#${idElementoComparado}`)
	const box = $(`#${nomeBox}`)
	const message = $(`<p id='errMessage${idElementoComparado}'></p>`).text("Data inferior a data de nascimento.").css('color', '#FF0000');
	const dtNasc = new Date(valorDataNascimento);
	const dataComparada = new Date(rgDataExpedicao.val());

	if (dataComparada > dtNasc) {
		$("#btn-submit").removeAttr('disabled');
		rgDataExpedicao.removeClass('err-message')
		$(`#errMessage${idElementoComparado}`).css('display', 'none')
	} else {
		if ($(`#${nomeBox}`).find(`#errMessage${idElementoComparado}`).length > 0) {
			$(`#errMessage${idElementoComparado}`).remove()
		}
		$("#btn-submit").attr("disabled", "disabled");
		rgDataExpedicao.addClass('err-message')
		$(`#${nomeBox}`).append(message)
		message.show()
	}
}
$("#rgDataExpedicao").blur(function() {
	const dtNasc = $('#dtNascimento').val()
	validarDatas('rgDataExpedicaoDiv', dtNasc, 'rgDataExpedicao')
});
$("#certidaoCasamentoDataEmissao").blur(function() {
	const dtNasc = $('#dtNascimento').val()
	validarDatas('certidaoCasamentoDataEmissaoDiv', dtNasc, 'certidaoCasamentoDataEmissao')
});
$("#certidaoNascimentoDataEmissao").blur(function() {
	const dtNasc = $('#dtNascimento').val()
	validarDatas('certidaoNascimentoDataEmissaoDiv', dtNasc, 'certidaoNascimentoDataEmissao')
});




