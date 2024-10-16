var dados = [];
var sortOrder = {};
var dadosOriginais = [];
var rows = 12;
var currentPage = 1;
var pagesToShow = 5;
var escolas = [];
var id = '';
var idEscola = '';
const contaId = Number(localStorage.getItem('contaId'))
var idEscola = localStorage.getItem("escolaId");
var pefilEscola = localStorage.getItem("perfil")
var escola = JSON.parse(pefilEscola)
var nomeEscola = escola.nome

$(document).ready(function() {

	$("#divAnexoEdit").hide();
	$("#divTermoEdit").hide();

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
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
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

		if (columnToSearch === 'dataValidade') {
			searchInput = searchInput.split('T')[0];

			filteredData = dadosOriginais.filter(function(item) {
				if (columnToSearch === 'dataValidade') {
					var itemDate = item[columnToSearch].split('T')[0];
					return itemDate.includes(searchInput);
				} else {
					return item[columnToSearch].toString().toLowerCase().includes(searchInput);
				}
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
			if (column === 'dataValidade') {
				var dateA = new Date(a[column]);
				var dateB = new Date(b[column]);

				if (order === 'asc') {
					return dateA - dateB;
				} else {
					return dateB - dateA;
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

		url: url_base + `/escolaTColaboracao/escola/${idEscola}`,
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
			item.coordenador +
			"</td>" +
			"<td>" +
			formatarDataParaBR(item.dataValidade) +
			"</td>" +
			'<td><span style=" height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-secondary btn-sm" onclick="exibirTermo(\'' + item.termoColaboracao + '\')">Exibir</span></td>' +
			'<td><span style=" height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-secondary btn-sm" onclick="processarAnexoBase64(\'' + item.anexo + '\')">Exibir</span></td>' +
			'<td><span style=" margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-idEscola="' +
			item.escolaId +
			'" data-id="' +
			item.idEscolaTermoColaboracao +
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

	XLSX.writeFile(livro, "termoColaboracao.xlsx");
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
function exibirTermo(anexoBase64, fileName = 'arquivo.bin') {
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

var termo = '';
var mudarTermo = false;
var novoTermo = '';

$('input[name="mudaAnexo"]').change(function() {
	if ($(this).val() === "S") {
		$('#anexoEdit').parent().show();
		mudarAnexo = true;
	} else {
		$('#anexoEdit').parent().hide();
		mudarAnexo = false;
	}
});
$('input[name="mudaTermo"]').change(function() {
	if ($(this).val() === "S") {
		$('#termoEdit').parent().show();
		mudarTermo = true;
	} else {
		$('#termoEdit').parent().hide();
		mudarTermo = false;
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
	$('input[name="mudaTermo"]:checked').val('');
	$('input[name="acessivelEdit"]:checked').val('');
	$.ajax({
		url: url_base + "/escolaTColaboracao/escola/" + idEscola,
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
			var data = ref.find((item) => item.idEscolaTermoColaboracao == id)
			$("#coordenadorEdit").val(data.coordenador);
			var dataValidade = data.dataValidade.split('T')[0];
			$("#dataValidadeEdit").val(dataValidade);
			anexo = data.anexo
			termo = data.termoColaboracao
		})
}



// Editar

function editar() {
	var inputFileAnexo = document.getElementById('anexoEdit');
	var inputFileTermo = document.getElementById('termoColaboracaoEdit');

	var fileAnexo = inputFileAnexo.files[0];
	var fileTermo = inputFileTermo.files[0];

	var readerAnexo = new FileReader();
	var readerTermo = new FileReader();

	var dataValidade = $('#dataValidadeEdit').val();
	var dataValidadeFormatada = new Date(dataValidade);
	var dataValidadeAPI = formatarDataParaAPI(dataValidadeFormatada);

	if (mudarAnexo && mudarTermo) {
		readerAnexo.onload = function(eventAnexo) {
			readerTermo.onload = function(eventTermo) {
				var base64StringAnexo = eventAnexo.target.result;
				var base64StringTermo = eventTermo.target.result;

				var objeto = {
					idEscolaTermoColaboracao: id,
					escolaId: Number(idEscola),
					coordenador: $('#coordenadorEdit').val(),
					dataValidade: dataValidadeAPI,
					anexo: 'null',
					termoColaboracao: 'null'
				};

				$.ajax({
					url: url_base + "/escolaTColaboracao",
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
						$("#escolaIdEdit").val('');
						$("#coordenadorEdit").val('');
						$("#dataValidadeEdit").val('');
						$("#anexoEdit").val('');
						$("#termoColaboracaoEdit").val('');
						mudarAnexo = false;
						mudarTermo = false;
						getDados();
						showPage(currentPage);
						updatePagination();
						Swal.fire({
							title: "Editado com sucesso",
							icon: "success",
						})
					});
			};

		};

		readerAnexo.readAsDataURL(fileAnexo);
		readerTermo.readAsDataURL(fileTermo);
	} else {
		var objeto = {
			idEscolaTermoColaboracao: id,
			escolaId: Number(idEscola),
			coordenador: $('#coordenadorEdit').val(),
			dataValidade: dataValidadeAPI,
			anexo: 'null',
			termoColaboracao: "null"
		};

		$.ajax({
			url: url_base + "/escolaTColaboracao",
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
				$("#escolaIdEdit").val('');
				$("#coordenadorEdit").val('');
				$("#dataValidadeEdit").val('');
				$("#anexoEdit").val('');
				$("#termoColaboracaoEdit").val('');
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
	var inputFileAnexo = document.getElementById('anexo');
	var inputFileTermo = document.getElementById('termoColaboracao');

	var fileAnexo = inputFileAnexo.files[0];
	var fileTermo = inputFileTermo.files[0];

	var readerAnexo = new FileReader();
	var readerTermo = new FileReader();

	var dataValidade = $('#dataValidade').val();
	var dataValidadeFormatada = new Date(dataValidade);
	var dataValidadeAPI = formatarDataParaAPI(dataValidadeFormatada);

	readerAnexo.onload = function(eventAnexo) {
		readerTermo.onload = function(eventTermo) {
			var base64StringAnexo = eventAnexo.target.result;
			var base64StringTermo = eventTermo.target.result;

			var objeto = {
				escolaId: Number(idEscola),
				coordenador: $('#coordenador').val(),
				dataValidade: dataValidadeAPI,
				anexo: 'null',
				termoColaboracao: 'null'
			};

			$.ajax({
				url: url_base + "/escolaTColaboracao",
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
					$("#escolaId").val('');
					$("#coordenador").val('');
					$("#dataValidade").val('');
					$("#anexo").val('');
					$("#termoColaboracao").val('');
					getDados();
					showPage(currentPage);
					updatePagination();
					Swal.fire({
						title: "Cadastrado com sucesso",
						icon: "success",
					})
				});
		};

	};

	readerAnexo.readAsDataURL(fileAnexo);
	readerTermo.readAsDataURL(fileTermo);

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
	$("#coordenador").val('');
	$("#dataValidade").val('');
	$("#anexo").val('');
	$("#termoColaboracao").val('');
}
