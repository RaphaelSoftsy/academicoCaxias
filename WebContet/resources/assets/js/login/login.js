$(document).ready(function() {


	$(".reveal").on('click', function() {
		let pwd = $(".pwd");
		let icon = $(".fa-regular");
		if (pwd.attr('type') === 'password') {
			pwd.attr('type', 'text');
			icon.removeClass("fa-eye").addClass("fa-eye-slash");
		} else {
			pwd.attr('type', 'password');
			icon.removeClass("fa-eye-slash").addClass("fa-eye");
		}
	});

	

});


$('#btnLogin').click(function() {

	let inputEmail = $('.email')
	let inputPassword = $('.senha')


	if (inputPassword.val() == "" || inputEmail.val() == "") {
		Swal.fire({
			title: 'Erro!',
			text: 'Você deve preencher todos os campos',
			icon: 'error',
			confirmButtonText: 'Ok'
		})
	} else {
		let dados = {
			usuario: inputEmail.val(),
			senha: inputPassword.val()
		}

		$.ajax({
			url: url_base + '/login',
			type: "POST",
			data: JSON.stringify(dados),
			contentType: "application/json; charset=utf-8",
			error: function(e) {
				console.log(e)
				Swal.fire({
					title: 'Email ou senha incorretos!',
					text: 'Verifique se seu email ou senha foram digitados corretamente',
					icon: 'error',
					confirmButtonText: 'Ok'
				})
			}
		}).done(function(data) {


			if ( data.usuarioConta.length == 1) {
				localStorage.setItem("idContaAcesso", data.usuarioConta[0].contaPadraoAcessoId);
			}
		
			console.log(data)
			$.ajax({
				url: url_base + '/contaPadraoAcessos/' + data.usuarioConta[0].contaPadraoAcessoId,
				type: "get",
				contentType: "application/json; charset=utf-8",
				error: function(e) {
					console.log(e)
					Swal.fire({
						title: 'Erro no sistema',
						text: 'Erro ao realizar o login, por favor tente novamente mais tarde!!',
						icon: 'error',
						confirmButtonText: 'Ok'
					})
				}
			}).done(function(responseData) {
				if ($("#remeberMeCheck").checked) {
					localStorage.setItem('contaId', responseData.contaId)
				} else {
					sessionStorage.setItem('contaId', responseData.contaId)
				}




				Swal.fire({
					title: 'Login feito com sucesso',
					text: 'Redirecionando você...',
					icon: 'success',
					showConfirmButton: false,
					timer: 1500
				})
				
				window.location.href = "login/conta"
			})
		});
	}
});

$('#btnRecuperarSenha').click(function() {

	Swal.fire({
		title: 'Digite seu email',
		input: 'email',
		customClass: {
			validationMessage: 'my-validation-message',
		},
		preConfirm: (value) => {
			if (!value) {
				Swal.showValidationMessage('<i class="fa fa-info-circle"></i> Your name is required')
			} else {
				Swal.fire({
					icon: "success",
					title: "Email enviado com sucesso!",
					text: "Verifique se email!",
					showConfirmButton: false,
					timer: 1500
				});
			}
		},
	})

});


