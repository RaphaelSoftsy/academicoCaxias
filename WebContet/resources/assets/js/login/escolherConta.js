let contas = [
	{
		"contaId": 1,
		"email": "teste@gmail.com",
		"senha": "1234",
		"conta": "Prefeitura de Uruçui",
		"tipoConta": "PU",
		"cnpj": "06.985.832/0001-90",
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
		"logo": "http://localhost:8090/front-educacional-caxias/resources/assets/img/logoPrefeitura.png"
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








