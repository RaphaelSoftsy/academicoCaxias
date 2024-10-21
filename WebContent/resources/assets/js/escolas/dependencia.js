var dados = [];
var sortOrder = {};
var dadosOriginais = [];
var rows = 12;
var currentPage = 1;
var pagesToShow = 5;
var escolas = [];
var id = '';
var idEscola = localStorage.getItem('escolaId');
const contaId = localStorage.getItem('contaId')
var pefilEscola = localStorage.getItem("perfil")
var escola = JSON.parse(pefilEscola)
var nomeEscola = escola.nome

$(document).ready(function() {

	$.ajax({
		url: url_base + "/escolas",
		type: "GET",
		async: false,
	})
		.done(function(data) {
			escolas = data;
			$.each(data, function(index, item) {
				$('#escolaIdEdit').append($('<option>', {
					value: item.idEscola,
					text: item.nomeEscola,
					name: item.nomeEscola
				}));
			});
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
		url: url_base + "/tipoDependencia/conta/" + contaId,
		type: "GET",
		async: false,
	})
		.done(function(data) {
			$.each(data, function(index, item) {
				$('#tipoDependenciaIdEdit').append($('<option>', {
					value: item.idTipoDependencia,
					text: item.tipoDependencia,
					name: item.tipoDependencia
				}));
			});
			$.each(data, function(index, item) {
				$('#tipoDependenciaId').append($('<option>', {
					value: item.idTipoDependencia,
					text: item.tipoDependencia,
					name: item.tipoDependencia
				}));
			});
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

	getDados()

	// Dropdown de Pesquisa
	$('.dropdown-toggle-form').click(function() {
		
	});

	$('.searchButton').click(function() {
		var searchInput = $(this).siblings('.searchInput').val().toLowerCase();
		var columnToSearch = $(this).closest('.sortable').data('column');
		var filteredData;

		if (columnToSearch === 'tipoDependencia') {
			filteredData = dadosOriginais.filter(function(item) {
				return item.tipoDependencia.tipoDependencia.toLowerCase().includes(searchInput);
			});
		} else if (columnToSearch === 'escolaId') {
			filteredData = dadosOriginais.filter(function(item) {
				var escola = escolas.find(function(school) {
					return school.idEscola === item.escolaId;
				});
				var nomeEscola = escola ? escola.nomeEscola.toLowerCase() : "";
				return nomeEscola.includes(searchInput);
			});
		} else {
			filteredData = dadosOriginais.filter(function(item) {
				return item[columnToSearch].toString().toLowerCase().includes(searchInput);
			});
		}

		listarDados(filteredData);  $('input[data-toggle="toggle"]').bootstrapToggle();$('input[data-toggle="toggle"]').bootstrapToggle();

		$(this).siblings('.searchInput').val('');
		$(this).closest('.dropdown-content-form').removeClass('show');
	});

	$(document).on('click', '.sortable .col', function() {
		var column = $(this).closest('th').data("column");
		var currentOrder = sortOrder[column] || 'vazio';
		var newOrder;

		if (currentOrder === 'vazio') {
			newOrder = 'asc';
		} else if (currentOrder === 'asc') {
			newOrder = 'desc';
		} else {
			newOrder = 'vazio';
		}

		$(".sortable span").removeClass("asc desc");
		$(this).find('span').addClass(newOrder);

		var icon = $(this).find("i");
		icon.removeClass("fa-sort-up fa-sort-down fa-sort");

		if (newOrder === 'asc') {
			icon.addClass("fa-sort-up");
			sortData(column, newOrder);
		} else if (newOrder === 'desc') {
			icon.addClass("fa-sort-down");
			sortData(column, newOrder);
		} else {
			icon.addClass("fa-sort");
			listarDados(dadosOriginais);  $('input[data-toggle="toggle"]').bootstrapToggle();$('input[data-toggle="toggle"]').bootstrapToggle();
		}

		sortOrder[column] = newOrder;
	});

	function sortData(column, order) {
		var dadosOrdenados = dadosOriginais.slice();

		dadosOrdenados.sort(function(a, b) {
			if (column === 'tipoDependencia') {
				var valueA = a.tipoDependencia.tipoDependencia.toLowerCase();
				var valueB = b.tipoDependencia.tipoDependencia.toLowerCase();
				if (order === 'asc') {
					return valueA.localeCompare(valueB);
				} else {
					return valueB.localeCompare(valueA);
				}
			} else if (column === 'escolaId') {
				var escolaA = escolas.find(function(school) {
					return school.idEscola === a.escolaId;
				});
				var escolaB = escolas.find(function(school) {
					return school.idEscola === b.escolaId;
				});
				var nomeEscolaA = escolaA ? escolaA.nomeEscola.toLowerCase() : "";
				var nomeEscolaB = escolaB ? escolaB.nomeEscola.toLowerCase() : "";
				if (order === 'asc') {
					return nomeEscolaA.localeCompare(nomeEscolaB);
				} else {
					return nomeEscolaB.localeCompare(nomeEscolaA);
				}
			} else if (column === 'quantidade') {
				var valueA = parseFloat(a[column]);
				var valueB = parseFloat(b[column]);
				if (order === 'asc') {
					return valueA - valueB;
				} else {
					return valueB - valueA;
				}
			} else if (column === 'velocidadeMb') {
				var valueA = parseFloat(a[column]);
				var valueB = parseFloat(b[column]);
				if (order === 'asc') {
					return valueA - valueB;
				} else {
					return valueB - valueA;
				}
			} else {
				var valueA = a[column].toString().toLowerCase();
				var valueB = b[column].toString().toLowerCase();
				if (order === 'asc') {
					return valueA.localeCompare(valueB);
				} else {
					return valueB.localeCompare(valueA);
				}
			}

		});
		listarDados(dadosOrdenados); $('input[data-toggle="toggle"]').bootstrapToggle();$('input[data-toggle="toggle"]').bootstrapToggle();
	}



	showPage(currentPage);
	updatePagination();

});

$('#limpa-filtros').click(function() {
	listarDados(dadosOriginais);  $('input[data-toggle="toggle"]').bootstrapToggle();$('input[data-toggle="toggle"]').bootstrapToggle();
	$('.searchInput').val('');
});

function getDados() {

	$.ajax({

		url: url_base + "/escolaDependencia",
		type: "GET",
		async: false,
	})
		.done(function(data) {
			dados = data
			dadosOriginais = data;
			listarDados(data);  $('input[data-toggle="toggle"]').bootstrapToggle();$('input[data-toggle="toggle"]').bootstrapToggle();
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});
}


function listarDados(dados) {
	var html = dados.map(function(item) {

		var acessivel;
		var internaExterna;
		var climatizada;

		var escola = escolas.find(function(school) {
			return school.idEscola === item.escolaId;
		});


		if (item.acessivel == 'N') {
			acessivel = '<i  style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não'
		}
		else {
			acessivel = "<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim"
		}

		if (item.internaExterna == 'N') {
			internaExterna = '<i  style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não'
		}
		else {
			internaExterna = "<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim"
		}

		if (item.climatizada == 'N') {
			climatizada = '<i  style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não'
		}
		else {
			climatizada = "<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim"
		}

		return (
			"<tr>" +
			"<td>" +
			nomeEscola +
			"</td>" +
			"<td>" +
			item.dependencia +
			"</td>" +
			"<td>" +
			item.tipoDependencia.tipoDependencia +
			"</td>" +
			"<td>" +
			item.quantidade +
			"</td>" +
			"<td>" +
			acessivel +
			"</td>" +
			"<td>" +
			internaExterna +
			"</td>" +
			"<td>" +
			climatizada +
			"</td>" +
			'<td><span style=" margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-idEscola="' +
			item.escolaId +
			'" data-id="' +
			item.idEscolaDependencia +
			'"  onclick="showModal(this)" data-bs-toggle="modal" data-bs-target="#editItem"><i class="fa-solid fa-pen fa-lg"></i></span></td>' +
			"</tr>"
		);
	}).join("");

	$("#cola-tabela").html(html); 
}


// Exportar Dados

$('#exportar-excel').click(function() {

	var planilha = XLSX.utils.json_to_sheet(dados);

	var livro = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(livro, planilha, "Planilha1");

	XLSX.writeFile(livro, "dependencia.xlsx");
});


// Abrir modal

function showModal(ref) {
	id = ref.getAttribute("data-id");
	idEscola = ref.getAttribute("data-idEscola");


	$("#escolaIdEdit").val(idEscola).attr('selected', true);
	$.ajax({
		url: url_base + "/escolaDependencia/escola/" + idEscola,
		type: "GET",
		async: false,
		error: function(e) {
			console.log(e.responseJSON.message)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
			});
		}
	})
		.done(function(ref) {
			
			var data = ref.find((item) => item.idEscolaDependencia == id)
			$("#dependenciaEdit").val(data.dependencia);
			$("#tipoDependenciaIdEdit").val(data.tipoDependencia.idTipoDependencia).attr('selected', true);
			
			if (data.acessivel === 'S') {
				$('input[id="acessivelSEdit"]').prop('checked', true)
			} else {
				$('input[id="acessivelNEdit"]').prop('checked', true)
			}
			
			if (data.internaExterna === 'S') {
				$('input[id="internaExternaSEdit"]').prop('checked', true)
			} else {
				$('input[id="internaExternaNEdit"]').prop('checked', true)
			}
			
			if (data.climatizada === 'S') {
				$('input[id="climatizadaSEdit"]').prop('checked', true)
			} else {
				$('input[id="climatizadaNEdit"]').prop('checked', true)
			}
			
			$("#quantidadeEdit").val(data.quantidade);
		})
}

