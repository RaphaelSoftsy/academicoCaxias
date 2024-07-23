const contaId = sessionStorage.getItem('contaId');
const id = getSearchParams("idPessoaFichaMedica");
var url_base = "http://10.40.110.2:8080/api-educacional";
const idCandidato = localStorage.getItem('idCandidato');
var pessoaId = 0;
var idPessoaResponsavel = 0;

$(document).ready(function() {


	// Inicializar Select2
	$('#responsavelEmergencia').select2();
	$('#tipoSanguineo').select2();

	if (id != undefined || id != 0) {
		$.ajax({
			url: url_base + "/fichasMedicas/" + id,
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
			console.log(data)
			$('#responsavelEmergencia').val(data.responsavelPessoaId);
			$('#peso').val(data.peso);
			$('#altura').val(data.altura);
			$('#tipoSanguineo').val(data.tipoSanguineo);
			$('#transfusao').prop('checked', data.aceitaTransfusao === 'S');
			$('#numeroSUS').val(data.numeroCartSus);
			$('#planoSaude').val(data.planoSaude);
			$('#numCarterinha').val(data.numeroCarteirinha);
			$('#cep').val(data.psEmergenciaCep);
			$('#endereco').val(data.psEmergenciaEndereco);
			$('#numero').val(data.psEmergenciaNumero);
			$('#complemento').val(data.psEmergenciaComplemento);
			$('#bairro').val(data.psEmergenciaBairro);
			$('#municipio').val(data.psEmergenciaMunicipio);
			$('#uf').val(data.psEmergenciaUf);
			$('#telefone').val(data.psEmergenciaTelefone);
			$('#isAlergico').prop('checked', data.alergia === 'S');
			$('#descIsAlergico').val(data.descricaoAlergia);
			$('#tratamentoMedico').prop('checked', data.tratamentoMedico === 'S');
			$('#descTratamentoMedico').val(data.descricaoTratamentoMedico);
			$('#possuiDoenca').prop('checked', data.comorbidades === 'S');
			$('#descDoenca').val(data.descricaoComorbidades);
			$('#outrasDoencas').val(data.outrasDoencas);
		});
	}

	$.ajax({
		url: url_base + "/candidatos/" + idCandidato,
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
		pessoaId = data.pessoa;
	});

	$.ajax({
		url: url_base + "/responsavel/candidato/" + idCandidato,
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
		$.each(data, function(index, item) {
			console.log(item);
			$('#responsavelEmergencia').append($('<option>', {
				value: item.pessoa.idPessoa,
				text: item.pessoa.nomeCompleto,
				name: item.pessoa.nomeCompleto
			}));
		});
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
		$("#endereco").val(data.logradouro);
		$("#bairro").val(data.bairro);
		$("#municipio").val(data.localidade);
		$("#uf").val(data.uf);
	});
});



function getAswer(input) {
	return $(input).is(':checked') ? 'S' : 'N';
}


function getSearchParams(k) {
	var p = {};
	location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(s, key, value) {
		p[key] = value;
	});
	return k ? p[k] : p;
}




