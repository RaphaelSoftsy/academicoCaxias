const contaId = sessionStorage.getItem('contaId')

function formatarDataParaBR(data) {
	var partesData = data.split("-");

	var dataObj = new Date(Date.UTC(
		parseInt(partesData[0]),
		parseInt(partesData[1]) - 1,
		parseInt(partesData[2])
	));

	var dia = String(dataObj.getUTCDate()).padStart(2, "0");
	var mes = String(dataObj.getUTCMonth() + 1).padStart(2, "0");
	var ano = dataObj.getUTCFullYear();

	return dia + "/" + mes + "/" + ano;
}

$(document).ready(function() {
	$.ajax({
		url: url_base + '/contaPadraoAcessos/conta/' + contaId,
		type: "get",
		contentType: "application/json; charset=utf-8",
		error: function(e) {
			console.log(e)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!"

			});
		}
	}).done(function(data) {
		data.forEach(
			escola => {
				let card = $('<div class="card"></div>')
				card.css({
					"width": "18rem",
					"height": "10rem",
					"display": "flex",
					"flex-direction": "column",
					"padding": ".5%"
				})
				let cardBody = $('<div  class="card-body school-card"></div>')
				let cardTitle = $('<h5 class="card-title"></h5>')
				cardTitle.css('padding-right', '0')
				cardTitle.append(escola.padraoAcesso)
				let cardText = $('<p class="card-text"></p>')
				cardText.append( formatarDataParaBR(escola.dtCadastro))
				let cardButton = $('<a href="#" class="btn btn-primary">Entrar</a>')

				card.append(cardBody)
				cardBody.append(cardTitle)
				cardBody.append(cardText)
				cardBody.append(cardButton)
				$('#cardContainer').append(card)
				$('#cardContainer').css({
					"display": "flex",
					"flex-wrap": "wrap"
				})

				cardButton.click(function() {
					
					
					localStorage.setItem('idContaAcesso', escola.idContaPadraoAcesso)
					sessionStorage.setItem('nomeConta', escola.padraoAcesso)
					window.location.href = $("#caminhoRelativo").val() + "/acessar-escolas"
				})
			})
	})
});








