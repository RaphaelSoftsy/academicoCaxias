var dados = [];
var ufs = [];
var dadosOriginais = [];
var concursoId = 0;
var cursoId = 0;
var idEscola = 0;
var idTurno = 0;
var descricaoOferta = "";
var serie = 0;
var minVagasAbertTurma = 0;
var vagas = 0;
const contaId = localStorage.getItem("contaId");
var rows = 8;
var currentPage = 1;
var pagesToShow = 5;
var id = 0;
var series = [];

$(document).ready(function () {
  $(".dropdown-toggle-form").click(function () {});

  $(".searchButton").click(function () {
    var searchInput = $(this).siblings(".searchInput").val();

    var columnToSearch = $(this).closest(".sortable").data("column");

    // Função para normalizar strings (remover acentos e caracteres diacríticos)
    function normalizeString(str) {
      return str
        .normalize("NFD") // Decompor caracteres acentuados
        .replace(/[\u0300-\u036f]/g, "") // Remover marcas diacríticas
        .toLowerCase(); // Converter para minúsculas
    }

    var normalizedSearchInput = normalizeString(searchInput);

    var filteredData = dadosOriginais.filter(function (item) {
      var valueToCheck = item[columnToSearch]
        ? item[columnToSearch].toString()
        : "";
      return normalizeString(valueToCheck).includes(normalizedSearchInput);
    });

    listarDados(filteredData);
    $('input[data-toggle="toggle"]').bootstrapToggle();

    $(this).siblings(".searchInput").val("");
    $(this).closest(".dropdown-content-form").removeClass("show");
  });

  $.ajax({
    url: url_base + "/concursos/conta/" + contaId,
    type: "get",
    async: false,
  }).done(function (data) {
    preencherOpcoes(
      data,
      "#turmaOptionsConcurso",
      "#concursoSelect",
      "#turmaSearchConcurso"
    );
    preencherOpcoes(
      data,
      "#turmaOptionsConcursoEdit",
      "#concursoEdit",
      "#turmaSearchConcursoEdit"
    );
  });

  // Carrega os cursos
  $.ajax({
    url: url_base + "/cursos/conta/" + contaId,
    type: "get",
    async: false,
  }).done(function (data) {
    preencherOpcoes(
      data,
      "#turmaOptionsCurso",
      "#cursoSelect",
      "#turmaSearchCurso"
    );
    preencherOpcoes(
      data,
      "#turmaOptionsCursoEdit",
      "#cursoEdit",
      "#turmaSearchCursoEdit"
    );
  });

  // Carrega as escolas
  $.ajax({
    url: url_base + "/escolas/usuario/" + contaId + "/" + usuarioId,
    type: "get",
    async: false,
  }).done(function (data) {
    preencherOpcoes(
      data,
      "#turmaOptionsEscola",
      "#escolaSelect",
      "#turmaSearchEscola"
    );
    preencherOpcoes(
      data,
      "#turmaOptionsEscolaEdit",
      "#escolaEdit",
      "#turmaSearchEscolaEdit"
    );
  });
  $.ajax({
    url: url_base + "/turno/conta/" + contaId,
    type: "get",
    async: false,
  }).done(function (data) {
    preencherOpcoes(
      data,
      "#turmaOptionsTurno",
      "#turnoSelect",
      "#turmaSearchTurno"
    );
    preencherOpcoes(
      data,
      "#turmaOptionsTurnoEdit",
      "#turnoEdit",
      "#turmaSearchTurnoEdit"
    );
  });

  $.ajax({
    url: url_base + "/serie",
    type: "get",
    async: false,
  }).done(function (data) {
    series = data;
    preencherOpcoes(data, "#serieIdOptions", "#serieId", "#serieIdSearch");
    preencherOpcoes(
      data,
      "#serieIdOptionsEdit",
      "#serieIdEdit",
      "#serieIdSearchEdit"
    );
  });

  // Carrega os cursos
  $.ajax({
    url: url_base + "/curriculo",
    type: "get",
    async: false,
  }).done(function (data) {
    console.log(data);
    preencherOpcoes(
      data,
      "#curriculoIdOptions",
      "#curriculoId",
      "#curriculoIdSearch"
    );
    preencherOpcoes(
      data,
      "#curriculoIdOptionsEdit",
      "#curriculoIdEdit",
      "#curriculoIdSearchEdit"
    );
  });

  function preencherOpcoes(items, optionsListId, selectId, searchId) {
    const $optionsList = $(optionsListId);
    const $selectElement = $(selectId);

    $optionsList.empty();
    $selectElement
      .empty()
      .append(
        '<option value="" disabled selected>Selecione uma opção</option>'
      );

    $.each(items, function (index, item) {
      if (item.ativo === "S") {
        let optionText = item.serie
          ? `${item.serie} - ${item.descricao || ""}`
          : item?.nome
          ? `${item.nome} - ${item.codCurso || ""}`
          : item?.concurso ||
            item?.nomeEscola ||
            item?.nomeCurso ||
            `${item?.turno || ""} - ${item?.mnemonico || ""}` ||
            item?.curriculo;

        item.curriculo ? (optionText = item.curriculo) : "";

        $optionsList.append(
          `<li data-value="${
            item.idSerie ||
            item.idConcurso ||
            item.idCurso ||
            item.idEscola ||
            item.idTurno ||
            item.idCurriculo
          }">${optionText}</li>`
        );
        $selectElement.append(
          $("<option>", {
            value:
              item.idSerie ||
              item.idConcurso ||
              item.idCurso ||
              item.idEscola ||
              item.idTurno ||
              item.idCurriculo ||
              "",
            text: optionText,
          })
        );
      }
    });

    $(searchId).on("focus", function () {
      $optionsList.show();
    });

    $(searchId).on("input", function () {
      const searchValue = $(this).val().toLowerCase();
      $optionsList.find("li").each(function () {
        const text = $(this).text().toLowerCase();
        $(this).toggle(text.includes(searchValue));
      });
    });

    $optionsList.on("click", "li", function () {
      const selectedText = $(this).text();
      const selectedValue = $(this).data("value");

      $(searchId).val(selectedText);
      $selectElement.val(selectedValue);
      $optionsList.hide();
    });

    $(document).on("click", function (e) {
      if (!$(e.target).closest(".custom-select").length) {
        $optionsList.hide();
      }
    });
  }

  $("#inputBusca").on("keyup", function () {
    var valorBusca = $(this).val().toLowerCase();

    if (valorBusca === "") {
      busca();
      $("#cola-tabela tr").show();
    } else {
      $("#cola-tabela tr")
        .hide()
        .filter(function () {
          return $(this).text().toLowerCase().indexOf(valorBusca) > -1;
        })
        .show();
    }
  });

  $("#inputBusca").on("input", function () {
    var valorBusca = $(this).val().toLowerCase();
    realizarBusca(valorBusca);
  });

  function realizarBusca(valorInput) {
    if (valorInput === "") {
      showPage(currentPage);
    } else {
      $("#cola-tabela tr")
        .hide()
        .filter(function () {
          return $(this).text().toLowerCase().indexOf(valorInput) > -1;
        })
        .show();
    }
  }

  getDados();

  showPage(currentPage);
  updatePagination();

  $(".checkbox-toggle").each(function () {
    var status = $(this).data("status");
    if (status !== "S") {
      $(this).prop("checked", false);
    }
  });
});

