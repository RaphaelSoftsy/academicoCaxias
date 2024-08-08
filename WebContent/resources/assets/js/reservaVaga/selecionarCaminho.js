var dados = [];
var id = '';
var nome = '';
var rows = 7;
var currentPage = 1;
var pagesToShow = 5;
const contaId = localStorage.getItem('contaId')


$(document).ready(function() {

	$("#continueReserva").click(()=>{
		$("#containerContinuarRes").show()
		
		
	})
});


$("#btn-submit").click((e)=>{
	e.preventDefault()
	
	const reserva = $("#reserva").val()
	const typeDigitado = $("#typeDigitado").val()
	let url = ""
	
	if(reserva == 1){
		url = "?cpfNum=" + typeDigitado
	}else if(reserva == 2){
		url = "?candidato=" + typeDigitado
	}else if(reserva == 3){
		url = "?rgNum=" + typeDigitado
	}else if(reserva == 4){
		url = "?certNasc=" + typeDigitado
	}else if(reserva == 5){
		url = "?certCasamento=" + typeDigitado
	}
	
	
	$.ajax({
		url: url_base + "/candidatos/step" + url,
		type: "GET",
		async: false,
	}).done(function(data) {
		if(data[0].step == "Cadastro de Responsável"){
			localStorage.setItem("numeroReserva", data[0].candidato)
			localStorage.setItem("idCandidato", data[0].idCandidato)
			window.location.href = "codigo-reserva"
		}else if(data[0].step == "Envio de Documentos"){
			localStorage.setItem("numeroReserva", data[0].candidato)
			localStorage.setItem("idCandidato", data[0].idCandidato)
			window.location.href = "reserva"
		}else if(data[0].step == "Escolha de Oferta"){
			localStorage.setItem("numeroReserva", data[0].candidato)
			localStorage.setItem("idCandidato", data[0].idCandidato)
			window.location.href = "listaResponsavel"
		}else{
			Swal.fire({
				title: "Nenhum candidato encontrado!",
				icon: "error",
			})
		}
		
		
		
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	});

	
	
	
	
})