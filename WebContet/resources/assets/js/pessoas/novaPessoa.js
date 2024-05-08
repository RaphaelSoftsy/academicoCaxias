$(document).ready(function() {
	$.ajax({
		url: url_base + '/dependenciaAdministrativa',
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#dependenciaAdmId').append($('<option>', {
				value: item.idDependenciaAdministrativa,
				text: item.dependenciaAdministrativa,
				name: item.dependenciaAdministrativa
			}));
		});
	})

	$.ajax({
		url: url_base + '/raca',
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#racaId').append($('<option>', {
				value: item.idRaca,
				text: item.raca,
				name: item.raca
			}));
		});
	})

	$.ajax({
		url: url_base + '/paises',
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#paisNascimentoId').append($('<option>', {
				value: item.idPais,
				text: item.nomePais,
				name: item.nomePais
			}));
		});
		$.each(data, function(index, item) {
			$('#paisResidenciaId').append($('<option>', {
				value: item.idPais,
				text: item.nomePais,
				name: item.nomePais
			}));
		});
	})

	$.ajax({
		url: url_base + '/uf',
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#ufNascimentoId').append($('<option>', {
				value: item.idUf,
				text: item.codUf,
				name: item.codUf
			}));
		});
	})

	$.ajax({
		url: url_base + '/municipio',
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
});

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
		$("#btn-submit").attr("disabled", "disabled");
		cpf.addClass('err-message')
		$("#cardCpf").append(message)
		message.show()
	}

}
$("#cpf").blur(function() {
	ValidarCpf()
});
$("#cep").blur(function() {
	$.ajax({
		url: 'https://viacep.com.br/ws/' + $('#cep').val().replace(/[^\d]+/g, '') + '/json/',
		type: "GET",
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
		$("#endereco").val(data.logradouro);
		$("#bairro").val(data.bairro);
		$("#municipio").val(data.localidade);
		$("#uf").val(data.uf);
	});

});

$("#formNovoCadastro").submit(function(e) {
	e.preventDefault();

	var dadosFormulario = {
		nome: $('#nome').val(),
		dependenciaAdmId: $('#dependenciaAdmId').val(),
		cpf: $('#cpf').val().replace(/[^\d]+/g, ''),
		dtNascimento: $('#dtNascimento').val(),
		sexo: $('input[name="sexo"]:checked').val(),
		racaId: $('#racaId').val(),
		paisNascimentoId: $('#paisNascimentoId').val(),
		ufNascimentoId: $('#ufNascimentoId').val(),
		municipioNascimentoId: $('#municipioNascimentoId').val(),
		paisResidenciaId: $('#paisResidenciaId').val(),
		nomePai: $('#nomePai').val(),
		nomeMae: $('#nomeMae').val(),
		cep: $('#cep').val().replace(/[^\d]+/g, ''),
		numero: $('#numero').val(),
		endereco: $('#endereco').val(),
		complemento: $('#complemento').val(),
		bairro: $('#bairro').val(),
		municipio: $('#municipio').val(),
		distrito: $('#distrito').val(),
		uf: $('#uf').val(),
	};

	$.ajax({
		url: url_base + '/pessoas',
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
		window.location.href = "listarPessoas";
	});

});