$("#limpa-filtros").click(function () {
  listarDados(dadosOriginais);
  $('input[data-toggle="toggle"]').bootstrapToggle();
  $(".searchInput").val("");
});

function getDados() {
  $.ajax({
    url: url_base + "/ofertasConcurso/cursoUsuario/" + usuarioId,
    type: "GET",
    async: false,
  })
    .done(function (data) {
      dadosOriginais = data;
      dados = data;
      if (
        data != "Nenhum resultado encontrado para os parâmetros informados."
      ) {
        listarDados(data);
      }
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

      if (item.ativo == "N") {
        ativo =
          '<i style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não';
      } else {
        ativo =
          "<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim";
      }

      var serie = series.find(function (serie) {
        return serie.idSerie == item.idSerie;
      });

      const minVagasAbertTurma =
        item.minVagasAbertTurma != null
          ? item.minVagasAbertTurma
          : "Não definido";

      console.log(item);

      return (
        "<tr>" +
        "<td>" +
        item.concurso +
        "</td>" +
        "<td>" +
        `${item.nomeCurso} - ${item.codigoCurso}` +
        "</td>" +
        "<td>" +
        item.nomeEscola +
        "</td>" +
        "<td>" +
        item.turno +
        "</td>" +
        "<td>" +
        `${serie.serie} - ${serie.descricao}` +
        "</td>" +
        "<td>" +
        item.descricaoOferta +
        "</td>" +
        "<td>" +
        item.vagas +
        "</td>" +
        "<td>" +
        minVagasAbertTurma +
        "</td>" +
        "<td><div class='d-flex align-items-center gap-1'>" +
        '<input type="checkbox" data-status="' +
        item.ativo +
        '" data-id="' +
        item.idOfertaConcurso +
        '" onchange="alteraStatus(this)" ' +
        (item.ativo === "S" ? "checked" : "") +
        ' data-toggle="toggle" data-onstyle="success" data-offstyle="danger" data-on="Sim" data-off="Não" data-width="63" class="checkbox-toggle" data-size="sm">' +
        "</div></td>" +
        '<td class="d-flex justify-content-center"><button style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm edit-table" data-concursoId="' +
        item.idConcurso +
        '" data-serieId="' +
        item.idSerie +
        '" data-cursoId="' +
        item.idCurso +
        '" data-curriculoId="' +
        item.curriculo +
        '" data-escolaId="' +
        item.idEscola +
        '" data-turnoId="' +
        item.idTurno +
        '" data-serie="' +
        item.serie +
        '" data-descricaoOferta="' +
        item.descricaoOferta +
        '" data-vagas="' +
        item.vagas +
        '" data-minVagasAbertTurma="' +
        item.minVagasAbertTurma +
        '" data-id="' +
        item.idOfertaConcurso +
        '" data-ativo="' +
        item.ativo +
        '" onclick="showRef(this)" data-bs-toggle="modal" data-bs-target="#editAto"><i class="fa-solid fa-pen fa-lg"></i></button></td>' +
        "</tr>"
      );
    })
    .join("");

  $("#cola-tabela").html(html);

  // Reaplicar a estilização do toggle
}

