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
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
				
			});
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
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
				
			});
		}
	}).done(function(data) {
		Swal.fire({
				title: "Cadastrado com sucesso",
				icon: "success",
			})
		window.location.href = "dependenciasAdm";
	});

});