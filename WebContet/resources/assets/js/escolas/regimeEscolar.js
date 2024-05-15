var dados = [];
var sortOrder = {};
var dadosOriginais = [];
var rows = 7;
var currentPage = 1;
var pagesToShow = 5;
var escolas = [];
var id = '';
var idEscola = '';
const contaId = Number(sessionStorage.getItem('contaId'))
var idEscola = localStorage.getItem("escolaId");
var pefilEscola = localStorage.getItem("perfil")
var escola = JSON.parse(pefilEscola)
var nomeEscola = escola.nome

$(document).ready(function() {

	$("#divAnexoEdit").hide();


	var anoCicloEdit = document.getElementById('anoCicloEdit');
	var anoCiclo = document.getElementById('anoCiclo');
	var anoAtual = new Date().getFullYear();

	var anosRetroativos = anoAtual - 2000;
	var anosFuturos = 10;

	var anoInicial = anoAtual + anosFuturos;
	var anoFinal = anoAtual - anosRetroativos;

	for (var i = anoInicial; i >= anoFinal; i--) {
		var option = document.createElement('option');
		option.value = i;
		option.text = i;
		anoCiclo.appendChild(option);
	}
	for (var i = anoInicial; i >= anoFinal; i--) {
		var option = document.createElement('option');
		option.value = i;
		option.text = i;
		anoCicloEdit.appendChild(option);
	}

	$.ajax({
		url: url_base + `/escolas/conta/${contaId}`,
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
			console.error("Erro na solicitação AJAX:", jqXHR);
		});

	$.ajax({
		url: url_base + `/periodicidade/conta/${contaId}`,
		type: "GET",
		async: false,
	})
		.done(function(data) {
			$.each(data, function(index, item) {
				$('#periodicidadeIdEdit').append($('<option>', {
					value: item.idPeriodicidade,
					text: item.periodicidade,
					name: item.periodicidade
				}));
			});
			$.each(data, function(index, item) {
				$('#periodicidadeId').append($('<option>', {
					value: item.idPeriodicidade,
					text: item.periodicidade,
					name: item.periodicidade
				}));
			});
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", jqXHR);
		});

	getDados()

	// Dropdown de Pesquisa
	$('.dropdown-toggle-form').click(function() {
		$(this).siblings('.dropdown-content-form').toggleClass('show');
	});

	$('.searchButton').click(function() {
		var searchInput = $(this).siblings('.searchInput').val().toLowerCase();
		var columnToSearch = $(this).closest('.sortable').data('column');
		var filteredData;

		if (columnToSearch === 'dataHomologacao' || columnToSearch === 'dataInicioVigencia' || columnToSearch === 'dataFimVigencia') {
			searchInput = searchInput.split('T')[0];
			filteredData = dadosOriginais.filter(function(item) {
				var itemDate = item[columnToSearch].split('T')[0];
				return itemDate.includes(searchInput);
			});
		} else if (columnToSearch === 'periodicidade') {
			filteredData = dadosOriginais.filter(function(item) {
				return item.periodicidade.periodicidade.toLowerCase().includes(searchInput);
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

		listarDados(filteredData);

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
			listarDados(dadosOriginais);
		}

		sortOrder[column] = newOrder;
	});

	function sortData(column, order) {
		var dadosOrdenados = dadosOriginais.slice();

		dadosOrdenados.sort(function(a, b) {
			if (column === 'dataHomologacao' || column === 'dataInicioVigencia' || column === 'dataFimVigencia') {
				var dateA = new Date(a[column]);
				var dateB = new Date(b[column]);

				if (order === 'asc') {
					return dateA - dateB;
				} else {
					return dateB - dateA;
				}
			} if (column === 'periodicidade') {
				var valueA = a.periodicidade.periodicidade.toLowerCase();
				var valueB = b.periodicidade.periodicidade.toLowerCase();
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
		listarDados(dadosOrdenados);
	}



	showPage(currentPage);
	updatePagination();

});

$('#limpa-filtros').click(function() {
	listarDados(dadosOriginais);
	$('.searchInput').val('');
});

function getDados() {

	$.ajax({

		url: url_base + `/escolaRegimeEscolar/escola/${idEscola}`,
		type: "GET",
		async: false,
	})
		.done(function(data) {
			dados = data
			dadosOriginais = data;
			listarDados(data);
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", jqXHR);
		});
}

function formatarDataParaBR(data) {
	var dataObj = new Date(data);
	var dia = String(dataObj.getDate()).padStart(2, '0');
	var mes = String(dataObj.getMonth() + 1).padStart(2, '0');
	var ano = dataObj.getFullYear();
	return dia + '/' + mes + '/' + ano;
}

function listarDados(dados) {
	var html = dados.map(function(item) {

		var escola = escolas.find(function(school) {
			return school.idEscola === item.escolaId;
		});

		var nomeEscola = escola
			? escola.nomeEscola
			: "Escola não encontrada";

		return (
			"<tr>" +
			"<td>" +
			nomeEscola +
			"</td>" +
			"<td>" +
			item.descricao +
			"</td>" +
			"<td>" +
			formatarDataParaBR(item.dataHomologacao) +
			"</td>" +
			"<td>" +
			formatarDataParaBR(item.dataInicioVigencia) +
			"</td>" +
			"<td>" +
			formatarDataParaBR(item.dataFimVigencia) +
			"</td>" +
			"<td>" +
			item.anoCiclo +
			"</td>" +
			"<td>" +
			item.periodicidade.periodicidade +
			"</td>" +
			'<td><span style=" height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-secondary btn-sm" onclick="processarAnexoBase64(\'' + item.anexo + '\')">Exibir</span></td>' +
			'<td><span style=" margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-idEscola="' +
			item.escolaId +
			'" data-id="' +
			item.idEscolaRegimeEscolar +
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

	XLSX.writeFile(livro, "regimeEscolar.xlsx");
});


// Abrir anexo

function processarAnexoBase64(anexoBase64, fileName = 'arquivo.bin') {
	var base64Content = anexoBase64.split(';base64,').pop();

	var binaryData = atob(base64Content);

	var byteArray = new Uint8Array(binaryData.length);
	for (var i = 0; i < binaryData.length; i++) {
		byteArray[i] = binaryData.charCodeAt(i);
	}

	var blob = new Blob([byteArray], { type: 'application/octet-stream' });

	var blobUrl = URL.createObjectURL(blob);
	window.open(blobUrl);
}
var anexo = '';
var mudarAnexo = false;
var novoAnexo = '';

$('input[name="mudaAnexo"]').change(function() {
	if ($(this).val() === "S") {
		$('#anexoEdit').parent().show();
		mudarAnexo = true;
	} else {
		$('#anexoEdit').parent().hide();
		mudarAnexo = false;
	}
});

function formatarDataParaAPI(data) {
	var year = data.getFullYear();
	var month = ('0' + (data.getMonth() + 1)).slice(-2);
	var day = ('0' + data.getDate()).slice(-2);

	var hora = '23:59:59';

	return year + '-' + month + '-' + day + 'T' + hora;
}


// Abrir modal

function showModal(ref) {
	id = ref.getAttribute("data-id");
	idEscola = ref.getAttribute("data-idEscola");

	$("#escolaIdEdit").val(idEscola).attr('selected', true);
	$.ajax({
		url: url_base + "/escolaRegimeEscolar/escola/" + idEscola,
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
		.done(function(data) {
			$("#descricaoEdit").val(data[0].descricao);
			var dataHomo = data[0].dataHomologacao.split('T')[0];
			var dataIni = data[0].dataInicioVigencia.split('T')[0];
			var dataFim = data[0].dataFimVigencia.split('T')[0];
			$("#dataHomologacaoEdit").val(dataHomo);
			$("#dataInicioVigenciaEdit").val(dataIni);
			$("#anoCicloEdit").val(data[0].anoCiclo);
			$("#periodicidadeIdEdit").val(data[0].periodicidade.idPeriodicidade);
			$("#dataFimVigenciaEdit").val(dataFim);
			anexo = data[0].anexo
		})
}



// Editar

function editar() {
	var inputFile = document.getElementById('anexoEdit');
	var file = inputFile.files[0];
	var reader = new FileReader();

	var dataHomo = $('#dataHomologacaoEdit').val();
	var dataIni = $('#dataInicioVigenciaEdit').val();
	var dataFim = $('#dataFimVigenciaEdit').val();

	var dataHomoFormat = new Date(dataHomo);
	var dataIniFormat = new Date(dataIni);
	var dataFimFormat = new Date(dataFim);

	var dtIni = formatarDataParaAPI(dataIniFormat);
	var dtFim = formatarDataParaAPI(dataFimFormat);
	var dtHomo = formatarDataParaAPI(dataHomoFormat);

	if (mudarAnexo) {
		reader.onload = function(event) {
			var base64String = event.target.result;

			var objeto = {
				idEscolaRegimeEscolar: id,
				escolaId: Number(idEscola),
				descricao: $('#descricaoEdit').val(),
				dataHomologacao: dtHomo,
				dataInicioVigencia: dtIni,
				dataFimVigencia: dtFim,
				anoCiclo: $("#anoCicloEdit").val(),
				periodicidadeId: $("#periodicidadeIdEdit").val(),
				anexo: 'null'
			};

			$.ajax({
				url: url_base + "/escolaRegimeEscolar",
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
					$("#descricaoEdit").val('');
					$("#dataHomologacaoEdit").val('');
					$("#dataInicioVigenciaEdit").val('');
					$("#anoCicloEdit").val('');
					$("#periodicidadeIdEdit").val('');
					$("#dataFimVigenciaEdit").val('');
					$("#anexoEdit").val('');
					mudarAnexo = false;
					getDados();
					showPage(currentPage);
					updatePagination();
					Swal.fire({
						title: "Editado com sucesso",
						icon: "success",
					})
				});
		};

		reader.readAsDataURL(file);
	} else {
		var objeto = {
			idEscolaRegimeEscolar: id,
			escolaId: Number($('#escolaIdEdit').val()),
			descricao: $('#descricaoEdit').val(),
			dataHomologacao: dtHomo,
			dataInicioVigencia: dtIni,
			dataFimVigencia: dtFim,
			anoCiclo: $("#anoCicloEdit").val(),
			periodicidadeId: $("#periodicidadeIdEdit").val(),
			anexo: 'null'
		};

		$.ajax({
			url: url_base + "/escolaRegimeEscolar",
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
				$("#descricaoEdit").val('');
				$("#dataHomologacaoEdit").val('');
				$("#dataInicioVigenciaEdit").val('');
				$("#anoCicloEdit").val('');
				$("#periodicidadeIdEdit").val('');
				$("#dataFimVigenciaEdit").val('');
				$("#anexoEdit").val('');
				mudarAnexo = false;
				getDados();
				showPage(currentPage);
				updatePagination();
				Swal.fire({
					title: "Editado com sucesso",
					icon: "success",
				})
			});
	}

	return false;
}

$('#formEdit').on('submit', function(e) {
	e.preventDefault();
	editar();
	return false;
});


// Cadastrar

function cadastrar() {
	var inputFile = document.getElementById('anexo');
	var file = inputFile.files[0];
	var reader = new FileReader();

	var dataHomo = $('#dataHomologacao').val();
	var dataIni = $('#dataInicioVigencia').val();
	var dataFim = $('#dataFimVigencia').val();

	var dataHomoFormat = new Date(dataHomo);
	var dataIniFormat = new Date(dataIni);
	var dataFimFormat = new Date(dataFim);

	var dtIni = formatarDataParaAPI(dataIniFormat);
	var dtFim = formatarDataParaAPI(dataFimFormat);
	var dtHomo = formatarDataParaAPI(dataHomoFormat);

	reader.onload = function(event) {
		var base64String = event.target.result;

		var objeto = {
			escolaId: Number(idEscola),
			descricao: $('#descricao').val(),
			dataHomologacao: dtHomo,
			dataInicioVigencia: dtIni,
			dataFimVigencia: dtFim,
			anoCiclo: $("#anoCiclo").val(),
			periodicidadeId: $("#periodicidadeId").val(),
			anexo: 'null'
		};

		$.ajax({
			url: url_base + "/escolaRegimeEscolar",
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
			}
		})
			.done(function(data) {
				$("#descricao").val('');
				$("#dataHomologacao").val('');
				$("#dataInicioVigencia").val('');
				$("#anoCiclo").val('');
				$("#periodicidadeId").val('');
				$("#dataFimVigencia").val('');
				$("#anexo").val('');
				getDados();
				showPage(currentPage);
				updatePagination();
				Swal.fire({
					title: "Cadastrado com sucesso",
					icon: "success",
				})
			});
	};

	reader.readAsDataURL(file);
	return false;
}

$('#formCadastro').on('submit', function(e) {
	e.preventDefault();
	cadastrar();
	return false;
});


// Limpa input

function limpaCampo() {
	$("#descricao").val('');
	$("#dataHomologacao").val('');
	$("#dataInicioVigencia").val('');
	$("#anoCiclo").val('');
	$("#periodicidadeId").val('');
	$("#dataFimVigencia").val('');
	$("#anexo").val('');
}