const showRef = (ref) => {
  id = ref.getAttribute("data-id");

  window.location.href = "nova-oferta-concurso?id=" + id;
};

function alteraStatus(element) {
  var id = element.getAttribute("data-id");
  var status = element.getAttribute("data-status");

  const button = $(element).closest("tr").find(".btn-status");
  if (status === "S") {
    button.removeClass("btn-success").addClass("btn-danger");
    button.find("i").removeClass("fa-check").addClass("fa-xmark");
    element.setAttribute("data-status", "N");
  } else {
    button.removeClass("btn-danger").addClass("btn-success");
    button.find("i").removeClass("fa-xmark").addClass("fa-check");
    element.setAttribute("data-status", "S");
  }

  console.log(id);
  console.log(status);

  $.ajax({
    url:
      url_base +
      `/ofertasConcurso/${id}${status === "S" ? "/desativar" : "/ativar"}`,
    type: "PUT",
    error: function (e) {
      Swal.close();
      console.log(e.responseJSON);
      Swal.fire({
        icon: "error",
        title: e.responseJSON.message,
      });
    },
  }).then((data) => {
    window.location.href = "oferta-concurso";
  });
}

function showModal(ref) {
  // Recupera os atributos do elemento
  id = ref.getAttribute("data-id");
  const concursoId = ref.getAttribute("data-concursoId");
  const serieId = ref.getAttribute("data-serieId");
  const cursoId = ref.getAttribute("data-cursoId");
  const escolaId = ref.getAttribute("data-escolaId");
  const turnoId = ref.getAttribute("data-turnoId");
  const serie = ref.getAttribute("data-serie");
  const descricaoOferta = ref.getAttribute("data-descricaoOferta");
  const vagas = ref.getAttribute("data-vagas");
  const minVagasAbertTurma = ref.getAttribute("data-minVagasAbertTurma");
  const isAtivo = ref.getAttribute("data-ativo");
  const curriculoId = ref.getAttribute("data-curriculoId");

  // Verifica se a turma está ativa ou não e ajusta a exibição de botões
  if (isAtivo == "S") {
    $(".ativar").hide();
    $(".desativar").show();
  } else {
    $(".desativar").hide();
    $(".ativar").show();
  }

  // Preenche os campos de texto
  // $("#serieEdit").val(serie);
  $("#descricaoEdit").val(descricaoOferta);
  $("#vagasEdit").val(vagas);
  $("#vagasMinEdit").val(minVagasAbertTurma);

  // Função para preencher campo de busca e select oculto
  function preencherCampoBusca(searchId, optionsListId, selectId, valorId) {
    $(selectId).val(valorId).change(); // Atualiza o valor do select
    const textoSelecionado = $(selectId + " option:selected").text(); // Texto do select
    $(searchId).val(textoSelecionado); // Preenche o campo de pesquisa
    $(optionsListId).hide(); // Esconde a lista de opções
  }

  // Preencher os campos de Concurso, Curso, Escola e Turno
  preencherCampoBusca(
    "#turmaSearchConcursoEdit",
    "#turmaOptionsConcursoEdit",
    "#concursoEdit",
    concursoId
  );
  preencherCampoBusca(
    "#serieIdSearchEdit",
    "#serieIdOptionsEdit",
    "#serieIdEdit",
    serieId
  );
  preencherCampoBusca(
    "#turmaSearchCursoEdit",
    "#turmaOptionsCursoEdit",
    "#cursoEdit",
    cursoId
  );
  preencherCampoBusca(
    "#turmaSearchEscolaEdit",
    "#turmaOptionsEscolaEdit",
    "#escolaEdit",
    escolaId
  );
  preencherCampoBusca(
    "#turmaSearchTurnoEdit",
    "#turmaOptionsTurnoEdit",
    "#turnoEdit",
    turnoId
  );

  preencherCampoBusca(
    "#curriculoIdOptionsEdit",
    "#curriculoIdEdit",
    "#curriculoIdSearchEdit",
    curriculoId
  );
}

