const contaId = sessionStorage.getItem('contaId')

$(document).ready(function() {



	$.ajax({
		url: url_base + '/contaPadraoAcessos/conta/' + contaId,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {

			if (item.ativo == "S") {
				$('#padroesAcessoId').append($('<option>', {
					value: item.idContaPadraoAcesso,
					text: item.padraoAcesso,
					name: item.padraoAcesso
				}));
			}

		});
	})

	$.ajax({
		url: url_base + '/transacoes',
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {

			if (item.moduloId == 1) {

				// Criação do elemento card
				var card = $('<div>').addClass('card card-check');

				// Criação do cabeçalho do card
				var cardHeader = $('<div>').addClass('card-header d-flex justify-content-between');
				cardHeader.append($('<span>').text(item.nome));
				cardHeader.append($('<button>').addClass('btn btn-sm btn-danger').text('Tirar Permissão').attr('id', 'btnTirarPermissao'));

				// Criação do corpo do card
				var cardBody = $('<div>').addClass('card-body');
				var row = $('<div>').addClass('row mb-3');
				var colLeitura = $('<div>').addClass('col-md-6 small-inputs');
				var colEscrita = $('<div>').addClass('col-md-6 small-inputs');

				// Criação dos elementos para Leitura
				var labelLeitura = $('<label>').addClass('form-label').attr('for', 'isLeitura').text('Leitura:');
				var divLeitura = $('<div>').addClass('form-control');
				var radioLeituraSim = $('<input>').addClass('form-check-input').attr({
					type: 'radio',
					name: 'isLeitura',
					id: 'isLeitura',
					value: 'S'
				});
				var labelLeituraSim = $('<label>').addClass('form-check-label').attr('for', 'isLeituraCargoProfessor').text('Sim');
				var radioLeituraNao = $('<input>').addClass('form-check-input').attr({
					type: 'radio',
					name: 'isLeitura',
					id: 'isLeitura',
					value: 'N'
				});
				var labelLeituraNao = $('<label>').addClass('form-check-label').attr('for', 'isLeituraCargoProfessor').text('Não');

				divLeitura.append(
					$('<div>').addClass('form-check form-check-inline').append(radioLeituraSim).append(labelLeituraSim),
					$('<div>').addClass('form-check form-check-inline').append(radioLeituraNao).append(labelLeituraNao)
				);

				// Criação dos elementos para Escrita
				var labelEscrita = $('<label>').addClass('form-label').attr('for', 'isEscrita').text('Escrita:');
				var divEscrita = $('<div>').addClass('form-control');
				var radioEscritaSim = $('<input>').addClass('form-check-input').attr({
					type: 'radio',
					name: 'isEscrita',
					id: 'isEscrita',
					value: 'S'
				});
				var labelEscritaSim = $('<label>').addClass('form-check-label').attr('for', 'isEscritaCargoProfessor').text('Sim');
				var radioEscritaNao = $('<input>').addClass('form-check-input').attr({
					type: 'radio',
					name: 'isEscrita',
					id: 'isEscrita',
					value: 'N'
				});
				var labelEscritaNao = $('<label>').addClass('form-check-label').attr('for', 'isEscritaCargoProfessor').text('Não');

				divEscrita.append(
					$('<div>').addClass('form-check form-check-inline').append(radioEscritaSim).append(labelEscritaSim),
					$('<div>').addClass('form-check form-check-inline').append(radioEscritaNao).append(labelEscritaNao)
				);

				// Montagem da estrutura do DOM
				colLeitura.append(labelLeitura, divLeitura);
				colEscrita.append(labelEscrita, divEscrita);
				row.append(colLeitura, colEscrita);
				cardBody.append(row);
				card.append(cardHeader, cardBody);

				// Adicionar o card criado ao elemento desejado no DOM
				$('.hr-config').after(card); // Substitua '.container' pelo seletor correto onde você quer inserir o card

			}

		});
	})

})






