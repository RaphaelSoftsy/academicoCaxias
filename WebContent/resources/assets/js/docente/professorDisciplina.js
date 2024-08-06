var dados = [];
const contaId = localStorage.getItem('contaId');
var nome = '';
var nome2 = '';
var nome3 = '';
var rows = 8;
var currentPage = 1;
var pagesToShow = 5;
let descricao = ''
let id = ''
let idProfessor = null

$(document).ready(function() {
	$.ajax({
		url: url_base + "/disciplina/conta/" + contaId,
		type: "GET",
		async: false,
	}).done(function(data) {
		console.log(data)

		$.each(data, function(index, item) {
			$("#disciplinaId").append(
				$("<option>", {
					value: item.idDisciplina,
					text: `${item.codDiscip} - ${item.nome}`,
					name: item.nome,
				})
			);
		});
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	});
})

const adicionar = () => {
	$.ajax({
		url: url_base + "/professorDisciplina",
		type: "POST",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		async: false,
		beforeSend: function() {
			Swal.showLoading()
		},
		error: function(e) {
			Swal.close()
			console.log(e)
			console.log(e.responseJSON.message)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",

			});
		}
	}).done(function(data) {
		Swal.close()
		Swal.fire({
			title: "Adicionado com sucesso",
			icon: "success",
		})
	})
}

$("#editItem").on("submit", function(e) {
	e.preventDefault();

	if (idProfessor != null) {
		adicionar();
	} else {
		Swal.fire({
			title: "Selecione um professor!!",
			icon: "info",
		})
	}
	return false;
});