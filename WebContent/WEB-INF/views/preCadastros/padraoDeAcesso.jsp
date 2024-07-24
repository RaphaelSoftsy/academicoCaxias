<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>

<%
String contextPath = request.getContextPath();
%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
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
    crossorigin="anonymous" />
<script charset="UTF-8"
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
    crossorigin="anonymous"></script>

<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
    href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
    rel="stylesheet" />
<link
    href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css"
    rel="stylesheet">
<script charset="UTF-8"
    src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>
<script charset="UTF-8"
    src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script charset="UTF-8"
    src="https://cdnjs.cloudflare.com/ajax/libs/pako/2.0.3/pako.min.js"></script>
<script charset="UTF-8"
    src="https://cdnjs.cloudflare.com/ajax/libs/bs58/4.0.1/bs58.min.js"></script>
<!-- CSS -->

<!-- Sweetalert -->
<script charset="UTF-8"
    src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script charset="UTF-8" src="sweetalert2.all.min.js"></script>

<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
    href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
    rel="stylesheet" />

<!-- FontAwesome -->
<script charset="UTF-8" src="
https://kit.fontawesome.com/3ce21ff22c.js"
    crossorigin="anonymous"></script>
<link rel="stylesheet"
    href="<%=contextPath%>/resources/assets/css/style.css" />

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
    <header id="menu"> </header>

   
    <main class="py-4 container-res">
        <section class="mb-5">
            <div class="card">
                <div class="card-body title">
                    <i class="fa-solid fa-plus fa-lg"></i><span>Configurar Padrão De Acesso</span>
                </div>
            </div>
        </section>

        <section class="pt-4">
            <form id="formNovoCadastro"
                class="card form p-5 col-12 animate__animated animate__bounceInUp d-flex flex-column justify-content-center">
                <h1 id="tituloForm" class="text-center mb-5">Padrão De Acesso</h1>
                <input type="text" id="usuarioCadastro" hidden
                    value="${funcionario.idUsuario}" />

                <div class="row mb-3">
                    <div class="col-md-6 small-inputs">
                        <label for="padroesAcessoId" class="form-label">Padrões de Acesso:<span class="red">*</span></label>
                        <select class="form-select" aria-label="Padrão de Acesso" id="padroesAcessoId" required name="padroesAcessoId">
                            <option selected disabled>Selecione o padrão de acesso</option>
                        </select>
                    </div>
                </div>

                <div class="accordion" id="accordionExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingConfig">
                            <button class="accordion-button collapsed" type="button" aria-expanded="false" aria-controls="collapseConfig">
                                Configurações
                            </button>
                        </h2>
                        <div id="collapseConfig" class="accordion-collapse collapse" aria-labelledby="headingConfig" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <!-- Conteúdo das Configurações -->
                                <span class="infra-title">Configurações</span>
                                <hr class="hr-config">
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingEscolas">
                            <button class="accordion-button collapsed" type="button" aria-expanded="false" aria-controls="collapseEscolas">
                                Escolas
                            </button>
                        </h2>
                        <div id="collapseEscolas" class="accordion-collapse collapse" aria-labelledby="headingEscolas" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <!-- Conteúdo das Escolas -->
                                <span class="infra-title">Escolas</span>
                                <hr class="hr-escolas">
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingMatriz">
                            <button class="accordion-button collapsed" type="button" aria-expanded="false" aria-controls="collapseMatriz">
                                Matriz Curricular
                            </button>
                        </h2>
                        <div id="collapseMatriz" class="accordion-collapse collapse" aria-labelledby="headingMatriz" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <!-- Conteúdo da Matriz Curricular -->
                                <span class="infra-title">Matriz Curricular</span>
                                <hr class="hr-matriz">
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingAcesso">
                            <button class="accordion-button collapsed" type="button" aria-expanded="false" aria-controls="collapseAcesso">
                                Acesso
                            </button>
                        </h2>
                        <div id="collapseAcesso" class="accordion-collapse collapse" aria-labelledby="headingAcesso" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <!-- Conteúdo do Acesso -->
                                <span class="infra-title">Acesso</span>
                                <hr class="hr-acesso">
                            </div>
                        </div>
                    </div>
                </div>
                

                <div class="col-md-12 text-center mt-3">
                    <button type="submit" class='btn btn-primary px-5' id='formSubmit'>Salvar Padrão de Acesso</button>
                </div>
            </form>
        </section>
    </main>
   
    <script charset="UTF-8" src="https://code.jquery.com/jquery-3.7.1.js"
        integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4="
        crossorigin="anonymous"></script>
    <script charset="UTF-8"
        src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
        integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
        crossorigin="anonymous"></script>
    <script charset="UTF-8"
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"
        integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+"
        crossorigin="anonymous"></script>
    <script charset="UTF-8"
        src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js"></script>

    <script charset="UTF-8"
        src="<%=contextPath%>/resources/assets/js/padraoDeAcesso.js"></script>
    <script charset="UTF-8"
        src="<%=contextPath%>/resources/assets/js/comum.js"></script>
    <script charset="UTF-8"
        src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>
</body>
</html>
