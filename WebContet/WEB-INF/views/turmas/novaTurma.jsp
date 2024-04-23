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
					<i class="fa-solid fa-plus fa-lg"></i><span>Novo Cadastro</span>
				</div>
			</div>
		</section>
		<section class="pt-4">
			<form id="formNovoCadastro"
				class="card form p-5 col-12 animate__animated animate__bounceInUp d-flex flex-column justify-content-center">
				<h1 id="tituloForm" class="text-center mb-5">Cadastrar Turma</h1>
				<input type="text" id="usuarioCadastro" hidden
					value="${funcionario.idUsuario}" />

				<div class="row mb-3">
					<div class="col-md-6">
						<label for=escolaId class="form-label">Escola:<span
							class="red">*</span></label> <select class="form-select"
							aria-label="escolaId" id="escolaId" required name="escolaId">
							<option value='' selected disabled>Selecione a Escola</option>

						</select>
					</div>
					<div class="col-md-6">
						<label for="anoVigente" class="form-label">Ano Vigênte:<span
							class="red">*</span></label> <select class="form-select"
							aria-label="Ano Vigente" id="anoVigente" required
							name="anoVigente">
							<option value='' selected disabled>Selecione o Ano</option>

						</select>
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="anoEscolarId" class="form-label">Ano Escolar:<span
							class="red">*</span></label> <select class="form-select"
							aria-label="Ano Escolar" id="anoEscolarId" required
							name="anoEscolarId">
							<option value='' selected disabled>Selecione o Ano</option>

						</select>
					</div>
					<div class="col-md-6">
						<label for="numTurma" class="form-label">Nº da Turma:<span
							class="red">*</span>
						</label> <input type="number" id="numTurma" required autocomplete="off"
							name="numTurma" class="form-control " />
					</div>
				</div>
				<div class="row mb-3">
					<div class="col-md-6">
						<label for="codTurmaInep" class="form-label">Código INEP:<span
							class="red">*</span>
						</label> <input type="text" id="codTurmaInep" required
							autocomplete="off" name="codTurmaInep" class="form-control " />
					</div>
					<div class="col-md-6">
						<label for="formaOrganEnsinoId" class="form-label">Forma
							Organização Ensino:<span class="red">*</span>
						</label> <select class="form-select" aria-label="formaOrganEnsinoId"
							id="formaOrganEnsinoId" required name="formaOrganEnsinoId">
							<option value='' selected disabled>Selecione a Forma</option>

						</select>
					</div>

				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="tipoDeMedicaoId" class="form-label">Tipo de
							Medição:<span class="red">*</span>
						</label> <select class="form-select" aria-label="tipoDeMedicaoId"
							id="tipoDeMedicaoId" required name="tipoDeMedicaoId">
							<option value='' selected disabled>Selecione o Tipo</option>
						</select>
					</div>
					<div class="col-md-6">
						<label for="turnoId" class="form-label">Turno:<span
							class="red">*</span>
						</label> <select class="form-select" aria-label="turnoId" id="turnoId"
							required name="turnoId">
							<option value='' selected disabled>Selecione o Turno</option>
						</select>
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="tipoAtendimentoId" class="form-label">Tipo
							Atendimento:<span class="red">*</span>
						</label> <select class="form-select" aria-label="tipoAtendimentoId"
							id="tipoAtendimentoId" required name="tipoAtendimentoId">
							<option value='' 	elected disabled>Selecione o Tipo</option>
						</select>
					</div>
					<div class="col-md-6">
						<label for="modalidadeEscolaId" class="form-label">Modalidade:<span
							class="red">*</span>
						</label> <select class="form-select" aria-label="modalidadeEscolaId"
							id="modalidadeEscolaId" required name="modalidadeEscolaId">
							<option value='' selected disabled>Selecione a
								Modalidade</option>
						</select>
					</div>
				</div>

				<div class="row mb-5">
					<div class="col-md-6">
						<label for="vagas" class="form-label">Vagas:<span
							class="red">*</span></label> <input type='number' class="form-control"
							id="vagas" required name="vagas" />
					</div>
					<div class="col-md-6">
						<label for="libras" class="form-label">Libras:<span
							class="red">*</span></label>
						<div class="form-control">
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="libras"
									id="librasS" value="S"> <label
									class="form-check-label" for="librasS">Sim</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="libras"
									id="librasN" value="N"> <label
									class="form-check-label" for="librasN">Não</label>
							</div>
						</div>
					</div>

				</div>
				<div class="col-md-12 text-center mt-3">
					<button type="submit" class='btn btn-primary px-5' id='btn-submit'>Cadastrar</button>
				</div>
			</form>
		</section>

	</main>

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
		src="<%=contextPath%>/resources/assets/js/turmas/novaTurma.js"></script>
	<script src="<%=contextPath%>/resources/assets/js/comum.js"></script>
	<script
		src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>
</body>
</html>
