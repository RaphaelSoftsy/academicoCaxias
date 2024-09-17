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
    <script charset="UTF-8"  src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script charset="UTF-8"  src="sweetalert2.all.min.js"></script>
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
					<i class="fa-solid fa-school fa-lg"></i> <span>Internet</span>
				</div>
			</div>
		</section>
		<section class="pt-4 card card-table px-5 py-3">
			<div class="mt-3 mb-3"
				style="display: flex; align-items: center; justify-content: end;">

				<div class="d-flex align-items-center gap-2">
					<button id="limpa-filtros" class="btn btn-sm btn-danger">Limpar Filtros</button>
					<button id="exportar-excel"
						class="btn btn-sm btn-success d-flex align-items-center gap-2">
						<i class="fa-solid fa-file-export"></i> Exportar
					</button>
					<a href="cadastro-link-internet" class="btn btn-primary btn-sm btn-new-alter px-3 py-1 ms-auto">Novo Cadastro</a>
				</div>

			</div>

			<table id="tabela-dados"
				class="table tabela-acessar-escolas table-striped mb-0 caption-top mx-auto">
				<caption>Itens Cadastrados</caption>
				<thead>
					<tr>
						<th scope="col" class="sortable border-end"
							data-column="escolaId">
							<div
								class='d-flex align-items-center justify-content-between pe-2'>
								<div
									class="col d-flex align-items-center justify-content-between">
									<span>Escola</span> <i class="fas fa-sort me-3"
										style="color: #dddddd"></i>
								</div>
								<div class="dropdown-form">
									<div class="dropdown-toggle-form" id="dropdownButton1">
										<i class="fas fa-search" style="color: #dddddd"></i>
									</div>
									<div
										class="dropdown-content-form rounded-3 dropdown-content-left"
										id="dropdownContent1">
										<input type="text" class='form-control mb-3 searchInput'
											placeholder="Digite o nome da escola">
										<button class='btn btn-sm col-12 btn-success searchButton'>Buscar</button>
									</div>
								</div>
							</div>
						</th>
						<th scope="col" class="sortable border-end"
							data-column="provedorInternet">
							<div
								class='d-flex align-items-center justify-content-between pe-2'>
								<div
									class="col d-flex align-items-center justify-content-between">
									<span>Provedor Internet</span> <i class="fas fa-sort me-3"
										style="color: #dddddd"></i>
								</div>
								<div class="dropdown-form">
									<div class="dropdown-toggle-form" id="dropdownButton2">
										<i class="fas fa-search" style="color: #dddddd"></i>
									</div>
									<div
										class="dropdown-content-form rounded-3 dropdown-content-left"
										id="dropdownContent2">
										<input type="text" class='form-control mb-3 searchInput'
											placeholder="Digite o nome do provedor">
										<button class='btn btn-sm col-12 btn-success searchButton'>Buscar</button>
									</div>
								</div>
							</div>
						</th>
						<th scope="col" class="sortable border-end"
							data-column="velocidadeMb">
							<div
								class='d-flex align-items-center justify-content-between pe-2'>
								<div
									class="col d-flex align-items-center justify-content-between">
									<span>Velocidade Internet</span> <i class="fas fa-sort me-3"
										style="color: #dddddd"></i>
								</div>
								<div class="dropdown-form">
									<div class="dropdown-toggle-form" id="dropdownButton3">
										<i class="fas fa-search" style="color: #dddddd"></i>
									</div>
									<div
										class="dropdown-content-form rounded-3 dropdown-content-left"
										id="dropdownContent3">
										<input type="text" class='form-control mb-3 searchInput'
											placeholder="Digite a velocidade">
										<button class='btn btn-sm col-12 btn-success searchButton'>Buscar
											</button>
									</div>
								</div>
							</div>
						</th>
						<th scope="col" class="border-end pe-2 th-sem-filtro"
							data-column="Administrativo">Administrativo</th>
							<th scope="col" class="border-end pe-2 th-sem-filtro"
							data-column="Estudante">Estudante</th>
						<th scope="col" class="border-end pe-2 th-sem-filtro"
							data-column="ativo">Ativo</th>
							<th scope="col" class="border-end pe-2 th-sem-filtro"
							data-column="ativo">Ações</th>
					</tr>
				</thead>
				<tbody id="cola-tabela" class="table-group-divider">

				</tbody>
			</table>
			<div id="pagination" class="mx-auto mt-auto">
				<button id="prev" class="btn btn-sm">
					<i class="fa-solid fa-angle-left fa-xl"></i>
				</button>
				<div id="page-numbers" class="btn-group mt-2"></div>
				<button id="next" class="btn btn-sm">
					<i class="fa-solid fa-angle-right fa-xl"></i>
				</button>
			</div>
		</section>

	</main>

	<script charset="UTF-8" 
		src="https://cdn.sheetjs.com/xlsx-0.20.1/package/dist/xlsx.full.min.js"></script>

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
		src="<%=contextPath%>/resources/assets/js/escolas/linkInternet.js"></script>
	<script charset="UTF-8"  src="<%=contextPath%>/resources/assets/js/comum.js"></script>
	<script charset="UTF-8" 
		src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>
</body>
</html>