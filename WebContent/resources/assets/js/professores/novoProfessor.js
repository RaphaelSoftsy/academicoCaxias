$(document).ready(function () {
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
});

$("#formNovoCadastro").submit(function (e) {
  e.preventDefault();

  var dadosFormulario = {
    pessoaId: $("#pessoaId").val(),
    codigoInep: $("#codigoInep").val(),
    matricula: $("#matricula").val(),
    situacaoProfessorId: $("#situacaoProfessorId").val(),
    deficiente: $('input[name="pcd"]:checked').val(),
    autista: $('input[name="tea"]:checked').val(),
    altasHabilidades: $('input[name="altaHabilidade"]:checked').val(),
    nivelEscolaridadeId: $("#nivelEscolaridadeId").val(),
    tipoEnsinoMedioId: $("#tipoEnsinoMedioId").val(),
  };

  $.ajax({
    url: url_base + "/professores",
    type: "POST",
    data: JSON.stringify(dadosFormulario),
    contentType: "application/json; charset=utf-8",
    error: function (e) {
      console.log(e);
      Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
			});
    },
  }).done(function (data) {
   Swal.fire({
				title: "Cadastrado com sucesso",
				icon: "success",
			})
    window.location.href = "professores";
  });
});
