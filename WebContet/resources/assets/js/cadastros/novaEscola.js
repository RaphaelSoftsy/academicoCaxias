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
	})
});


$("#formNovoCadastro").submit(function(e) {
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
		nomeEscola: $('#nome').val(),
		logoEscola: imgBase64,
		tipoEscola: $('#tipoEscola').val(),
		cnpj: $('#cnpj').val().replace(/[^\d]+/g,''),
		codigoInep: $('#codigoInep').val(),
		cep: $('#cep').val().replace(/[^\d]+/g,''),
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
		localizacaoId: $('#localizacaoId').val(),
		dependenciaAdmId: $('#dependenciaAdmId').val(),
		situacaoFuncionamentoId: $('#situacaoFuncionamentoId').val(),
		formaOcupacaoPredioId: $('#formaOcupacaoPredioId').val()
	};

	console.log(dadosFormulario);

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