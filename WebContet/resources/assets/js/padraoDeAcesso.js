$(document).ready(function() {
	const contaId = sessionStorage.getItem('contaId');

	$.ajax({
		url: url_base + '/contaPadraoAcessos/conta/' + contaId,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			if (item.ativo == "S") {
				$('#padroesAcessoId').append($('<option>', {
					value: item.idContaPadraoAcesso,
					text: item.padraoAcesso,
					name: item.padraoAcesso
				}));
			}
		});
	});

	$.ajax({
		url: url_base + '/transacoes',
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			if (item.moduloId == 1) {
				$('.hr-escolas').after(criarCards(item.nome, item.idCodHtml, item.idTransacao));
			} else if (item.moduloId == 2) {
				$('.hr-config').after(criarCards(item.nome, item.idCodHtml, item.idTransacao));
			} else if (item.moduloId == 3) {
				$('.hr-matriz').after(criarCards(item.nome, item.idCodHtml, item.idTransacao));
			} else if (item.moduloId == 4) {
				$('.hr-acesso').after(criarCards(item.nome, item.idCodHtml, item.idTransacao));
			}
		});
	});
	$("#padroesAcessoId").on("blur", function() {
		$.ajax({
			url: url_base + `/contaPadraoAcessoTransacoes/contaPadraoAcesso/${$(this).val()}`,
			type: "get",
			async: false,
		}).done(function(data) {
			if (data.length != 0) {
				$.each(data, function(index, item) {
					let transacaoId = item.transacaoId;
					let acessa = item.acessa;
					let altera = item.altera;

					let card = $(`span#idTransacao`).filter(function() {
						return $(this).text() == transacaoId;
					}).closest('.card-check');

					if (acessa === 'S') {
						card.find(`input[name$="Leitura"][value="S"]`).prop('checked', true);
						card.find(`.col-md-6.small-inputs`).show(); // Mostrar inputs de escrita
					} else {
						card.find(`input[name$="Leitura"][value="N"]`).prop('checked', true);
						 // Esconder inputs de escrita
						card.find(`input[name$="Escrita"][value="N"]`).prop('checked', true);
					}

					if (acessa === 'S' && altera === 'S') {
						card.find(`input[name$="Escrita"][value="S"]`).prop('checked', true);
					} else {
						card.find(`input[name$="Escrita"][value="N"]`).prop('checked', true);
					}
				});
			}
		});
	});



	var accordionItems = document.querySelectorAll('.accordion-item');

	accordionItems.forEach(function(item) {
		var button = item.querySelector('.accordion-button');

		button.addEventListener('click', function() {
			var isCollapsed = button.getAttribute('aria-expanded') === 'false';
			button.setAttribute('aria-expanded', String(!isCollapsed));
			var collapseId = button.getAttribute('aria-controls');
			var collapse = document.getElementById(collapseId);
			if (collapse) {
				// Toggle class 'show' for smooth transition
				collapse.classList.toggle('show');
			}
		});
	});
	$(document).on('click', '#formSubmit', function(event) {
		event.preventDefault();

		let jsonArray = [];

		// Verifica se todos os inputs radio estão selecionados como 'N'
		let allNoSelected = true;

		$('.card-check').each(function() {
			let contaPadraoAcessoId = $('#padroesAcessoId').val();
			let leitura = $(this).find('input[name$="Leitura"]:checked').val();
			let escrita = $(this).find('input[name$="Escrita"]:checked').val();
			let transacaoId = $(this).find('span[id$="idTransacao"]').text();

			if (leitura !== 'N' || escrita !== 'N') {
				allNoSelected = false;
			}

			let obj = {
				"contaPadraoAcessoId": Number(contaPadraoAcessoId),
				"transacaoId": Number(transacaoId),
				"acessa": leitura,
				"altera": escrita
			};

			jsonArray.push(obj);
		});


		if (allNoSelected) {
			Swal.fire({
				icon: 'error',
				title: 'Erro',
				text: 'Todos os inputs não devem estar selecionados como "Não".',
			});
			return;
		}

		console.log(jsonArray);

		$.ajax({
			url: url_base + '/contaPadraoAcessoTransacoes/atualizaInsere',
			type: "POST",
			data: JSON.stringify(jsonArray),
			contentType: "application/json; charset=utf-8",
			beforeSend: function() {
				Swal.showLoading();
			},
			error: function(e) {
				Swal.close();
				console.log(e);
				console.log(e.responseJSON);
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Não foi possível realizar esse comando!",
				});
			}
		}).done(function(data) {
			Swal.close();
			Swal.fire({
				title: "Salvo com sucesso",
				icon: "success",
			});
		});
	});
});

