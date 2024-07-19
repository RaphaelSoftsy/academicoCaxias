<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>

<%
String contextPath = request.getContextPath();
%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<html>
<head>
<meta charset="ISO-8859-1">
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
<script charset="UTF-8"  src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script charset="UTF-8" 
	src="https://cdnjs.cloudflare.com/ajax/libs/pako/2.0.3/pako.min.js"></script>
<script charset="UTF-8" 
	src="https://cdnjs.cloudflare.com/ajax/libs/bs58/4.0.1/bs58.min.js"></script>
<!-- CSS -->
<link rel="stylesheet"
	href="<%=contextPath%>/resources/assets/css/style.css" />


</head>

<!-- Sweetalert -->
<script charset="UTF-8"  src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script charset="UTF-8"  src="sweetalert2.all.min.js"></script>

<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
	href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
	rel="stylesheet" />

<!-- FontAwesome -->
<script charset="UTF-8"  src="https://kit.fontawesome.com/2476720ce5.js"
	crossorigin="anonymous"></script>
<link rel="stylesheet"
	href="<%=contextPath%>/resources/assets/css/style.css" />
<link rel="stylesheet"
	href="<%=contextPath%>/resources/assets/css/login.css" />
<title></title>
</head>
<body>
	<header>
		<img class="logo-sumare"
			src="http://localhost:8090/front-educacional-caxias/resources/assets/img/logoBranco.png"
			alt="Logo Prefeitura Caxias do Sul" />
	</header>
	<main class="container-section">
		<section class="mb-5">
			<div class="card">
				<div class="card-body title">
					<i class="fa-solid fa-plus fa-lg"></i> <span> Novo Cadastro
						Conta</span>
				</div>
			</div>
		</section>
		<section class="pt-4">
			<form id="formNovoCadastro"
				class="card form p-5 col-12 animate__animated animate__bounceInUp d-flex flex-column justify-content-center">
				<h1 id="tituloForm" class="text-center mb-5">Cadastrar Conta</h1>
				<input type="text" id="usuarioCadastro" hidden
					value="${funcionario.idUsuario}" />

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="conta" class="form-label">Conta:<span
							class="red">*</span></label> <input required autocomplete="off"
							type="text" id="conta" name="conta" class="form-control "
							maxlength="255" />
					</div>
					<div class="col-md-6">
						<label for="tipoConta" class="form-label">Tipo:<span
							class="red">*</span></label> <select class="form-select"
							aria-label="Tipo Conta" id="tipoConta" required
							name="tipoConta">
							<option value='' selected disabled>Selecione o tipo</option>
							<option value="PU">Pública</option>
							<option value="PV">Privada</option>
						</select>
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6" id="cardCNPJ">
						<label for="cnpj" class="form-label">CNPJ:<span
							class="red">*</span></label> <input type="tel" id="cnpj" required
							autocomplete="off" name="cnpj" class="form-control "
							data-mask="00.000.000/0000-00" />
					</div>
					<div class="col-md-6">
						<label for="cep" class="form-label">CEP:<span class="red">*</span></label>
						<input type='tel' class="form-control" id="cep"
							data-mask="00000-000" name="cep" />
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="uf" class="form-label">UF:<span class="red">*</span></label>
						<input type='text' class="form-control" id="uf" disabled name="uf" />
					</div>
					<div class="col-md-6">
						<label for="municipio" class="form-label">Município:<span
							class="red">*</span></label> <input type='tel' class="form-control"
							id="municipio" disabled name="municipio" />
					</div>
				</div>
				<div class="row mb-3">
					<div class="col-md-6">
						<label for="bairro" class="form-label">Bairro:<span
							class="red">*</span></label> <input type='text' class="form-control"
							id="bairro" disabled name="bairro" />
					</div>
					<div class="col-md-6">
						<label for="endereco" class="form-label">Endereço:<span
							class="red">*</span></label> <input type='text' class="form-control"
							id="endereco" disabled name="endereco" />
					</div>
				</div>
				<div class="row mb-3">
					<div class="col-md-6">
						<label for="nome" class="form-label">Complemento:<span
							class="red">*</span></label> <input autocomplete="off"
							type="text" id="complemento" name="complemento"
							class="form-control " maxlength="255" />
					</div>
					<div class="col-md-6">
						<label for="numero" class="form-label">Número:<span
							class="red">*</span></label> <input type='text' class="form-control"
							id="numero" name="numero" />
					</div>
				</div>
				<div class="row mb-3">
					<div class="col-md-6">
						<label for="nome" class="form-label">Distrito:<span
							class="red">*</span></label> <input autocomplete="off"
							type="text" id="distrito" name="distrito"
							class="form-control " maxlength="255" />
					</div>
					<div class="col-md-6">
						<label for="logoConta" class="form-label">Logo:<span
							class="red">*</span></label> <input class="form-control " required
							type="file" id="logoConta" name="logoConta"> </input>
					</div>
				</div>

				<div class="col-md-12 text-center mt-3">
					<button type="submit" class='btn btn-primary px-5' id='btn-submit'>Cadastrar</button>
				</div>
			</form>
		</section>
	</main>

	<script charset="UTF-8"  src="https://code.jquery.com/jquery-3.7.1.js"
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
		src="<%=contextPath%>/resources/assets/js/cadastros/novaConta.js"></script>
	<script charset="UTF-8"  src="<%=contextPath%>/resources/assets/js/comum.js"></script>

	<script charset="UTF-8" 
		src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>
</body>
</html>