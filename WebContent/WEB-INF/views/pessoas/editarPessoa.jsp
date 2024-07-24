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
	rel="stylesheet" />
<script charset="UTF-8"
	src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>

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
	<header id="menu"></header>
	<main class="py-4 container-res">
		<section class="mb-5">
			<div class="card">
				<div class="card-body title">
					<i class="fa-solid fa-pen fa-lg"></i><span>Editar Dados</span>
				</div>
			</div>
		</section>
		<section class="pt-4">
			<form id="formNovoCadastro"
				class="card form p-5 col-12 animate__animated animate__bounceInUp d-flex flex-column justify-content-center">
				<h1 id="tituloForm" class="text-center mb-5">Dados da Pessoa</h1>
				<input type="text" id="usuarioCadastro" hidden
					value="${funcionario.idUsuario}" />

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="nome" class="form-label">Nome:<span
							class="red">*</span>
						</label> <input type="text" id="nome" required autocomplete="off"
							name="nome" class="form-control" />
					</div>
					<div class="col-md-6">
						<label for="dependenciaAdmId" class="form-label">Dependência
							administrativa:<span class="red">*</span>
						</label> <select class="form-select"
							aria-label="Dependência Administrativa" id="dependenciaAdmId"
							 name="dependenciaAdmId">
							<option selected disabled>Selecione uma opção</option>
						</select>
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="cpf" class="form-label">CPF:<span
							class="red">*</span>
						</label> <input type="text" id="cpf"  autocomplete="off"
							data-mask="000.000.000-00" name="cpf" class="form-control" />
					</div>
					<div class="col-md-6">
						<label for="dtNascimento" class="form-label">Data
							de nascimento:<span class="red">*</span>
						</label> <input max="2999-01-01" autocomplete="off" type="date"
							id="dtNascimento" required name="dtNascimento"
							class="form-control" />
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="sexo" class="form-label">Sexo:<span
							class="red">*</span></label>
						<div class="form-control">
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="sexo"
									id="feminino" value="F" required/> <label
									class="form-check-label" for="feminino" >Feminino</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="sexo"
									id="masculino" value="M" required/> <label
									class="form-check-label" for="masculino" >Masculino</label>
							</div>
						</div>
					</div>
					<div class="col-md-6">
						<label for="racaId" class="form-label">Raça:<span
							class="red">*</span>
						</label> <select class="form-select" aria-label="Raça" id="racaId"
							 name="racaId">
							<option selected disabled>Selecione uma opção</option>
						</select>
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6 mt-3 mb-3">
						<label for="paisNascimentoId" class="form-label">País
							de nascimento:<span class="red">*</span>
						</label> <select class="form-select" aria-label="País de Nascimento"
							id="paisNascimentoId"  name="paisNascimentoId">
							<option selected disabled>Selecione uma opção</option>
						</select>
					</div>
					<div class="col-md-6 mt-3 mb-3">
						<label for="municipioNascimentoId" class="form-label">Município
							de nascimento:<span class="red">*</span>
						</label> <select class="form-select" aria-label="Município de nascimento"
							id="municipioNascimentoId"  name="municipioNascimentoId">
							<option selected disabled>Selecione uma opção</option>
						</select>
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="ufNascimentoId" class="form-label">Uf
							de nascimento:<span class="red">*</span>
						</label> <select class="form-select" aria-label="País de Residência"
							id="ufNascimentoId"  name="ufNascimentoId">
							<option selected disabled>Selecione uma opção</option>
						</select>
					</div>
					<div class="col-md-6">
						<label for="paisResidenciaId" class="form-label">País
							de residência:<span class="red">*</span>
						</label> <select class="form-select" aria-label="País de Residência"
							id="paisResidenciaId"  name="paisResidenciaId">
							<option selected disabled>Selecione uma opção</option>
						</select>
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="nomePai" class="form-label">Nome
							do Pai:<span class="red">*</span>
						</label> <input type="text" id="nomePai"  autocomplete="off"
							name="nomePai" class="form-control" />
					</div>
					<div class="col-md-6">
						<label for="nomeMae" class="form-label">Nome
							da Mãe:<span class="red">*</span>
						</label> <input type="text" id="nomeMae"  autocomplete="off"
							name="nomeMae" class="form-control" />
					</div>
				</div>

				<!-- endereco -->

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="cep" class="form-label">CEP:<span
							class="red">*</span></label> <input type="tel" class="form-control"
							id="cep" required data-mask="00000-000" name="cep" />
					</div>
					<div class="col-md-6">
						<label for="endereco" class="form-label">Endereco:<span
							class="red">*</span>
						</label> <input type="text" id="endereco"  autocomplete="off"
							disabled name="endereco" class="form-control" />
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="numero" class="form-label">Número:<span
							class="red">*</span>
						</label> <input type="text" id="numero"  autocomplete="off"
							name="numero" class="form-control" />
					</div>
					<div class="col-md-6">
						<label for="complemento" class="form-label">Complemento: </label>
						<input type="text" id="complemento" autocomplete="off"
							name="complemento" class="form-control" />
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="codTurmaInep" class="form-label">Bairro:<span
							class="red">*</span>
						</label> <input disabled type="text" id="bairro" 
							autocomplete="off" name="bairro" class="form-control" />
					</div>
					<div class="col-md-6">
						<label for="codTurmaInep" class="form-label">Município
							:<span class="red">*</span>
						</label> <input disabled type="text" id="municipio" 
							autocomplete="off" name="municipio" class="form-control" />
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="distrito" class="form-label">Distrito:<span
							class="red">*</span>
						</label> <input type="text" id="distrito"  autocomplete="off"
							name="distrito" class="form-control" />
					</div>
					<div class="col-md-6">
						<label for="codTurmaInep" class="form-label">UF:<span
							class="red">*</span>
						</label> <input disabled type="text" id="uf"  autocomplete="off"
							name="uf" class="form-control" />
					</div>
				</div>

				<div class="col-md-12 text-center mt-3">
					<button type="submit" class="btn btn-primary px-5" id="btn-submit">
						Salvar Alterações</button>
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
		src="<%=contextPath%>/resources/assets/js/pessoas/editarPessoa.js"></script>
	<script charset="UTF-8"
		src="<%=contextPath%>/resources/assets/js/comum.js"></script>
	<script charset="UTF-8"
		src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>
</body>
</html>
