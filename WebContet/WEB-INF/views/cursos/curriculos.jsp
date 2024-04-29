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
            <i class="fa-solid fa-graduation-cap fa-lg"></i>
            <span>Currículos</span>
          </div>
        </div>
      </section>
      <section class="pt-4 card card-table px-5 py-3">
        <div
          class="mt-3 mb-3"
          style="display: flex; align-items: center; justify-content: end"
        >
          <div class="d-flex align-items-center gap-2">
            <button id="limpa-filtros" class="btn btn-sm btn-danger">
              Limpar Filtros
            </button>
            <button
              id="exportar-excel"
              class="btn btn-sm btn-success d-flex align-items-center gap-2"
            >
              <i class="fa-solid fa-file-export"></i>Exportar
            </button>
            <button
              class="btn btn-primary btn-sm px-3 py-1 ms-auto"
              data-bs-toggle="modal"
              onclick="limpaCampo()"
              data-bs-target="#newCadastro"
            >
              Novo Cadastro
            </button>
          </div>
        </div>

        <table
          class="table tabela-cadastro table-striped table-bordered mb-0 caption-top mx-auto"
        >
          <caption>
            Itens Cadastrados
          </caption>
          <thead>
            <tr>
              <th scope="col" class="sortable border-end" data-column="cursoId">
                <div
                  class="d-flex align-items-center justify-content-between pe-2"
                >
                  <div
                    class="col d-flex align-items-center justify-content-between"
                  >
                    <span>Curso</span>
                    <i class="fas fa-sort me-3" style="color: #dddddd"></i>
                  </div>
                  <div class="dropdown-form">
                    <div class="dropdown-toggle-form" id="dropdownButton2">
                      <i class="fas fa-search" style="color: #dddddd"></i>
                    </div>
                    <div
                      class="dropdown-content-form rounded-3 dropdown-content-left"
                      id="dropdownContent2"
                    >
                      <input
                        type="text"
                        class="form-control mb-3 searchInput"
                        placeholder="Digite aqui..."
                      />
                      <button
                        class="btn btn-sm col-12 btn-success searchButton"
                      >
                        Buscar
                      </button>
                    </div>
                  </div>
                </div>
              </th>

              <th
                scope="col"
                class="sortable border-end"
                data-column="curriculo"
              >
                <div
                  class="d-flex align-items-center justify-content-between pe-2"
                >
                  <div
                    class="col d-flex align-items-center justify-content-between"
                  >
                    <span>Currículo</span>
                    <i class="fas fa-sort me-3" style="color: #dddddd"></i>
                  </div>
                  <div class="dropdown-form">
                    <div class="dropdown-toggle-form" id="dropdownButton7">
                      <i class="fas fa-search" style="color: #dddddd"></i>
                    </div>
                    <div
                      class="dropdown-content-form rounded-3 dropdown-content-left"
                      id="dropdownContent7"
                    >
                      <input
                        type="text"
                        class="form-control mb-3 searchInput"
                        placeholder="Digite aqui..."
                      />
                      <button
                        class="btn btn-sm col-12 btn-success searchButton"
                      >
                        Buscar
                      </button>
                    </div>
                  </div>
                </div>
              </th>

              <th
                scope="col"
                class="sortable border-end"
                data-column="dtHomologacao"
              >
                <div
                  class="d-flex align-items-center justify-content-between pe-2"
                >
                  <div
                    class="col d-flex align-items-center justify-content-between"
                  >
                    <span>Data de homologação</span>
                    <i class="fas fa-sort me-3" style="color: #dddddd"></i>
                  </div>
                  <div class="dropdown-form">
                    <div class="dropdown-toggle-form" id="dropdownButton4">
                      <i class="fas fa-search" style="color: #dddddd"></i>
                    </div>
                    <div
                      class="dropdown-content-form rounded-3 dropdown-content-left"
                      id="dropdownContent4"
                    >
                      <input
                        max="2999-01-01"
                        type="date"
                        class="form-control mb-3 searchInput"
                      />
                      <button
                        class="btn btn-sm col-12 btn-success searchButton"
                      >
                        Buscar
                      </button>
                    </div>
                  </div>
                </div>
              </th>

              <th
                scope="col"
                class="sortable border-end"
                data-column="dtExtincao"
              >
                <div
                  class="d-flex align-items-center justify-content-between pe-2"
                >
                  <div
                    class="col d-flex align-items-center justify-content-between"
                  >
                    <span>Data de extinção</span>
                    <i class="fas fa-sort me-3" style="color: #dddddd"></i>
                  </div>
                  <div class="dropdown-form">
                    <div class="dropdown-toggle-form" id="dropdownButton5">
                      <i class="fas fa-search" style="color: #dddddd"></i>
                    </div>
                    <div
                      class="dropdown-content-form rounded-3 dropdown-content-left"
                      id="dropdownContent5"
                    >
                      <input
                        max="2999-01-01"
                        type="date"
                        class="form-control mb-3 searchInput"
                      />
                      <button
                        class="btn btn-sm col-12 btn-success searchButton"
                      >
                        Buscar
                      </button>
                    </div>
                  </div>
                </div>
              </th>

              <th
                scope="col"
                class="sortable border-end"
                data-column="aulasPrevistas"
              >
                <div
                  class="d-flex align-items-center justify-content-between pe-2"
                >
                  <div
                    class="col d-flex align-items-center justify-content-between"
                  >
                    <span>Aulas previstas</span>
                    <i class="fas fa-sort me-3" style="color: #dddddd"></i>
                  </div>
                </div>
              </th>

              <th scope="col" class="border-end pe-2 th-sem-filtro">Ativo</th>
              <th scope="col" class="border-end pe-2 th-sem-filtro">Ações</th>
            </tr>
          </thead>
          <tbody id="cola-tabela" class="table-group-divider"></tbody>
        </table>
        <div id="pagination" class="mx-auto mt-auto">
          <button id="prev" class="btn btn-sm">
            <i class="fa-solid fa-angle-left fa-xl"></i>
          </button>
          <div id="page-numbers" class="btn-group"></div>
          <button id="next" class="btn btn-sm">
            <i class="fa-solid fa-angle-right fa-xl"></i>
          </button>
        </div>
      </section>
      <div
        class="modal fade"
        id="newCadastro"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="title-novo-ato">
                Novo Cadastro
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form id="formCadastro">
                <div class="mb-4">
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
                    <option selected disabled value="">
                      Selecione uma opção
                    </option>
                  </select>
                </div>

                <div class="mb-4">
                  <label for="curriculo" class="form-label"
                    >Currículo:<span class="red">*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="curriculo"
                    name="curriculo"
                    required
                    aria-describedby="Currículo"
                    autocomplete="off"
                  />
                </div>

                <div class="row mb-4">
                  <div class="col-6">
                    <label for="dtHomologacao" class="form-label"
                      >Data de homologação:<span class="red">*</span>
                    </label>
                    <input
                      max="2999-01-01"
                      autocomplete="off"
                      type="date"
                      id="dtHomologacao"
                      required
                      name="dtHomologacao"
                      class="form-control"
                    />
                  </div>
                  <div class="col-6">
                    <label for="dtExtincao" class="form-label"
                      >Data de extinção:<span class="red">*</span>
                    </label>
                    <input
                      max="2999-01-01"
                      autocomplete="off"
                      type="date"
                      id="dtExtincao"
                      required
                      name="dtExtincao"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="row mb-4">
                  <div class="col-6">
                    <label for="prazoIdeal" class="form-label"
                      >Prazo ideal:<span class="red">*</span>
                    </label>
                    <input
                      autocomplete="off"
                      type="number"
                      id="prazoIdeal"
                      required
                      name="prazoIdeal"
                      class="form-control"
                    />
                  </div>
                  <div class="col-6">
                    <label for="prazoMax" class="form-label"
                      >Prazo máximo:<span class="red">*</span>
                    </label>
                    <input
                      autocomplete="off"
                      type="number"
                      id="prazoMax"
                      required
                      name="prazoMax"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="row mb-4">
                  <div class="col-6">
                    <label for="creditos" class="form-label"
                      >Créditos:<span class="red">*</span>
                    </label>
                    <input
                      autocomplete="off"
                      type="number"
                      id="creditos"
                      required
                      name="creditos"
                      class="form-control"
                    />
                  </div>
                  <div class="col-6">
                    <label for="aulasPrevistas" class="form-label"
                      >Aulas previstas:<span class="red">*</span>
                    </label>
                    <input
                      autocomplete="off"
                      type="number"
                      id="aulasPrevistas"
                      required
                      name="aulasPrevistas"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Fechar
                  </button>
                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    class="btn btn-primary px-4"
                  >
                    Salvar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="editItem"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="title-edit">Editar</h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form id="formEdit">
                <div class="mb-4">
                  <label for="cursoIdEdit" class="form-label"
                    >Curso:<span class="red">*</span>
                  </label>
                  <select
                    class="form-select"
                    aria-label="Curso"
                    id="cursoIdEdit"
                    required
                    name="cursoIdEdit"
                  >
                    <option selected disabled value="">
                      Selecione uma opção
                    </option>
                  </select>
                </div>

                <div class="mb-4">
                  <label for="curriculoEdit" class="form-label"
                    >Currículo:<span class="red">*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="curriculoEdit"
                    name="curriculoEdit"
                    required
                    aria-describedby="Currículo"
                    autocomplete="off"
                  />
                </div>

                <div class="row mb-4">
                  <div class="col-6">
                    <label for="dtHomologacaoEdit" class="form-label"
                      >Data de homologação:<span class="red">*</span>
                    </label>
                    <input
                      max="2999-01-01"
                      autocomplete="off"
                      type="date"
                      id="dtHomologacaoEdit"
                      required
                      name="dtHomologacaoEdit"
                      class="form-control"
                    />
                  </div>
                  <div class="col-6">
                    <label for="dtExtincaoEdit" class="form-label"
                      >Data de extinção:<span class="red">*</span>
                    </label>
                    <input
                      max="2999-01-01"
                      autocomplete="off"
                      type="date"
                      id="dtExtincaoEdit"
                      required
                      name="dtExtincaoEdit"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="row mb-4">
                  <div class="col-6">
                    <label for="prazoIdealEdit" class="form-label"
                      >Prazo ideal:<span class="red">*</span>
                    </label>
                    <input
                      autocomplete="off"
                      type="number"
                      id="prazoIdealEdit"
                      required
                      name="prazoIdealEdit"
                      class="form-control"
                    />
                  </div>
                  <div class="col-6">
                    <label for="prazoMaxEdit" class="form-label"
                      >Prazo máximo:<span class="red">*</span>
                    </label>
                    <input
                      autocomplete="off"
                      type="number"
                      id="prazoMaxEdit"
                      required
                      name="prazoMaxEdit"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="row mb-4">
                  <div class="col-6">
                    <label for="creditosEdit" class="form-label"
                      >Créditos:<span class="red">*</span>
                    </label>
                    <input
                      autocomplete="off"
                      type="number"
                      id="creditosEdit"
                      required
                      name="creditosEdit"
                      class="form-control"
                    />
                  </div>
                  <div class="col-6">
                    <label for="aulasPrevistasEdit" class="form-label"
                      >Aulas previstas:<span class="red">*</span>
                    </label>
                    <input
                      autocomplete="off"
                      type="number"
                      id="aulasPrevistasEdit"
                      required
                      name="aulasPrevistasEdit"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    onclick='ativar("curriculo")'
                    class="ativar btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Ativar
                  </button>
                  <button
                    type="button"
                    onclick='desativar("curriculo")'
                    class="desativar btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Desativar
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Fechar
                  </button>
                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    class="btn btn-primary px-4"
                  >
                    Salvar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>

    <script src="https://cdn.sheetjs.com/xlsx-0.20.1/package/dist/xlsx.full.min.js"></script>

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

    <script src="<%=contextPath%>/resources/assets/js/cursos/curriculo.js"></script>
    <script src="<%=contextPath%>/resources/assets/js/comum.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>
  </body>
</html>
