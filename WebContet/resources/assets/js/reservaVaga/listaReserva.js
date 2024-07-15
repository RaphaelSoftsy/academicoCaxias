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
const contaId = sessionStorage.getItem('contaId')
const escolaId = sessionStorage.getItem('escolaId')

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
		url: url_base + "/candidatos/listaReservaDeVagas?idConta=" + contaId,
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

function editar(curso) {
	var idCandidato = curso.getAttribute("data-id");
	window.location.href = "dados-aluno?id=" + "teste";
}


function getTipoIngresso(idTipoIngresso) {
	return $.ajax({
		url: url_base + '/tiposIngresso/' + idTipoIngresso,
		type: "get",
		async: true,  // async é true por padrão, pode omitir
	}).then(function(data) {
		return data.tipoIngresso;
	});
}

function listarDados(dados) {
	// Converte a lista de dados em uma lista de promessas
	var promessas = dados.map(function(item) {
		return getTipoIngresso(item.idTipoIngresso).then(function(tipoIngresso) {
			var escola = escolas.find(function(school) {
				return school.idEscola === item.escolaId;
			});

			var status = item.aprovado == null ? "Aguardando" : "Aprovado"; // Você pode ajustar essa lógica conforme necessário

			if (item.aprovado == null) {
				status = "Aguardando"
			} else if (item.aprovado == "N") {
				status = "Reprovado"
			} else {
				status = "Aprovado"
			}

			var nomeEscola = escola ? escola.nomeEscola : "Escola não encontrada";

			return (
				"<tr>" +
				"<td>" + item.candidato + "</td>" +
				"<td>" + item.nomeCompleto + "</td>" +
				"<td>" + item.nomeEscola + "</td>" +
				"<td>" + item.turno + "</td>" +
				"<td>" + item.serie + "</td>" +
				"<td>" + tipoIngresso + "</td>" +
				"<td>" + status + "</td>" +
				"</td>" +
				'<td class="d-flex justify-content-center"><span style="width:50%; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" ' +
				' onclick="editar(this)" data-bs-toggle="modal" data-bs-target="#editItem"><i class="fa-solid fa-pen fa-lg"></i></span></td>' +
				"</tr>"
			);
		});
	});

	// Aguarda todas as promessas serem resolvidas
	Promise.all(promessas).then(function(linhas) {
		$("#cola-tabela").html(linhas.join(""));
	});
}

// Exportar Dados

$("#exportar-excel").click(function() {
	var planilha = XLSX.utils.json_to_sheet(dados);

	var livro = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(livro, planilha, "Planilha1");

	XLSX.writeFile(livro, "reservas.xlsx");
});



