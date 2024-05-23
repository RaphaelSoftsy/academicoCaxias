const contaId = sessionStorage.getItem('contaId')
var $fields = $('#nome', '#logoEscola', '#email', '#cnpj',
	'#codigoInep', '#zoneamentoId', 'input[ name="isAcessivel"]',
	'input[name="isIndigena"', 'input[name="merendaEscolar"]',
	'input[name="possuiAguaPotavel"]', 'input[name="internetBandaLarga"]',
	'input[name="exameSelecao"', 'input[name="compartilhaEspaco"',
	'input[name="usaEspacoEntornoEscolar"', 'input[name="pppAtualizado12Meses"]',
	'#numCME', '#numParecerCME', '#dependenciaAdmId', '#situacaoFuncionamentoId',
	'#formaOcupacaoPredioId', '#tipoEscola', '#categoriaEscolaPrivadaId',
	'#entidadeSuperiorId', '#orgaoPublicoId', '#localizacaoId', '#cep',
	'#uf', '#municipio', '#bairro', '#numero', '#latitude', '#longitude'

);
$(document).ready(function() {
	getValorSelects()
});

$("#cep").blur(function() {

	$('.bg-loading').fadeIn()

	$.ajax({
		url: 'https://viacep.com.br/ws/' + $("#cep").val() + '/json/',
		type: "get",
		async: false,
	}).done(function(data) {

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
		} else {
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
		}).fail(() => {


		})
	})

	$('.bg-loading').fadeOut()
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
			let imgSplit = base64String.split(',')

			var dadosFormulario = {
				nomeEscola: $('#nome').val(),
				logoEscola: imgSplit[1],
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
				"orgaoPublicoId": Number($('#orgaoPublicoId').val()),
				contaId: Number(contaId)
			};


			$.ajax({
				url: url_base + '/escolas',
				type: "POST",
				data: JSON.stringify(dadosFormulario),
				contentType: "application/json; charset=utf-8",
				error: function(e) {
					console.log(e)
					Swal.fire({
						icon: "error",
						title: "Oops...",
						text: "Não foi possível cadastrar a escolaweb!",
					});
				}
			}).done(function(data) {
				Swal.fire({
					title: "Cadastrado com sucesso",
					icon: "success",
				})
				window.location.href = "escolas";
			});
		});
	}

});

function allFilled($fields) {
	return $fields.filter(function() {
		return this.value === '';
	}).length == 0;
}

$fields.on('keyup change', function() {
	if (allFilled($fields)) {
		$('#btn-submit').removeAttr('disabled');
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
	const message = $("<p id='errMessageCnpj'></p>").text("CNPJ Inválido").css('color', '#FF0000');

	if (cnpjValido(cnpj.val())) {
		cnpj.removeClass('err-message')
		$('#errMessageCnpj').css('display', 'none')
	} else {
		if ($("#cardCNPJ").find('#errMessageCnpj').length == 1) {
			$("#cardCNPJ").find('#errMessageCnpj' + this.value).remove()
		}
		cnpj.addClass('err-message')
		$("#cardCNPJ").append(message)
		message.show()
	}
});
