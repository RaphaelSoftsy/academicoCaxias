const contaId = sessionStorage.getItem('contaId')
var cnpj = ''
$(document).ready(function() {
	getValorSelects()
});

$("#cep").blur(function() {

	var cep = $(this).val();
	var padrao = /^(\d)\1{4}-(\d)\2{2}$/;
	if (padrao.test(cep)) {
		Swal.fire({
			title: "CEP Inválido",
			confirmButtonText: "Ok",
			icon:'error'
		}).then((result) => {
			$("#cep").val('')
		});
	} else {
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

			} else if (data.bairro == '' && data.logradouro == '') {
				$("#bairro").prop('disabled', false)
				$("#endereco").prop('disabled', false)

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
	}
});


function getAswer(input) {

	if ($(input).is(':checked')) {
		return 'S'
	} else {
		return 'N'
	}

}


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

			if ($("#cnpj").val() == '') {
				cnpj = null
			} else {
				cnpj = $('#cnpj').val().replace(/[^\d]+/g, '');
			}

			var dadosFormulario = {
				nomeEscola: $('#nome').val(),
				logoEscola: imgSplit[1],
				tipoEscola: $('#tipoEscola').val(),
				cnpj: cnpj,
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
				dependenciaAdmId: 1/*Number($('#dependenciaAdmId').val())*/,
				situacaoFuncionamentoId: 1 /*Number($('#situacaoFuncionamentoId').val())*/,
				formaOcupacaoPredioId: 1 /*Number($('#formaOcupacaoPredioId').val())*/,
				"zoneamentoId": 1/*Number($('#zoneamentoId').val())*/,
				"categoriaEscolaPrivadaId": 1/* Number($('#categoriaEscolaPrivadaId').val())*/,
				"entidadeSuperiorId": 1 /*Number($('#entidadeSuperiorId').val())*/,
				"orgaoPublicoId": 1/*Number($('#orgaoPublicoId').val())*/,
				contaId: Number(contaId)
			};


			console.log(dadosFormulario)

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
						text: "Não foi possível cadastrar a escola!",
					});
				}
			}).done(function(data) {
				Swal.fire({
					title: "Cadastrado com sucesso",
					icon: "success",
				})
				window.location.href = "acessar-escolas";
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
