var id = "";

$(document).ready(function () {
  id = getSearchParams("id");

  $.ajax({
    url: url_base + "/turma",
    type: "GET",
    async: false,
  }).done(function (data) {
    $.each(data, function (index, item) {
      $("#turmaId").append(
        $("<option>", {
          value: item.idTurma,
          text: item.anoEscolar.anoEscolar + " - " + item.numTurma,
          name: item.numTurma,
        })
      );
    });
  });

  $.ajax({
    url: url_base + "/disciplina",
    type: "get",
    async: false,
  }).done(function (data) {
    $.each(data, function (index, item) {
      $("#disciplinaId").append(
        $("<option>", {
          value: item.idDisciplina,
          text: item.nome,
          name: item.nome,
        })
      );
    });
  });

  $.ajax({
    url: url_base + "/periodoletivo",
    type: "get",
    async: false,
  }).done(function (data) {
    $.each(data, function (index, item) {
      $("#periodoLetivoId").append(
        $("<option>", {
          value: item.idPeriodoLetivo,
          text: item.periodo,
          name: item.periodo,
        })
      );
    });
  });

  $.ajax({
    url: url_base + "/cursos",
    type: "get",
    async: false,
  }).done(function (data) {
    $.each(data, function (index, item) {
      $("#cursoId").append(
        $("<option>", {
          value: item.idCurso,
          text: item.nome,
          name: item.nome,
        })
      );
    });
  });

  $.ajax({
    url: url_base + "/curriculo",
    type: "get",
    async: false,
  }).done(function (data) {
    $.each(data, function (index, item) {
      $("#curriculoId").append(
        $("<option>", {
          value: item.idCurriculo,
          text: item.curriculo,
          name: item.curriculo,
        })
      );
    });
  });

  getDados2();
});

function getDados2() {
  $.ajax({
    url: url_base + "/turmaDisciplina/" + id,
    type: "GET",
    async: false,
  })
    .done(function (data) {
      const ref = data;

      $("#turmaId").val(ref.turma.idTurma).attr("selected", true);
      $("#disciplinaId").val(ref.disciplina.idDisciplina).attr("selected", true);
      $("#periodoLetivoId").val(ref.periodoLetivo.idPeriodoLetivo).attr("selected", true);
      $("#serie").val(ref.serie).attr("selected", true);
      $("#cursoId").val(ref.curso.idCurso).attr("selected", true);
      $("#curriculoId").val(ref.curriculo.idCurriculo).attr("selected", true);
      $("#qtdAulasPrevistas").val(ref.qtdAulasPrevistas);
      $("#dtInicio").val(ref.dtInicio);
      $("#dtFim").val(ref.dtFim);
      $("#situacao").val(ref.situacao);
      $("#nivelPresenca").val(ref.nivelPresenca);
      $("#duracaoAula").val(ref.duracaoAula);
    
      if (data.ativo == "S") {
        $(".ativar").hide();
        $(".desativar").show();
      } else {
        $(".desativar").hide();
        $(".ativar").show();
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
    });
}

function desativar2() {
  $.ajax({
    url: url_base + `/turmaDisciplina/${id}/desativar`,
    type: "PUT",
    contentType: "application/json; charset=utf-8",
    async: false,
    error: function (e) {
      console.log(e);
      alert(e.responseJSON.message);
    },
  }).done(function (data) {
    getDados2();
    alert("Desativado com Sucesso!");
  });
  return false;
}

function ativar2() {
  $.ajax({
    url: url_base + `/turmaDisciplina/${id}/ativar`,
    type: "PUT",
    contentType: "application/json; charset=utf-8",
    async: false,
    error: function (e) {
      console.log(e);
      alert(e.responseJSON.message);
    },
  }).done(function (data) {
    getDados2();
    alert("Ativado com Sucesso!");
  });
  return false;
}

$("#formNovoCadastro").submit(function (e) {
  e.preventDefault();

  var dadosFormulario = {
    idTurmaDisciplina: id,
    turmaId: Number($("#turmaId").val()),
    disciplinaId: Number($("#disciplinaId").val()),
    periodoLetivoId: Number($("#periodoLetivoId").val()),
    serie: $("#serie").val(),
    cursoId: Number($("#cursoId").val()),
    curriculoId: Number($("#curriculoId").val()),
    qtdAulasPrevistas: $("#qtdAulasPrevistas").val(),
    dtInicio: $("#dtInicio").val(),
    dtFim: $("#dtFim").val(),
    situacao: $("#situacao").val(),
    nivelPresenca: $("#nivelPresenca").val(),
    duracaoAula: $("#duracaoAula").val(),
  };

  $.ajax({
    url: url_base + "/turmaDisciplina",
    type: "PUT",
    data: JSON.stringify(dadosFormulario),
    contentType: "application/json; charset=utf-8",
    error: function (e) {
      console.log(e);
      alert(e.responseJSON.message);
    },
  }).done(function (data) {
    alert("Editado com sucesso!");
    window.location.href = "turmas-disciplina";
  });
});
