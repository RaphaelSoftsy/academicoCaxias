
var url_base = "http://10.40.110.2:8080/api-educacional-dev";

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const path_base = $(location).attr("origin") + "/" + $(location).attr("pathname").split("/")[1] + "/resources/menu";
const nomeConta = localStorage.getItem("nomeConta")
const usuarioId = localStorage.getItem("usuarioId");

$('#escolaIdStyle').css('display', 'none')
$('#escolaIdStyleEdit').css('display', 'none')
$(document).ready(function() {
	sessionStorage.setItem('nomeConta', nomeConta)
	sessionStorage.setItem('usuarioId', usuarioId)

	/*// Função para adicionar ou atualizar um segmento na URL
	function atualizarSegmentoURL(novoSegmento) {
		var parametro = 'id=' + novoSegmento;
		var novaUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + parametro;
		history.pushState({ path: novaUrl }, '', novaUrl);
	}
	*/
	containerResponsivo();

	$(".desativar").toggleClass("btn-secondary btn-danger")
	$(".ativar").toggleClass("btn-secondary btn-success")



	const url = window.location.pathname
	if (url.includes('login') == false && url.includes('cadastroConta') == false) {
		const contaId = localStorage.getItem('contaId')
		sessionStorage.setItem('contaId', contaId)

		const transacao = "/" + $(location).attr('href').split("/")[$(location).attr('href').split("/").length - 1];
		console.log(transacao);
		$.ajax({
			url: url_base + `/transacoes/acessos/${usuarioId}?url=${transacao}`,
			type: "get",
			error: function(e) {
				console.log(e);
				if (e.responseText == "Nenhum acesso encontrado para o usuário ou transação informado.") {
					console.log(e.responseText)
					console.log(url)
				}
			}
		}).then(data => {
			console.log(data)
			console.log(data[0])
			if (data[0].acessa == 'N') {
				Swal.fire({
					title: "Acesso não autorizado.",
					icon: "info",
				}).then(result => {
					if (result) {
						window.location.href = "acessar-escolas"
					}
				})
			}

			if (data[0].altera == 'N') {
				$('.edit-val').css('cursor', 'pointer').attr('disabled', true);
				$('.checkbox-toggle').css('cursor', 'pointer').attr('disabled', true);
				$('.edit-val').wrap('<div class="box-edit-val" title="Seu usuário não tem autorização"></div>');
				$('.checkbox-toggle').wrap('<div class="box-edit-val" onclick="notAccess()" title="Seu usuário não tem autorização"></div>');
				
				$('.toggle-group').click(() => notAccess())
				
				$('span:has(i.fa-pen)').each(function() {
					var $span = $(this);

					var $button = $('<button>', {
						html: $span.html(),
						class: $span.attr('class') + ' edit-table',
						id: $span.attr('id'),
						style: $span.attr('style')
					});

					$.each($span.data(), function(name, value) {
						$button.attr('data-' + name, value);
					});

					$button.on('click', function() {
						$span.trigger('click');
					});

					$span.replaceWith($button);
				});

				$('.edit-table').css('width', '100%').attr('disabled', true);
				$('.edit-table').wrap('<div class="box-edit-val" style="width:50%; display: flex; align-items:center; justify-content:center" title="Seu usuário não tem autorização"></div>');

				// Inicializar tooltips
				var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
				var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
					return new bootstrap.Tooltip(tooltipTriggerEl);
				});
			}
		})

		if (isNaN(contaId) || contaId == 0 || contaId == "" || contaId == undefined) {
			Swal.fire({
				title: "Nenhum usuário localizado, logue novamente",
				icon: "info",
			}).then(result => {
				if (result) {
					window.location.href = "login"
				}
			})
		}
	}
	console.log(url)
	const perfilEscola = sessionStorage.getItem("perfil")
	if (window.location.href.indexOf("escola") > -1 && !(window.location.toString().includes("acessar")) && !(window.location.toString().includes("nova-escola")) && !(window.location.toString().includes("editar-escola"))) {

		if (perfilEscola == undefined || perfilEscola == null) {
			Swal.fire({
				title: "Nenhum escola localizada, selecione uma escola",
				icon: "info",
			}).then(result => {
				if (result) {
					window.location.href = "acessar-escolas"
				}
			})
		}
	}
})

var str = localStorage.getItem('nomeConta').toLowerCase();
str = str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
	return letter.toUpperCase();
});

const notAccess = () => {
	Swal.fire({
		title: "Seu usuário não tem permissão para essa ação",
		icon: "info",
	}).then(result => {
		if (result) {
		}
	})
}

window.addEventListener("load", function() {
	$("#menu").load(path_base + "/menu.html");
	const loader = document.querySelector(".bg-loading");
	loader.parentElement.removeChild(loader);
	$(".bg-loading").addClass("none");
	$(".bg-loading").fadeOut();

});


