var dados = [];
var id = '';
var nome = '';
var rows = 8;
var currentPage = 1;
var pagesToShow = 5;
const contaId = localStorage.getItem('contaId')
const idUsuario = params.get("id");
let idArray = 0

$(document).ready(function() {
	getDados()

	$(".reveal").on('click', function() {
		let pwd = $(this).siblings("input");
		let icon = $(this).find("i");
		if (pwd.attr('type') === 'password') {
			pwd.attr('type', 'text');
			icon.removeClass("fa-eye").addClass("fa-eye-slash");
		} else {
			pwd.attr('type', 'password');
			icon.removeClass("fa-eye-slash").addClass("fa-eye");
		}
	});

	$(".reveal-pwd").on('click', function() {
		let pwd = $(this).siblings("input");
		let icon = $(this).find("i");
		if (pwd.attr('type') === 'password') {
			pwd.attr('type', 'text');
			icon.removeClass("fa-eye").addClass("fa-eye-slash");
		} else {
			pwd.attr('type', 'password');
			icon.removeClass("fa-eye-slash").addClass("fa-eye");
		}
	});

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

	//Exemplo para setar valor
	/*$('#mySelect').val([1, 6])*/

	if (idUsuario != undefined) {
		let listaAcessos = []
		$("#tituloPagina, #tituloForm").text("Editar Usuario");
		$("#h1-curso").text("Editar Usuario");
		$("#btn-adicionar").text("Editar");
		$("#divSenha").hide()
		$("#divSenhaConfirmacao").hide()
		$("#senha").removeAttr("required");
		$("#senhaConfirmacao").removeAttr("required");

		$.ajax({
			url: url_base + '/usuario/' + idUsuario,
			type: "GET",
			contentType: "application/json; charset=utf-8",
			beforeSend: function() {
				Swal.showLoading();
			},
			error: function(e) {
				console.log(e);
				Swal.close();
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Não foi possível cadastrar nesse momento!",
				});
			}
		}).done(function(data) {
			Swal.close();
			$('#usuario').val(data.usuario.usuario);
			$('#nomeCompleto').val(data.usuario.nomeCompleto);
			$('#email').val(data.usuario.email);
			$('#cpf').val(data.usuario.cpf);
			$('#dataNascimento').val(formatarDataParaISO(data.usuario.dataNascimento)); // Aqui colocamos no formato yyyy-MM-dd
			$('#celular').val(data.usuario.celular);


			$.each(data.usuarioConta, function(index, item) {
				let nomeEscola = ''
				let padraoAcesso = ''

				$.ajax({
					url: url_base + '/escolas/' + item.escolaId,
					type: "GET",
					contentType: "application/json; charset=utf-8",
					error: function(e) {
						console.log(e);
						Swal.close();
						Swal.fire({
							icon: "error",
							title: "Oops...",
							text: "Não foi possível cadastrar nesse momento!",
						});
					}
				}).done(function(dataEscola) {
					nomeEscola = dataEscola.nomeEscola

					$.ajax({
						url: url_base + '/contaPadraoAcessos/' + item.contaPadraoAcessoId,
						type: "GET",
						contentType: "application/json; charset=utf-8",
						error: function(e) {
							console.log(e);
							Swal.close();
							Swal.fire({
								icon: "error",
								title: "Oops...",
								text: "Não foi possível cadastrar nesse momento!",
							});
						}
					}).done(function(dataPadrao) {
						idArray += 1
						dados.push({
							id: idArray,
							escolaId: item.escolaId,
							padraoAcessoId: item.contaPadraoAcessoId,
							nomeEscola: nomeEscola,
							padraoAcesso: dataPadrao.padraoAcesso,
						})
						listarDados(dados)

						console.log({
							id: idArray,
							escolaId: item.escolaId,
							padraoAcessoId: item.contaPadraoAcessoId,
							nomeEscola: nomeEscola,
							padraoAcesso: dataPadrao.padraoAcesso,
						})
					})
				})
			});


			//$('#mySelect').val(listaAcessos)

			//$('#mySelect').chosen();
		});
	} else {
		//$('#mySelect').chosen();
	}
});

const removerItem = (ref) => {
	let id = ref.getAttribute("data-id");

	dados = dados.filter(item => item.id != id);
	listarDados(dados)
}