function formatarHoraParaAPI(hora) {
  if (/^\d{2}:\d{2}$/.test(hora)) {
    return hora + ":00";
  }
  return hora;
}

function editar() {
  var objeto = {
    idOfertaConcurso: id,
    concursoId: Number($("#concursoEdit").val()),
    cursoId: Number($("#cursoEdit").val()),
    escolaId: Number($("#escolaEdit").val()),
    turnoId: Number($("#turnoEdit").val()),
    // series: $("#serieEdit").val(),
    serieId: $("#serieIdEdit").val(),
    descricaoOferta: $("#descricaoEdit").val(),
    vagas: $("#vagasEdit").val(),
    minVagasAbertTurma: $("#vagasMinEdit").val(),
    curriculoId: Number($("#curriculoIdEdit").val()),
  };

  console.log(objeto);

  $.ajax({
    url: url_base + "/ofertasConcurso",
    type: "PUT",
    data: JSON.stringify(objeto),
    contentType: "application/json; charset=utf-8",
    async: false,
    error: function (e) {
      console.log(e.responseJSON);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Não foi possível realizar esse comando!",
      });
    },
  }).done(function (data) {
    // $("#serieEdit").val("");
    $("#descricaoEdit").val("");
    $("#vagasMinEdit").val("");
    $("#vagasEdit").val("");
    getDados();

    Swal.fire({
      title: "Editado com sucesso",
      icon: "success",
    });
    window.location.href = "oferta-concurso";
  });
  return false;
}
$("#formEdit").on("submit", function (e) {
  e.preventDefault();
  editar();
  return false;
});
$("#formCadastro").on("submit", function (e) {
  e.preventDefault();
  cadastrar();
  return false;
});

function cadastrar() {
  var objeto = {
    concursoId: Number($("#concursoSelect").val()),
    cursoId: Number($("#cursoSelect").val()),
    escolaId: Number($("#escolaSelect").val()),
    turnoId: Number($("#turnoSelect").val()),
    curriculoId: Number($("#curriculoId").val()),
    serieId: $("#serieId").val(),
    descricaoOferta: $("#descricao").val(),
    vagas: $("#vagas").val(),
    minVagasAbertTurma: $("#vagasMin").val(),
  };

  console.log(objeto);

  $.ajax({
    url: url_base + "/ofertasConcurso",
    type: "POST",
    data: JSON.stringify(objeto),
    contentType: "application/json; charset=utf-8",
    async: false,
    error: function (e) {
      console.log(e.responseJSON);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Não foi possível realizar esse comando!",
      });
    },
  }).done(function (data) {
    // $("#serie").val("");
    $("#descricao").val("");
    $("#vagasMin").val("");
    $("#vagas").val("");
    getDados();
    showPage(currentPage);
    updatePagination();
    getDados();
    Swal.fire({
      title: "Cadastrado com sucesso",
      icon: "success",
    });
    window.location.href = "oferta-concurso";
  });
  return false;
}

function limpaCampo() {
  $("#cadastro-nome").val("");
  $("#cadastro-nome2").val("");
  $("#horaInicio").val("");
  $("#horaFim").val("");
}