// Função para capturar os dados do formulário ao ser submetido
$('#formSubmit').submit(function(event) {

	event.preventDefault();

	let jsonArray = [];

	$('.card-check').each(function() {
		let cargo = $(this).find('.card-header span').text().trim();
		let aparecerMenu = $(this).find('input[name="isCargoProfessor"]:checked').val() === 'S';
		let leitura = $(this).find('input[name="isLeituraCargoProfessor"]:checked').val() === 'S';
		let escrita = $(this).find('input[name="isEscritaCargoProfessor"]:checked').val() === 'S';

		let obj = {
			"contaPadraoAcessoId": $('#padroesAcessoId').val(),
			"transacaoId": 1,
			"acessa": leitura,
			"altera": escrita
		};

		jsonArray.push(obj);
	});


	console.log(cpf)


	// Aqui você pode acessar os valores dos campos de input usando jQuery

	// Aqui você pode enviar o objeto formData para onde for necessário, como uma requisição AJAX
	// Exemplo:

	/*$.ajax({
		url: url_base + '/pessoas',
		type: "POST",
		data: JSON.stringify(dadosFormulario),
		contentType: "application/json; charset=utf-8",
		beforeSend: function() {
			Swal.showLoading()
		},
		error: function(e) {
			Swal.close()
			console.log(e)
			console.log(e.responseJSON)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
			});
		}
	}).done(function(data) {
		Swal.close()
		Swal.fire({
			title: "Editado com sucesso",
			icon: "success",
		})
		
	});*/


});



$('#ufNascimentoId').change(() => {
	$("#municipioNascimentoId").attr("disabled", false)
	$("#municipioNascimentoId").empty()
	$("#municipioNascimentoId").append("<option selected disabled>Selecione uma opção</option>")
	$.ajax({
		url: url_base + '/municipio/uf/' + $('#ufNascimentoId').val(),
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#municipioNascimentoId').append($('<option>', {
				value: item.idMunicipio,
				text: item.nomeMunicipio,
				name: item.nomeMunicipio
			}));
		});


	})
})

$('#certidaoCasamentoUfCartorioId').change(() => {
	$("#certidaoCasamentoCidadeCartorioId").attr("disabled", false)
	$("#certidaoCasamentoCidadeCartorioId").empty()
	$("#certidaoCasamentoCidadeCartorioId").append("<option selected disabled>Selecione uma opção</option>")
	$.ajax({
		url: url_base + '/municipio/uf/' + $('#certidaoCasamentoUfCartorioId').val(),
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#certidaoCasamentoCidadeCartorioId').append($('<option>', {
				value: item.idMunicipio,
				text: item.nomeMunicipio,
				name: item.nomeMunicipio
			}));
		});


	})
})


$('#certidaoNascimentoUfCartorioId').change(() => {
	$("#certidaoNascimentoMunicipioCartorioId").attr("disabled", false)
	$("#certidaoNascimentoMunicipioCartorioId").empty()
	$("#certidaoNascimentoMunicipioCartorioId").append("<option selected disabled>Selecione uma opção</option>")
	$.ajax({
		url: url_base + '/municipio/uf/' + $('#certidaoNascimentoUfCartorioId').val(),
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#certidaoNascimentoMunicipioCartorioId').append($('<option>', {
				value: item.idMunicipio,
				text: item.nomeMunicipio,
				name: item.nomeMunicipio
			}));
		});


	})
})



$('input[name="isRne"]').click(function() {
	if ($(this).is(':checked')) {
		$("#rneSec").show();
	} else {
		$("#rneSec").hide();
	}
});

