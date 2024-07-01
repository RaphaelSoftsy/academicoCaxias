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
<script charset="UTF-8" src="https://kit.fontawesome.com/2476720ce5.js"
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
					<i class="fa-solid fa-plus fa-lg"></i><span id="h1-curso">Novo
						Cadastro</span>
				</div>
			</div>
		</section>
		<section class="pt-4">
			<form id="formNovoCadastro"
				class="card form p-5 col-12 animate__animated animate__bounceInUp d-flex flex-column justify-content-center">
				<h1 id="tituloForm" class="text-center mb-5">Cadastrar Usuário</h1>

				<div class="row mb-3">
					<div class="col-md-6" id="alterarSenha">
						<label for="alterarSenha" class="form-label"> Alterar Senha:<span
							class="red">*</span>
						</label>
						<div class="form-control">
							<label for="alterarSenha">Sim</label> <label class="switch">
								<input type="checkbox" id="alterarSenha" name="alterarSenha">
								<span class="slider"></span>
							</label> <label for="alterarSenha">Não</label>
						</div>
					</div>
					<div class="col-md-6" id="divNovaSenha">
						<label for="novaSenha" class="form-label">Nova Senha:<span
							class="red">*</span>
						</label> <input type="password" id="novaSenha" required autocomplete="off"
							name="novaSenha" class="form-control" />
					</div>
				</div>
				
				<div class="row mb-3">
					<div class="col-md-6">
						<label for="nomeCompleto" class="form-label">Nome
							Completo:<span class="red">*</span>
						</label> <input type="text" id="nomeCompleto" required autocomplete="off"
							name="nomeCompleto" class="form-control" />
					</div>

					<div class="col-md-6">
						<label for="email" class="form-label">Email:<span
							class="red">*</span>
						</label> <input type="email" id="email" required autocomplete="off"
							name="email" class="form-control" />
					</div>

				</div>

				<div class="row mb-3">
					<div class="col-md-6" id="cardCpf">
						<label for="cpf" class="form-label">CPF:<span class="red">*</span>
						</label> <input type="text" id="cpf" required autocomplete="off"
							name="cpf" data-mask="000-000-000-00" class="form-control" />
					</div>
					<div class="col-md-6">
						<label for="celular" class="form-label">Celular:<span
							class="red">*</span>
						</label> <input type="text" id="celular" required autocomplete="off"
							name="celular" data-mask="(00)00000-0000" class="form-control" />
					</div>
				</div>
				<div class="row mb-3">
					<div class="col-md-6">
						<label for="usuario" class="form-label">Nome de Usuário:<span
							class="red">*</span>
						</label> <input type="text" id="usuario" required autocomplete="off"
							name="usuario" class="form-control" />
					</div>
					<div class="col-md-6">
						<label for="dataNascimento" class="form-label">Data de Nascimento:<span class="red">*</span></label>
						<input type='date' class="form-control" id="dataNascimento"
							required name="dataNascimento" />
					</div>
				</div>
				
				<div class="row mb-3">
					<div class="col-md-6" id="divSenha">
						<label for="senha" class="form-label">Senha:<span
							class="red">*</span>
						</label> <input type="password" id="senha" required autocomplete="off"
							name="senha" class="form-control" />
					</div>
				</div>

				<div class="col-md-12 text-center mt-3">
					<button type="submit" class="btn btn-primary px-5"
						id="btn-adicionar">Adicionar</button>
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
		src="<%=contextPath%>/resources/assets/js/comum.js"></script>
	<script charset="UTF-8"
		src="<%=contextPath%>/resources/assets/js/acessos/novoUsuario.js"></script>
	<script charset="UTF-8"
		src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>
</body>
</html>