$('#add-table').click(() => {
	if (
		$('#escola').val() == 0 ||
		$('#escola').val() == null &&
		$('#padraoAcessoId').val() == 0 ||
		$('#padraoAcessoId').val() == null
	) {
		Swal.fire({
			icon: "warning",
			title: "Valores incompletos",
			text: "Para adicionar selecione uma escola e um padrão de acesso",
		})
	} else if (
		$('#escola').val() == 0 ||
		$('#escola').val() == null
	) {
		Swal.fire({
			icon: "warning",
			title: "Valores incompletos",
			text: "Para adicionar também selecione uma escola",
		})
	} else if (
		$('#padraoAcessoId').val() == 0 ||
		$('#padraoAcessoId').val() == null
	) {
		Swal.fire({
			icon: "warning",
			title: "Valores incompletos",
			text: "Para adicionar também selecione um padrão de acesso",
		})
	} else {
		getValues()
		listarDados(dados)
		$('#escola').val(0)
		$('#padraoAcessoId').val(0)
	}
})

const listarDados = (dadosTabela) => {
	var html = dadosTabela.map(function(item) {
		console.log(item)

		return (
			"<tr>" +
			"<td>" + item.padraoAcesso + "</td>" +
			"<td>" + item.nomeEscola + "</td>" +
			'<td class="d-flex justify-content-center"><span style="width: 63px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-danger btn-sm" data-id="' +
			item.id +
			'" onclick="removerItem(this)"><i class="fa-solid fa-xmark"></i></span></td>' +
			"</tr>"
		);
	}).join("");

	$("#cola-tabela").html(html);
}

function formatarDataParaISO(data) {
	if (!data) {
		return "";
	}

	var dataObj = new Date(data);

	if (isNaN(dataObj)) {
		return "";
	}

	var dia = String(dataObj.getUTCDate()).padStart(2, "0");
	var mes = String(dataObj.getUTCMonth() + 1).padStart(2, "0");
	var ano = dataObj.getUTCFullYear();

	return ano + "-" + mes + "-" + dia; // Formato ISO para campos de data (yyyy-MM-dd)
}

function getDados() {
	$.ajax({
		url: url_base + '/contaPadraoAcessos/conta/' + contaId,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			if (item.ativo == "S") {
				/*$('#mySelect').append($('<option>', {
					value: item.idContaPadraoAcesso,
					text: item.padraoAcesso,
					name: item.idContaPadraoAcesso
				}));*/

				$('#padraoAcessoId').append($('<option>', {
					value: item.idContaPadraoAcesso,
					text: item.padraoAcesso,
					name: item.padraoAcesso
				}));
			}
		});
	})

	$.ajax({
		url: url_base + "/escolas/conta/" + contaId,
		type: "GET",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			if (item.ativo == "S") {
				$('#escola').append($('<option>', {
					value: item.idEscola,
					text: item.nomeEscola,
					name: item.nomeEscola
				}));
			}
		});
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	});
}

const getValues = () => {
	idArray += 1
	dados.push({
		id: idArray,
		escolaId: $('#escola').val(),
		padraoAcessoId: $('#padraoAcessoId').val(),
		nomeEscola: $('#escola option:selected').text(),
		padraoAcesso: $('#padraoAcessoId option:selected').text(),
	})

	return dados
}

