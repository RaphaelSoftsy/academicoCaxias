var dados = []; 
const contaId = localStorage.getItem('contaId');
var rows = 12; // Número de linhas por página
var currentPage = 1;
var pagesToShow = 5; // Quantidade de botões de página para exibir

$(document).ready(function () {
    getDados();

    // Evento de busca
    $("#inputBusca").on("input", function () {
        var valorBusca = $(this).val().toLowerCase();
        realizarBusca(valorBusca);
    });

    $('.checkbox-toggle').each(function () {
        var status = $(this).data('status');
        if (status !== 'S') {
            $(this).prop('checked', false);
        }
    });

    showPage(currentPage);
    updatePagination();

    // Eventos dos botões de navegação
    $('#prev').click(function () {
        goToPage(currentPage - 1);
    });

    $('#next').click(function () {
        goToPage(currentPage + 1);
    });
});

// Exibe a página atual
function showPage(page) {
    var start = (page - 1) * rows;
    var end = start + rows;
    $('#cola-tabela tr').hide().slice(start, end).show();
}

// Controla a navegação e a exibição dos botões de página
function toggleNavigation() {
    var totalRows = $('#cola-tabela tr').length;
    var totalPages = Math.ceil(totalRows / rows);

    $('#prev').prop('disabled', currentPage === 1);
    $('#next').prop('disabled', currentPage === totalPages);

    $('#page-numbers').empty();

    // Botão da primeira página
    $('#page-numbers').append(createPageButton(1));

    var startPage = Math.max(2, Math.min(currentPage - Math.floor(pagesToShow / 2), totalPages - pagesToShow + 2));
    var endPage = Math.min(totalPages - 1, startPage + pagesToShow - 3);

    for (var i = startPage; i <= endPage; i++) {
        $('#page-numbers').append(createPageButton(i));
    }

    // Botão da última página
    if (totalPages > 1) {
        $('#page-numbers').append(createPageButton(totalPages));
    }

    $('.btn-page').click(function () {
        goToPage(parseInt($(this).data('page')));
    });
}

// Cria um botão de página
function createPageButton(page) {
    var btnClass = (page === currentPage) ? 'btn btn-sm btn-page active-page' : 'btn btn-sm btn-page';
    return `<button class="${btnClass}" data-page="${page}">${page}</button>`;
}

// Atualiza a paginação
function updatePagination() {
    toggleNavigation();
}

// Navega para uma página específica
function goToPage(page) {
    var totalPages = Math.ceil($('#cola-tabela tr').length / rows);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        showPage(currentPage);
        updatePagination();
    }
}

// Busca dinâmica
function realizarBusca(valorInput) {
    if (valorInput === '') {
        showPage(currentPage);
    } else {
        $("#cola-tabela tr").hide().filter(function () {
            return $(this).text().toLowerCase().indexOf(valorInput) > -1;
        }).show();
    }
}

// Carrega os dados via AJAX
function getDados() {
    $.ajax({
        url: url_base + `/escolas/conta/${contaId}`,
        type: "GET",
        async: false,
    })
        .done(function (data) {
            listarDados(data);
            $('input[data-toggle="toggle"]').bootstrapToggle();
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
        });
}

// Lista os dados recebidos
function listarDados(dados) {
    var html = dados.map(function (item) {
        var ativo = item.ativo === 'N' 
            ? '<i style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não' 
            : '<i style="color:#2eaa3a" class="fa-solid iconeTabela fa-circle-check"></i> Sim';

        return `
            <tr>
                <td>${item.nomeEscola}</td>
                <td>${item.municipio}</td>
                <td>${item.uf}</td>
                <td>${item.cnpj}</td>
                <td>
                    <input type="checkbox" data-status="${item.ativo}" data-id="${item.idEscola}" 
                        onChange="alteraStatus(this)" checked data-toggle="toggle" 
                        data-onstyle="success" data-offstyle="danger" data-width="63" 
                        class="checkbox-toggle" data-size="sm">
                </td>
                <td class="d-flex">
                    <span class="btn btn-warning btn-sm" data-id="${item.idEscola}" 
                        onclick="editar(this)" style="width: 63px; margin-right: 5px; 
                        height: 31px; padding: 8px; display: flex; align-items: center; 
                        justify-content: center;">
                        <i class="fa-solid fa-pen fa-lg"></i>
                    </span>
                </td>
            </tr>`;
    }).join("");

    $("#cola-tabela").html(html);
}

// Altera o status de uma escola
function alteraStatus(element) {
    var id = element.getAttribute("data-id");
    var status = element.getAttribute("data-status");
    var novoStatus = (status === "S") ? "N" : "S";
    element.setAttribute("data-status", novoStatus);

    $(element).bootstrapToggle(novoStatus === "S" ? 'on' : 'off');

    $.ajax({
        url: url_base + `/escola/${id}${novoStatus === "S" ? '/ativar' : '/desativar'}`,
        type: "PUT",
        success: function () {
            console.log(`Status da escola com ID ${id} atualizado para ${novoStatus}`);
        },
        error: function (e) {
            console.error("Erro ao atualizar o status:", e.responseJSON);
            Swal.fire({
                icon: "error",
                title: e.responseJSON.message
            });

            var revertStatus = (novoStatus === "S") ? "N" : "S";
            element.setAttribute("data-status", revertStatus);
            $(element).bootstrapToggle(revertStatus === "S" ? 'on' : 'off');
        }
    });
}

// Redireciona para a página de edição
function editar(ref) {
    var id = ref.getAttribute("data-id");
    window.location.href = "editar-escola?id=" + id;
}
