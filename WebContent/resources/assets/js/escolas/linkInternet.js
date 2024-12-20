var dados = [];
var sortOrder = {};
var dadosOriginais = [];
var rows = 12;
var currentPage = 1;
var pagesToShow = 5;
var escolas = [];
const contaId = Number(localStorage.getItem("contaId"));
var idEscola = localStorage.getItem("escolaId");
var pefilEscola = localStorage.getItem("perfil");
var escola = JSON.parse(pefilEscola);
var nomeEscola = escola.nome;

$(document).ready(function () {
  $.ajax({
    url: url_base + `/escolas/conta/${contaId}`,
    type: "GET",
    async: false,
  })
    .done(function (data) {
      escolas = data;
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
    });
  getDados();

  // Dropdown de Pesquisa
  $(".dropdown-toggle-form").click(function () {
    $(this).siblings(".dropdown-content-form").toggleClass("show");
  });

  $(".searchButton").click(function () {
    var searchInput = $(this).siblings(".searchInput").val().toLowerCase();
    var columnToSearch = $(this).closest(".sortable").data("column");
    var filteredData;

    // Filtragem para "provedorInternet"
    if (columnToSearch === "provedorInternet") {
      filteredData = dadosOriginais.filter(function (item) {
        return item.provedorInternet.provedorInternet
          .toLowerCase()
          .includes(searchInput);
      });
    }
    // Filtragem para "escolaId"
    else if (columnToSearch === "escolaId") {
      filteredData = dadosOriginais.filter(function (item) {
        var escola = escolas.find(function (school) {
          return school.idEscola === item.escolaId;
        });
        var nomeEscola = escola ? escola.nomeEscola.toLowerCase() : "";
        return nomeEscola.includes(searchInput);
      });
    }
    // Filtragem genérica para outros campos
    else {
      filteredData = dadosOriginais.filter(function (item) {
        var columnValue = item[columnToSearch]
          ? item[columnToSearch].toString().toLowerCase()
          : "";
        return columnValue.includes(searchInput);
      });
    }

    listarDados(filteredData);

    // Inicializa o toggle, chamando apenas uma vez
    $('input[data-toggle="toggle"]').bootstrapToggle();

    // Limpa o campo de pesquisa e fecha o dropdown
    $(this).siblings(".searchInput").val("");
    $(this).closest(".dropdown-content-form").removeClass("show");
  });

  $(document).on("click", ".sortable .col", function () {
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

    dadosOrdenados.sort(function (a, b) {
      if (column === "provedorInternet") {
        var valueA = a.provedorInternet.provedorInternet.toLowerCase();
        var valueB = b.provedorInternet.provedorInternet.toLowerCase();
        if (order === "asc") {
          return valueA.localeCompare(valueB);
        } else {
          return valueB.localeCompare(valueA);
        }
      } else if (column === "escolaId") {
        var escolaA = escolas.find(function (school) {
          return school.idEscola === a.escolaId;
        });
        var escolaB = escolas.find(function (school) {
          return school.idEscola === b.escolaId;
        });
        var nomeEscolaA = escolaA ? escolaA.nomeEscola.toLowerCase() : "";
        var nomeEscolaB = escolaB ? escolaB.nomeEscola.toLowerCase() : "";
        if (order === "asc") {
          return nomeEscolaA.localeCompare(nomeEscolaB);
        } else {
          return nomeEscolaB.localeCompare(nomeEscolaA);
        }
      } else if (column === "velocidadeMb") {
        var valueA = parseFloat(a[column]);
        var valueB = parseFloat(b[column]);
        if (order === "asc") {
          return valueA - valueB;
        } else {
          return valueB - valueA;
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

$("#limpa-filtros").click(function () {
  currentPage = 1;
  dados = [...dadosOriginais];

  updatePagination();
  showPage(currentPage);

  $(".searchInput").val("");
  $('input[data-toggle="toggle"]').bootstrapToggle();
});

function getDados() {
  $.ajax({
    url: url_base + "/escolaLinkInternet",
    type: "GET",
    async: false,
  })
    .done(function (data) {
      dados = data;
      dadosOriginais = data;
      listarDados(data);
      $('input[data-toggle="toggle"]').bootstrapToggle();
      $('input[data-toggle="toggle"]').bootstrapToggle();
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
    });
}

function listarDados(dados) {
  var html = dados
    .map(function (item) {
      var ativo;
      var administrativo;
      var estudante;

      var escola = escolas.find(function (school) {
        return school.idEscola === item.escolaId;
      });

      var nomeEscola = escola ? escola.nomeEscola : "Escola não encontrada";

      if (item.ativo == "N") {
        ativo =
          '<i  style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não';
      } else {
        ativo =
          "<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim";
      }

      if (item.administrativo == "N") {
        administrativo =
          '<i  style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não';
      } else {
        administrativo =
          "<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim";
      }

      if (item.estudante == "N") {
        estudante =
          '<i  style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não';
      } else {
        estudante =
          "<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim";
      }

      return (
        "<tr>" +
        "<td>" +
        nomeEscola +
        "</td>" +
        "<td>" +
        item.provedorInternet.provedorInternet +
        "</td>" +
        "<td>" +
        item.velocidadeMb +
        " MEGA" +
        "</td>" +
        "<td><div class='d-flex align-items-center gap-1'>" +
        administrativo +
        "</div></td>" +
        "<td><div class='d-flex align-items-center gap-1'>" +
        estudante +
        "</div></td>" +
        "<td><div class='d-flex align-items-center gap-1'>" +
        ativo +
        "</div></td>" +
        '<td class="d-flex justify-content-center"><span style="width: 80%; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-id="' +
        item.escolaId +
        '" onclick="editar(this)"><i class="fa-solid fa-pen fa-lg"></i></span></td>' +
        "</tr>"
      );
    })
    .join("");

  $("#cola-tabela").html(html);
}

// Exportar Dados

$("#exportar-excel").click(function () {
  var planilha = XLSX.utils.json_to_sheet(dados);

  var livro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(livro, planilha, "Planilha1");

  XLSX.writeFile(livro, "dadosInternet.xlsx");
});

// Editar

function editar(element) {
  var id = $(element).data("id");

  window.location.href = "edicao-link-internet?id=" + id;
}
