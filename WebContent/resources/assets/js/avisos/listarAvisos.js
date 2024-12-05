var dados = [];
var sortOrder = {};
var dadosOriginais = [];
var rows = 12;
var currentPage = 1;
var pagesToShow = 5;
var escolas = [];
var id = "";
var idEscola = "";

$(document).ready(function() {
	var selectAno = document.getElementById("anoVigenteSelect");
	var anoAtual = new Date().getFullYear();

	var anosRetroativos = anoAtual - 2000;
	var anosFuturos = 2;

	var anoInicial = anoAtual + anosFuturos;
	var anoFinal = anoAtual - anosRetroativos;

	for (var i = anoInicial; i >= anoFinal; i--) {
		var option = document.createElement("option");
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
			escolas = data;
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

	getDados();

	// Dropdown de Pesquisa
	$(".dropdown-toggle-form").click(function() { });

	$(".searchButton").click(function() {
		var searchInput = $(this)
			.siblings(".searchInput")
			.val()
			.toLowerCase()
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "");

		var columnToSearch = $(this).closest(".sortable").data("column");
		var filteredData;

		if (columnToSearch === "escolaId") {
			filteredData = dadosOriginais.filter(function(item) {
				var escola = escolas.find(function(school) {
					return school.idEscola === item.escolaId;
				});

				var nomeEscola = escola
					? escola.nomeEscola
						.toLowerCase()
						.normalize("NFD")
						.replace(/[\u0300-\u036f]/g, "")
					: "";

				return nomeEscola.includes(searchInput);
			});
		} else if (columnToSearch === "anoVigente") {
			filteredData = dadosOriginais.filter(function(item) {
				return item.anoVigente.toString() === searchInput;
			});
		} else {
			filteredData = dadosOriginais.filter(function(item) {
				var columnValue = item[columnToSearch]
					? item[columnToSearch]
						.toString()
						.toLowerCase()
						.normalize("NFD")
						.replace(/[\u0300-\u036f]/g, "")
					: "";

				return columnValue.includes(searchInput);
			});
		}

		listarDados(filteredData);
		$('input[data-toggle="toggle"]').bootstrapToggle();
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
			$('input[data-toggle="toggle"]').bootstrapToggle();
			$('input[data-toggle="toggle"]').bootstrapToggle();
		}

		sortOrder[column] = newOrder;
	});

	function sortData(column, order) {
		var dadosOrdenados = dadosOriginais.slice();

		dadosOrdenados.sort(function(a, b) {
			if (column === "anoEscolarId") {
				var valueA = a.anoEscolar.anoEscolar.toLowerCase();
				var valueB = b.anoEscolar.anoEscolar.toLowerCase();
				if (order === "asc") {
					return valueA.localeCompare(valueB);
				} else {
					return valueB.localeCompare(valueA);
				}
			} else if (column === "turnoId") {
				var valueA = a.turno.turno.toLowerCase();
				var valueB = b.turno.turno.toLowerCase();
				if (order === "asc") {
					return valueA.localeCompare(valueB);
				} else {
					return valueB.localeCompare(valueA);
				}
			} else if (column === "modalidadeEscolaId") {
				var valueA = a.modalidadeEscola.modalidadeEscola.toLowerCase();
				var valueB = b.modalidadeEscola.modalidadeEscola.toLowerCase();
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
		$('input[data-toggle="toggle"]').bootstrapToggle();
		$('input[data-toggle="toggle"]').bootstrapToggle();
	}

	showPage(currentPage);
	updatePagination();
});

$("#limpa-filtros").click(function() {
	listarDados(dadosOriginais);
	$('input[data-toggle="toggle"]').bootstrapToggle();
	$(".searchInput").val("");
});


function formatarHoraParaAMPM(hora) {
	if (!hora) {
		console.error("Hora não está definida ou é inválida:", hora);
		return ""; // Ou algum valor padrão, como "00:00 AM"
	}

	let [horas, minutos, segundos] = hora.split(":");
	horas = parseInt(horas, 10);
	const periodo = horas >= 12 ? "PM" : "AM";
	horas = horas % 12 || 12;
	return `${("0" + horas).slice(-2)}:${minutos} ${periodo}`;
}

function formatarDataComHora(dataISO) {
	if (!dataISO) return ""; // Retorna vazio se a data for inválida ou nula
	const data = new Date(dataISO);
	const opcoesData = { year: "numeric", month: "2-digit", day: "2-digit" };
	const opcoesHora = { hour: "2-digit", minute: "2-digit", hour12: false };
	const dataFormatada = new Intl.DateTimeFormat("pt-BR", opcoesData).format(data);
	const horaFormatada = new Intl.DateTimeFormat("pt-BR", opcoesHora).format(data);
	return `${dataFormatada}`;
}


function getDados() {
	$.ajax({
		url: url_base + "/aviso",
		type: "GET",
		async: false,
	})
		.done(function(data) {
			dados = data;
			dadosOriginais = data;
			listarDados(data);
			$('input[data-toggle="toggle"]').bootstrapToggle();

		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});
}

function listarDados(dados) {
	var html = dados
		.map(function(item) {
			return (
				"<tr>" +
				"<td>" +
				item.titulo +
				"</td>" +
				"<td>" +
				item.mensagem +
				"</td>" +
				"<td>" +
				formatarDataComHora(item.dataInicio) +
				"</td>" +
				"<td>" +
				formatarDataComHora(item.dataFim) +
				"</td>" +
				'<td class="d-flex justify-content-center">' +
				(item.pathAnexo != null ?
					'<span style="width: 80% ; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" title="Baixar Anexo" data-id="' +
					item.idAviso +
					'" onclick="baixarAnexo(this)">' +
					'<i class="fa-solid fa-file-arrow-down fa-lg"></i>' +
					"</span>" : "") +

				'<span style="width: 80%; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-primary btn-sm" title="Visualizar Destinatários" data-id="' +
				item.idAviso +
				'" onclick="editar(this)">' +
				'<i class="fa-solid fa-graduation-cap fa-lg text-light"></i>' +
				"</span>"
				+
				"</td>" +
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

	XLSX.writeFile(livro, "turmas.xlsx");
});

function baixarAnexo(ref) {
	var id = parseInt(ref.getAttribute("data-id"));
	var aviso = dados.find(item => item.idAviso === id);

	if (!aviso || !aviso.pathAnexo) {
		alert("Anexo não disponível para este aviso.");
		return;
	}


	var link = document.createElement("a");
	link.href = "http://10.40.110.2:8080" + aviso.pathAnexo.replace("/opt/tomcat9/webapps", "");
	link.download = aviso.titulo.replace(/[^a-zA-Z0-9]/g, "_") || "anexo";

	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}



