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

<title>POC - Acadêmico Caxias do Sul</title>

<!-- Bootstrap -->
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
	crossorigin="anonymous" />
<script
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
<script
	src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>

<!-- Sweetalert -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="sweetalert2.all.min.js"></script>

<!-- CSS -->

<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
	href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
	rel="stylesheet" />

<!-- FontAwesome -->
<script src="https://kit.fontawesome.com/2476720ce5.js"
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
					<i class="fa-solid fa-school fa-lg"></i> <span>Infraestrutura</span>
				</div>
			</div>
		</section>
		<section class="pt-4" style="width: 70vw">
			<form id="formNovoCadastro"
				class="card form p-5 col-12 animate__animated animate__bounceInUp d-flex flex-column justify-content-center">
				<h1 id="tituloForm" class="text-center mb-5">Nome Escola</h1>
				<input type="text" id="usuarioCadastro" hidden
					value="${funcionario.idUsuario}" />

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="isAcessivel" class="form-label">Escola
							Acessível<span class="red">*</span>
						</label>
						<div class="form-control">
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="isAcessivel"
									id="isAcessivel" value="S"> <label
									class="form-check-label" for="isAcessivel">Sim</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="isAcessivel"
									id="isAcessivel" value="N"> <label
									class="form-check-label" for="isAcessivel">Não</label>
							</div>
						</div>
					</div>
					<div class="col-md-6">
						<label for="isDependenciaAcessivel" class="form-label">Dependencias
							Acessível<span class="red">*</span>
						</label>
						<div class="form-control">
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio"
									name="isDependenciaAcessivel" id="isDependenciaAcessivel"
									value="S"> <label class="form-check-label"
									for="isDependenciaAcessivel">Sim</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio"
									name="isDependenciaAcessivel" id="isDependenciaAcessivel"
									value="N"> <label class="form-check-label"
									for="isDependenciaAcessivel">Não</label>
							</div>
						</div>
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="isSanitariosAcessivel" class="form-label">Sanitários
							Acessível<span class="red">*</span>
						</label>
						<div class="form-control">
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio"
									name="isSanitariosAcessivel" id="isSanitariosAcessivel"
									value="S"> <label class="form-check-label"
									for="isSanitariosAcessivel">Sim</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio"
									name="isSanitariosAcessivel" id="isSanitariosAcessivel"
									value="N"> <label class="form-check-label"
									for="isSanitariosAcessivel">Não</label>
							</div>
						</div>
					</div>
					<div class="col-md-6">
						<label for="isAlimentacaoFornecida" class="form-label">Alimentação
							Fornecida<span class="red">*</span>
						</label>
						<div class="form-control">
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio"
									name="isAlimentacaoFornecida" id="isAlimentacaoFornecida"
									value="S"> <label class="form-check-label"
									for="isAlimentacaoFornecida">Sim</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio"
									name="isAlimentacaoFornecida" id="isAlimentacaoFornecida"
									value="N"> <label class="form-check-label"
									for="isAlimentacaoFornecida">Não</label>
							</div>
						</div>
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="isAguaFiltrada" class="form-label">Água
							Filtrada<span class="red">*</span>
						</label>
						<div class="form-control">
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio"
									name="isAguaFiltrada" id="isAguaFiltrada" value="S"> <label
									class="form-check-label" for="isAguaFiltrada">Sim</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio"
									name="isAguaFiltrada" id="isAguaFiltrada" value="N"> <label
									class="form-check-label" for="isAguaFiltrada">Não</label>
							</div>
						</div>
					</div>
					<div class="col-md-6">
						<label for="isSanitarioEscola" class="form-label">Sanitários
							dentro da Escola<span class="red">*</span>
						</label>
						<div class="form-control">
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio"
									name="isSanitarioEscola" id="isSanitarioEscola" value="S">
								<label class="form-check-label" for="isSanitarioEscola">Sim</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio"
									name="isSanitarioEscola" id="isSanitarioEscola" value="N">
								<label class="form-check-label" for="isSanitarioEscola">Não</label>
							</div>
						</div>
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="isBiblioteca" class="form-label">Biblioteca<span
							class="red">*</span></label>
						<div class="form-control">
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="isBiblioteca"
									id="isBiblioteca" value="S"> <label
									class="form-check-label" for="isBiblioteca">Sim</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="isBiblioteca"
									id="isBiblioteca" value="N"> <label
									class="form-check-label" for="isBiblioteca">Não</label>
							</div>
						</div>
					</div>
					<div class="col-md-6">
						<label for="isCozinha" class="form-label">Cozinha<span
							class="red">*</span>
						</label>
						<div class="form-control">
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="isCozinha"
									id="isCozinha" value="S"> <label
									class="form-check-label" for="isCozinha">Sim</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="isCozinha"
									id="isCozinha" value="N"> <label
									class="form-check-label" for="isCozinha">Não</label>
							</div>
						</div>
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="isLabInformatica" class="form-label">Laboratório
							de Informática<span class="red">*</span>
						</label>
						<div class="form-control">
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio"
									name="isLabInformatica" id="isLabInformatica" value="S">
								<label class="form-check-label" for="isLabInformatica">Sim</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio"
									name="isLabInformatica" id="isLabInformatica" value="N">
								<label class="form-check-label" for="isLabInformatica">Não</label>
							</div>
						</div>
					</div>
					<div class="col-md-6">
						<label for="isLabCiencia" class="form-label">Laboratório
							de Ciência<span class="red">*</span>
						</label>
						<div class="form-control">
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="isLabCiencia"
									id="isLabCiencia" value="S"> <label
									class="form-check-label" for="isLabCiencia">Sim</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="isLabCiencia"
									id="isLabCiencia" value="N"> <label
									class="form-check-label" for="isLabCiencia">Não</label>
							</div>
						</div>
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="isSalaLeitura" class="form-label">Sala de
							Leitura<span class="red">*</span>
						</label>
						<div class="form-control">
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio"
									name="isSalaLeitura" id="isSalaLeitura" value="S"> <label
									class="form-check-label" for="isSalaLeitura">Sim</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio"
									name="isSalaLeitura" id="isSalaLeitura" value="N"> <label
									class="form-check-label" for="isSalaLeitura">Não</label>
							</div>
						</div>
					</div>
					<div class="col-md-6">
						<label for="isQuadraEsportes" class="form-label">Quadra
							Esportes<span class="red">*</span>
						</label>
						<div class="form-control">
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio"
									name="isQuadraEsportes" id="isQuadraEsportes" value="S">
								<label class="form-check-label" for="isQuadraEsportes">Sim</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio"
									name="isQuadraEsportes" id="isQuadraEsportes" value="N">
								<label class="form-check-label" for="isQuadraEsportes">Não</label>
							</div>
						</div>
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="isSalaDiretoria" class="form-label">Sala
							Diretoria<span class="red">*</span>
						</label>
						<div class="form-control">
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio"
									name="isSalaDiretoria" id="isSalaDiretoria" value="S">
								<label class="form-check-label" for="isSalaDiretoria">Sim</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio"
									name="isSalaDiretoria" id="isSalaDiretoria" value="N">
								<label class="form-check-label" for="isSalaDiretoria">Não</label>
							</div>
						</div>
					</div>
					<div class="col-md-6">
						<label for="isSalaProfessores" class="form-label">Sala
							Professores<span class="red">*</span>
						</label>
						<div class="form-control">
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio"
									name="isSalaProfessores" id="isSalaProfessores" value="S">
								<label class="form-check-label" for="isSalaProfessores">Sim</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio"
									name="isSalaProfessores" id="isSalaProfessores" value="N">
								<label class="form-check-label" for="isSalaProfessores">Não</label>
							</div>
						</div>
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="isSalaAtendimentoEspecial" class="form-label">Sala
							Atendimento Especial<span class="red">*</span>
						</label>
						<div class="form-control">
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio"
									name="isSalaAtendimentoEspecial" id="isSalaAtendimentoEspecial"
									value="S"> <label class="form-check-label"
									for="isSalaAtendimentoEspecial">Sim</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio"
									name="isSalaAtendimentoEspecial" id="isSalaAtendimentoEspecial"
									value="N"> <label class="form-check-label"
									for="isSalaAtendimentoEspecial">Não</label>
							</div>
						</div>
					</div>
					<div class="col-md-6">
						<label for="isInternet" class="form-label">Internet<span
							class="red">*</span>
						</label>
						<div class="form-control">
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="isInternet"
									id="isInternet" value="S"> <label
									class="form-check-label" for="isInternet">Sim</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="isInternet"
									id="isInternet" value="N"> <label
									class="form-check-label" for="isInternet">Não</label>
							</div>
						</div>
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="isBandaLarga" class="form-label">Banda Larga<span
							class="red">*</span></label>
						<div class="form-control">
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="isBandaLarga"
									id="isBandaLarga" value="S"> <label
									class="form-check-label" for="isBandaLarga">Sim</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="isBandaLarga"
									id="isBandaLarga" value="N"> <label
									class="form-check-label" for="isBandaLarga">Não</label>
							</div>
						</div>
					</div>
				</div>


				<div class="col-md-12 text-center mt-3">
					<button type="submit" class='btn btn-primary px-5' id='btn-submit'>Salvar</button>
				</div>
			</form>
		</section>

	</main>

	<script
		src="https://cdn.sheetjs.com/xlsx-0.20.1/package/dist/xlsx.full.min.js"></script>

	<script src="https://code.jquery.com/jquery-3.7.1.js"
		integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4="
		crossorigin="anonymous"></script>
	<script
		src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
		integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
		crossorigin="anonymous"></script>
	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"
		integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+"
		crossorigin="anonymous"></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js"></script>

	<script
		src="<%=contextPath%>/resources/assets/js/escolas/disciplinas.js"></script>
	<script src="<%=contextPath%>/resources/assets/js/comum.js"></script>
	<script
		src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>
</body>
</html>