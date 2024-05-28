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
		"conta": "Tathilandia ",
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
		"logo": "https://tathilandia.com.br/wp-content/uploads/logo-abertura.png"
	}
]




$(document).ready(function() {


	contas.forEach(
		escola => {
			let card = $('<div class="card"></div>')
			card.css({
				"width": "18rem",
				"height": "16rem",
				"display": "flex",
				"align-items": "center",
				"flex-direction": "column",
				"padding": ".5%"
			})
			let containerImg = $('<div></div>')
			containerImg.css({
				"width": "100%",
				"height": "40%",
				"display": "flex",
				"justify-content": "center"
				
				
			})
			let imgCard = $('<img class="card-img-top">')
			containerImg.append(imgCard)
			imgCard.attr('src', escola.logo)
			imgCard.css('width','100%')
			let cardBody = $('<div  class="card-body school-card"></div>')
			cardBody.css({
				"width": "270px"
			})
			let cardTitle = $('<h5 class="card-title"></h5>')
			cardTitle.css('padding-right', '0')
			cardTitle.append(escola.conta)
			let cardText = $('<p class="card-text"></p>')
			cardText.append(escola.cnpj)
			let cardButton = $('<a href="#" class="btn btn-primary">Entrar</a>')
			
			card.append(containerImg)
			card.append(cardBody)
			cardBody.append(cardTitle)
			cardBody.append(cardText)
			cardBody.append(cardButton)
			$('#cardContainer').append(card)
			$('#cardContainer').css({
				"display": "flex",
				"flex-wrap": "wrap"
			})
			
			cardButton.click(function(){
					sessionStorage.setItem('nomeConta', escola.conta)
				   window.location.href = $("#caminhoRelativo").val()+"/acessar-escolas"
			})

		})
		
		
});