// Capturar o evento de submissão do formulário
$('#btn-submit').on("click", function(event) {
	event.preventDefault();
	console.log('Formulário enviado');

	let formDataLimpo = {}

	let dadosFormulario = {
		pessoaId: pessoaId,
		"responsavelPessoaId": Number($('#responsavelEmergencia').val()),
		"peso": Number($("#peso").val()),
		"altura": Number($("#altura").val()),
		"tipoSanguineo": $("#tipoSanguineo").val(),
		"aceitaTransfusao": $('#transfusao').is(':checked') ? 'S' : 'N',
		"numeroCartSus": $("#numeroSUS").val(),
		"planoSaude": $("#planoSaude").val(),
		"numeroCarteirinha": $("#numCarterinha").val(),
		"psEmergenciaCep": $("#cep").val().replace(/[\(\)\s\-]/g, ''),
		"psEmergenciaEndereco": $("#endereco").val(),
		"psEmergenciaNumero": $("#numero").val(),
		"psEmergenciaComplemento": $("#complemento").val(),
		"psEmergenciaBairro": $("#bairro").val(),
		"psEmergenciaMunicipio": $("#municipio").val(),
		"psEmergenciaUf": $("#uf").val(),
		"psEmergenciaTelefone": $("#telefone").val().replace(/[\(\)\s\-]/g, ''),
		"psEmergenciaDistrito": null,
		"alergia": $('#isAlergico').is(':checked') ? 'S' : 'N',
		"descricaoAlergia": $("#descIsAlergico").val(),
		"tratamentoMedico": $('#tratamentoMedico').is(':checked') ? 'S' : 'N',
		"descricaoTratamentoMedico": $("#descTratamentoMedico").val(),
		"comorbidades": $('#possuiDoenca').is(':checked') ? 'S' : 'N',
		"descricaoComorbidades": $("#descDoenca").val(),
		"outrasDoencas": $("#outrasDoencas").val()
	};

	for (const key in dadosFormulario) {
		if (Object.hasOwnProperty.call(dadosFormulario, key)) {
			if (dadosFormulario[key] == 0) {
				dadosFormulario[key] = null
			}
			formDataLimpo[key] = dadosFormulario[key]
		}
	}

	dadosFormulario = formDataLimpo

	console.log('Dados do formulário:', dadosFormulario);
	

	if (id != undefined) {
		dadosFormulario.idPessoaFichaMedica = id
		$.ajax({
			url: url_base + `/fichasMedicas/`+ id, // Ajuste a URL conforme necessário
			type: "PUT",
			data: JSON.stringify(dadosFormulario),
			contentType: "application/json; charset=utf-8",
			beforeSend: function() {
				Swal.showLoading();
			},
			success: function(data) {
				Swal.close();
				Swal.fire({
					title: "Editado com sucesso",
					icon: "success",
				}).then(() => {
					window.location.href = "dados-reserva-vaga?id=" + idCandidato; // Ajuste o redirecionamento conforme necessário
				});
			},
			error: function(e) {
				Swal.close();
				console.error('Erro na requisição:', e);
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Não foi possível realizar esse comando!",
				});
			}
		});
	} else {

		$.ajax({
			url: url_base + `/fichasMedicas`, // Ajuste a URL conforme necessário
			type: "POST",
			data: JSON.stringify(dadosFormulario),
			contentType: "application/json; charset=utf-8",
			beforeSend: function() {
				Swal.showLoading();
			},
			success: function(data) {
				Swal.close();
				Swal.fire({
					title: "Cadastrado com sucesso",
					icon: "success",
				}).then(() => {
					window.location.href = "reservas"; // Ajuste o redirecionamento conforme necessário
				});
			},
			error: function(e) {
				Swal.close();
				console.error('Erro na requisição:', e);
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Não foi possível realizar esse comando!",
				});
			}
		});
	}
});


// Event handlers for dynamic fields
$('input[name="isAlergico"]').click(function() {
	if ($(this).is(':checked')) {
		$("#divDescIsAlergico").show();
		$('input[name="descIsAlergico"]').attr("required", true);
	} else {
		$("#divDescIsAlergico").hide();
		$('input[name="descIsAlergico"]').attr("required", false);
	}
});

$('input[name="tratamentoMedico"]').click(function() {
	if ($(this).is(':checked')) {
		$("#divDescTratamentoMedico").show();
		$('input[name="descTratamentoMedico"]').attr("required", true);
	} else {
		$("#divDescTratamentoMedico").hide();
		$('input[name="descTratamentoMedico"]').attr("required", false);
	}
});

$('input[name="possuiDoenca"]').click(function() {
	if ($(this).is(':checked')) {
		$("#divDescDoenca").show();
		$('input[name="descDoenca"]').attr("required", true);
	} else {
		$("#divDescDoenca").hide();
		$('input[name="descDoenca"]').attr("required", false);
	}
});
