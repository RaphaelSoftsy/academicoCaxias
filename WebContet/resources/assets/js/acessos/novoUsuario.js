const contaId = sessionStorage.getItem('contaId')
const idUsuario = params.get("id");

$(document).ready(function() {

	$(".reveal").on('click', function() {
		let pwd = $(this).siblings("input");
		let icon = $(this).find("i");
		if (pwd.attr('type') === 'password') {
			pwd.attr('type', 'text');
			icon.removeClass("fa-eye").addClass("fa-eye-slash");
		} else {
			pwd.attr('type', 'password');
			icon.removeClass("fa-eye-slash").addClass("fa-eye");
		}
	});

	$(".reveal-pwd").on('click', function() {
		let pwd = $(this).siblings("input");
		let icon = $(this).find("i");
		if (pwd.attr('type') === 'password') {
			pwd.attr('type', 'text');
			icon.removeClass("fa-eye").addClass("fa-eye-slash");
		} else {
			pwd.attr('type', 'password');
			icon.removeClass("fa-eye-slash").addClass("fa-eye");
		}
	});

	$.ajax({
		url: url_base + '/contaPadraoAcessos/conta/' + contaId,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			if (item.ativo == "S") {
				$('#mySelect').append($('<option>', {
					value: item.idContaPadraoAcesso,
					text: item.padraoAcesso,
					name: item.idContaPadraoAcesso
				}));
			}
		});
	})

	//Exemplo para setar valor
	/*$('#mySelect').val([1, 6])*/

	if (idUsuario != undefined) {
		let listaAcessos = []
		$("#divSenha").hide();
		$("#divNovaSenha").hide();
		$("#tituloPagina, #tituloForm").text("Editar Usuario");
		$("#h1-curso").text("Editar Usuario");
		$("#btn-adicionar").text("Editar");

		$.ajax({
			url: url_base + '/usuario/' + idUsuario,
			type: "GET",
			contentType: "application/json; charset=utf-8",
			beforeSend: function() {
				Swal.showLoading();
			},
			error: function(e) {
				console.log(e);
				Swal.close();
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Não foi possível cadastrar nesse momento!",
				});
			}
		}).done(function(data) {
			Swal.close();
			$('#usuario').val(data.usuario.usuario);
			$('#nomeCompleto').val(data.usuario.nomeCompleto);
			$('#email').val(data.usuario.email);
			$('#cpf').val(data.usuario.cpf);
			$('#dataNascimento').val(formatarDataParaISO(data.usuario.dataNascimento)); // Aqui colocamos no formato yyyy-MM-dd
			$('#senha').val(data.usuario.senha);
			$('#celular').val(data.usuario.celular);



			$.each(data.usuarioConta, function(index, item) {
				console.log(item)
				listaAcessos.push(item.contaPadraoAcessoId)
			});

			console.log(listaAcessos)
			$('#mySelect').val(listaAcessos)
			console.log(listaAcessos)
			console.log($('#mySelect').val())

			$('#mySelect').chosen();
		});
	} else {
		$("#containerAlterarSenha").hide();
		$("#divNovaSenha").hide();
		$("#novaSenha").removeAttr("required");
		$('#mySelect').chosen();
	}

});

function formatarDataParaISO(data) {
	if (!data) {
		return "";
	}

	var dataObj = new Date(data);

	if (isNaN(dataObj)) {
		return "";
	}

	var dia = String(dataObj.getUTCDate()).padStart(2, "0");
	var mes = String(dataObj.getUTCMonth() + 1).padStart(2, "0");
	var ano = dataObj.getUTCFullYear();

	return ano + "-" + mes + "-" + dia; // Formato ISO para campos de data (yyyy-MM-dd)
}



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



$('input[name="alterarSenha"]').change(function() {
	if ($(this).is(':checked') == true) {
		$('#divNovaSenha').show();
		$("#novaSenha").attr('required', true);
	} else {
		$('#divNovaSenha').hide();
		$("#novaSenha").val(null).attr('required', false);
	}
});

