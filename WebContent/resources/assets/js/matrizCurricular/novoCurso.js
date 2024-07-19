const contaId = sessionStorage.getItem('contaId')
const idCurso = params.get("id");

$(document).ready(function() {
	if (idCurso != undefined) {
		$("#tituloPagina, #tituloForm").text("Editar Curso")
		$("#h1-curso").text("Editar Curso")
		$("#btn-adicionar").text("Editar")

		$.ajax({
			url: url_base + '/cursos/' + idCurso,
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
			Swal.close();
			$('#nomeCurso').val(data.nome)
			$('#codCurso').val(data.codCurso)
			$('#codCursoInpe').val(data.codCursoInpe)
		});
	}
});

$("#formNovoCadastro").submit(function(e) {
	e.preventDefault();

	if (idCurso != undefined) {
		var dadosFormulario = {
			"idCurso": idCurso,
			"contaId": contaId,
			"codCurso": $('#codCurso').val(),
			"nome": $('#nomeCurso').val(),
			"codCursoInpe": $('#codCursoInpe').val()
		};

		$.ajax({
			url: url_base + '/cursos',
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
					text: "Não foi possível cadastar nesse momento!",
				});
			}
		}).done(function(data) {
			Swal.close();
			Swal.fire({
				title: "Editado com sucesso",
				icon: "success",
			})
			window.location.href = "curso";
		});
	} else {
		var dadosFormulario = {
			"contaId": contaId,
			"codCurso": $('#codCurso').val(),
			"nome": $('#nomeCurso').val(),
			"codCursoInpe": $('#codCursoInpe').val()
		};

		$.ajax({
			url: url_base + '/cursos',
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
					text: "Não foi possível cadastar nesse momento!",
				});
			}
		}).done(function(data) {
			Swal.close();
			Swal.fire({
				title: "Cadastrado com sucesso",
				icon: "success",
			})
			window.location.href = "curso";
		});
	}
});
