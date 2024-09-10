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

<!-- Sweetalert -->
<script charset="UTF-8"
	src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script charset="UTF-8" src="sweetalert2.all.min.js"></script>

<!-- CSS -->

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
	href="<%=contextPath%>/resources/assets/css/style.css?v=<%=(int)(Math.random()*10000)%>" />

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
					<i class="fa-solid fa-school fa-lg"></i> <span id="tituloForm">Infraestrutura</span>
				</div>
			</div>
		</section>
		<section class="pt-4" style="width: 70vw">
			<form id="formNovoCadastro"
				class="card form p-5 col-12 animate__animated animate__bounceInUp d-flex flex-column justify-content-center">
				<input type="text" id="usuarioCadastro" hidden
					value="${funcionario.idUsuario}" />

				<div class="col-xl-6">
					<span class="infra-title"> Acessibilidade </span>
					<hr>
					<div class="row mb-3" style="gap: 10%;">
						<div class="col-md-3">
							<label for="isAcessivel" class="form-label">Escola
								Acessível<span class="red">*</span>
							</label>
							<div class="form-control card-form-infra">
								<label for="isAcessivel">Sim</label> <label class="switch">
									<input type="checkbox" id="isAcessivel" name="isAcessivel">
									<span class="slider"></span>
								</label> <label for="isAcessivel">Não</label>

							</div>
						</div>
						<div class="col-md-3">
							<label for="isDependenciaAcessivel" class="form-label">Dependencias
								Acessível<span class="red">*</span>
							</label>

							<div class="form-control card-form-infra">
								<label for="isDependenciaAcessivel">Sim</label> <label
									class="switch"> <input type="checkbox"
									id="isDependenciaAcessivel" name="isDependenciaAcessivel">
									<span class="slider"></span>
								</label> <label for="isDependenciaAcessivel">Não</label>

							</div>
						</div>
						<div class="col-md-3">
							<label for="isSanitarioEscola" class="form-label">Sanitários
								dentro da Escola<span class="red">*</span>
							</label>
							<div class="form-control card-form-infra">
								<label for="isSanitarioEscola">Sim</label> <label class="switch">
									<input type="checkbox" id="isSanitarioEscola"
									name="isSanitarioEscola"> <span class="slider"></span>
								</label> <label for="isSanitarioEscola">Não</label>

							</div>
						</div>
						<div class="col-md-3 mt-3">
							<label for="isSanitariosAcessivel" class="form-label">Sanitários
								Acessível<span class="red">*</span>
							</label>
							<div class="form-control card-form-infra">
								<label for="isSanitariosAcessivel">Sim</label> <label
									class="switch"> <input type="checkbox"
									id="isSanitariosAcessivel" name="isSanitariosAcessivel">
									<span class="slider"></span>
								</label> <label for="isSanitariosAcessivel">Não</label>

							</div>
						</div>
					</div>
				</div>


				<div class="col-xl-6 mt-3">
					<span class="infra-title"> Dependências </span>
					<hr>

					<div class="row mb-3" style="gap: 10%;">

						<div class="col-md-3">
							<label for="isBiblioteca" class="form-label">Biblioteca<span
								class="red">*</span></label>
							<div class="form-control card-form-infra">
								<label for="isBiblioteca">Sim</label> <label class="switch">
									<input type="checkbox" id="isBiblioteca" name="isBiblioteca">
									<span class="slider"></span>
								</label> <label for="isBiblioteca">Não</label>

							</div>
						</div>

						<div class="col-md-3">
							<label for="isCozinha" class="form-label">Cozinha<span
								class="red">*</span>
							</label>
							<div class="form-control card-form-infra">
								<label for="isCozinha">Sim</label> <label class="switch">
									<input type="checkbox" id="isCozinha" name="isCozinha">
									<span class="slider"></span>
								</label> <label for="isCozinha">Não</label>

							</div>
						</div>

						<div class="col-md-3">
							<label for="isQuadraEsportes" class="form-label">Quadra
								Esportes<span class="red">*</span>
							</label>
							<div class="form-control card-form-infra">
								<label for="isQuadraEsportes">Sim</label> <label class="switch">
									<input type="checkbox" id="isQuadraEsportes"
									name="isQuadraEsportes"> <span class="slider"></span>
								</label> <label for="isQuadraEsportes">Não</label>
							</div>
						</div>
					</div>
					
					<div class="row mb-3 mt-3" style="gap: 10%;">
							<div class="col-md-3">
								<label for="isSalaDiretoria" class="form-label">Sala
									Diretoria<span class="red">*</span>
								</label>
								<div class="form-control card-form-infra">
									<label for="isSalaDiretoria">Sim</label> <label class="switch">
										<input type="checkbox" id="isSalaDiretoria"
										name="isSalaDiretoria"> <span class="slider"></span>
									</label> <label for="isSalaDiretoria">Não</label>

								</div>
							</div>

							<div class="col-md-3">
								<label for="isSalaLeitura" class="form-label">Sala de
									Leitura<span class="red">*</span>
								</label>
								<div class="form-control card-form-infra">
									<label for="isSalaLeitura">Sim</label> <label class="switch">
										<input type="checkbox" id="isSalaLeitura" name="isSalaLeitura">
										<span class="slider"></span>
									</label> <label for="isSalaLeitura">Não</label>

								</div>
							</div>

							<div class="col-md-3">
								<label for="isSalaProfessores" class="form-label">Sala
									Professores<span class="red">*</span>
								</label>
								<div class="form-control card-form-infra">
									<label for="isSalaProfessores">Sim</label> <label
										class="switch"> <input type="checkbox"
										id="isSalaProfessores" name="isSalaProfessores"> <span
										class="slider"></span>
									</label> <label for="isSalaProfessores">Não</label>

								</div>
							</div>
						</div>
						
						<div class="row mb-3 mt-3" style="gap: 10%;">
							<div class="col-md-3">
							<label for="isSalaAtendimentoEspecial" class="form-label">Sala
								Atendimento Especial<span class="red">*</span>
							</label>
							<div class="form-control card-form-infra">
								<label for="isSalaAtendimentoEspecial">Sim</label> <label
									class="switch"> <input type="checkbox"
									id="isSalaAtendimentoEspecial" name="isSalaAtendimentoEspecial">
									<span class="slider"></span>
								</label> <label for="isSalaAtendimentoEspecial">Não</label>

							</div>
						</div>
						</div>
				</div>

				<div class="col-xl-6 mt-3">
					<span class="infra-title"> Laboratórios </span>
					<hr>

					<div class="row mb-3" style="gap: 10%;">
						<div class="col-md-3">
							<label for="isLabInformatica" class="form-label">Laboratório
								de Informática<span class="red">*</span>
							</label>
							<div class="form-control card-form-infra">
								<label for="isLabInformatica">Sim</label> <label class="switch">
									<input type="checkbox" id="isLabInformatica"
									name="isLabInformatica"> <span class="slider"></span>
								</label> <label for="isLabInformatica">Não</label>

							</div>
						</div>
						<div class="col-md-3">
							<label for="isLabCiencia" class="form-label">Laboratório
								de Ciência<span class="red">*</span>
							</label>
							<div class="form-control card-form-infra">
								<label for="isLabCiencia">Sim</label> <label class="switch">
									<input type="checkbox" id="isLabCiencia" name="isLabCiencia">
									<span class="slider"></span>
								</label> <label for="isLabCiencia">Não</label>

							</div>
						</div>
					</div>
				</div>

				<div class="col-xl-6 mt-3">
					<span class="infra-title"> Serviços </span>
					<hr>

					<div class="row mb-3" style="gap: 10%;">
						<div class="col-md-3">
							<label for="isAguaFiltrada" class="form-label">Água
								Filtrada<span class="red">*</span>
							</label>
							<div class="form-control card-form-infra">
								<label for="isAguaFiltrada">Sim</label> <label class="switch">
									<input type="checkbox" id="isAguaFiltrada"
									name="isAguaFiltrada"> <span class="slider"></span>
								</label> <label for="isAlimisAguaFiltradaentacaoFornecida">Não</label>
							</div>
						</div>

						<div class="col-md-3">
							<label for="isAlimentacaoFornecida" class="form-label">Alimentação
								Fornecida<span class="red">*</span>
							</label>
							<div class="form-control card-form-infra">
								<label for="isAlimentacaoFornecida">Sim</label> <label
									class="switch"> <input type="checkbox"
									id="isAlimentacaoFornecida" name="isAlimentacaoFornecida">
									<span class="slider"></span>
								</label> <label for="isAlimentacaoFornecida">Não</label>

							</div>
						</div>

						<div class="col-md-3">
							<label for="isInternet" class="form-label">Internet<span
								class="red">*</span>
							</label>
							<div class="form-control card-form-infra">
								<label for="isInternet">Sim</label> <label class="switch">
									<input type="checkbox" id="isInternet" name="isInternet">
									<span class="slider"></span>
								</label> <label for="isInternet">Não</label>

							</div>
						</div>

					</div>

					<div class="row mb-3" style="gap: 10%;">
						<div class="col-md-3">
							<label for="isBandaLarga" class="form-label">Banda Larga<span
								class="red">*</span></label>
							<div class="form-control card-form-infra">
								<label for="v">Sim</label> <label class="switch"> <input
									type="checkbox" id="isBandaLarga" name="isBandaLarga">
									<span class="slider"></span>
								</label> <label for="isBandaLarga">Não</label>
							</div>
						</div>
					</div>
				</div>




				<div class="col-md-12 text-center mt-3">
					<button type="submit" class='btn btn-primary px-5' id='btn-submit'
						disabled>Salvar</button>
				</div>
			</form>
		</section>

	</main>

	<script charset="UTF-8"
		src="https://cdn.sheetjs.com/xlsx-0.20.1/package/dist/xlsx.full.min.js"></script>

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
		src="<%=contextPath%>/resources/assets/js/escolas/insfraestrutura.js"></script>
	<script charset="UTF-8"
		src="<%=contextPath%>/resources/assets/js/comum.js"></script>
	<script charset="UTF-8"
		src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>
</body>
</html>