const cadastrar = () => {
	let dadosFormulario = {
		"usuario": $('#usuario').val(),
		"nomeCompleto": $('#nomeCompleto').val(),
		"email": $('#email').val(),
		"emailVerificado": "N",
		"cpf": $('#cpf').val().replace(/[^a-zA-Z0-9 ]/g, ""),
		"dataNascimento": `${$('#dataNascimento').val()}T00:00:00`,
		"senha": $('#senha').val(),
		"celular": $('#celular').val().replace(/[^a-zA-Z0-9 ]/g, ""),
		"celularVerificado": "N"
	};

	$.ajax({
		url: url_base + '/usuario',
		type: "POST",
		data: JSON.stringify(dadosFormulario),
		contentType: "application/json; charset=utf-8",
		beforeSend: function() {
			Swal.showLoading()
		},
		error: function(e) {
			Swal.close();
			console.log(e)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível cadastar nesse momento!",
			});
		}
	}).done(function(data) {
		let arrayAcessos = $('#mySelect').val()

		$.each(arrayAcessos, function(index, item) {
			let objeto = {
				"usuarioId": data.idUsuario,
				"contaPadraoAcessoId": item
			}

			$.ajax({
				url: url_base + '/usuarioContas',
				type: "POST",
				data: JSON.stringify(objeto),
				contentType: "application/json; charset=utf-8",
				error: function(e) {
					Swal.close();
					console.log(e)
					Swal.fire({
						icon: "error",
						title: "Oops...",
						text: "Não foi possível cadastar nesse momento!",
					});
				}
			}).done(function(res) {
			});
		});

		Swal.close();
		Swal.fire({
			title: "Cadastrado com sucesso",
			icon: "success",
		}).then(() => {
			window.location.href = "usuarios";
		})
	});
}

const editar = () => {
	let dadosFormulario = {
		"idUsuario": idUsuario,
		"usuario": $('#usuario').val(),
		"nomeCompleto": $('#nomeCompleto').val(),
		"email": $('#email').val(),
		"emailVerificado": "N",
		"cpf": $('#cpf').val().replace(/[^a-zA-Z0-9 ]/g, ""),
		"dataNascimento": `${$('#dataNascimento').val()}T00:00:00`,
		"senha": $('#senha').val(),
		"celular": $('#celular').val().replace(/[^a-zA-Z0-9 ]/g, ""),
		"celularVerificado": "N"
	};

	$.ajax({
		url: url_base + '/usuario',
		type: "PUT",
		data: JSON.stringify(dadosFormulario),
		contentType: "application/json; charset=utf-8",
		beforeSend: function() {
			Swal.showLoading()
		},
		error: function(e) {
			Swal.close();
			console.log(e)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível editar nesse momento!",
			});
		}
	}).done(function(data) {
		$.ajax({
			url: url_base + '/usuarioContas/usuario/' + idUsuario,
			type: "delete",
			contentType: "application/json; charset=utf-8",
			error: function(e) {
				Swal.close();
				console.log(e)
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Não foi possível editar nesse momento!",
				});
			}
		})

		let arrayAcessos = $('#mySelect').val()

		$.each(arrayAcessos, function(index, item) {
			let objeto = {
				"usuarioId": idUsuario,
				"contaPadraoAcessoId": item
			}

			$.ajax({
				url: url_base + '/usuarioContas',
				type: "POST",
				data: JSON.stringify(objeto),
				contentType: "application/json; charset=utf-8",
				error: function(e) {
					Swal.close();
					console.log(e)
					Swal.fire({
						icon: "error",
						title: "Oops...",
						text: "Não foi possível editar nesse momento!",
					});
				}
			}).done(function(res) {
			});
		});

		Swal.close();
		Swal.fire({
			title: "Editado com sucesso",
			icon: "success",
		}).then(() => {
			window.location.href = "usuarios";
		})
	});
}

$("#formNovoCadastro").submit(function(e) {
	e.preventDefault();

	if ($("#senhaConfirmacao").val() != $("#senha").val()) {
		Swal.fire({
			icon: "error",
			title: "A duas senhas devem ser iguais!",
			text: "Verifique as senha novamente!",
		});
	}else{
		if (idUsuario != undefined) {
		editar()
	} else {
		cadastrar()
	}
	}

	
});
