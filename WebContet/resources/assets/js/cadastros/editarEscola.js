var id = '';
var logo = '';
const contaId = sessionStorage.getItem('contaId')

$(document).ready(function() {
	id = getSearchParams("id");
	$("#divLogoEscola").hide();

	getValorSelects()

	$.ajax({
		url: url_base + "/escolas/" + id,
		type: "GET",
		async: true,
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
			} else {
				$(".desativar").hide();
				$(".ativar").show();
			}


			if (data.tipoEscola == "Pu") {
				$("#tipoEscola").val('PU').attr('selected', true);
			} else {
				$("#tipoEscola").val('PV').attr('selected', true);
			}

/*			if (ref.educacaoIndigena === 'S') {
				$('input[id="isIndigena"]').attr('checked', true)
			} else {
				$('input[id="isIndigena"]').attr('checked', false)
			}

			if (ref.exameSelecao === 'S') {
				$('input[id="exameSelecao"]').attr('checked', true)
			} else {
				$('input[id="exameSelecao"]').attr('checked', false)
			}

			if (ref.compartilhaEspaco === 'S') {
				$('input[id="compartilhaEspaco"]').attr('checked', true)
			} else {
				$('input[id="compartilhaEspaco"]').attr('checked', false)
			}

			if (ref.usaEspacoEntornoEscolar === 'S') {
				$('input[id="usaEspacoEntornoEscolar"]').attr('checked', true)
			} else {
				$('input[id="usaEspacoEntornoEscolar"]').attr('checked', false)
			}*/

			if (ref.pppAtualizado12Meses === 'S') {
				$('input[id="pppAtualizado12Meses"]').attr('checked', true)
			} else {
				$('input[id="pppAtualizado12Meses"]').attr('checked', false)
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
	if ($(this).is(':checked') == true) {
		$('#divLogoEscola').show();
		$("#logoEscola").attr('required', true);
	} else {
		$('#divLogoEscola').hide();
		$("#logoEscola").val(null).attr('required', false);
	}
});

$("#cep").blur(function() {

	$('.bg-loading').fadeIn()

	$.ajax({
		url: 'https://viacep.com.br/ws/' + $("#cep").val() + '/json/',
		type: "get",
		async: false,
		beforeSend: function() {
				// Mostrar indicador de carregamento
				Swal.showLoading()
		}
	}).done(function(data) {
		Swal.close();
		
		if (data.erro == true) {

			$("#uf").prop('disabled', false)
			$("#municipio").prop('disabled', false)
			$("#bairro").prop('disabled', false)
			$("#endereco").prop('disabled', false)
			$("#longitude").prop('disabled', false)
			$("#latitude").prop('disabled', false)

			$("#endereco").val('');
			$("#bairro").val('');
			$("#municipio").val('');
			$("#uf").val('');
			$("#longitude").val('');
			$("#latitude").val('');

			$('.bg-loading').fadeOut()
		} else if(data.bairro == '' && data.logradouro == ''){
			$("#bairro").prop('disabled', false)
			$("#endereco").prop('disabled', false)
		
		}else {
			$("#uf").prop('disabled', true)
			$("#municipio").prop('disabled', true)
			$("#bairro").prop('disabled', true)
			$("#endereco").prop('disabled', true)
			$("#longitude").prop('disabled', true)
			$("#latitude").prop('disabled', true)
		}

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


function getAswer(input) {

	if ($(input).is(':checked')) {
		return 'S'
	} else {
		return 'N'
	}

}

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
				logoEscola: '',
				tipoEscola: $('#tipoEscola').val(),
				cnpj: $('#cnpj').val().replace(/[^\d]+/g, ''),
				codigoInep: $('#codigoInep').val(),
				cep: $('#cep').val().replace(/[^\d]+/g, ''),
				endereco: $('#endereco').val(),
				numero: $('#numero').val(),
				bairro: $('#bairro').val(),
				municipio: $('#municipio').val(),
				uf: $('#uf').val(),
				numCME: $('#numCME').val(),
				numParecerCME: $('#numParecerCME').val(),
				latitude: $('#latitude').val(),
				longitude: $('#longitude').val(),
				email: $('#email').val(),
				educacaoIndigena: "N",
				exameSelecao: "N",
				compartilhaEspaco: "N",
				usaEspacoEntornoEscolar: "N",
				pppAtualizado12Meses: getAswer("#pppAtualizado12Meses"),
				localizacaoId: Number($('#localizacaoId').val()),
				dependenciaAdmId: Number($('#dependenciaAdmId').val()),
				situacaoFuncionamentoId: Number($('#situacaoFuncionamentoId').val()),
				formaOcupacaoPredioId: Number($('#formaOcupacaoPredioId').val()),
				"zoneamentoId": Number($('#zoneamentoId').val()),
				"categoriaEscolaPrivadaId": Number($('#categoriaEscolaPrivadaId').val()),
				"entidadeSuperiorId": Number($('#entidadeSuperiorId').val()),
				"orgaoPublicoId": Number($('#orgaoPublicoId').val()),
				contaId: Number(contaId)
			};

			enviarDadosFormulario(dadosComImgBase64);
		});
	} else {

		var dadosFormulario = {
			idEscola: id,
			nomeEscola: $('#nome').val(),
			logoEscola: '',
			tipoEscola: $('#tipoEscola').val(),
			cnpj: $('#cnpj').val().replace(/[^\d]+/g, ''),
			codigoInep: $('#codigoInep').val(),
			cep: $('#cep').val().replace(/[^\d]+/g, ''),
			endereco: $('#endereco').val(),
			numero: $('#numero').val(),
			bairro: $('#bairro').val(),
			municipio: $('#municipio').val(),
			uf: $('#uf').val(),
			numCME: $('#numCME').val(),
			numParecerCME: $('#numParecerCME').val(),
			latitude: $('#latitude').val(),
			longitude: $('#longitude').val(),
			email: $('#email').val(),
			educacaoIndigena: "N",
			exameSelecao: "N",
			compartilhaEspaco: "N",
			usaEspacoEntornoEscolar: "N",
			pppAtualizado12Meses: getAswer("#pppAtualizado12Meses"),
			localizacaoId: Number($('#localizacaoId').val()),
			dependenciaAdmId: Number($('#dependenciaAdmId').val()),
			situacaoFuncionamentoId: Number($('#situacaoFuncionamentoId').val()),
			formaOcupacaoPredioId: Number($('#formaOcupacaoPredioId').val()),
			"zoneamentoId": Number($('#zoneamentoId').val()),
			"categoriaEscolaPrivadaId": Number($('#categoriaEscolaPrivadaId').val()),
			"entidadeSuperiorId": Number($('#entidadeSuperiorId').val()),
			"orgaoPublicoId": Number($('#orgaoPublicoId').val()),
			contaId: Number(contaId)
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
		Swal.fire({
			title: "Editado com sucesso",
			icon: "success",
		})
		window.location.href = "acessar-escolas";
	});


}