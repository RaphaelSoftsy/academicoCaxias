var id = "";

$(document).ready(function () {
  id = getSearchParams("id");

  $.ajax({
    url: url_base + "/pessoas",
    type: "get",
    async: false,
  }).done(function (data) {
    $.each(data, function (index, item) {
      $("#pessoaId").append(
        $("<option>", {
          value: item.idPessoa,
          text: item.nome,
          name: item.nome,
        })
      );
    });
  });

  $.ajax({
    url: url_base + "/situacaoProfessor",
    type: "get",
    async: false,
  }).done(function (data) {
    $.each(data, function (index, item) {
      $("#situacaoProfessorId").append(
        $("<option>", {
          value: item.idSituacaoProfessor,
          text: item.situacaoProfessor,
          name: item.situacaoProfessor,
        })
      );
    });
  });

  $.ajax({
    url: url_base + "/nivelEscolaridade",
    type: "get",
    async: false,
  }).done(function (data) {
    $.each(data, function (index, item) {
      $("#nivelEscolaridadeId").append(
        $("<option>", {
          value: item.idNivelEscolaridade,
          text: item.nivelEscolaridade,
          name: item.nivelEscolaridade,
        })
      );
    });
  });

  $.ajax({
    url: url_base + "/tipoEnsinoMedio",
    type: "get",
    async: false,
  }).done(function (data) {
    $.each(data, function (index, item) {
      $("#tipoEnsinoMedioId").append(
        $("<option>", {
          value: item.idTipoEnsinoMedio,
          text: item.tipoEnsinoMedio,
          name: item.tipoEnsinoMedio,
        })
      );
    });
  });
  getDados2();
});

function getDados2() {
  $.ajax({
    url: url_base + "/professores/" + id,
    type: "GET",
    async: false,
  })
    .done(function (data) {
      const ref = data;

      $("#codigoInep").val(ref.codigoInep);
      $("#matricula").val(ref.matricula);
      $("#pessoaId").val(ref.pessoa.idPessoa).attr("selected", true);
      $("#situacaoProfessorId")
        .val(ref.situacaoProfessor.idSituacaoProfessor)
        .attr("selected", true);
      $("#nivelEscolaridadeId")
        .val(ref.nivelEscolaridade.idNivelEscolaridade)
        .attr("selected", true);
      $("#tipoEnsinoMedioId")
        .val(ref.tipoEnsinoMedio.idTipoEnsinoMedio)
        .attr("selected", true);

      if (ref.deficiente === "S") {
        $('input[id="pcdS"]').prop("checked", true);
      } else {
        $('input[id="pcdN"]').prop("checked", true);
      }

      if (ref.autista === "S") {
        $('input[id="teaS"]').prop("checked", true);
      } else {
        $('input[id="teaN"]').prop("checked", true);
      }

      if (ref.altasHabilidades === "S") {
        $('input[id="altaHabilidadeS"]').prop("checked", true);
      } else {
        $('input[id="altaHabilidadeN"]').prop("checked", true);
      }

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
    url: url_base + `/professores/${id}/desativar`,
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
    url: url_base + `/professores/${id}/ativar`,
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
    idProfessor: Number(id),
    pessoaId: Number($("#pessoaId").val()),
    codigoInep: $("#codigoInep").val(),
    matricula: $("#matricula").val(),
    situacaoProfessorId: Number($("#situacaoProfessorId").val()),
    deficiente: $('input[name="pcd"]:checked').val(),
    autista: $('input[name="tea"]:checked').val(),
    altasHabilidades: $('input[name="altaHabilidade"]:checked').val(),
    nivelEscolaridadeId: Number($("#nivelEscolaridadeId").val()) ,
    tipoEnsinoMedioId: Number($("#tipoEnsinoMedioId").val()),
    ativo: 'S'
  };

  $.ajax({
    url: url_base + "/professores",
    type: "PUT",
    data: JSON.stringify(dadosFormulario),
    contentType: "application/json; charset=utf-8",
    error: function (e) {
      console.log(e);
      alert(e.responseJSON.message);
    },
  }).done(function (data) {
    alert("Editado com sucesso!");
    window.location.href = "professores";
  });
});
