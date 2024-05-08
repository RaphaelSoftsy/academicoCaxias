var dados = [];
var sortOrder = {};
var dadosOriginais = [];
var rows = 7;
var currentPage = 1;
var pagesToShow = 5;
const idConta = sessionStorage.getItem('idConta');

$(document).ready(function () {
  var anoEdit = document.getElementById("anoEdit");
  var ano = document.getElementById("ano");
  var anoAtual = new Date().getFullYear();

  var anosRetroativos = anoAtual - 2000;
  var anosFuturos = 10;

  var anoInicial = anoAtual + anosFuturos;
  var anoFinal = anoAtual - anosRetroativos;

  for (var i = anoInicial; i >= anoFinal; i--) {
    var option = document.createElement("option");
    option.value = i;
    option.text = i;
    ano.appendChild(option);
  }
  for (var i = anoInicial; i >= anoFinal; i--) {
    var option = document.createElement("option");
    option.value = i;
    option.text = i;
    anoEdit.appendChild(option);
  }

  $.ajax({
    url: url_base + "/dependenciaAdministrativa",
    type: "GET",
    async: false,
  })
    .done(function (data) {
      dependencias = data;
      $.each(data, function (index, item) {
        $("#dependenciaAdmIdEdit").append(
          $("<option>", {
            value: item.idDependenciaAdministrativa,
            text: item.dependenciaAdministrativa,
            name: item.dependenciaAdministrativa,
          })
        );
      });
      $.each(data, function (index, item) {
        $("#dependenciaAdmId").append(
          $("<option>", {
            value: item.idDependenciaAdministrativa,
            text: item.dependenciaAdministrativa,
            name: item.dependenciaAdministrativa,
          })
        );
      });
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Erro na solicitação AJAX:", jqXHR);
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

    if (columnToSearch === "dtInicio" || columnToSearch === "dtFim") {
      searchInput = searchInput.split("T")[0];
      filteredData = dadosOriginais.filter(function (item) {
        var itemDate = item[columnToSearch].split("T")[0];
        return itemDate.includes(searchInput);
      });
    } else if (columnToSearch === "dependenciaAdm") {
      filteredData = dadosOriginais.filter(function (item) {
        return item.dependenciaAdm.dependenciaAdministrativa
          .toLowerCase()
          .includes(searchInput);
      });
    } else {
      filteredData = dadosOriginais.filter(function (item) {
        return item[columnToSearch]
          .toString()
          .toLowerCase()
          .includes(searchInput);
      });
    }

    listarDados(filteredData);

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
    }

    sortOrder[column] = newOrder;
  });

  function sortData(column, order) {
    var dadosOrdenados = dadosOriginais.slice();

    dadosOrdenados.sort(function (a, b) {
      if (column === "dtInicio" || column === "dtFim") {
        var dateA = new Date(a[column]);
        var dateB = new Date(b[column]);

        if (order === "asc") {
          return dateA - dateB;
        } else {
          return dateB - dateA;
        }
      } else if (column === "dependenciaAdm") {
        var valueA = a.dependenciaAdm.dependenciaAdministrativa.toLowerCase();
        var valueB = b.dependenciaAdm.dependenciaAdministrativa.toLowerCase();
        if (order === "asc") {
          return valueA.localeCompare(valueB);
        } else {
          return valueB.localeCompare(valueA);
        }
      } else if (column === "ano" || column === "periodo") {
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
  }

  showPage(currentPage);
  updatePagination();
});

$("#limpa-filtros").click(function () {
  listarDados(dadosOriginais);
  $(".searchInput").val("");
});

function getDados() {
  $.ajax({
    url: url_base + "/periodoletivo",
    type: "GET",
    async: false,
  })
    .done(function (data) {
      dados = data;
      dadosOriginais = data;
      listarDados(data);
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Erro na solicitação AJAX:", jqXHR);
    });
}

function formatarDataParaBR(data) {
  var dataISO = data + "T00:00:00";
  var dataObj = new Date(dataISO);
  var dia = String(dataObj.getUTCDate()).padStart(2, "0");
  var mes = String(dataObj.getUTCMonth() + 1).padStart(2, "0");
  var ano = dataObj.getUTCFullYear();
  return dia + "/" + mes + "/" + ano;
}

function listarDados(dados) {
  var html = dados
    .map(function (item) {
      if (item.ativo == "N") {
        ativo =
          '<i  style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não';
      } else {
        ativo =
          "<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim";
      }
      return (
        "<tr>" +
        "<td>" +
        item.dependenciaAdm.dependenciaAdministrativa +
        "</td>" +
        "<td>" +
        item.ano +
        "</td>" +
        "<td>" +
        item.periodo +
        "</td>" +
        "<td>" +
        formatarDataParaBR(item.dtInicio) +
        "</td>" +
        "<td>" +
        formatarDataParaBR(item.dtFim) +
        "</td>" +
        "<td>" +
        ativo +
        "</td>" +
        '<td><span style=" margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-id="' +
        item.idPeriodoLetivo +
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

  XLSX.writeFile(livro, "periodoLetivo.xlsx");
});

function formatarDataParaAPI(data) {
  var year = data.getFullYear();
  var month = ("0" + (data.getMonth() + 1)).slice(-2);
  var day = ("0" + data.getDate()).slice(-2);

  var hora = "23:59:59";

  return year + "-" + month + "-" + day + "T" + hora;
}

// Abrir modal

function showModal(ref) {
  id = ref.getAttribute("data-id");

  $.ajax({
    url: url_base + "/periodoletivo/" + id,
    type: "GET",
    async: false,
    error: function (e) {
      console.log(e.responseJSON.message);
      alert(e.responseJSON.message);
    },
  }).done(function (data) {
    if (data.ativo == "S") {
      $(".ativar").hide();
      $(".desativar").show();
    } else {
      $(".desativar").hide();
      $(".ativar").show();
    }
    $("#dependenciaAdmIdEdit")
      .val(data.dependenciaAdm.idDependenciaAdministrativa)
      .attr("selected", true);
    $("#anoEdit").val(data.ano);
    $("#periodoEdit").val(data.periodo);
    $("#dtInicioEdit").val(data.dtInicio);
    $("#dtFimEdit").val(data.dtFim);
    $("#descricaoEdit").val(data.descricao);
    $("#tipoPeriodicidadeEdit")
      .val(data.tipoPeriodicidade)
      .attr("selected", true);
  });
}

// Editar

function editar() {
  var objeto = {
    idPeriodoLetivo: id,
    idConta: idConta,
    ano: $("#anoEdit").val(),
    periodo: $("#periodoEdit").val(),
    dtInicio: $("#dtInicioEdit").val(),
    dtFim: $("#dtFimEdit").val(),
    descricao: $("#descricaoEdit").val(),
    tipoPeriodicidade: $("#tipoPeriodicidadeEdit").val(),
  };

  $.ajax({
    url: url_base + "/periodoletivo",
    type: "PUT",
    data: JSON.stringify(objeto),
    contentType: "application/json; charset=utf-8",
    async: false,
    error: function (e) {
      console.log(e.responseJSON);
      alert(e.responseJSON.message);
    },
  }).done(function (data) {
    $("#dependenciaAdmIdEdit").val("");
    $("#descricaoEdit").val("");
    $("#anoEdit").val("");
    $("#periodoEdit").val("");
    $("#dtInicioEdit").val("");
    $("#dtFimEdit").val("");
    $("#tipoPeriodicidadeEdit").val("");
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
    dependenciaAdmId: Number($("#dependenciaAdmId").val()),
    idConta: idConta,
    ano: $("#ano").val(),
    periodo: $("#periodo").val(),
    dtInicio: $("#dtInicio").val(),
    dtFim: $("#dtFim").val(),
    descricao: $("#descricao").val(),
    tipoPeriodicidade: $("#tipoPeriodicidade").val(),
  };

  $.ajax({
    url: url_base + "/periodoletivo",
    type: "POST",
    data: JSON.stringify(objeto),
    contentType: "application/json; charset=utf-8",
    async: false,
    error: function (e) {
      console.log(e.responseJSON);
      alert(e.responseJSON.message);
    },
  }).done(function (data) {
    $("#dependenciaAdmId").val("");
    $("#descricao").val("");
    $("#ano").val("");
    $("#periodo").val("");
    $("#dtInicio").val("");
    $("#dtFim").val("");
    $("#tipoPeriodicidade").val("");
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
  $("#dependenciaAdmId").val("");
  $("#descricao").val("");
  $("#ano").val("");
  $("#periodo").val("");
  $("#dtInicio").val("");
  $("#dtFim").val("");
  $("#tipoPeriodicidade").val("");
}