// Editar

function editar() {

	var objeto = {
		idEscolaDependencia: id,
		escolaId: idEscola,
		dependencia: $("#dependenciaEdit").val(),
		tipoDependenciaId: $("#tipoDependenciaIdEdit").val(),
		acessivel: $('input[name="acessivelEdit"]:checked').val(),
		internaExterna: $('input[name="internaExternaEdit"]:checked').val(),
		climatizada: $('input[name="climatizadaEdit"]:checked').val(),
		quantidade: $("#quantidadeEdit").val()
	}

	$.ajax({
		url: url_base + "/escolaDependencia",
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
		}
	})
		.done(function(data) {
			$("#escolaId").val(idEscola);
			$("#dependenciaEdit").val('');
			$("#tipoDependenciaIdEdit").val('');
			$('input[name="acessivelEdit"]:checked').val('');
			$('input[name="internaExternaEdit"]:checked').val('');
			$('input[name="climatizadaEdit"]:checked').val('');
			$("#quantidadeEdit").val('');
			getDados();
			showPage(currentPage);
			updatePagination();
			Swal.fire({
				title: "Editado com sucesso",
				icon: "success",
			})
		});
	return false;
}

$('#formEdit').on('submit', function(e) {
	e.preventDefault();
	editar();
	return false;
});


// Cadastrar

function cadastrar() {
	var objeto = {
		escolaId: idEscola,
		dependencia: $("#dependencia").val(),
		tipoDependenciaId: $("#tipoDependenciaId").val(),
		acessivel: $('input[name="acessivel"]:checked').val(),
		internaExterna: $('input[name="internaExterna"]:checked').val(),
		climatizada: $('input[name="climatizada"]:checked').val(),
		quantidade: $("#quantidade").val()
	}

	$.ajax({
		url: url_base + "/escolaDependencia",
		type: "POST",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(e.responseJSON.message)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
			});
		}
	})
		.done(function(data) {
			getDados();
			showPage(currentPage);
			updatePagination();
			Swal.fire({
				title: "Cadastrado com sucesso",
				icon: "success",
			})
		})
	return false;
}

$('#formCadastro').on('submit', function(e) {
	e.preventDefault();
	cadastrar();
	return false;
});


// Limpa input

function limpaCampo() {
	$("#escolaId").val('');
	$("#dependencia").val('');
	$("#tipoDependenciaId").val('');
	$('input[name="acessivel"]:checked').val('');
	$('input[name="internaExterna"]:checked').val('');
	$('input[name="climatizada"]:checked').val('');
	$("#quantidade").val('');
}