function getValorSelects() {
	const contaId = localStorage.getItem('contaId')
	$.ajax({
		url: url_base + '/dependenciaAdministrativa',
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#dependenciaAdmId').append($('<option>', {
				value: item.idDependenciaAdministrativa,
				text: item.dependenciaAdministrativa,
				name: item.dependenciaAdministrativa
			}));
		});
	})

	$.ajax({
		url: url_base + '/situacaoFuncionamento',
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#situacaoFuncionamentoId').append($('<option>', {
				value: item.idSituacaoFuncionamento,
				text: item.situacaoFuncionamento,
				name: item.situacaoFuncionamento
			}));
		});
	})

	$.ajax({
		url: url_base + `/formaOcupacaoPredio/conta/${contaId}`,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#formaOcupacaoPredioId').append($('<option>', {
				value: item.idFormaOcupacaoPredio,
				text: item.formaOcupacaoPredio,
				name: item.formaOcupacaoPredio
			}));
		});
	})

	$.ajax({
		url: url_base + `/orgaoPublico/conta/${contaId}`,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#orgaoPublicoId').append($('<option>', {
				value: item.idOrgaoPublico,
				text: item.orgaoPublico,
				name: item.orgaoPublico
			}));
		});
	})
	$.ajax({
		url: url_base + `/zoneamento/conta/${contaId}`,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#zoneamentoId').append($('<option>', {
				value: item.idZoneamento,
				text: item.zoneamento,
				name: item.zoneamento
			}));
		});
	})
	$.ajax({
		url: url_base + `/categoriaEscolaPrivada/conta/${contaId}`,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#categoriaEscolaPrivadaId').append($('<option>', {
				value: item.idCategoriaEscolaPrivada,
				text: item.categoriaEscolaPrivada,
				name: item.categoriaEscolaPrivada
			}));
		});
	})
	$.ajax({
		url: url_base + `/entidadeSuperior/conta/${contaId}`,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#entidadeSuperiorId').append($('<option>', {
				value: item.idEntidadeSuperior,
				text: item.entidadeSuperior,
				name: item.entidadeSuperior
			}));
		});
	})

	$.ajax({
		url: url_base + `/localizacao/conta/${contaId}`,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#localizacaoId').append($('<option>', {
				value: item.idLocalizacao,
				text: item.localizacao,
				name: item.localizacao
			}));
		});
	})
}


function getSearchParams(k) {
	var p = {};
	location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(s, key, value) {
		p[key] = value;
	});
	return k ? p[k] : p;
}

function desativar(endpoint) {
	$.ajax({
		url: url_base + `/${endpoint}/${id}/desativar`,
		type: "PUT",
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
			$('#edit-nome').val('');
			getDados();
			Swal.fire({
				title: "Desativado com sucesso",
				icon: "success",
			})
		})
	return false;
}

function ativar(endpoint) {
	$.ajax({
		url: url_base + `/${endpoint}/${id}/ativar`,
		type: "PUT",
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
			$('#edit-nome').val('');
			getDados();
			Swal.fire({
				title: "Ativado com sucesso",
				icon: "success",
			})
		})
	return false;
}

function remover(endpoint) {
	$.ajax({
		url: url_base + `/${endpoint}/${id}`,
		type: "DELETE",
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(e.responseJSON)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Falha na requisição"
			});
		}
	})
		.done(function(data) {
			getDados();
			showPage(currentPage);
			updatePagination();
			Swal.fire({
				title: "Removido com sucesso!",
				icon: "success",
			})
		})
	return false;
}

function showPage(page) {
	var start = (page - 1) * rows;
	var end = start + rows;

	$('#cola-tabela tr').hide();
	$('#cola-tabela tr').slice(start, end).show();
}

function toggleNavigation() {
	var totalRows = $('#cola-tabela tr').length;
	var totalPages = Math.ceil(totalRows / rows);

	$('#prev').prop('disabled', currentPage === 1);
	$('#next').prop('disabled', currentPage === totalPages);

	$('#pagination').toggle(totalRows > 0);

	$('#page-numbers').empty();

	if (totalRows > 0) {
		var startPage = Math.max(1, Math.min(currentPage - Math.floor(pagesToShow / 2), totalPages - pagesToShow + 1));
		var endPage = Math.min(totalPages, startPage + pagesToShow - 1);

		if (startPage > 1) {
			$('#page-numbers').append('<button class="btn btn-sm btn-page" data-page="1">1</button>');
			if (startPage > 2) {
				$('#page-numbers').append('<span>...</span>');
			}
		}

		for (var i = startPage; i <= endPage; i++) {
			var btnClass = (i === currentPage) ? 'btn btn-sm btn-page active-page' : 'btn btn-sm btn-page';
			$('#page-numbers').append('<button class="' + btnClass + '" data-page="' + i + '">' + i + '</button>');
		}

		if (endPage < totalPages) {
			if (endPage < totalPages - 1) {
				$('#page-numbers').append('<span>...</span>');
			}
			$('#page-numbers').append('<button class="btn btn-sm btn-page" data-page="' + totalPages + '">' + totalPages + '</button>');
		}

		$('.btn-page').click(function() {
			goToPage(parseInt($(this).data('page')));

		});
	}
}


function updatePagination() {
	toggleNavigation();
}

function goToPage(page) {
	if (page >= 1 && page <= Math.ceil($('#cola-tabela tr').length / rows)) {
		currentPage = page;
		showPage(currentPage);
		updatePagination();

	}
}

function containerResponsivo() {
	let container = $('<div>')
	container.addClass('container-table')
	container.append($('.table'))
	$('#pagination').before(container)
}



$('#prev').click(function() {
	goToPage(currentPage - 1);
});

$('#next').click(function() {
	goToPage(currentPage + 1);
});