$('input[name="qualPreencher"]').click(function() {
	if ($(this).is(':checked')) {
		$("#certidaoNascimento").show();
		$("#certidaoCasamento").hide();
		$("[name='certidaoNascimentoNumero']").attr("required", true);
		$("[name='certidaoNascimentoCidadeCartorio']").attr("required", true);
		$("[name='certidaoNascimentoCartorio']").attr("required", true);
		$("[name='certidaoNascimentoUfCartorioId']").attr("required", true);
		$("[name='certidaoNascimentoDataEmissao']").attr("required", true);
		$("[name='certidaoNascimentoFolha']").attr("required", true);
		$("[name='certidaoNascimentoLivro']").attr("required", true);
		$("[name='certidaoNascimentoOrdem']").attr("required", true);

		$("[name='certidaoCasamentoNumero']").attr("required", false);
		$("[name='certidaoCasamentoCartorio']").attr("required", false);
		$("[name='certidaoCasamentoUfCartorioId']").attr("required", false);
		$("[name='certidaoCasamentoCidadeCartorio']").attr("required", false);
		$("[name='certidaoCasamentoFolha']").attr("required", false);
		$("[name='certidaoCasamentoLivro']").attr("required", false);
		$("[name='certidaoCasamentoOrdem']").attr("required", false);
		$("[name='certidaoCasamentoDataEmissao']").attr("required", false);

	} else {
		$("#certidaoNascimento").hide();
		$("#certidaoCasamento").show();
		$("[name='certidaoCasamentoNumero']").attr("required", true);
		$("[name='certidaoCasamentoCartorio']").attr("required", true);
		$("[name='certidaoCasamentoUfCartorioId']").attr("required", true);
		$("[name='certidaoCasamentoCidadeCartorio']").attr("required", true);
		$("[name='certidaoCasamentoFolha']").attr("required", true);
		$("[name='certidaoCasamentoLivro']").attr("required", true);
		$("[name='certidaoCasamentoOrdem']").attr("required", true);
		$("[name='certidaoCasamentoDataEmissao']").attr("required", true);

		$("[name='certidaoNascimentoNumero']").attr("required", false);
		$("[name='certidaoNascimentoCidadeCartorio']").attr("required", false);
		$("[name='certidaoNascimentoCartorio']").attr("required", false);
		$("[name='certidaoNascimentoUfCartorioId']").attr("required", false);
		$("[name='certidaoNascimentoDataEmissao']").attr("required", false);
		$("[name='certidaoNascimentoFolha']").removeattr("required", false);
		$("[name='certidaoNascimentoLivro']").attr("required", false);
		$("[name='certidaoNascimentoOrdem']").attr("required", false);

	}
});

$("#nacionalidadeId").on("blur", () => {
	if ($('#nacionalidadeId').find(":selected").text() != "Brasileiro" && $('#nacionalidadeId').find(":selected").text() != "Selecione uma opção") {
		$("#rne").show()
	} else {
		$("#rne").hide()
	}
})

function cpfValido(cpf) {
	cpf = cpf.replace(/[^\d]+/g, '');

	if (cpf.length != 11)
		return false;

	var soma = 0;
	var resto;
	for (var i = 1; i <= 9; i++) {
		soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
	}
	resto = (soma * 10) % 11;

	if ((resto == 10) || (resto == 11)) {
		resto = 0;
	}

	if (resto != parseInt(cpf.substring(9, 10))) {
		return false;
	}

	soma = 0;
	for (var i = 1; i <= 10; i++) {
		soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
	}
	resto = (soma * 10) % 11;

	if ((resto == 10) || (resto == 11)) {
		resto = 0;
	}

	if (resto != parseInt(cpf.substring(10, 11))) {
		return false;
	}

	return true;
}

function ValidarCpf() {
	const cpf = $('#cpf');
	const message = $("<p id='errMessage'></p>").text("CPF Inválido").css('color', '#FF0000');
	if (cpfValido(cpf.val())) {
		$("#btn-submit").removeAttr('disabled');
		cpf.removeClass('err-message')
		$('#errMessage').css('display', 'none')
	} else {
		if ($("#cardCpf").find('#errMessage').length > 0) {
			$('#errMessage').remove()
		}
		$("#btn-submit").attr("disabled", "disabled");
		cpf.addClass('err-message')
		$("#cardCpf").append(message)
		message.show()
	}

}
$("#cpf").blur(function() {
	ValidarCpf()
});



