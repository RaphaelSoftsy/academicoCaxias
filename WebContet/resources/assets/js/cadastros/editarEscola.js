var id = '';

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
			console.log(data)

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
			
			$("#localizacaoId").val(ref.localizacao.idLocalizacao).attr('selected', true);
			$("#dependenciaAdmId").val(ref.dependenciaAdm.idDependenciaAdministrativa).attr('selected', true);
			$("#situacaoFuncionamentoId").val(ref.situacaoFuncionamento.idSituacaoFuncionamento).attr('selected', true);
			$("#formaOcupacaoPredioId").val(ref.formaOcupacaoPredio.idFormaOcupacaoPredio).attr('selected', true);
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
		$("#logoEscola").val(null).attr('required',false);
	}
});


$("#formEditar").submit(function(e) {
	e.preventDefault();
	
	var imgBase64 = '';

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
			imgBase64 = base64String;
		});
	}

	var dadosFormulario = {
		idEscola: id,
		nomeEscola: $('#nome').val(),
		logoEscola: imgBase64,
		tipoEscola: $('#tipoEscola').val(),
		cnpj: $('#cnpj').val().replace(/[^\d]+/g,''),
		codigoInep: $('#codigoInep').val(),
		cep: $('#cep').val().replace(/[^\d]+/g,''),
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
		localizacaoId: $('#localizacaoId').val(),
		dependenciaAdmId: $('#dependenciaAdmId').val(),
		situacaoFuncionamentoId: $('#situacaoFuncionamentoId').val(),
		formaOcupacaoPredioId: $('#formaOcupacaoPredioId').val()
	};

	$.ajax({
		url: url_base + '/escolas',
		type: "PUT",
		data: JSON.stringify(dadosFormulario),
		contentType: "application/json; charset=utf-8",
		error: function(e) {
			console.log(e)
		}
	}).done(function(data) {
		alert('Editado com sucesso!')
		window.location.href = "escolas";
	});

});