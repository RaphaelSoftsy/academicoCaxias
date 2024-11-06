const contaId = localStorage.getItem('contaId')
const candidatoId = localStorage.getItem("idCandidato")

$(document).ready(function() {
	$.ajax({
		url: url_base + '/cursos/ativos/' + contaId,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {

			$('#curso').append($('<option>', {
				value: item.idCurso,
				text: `${item.nome} - ${item.codCurso}`,
				name: item.nome
			}));


		});
	})
})

$('#curso').change(() => {
	$('#escola').removeAttr('disabled');
	$('#escola').val(0);
	$('#serie').val(0);
	$('#turno').val(0);

	let curso = $('#curso').val()
	$.ajax({
		url: url_base + `/escolas/ativos/${contaId}/${curso}`,
		type: "get",
		async: false,
	}).done(function(data) {
		$('#escola').empty()
		$("#escola").append("<option selected disabled>Selecione uma opção</option>")
		$('#serie').empty()
		$("#serie").append("<option selected disabled>Selecione uma opção</option>")
		$('#turno').empty()
		$("#turno").append("<option selected disabled>Selecione uma opção</option>")
		$.each(data, function(index, item) {
			$('#escola').append($('<option>', {
				value: item.idEscola,
				text: item.nomeEscola,
				name: item.nomeEscola
			}));
		});
	})
})

$('#escola').change(() => {
	$('#serie').removeAttr('disabled');
	$('#serie').val(0);
	$('#turno').val(0);

	let curso = $('#curso').val()
	let escola = $('#escola').val()
	$.ajax({
		url: url_base + `/ofertasConcurso/series/conta/${contaId}/curso/${curso}/escola/${escola}`,
		type: "get",
		async: false,
	}).done(function(data) {
		$('#serie').empty()
		$("#serie").append("<option selected disabled>Selecione uma opção</option>")
		$('#turno').empty()
		$("#turno").append("<option selected disabled>Selecione uma opção</option>")
		$.each(data, function(index, item) {
			$('#serie').append($('<option>', {
				value: item.serie,
				text: `${item.serie}`,
				name: item.serie
			}));


		});
	})
})

$('#serie').change(() => {
	$('#turno').removeAttr('disabled');
	$('#turno').val(0)
	let curso = $('#curso').val()
	let serie = $('#serie').val()
	let escola = $('#escola').val()


	$.ajax({
		url: url_base + `/turno/conta/${contaId}/curso/${curso}/escola/${escola}/serie/${serie}`,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#turno').empty()
			$("#turno").append("<option selected disabled>Selecione uma opção</option>")
			$('#turno').append($('<option>', {
				value: item.idTurno,
				text: item.turno,
				name: item.turno
			}));

		});
	})
})

$('#formSubmit').submit(function(event) {
	event.preventDefault();

	let curso = $('#curso').val()
	let serie = $('#serie').val()
	let turno = $('#turno').val()
	let escola = $('#escola').val()

	$.ajax({
		url: url_base + `/ofertasConcurso/curso/${curso}/turno/${turno}/serie/${serie}/escola/${escola}`,
		type: "get",
		async: false,
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
		$.ajax({
			url: url_base + `/candidatos/candidato/${candidatoId}/oferta/${data.idOfertaCurso}`,
			type: "put",
			async: false,
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
			window.location.href = 'reserva'
		})
	})
})