/*$('#add-table').click(() => {
	let dadosTabela = getValues()

	console.log($('#padraoAcesso').val())
	console.log($('#padraoAcesso option:selected').attr('name'))
	console.log($('#padraoAcesso option:selected').text())

	var html = dadosTabela.map(function(item) {
		console.log(item)

		return (
			"<tr>" +
			"<td>" +
			item.padraoAcesso +
			"</td>" +
			"<td>" +
			item.nomeEscola +
			"</td>" +
			'<td class="d-flex justify-content-center"><span style="width: 63px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-id="' +
			item.id +
			'" onclick="showModal(this)" data-bs-toggle="modal" data-bs-target="#editAto"><i class="fa-solid fa-pen fa-lg"></i></span></td>' +
			"</tr>"
		);
	}).join("");

	$("#cola-tabela").html(html);
	$('#escola option:selected').val(0)
	$('#padraoAcesso option:selected').val(0)

})*/

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
	const cpf = $('#cpf');
	$.ajax({
		url: url_base + '/usuario/verificar-cpf?cpf=' + cpf.val().replace(/[^a-zA-Z0-9 ]/g, ""),
		type: "get",
		complete: function(jqXHR, textStatus) {
			console.log('Status da requisição:', textStatus);
			console.log('Código de status HTTP:', jqXHR.status);
			if (jqXHR.status == 400) {
				const message = $("<p id='errMessage'></p>").text("CPF já utilizado por outro usuário").css('color', '#FF0000');
				if ($("#cardCpf").find('#errMessage').length > 0) {
					$('#errMessage').remove()
				}
				$("#btn-adicionar").attr("disabled", "disabled");
				cpf.addClass('err-message')
				$("#cardCpf").append(message)
				message.show()
			} else {
				$("#btn-adicionar").removeAttr('disabled');
				cpf.removeClass('err-message')
				$('#errMessage').css('display', 'none')
			}
		}
	})
	
	const messageCpf = $("<p id='errMessageCPF'></p>").text("CPF Inválido").css('color', '#FF0000');
	if (cpfValido(cpf.val())) {
		$("#btn-adicionar").removeAttr('disabled');
		cpf.removeClass('err-message')
		$('#errMessageCPF').css('display', 'none')
	} else {
		if ($("#cardCpf").find('#errMessageCPF').length > 0) {
			$('#errMessageCPF').remove()
		}
		$("#btn-adicionar").attr("disabled", "disabled");
		cpf.addClass('err-message')
		$("#cardCpf").append(messageCpf)
		messageCpf.show()
	}
}

$("#cpf").blur(function() {
	ValidarCpf()
});

$("#email").blur(()=>{
	
	const email = $("#email")
	$.ajax({
		url: url_base + '/usuario/verificar-email?email=' + email.val(),
		type: "get",
		complete: function(jqXHR, textStatus) {
			console.log('Status da requisição:', textStatus);
			console.log('Código de status HTTP:', jqXHR.status);
			if (jqXHR.status == 400) {
				const message = $("<p id='errMessageEmail'></p>").text("email já utilizado por outro usuário").css('color', '#FF0000');
				if ($("#cardEmail").find('#errMessageEmail').length > 0) {
					$('#errMessageEmail').remove()
				}
				$("#btn-adicionar").attr("disabled", "disabled");
				email.addClass('err-message')
				$("#cardEmail").append(message)
				message.show()
			} else {
				$("#btn-adicionar").removeAttr('disabled');
				email.removeClass('err-message')
				$('#errMessageEmail').css('display', 'none')
			}
		}
	})
})


$("#usuario").blur(()=>{
	
	const usuario = $("#usuario")
	$.ajax({
		url: url_base + '/usuario/verificar-usuario?usuario=' + usuario.val(),
		type: "get",
		complete: function(jqXHR, textStatus) {
			console.log('Status da requisição:', textStatus);
			console.log('Código de status HTTP:', jqXHR.status);
			if (jqXHR.status == 400) {
				const messageEmail = $("<p id='errMessageUsuario'></p>").text("usuario já utilizado").css('color', '#FF0000');
				if ($("#cardUsuario").find('#errMessageUsuario').length > 0) {
					$('#errMessageUsuario').remove()
				}
				$("#btn-adicionar").attr("disabled", "disabled");
				usuario.addClass('err-message')
				$("#cardUsuario").append(messageEmail)
				messageEmail.show()
			} else {
				$("#btn-adicionar").removeAttr('disabled');
				usuario.removeClass('err-message')
				$('#errMessageUsuario').css('display', 'none')
			}
		}
	})
})


