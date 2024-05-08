var id = '';

$(document).ready(function() {
	id = getSearchParams("id");

	$.ajax({
		url: url_base + '/dependenciaAdministrativa',
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#dependenciaAdmId').append($('<option>', {
				value: item.idDependenciaAdministrativa,
				text: item.dependenciaAdministrativa,
				name: item.dependenciaAdministrativa
			}));
		});
	})

    $.ajax({
		url: url_base + '/raca',
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#racaId').append($('<option>', {
				value: item.idRaca,
				text: item.raca,
				name: item.raca
			}));
		});
	})

    $.ajax({
		url: url_base + '/paises',
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#paisNascimentoId').append($('<option>', {
				value: item.idPais,
				text: item.nomePais,
				name: item.nomePais
			}));
		});
        $.each(data, function(index, item) {
			$('#paisResidenciaId').append($('<option>', {
				value: item.idPais,
				text: item.nomePais,
				name: item.nomePais
			}));
		});
	})

    $.ajax({
		url: url_base + '/uf',
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#ufNascimentoId').append($('<option>', {
				value: item.idUf,
				text: item.codUf,
				name: item.codUf
			}));
		});
	})

    $.ajax({
		url: url_base + '/municipio',
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#municipioNascimentoId').append($('<option>', {
				value: item.idMunicipio,
				text: item.nomeMunicipio,
				name: item.nomeMunicipio
			}));
		});
	})

	getDados2()
});

function getDados2() {
	$.ajax({
		url: url_base + "/pessoas/" + id,
		type: "GET",
		async: false,
	})
		.done(function(data) {
			const ref = data
			
			$('#cep').val(ref.cep)
			$('#endereco').val(ref.endereco)
			$('#numero').val(ref.numero)
			$('#bairro').val(ref.bairro)
			$('#municipio').val(ref.municipio)
			$('#uf').val(ref.uf)
			$('#nome').val(ref.nome)
			$('#cpf').val(ref.cpf)
		 	$('#dtNascimento').val(ref.dtNascimento)
			$('#nomePai').val(ref.nomePai)
			$('#nomeMae').val(ref.nomeMae)
			$('#complemento').val(ref.complemento)
			$('#distrito').val(ref.distrito)
			$("#dependenciaAdmId").val(ref.dependenciaAdm.idDependenciaAdministrativa).attr('selected', true);
			$("#racaId").val(ref.raca.idRaca).attr('selected', true);
			$("#paisNascimentoId").val(ref.paisNascimento.idPais).attr('selected', true);
			$("#ufNascimentoId").val(ref.ufNascimento.idUf).attr('selected', true);
			$("#municipioNascimentoId").val(ref.municipioNascimento.idMunicipio).attr('selected', true);
			$("#paisResidenciaId").val(ref.paisResidencia.idPais).attr('selected', true);

			if (ref.sexo === 'F') {
				$('input[id="feminino"]').prop('checked', true)
			} else {
				$('input[id="masculino"]').prop('checked', true)
			}

			if (data.ativo == "S") {
				$(".ativar").hide();
				$(".desativar").show()
			}
			else {
				$(".desativar").hide();
				$(".ativar").show();
			}

		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});
}

function cpfValido(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length != 11)
        return false;

    var soma = 0;
    var resto;
    for (var i = 1; i <= 9; i++) {
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11)) {
        resto = 0;
    }

    if (resto != parseInt(cpf.substring(9, 10))) {
        return false;
    }

    soma = 0;
    for (var i = 1; i <= 10; i++) {
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11)) {
        resto = 0;
    }

    if (resto != parseInt(cpf.substring(10, 11))) {
        return false;
    }

    return true;
}

function ValidarCpf() {
    var cpf = document.getElementById("cpf").value;
    if (CpfValido(cpf)) {
        $("#btn-submit").show()
    } else {
        
        $("#btn-submit").hide()
    }
}
$("#cpf").blur(function() {
	ValidarCpf()
});

function desativar2(){
	$.ajax({
		url: url_base + `/pessoas/${id}/desativar`,
		type: "PUT",
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(e)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
			});
		}
	})
		.done(function(data) {
			getDados2()
			Swal.fire({
				title: "Desativado com sucesso",
				icon: "success",
			})
		})
	return false;
}

function ativar2(){
	$.ajax({
		url: url_base + `/pessoas/${id}/ativar`,
		type: "PUT",
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(e)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
			});
		}
	})
		.done(function(data) {
			getDados2()
			Swal.fire({
				title: "Ativado com sucesso",
				icon: "success",
			})
		})
	return false;
}

$("#formNovoCadastro").submit(function(e) {
	e.preventDefault();

	var dadosFormulario = {
		idPessoa: id,
		nome:$('#nome').val(),
		dependenciaAdmId: $('#dependenciaAdmId').val(),
		cpf:  $('#cpf').val().replace(/[^\d]+/g, ''),
		dtNascimento: $('#dtNascimento').val(),
		sexo: $('input[name="sexo"]:checked').val(),
		racaId: $('#racaId').val(),
		paisNascimentoId: $('#paisNascimentoId').val(),
		ufNascimentoId: $('#ufNascimentoId').val(),
		municipioNascimentoId: $('#municipioNascimentoId').val(),
		paisResidenciaId: $('#paisResidenciaId').val(),
		nomePai: $('#nomePai').val(),
		nomeMae: $('#nomeMae').val(),
		cep: $('#cep').val().replace(/[^\d]+/g, ''),
		numero: $('#numero').val(),
		endereco: $('#endereco').val(),
		complemento: $('#complemento').val(),
		bairro: $('#bairro').val(),
		municipio: $('#municipio').val(),
		distrito: $('#distrito').val(),
		uf: $('#uf').val(),
	};

	$.ajax({
		url: url_base + '/pessoas',
		type: "PUT",
		data: JSON.stringify(dadosFormulario),
		contentType: "application/json; charset=utf-8",
		error: function(e) {
			console.log(e)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
			});
		}
	}).done(function(data) {
		Swal.fire({
				title: "Editado com sucesso",
				icon: "success",
			})
		window.location.href = "listarPessoas";
	});

});