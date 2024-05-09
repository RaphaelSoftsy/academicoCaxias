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
          <h1 id="tituloForm" class="text-center mb-5">
            Cadastrar Turma Disciplina
          </h1>

          <div class="row mb-3">
            <div class="col-md-6">
              <label for="turmaId" class="form-label"
                >Turma:<span class="red">*</span>
              </label>
              <select
                class="form-select"
                aria-label="Turma"
                id="turmaId"
                required
                name="turmaId"
              >
                <option value="" selected disabled>Selecione uma opção</option>
              </select>
            </div>
            <div class="col-md-6">
              <label for="disciplinaId" class="form-label"
                >Disciplina:<span class="red">*</span>
              </label>
              <select
                class="form-select"
                aria-label="Disciplina"
                id="disciplinaId"
                required
                name="disciplinaId"
              >
                <option value="" selected disabled>Selecione uma opção</option>
              </select>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <label for="periodoLetivoId" class="form-label"
                >Período Letivo:<span class="red">*</span>
              </label>
              <select
                class="form-select"
                aria-label="Período Letivo"
                id="periodoLetivoId"
                required
                name="periodoLetivoId"
              >
                <option value="" disabled>Selecione uma opção</option>
              </select>
            </div>
            <div class="col-md-6">
              <label for="serie" class="form-label"
                >Série:<span class="red">*</span>
              </label>
              <select
                class="form-select"
                aria-label="Série"
                id="serie"
                required
                name="serie"
              >
                <option value="" selected disabled>Selecione uma opção</option>
                <option value="1">1º Série</option>
                <option value="2">2º Série</option>
                <option value="3">3º Série</option>
                <option value="4">4º Série</option>
                <option value="5">5º Série</option>
                <option value="6">6º Série</option>
                <option value="7">7º Série</option>
                <option value="8">8º Série</option>
                <option value="9">9º Série</option>
              </select>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <label for="cursoId" class="form-label"
                >Curso:<span class="red">*</span>
              </label>
              <select
                class="form-select"
                aria-label="Curso"
                id="cursoId"
                required
                name="cursoId"
              >
                <option value="" selected disabled>Selecione uma opção</option>
              </select>
            </div>
            <div class="col-md-6">
              <label for="curriculoId" class="form-label"
                >Currículo:<span class="red">*</span>
              </label>
              <select
                class="form-select"
                aria-label="Currículo"
                id="curriculoId"
                required
                name="curriculoId"
              >
                <option value="" selected disabled>Selecione uma opção</option>
              </select>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <label for="qtdAulasPrevistas" class="form-label"
                >Nº de aulas previstas:<span class="red">*</span>
              </label>
              <input
                type="number"
                id="qtdAulasPrevistas"
                required
                autocomplete="off"
                name="qtdAulasPrevistas"
                class="form-control"
              />
            </div>
            <div class="col-md-6">
              <label for="dtInicio" class="form-label"
                >Data de início:<span class="red">*</span>
              </label>
              <input
                max="2999-01-01"
                autocomplete="off"
                type="date"
                id="dtInicio"
                required
                name="dtInicio"
                class="form-control"
              />
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <label for="dtFim" class="form-label"
                >Data de fim:<span class="red">*</span>
              </label>
              <input
                max="2999-01-01"
                autocomplete="off"
                type="date"
                id="dtFim"
                required
                name="dtFim"
                class="form-control"
              />
            </div>
            <div class="col-md-6">
              <label for="situacao" class="form-label"
                >Situação:<span class="red">*</span>
              </label>
              <select
                class="form-select"
                aria-label="Situação"
                id="situacao"
                required
                name="situacao"
              >
                <option value="" selected disabled>Selecione uma opção</option>
                <option value="Ativa">Ativa</option>
                <option value="Desativada">Desativada</option>
              </select>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <label for="nivelPresenca" class="form-label"
                >Nível de presença:<span class="red">*</span>
              </label>
              <select
                class="form-select"
                aria-label="Nível de presença"
                id="nivelPresenca"
                required
                name="nivelPresenca"
              >
                <option value="" selected disabled>Selecione uma opção</option>
                <option value="Alto">Alto</option>
                <option value="Médio">Médio</option>
                <option value="Baixo">Baixo</option>
              </select>
            </div>
            <div class="col-md-6">
              <label for="duracaoAula" class="form-label"
                >Duração da aula:<span class="red">*</span>
              </label>
              <input
                autocomplete="off"
                type="time"
                id="duracaoAula"
                name="duracaoAula"
                class="form-control"
              />
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

    <script src="<%=contextPath%>/resources/assets/js/turmas/novaDisciplina.js"></script>
    <script src="<%=contextPath%>/resources/assets/js/comum.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>
  </body>
</html>
