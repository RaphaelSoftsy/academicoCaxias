var id = '';
var logo = '';
$(document).ready(function() {
	id = getSearchParams("id");
	$("#divLogoEscola").hide();

	getValorSelects()

	$.ajax({
		url: url_base + "/escolas/" + id,
		type: "GET",
		async: false,
	})
		.done(function(data) {
			const ref = data
			logo = ref.logoEscola
			console.log(ref)

			$('#nome').val(ref.nomeEscola)
			$("#tipoEscola").val(ref.tipoEscola).attr('selected', true);
			$('#cnpj').val(ref.cnpj)
			$('#codigoInep').val(ref.codigoInep)
			$('#cep').val(ref.cep)
			$('#endereco').val(ref.endereco)
			$('#numero').val(ref.numero)
			$('#bairro').val(ref.bairro)
			$('#municipio').val(ref.municipio)
			$('#uf').val(ref.uf)
			$('#numCME').val(ref.numCME)
			$('#numParecerCME').val(ref.numParecerCME)
			$('#latitude').val(ref.latitude)
			$('#longitude').val(ref.longitude)
			$('#email').val(ref.email)

			if (data.ativo == "S") {
				$(".ativar").hide();
				$(".desativar").show()
			}
			else {
				$(".desativar").hide();
				$(".ativar").show();
			}

			if (ref.educacaoIndigena === 'S') {
				$('input[id="isIndigenaS"]').prop('checked', true)
			} else {
				$('input[id="isIndigenaN"]').prop('checked', true)
			}

			if (ref.exameSelecao === 'S') {
				$('input[id="exameSelecaoS"]').prop('checked', true)
			} else {
				$('input[id="exameSelecaoN"]').prop('checked', true)
			}

			if (ref.compartilhaEspaco === 'S') {
				$('input[id="compartilhaEspacoS"]').prop('checked', true)
			} else {
				$('input[id="compartilhaEspacoN"]').prop('checked', true)
			}

			if (ref.usaEspacoEntornoEscolar === 'S') {
				$('input[id="usaEspacoEntornoEscolarS"]').prop('checked', true)
			} else {
				$('input[id="usaEspacoEntornoEscolarN"]').prop('checked', true)
			}

			if (ref.pppAtualizado12Meses === 'S') {
				$('input[id="pppAtualizado12MesesS"]').prop('checked', true)
			} else {
				$('input[id="pppAtualizado12MesesN"]').prop('checked', true)
			}

			if (ref.acessivel === 'S') {
				$('input[id="isAcessivelS"]').prop('checked', true)
			} else {
				$('input[id="isAcessivelN"]').prop('checked', true)
			}

			if (ref.merendaEscolar === 'S') {
				$('input[id="merendaEscolarS"]').prop('checked', true)
			} else {
				$('input[id="merendaEscolarN"]').prop('checked', true)
			}

			if (ref.possuiAguaPotavel === 'S') {
				$('input[id="possuiAguaPotavelS"]').prop('checked', true)
			} else {
				$('input[id="possuiAguaPotavelN"]').prop('checked', true)
			}

			if (ref.internetBandaLarga === 'S') {
				$('input[id="internetBandaLargaS"]').prop('checked', true)
			} else {
				$('input[id="internetBandaLargaN"]').prop('checked', true)
			}

			$("#localizacaoId").val(ref.localizacao.idLocalizacao).attr('selected', true);
			$("#dependenciaAdmId").val(ref.dependenciaAdm.idDependenciaAdministrativa).attr('selected', true);
			$("#situacaoFuncionamentoId").val(ref.situacaoFuncionamento.idSituacaoFuncionamento).attr('selected', true);
			$("#formaOcupacaoPredioId").val(ref.formaOcupacaoPredio.idFormaOcupacaoPredio).attr('selected', true);

			$("#zoneamentoId").val(ref.zoneamento.idZoneamento).attr('selected', true);
			$("#categoriaEscolaPrivadaId").val(ref.categoriaEscolaPrivada.idCategoriaEscolaPrivada).attr('selected', true);
			$("#entidadeSuperiorId").val(ref.entidadeSuperior.idEntidadeSuperior).attr('selected', true);
			$("#orgaoPublicoId").val(ref.orgaoPublico.idOrgaoPublico).attr('selected', true);
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

});

$('input[name="alteraLogo"]').change(function() {
	if ($(this).val() == 'S') {
		$('#divLogoEscola').show();
		$("#logoEscola").attr('required', true);
	} else {
		$('#divLogoEscola').hide();
		$("#logoEscola").val(null).attr('required', false);
	}
});

$("#cep").blur(function() {
	$.ajax({
		url: 'https://viacep.com.br/ws/' + $("#cep").val() + '/json/',
		type: "get",
		async: false,
	}).done(function(data) {
		console.log(data)
		$("#endereco").val(data.logradouro);
		$("#bairro").val(data.bairro);
		$("#municipio").val(data.localidade);
		$("#uf").val(data.uf);

		$.ajax({
			url: 'https://nominatim.openstreetmap.org/search?format=json&q=' + data.logradouro + ', ' + data.localidade + ', ' + data.uf,
			type: "get",
			async: false,
		}).done(function(geoData) {
			var lat = geoData[0].lat;
			var lng = geoData[0].lon;

			$("#longitude").val(lng);
			$("#latitude").val(lat);
		});
	})
});

$("#formEditar").submit(function(e) {
	e.preventDefault();

	function convertToBase64(file, callback) {
		var reader = new FileReader();
		reader.onload = function(event) {
			callback(event.target.result);
		};
		reader.readAsDataURL(file);
	}

	var logoEscolaFile = $('#logoEscola')[0].files[0];

	if (logoEscolaFile) {
		convertToBase64(logoEscolaFile, function(base64String) {
			var dadosComImgBase64 = {
				idEscola: id,
				nomeEscola: $('#nome').val(),
				logoEscola: base64String,
				tipoEscola: $('#tipoEscola').val(),
				cnpj: $('#cnpj').val().replace(/[^\d]+/g, ''),
				codigoInep: $('#codigoInep').val(),
				cep: $('#cep').val().replace(/[^\d]+/g, ''),
				endereco: $('#endereco').val(),
				numero: $('#numero').val(),
				bairro: 'Bairro Fixo',
				municipio: $('#municipio').val(),
				uf: $('#uf').val(),
				numCME: $('#numCME').val(),
				numParecerCME: $('#numParecerCME').val(),
				latitude: $('#latitude').val(),
				longitude: $('#longitude').val(),
				email: $('#email').val(),
				educacaoIndigena: $('input[name="isIndigena"]:checked').val(),
				exameSelecao: $('input[name="exameSelecao"]:checked').val(),
				compartilhaEspaco: $('input[name="compartilhaEspaco"]:checked').val(),
				usaEspacoEntornoEscolar: $('input[name="usaEspacoEntornoEscolar"]:checked').val(),
				pppAtualizado12Meses: $('input[name="pppAtualizado12Meses"]:checked').val(),
				acessivel: $('input[name="isAcessivel"]:checked').val(),

				"merendaEscolar": $('input[name="merendaEscolar"]:checked').val(),
				"possuiAguaPotavel": $('input[name="possuiAguaPotavel"]:checked').val(),
				"internetBandaLarga": $('input[name="internetBandaLarga"]:checked').val(),

				localizacaoId: $('#localizacaoId').val(),
				dependenciaAdmId: $('#dependenciaAdmId').val(),
				situacaoFuncionamentoId: $('#situacaoFuncionamentoId').val(),
				formaOcupacaoPredioId: $('#formaOcupacaoPredioId').val(),

				"zoneamentoId": Number($('#zoneamentoId').val()),
				"categoriaEscolaPrivadaId": Number($('#categoriaEscolaPrivadaId').val()),
				"entidadeSuperiorId": Number($('#entidadeSuperiorId').val()),
				"orgaoPublicoId": Number($('#orgaoPublicoId').val())
			};
			
			enviarDadosFormulario(dadosComImgBase64);
		});
	} else {
		
		var dadosFormulario = {
				idEscola: id,
				nomeEscola: $('#nome').val(),
				logoEscola: base64String,
				tipoEscola: $('#tipoEscola').val(),
				cnpj: $('#cnpj').val().replace(/[^\d]+/g, ''),
				codigoInep: $('#codigoInep').val(),
				cep: $('#cep').val().replace(/[^\d]+/g, ''),
				endereco: $('#endereco').val(),
				numero: $('#numero').val(),
				bairro: 'Bairro Fixo',
				municipio: $('#municipio').val(),
				uf: $('#uf').val(),
				numCME: $('#numCME').val(),
				numParecerCME: $('#numParecerCME').val(),
				latitude: $('#latitude').val(),
				longitude: $('#longitude').val(),
				email: $('#email').val(),
				educacaoIndigena: $('input[name="isIndigena"]:checked').val(),
				exameSelecao: $('input[name="exameSelecao"]:checked').val(),
				compartilhaEspaco: $('input[name="compartilhaEspaco"]:checked').val(),
				usaEspacoEntornoEscolar: $('input[name="usaEspacoEntornoEscolar"]:checked').val(),
				pppAtualizado12Meses: $('input[name="pppAtualizado12Meses"]:checked').val(),
				acessivel: $('input[name="isAcessivel"]:checked').val(),

				"merendaEscolar": $('input[name="merendaEscolar"]:checked').val(),
				"possuiAguaPotavel": $('input[name="possuiAguaPotavel"]:checked').val(),
				"internetBandaLarga": $('input[name="internetBandaLarga"]:checked').val(),

				localizacaoId: $('#localizacaoId').val(),
				dependenciaAdmId: $('#dependenciaAdmId').val(),
				situacaoFuncionamentoId: $('#situacaoFuncionamentoId').val(),
				formaOcupacaoPredioId: $('#formaOcupacaoPredioId').val(),

				"zoneamentoId": Number($('#zoneamentoId').val()),
				"categoriaEscolaPrivadaId": Number($('#categoriaEscolaPrivadaId').val()),
				"entidadeSuperiorId": Number($('#entidadeSuperiorId').val()),
				"orgaoPublicoId": Number($('#orgaoPublicoId').val())
			};
			
		enviarDadosFormulario(dadosFormulario);
	}


});

function enviarDadosFormulario(objeto) {
	console.log(objeto)
	$.ajax({
		url: url_base + '/escolas',
		type: "PUT",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		error: function(e) {
			console.log(e)
		}
	}).done(function(data) {
		alert('Editado com sucesso!')
		window.location.href = "escolas";
	});
}