var dados = [];
var sortOrder = {};
var dadosOriginais = [];
var rows = 7;
var currentPage = 1;
var pagesToShow = 5;
var escolas = [];
var id = "";
var idEscola = "";
var ativo = "";
const contaId = localStorage.getItem('contaId')
const escolaId = sessionStorage.getItem('escolaId')
let idCandidato = ''

$(document).ready(function() {


	getDados();


	// Dropdown de Pesquisa
	$(".dropdown-toggle-form").click(function() {
		$(this).siblings(".dropdown-content-form").toggleClass("show");
	});

	$(".searchButton").click(function() {
		var searchInput = $(this).siblings(".searchInput").val().toLowerCase();
		var columnToSearch = $(this).closest(".sortable").data("column");
		var filteredData;

		if (columnToSearch === "dependenciaAdm") {
			filteredData = dadosOriginais.filter(function(item) {
				return item.dependenciaAdm.dependenciaAdministrativa
					.toLowerCase()
					.includes(searchInput);
			});
		} else if (columnToSearch === "escolaId") {
			filteredData = dadosOriginais.filter(function(item) {
				var escola = escolas.find(function(school) {
					return school.idEscola === item.escolaId;
				});
				var nomeEscola = escola ? escola.nomeEscola.toLowerCase() : "";
				return nomeEscola.includes(searchInput);
			});
		} else {
			filteredData = dadosOriginais.filter(function(item) {
				return item[columnToSearch]
					.toString()
					.toLowerCase()
					.includes(searchInput);
			});
		}

		listarDados(filteredData);

		$(this).siblings(".searchInput").val("");
		$(this).closest(".dropdown-content-form").removeClass("show");
	});

	$(document).on("click", ".sortable .col", function() {
		var column = $(this).closest("th").data("column");
		var currentOrder = sortOrder[column] || "vazio";
		var newOrder;

		if (currentOrder === "vazio") {
			newOrder = "asc";
		} else if (currentOrder === "asc") {
			newOrder = "desc";
		} else {
			newOrder = "vazio";
		}

		$(".sortable span").removeClass("asc desc");
		$(this).find("span").addClass(newOrder);

		var icon = $(this).find("i");
		icon.removeClass("fa-sort-up fa-sort-down fa-sort");

		if (newOrder === "asc") {
			icon.addClass("fa-sort-up");
			sortData(column, newOrder);
		} else if (newOrder === "desc") {
			icon.addClass("fa-sort-down");
			sortData(column, newOrder);
		} else {
			icon.addClass("fa-sort");
			listarDados(dadosOriginais);
		}

		sortOrder[column] = newOrder;
	});

	function sortData(column, order) {
		var dadosOrdenados = dadosOriginais.slice();

		dadosOrdenados.sort(function(a, b) {
			if (column === "dependenciaAdm") {
				var valueA = a.dependenciaAdm.dependenciaAdministrativa.toLowerCase();
				var valueB = b.dependenciaAdm.dependenciaAdministrativa.toLowerCase();
				if (order === "asc") {
					return valueA.localeCompare(valueB);
				} else {
					return valueB.localeCompare(valueA);
				}
			} else if (column === "escolaId") {
				var escolaA = escolas.find(function(school) {
					return school.idEscola === a.escolaId;
				});
				var escolaB = escolas.find(function(school) {
					return school.idEscola === b.escolaId;
				});
				var nomeEscolaA = escolaA ? escolaA.nomeEscola.toLowerCase() : "";
				var nomeEscolaB = escolaB ? escolaB.nomeEscola.toLowerCase() : "";
				if (order === "asc") {
					return nomeEscolaA.localeCompare(nomeEscolaB);
				} else {
					return nomeEscolaB.localeCompare(nomeEscolaA);
				}
			} else {
				var valueA = a[column].toString().toLowerCase();
				var valueB = b[column].toString().toLowerCase();
				if (order === "asc") {
					return valueA.localeCompare(valueB);
				} else {
					return valueB.localeCompare(valueA);
				}
			}
		});
		listarDados(dadosOrdenados);
	}

	$('.checkbox-toggle').each(function() {
		var status = $(this).data('status');
		if (status !== 'S') {
			$(this).prop('checked', false);
		}
	});

	showPage(currentPage);
	updatePagination();
});

