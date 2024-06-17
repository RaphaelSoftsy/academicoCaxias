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

	dadosForm.cep = $("#cep").val().replace(/[^\d]+/g, '')
	dadosForm.endereco = $("#endereco").val();
	dadosForm.bairro = $("#bairro").val();
	dadosForm.municipio = $("#municipio").val();
	dadosForm.numero = $("#numero").val();
	dadosForm.distrito = $("#distrito").val();
	dadosForm.complemento = $("#complemento").val();
	dadosForm.uf = $("#uf").val()
	
	//Gatos pra funcionar
	dadosForm.senha = 'teste'
	/*dadosForm.nacionalidade = 'BR'
	dadosForm.rneUfEmissorId = 1
	dadosForm.rneNumero = '1234567890'
	dadosForm.rneOrgaoExpedidor = 'DPF'
	dadosForm.rneDataExpedicao = '1995-01-01'*/
	dadosForm.tipoIngressoId = 1
	dadosForm.paisResidenciaId = 2
	dadosForm.rneUfEmissorId = 1

	$.ajax({
		url: url_base + '/pessoas',
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

	});

})