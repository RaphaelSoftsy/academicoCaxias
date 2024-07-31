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
            <i class="fa-solid fa-school fa-lg"></i>
            <span>Licenciamentos Sanitários</span>
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
              <th
                scope="col"
                class="sortable border-end"
                data-column="escolaId"
              >
                <div
                  class="d-flex align-items-center justify-content-between pe-2"
                >
                  <div
                    class="col d-flex align-items-center justify-content-between"
                  >
                    <span>Escola</span>
                    <i class="fas fa-sort me-3" style="color: #dddddd"></i>
                  </div>
                  <div class="dropdown-form">
                    <div class="dropdown-toggle-form" id="dropdownButton1">
                      <i class="fas fa-search" style="color: #dddddd"></i>
                    </div>
                    <div
                      class="dropdown-content-form rounded-3 dropdown-content-left"
                      id="dropdownContent1"
                    >
                      <input
                        type="text"
                        class="form-control mb-3 searchInput"
                        placeholder="Digite o nome da escola"
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
                data-column="licSanitario">
                <div
                  class="d-flex align-items-center justify-content-between pe-2"
                >
                  <div
                    class="col d-flex align-items-center justify-content-between"
                  >
                    <span>Licenciamento</span>
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
                data-column="dataEmissao"
              >
                <div
                  class="d-flex align-items-center justify-content-between pe-2"
                >
                  <div
                    class="col d-flex align-items-center justify-content-between"
                  >
                    <span>Data de Emissão</span>
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
                data-column="dataValidade"
              >
                <div
                  class="d-flex align-items-center justify-content-between pe-2"
                >
                  <div
                    class="col d-flex align-items-center justify-content-between"
                  >
                    <span>Data de Validade</span>
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
                class="border-end pe-2 th-sem-filtro"
                data-column="anexo"
              >
                Anexo
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
                  <label for="licSanitario" class="form-label"
                    >Licenciamento Sanitário:<span class="red">*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="licSanitario"
                    name="licSanitario"
                    required
                    aria-describedby="Licenciamento Sanitário"
                    autocomplete="off"
                  />
                </div>
                <div class="mb-4">
                  <label for="dataEmissao" class="form-label"
                    >Data de Emissão:<span class="red">*</span>
                  </label>
                  <input
                    max="2999-01-01"
                    autocomplete="off"
                    type="date"
                    id="dataEmissao"
                    name="dataEmissao"
                    class="form-control"
                  />
                </div>
                <div class="mb-4">
                  <label for="dataValidade" class="form-label"
                    >Data de validade:<span class="red">*</span>
                  </label>
                  <input
                    max="2999-01-01"
                    autocomplete="off"
                    type="date"
                    id="dataValidade"
                    name="dataValidade"
                    class="form-control"
                  />
                </div>
                <div class="mb-4">
                  <label for="anexo" class="form-label"
                    >Anexo:<span class="red">*</span>
                  </label>
                  <input
                    type="file"
                    name="anexo"
                    id="anexo"
                    class="form-control"
                  />
                </div>
                <div class="mb-4" id="escolaIdStyle">
                  <label for="escolaId" class="form-label"
                    >Escola:<span class="red">*</span>
                  </label>
                  <select
                    class="form-select"
                    aria-label="Escola"
                    id="escolaId"
                    name="escolaId"
                  >
                    <option selected disabled value="">
                      Selecione a Escola
                    </option>
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
                    class="btn btn-primary"
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
                <div class="mb-4" id="escolaIdStyleEdit">
                  <label for="escolaIdEdit" class="form-label"
                    >Escola:<span class="red">*</span>
                  </label>
                  <select
                    class="form-select"
                    aria-label="Escola"
                    id="escolaIdEdit"
                   	>
                    <option selected disabled>Selecione a Escola</option>
                  </select>
                </div>
                <div class="mb-4">
                  <label for="licSanitarioEdit" class="form-label"
                    >Licenciamento Sanitário:<span class="red">*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="licSanitarioEdit"
                    name="licSanitarioEdit"
                    required
                    aria-describedby="Licenciamento Sanitário"
                    autocomplete="off"
                  />
                </div>
                <div class="mb-4">
                  <label for="dataEmissaoEdit" class="form-label"
                    >Data de Emissão:<span class="red">*</span>
                  </label>
                  <input
                    max="2999-01-01"
                    autocomplete="off"
                    type="date"
                    id="dataEmissaoEdit"
                    name="dataEmissaoEdit"
                    class="form-control"
                  />
                </div>
                <div class="mb-4">
                  <label for="dataValidadeEdit" class="form-label"
                    >Data de validade:<span class="red">*</span>
                  </label>
                  <input
                    max="2999-01-01"
                    autocomplete="off"
                    type="date"
                    id="dataValidadeEdit"
                    name="dataValidadeEdit"
                    class="form-control"
                  />
                </div>
                <div class="mb-4">
                  <label for="mudaAnexo" class="form-label"
                    >Alterar Anexo:<span class="red">*</span>
                  </label>
                  <div class="form-control">
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="mudaAnexo"
                        id="mudaAnexoS"
                        value="S"
                      />
                      <label class="form-check-label" for="mudaAnexoS"
                        >Sim</label
                      >
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="mudaAnexo"
                        id="mudaAnexoN"
                        value="N"
                      />
                      <label class="form-check-label" for="mudaAnexoN"
                        >Não</label
                      >
                    </div>
                  </div>
                </div>
                <div class="mb-4" id="divAnexoEdit">
                  <label for="anexoEdit" class="form-label"
                    >Novo Anexo:<span class="red">*</span>
                  </label>
                  <input
                    type="file"
                    name="anexoEdit"
                    id="anexoEdit"
                    class="form-control"
                  />
                </div>
                <div class="d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    onclick='remover("escolaLicSanitario")'
                    class="ativar btn btn-danger"
                    data-bs-dismiss="modal"
                  >
                    Remover
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
                    class="btn btn-primary"
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

    <script charset="UTF-8"  src="<%=contextPath%>/resources/assets/js/escolas/licenciamentoSanitario.js"></script>
    <script charset="UTF-8"  src="<%=contextPath%>/resources/assets/js/comum.js"></script>
    <script charset="UTF-8"  src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>
  </body>
</html>
