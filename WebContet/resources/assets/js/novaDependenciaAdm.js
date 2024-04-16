
$(document).ready(function() {
	
var selectAno = document.getElementById('anoVigente');
var anoAtual = new Date().getFullYear();

var anosRetroativos = anoAtual - 2000;
var anosFuturos = 2;

var anoInicial = anoAtual + anosFuturos;
var anoFinal = anoAtual - anosRetroativos;

for (var i = anoInicial; i >= anoFinal; i--) {
    var option = document.createElement('option');
    option.value = i;
    option.text = i;
    selectAno.appendChild(option);
}   

	$.ajax({
		url: url_base + "/escolas",
		type: "GET",
		async: false,
	})
		.done(function(data) {
			$.each(data, function(index, item) {
				$('#escolaId').append($('<option>', {
					value: item.idEscola,
					text: item.nomeEscola,
					name: item.nomeEscola
				}));
			});
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

	$.ajax({
		url: url_base + "/anoEscolar",
		type: "GET",
		async: false,
	})
		.done(function(data) {
			$.each(data, function(index, item) {
				$('#anoEscolarId').append($('<option>', {
					value: item.idAnoEscolar,
					text: item.anoEscolar,
					name: item.anoEscolar
				}));
			});
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

	$.ajax({
		url: url_base + "/formaOrganEnsino",
		type: "GET",
		async: false,
	})
		.done(function(data) {
			$.each(data, function(index, item) {
				$('#formaOrganEnsinoId').append($('<option>', {
					value: item.idFormaOrganEnsino,
					text: item.formaOrganEnsino,
					name: item.formaOrganEnsino
				}));
			});
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

	$.ajax({
		url: url_base + "/tipoMedicao",
		type: "GET",
		async: false,
	})
		.done(function(data) {
			$.each(data, function(index, item) {
				$('#tipoDeMedicaoId').append($('<option>', {
					value: item.idTipoMedicao,
					text: item.tipoMedicao,
					name: item.tipoMedicao
				}));
			});
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

	$.ajax({
		url: url_base + "/turno",
		type: "GET",
		async: false,
	})
		.done(function(data) {
			$.each(data, function(index, item) {
				$('#turnoId').append($('<option>', {
					value: item.idTurno,
					text: item.turno,
					name: item.turno
				}));
			});
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

	$.ajax({
		url: url_base + "/tipoAtendimento",
		type: "GET",
		async: false,
	})
		.done(function(data) {
			$.each(data, function(index, item) {
				$('#tipoAtendimentoId').append($('<option>', {
					value: item.idTipoAtendimento,
					text: item.tipoAtendimento,
					name: item.tipoAtendimento
				}));
			});
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

	$.ajax({
		url: url_base + "/modalidadeEscola",
		type: "GET",
		async: false,
	})
		.done(function(data) {
			$.each(data, function(index, item) {
				$('#modalidadeEscolaId').append($('<option>', {
					value: item.idModalidadeEscola,
					text: item.modalidadeEscola,
					name: item.modalidadeEscola
				}));
			});
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

});

function CnpjValido(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj.length != 14)
        return false;

    var tamanhoTotal = cnpj.length - 2
    var cnpjSemDigitos = cnpj.substring(0, tamanhoTotal);
    var digitosVerificadores = cnpj.substring(tamanhoTotal);
    var soma = 0;
    var pos = tamanhoTotal - 7;
    for (i = tamanhoTotal; i >= 1; i--) {
        soma += cnpjSemDigitos.charAt(tamanhoTotal - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitosVerificadores.charAt(0))
        return false;

    tamanhoTotal = tamanhoTotal + 1;
    cnpjSemDigitos = cnpj.substring(0, tamanhoTotal);
    soma = 0;
    pos = tamanhoTotal - 7;
    for (i = tamanhoTotal; i >= 1; i--) {
        soma += cnpjSemDigitos.charAt(tamanhoTotal - i) * pos--;
        if (pos < 2)
            pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitosVerificadores.charAt(1))
        return false;

    return true;
}

function ValidarCnpj() {
    var cnpj = document.getElementById("cnpj").value;
    if (CnpjValido(cnpj)) {
        $("#btn-submit").show()
    } else {
        
        $("#btn-submit").hide()
    }
}

$("#cep").blur(function() {
	$.ajax({
		url: 'https://viacep.com.br/ws/'+$('#cep').val().replace(/[^\d]+/g, '')+'/json/',
		type: "GET",
		contentType: "application/json; charset=utf-8",
		error: function(e) {
			console.log(e)
			alert(e.responseJSON.message)
		}
	}).done(function(data) {
		$("#endereco").val(data.logradouro);
		$("#bairro").val(data.bairro);
		$("#municipio").val(data.localidade);
		$("#uf").val(data.uf);
	});
	
});


$("#cnpj").blur(function() {
	ValidarCnpj()
});

$("#formNovoCadastro").submit(function(e) {
	e.preventDefault();

	var dadosFormulario = {
		dependenciaAdministrativa:$('#dependenciaAdministrativa').val(),
		tipoDependencia: $('#tipoDependencia').val(),
		cnpj:  $('#cnpj').val().replace(/[^\d]+/g, ''),
		cep: $('#cep').val().replace(/[^\d]+/g, ''),
		endereco: $('#endereco').val(),
		numero: $('#numero').val(),
		bairro: $('#bairro').val(),
		municipio: $('#municipio').val(),
		uf: $('#uf').val(),
	};

	$.ajax({
		url: url_base + '/dependenciaAdministrativa',
		type: "POST",
		data: JSON.stringify(dadosFormulario),
		contentType: "application/json; charset=utf-8",
		error: function(e) {
			console.log(e)
			alert(e.responseJSON.message)
		}
	}).done(function(data) {
		alert('Cadastrado com sucesso!')
		window.location.href = "escolas-turmas";
	});

});