$("#limpa-filtros").click(function() {
	listarDados(dadosOriginais);
	$(".searchInput").val("");
});

function getDados() {
	$.ajax({
		url: url_base + "/professores/conta/" + contaId,
		type: "GET",
		async: false,
	})
		.done(function(data) {
			dados = data;
			dadosOriginais = data;
			console.log(data)
			listarDados(data);
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});
}

function editar(candidato) {
	var idCandidato = candidato.getAttribute("data-id");
	window.location.href = "dados-aluno?id=" + idCandidato;
}

function listarDados(dados) {
	var html = dados.map(function(item) {

		return (
			"<tr>" +

			"<td>" +
			item.pessoa.nomeCompleto +
			"</td>" +

			"<td>" +
			item.codigoInep +
			"</td>" +

			"<td>" +
			item.matricula +
			"</td>" +

			"<td>" +
			item.emailInstitucional +
			"</td>" +
			"<td>" +
			'<input type="checkbox" data-status="' +
			item.ativo +
			'" data-id="' +
			item.idProfessor +
			' " onChange="alteraStatus(this)" checked data-toggle="toggle" data-onstyle="success" data-offstyle="danger" data-on="Sim" data-off="Não" data-width="63" class="checkbox-toggle" data-size="sm">' +
			"</td>" +
			'<td class="d-flex justify-content-center"><span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-id="' +
			item.idProfessor +
			'" onclick="showModal(this)" data-bs-toggle="modal" data-bs-target="#editAto"><i class="fa-solid fa-pen fa-lg"></i></span></td>' +
			"</tr>"
		);
	}).join("");

	$("#cola-tabela").html(html);

	$('.checkbox-toggle').each(function() {
		var status = $(this).data('status');
		if (status !== 'S') {
			$(this).prop('checked', false);
		}
	});

	$('input[data-toggle="toggle"]').bootstrapToggle();
}



function showModal(ref) {
	idCandidato = ref.getAttribute("data-id");

	window.location.href = 'editar-professor' + idCandidato
}

$('#formDoc').submit((e) => {
	e.preventDefault();

	var buttonId = $(document.activeElement).attr('id');
	console.log(buttonId);

	if (buttonId == 'aprovar') {
		Swal.fire({
			title: "Deseja mesmo aprovar esse candidato?",
			icon: "question",
			showCancelButton: true,
			showConfirmButton: true,
			showDenyButton: false,
			confirmButtonText: 'Aprovar',
			cancelButtonText: 'Cancelar'
		}).then(result => {
			if (result.isConfirmed) {
				$.ajax({
					url: url_base + "/candidatos/" + Number(idCandidato) + '/aprovar',
					type: "put",
					contentType: "application/json; charset=utf-8",
					async: false,
					error: function(e) {
						console.log(e)
						Swal.fire({
							icon: "error",
							title: "Oops...",
							text: "Não foi possível realizar esse comando!"

						});
					}
				}).done(function(data) {
					Swal.fire({
						title: "Aprovado com sucesso",
						icon: "success",
					}).then((data) => {
						window.location.href = 'reservas'
					})
				})
			} else if (result.isCanceled) { }
		})
	} else {
		Swal.fire({
			title: "Deseja mesmo reprovar esse candidato?",
			icon: "question",
			showCancelButton: true,
			showConfirmButton: false,
			showDenyButton: true,
			denyButtonText: 'Reprovar',
			cancelButtonText: 'Cancelar'
		}).then(result => {
			if (result.isDenied) {
				$.ajax({
					url: url_base + "/candidatos/" + Number(idCandidato) + '/reprovar',
					type: "put",
					contentType: "application/json; charset=utf-8",
					async: false,
					error: function(e) {
						console.log(e)
						Swal.fire({
							icon: "error",
							title: "Oops...",
							text: "Não foi possível realizar esse comando!"

						});
					}
				}).done(function(data) {
					Swal.fire({
						title: "Reprovado com sucesso",
						icon: "success",
					}).then((data) => {
						window.location.href = 'reservas'
					})
				})
			} else if (result.isCanceled) { }
		})
	}
})

// Exportar Dados
$("#exportar-excel").click(function() {
	var planilha = XLSX.utils.json_to_sheet(dados);

	var livro = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(livro, planilha, "Planilha1");

	XLSX.writeFile(livro, "reservas.xlsx");
});



