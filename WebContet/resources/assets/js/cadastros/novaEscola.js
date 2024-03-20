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
				latitude: '90',
				longitude: '90',
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