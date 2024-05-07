$(document).ready(function() {
	getValorSelects()
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



$("#formNovoCadastro").submit(function(e) {
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
			var dadosFormulario = {
				nomeEscola: $('#nome').val(),
				logoEscola: base64String,
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
				educacaoIndigena: $('input[name="isIndigena"]:checked').val(),
				exameSelecao: $('input[name="exameSelecao"]:checked').val(),
				compartilhaEspaco: $('input[name="compartilhaEspaco"]:checked').val(),
				usaEspacoEntornoEscolar: $('input[name="usaEspacoEntornoEscolar"]:checked').val(),
				pppAtualizado12Meses: $('input[name="pppAtualizado12Meses"]:checked').val(),
				acessivel: $('input[name="isAcessivel"]:checked').val(),

				"merendaEscolar": $('input[name="merendaEscolar"]:checked').val(),
				"possuiAguaPotavel": $('input[name="possuiAguaPotavel"]:checked').val(),
				"internetBandaLarga": $('input[name="internetBandaLarga"]:checked').val(),

				localizacaoId: Number($('#localizacaoId').val()),
				dependenciaAdmId: Number($('#dependenciaAdmId').val()),
				situacaoFuncionamentoId: Number($('#situacaoFuncionamentoId').val()),
				formaOcupacaoPredioId: Number($('#formaOcupacaoPredioId').val()),

				"zoneamentoId": Number($('#zoneamentoId').val()),
				"categoriaEscolaPrivadaId": Number($('#categoriaEscolaPrivadaId').val()),
				"entidadeSuperiorId": Number($('#entidadeSuperiorId').val()),
				"orgaoPublicoId": Number($('#orgaoPublicoId').val())
			};


			$.ajax({
				url: url_base + '/escolas',
				type: "POST",
				data: JSON.stringify(dadosFormulario),
				contentType: "application/json; charset=utf-8",
				error: function(e) {
					console.log(e)
					alert(e.responseJSON.message)
				}
			}).done(function(data) {
				alert('Cadastrado com sucesso!')
				window.location.href = "escolas";
			});
		});
	}

});

function cnpjValido(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj.length != 14)
        return false;

    var tamanhoTotal = cnpj.length - 2
    var cnpjSemDigitos = cnpj.substring(0, tamanhoTotal);
    var digitosVerificadores = cnpj.substring(tamanhoTotal);
    var soma = 0;
    var pos = tamanhoTotal - 7;
    for (i = tamanhoTotal; i >= 1; i--) {
        soma += cnpjSemDigitos.charAt(tamanhoTotal - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitosVerificadores.charAt(0))
        return false;

    tamanhoTotal = tamanhoTotal + 1;
    cnpjSemDigitos = cnpj.substring(0, tamanhoTotal);
    soma = 0;
    pos = tamanhoTotal - 7;
    for (i = tamanhoTotal; i >= 1; i--) {
        soma += cnpjSemDigitos.charAt(tamanhoTotal - i) * pos--;
        if (pos < 2)
            pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitosVerificadores.charAt(1))
        return false;

    return true;
}

$("#cnpj").blur(function() {
	let cnpj = $('#cnpj')
	const message =  $("<p id='errMessageCnpj'></p>").text("CNPJ Inválido").css('color', '#FF0000');    

	if(cnpjValido(cnpj.val())){
		$("#btn-submit").removeAttr('disabled');
		cnpj.removeClass('err-message')
		$('#errMessageCnpj').css('display', 'none')
    }else{
		$("#btn-submit").attr("disabled", "disabled");
		cnpj.addClass('err-message')
		$("#cardCNPJ").append(message)	
		message.show()
	}
});
