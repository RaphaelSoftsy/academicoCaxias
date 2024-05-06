

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
		//Verificação login
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


