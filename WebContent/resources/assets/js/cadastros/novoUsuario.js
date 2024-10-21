

$(document).ready(function() {
	$('select').select2();
	$.ajax({
		url: url_base + "/escolas",
		type: "GET",
		async: false,
	})
		.done(function(data) {
			escolas = data;
			$.each(data, function(index, item) {
				$('#escolaIdEdit').append($('<option>', {
					value: item.idEscola,
					text: item.nomeEscola,
					name: item.nomeEscola
				}));
			});
			$.each(data, function(index, item) {
				$('#escolaId').append($('<option>', {
					value: item.idEscola,
					text: item.nomeEscola,
					name: item.nomeEscola
				}));
			});
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});
		$('select').select2();
});
$("#phone").mask("(99) 99999-9999");

$("#phone").on("blur", function() {
    var last = $(this).val().substr( $(this).val().indexOf("-") + 1 );

    if( last.length == 3 ) {
        var move = $(this).val().substr( $(this).val().indexOf("-") - 1, 1 );
        var lastfour = move + last;
        var first = $(this).val().substr( 0, 9 );

        $(this).val( first + '-' + lastfour );
    }
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

	var logoContaFile = $('#logoConta')[0].files[0];

	if (logoContaFile) {
		convertToBase64(logoContaFile, function(base64String) {
			let imgSplit = base64String.split(',')

			var dadosFormulario = {
				conta: $('#conta').val(),
				tipoConta: $('#tipoConta').val(),
				cnpj: $('#cnpj').val().replace(/[^\d]+/g, ''),
				cep: $('#cep').val().replace(/[^\d]+/g, ''),
				endereco: $('#endereco').val(),
				complemento: $('#complemento').val(),
				numero: $('#numero').val(),
				bairro: $('#bairro').val(),
				municipio: $('#municipio').val(),
				uf: $('#uf').val(),
				distrito: $('#distrito').val(),
				logoConta: imgSplit[1],
			};


			$.ajax({
				url: url_base + '/conta',
				type: "POST",
				data: JSON.stringify(dadosFormulario),
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
				Swal.fire({
					title: "Cadastrado com sucesso",
					icon: "success",
				})
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
	const message = $("<p id='errMessageCnpj'></p>").text("CNPJ Inválido").css('color', '#FF0000');

	if (cnpjValido(cnpj.val())) {
		$("#btn-submit").removeAttr('disabled');
		cnpj.removeClass('err-message')
		$('#errMessageCnpj').css('display', 'none')
	} else {
		if ($("#cardCNPJ").find('#errMessageCnpj').length == 1) {
			$("#cardCNPJ").find('#errMessageCnpj' + this.value).remove()
		}
		$("#btn-submit").attr("disabled", "disabled");
		cnpj.addClass('err-message')
		$("#cardCNPJ").append(message)
		message.show()
	}
});

