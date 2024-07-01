var dados = [];
var sortOrder = {};
var dadosOriginais = [];
var rows = 7;
var currentPage = 1;
var pagesToShow = 5;
var escolas = [];
let id = "";
var idEscola = "";
var ativo = "";
const contaId = sessionStorage.getItem('contaId')

$(document).ready(function() {
	getDados();

	$('.checkbox-toggle').each(function() {
		var status = $(this).data('status');
		if (status !== 'S') {
			$(this).prop('checked', false);
		}
	});

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
		url: url_base + "/contaPadraoAcessos/conta/" + contaId,
		type: "GET",
		async: false,
		error: function(e) {
			console.log(e);
		}
	})
		.done(function(data) {
			dados = data;
			dadosOriginais = data;
			listarDados(data);
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});
}

/*function editar(usuario) {
	var idPadraoAcesso = curso.getAttribute("data-id");
	window.location.href = "novo-padrao-acesso?id=" + idPadraoAcesso;
}*/

function listarDados(dados) {
	console.log(dados)
	var html = dados
		.map(function(item) {
			if (item.ativo == "N") {
				ativo =
					'<i  style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não';
			} else {
				ativo =
					"<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim";
			}

			return (
				"<tr>" +
				"<td>" +
				item.padraoAcesso +
				"</td>" +
				'<td class="d-flex justify-content-center"><span style="width:50%; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm"' +
				'" data-id="' +
				item.idContaPadraoAcesso +
				'" data-ativo="' +
				item.ativo +
				'" data-nome="' +
				item.padraoAcesso +
				'" data-bs-toggle="modal" onclick="showModal(this)" data-bs-target="#editItem"><i class="fa-solid fa-pen fa-lg"></i></span></td>' +
				"</tr>"
			);
		})
		.join("");

	$("#cola-tabela").html(html);
}

// Exportar Dados

$("#exportar-excel").click(function() {
	var planilha = XLSX.utils.json_to_sheet(dados);

	var livro = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(livro, planilha, "Planilha1");

	XLSX.writeFile(livro, "cursos.xlsx");
});

function showModal(ref) {
	id = ref.getAttribute("data-id");
	nome = ref.getAttribute("data-nome");

	$('#padraoAcessoNameEdit').val(nome);
}

function excluir() {
	Swal.fire({
		title: "Deseja mesmo excluir?",
		icon: "warning",
		showCancelButton: true,
		showConfirmButton: false,
		showDenyButton: true,
		denyButtonText: 'Deletar',
		cancelButtonText: 'Cancelar'
	}).then(result => {
		if (result.isDenied) {
			$.ajax({
				url: url_base + "/contaPadraoAcessos/" + Number(id),
				type: "delete",
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
					title: "Deletado com sucesso",
					icon: "success",
				}).then((data) => {
					window.location.href = 'padraoAcesso'
				})
			})
		} else if (result.isCanceled) {}
	})
}

function editar() {
	var objeto = {
		idContaPadraoAcesso: Number(id),
		contaId: contaId,
		padraoAcesso: $('#padraoAcessoNameEdit').val(),
	}

	$.ajax({
		url: url_base + "/contaPadraoAcessos",
		type: "PUT",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(e.responseJSON.message)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!"

			});
		}
	})
		.done(function(data) {
			Swal.fire({
				title: "Editado com sucesso",
				icon: "success",
			}).then((data) => {
				window.location.href = 'padraoAcesso'
			})
		})
}

function cadastrar() {
	var objeto = {
		contaId: contaId,
		padraoAcesso: $('#padraoAcessoName').val()
	};

	console.log(objeto)

	$.ajax({
		url: url_base + "/contaPadraoAcessos",
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
		}).then((data) => {
			window.location.href = 'padraoAcesso'
		})
	});

	return false;
}

$("#formCadastro").on("submit", function(e) {
	e.preventDefault();
	cadastrar();
	return false;
});

$("#editItem").on("submit", function(e) {
	e.preventDefault();
	editar();
	return false;
});
