$(document).ready(function() {
	const contaId = sessionStorage.getItem('contaId');
	const id = getSearchParams("id");
	var url_base = "http://10.40.110.2:8080/api-educacional";
	const idCandidato = localStorage.getItem('idCandidato');
	var pessoaId = 0;
	var idPessoaResponsavel = 0;

	function getSearchParams(k) {
		var p = {};
		location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(s, key, value) {
			p[key] = value;
		});
		return k ? p[k] : p;
	}
	
	 // Inicializar Select2
    $('#responsavelEmergencia').select2();
    $('#tipoSanguineo').select2();

    // Inicializar máscaras
    $('#telefone').mask('(00) 0000-0000');
    $('#cep').mask('00000-000');

	$.ajax({
		url: url_base + "/candidatos/" + idCandidato,
		type: "GET",
		contentType: "application/json; charset=utf-8",
		error: function(e) {
			console.log(e);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
			});
		}
	}).done(function(data) {
		pessoaId = data.pessoa;
	});

	$.ajax({
		url: url_base + "/responsavel/candidato/" + idCandidato,
		type: "GET",
		contentType: "application/json; charset=utf-8",
		error: function(e) {
			console.log(e);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
			});
		}
	}).done(function(data) {
		$.each(data, function(index, item) {
			console.log(item);
			$('#responsavelEmergencia').append($('<option>', {
				value: item.pessoa.idPessoa,
				text: item.pessoa.nomeCompleto,
				name: item.pessoa.nomeCompleto
			}));
		});
	});

	$("#cep").blur(function() {
		$.ajax({
			url: 'https://viacep.com.br/ws/' + $('#cep').val().replace(/[^\d]+/g, '') + '/json/',
			type: "GET",
			contentType: "application/json; charset=utf-8",
			error: function(e) {
				console.log(e);
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

	$('select').select2();

	function getAswer(input) {
		return $(input).is(':checked') ? 'S' : 'N';
	}

	// Capturar o evento de submissão do formulário
	$('#formSubmit').submit(function(event) {
        event.preventDefault();
        console.log('Formulário enviado');

        let dadosFormulario = {
            "responsavelPessoaId": $('#responsavelEmergencia').val(),
            "peso": $("#peso").val(),
            "altura": $("#altura").val(),
            "tipoSanguineo": $("#tipoSanguineo").val(),
            "aceitaTransfusao": $('#transfusao').is(':checked') ? 'S' : 'N',
            "numeroCartSus": $("#numeroSUS").val(),
            "planoSaude": $("#planoSaude").val(),
            "numeroCarteirinha": $("#numCarterinha").val(),
            "psEmergenciaCep": $("#cep").val(),
            "psEmergenciaEndereco": $("#endereco").val(),
            "psEmergenciaNumero": $("#numero").val(),
            "psEmergenciaComplemento": $("#complemento").val(),
            "psEmergenciaBairro": $("#bairro").val(),
            "psEmergenciaMunicipio": $("#municipio").val(),
            "psEmergenciaUf": $("#uf").val(),
            "psEmergenciaTelefone": $("#telefone").val(),
            "alergia": $('#isAlergico').is(':checked') ? 'S' : 'N',
            "descricaoAlergia": $("#descIsAlergico").val(),
            "tratamentoMedico": $('#tratamentoMedico').is(':checked') ? 'S' : 'N',
            "descricaoTratamentoMedico": $("#descTratamentoMedico").val(),
            "comorbidades": $('#possuiDoenca').is(':checked') ? 'S' : 'N',
            "descricaoComorbidades": $("#descDoenca").val(),
            "outrasDoencas": $("#outrasDoencas").val()
        };

        console.log('Dados do formulário:', dadosFormulario);

        $.ajax({
            url: `${contextPath}/fichasMedicas`, // Ajuste a URL conforme necessário
            type: "POST",
            data: JSON.stringify(dadosFormulario),
            contentType: "application/json; charset=utf-8",
            beforeSend: function() {
                Swal.showLoading();
            },
            success: function(data) {
                Swal.close();
                Swal.fire({
                    title: "Cadastrado com sucesso",
                    icon: "success",
                }).then(() => {
                    window.location.href = "reservas"; // Ajuste o redirecionamento conforme necessário
                });
            },
            error: function(e) {
                Swal.close();
                console.error('Erro na requisição:', e);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Não foi possível realizar esse comando!",
                });
            }
        });
    });

	// Event handlers for dynamic fields
	$('input[name="isAlergico"]').click(function() {
		if ($(this).is(':checked')) {
			$("#divDescIsAlergico").show();
			$('input[name="descIsAlergico"]').attr("required", true);
		} else {
			$("#divDescIsAlergico").hide();
			$('input[name="descIsAlergico"]').attr("required", false);
		}
	});

	$('input[name="tratamentoMedico"]').click(function() {
		if ($(this).is(':checked')) {
			$("#divDescTratamentoMedico").show();
			$('input[name="descTratamentoMedico"]').attr("required", true);
		} else {
			$("#divDescTratamentoMedico").hide();
			$('input[name="descTratamentoMedico"]').attr("required", false);
		}
	});

	$('input[name="possuiDoenca"]').click(function() {
		if ($(this).is(':checked')) {
			$("#divDescDoenca").show();
			$('input[name="descDoenca"]').attr("required", true);
		} else {
			$("#divDescDoenca").hide();
			$('input[name="descDoenca"]').attr("required", false);
		}
	});
});
