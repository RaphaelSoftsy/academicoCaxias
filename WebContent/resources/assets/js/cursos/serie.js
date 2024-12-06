var dados = [];
var sortOrder = {};
var dadosOriginais = [];
var rows = 12;
var currentPage = 1;
var pagesToShow = 5;
var cursos = [];
var id = "";
var ativo = "";

$(document).ready(function () {
  $.ajax({
    url: url_base + "/cursos",
    type: "GET",
    async: false,
  })
    .done(function (data) {
      cursos = data;
      $.each(data, function (index, item) {
        $("#cursoIdEdit").append(
          $("<option>", {
            value: item.idCurso,
            text: item.nome,
            name: item.nome,
          })
        );
      });
      $.each(data, function (index, item) {
        $("#cursoId").append(
          $("<option>", {
            value: item.idCurso,
            text: item.nome,
            name: item.nome,
          })
        );
      });
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
    // Captura o valor da pesquisa e converte para minúsculas
    var searchInput = $(this).siblings(".searchInput").val().toLowerCase();
    var columnToSearch = $(this).closest(".sortable").data("column");
    var filteredData;

    // Filtragem para "cursoId"
    if (columnToSearch === "cursoId") {
      filteredData = dadosOriginais.filter(function (item) {
        var curso = cursos.find(function (course) {
          return course.idCurso === item.cursoId;
        });
        var nomeCurso = curso ? curso.nome.toLowerCase() : "";
        return nomeCurso.includes(searchInput);
      });
    } else {
      // Filtragem genérica para outros campos
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
      if (column === "cursoId") {
        var escolaA = cursos.find(function (school) {
          return school.idCurso === a.cursoId;
        });
        var escolaB = cursos.find(function (school) {
          return school.idCurso === b.cursoId;
        });
        var nomeA = escolaA ? escolaA.nome.toLowerCase() : "";
        var nomeB = escolaB ? escolaB.nome.toLowerCase() : "";
        if (order === "asc") {
          return nomeA.localeCompare(nomeB);
        } else {
          return nomeB.localeCompare(nomeA);
        }
      } else if (column === "serie") {
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
    url: url_base + "/cursoSerie",
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
      var curso = cursos.find(function (school) {
        return school.idCurso === item.cursoId;
      });

      if (item.ativo == "N") {
        ativo =
          '<i  style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não';
      } else {
        ativo =
          "<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim";
      }

      var nome = curso ? curso.nome : "Curso não encontrado";

      return (
        "<tr>" +
        "<td>" +
        nome +
        "</td>" +
        "<td>" +
        item.serie +
        "º série" +
        "</td>" +
        "<td>" +
        item.descricao +
        "</td>" +
        "<td>" +
        ativo +
        "</td>" +
        '<td class="d-flex justify-content-center"><span style="width: 80%; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-id="' +
        item.idCursoSerie +
        '" data-ativo="' +
        item.ativo +
        '"  onclick="showModal(this)" data-bs-toggle="modal" data-bs-target="#editItem"><i class="fa-solid fa-pen fa-lg"></i></span></td>' +
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

  XLSX.writeFile(livro, "cursosSerie.xlsx");
});

// Abrir modal

function showModal(ref) {
  id = ref.getAttribute("data-id");
  ativo = ref.getAttribute("data-ativo");

  if (ativo == "S") {
    $(".ativar").hide();
    $(".desativar").show();
  } else {
    $(".desativar").hide();
    $(".ativar").show();
  }

  $.ajax({
    url: url_base + "/cursoSerie/" + id,
    type: "GET",
    async: false,
    error: function (e) {
      console.log(e.responseJSON.message);
      alert(e.responseJSON.message);
    },
  }).done(function (data) {
    $("#cursoIdEdit").val(data.cursoId).attr("selected", true);
    $("#serieEdit").val(data.serie).attr("selected", true);
    $("#descricaoEdit").val(data.descricao);
  });
}

// Editar

function editar() {
  var objeto = {
    idCursoSerie: Number(id),
    cursoId: Number($("#cursoIdEdit").val()),
    serie: $("#serieEdit").val(),
    descricao: $("#descricaoEdit").val(),
  };

  $.ajax({
    url: url_base + "/cursoSerie",
    type: "PUT",
    data: JSON.stringify(objeto),
    contentType: "application/json; charset=utf-8",
    async: false,
    error: function (e) {
      console.log(e.responseJSON.message);
      alert(e.responseJSON.message);
    },
  }).done(function (data) {
    $("#cursoIdEdit").val("");
    $("#serieEdit").val();
    $("#descricaoEdit").val();

    getDados();
    showPage(currentPage);
    updatePagination();
    alert("Editado com Sucesso!");
  });
  return false;
}
$("#formEdit").on("submit", function (e) {
  e.preventDefault();
  editar();
  return false;
});

// Cadastrar

function cadastrar() {
  var objeto = {
    cursoId: Number($("#cursoId").val()),
    serie: $("#serie").val(),
    descricao: $("#descricao").val(),
  };

  $.ajax({
    url: url_base + "/cursoSerie",
    type: "POST",
    data: JSON.stringify(objeto),
    contentType: "application/json; charset=utf-8",
    async: false,
    error: function (e) {
      console.log(e.responseJSON.message);
      alert(e.responseJSON.message);
    },
  }).done(function (data) {
    $("#cursoId").val("");
    $("#serie").val();
    $("#descricao").val();
    getDados();
    showPage(currentPage);
    updatePagination();
    alert("Cadastrado com Sucesso!");
  });
  return false;
}

$("#formCadastro").on("submit", function (e) {
  e.preventDefault();
  cadastrar();
  return false;
});

// Limpa input

function limpaCampo() {
  $("#cursoId").val("");
  $("#serie").val();
  $("#descricao").val();
}
