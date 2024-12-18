var dados = [];
const contaId = localStorage.getItem("contaId");
var nome = "";
var nome2 = "";
var nome3 = "";
var rows = 8;
var currentPage = 1;
var pagesToShow = 5;
let descricao = "";
let id = "";
let idProfessor = null;
let idProfessorSelecionado = "";
let url = "";
var listaProfessores;
let idDisciplina;
let idEscola;

$(document).ready(function () {
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

  $(".container-table").hide();
  $("#btn-save").hide();
  $(
    "#escolaIdDisable, #disciplinaId, #turno, #turmaId, #ano, #periodo"
  ).prop("disabled", true);
  
  $.ajax({
    url: url_base + "/escolas/conta/" + contaId,
    type: "GET",
  }).done(function (data) {
    $.each(data, function (index, item) {
      $("#escolaId").append(
        $("<option>", {
          value: item.idEscola,
          text: item.nomeEscola,
        })
      );
    });
  });

  $("#escolaId").on("change", function () {
    $("#ano").prop("disabled", false).val(null).trigger("change");
    $("#periodo, #turno, #turmaId, #disciplinaId")
      .prop("disabled", true)
      .val(null)
      .trigger("change");
  });

  $.ajax({
    url: url_base + "/anos",
    type: "GET",
  }).done(function (data) {
    $.each(data, function (index, item) {
      $("#ano").append(
        $("<option>", {
          value: item.idAno,
          text: item.anoEscolar,
        })
      );
    });
  });

  $("#ano").on("change", function () {
    $("#periodo").prop("disabled", false).val(null).trigger("change");
    $("#turno, #turmaId, #disciplinaId")
      .prop("disabled", true)
      .val(null)
      .trigger("change");
  });

  $("#periodo").on("change", function () {
    $("#turno").prop("disabled", false).val(null).trigger("change");
    $("#turmaId, #disciplinaId")
      .prop("disabled", true)
      .val(null)
      .trigger("change");
  });

  $.ajax({
    url: url_base + "/turno/conta/" + contaId,
    type: "GET",
  }).done(function (data) {
    $.each(data, function (index, item) {
      $("#turno").append(
        $("<option>", {
          value: item.idTurno,
          text: item.turno,
        })
      );
    });
  });

  $("#turno").on("change", function () {
    $("#turmaId").prop("disabled", false).val(null).trigger("change");
    $("#disciplinaId").prop("disabled", true).val(null).trigger("change");
  });

  $.ajax({
    url: url_base + "/turma",
    type: "GET",
  }).done(function (data) {
    $.each(data, function (index, item) {
      $("#turmaId").append(
        $("<option>", {
          value: item.idTurma,
          text: item.anoEscolar.anoEscolar + " - " + item.numTurma,
        })
      );
    });
  });

  $("#turmaId").on("change", function () {
    $("#disciplinaId").prop("disabled", false).val(null).trigger("change");
  });

  $.ajax({
    url: url_base + "/disciplina/conta/" + contaId,
    type: "GET",
  }).done(function (data) {
    $.each(data, function (index, item) {
      $("#disciplinaId").append(
        $("<option>", {
          value: item.idDisciplina,
          text: `${item.codDiscip} - ${item.nome}`,
        })
      );
    });
  });

  $("#escolaId, #disciplinaId, #turno, #turmaId, #ano, #periodo").select2();
});