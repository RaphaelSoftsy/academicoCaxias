<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<!DOCTYPE html>

<% String contextPath = request.getContextPath(); %> <%@ taglib prefix="c"
uri="http://java.sun.com/jsp/jstl/core"%> <%@ taglib
uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />

    <title>POC - Acadêmico Caxias do Sul</title>

    <!-- Bootstrap -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
      crossorigin="anonymous"
    />
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
      crossorigin="anonymous"
    ></script>

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css"
      rel="stylesheet"
    />
    <script src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>

	<!-- Sweetalert -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="sweetalert2.all.min.js"></script>
    
    <!-- CSS -->

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
      rel="stylesheet"
    />

    <!-- FontAwesome -->
    <script
      src="https://kit.fontawesome.com/2476720ce5.js"
      crossorigin="anonymous"
    ></script>
    <link
      rel="stylesheet"
      href="<%=contextPath%>/resources/assets/css/style.css"
    />
  </head>

  <body>
    <div class="bg-loading">
      <div class="spinner">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
      </div>
    </div>
    <header id="menu"></header>
    <main class="py-4 container-res">
      <section class="mb-5">
        <div class="card">
          <div class="card-body title">
            <i class="fa-solid fa-plus fa-lg"></i><span>Novo Cadastro</span>
          </div>
        </div>
      </section>
      <section class="pt-4">
        <form
          id="formNovoCadastro"
          class="card form p-5 col-12 animate__animated animate__bounceInUp d-flex flex-column justify-content-center"
        >
          <h1 id="tituloForm" class="text-center mb-5">Cadastrar Professor</h1>
          <input
            type="text"
            id="usuarioCadastro"
            hidden
            value="${funcionario.idUsuario}"
          />

          <div class="row mb-3">
            <div class="col-md-6">
              <label for="pessoaId" class="form-label"
                >Pessoa:<span class="red">*</span>
              </label>
              <select
                class="form-select"
                aria-label="Pessoa"
                id="pessoaId"
                required
                name="pessoaId"
              >
                <option selected disabled>Selecione uma opção</option>
              </select>
            </div>
            <div class="col-md-6">
              <label for="codigoInep" class="form-label"
                >Código Inep:<span class="red">*</span>
              </label>
              <input
                type="text"
                id="codigoInep"
                required
                autocomplete="off"
                name="codigoInep"
                class="form-control"
              />
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <label for="matricula" class="form-label"
                >Matrícula:<span class="red">*</span>
              </label>
              <input
                type="text"
                id="matricula"
                required
                autocomplete="off"
                name="matricula"
                class="form-control"
              />
            </div>
            <div class="col-md-6">
              <label for="situacaoProfessorId" class="form-label"
                >Situação:<span class="red">*</span>
              </label>
              <select
                class="form-select"
                aria-label="situacaoProfessorId"
                id="situacaoProfessorId"
                required
                name="situacaoProfessorId"
              >
                <option selected disabled>Selecione uma opção</option>
              </select>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <label for="pcd" class="form-label"
                >PcD:<span class="red">*</span></label
              >
              <div class="form-control">
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="pcd"
                    id="pcdS"
                    value="S"
                  />
                  <label class="form-check-label" for="pcdS">Sim</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="pcd"
                    id="pcdN"
                    value="N"
                  />
                  <label class="form-check-label" for="pcdN">Não</label>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <label for="tea" class="form-label"
                >TEA:<span class="red">*</span></label
              >
              <div class="form-control">
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="tea"
                    id="teaS"
                    value="S"
                  />
                  <label class="form-check-label" for="teaS">Sim</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="tea"
                    id="teaN"
                    value="N"
                  />
                  <label class="form-check-label" for="teaN">Não</label>
                </div>
              </div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <label for="altaHabilidade" class="form-label"
                >Altas habilidades:<span class="red">*</span></label
              >
              <div class="form-control">
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="altaHabilidade"
                    id="altaHabilidadeS"
                    value="S"
                  />
                  <label class="form-check-label" for="altaHabilidadeS"
                    >Sim</label
                  >
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="altaHabilidade"
                    id="altaHabilidadeN"
                    value="N"
                  />
                  <label class="form-check-label" for="altaHabilidadeN"
                    >Não</label
                  >
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <label for="nivelEscolaridadeId" class="form-label"
                >Nível de escolaridade:<span class="red">*</span>
              </label>
              <select
                class="form-select"
                aria-label="nivelEscolaridadeId"
                id="nivelEscolaridadeId"
                required
                name="nivelEscolaridadeId"
              >
                <option selected disabled>Selecione uma opção</option>
              </select>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <label for="tipoEnsinoMedioId" class="form-label"
                >Tipo de Ensino Médio:<span class="red">*</span>
              </label>
              <select
                class="form-select"
                aria-label="tipoEnsinoMedioId"
                id="tipoEnsinoMedioId"
                required
                name="tipoEnsinoMedioId"
              >
                <option selected disabled>Selecione uma opção</option>
              </select>
            </div>
          </div>

          <div class="col-md-12 text-center mt-3">
            <button type="submit" class="btn btn-primary px-5" id="btn-submit">
              Cadastrar
            </button>
          </div>
        </form>
      </section>
    </main>

    <script
      src="https://code.jquery.com/jquery-3.7.1.js"
      integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4="
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
      integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"
      integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+"
      crossorigin="anonymous"
    ></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js"></script>

    <script src="<%=contextPath%>/resources/assets/js/professores/novoProfessor.js"></script>
    <script src="<%=contextPath%>/resources/assets/js/comum.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>
  </body>
</html>
