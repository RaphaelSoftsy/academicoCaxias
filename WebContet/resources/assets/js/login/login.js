let contas = [
	{
		"contaId": 1,
		"email": "teste@gmail.com",
		"senha": "1234",
		"conta": "CAXIAS DO SUL",
		"tipoConta": "PU",
		"cnpj": "08770189000103",
		"cep": "95070561",
		"endereco": "AV. Professor Antonio Vignoli",
		"numero": "151",
		"complemento": "",
		"bairro": "Presidente Vargas",
		"municipio": "Caxias do Sul",
		"distrito": "",
		"uf": "RS",
		"dataCadastro": "2024-05-07T15:04:45",
		"ativo": "S",
		"logo": "https://www.eetcs.com.br/images/logo-transparente-eetcs.png"
	},
	{
		"contaId": 2,
		"email": "teste2@gmail.com",
		"senha": "1234",
		"conta": "Tathilandia",
		"tipoConta": "PV",
		"cnpj": "08770189000103",
		"cep": "95070561",
		"endereco": "AV. Professor Antonio Vignoli",
		"numero": "151",
		"complemento": "",
		"bairro": "Presidente Vargas",
		"municipio": "Caxias do Sul",
		"distrito": "",
		"uf": "RS",
		"dataCadastro": "2024-05-07T15:04:45",
		"ativo": "S",
		"logo": "https://wikiwandv2-19431.kxcdn.com/_next/image?url=https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Logo_UCS_Vertical_PNG.png/640px-Logo_UCS_Vertical_PNG.png&w=640&q=50"
	}
]



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
		let status = false
		contas.forEach(
			(element) => {
				if (inputEmail.val() == element.email && inputPassword.val() == element.senha) {
					if ($("#remeberMeCheck").checked){
						localStorage.setItem('contaId', element.contaId)
					}else{
						sessionStorage.setItem('contaId', element.contaId)
					}
					window.location.href = "login/conta"
					status = true
				}
			})

		if (status == true) {
			Swal.fire({
				title: 'Login feito com sucesso',
				text: 'Redirecionando você...',
				icon: 'success',
				showConfirmButton: false,
				timer: 1500

			})
		} else {
			Swal.fire({
				title: 'Email ou senha incorretos!',
				text: 'Verifique se seu email ou senha foram digitados corretamente',
				icon: 'error',
				confirmButtonText: 'Ok'
			})
		}


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


