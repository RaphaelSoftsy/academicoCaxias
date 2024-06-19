var dados = [];
var id = '';
var nome = '';
var rows = 7;
var currentPage = 1;
var pagesToShow = 5;
const contaId = sessionStorage.getItem('contaId')
const reserva = localStorage.getItem('numeroReserva')

$(document).ready(function() {
	
	
	$("#reserva").text("Número da reserva: " + reserva)

/*	if (isNaN(contaId)) {
		Swal.fire({
			title: "Nenhum usuário localizado, logue novamente",
			icon: "info",
		}).then(result => {
			if (result) {
				window.location.href = "login"
			}
		})
	}
*/
/*
	console.log(contaId)

	$("#inputBusca").on("keyup", function() {
		var valorBusca = $(this).val().toLowerCase();

		if (valorBusca === '') {
			busca()
			$("#cola-tabela tr").show();
		} else {
			$("#cola-tabela tr").hide().filter(function() {
				return $(this).text().toLowerCase().indexOf(valorBusca) > -1;
			}).show();
		}
	});

	$("#inputBusca").on("input", function() {
		var valorBusca = $(this).val().toLowerCase();
		realizarBusca(valorBusca);
	});

	function realizarBusca(valorInput) {
		if (valorInput === '') {
			showPage(currentPage);
		} else {
			$("#cola-tabela tr").hide().filter(function() {
				return $(this).text().toLowerCase().indexOf(valorInput) > -1;
			}).show();
		}
	}


	showPage(currentPage);
	updatePagination();
*/
});
