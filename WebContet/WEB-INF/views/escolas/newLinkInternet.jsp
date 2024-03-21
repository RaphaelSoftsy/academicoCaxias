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
				<h1 id="tituloForm" class="text-center mb-5">Cadastrar Internet</h1>

				<div class="row mb-5 justify-content-center">
					<div class="col-md-8">
						<label for="escolaId" class="form-label">Escola:<span
							class="red">*</span>
						</label> <select class="form-select" aria-label="Escola" id="escolaId"
							required name="escolaId">
							<option selected disabled>Selecione a Escola</option>
						</select>
					</div>
				</div>
				
				<div class="row mb-5 justify-content-center">
					<div class="col-md-4">
						<label for="provedorInternetId" class="form-label">Provedor
							da Internet:<span class="red">*</span>
						</label> <select class="form-select" aria-label="Provedor da Internet"
							id="provedorInternetId" required name="provedorInternetId">
							<option selected disabled>Selecione o Provedor</option>
						</select>
					</div>
					<div class="col-md-4">
						<label for="velocidadeMb" class="form-label">Velocidade da Internet:<span class="red">*</span>
						</label> <input type="number" id="velocidadeMb" required
							autocomplete="off" name="velocidadeMb"
							class="form-control" />
					</div>

				</div>

				<div class="row mb-5 justify-content-center">
					<div class="col-md-4">
						<label for="administrativo" class="form-label">Administrativo:<span
							class="red">*</span></label>
						<div class="form-control">
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="administrativo"
									id="administrativoS" value="S"> <label
									class="form-check-label" for="administrativoS">Sim</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="administrativo"
									id="administrativoN" value="N"> <label
									class="form-check-label" for="administrativoN">Não</label>
							</div>
						</div>
					</div>
					<div class="col-md-4">
						<label for="estudante" class="form-label">Estudante:<span class="red">*</span>
						</label>
						<div class="form-control">
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="estudante"
									id="estudanteS" value="S"> <label
									class="form-check-label" for="estudanteS">Sim</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="estudante"
									id="estudanteN" value="N"> <label
									class="form-check-label" for="estudanteN">Não</label>
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
		src="<%=contextPath%>/resources/assets/js/escolas/newLinkInternet.js"></script>
	<script src="<%=contextPath%>/resources/assets/js/comum.js"></script>
	<script
		src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>
</body>
</html>