const cadastrar = () => {
	if (dados.length == 0) {
		Swal.fire({
			icon: "warning",
			title: "Valores incompletos",
			text: "Para cadastrar selecione uma escola e um padrão de acesso",
		})
	} else {
		let dadosFormulario = {
			"usuario": $('#usuario').val(),
			"nomeCompleto": $('#nomeCompleto').val(),
			"email": $('#email').val(),
			"emailVerificado": "N",
			"cpf": $('#cpf').val().replace(/[^a-zA-Z0-9 ]/g, ""),
			"dataNascimento": `${$('#dataNascimento').val()}T00:00:00`,
			"senha": $('#senha').val(),
			"celular": $('#celular').val().replace(/[^a-zA-Z0-9 ]/g, ""),
			"celularVerificado": "N"
		};

		$.ajax({
			url: url_base + '/usuario',
			type: "POST",
			data: JSON.stringify(dadosFormulario),
			contentType: "application/json; charset=utf-8",
			beforeSend: function() {
				Swal.showLoading()
			},
			error: function(e) {
				Swal.close();
				console.log(e)
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Não foi possível cadastrar nesse momento!",
				});
			}
		}).done(function(data) {
			$.each(dados, function(index, item) {
				let objeto = {
					"usuarioId": data.idUsuario,
					"contaPadraoAcessoId": item.padraoAcessoId,
					"escolaId": item.escolaId
				}

				$.ajax({
					url: url_base + '/usuarioContas',
					type: "POST",
					data: JSON.stringify(objeto),
					contentType: "application/json; charset=utf-8",
					error: function(e) {
						Swal.close();
						console.log(e)
						Swal.fire({
							icon: "error",
							title: "Oops...",
							text: "Não foi possível cadastar nesse momento!",
						});
					}
				}).done(function(res) {
				});
			});

			Swal.close();
			Swal.fire({
				title: "Cadastrado com sucesso",
				icon: "success",
			}).then(() => {
				window.location.href = "usuarios";
			})
		});
	}
}

const editar = () => {
	if (dados.length == 0) {
		Swal.fire({
			icon: "warning",
			title: "Valores incompletos",
			text: "Para cadastrar selecione uma escola e um padrão de acesso",
		})
	} else {
		let dadosFormulario = {
			"idUsuario": idUsuario,
			"usuario": $('#usuario').val(),
			"nomeCompleto": $('#nomeCompleto').val(),
			"email": $('#email').val(),
			"emailVerificado": "N",
			"cpf": $('#cpf').val().replace(/[^a-zA-Z0-9 ]/g, ""),
			"dataNascimento": `${$('#dataNascimento').val()}T00:00:00`,
			"celular": $('#celular').val().replace(/[^a-zA-Z0-9 ]/g, ""),
			"celularVerificado": "N"
		};


		$.ajax({
			url: url_base + '/usuario',
			type: "PUT",
			data: JSON.stringify(dadosFormulario),
			contentType: "application/json; charset=utf-8",
			beforeSend: function() {
				Swal.showLoading()
			},
			error: function(e) {
				Swal.close();
				console.log(e)
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Não foi possível editar nesse momento!",
				});
			}
		}).done(function(data) {
			$.ajax({
				url: url_base + '/usuarioContas/usuario/' + idUsuario,
				type: "delete",
				contentType: "application/json; charset=utf-8",
				error: function(e) {
					Swal.close();
					console.log(e)
					Swal.fire({
						icon: "error",
						title: "Oops...",
						text: "Não foi possível deletar nesse momento!",
					});
				}
			}).done(function(resp) {

				$.each(dados, function(index, item) {
					let objeto = {
						"usuarioId": idUsuario,
						"contaPadraoAcessoId": item.padraoAcessoId,
						"escolaId": item.escolaId
					}

					$.ajax({
						url: url_base + '/usuarioContas',
						type: "POST",
						data: JSON.stringify(objeto),
						contentType: "application/json; charset=utf-8",
						error: function(e) {
							Swal.close();
							console.log(e)
							Swal.fire({
								icon: "error",
								title: "Oops...",
								text: "Não foi possível editar usuario conta!",
							});
						}
					}).done(function(res) {
					});
				});

				Swal.close();
				Swal.fire({
					title: "Editado com sucesso",
					icon: "success",
				}).then(() => {
					window.location.href = "usuarios";
				})
			})
		});
	}
}



$("#formNovoCadastro").submit(function(e) {
	e.preventDefault();

	if (idUsuario != undefined) {
		editar()
	} else {
		if ($("#senhaConfirmacao").val() != $("#senha").val()) {
			Swal.fire({
				icon: "error",
				title: "A duas senhas devem ser iguais!",
				text: "Verifique as senha novamente!",
			});
		} else {
			cadastrar()
		}
	}
});
