const contaId = sessionStorage.getItem('contaId')

$(document).ready(function() {
	$.ajax({
		url: url_base + '/cursos',
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#curso').append($('<option>', {
				value: item.idCurso,
				text: item.nome,
				name: item.nome
			}));
		});
	})
})

$('#curso').change(() => {
	$('#turno').removeAttr('disabled');
	$.ajax({
		url: url_base + `/turno/conta/${contaId}/curso/${$('#curso').val()}`,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#turno').append($('<option>', {
				value: item.idTurno,
				text: item.turno,
				name: item.turno
			}));
		});
	})
})

$('#turno').change(() => {
	$('#serie').removeAttr('disabled');
	let curso = $('#curso').val()
	let turno = $('#turno').val()
	$.ajax({
		url: url_base + `/turno/series/conta/${contaId}/curso/${curso}/turno/${turno}`,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#serie').append($('<option>', {
				value: item.serie,
				text: item.serie,
				name: item.serie
			}));
		});
	})
})

$('#serie').change(() => {
	$('#escola').removeAttr('disabled');
	let curso = $('#curso').val()
	let serie = $('#serie').val()
	let turno = $('#turno').val()
	$.ajax({
		url: url_base + `/escolas/conta/${contaId}/curso/${curso}/turno/${turno}/serie/${serie}`,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#escola').append($('<option>', {
				value: item.idEscola,
				text: item.nomeEscola,
				name: item.nomeEscola
			}));
		});
	})
})