function criarCards(textCard, idCodHtml, idTransacao) {
	var card = $('<div>').addClass('card card-check');

	var cardHeader = $('<div>').addClass('card-header d-flex justify-content-between');
	cardHeader.append($('<span>').text(textCard));
	cardHeader.append($('<span>').text(idTransacao).attr("id", "idTransacao").addClass('none'));
	var btnTirarPermissao = $('<button>').addClass('btn btn-sm btn-danger').text('Tirar Permissão').attr('id', 'btnTirarPermissao');
	cardHeader.append(btnTirarPermissao);

	var cardBody = $('<div>').addClass('card-body');
	var row = $('<div>').addClass('row mb-3');
	var colLeitura = $('<div>').addClass('col-md-6 small-inputs');
	var colEscrita = $('<div>').addClass('col-md-6 small-inputs').attr("id", idCodHtml + 'EscritaNao');
	

	var labelLeitura = $('<label>').addClass('form-label').attr('for', idCodHtml + 'Leitura').text('Leitura:');
	var divLeitura = $('<div>').addClass('form-control');
	var radioLeituraSim = $('<input>').addClass('form-check-input').attr({
		type: 'radio',
		name: `${idCodHtml}Leitura`,
		id: idCodHtml + 'LeituraSim',
		value: 'S'
	});

	var labelLeituraSim = $('<label>').addClass('form-check-label').attr('for', idCodHtml + 'LeituraSim').text('Sim');
	var radioLeituraNao = $('<input>').addClass('form-check-input').attr({
		type: 'radio',
		name: `${idCodHtml}Leitura`,
		id: idCodHtml + 'LeituraNao',
		value: 'N'
	}).prop("checked", true);
	var labelLeituraNao = $('<label>').addClass('form-check-label').attr('for', idCodHtml + 'LeituraNao').text('Não');

	divLeitura.append(
		$('<div>').addClass('form-check form-check-inline').append(radioLeituraSim).append(labelLeituraSim),
		$('<div>').addClass('form-check form-check-inline').append(radioLeituraNao).append(labelLeituraNao)
	);

	var labelEscrita = $('<label>').addClass('form-label').attr('for', idCodHtml + 'Escrita').text('Escrita:');
	var divEscrita = $('<div>').addClass('form-control');
	var radioEscritaSim = $('<input>').addClass('form-check-input').attr({
		type: 'radio',
		name: `${idCodHtml}Escrita`,
		id: idCodHtml + 'EscritaSim',
		value: 'S'
	});
	var labelEscritaSim = $('<label>').addClass('form-check-label').attr('for', idCodHtml + 'EscritaSim').text('Sim');
	var radioEscritaNao = $('<input>').addClass('form-check-input').attr({
		type: 'radio',
		name: `${idCodHtml}Escrita`,
		id: idCodHtml + 'EscritaNao',
		value: 'N'
	}).prop("checked", true);
	var labelEscritaNao = $('<label>').addClass('form-check-label').attr('for', idCodHtml + 'EscritaNao').text('Não');

	divEscrita.append(
		$('<div>').addClass('form-check form-check-inline').append(radioEscritaSim).append(labelEscritaSim),
		$('<div>').addClass('form-check form-check-inline').append(radioEscritaNao).append(labelEscritaNao)
	);

	radioLeituraNao.click(() => {
		colEscrita.hide();
	});

	radioLeituraSim.click(() => {
		colEscrita.show();
	});

	if (radioLeituraNao.is(":checked")) {
		colEscrita.hide();
	}

	colLeitura.append(labelLeitura, divLeitura);
	colEscrita.append(labelEscrita, divEscrita);
	row.append(colLeitura, colEscrita);
	cardBody.append(row);
	card.append(cardHeader, cardBody);

	btnTirarPermissao.on('click', function(event) {
		event.preventDefault();
		radioLeituraNao.prop('checked', true);
		radioEscritaNao.prop('checked', true);
	});

	return card;
}
