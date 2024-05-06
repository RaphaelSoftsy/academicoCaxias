var url_base = "http://10.40.110.2:8080/api-educacional";

const queryString = window.location.search;

const params = new URLSearchParams(queryString);

const path_base="http://localhost:8090/front-educacional-caxias/resources/menu";


window.addEventListener("load", function() {
	$("#menu").load(path_base+"/menu.html" );
    const loader = document.querySelector(".bg-loading");
    loader.parentElement.removeChild(loader);
    $(".bg-loading").addClass("none");
});


function getValorSelects() {
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
		url: url_base + '/formaOcupacaoPredio',
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
		url: url_base + '/orgaoPublico',
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
		url: url_base + '/zoneamento',
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
		url: url_base + '/categoriaEscolaPrivada',
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
		url: url_base + '/entidadeSuperior',
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
		url: url_base + '/localizacao',
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

function desativar(endpoint){
	$.ajax({
		url: url_base + `/${endpoint}/${id}/desativar`,
		type: "PUT",
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(e.responseJSON.message)
			alert(e.responseJSON.message)
		}
	})
		.done(function(data) {
			$('#edit-nome').val('');
			getDados();
			alert('Desativado com Sucesso!')
		})
	return false;
}

function ativar(endpoint){
	$.ajax({
		url: url_base + `/${endpoint}/${id}/ativar`,
		type: "PUT",
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(e.responseJSON.message)
			alert(e.responseJSON.message)
		}
	})
		.done(function(data) {
			$('#edit-nome').val('');
			getDados();
			alert('Ativado com Sucesso!')
		})
	return false;
}

function remover(endpoint){
	$.ajax({
		url: url_base + `/${endpoint}/${id}`,
		type: "DELETE",
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(e.responseJSON)
			alert('Falha na requisição.')
		}
	})
		.done(function(data) {
			getDados();
			showPage(currentPage);
			updatePagination();
			alert('Removido com Sucesso!')
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

$('#prev').click(function() {
	goToPage(currentPage - 1);
});

$('#next').click(function() {
	goToPage(currentPage + 1);
});

