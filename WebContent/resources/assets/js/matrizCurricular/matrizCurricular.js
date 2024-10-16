/*var dados = [];
var sortOrder = {};
var dadosOriginais = [];
var rows = 12;
var currentPage = 1;
var pagesToShow = 5;
var escolas = [];
var id = "";
var idEscola = "";
var ativo = "";

$(document).ready(function () {
  $.ajax({
    url: url_base + "/escolas",
    type: "GET",
    async: false,
  })
    .done(function (data) {
      escolas = data;
      $.each(data, function (index, item) {
        $("#escolaIdEdit").append(
          $("<option>", {
            value: item.idEscola,
            text: item.nomeEscola,
            name: item.nomeEscola,
          })
        );
      });
      $.each(data, function (index, item) {
        $("#escolaId").append(
          $("<option>", {
            value: item.idEscola,
            text: item.nomeEscola,
            name: item.nomeEscola,
          })
        );
      });
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
    });

  $.ajax({
    url: url_base + "/dependenciaAdministrativa",
    type: "get",
    async: false,
  }).done(function (data) {
    $.each(data, function (index, item) {
      $("#dependenciaAdmId").append(
        $("<option>", {
          value: item.idDependenciaAdministrativa,
          text: item.dependenciaAdministrativa,
          name: item.dependenciaAdministrativa,
        })
      );
    });
	$.each(data, function (index, item) {
		$("#dependenciaAdmIdEdit").append(
		  $("<option>", {
			value: item.idDependenciaAdministrativa,
			text: item.dependenciaAdministrativa,
			name: item.dependenciaAdministrativa,
		  })
		);
	  });
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

    if (columnToSearch === "dependenciaAdm") {
      filteredData = dadosOriginais.filter(function (item) {
        return item.dependenciaAdm.dependenciaAdministrativa
          .toLowerCase()
          .includes(searchInput);
      });
    } else if (columnToSearch === "escolaId") {
      filteredData = dadosOriginais.filter(function (item) {
        var escola = escolas.find(function (school) {
          return school.idEscola === item.escolaId;
        });
        var nomeEscola = escola ? escola.nomeEscola.toLowerCase() : "";
        return nomeEscola.includes(searchInput);
      });
    } else {
      filteredData = dadosOriginais.filter(function (item) {
        return item[columnToSearch]
          .toString()
          .toLowerCase()
          .includes(searchInput);
      });
    }

    listarDados(filteredData);  $('input[data-toggle="toggle"]').bootstrapToggle();$('input[data-toggle="toggle"]').bootstrapToggle();

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
      listarDados(dadosOriginais);  $('input[data-toggle="toggle"]').bootstrapToggle();$('input[data-toggle="toggle"]').bootstrapToggle();
    }

    sortOrder[column] = newOrder;
  });

  function sortData(column, order) {
    var dadosOrdenados = dadosOriginais.slice();

    dadosOrdenados.sort(function (a, b) {
      if (column === "dependenciaAdm") {
        var valueA = a.dependenciaAdm.dependenciaAdministrativa.toLowerCase();
        var valueB = b.dependenciaAdm.dependenciaAdministrativa.toLowerCase();
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
    listarDados(dadosOrdenados); $('input[data-toggle="toggle"]').bootstrapToggle();$('input[data-toggle="toggle"]').bootstrapToggle();
  }

  showPage(currentPage);
  updatePagination();
});

$("#limpa-filtros").click(function () {
  listarDados(dadosOriginais);  $('input[data-toggle="toggle"]').bootstrapToggle();$('input[data-toggle="toggle"]').bootstrapToggle();
  $(".searchInput").val("");
});

function getDados() {
  $.ajax({
    url: url_base + "/cursos",
    type: "GET",
    async: false,
  })
    .done(function (data) {
      dados = data;
      dadosOriginais = data;
      listarDados(data);  $('input[data-toggle="toggle"]').bootstrapToggle();$('input[data-toggle="toggle"]').bootstrapToggle();
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
    });
}

function listarDados(dados) {
  var html = dados
    .map(function (item) {
      var escola = escolas.find(function (school) {
        return school.idEscola === item.escolaId;
      });

      if (item.ativo == "N") {
        ativo =
          '<i  style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não';
      } else {
        ativo =
          "<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim";
      }

      var nomeEscola = escola ? escola.nomeEscola : "Escola não encontrada";

      return (
        "<tr>" +
        "<td>" +
        nomeEscola +
        "</td>" +
        "<td>" +
        item.codCurso +
        "</td>" +
        "<td>" +
        item.nome +
        "</td>" +
        "<td>" +
        item.codCursoInpe +
        "</td>" +
        "<td>" +
        item.dependenciaAdm.dependenciaAdministrativa +
        "</td>" +
        "<td>" +
        ativo +
        "</td>" +
        '<td class="d-flex justify-content-center"><span style="width: 80%; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-idEscola="' +
        item.escolaId +
        '" data-id="' +
        item.idCurso +
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

  XLSX.writeFile(livro, "cursos.xlsx");
});

// Abrir modal

function showModal(ref) {
  id = ref.getAttribute("data-id");
  idEscola = ref.getAttribute("data-idEscola");
  ativo = ref.getAttribute("data-ativo");

  $("#escolaIdEdit").val(idEscola).attr("selected", true);
  if (ativo == "S") {
    $(".ativar").hide();
    $(".desativar").show();
  } else {
    $(".desativar").hide();
    $(".ativar").show();
  }

  $.ajax({
    url: url_base + "/cursos/escola/" + idEscola,
    type: "GET",
    async: false,
    error: function (e) {
      console.log(e.responseJSON.message);
      alert(e.responseJSON.message);
    },
  }).done(function (data) {
    var curso = data.find(function (item) {
      return item.idCurso == id;
    });
    $("#dependenciaAdmIdEdit")
      .val(curso.dependenciaAdm.idDependenciaAdministrativa)
      .attr("selected", true);
    $("#codCursoEdit").val(curso.codCurso);
    $("#nomeEdit").val(curso.nome);
    $("#codCursoInpeEdit").val(curso.codCursoInpe);
  });
}

// Editar

function editar() {
  var objeto = {
    idCurso: Number(id),
    escolaId: Number($("#escolaIdEdit").val()),
    dependenciaAdmId: Number($("#dependenciaAdmIdEdit").val()),
    codCurso: $("#codCursoEdit").val(),
    nome: $("#nomeEdit").val(),
    codCursoInpe: $("#codCursoInpeEdit").val(),
  };

  $.ajax({
    url: url_base + "/cursos",
    type: "PUT",
    data: JSON.stringify(objeto),
    contentType: "application/json; charset=utf-8",
    async: false,
    error: function (e) {
      console.log(e.responseJSON.message);
      alert(e.responseJSON.message);
    },
  }).done(function (data) {
    $("#escolaIdEdit").val("");
    $("#dependenciaAdmIdEdit").val("");
    $("#codCursoEdit").val("");
    $("#nomeEdit").val("");
    $("#codCursoInpeEdit").val("");

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
    escolaId: Number($("#escolaId").val()),
    dependenciaAdmId: Number($("#dependenciaAdmId").val()),
    codCurso: $("#codCurso").val(),
    nome: $("#nome").val(),
    codCursoInpe: $("#codCursoInpe").val(),
  };

  $.ajax({
    url: url_base + "/cursos",
    type: "POST",
    data: JSON.stringify(objeto),
    contentType: "application/json; charset=utf-8",
    async: false,
    error: function (e) {
      console.log(e.responseJSON.message);
      alert(e.responseJSON.message);
    },
  }).done(function (data) {
    $("#escolaId").val("");
    $("#dependenciaAdmId").val("");
    $("#codCurso").val("");
    $("#nome").val("");
    $("#codCursoInpe").val("");
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
  $("#escolaId").val("");
  $("#dependenciaAdmId").val("");
  $("#codCurso").val("");
  $("#nome").val("");
  $("#codCursoInpe").val("");
}
*/


$("#btn-adicionar").on("click", function (e) {
  e.preventDefault();
  adcionar()
  return false;
});

function adcionar () {
	
	var object = {
		nomeCurso: $("#nome").val(),
		areaConhecimento: $("#areaConhecimentoId").val(),
		disciplina: $("#disciplinaId").val()
	}
	
	sessionStorage.setItem('teste', object)
	
	$("#cola-tabela").append(
		"<tr>" +
        "<td>" +
        $("#areaConhecimentoId").val() +
        "</td>" +
        "<td>" +
       $("#disciplinaId").val() +
        "</td>"+
        "</tr>"
	);
	
}