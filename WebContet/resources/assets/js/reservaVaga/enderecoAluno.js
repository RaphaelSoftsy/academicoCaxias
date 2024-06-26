let dadosForm = JSON.parse(localStorage.getItem('jsonAluno'))

$("#cep").blur(function() {
	$.ajax({
		url: 'https://viacep.com.br/ws/' + $('#cep').val().replace(/[^\d]+/g, '') + '/json/',
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

$('#formSubmit').submit(function(event) {


	event.preventDefault();

	dadosForm.pessoaDTO.cep = $("#cep").val().replace(/[^\d]+/g, '')
	dadosForm.pessoaDTO.endereco = $("#endereco").val();
	dadosForm.pessoaDTO.bairro = $("#bairro").val();
	dadosForm.pessoaDTO.municipio = $("#municipio").val();
	dadosForm.pessoaDTO.numero = $("#numero").val();
	dadosForm.pessoaDTO.distrito = $("#distrito").val();
	dadosForm.pessoaDTO.complemento = $("#complemento").val();
	dadosForm.pessoaDTO.uf = $("#uf").val()
	
	
	const enderecoAluno ={}
	
	enderecoAluno.cep = $("#cep").val().replace(/[^\d]+/g, '')
	enderecoAluno.endereco = $("#endereco").val();
	enderecoAluno.bairro = $("#bairro").val();
	enderecoAluno.municipio = $("#municipio").val();
	enderecoAluno.numero = $("#numero").val();
	enderecoAluno.distrito = $("#distrito").val();
	enderecoAluno.complemento = $("#complemento").val();
	enderecoAluno.uf = $("#uf").val()
	
	localStorage.setItem("enderecoAluno", JSON.stringify(enderecoAluno ))

	//Gatos pra funcionar
	dadosForm.pessoaDTO.senha = 'teste'
	/*dadosForm.nacionalidade = 'BR'
	dadosForm.rneUfEmissorId = 1
	dadosForm.rneNumero = '1234567890'
	dadosForm.rneOrgaoExpedidor = 'DPF'
	dadosForm.rneDataExpedicao = '1995-01-01'*/
	dadosForm.pessoaDTO.tipoIngressoId = 1
	dadosForm.pessoaDTO.paisResidenciaId = 2
	
	console.log(dadosForm)

	$.ajax({
		url: url_base + '/candidatos/pessoa-candidato',
		type: "POST",
		data: JSON.stringify(dadosForm),
		contentType: "application/json; charset=utf-8",
		beforeSend: function() {
			Swal.showLoading()
		},
		error: function(e) {
			Swal.close()
			console.log(e)
			console.log(e.responseJSON)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
			});
		}
	}).done(function(data) {

		Swal.close()
		Swal.fire({
			title: "Cadastrado com sucesso",
			icon: "success",
		})
		
		localStorage.setItem("idCandidato", data.idCandidato)
		window.location.href = "codigo-reserva"


	});

})


