const contaId = localStorage.getItem('contaId');;
let idGradeCurricularSelecionada
let listaGrades
const idOfertaConcurso = params.get("id");

$(document).ready(function() {

	$('select').select2();

	$.ajax({
		url: url_base + "/concursos/conta/" + contaId,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#concursoId").append(
				$("<option>", {
					value: item.idConcurso,
					text: item.concurso,
					name: item.concurso,
				})
			);
		});
	});

	// Carrega os cursos
	$.ajax({
		url: url_base + "/cursos/conta/" + contaId,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			if (item.ativo == "S") {
				$("#cursoId").append(
					$("<option>", {
						value: item.idCurso,
						text: `${item.nome} - ${item.codCurso}`,
						name: item.nome,
					})
				);
			}

		});
	});

	// Carrega as escolas
	$.ajax({
		url: url_base + "/escolas/usuario/" + contaId + "/" + usuarioId,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#escolaId').append($('<option>', {
				value: item.idEscola,
				text: item.nomeEscola,
				name: item.nomeEscola
			}));
		});
	});

	$.ajax({
		url: url_base + "/turno/conta/" + contaId,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#turnoId").append(
				$("<option>", {
					value: item.idTurno,
					text: item.turno,
					name: item.turno,
				})
			);
		});
	});

	$.ajax({
		url: url_base + "/serie",
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#serieId').append($('<option>', {
				value: item.idSerie,
				text: `${item.serie} - ${item.descricao}`,
				name: `${item.serie} - ${item.descricao}`
			}));
		});
	});


	// Carrega os cursos
	$.ajax({
		url: url_base + "/curriculo",
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#curriculoId").append(
				$("<option>", {
					value: item.idCurriculo,
					text: item.curriculo,
					name: item.curriculo,
				})
			);
		});
	});

	if (idOfertaConcurso != undefined) {
		$("#tituloPagina, #tituloForm").text("Editar Oferta Concurso")
		$("#h1-curso").text("Editar Oferta Concurso")
		$("#btn-submit").text("Editar")

		$.ajax({
			url: url_base + '/ofertasConcurso/' + idOfertaConcurso,
			type: "GET",
			contentType: "application/json; charset=utf-8",
			beforeSend: function() {
				Swal.showLoading()
			},
			error: function(e) {
				console.log(e)
				Swal.close();
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Não foi possível cadastar nesse momento!",
				});
			}
		}).done(function(data) {
			Swal.close()
			$("#concursoId").val(data.concursoId)
			$("#cursoId").val(data.cursoId)
			$("#escolaId").val(data.escolaId)
			$("#turnoId").val(data.turnoId)
			$("#curriculoId").val(data.curriculoId)
			$("#serieId").val(data.serieId)
			$("#descricao").val(data.descricaoOferta)
			$("#vagas").val(data.vagas)
			$("#vagasMin").val(data.minVagasAbertTurma)
			$('select').select2();
		});
	}
})

$('#cursoId').change(() => {
	$('#curriculoId').empty()
	$('#curriculoId').removeAttr('disabled');
	$('#curriculoId').append(`<option value='0' selected disabled>Selecione o currículo</option>`)

	let curso = $('#cursoId').val()
	$.ajax({
		url: url_base + `/curriculo/curso/${curso}`,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#curriculoId").append(
				$("<option>", {
					value: item.idCurriculo,
					text: item.curriculo,
					name: item.curriculo,
				})
			);
		});
	})
});


function cadastrar() {
	var objeto = {
		concursoId: $("#concursoId").val(),
		cursoId: $("#cursoId").val(),
		escolaId: $("#escolaId").val(),
		turnoId: $("#turnoId").val(),
		curriculoId: $("#curriculoId").val(),
		serieId: $("#serieId").val(),
		descricaoOferta: $("#descricao").val(),
		vagas: $("#vagas").val(),
		minVagasAbertTurma: $("#vagasMin").val(),
	};

	console.log(objeto)

	$.ajax({
		url: url_base + "/ofertasConcurso",
		type: "POST",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(e.responseJSON);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
			});
		},
	}).done(function(data) {
		Swal.fire({
			title: "Cadastrado com sucesso",
			icon: "success",
		}).then(() => {
			window.location.href = "oferta-concurso";
		})
	});
}


function editar() {
	var objeto = {
		"idOfertaConcurso": idOfertaConcurso,
		concursoId: $("#concursoId").val(),
		cursoId: $("#cursoId").val(),
		escolaId: $("#escolaId").val(),
		turnoId: $("#turnoId").val(),
		curriculoId: $("#curriculoId").val(),
		serieId: $("#serieId").val(),
		descricaoOferta: $("#descricao").val(),
		vagas: $("#vagas").val(),
		minVagasAbertTurma: $("#vagasMin").val(),
	};

	console.log(objeto)

	$.ajax({
		url: url_base + "/ofertasConcurso",
		type: "PUT",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(e.responseJSON);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
			});
		},
	}).done(function(data) {
		Swal.fire({
			title: "Editado com sucesso",
			icon: "success",
		}).then(() => {
			window.location.href = "oferta-concurso";
		})
	});
}

$('#formNovoCadastro').on('submit', function(e) {
	e.preventDefault();
	if (idOfertaConcurso != undefined) {
		editar()
	} else {
		cadastrar()
	}

	return false;
});
