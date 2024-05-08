var id = '';
$(document).ready(function() {
	id = getSearchParams("id");


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

	$.ajax({
		url: url_base + "/turma/" + id,
		type: "GET",
		async: false,
	})
		.done(function(data) {
			const ref = data
			console.log(ref)

			$('#escolaId').val(ref.escolaId).attr('selected', true),
				$('#anoVigente').val(ref.anoVigente),
				$('#anoEscolarId').val(ref.anoEscolar.idAnoEscolar).attr('selected', true),
				$('#numTurma').val(ref.numTurma),
				$('#codTurmaInep').val(ref.codTurmaInep),
				$('#formaOrganEnsinoId').val(ref.formaOrganEnsino.idFormaOrganEnsino).attr('selected', true),
				$('#tipoDeMedicaoId').val(ref.tipoDeMedicao.idTipoMedicao).attr('selected', true),
				$('#turnoId').val(ref.turno.idTurno).attr('selected', true),
				$('#tipoAtendimentoId').val(ref.tipoAtendimento.idTipoAtendimento).attr('selected', true),
				$('#modalidadeEscolaId').val(ref.modalidadeEscola.idModalidadeEscola).attr('selected', true),
				$('#vagas').val(ref.vagas)


			if (ref.libras === 'S') {
				$('input[id="librasS"]').prop('checked', true)
			} else {
				$('input[id="librasN"]').prop('checked', true)
			}
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

});

$("#formEditar").submit(function(e) {
	e.preventDefault();

	var dadosFormulario = {
		idTurma: id,
		escolaId: Number($('#escolaId').val()),
		anoVigente: $('#anoVigente').val(),
		anoEscolarId: Number($('#anoEscolarId').val()),
		numTurma: $('#numTurma').val(),
		codTurmaInep: $('#codTurmaInep').val(),
		formaOrganEnsinoId: $('#formaOrganEnsinoId').val(),
		tipoDeMedicaoId: $('#tipoDeMedicaoId').val(),
		turnoId: $('#turnoId').val(),
		tipoAtendimentoId: $('#tipoAtendimentoId').val(),
		modalidadeEscolaId: $('#modalidadeEscolaId').val(),
		libras: $('input[name="libras"]:checked').val(),
		vagas: $('#vagas').val()
	};
	
	console.log(dadosFormulario)

	$.ajax({
		url: url_base + '/turma',
		type: "PUT",
		data: JSON.stringify(dadosFormulario),
		contentType: "application/json; charset=utf-8",
		error: function(e) {
			console.log(e)
		}
	}).done(function(data) {
		Swal.fire({
				title: "Editado com sucesso",
				icon: "success",
			})
		window.location.href = "escolas-turmas";
	});

});
