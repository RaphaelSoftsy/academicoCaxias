var dados = [];
var sortOrder = {};
var dadosOriginais = [];
const contaId = localStorage.getItem('contaId');
var rows = 8;
var currentPage = 1;
var pagesToShow = 5;

$(document).ready(function () {
    getDados();

    // Dropdown de Pesquisa
    $('.dropdown-toggle-form').click(function () {
        $(this).siblings('.dropdown-content-form').toggleClass('show');
    });

    $('.searchButton').click(function () {
        var searchInput = $(this).siblings('.searchInput').val().toLowerCase();
        var columnToSearch = $(this).closest('.sortable').data('column');
        var filteredData = dadosOriginais.filter(function (item) {
            return item[columnToSearch].toLowerCase().includes(searchInput);
        });

        listarDados(filteredData);
        $('input[data-toggle="toggle"]').bootstrapToggle();
        $(this).siblings('.searchInput').val('');
        $(this).closest('.dropdown-content-form').removeClass('show');
    });

    $(document).click(function (event) {
        if (!$(event.target).closest('.dropdown-form').length) {
            $('.dropdown-content-form').removeClass('show');
        }
    });

    $("#inputBusca").on("keyup input", function () {
        var valorBusca = $(this).val().toLowerCase();
        realizarBusca(valorBusca);
    });

    function realizarBusca(valorInput) {
        if (valorInput === '') {
            showPage(currentPage);
        } else {
            $("#cola-tabela tr").hide().filter(function () {
                return $(this).text().toLowerCase().indexOf(valorInput) > -1;
            }).show();
        }
    }

    $(document).on('click', '.sortable .col', function () {
        var column = $(this).closest('th').data("column");
        var currentOrder = sortOrder[column] || 'vazio';
        var newOrder = currentOrder === 'vazio' ? 'asc' : currentOrder === 'asc' ? 'desc' : 'vazio';

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
            $('input[data-toggle="toggle"]').bootstrapToggle();
        }

        sortOrder[column] = newOrder;
    });

    showPage(currentPage);
    updatePagination();
});

$('#limpa-filtros').click(function () {
    listarDados(dadosOriginais);
    $('input[data-toggle="toggle"]').bootstrapToggle();
    $('.searchInput').val('');
});

function getDados() {
    const usuarioId = sessionStorage.getItem("usuarioId");
    $.ajax({
        url: `${url_base}/escolas/usuario/${contaId}/${usuarioId}`,
        type: "GET",
        async: false,
    })
        .done(function (data) {
            dados = data;
            dadosOriginais = data;
            showPage(1);
            $('input[data-toggle="toggle"]').bootstrapToggle();
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
        });
}

function listarDados(dados) {
    var html = dados.map(function (item) {
        var ativo = item.ativo === 'N'
            ? '<i style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não'
            : "<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim";

        return `
            <tr>
                <td class="d-flex justify-content-center">
                    <span class="btn btn-warning btn-sm" data-id="${item.idEscola}" data-nome="${item.nomeEscola}" data-logo="${item.logoEscola}" onclick="acessar(this)">
                        <i class="fa-solid fa-right-to-bracket fa-lg"></i>
                    </span>
                </td>
                <td>${item.nomeEscola}</td>
                <td>${item.municipio}</td>
                <td>${item.uf}</td>
                <td>${item.codigoInep}</td>
                <td>
                    <input type="checkbox" data-id="${item.idEscola}" data-status="${item.ativo}" onChange="alteraStatus(this)"
                        ${item.ativo === "S" ? "checked" : ""}
                        data-toggle="toggle" data-onstyle="success" data-offstyle="danger" data-on="Sim" data-off="Não" class="checkbox-toggle">
                </td>
                <td>
                    <span class="btn btn-warning btn-sm" data-id="${item.idEscola}" onclick="editar(this)">
                        <i class="fa-solid fa-pen fa-lg"></i>
                    </span>
                </td>
            </tr>`;
    }).join("");

    $("#cola-tabela").html(html);
}



function sortData(column, order) {
    var dadosOrdenados = dadosOriginais.slice();
    dadosOrdenados.sort(function (a, b) {
        var valueA = a[column].toLowerCase();
        var valueB = b[column].toLowerCase();
        return order === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    });

    listarDados(dadosOrdenados);
    $('input[data-toggle="toggle"]').bootstrapToggle();
}

function acessar(element) {
    var id = $(element).data('id');
    var nome = $(element).data('nome');
    var logo = $(element).data('logo');

    sessionStorage.setItem('perfil', JSON.stringify({ perfil: 'escola', id, nome, logo }));
    sessionStorage.setItem('escolaId', id);
    window.location.href = 'acessar-escolas';
}
