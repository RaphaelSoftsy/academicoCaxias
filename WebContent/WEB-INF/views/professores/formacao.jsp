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

    <title>Softsy - Educacional</title>

    <!-- Bootstrap -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
      crossorigin="anonymous"
    />
    <script charset="UTF-8" 
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
    <script charset="UTF-8"  src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>

	<!-- Sweetalert -->
    <script charset="UTF-8"  src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script charset="UTF-8"  src="sweetalert2.all.min.js"></script>
    
    <!-- CSS -->

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
      rel="stylesheet"
    />

    <!-- FontAwesome -->
    <script charset="UTF-8" 
      src="https://kit.fontawesome.com/3ce21ff22c.js"
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
            <i class="fa-solid fa-chalkboard-user fa-lg"></i>
            <span>Formação do Professor</span>
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
              <i class="fa-solid fa-file-export"></i> Exportar
            </button>
            <button
              class="btn btn-primary btn-sm btn-new-alter px-3 py-1 ms-auto"
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
              <th
                scope="col"
                class="sortable border-end"
                data-column="professorId"
              >
                <div
                  class="d-flex align-items-center justify-content-between pe-2"
                >
                  <div
                    class="col d-flex align-items-center justify-content-between"
                  >
                    <span>Professor</span>
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
                data-column="modalidadeEscola"
              >
                <div
                  class="d-flex align-items-center justify-content-between pe-2"
                >
                  <div
                    class="col d-flex align-items-center justify-content-between"
                  >
                    <span>Modalidade escola</span>
                    <i class="fas fa-sort me-3" style="color: #dddddd"></i>
                  </div>
                  <div class="dropdown-form">
                    <div class="dropdown-toggle-form" id="dropdownButton3">
                      <i class="fas fa-search" style="color: #dddddd"></i>
                    </div>
                    <div
                      class="dropdown-content-form rounded-3 dropdown-content-left"
                      id="dropdownContent3"
                    >
                      <input
                        type="text"
                        class="form-control mb-3 searchInput"
                        placeholder="Digite..."
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
                data-column="nomeCurso"
              >
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
              <th scope="col" class="sortable border-end" data-column="ies">
                <div
                  class="d-flex align-items-center justify-content-between pe-2"
                >
                  <div
                    class="col d-flex align-items-center justify-content-between"
                  >
                    <span>IES</span>
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
                data-column="anoConclusao"
              >
                <div
                  class="d-flex align-items-center justify-content-between pe-2"
                >
                  <div
                    class="col d-flex align-items-center justify-content-between"
                  >
                    <span>Ano de conclusão</span>
                    <i class="fas fa-sort me-3" style="color: #dddddd"></i>
                  </div>
                  <div class="dropdown-form">
                    <div class="dropdown-toggle-form" id="dropdownButton6">
                      <i class="fas fa-search" style="color: #dddddd"></i>
                    </div>
                    <div
                      class="dropdown-content-form rounded-3 dropdown-content-left"
                      id="dropdownContent6"
                    >
                      <select
                        class="form-select mb-3 searchInput"
                        aria-label="Ano Conclusão"
                        id="anoConclusaoSearch"
                        required
                        name="anoConclusaoSearch"
                      >
                        <option value="" selected disabled>
                          Selecione o Ano
                        </option>
                      </select>
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
                class="border-end pe-2 th-sem-filtro"
                data-column="ativo"
              >
                Ativo
              </th>
              <th
                scope="col"
                class="border-end pe-2 th-sem-filtro"
                data-column="ativo"
              >
                Ações
              </th>
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
                  <label for="professorId" class="form-label"
                    >Professor:<span class="red">*</span>
                  </label>
                  <select
                    class="form-select"
                    aria-label="Escola"
                    id="professorId"
                    required
                    name="professorId"
                  >
                    <option selected disabled value="">
                      Selecione o professor
                    </option>
                  </select>
                </div>
                <div class="mb-4">
                  <label for="modalidadeEscolaId" class="form-label"
                    >Modalidade Escola:<span class="red">*</span>
                  </label>
                  <select
                    class="form-select"
                    aria-label="Modalidade Escola"
                    id="modalidadeEscolaId"
                    required
                    name="modalidadeEscolaId"
                  >
                    <option selected disabled value="">
                      Selecione uma opção
                    </option>
                  </select>
                </div>
                <div class="mb-4">
                  <label for="nomeCurso" class="form-label"
                    >Nome do curso:<span class="red">*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="nomeCurso"
                    name="nomeCurso"
                    required
                    aria-describedby="nomeCurso"
                    autocomplete="off"
                  />
                </div>
                <div class="mb-4">
                  <label for="ies" class="form-label"
                    >IES:<span class="red">*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="ies"
                    name="ies"
                    required
                    aria-describedby="ies"
                    autocomplete="off"
                  />
                </div>
                <div class="mb-4">
                  <label for="anoConclusao" class="form-label"
                    >Ano de conclusão:<span class="red">*</span>
                  </label>
                  <select
                    class="form-select"
                    aria-label="anoConclusao"
                    id="anoConclusao"
                    required
                    name="anoConclusao"
                  >
                    <option selected disabled value="">Selecione o Ano</option>
                  </select>
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
                  <label for="professorIdEdit" class="form-label"
                    >Professor:<span class="red">*</span>
                  </label>
                  <select
                    class="form-select"
                    aria-label="Escola"
                    id="professorIdEdit"
                    required
                    name="professorIdEdit"
                  >
                    <option selected disabled value="">
                      Selecione o professor
                    </option>
                  </select>
                </div>
                <div class="mb-4">
                  <label for="modalidadeEscolaIdEdit" class="form-label"
                    >Modalidade Escola:<span class="red">*</span>
                  </label>
                  <select
                    class="form-select"
                    aria-label="Modalidade Escola"
                    id="modalidadeEscolaIdEdit"
                    required
                    name="modalidadeEscolaIdEdit"
                  >
                    <option selected disabled value="">
                      Selecione uma opção
                    </option>
                  </select>
                </div>
                <div class="mb-4">
                  <label for="nomeCursoEdit" class="form-label"
                    >Nome do curso:<span class="red">*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="nomeCursoEdit"
                    name="nomeCursoEdit"
                    required
                    aria-describedby="nomeCursoEdit"
                    autocomplete="off"
                  />
                </div>
                <div class="mb-4">
                  <label for="iesEdit" class="form-label"
                    >IES:<span class="red">*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="iesEdit"
                    name="iesEdit"
                    required
                    aria-describedby="iesEdit"
                    autocomplete="off"
                  />
                </div>
                <div class="mb-4">
                  <label for="anoConclusaoEdit" class="form-label"
                    >Ano de conclusão:<span class="red">*</span>
                  </label>
                  <select
                    class="form-select"
                    aria-label="anoConclusaoEdit"
                    id="anoConclusaoEdit"
                    required
                    name="anoConclusaoEdit"
                  >
                    <option selected disabled value="">Selecione o Ano</option>
                  </select>
                </div>

                <div class="d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    onclick='ativar("professorFormacao")'
                    class="ativar btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Ativar
                  </button>
                  <button
                    type="button"
                    onclick='desativar("professorFormacao")'
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

    <script charset="UTF-8"  src="https://cdn.sheetjs.com/xlsx-0.20.1/package/dist/xlsx.full.min.js"></script>

    <script charset="UTF-8" 
      src="https://code.jquery.com/jquery-3.7.1.js"
      integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4="
      crossorigin="anonymous"
    ></script>
    <script charset="UTF-8" 
      src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
      integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
      crossorigin="anonymous"
    ></script>
    <script charset="UTF-8" 
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"
      integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+"
      crossorigin="anonymous"
    ></script>
    <script charset="UTF-8"  src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js"></script>

    <script charset="UTF-8"  src="<%=contextPath%>/resources/assets/js/professores/formacao.js"></script>
    <script charset="UTF-8"  src="<%=contextPath%>/resources/assets/js/comum.js"></script>
    <script charset="UTF-8"  src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>
  </body>
</html>
