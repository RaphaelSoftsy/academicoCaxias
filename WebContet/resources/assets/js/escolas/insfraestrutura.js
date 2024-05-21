
var pefilEscola = localStorage.getItem("perfil");
var escola = JSON.parse(pefilEscola);
var nomeEscola = escola.nome;
var dados = [];
var rows = 8;
var currentPage = 1;
var pagesToShow = 5;
var escolaId = localStorage.getItem('escolaId');
var idEscolaInfraestrutura = 0
let checkS = $("#isOutrosS")
let checkN = $("#isOutrosN")

$(document).ready(function() {

	$('#tituloForm').text(nomeEscola);
	
	console.log($('#switch').is(':checked'))
	getDados()

})

$("#formNovoCadastro").submit(function(e) {

	e.preventDefault();
	
	if(dados.length > 0){
		atualizar()
	}else{
		cadastrar()
	}
	

})

function getDados (){
	$.ajax({
		url: url_base + `/escolaInfraestrutura/escola/${escolaId}`,
		type: "GET",
		async: false,
	})
		.done(function(data) {
			
			console.log(data)
			dados = data
			idEscolaInfraestrutura = data[0].idEscolaInfraestrutura

			if (data[0].escolaAcessivel == "S") {
				$('#isAcessivel').attr('checked', false);
			} else {
				$('#isAcessivel').attr('checked', true);
			}

			if (data[0].dependenciasAcessiveis == "S") {
				$('input[id="isDependenciaAcessivelS"]').prop('checked', true)
			} else {
				$('input[id="isDependenciaAcessivelN"]').prop('checked', true)
			}

			if (data[0].sanitariosAcessiveis == "S") {
				$('input[id="isSanitariosAcessivelS"]').prop('checked', true)
			} else {
				$('input[id="isSanitariosAcessivelS"]').prop('checked', true)
			}
			
			if (data[0].alimentacaoFornecida == "S") {
				$('input[id="isAlimentacaoFornecidaS"]').prop('checked', true)
			} else {
				$('input[id="isAlimentacaoFornecidaN"]').prop('checked', true)
			}
			
			if (data[0].aguaFiltrada == "S") {
				$('input[id="isAguaFiltradaS"]').prop('checked', true)
			} else {
				$('input[id="isAguaFiltradaN"]').prop('checked', true)
			}
			
			if (data[0].sanitarioDentroEscola == "S") {
				$('input[id="isSanitarioEscolaS"]').prop('checked', true)
			} else {
				$('input[id="isSanitarioEscolaN"]').prop('checked', true)
			}
			
			if (data[0].biblioteca == "S") {
				$('input[id="isBibliotecaS"]').prop('checked', true)
			} else {
				$('input[id="isBibliotecaN"]').prop('checked', true)
			}
			
			if (data[0].cozinha == "S") {
				$('input[id="isCozinhaS"]').prop('checked', true)
			} else {
				$('input[id="isCozinhaN"]').prop('checked', true)
			}
			
			if (data[0].labInformatica == "S") {
				$('input[id="isLabInformaticaS"]').prop('checked', true)
			} else {
				$('input[id="isLabInformaticaN"]').prop('checked', true)
			}
			
			if (data[0].labCiencias == "S") {
				$('input[id="isLabCienciaS"]').prop('checked', true)
			} else {
				$('input[id="isLabCienciaN"]').prop('checked', true)
			}
			
			if (data[0].salaLeitura == "S") {
				$('input[id="isSalaLeituraS"]').prop('checked', true)
			} else {
				$('input[id="isSalaLeituraN"]').prop('checked', true)
			}

			if (data[0].quadraEsportes == "S") {
				$('input[id="isQuadraEsportesS"]').prop('checked', true)
			} else {
				$('input[id="isQuadraEsportesN"]').prop('checked', true)
			}
			
			if (data[0].salaDiretoria == "S") {
				$('input[id="isSalaDiretoriaS"]').prop('checked', true)
			} else {
				$('input[id="isSalaDiretoriaN"]').prop('checked', true)
			}
			
			if (data[0].salaProfessores == "S") {
				$('input[id="isSalaProfessoresS"]').prop('checked', true)
			} else {
				$('input[id="isSalaProfessoresN"]').prop('checked', true)
			}
			
			if (data[0].salaAtendimentoEspecial == "S") {
				$('input[id="isSalaAtendimentoEspecialS"]').prop('checked', true)
			} else {
				$('input[id="isSalaAtendimentoEspecialN"]').prop('checked', true)
			}
			
			if (data[0].internet == "S") {
				$('input[id="isInternetS"]').prop('checked', true)
			} else {
				$('input[id="isInternetN"]').prop('checked', true)
			}
			
			if (data[0].bandaLarga == "S") {
				$('input[id="isBandaLargaS"]').prop('checked', true)
			} else {
				$('input[id="isBandaLargan"]').prop('checked', true)
			}
		})

		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

}

function atualizar (){
	var objeto = {
		"idEscolaEsgoto": idEscolaEsgoto,
		"escolaId": Number(escolaId),
		"redePublica": $('input[name="isRedePublica"]:checked').val(),
		"fossa": $('input[name="isFossa"]:checked').val(),
		"inexistente": $('input[name="isInexistente"]:checked').val()
	}
	
	$.ajax({
		url: url_base + "/escolaEsgoto",
		type: "PUT",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(e.responseJSON);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
				footer: "Verifique se você selecionou todos os dados!"
			});
		}
	})
		.done(function(data) {

			getDados();
			showPage(currentPage);
			updatePagination();
			Swal.fire({
				title: "Editado com sucesso",
				icon: "success",
			})
		});
	return false;
}

function cadastrar (){
	var objeto = {
		"escolaId": Number(escolaId),
		"redePublica": $('input[name="isRedePublica"]:checked').val(),
		"fossa": $('input[name="isFossa"]:checked').val(),
		"inexistente": $('input[name="isInexistente"]:checked').val()
	}
	$.ajax({
		url: url_base + "/escolaEsgoto",
		type: "POST",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(objeto)
			console.log(e)
			console.log(e.responseJSON[0].mensagem)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Este item já foi cadastrado!",

			});
		}
	})
		.done(function(data) {
			
			dados = data
			
			showPage(currentPage);
			updatePagination();
			Swal.fire({
				title: "Cadastrado com sucesso",
				icon: "success",
			})
		})
	return false;
}
