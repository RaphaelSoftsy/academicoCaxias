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

<title></title>

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
					<i class="fa-solid fa-plus fa-lg"></i><span>Configurar
						Padrão De Acesso</span>
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
						<label for="nome" class="form-label">Contas:<span
							class="red">*</span></label> <select class="form-select"
							aria-label="Conta" id="inputContaID" required name="inputContaID">
							<option selected disabled>Selecione a conta</option>
						</select>
					</div>

				</div>

				<div class="card card-check">
					<div class="card-header">Categoria Escola Privada</div>

					<div class="card-body">
						<div class="row mb-3">
							<div class="col-md-6 small-inputs small-inputs">
								<label for="categoriaEscolaPrivada" class="form-label">Aparecer
									no menu:<span class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isAcessivel" id="isCategoriaEscolaPrivadaN" value="S">
										<label class="form-check-label" for="isCategoriaEscolaPrivada">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isAcessivel" id="isCategoriaEscolaPrivadaS" value="N">
										<label class="form-check-label" for="isCategoriaEscolaPrivada">Não</label>
									</div>
								</div>
							</div>
							<div class="col-md-6 small-inputs">
								<label for="isLeitura" class="form-label">Leitura:<span
									class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isLeituraCategoriaEscolarPrivada"
											id="isLeituraCategoriaEscolaPrivadaS" value="S"> <label
											class="form-check-label"
											for="isLeituraCategoriaEscolaPrivada">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isLeituraCategoriaEscolarPrivada"
											id="isLeituraCategoriaEscolaPrivadaN" value="N"> <label
											class="form-check-label"
											for="isLeituraCategoriaEscolaPrivada">Não</label>
									</div>
								</div>
							</div>
							<div class="col-md-6 small-inputs">
								<label for="isEscrita" class="form-label">Escrita:<span
									class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isEscritaCategoriaEscolaPrivada"
											id="isEscritaCategoriaEscolaPrivadaS" value="S"> <label
											class="form-check-label"
											for="isEscritaCategoriaEscolaPrivada">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isEscritaCategoriaEscolaPrivada"
											id="isEscritaCategoriaEscolaPrivadaN" value="N"> <label
											class="form-check-label"
											for="isEscritaCategoriaEscolaPrivada">Não</label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="card card-check">
					<div class="card-header">Destinação de lixo</div>

					<div class="card-body">
						<div class="row mb-3">
							<div class="col-md-6 small-inputs">
								<label for="merendaEscolar" class="form-label">Aparecer
									no menu::<span class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isDestinacaoLixo" id="isDestinacaoLixorS" value="S">
										<label class="form-check-label" for="isDestinacaoLixo">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isDestinacaoLixo" id="isDestinacaoLixorN" value="N">
										<label class="form-check-label" for="isDestinacaoLixo">Não</label>
									</div>
								</div>
							</div>
							<div class="col-md-6 small-inputs">
								<label for="possuiAguaPotavel" class="form-label">Leitura<span
									class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isLeituraDestinacaoLixo" id="possuiAguaPotavelS"
											value="S"> <label class="form-check-label"
											for="isLeituraDestinacaoLixo">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isLeituraDestinacaoLixo" id="possuiAguaPotavelN"
											value="N"> <label class="form-check-label"
											for="isLeituraDestinacaoLixo">Não</label>
									</div>
								</div>
							</div>

							<div class="col-md-6 small-inputs">
								<label for="possuiAguaPotavel" class="form-label">Escrita<span
									class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isEscritaDestinacaoLixo" id="isEscritaDestinacaoLixoS"
											value="S"> <label class="form-check-label"
											for="isEscritaDestinacaoLixo">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isEscritaDestinacaoLixo" id="isEscritaDestinacaoLixoN"
											value="N"> <label class="form-check-label"
											for="isEscritaDestinacaoLixo">Não</label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="card card-check">
					<div class="card-header">Entidade Superior</div>

					<div class="card-body">
						<div class="row mb-3">
							<div class="col-md-6 small-inputs">
								<label for="merendaEscolar" class="form-label">Aparecer
									no menu:<span class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isEntidadeSuperior" id="isEntidadeSuperiorS" value="S">
										<label class="form-check-label" for="isEntidadeSuperior">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isEntidadeSuperior" id="isEntidadeSuperiorN" value="N">
										<label class="form-check-label" for="isEntidadeSuperior">Não</label>
									</div>
								</div>
							</div>
							<div class="col-md-6 small-inputs">
								<label for="possuiAguaPotavel" class="form-label">Leitura<span
									class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isLeituraEntidadeSuperior"
											id="isLeituraEntidadeSuperiorS" value="S"> <label
											class="form-check-label" for="isLeituraEntidadeSuperior">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isLeituraEntidadeSuperior"
											id="isLeituraEntidadeSuperiorN" value="N"> <label
											class="form-check-label" for="isLeituraEntidadeSuperior">Não</label>
									</div>
								</div>
							</div>

							<div class="col-md-6 small-inputs">
								<label for="possuiAguaPotavel" class="form-label">Escrita<span
									class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isEscritaEntidadeSuperior"
											id="isEscritaEntidadeSuperiorS" value="S"> <label
											class="form-check-label" for="isEscritaEntidadeSuperior">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isEscritaEntidadeSuperior"
											id="isEscritaEntidadeSuperiorN" value="N"> <label
											class="form-check-label" for="isEscritaEntidadeSuperior">Não</label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="card card-check">
					<div class="card-header">Equipamentos</div>

					<div class="card-body">
						<div class="row mb-3">
							<div class="col-md-6 small-inputs">
								<label for="merendaEscolar" class="form-label">Aparecer
									no menu:<span class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isEquipamento" id="isEquipamentoN" value="S"> <label
											class="form-check-label" for="isEquipamento">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isEquipamento" id="isEquipamentoN" value="N"> <label
											class="form-check-label" for="isEquipamento">Não</label>
									</div>
								</div>
							</div>
							<div class="col-md-6 small-inputs">
								<label for="possuiAguaPotavel" class="form-label">Leitura<span
									class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isLeituraEquipamento" id="isLeituraEquipamentoS"
											value="S"> <label class="form-check-label"
											for="isLeituraEquipamento">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isLeituraEquipamento" id="isLeituraEquipamentoN"
											value="N"> <label class="form-check-label"
											for="isLeituraEquipamento">Não</label>
									</div>
								</div>
							</div>

							<div class="col-md-6 small-inputs">
								<label for="possuiAguaPotavel" class="form-label">Escrita<span
									class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isEscritaEquipamento" id="isEscritaEquipamentoS"
											value="S"> <label class="form-check-label"
											for="isEscritaEquipamento">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isEscritaEquipamento" id="isEscritaEquipamentoN"
											value="N"> <label class="form-check-label"
											for="isEscritaEquipamento">Não</label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="card card-check">
					<div class="card-header">Unidade Física</div>

					<div class="card-body">
						<div class="row mb-3">
							<div class="col-md-6 small-inputs">
								<label for="merendaEscolar" class="form-label">Aparecer
									no menu:<span class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isUnidadeFisica" id="isUnidadeFisicaS" value="S">
										<label class="form-check-label" for="isUnidadeFisica">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isUnidadeFisica" id="isUnidadeFisicaN" value="N">
										<label class="form-check-label" for="isUnidadeFisica">Não</label>
									</div>
								</div>
							</div>
							<div class="col-md-6 small-inputs">
								<label for="possuiAguaPotavel" class="form-label">Leitura<span
									class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isLeituraUnidadeFisica" id="isLeituraUnidadeFisicaS"
											value="S"> <label class="form-check-label"
											for="isLeituraUnidadeFisica">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isLeituraUnidadeFisica" id="isLeituraUnidadeFisicaN"
											value="N"> <label class="form-check-label"
											for="isLeituraUnidadeFisica">Não</label>
									</div>
								</div>
							</div>

							<div class="col-md-6 small-inputs">
								<label for="possuiAguaPotavel" class="form-label">Escrita<span
									class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isEscritaUnidadeFisica" id="isEscritaUnidadeFisicaS"
											value="S"> <label class="form-check-label"
											for="isEscritaUnidadeFisica">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isEscritaUnidadeFisica" id="isEscritaUnidadeFisicaN"
											value="N"> <label class="form-check-label"
											for="isEscritaUnidadeFisica">Não</label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>


				<div class="card card-check">
					<div class="card-header">Escola</div>

					<div class="card-body">
						<div class="row mb-3">
							<div class="col-md-6 small-inputs">
								<label for="merendaEscolar" class="form-label">Aparecer
									no menu:<span class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio" name="isEscola"
											id="isEscolaS" value="S"> <label
											class="form-check-label" for="isEscola">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio" name="isEscola"
											id="isEscolaN" value="N"> <label
											class="form-check-label" for="isEscola">Não</label>
									</div>
								</div>
							</div>
							<div class="col-md-6 small-inputs">
								<label for="possuiAguaPotavel" class="form-label">Leitura<span
									class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isLeituraEscola" id="isLeituraEscolaS" value="S">
										<label class="form-check-label" for="isLeituraEscola">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isLeituraEscola" id="isLeituraEscolaN" value="N">
										<label class="form-check-label" for="isLeituraEscola">Não</label>
									</div>
								</div>
							</div>

							<div class="col-md-6 small-inputs">
								<label for="possuiAguaPotavel" class="form-label">Escrita<span
									class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isEscritaEscola" id="isEscritaEscolaS" value="S">
										<label class="form-check-label" for="isEscritaEscola">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isEscritaEscola" id="isEscritaEscolaN" value="N">
										<label class="form-check-label" for="isEscritaEscola">Não</label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>



				<div class="card card-check">
					<div class="card-header">Esgotamento Sanitário</div>
					<div class="card-body">
						<div class="row mb-3">
							<div class="col-md-6 small-inputs">
								<label for="merendaEscolar" class="form-label">Aparecer
									no menu:<span class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isEsgotamentoSanitario" id="isEsgotamentoSanitarioS"
											value="S"> <label class="form-check-label"
											for="isEsgotamentoSanitario">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isEsgotamentoSanitario" id="isEsgotamentoSanitarioN"
											value="N"> <label class="form-check-label"
											for="isEsgotamentoSanitario">Não</label>
									</div>
								</div>
							</div>
							<div class="col-md-6 small-inputs">
								<label for="possuiAguaPotavel" class="form-label">Leitura<span
									class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isLeituraEsgotamentoSanitario"
											id="isLeituraEsgotamentoSanitarioS" value="S"> <label
											class="form-check-label" for="isLeituraEsgotamentoSanitario">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isLeituraEsgotamentoSanitario"
											id="isLeituraEsgotamentoSanitarioN" value="N"> <label
											class="form-check-label" for="isLeituraEsgotamentoSanitario">Não</label>
									</div>
								</div>
							</div>

							<div class="col-md-6 small-inputs">
								<label for="possuiAguaPotavel" class="form-label">Escrita<span
									class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isEscritaEsgotamentoSanitario"
											id="isEscritaEsgotamentoSanitarioN" value="S"> <label
											class="form-check-label" for="isEscritaEsgotamentoSanitario">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isEscritaEsgotamentoSanitario"
											id="isEscritaEsgotamentoSanitarioN" value="N"> <label
											class="form-check-label" for="isEscritaEsgotamentoSanitario">Não</label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>


				<div class="card card-check">
					<div class="card-header">Fonte de Energia</div>

					<div class="card-body">
						<div class="row mb-3">
							<div class="col-md-6 small-inputs">
								<label for="merendaEscolar" class="form-label">Aparecer
									no menu:<span class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isFonteEnergia" id="isFonteEnergiaS" value="S">
										<label class="form-check-label" for="isFonteEnergia">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isFonteEnergia" id="isFonteEnergiaN" value="N">
										<label class="form-check-label" for="isFonteEnergia">Não</label>
									</div>
								</div>
							</div>
							<div class="col-md-6 small-inputs">
								<label for="possuiAguaPotavel" class="form-label">Leitura<span
									class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isLeituraFonteEnergia" id="isLeituraFonteEnergiaS"
											value="S"> <label class="form-check-label"
											for="isLeituraFonteEnergia">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isLeituraFonteEnergia" id="isLeituraFonteEnergiaN"
											value="N"> <label class="form-check-label"
											for="isLeituraFonteEnergia">Não</label>
									</div>
								</div>
							</div>

							<div class="col-md-6 small-inputs">
								<label for="possuiAguaPotavel" class="form-label">Escrita<span
									class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isEscritaFonteEnergia" id="isEscritaFonteEnergiaS"
											value="S"> <label class="form-check-label"
											for="isEscritaFonteEnergia">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isEscritaFonteEnergia" id="isEscritaFonteEnergiaN"
											value="N"> <label class="form-check-label"
											for="isEscritaFonteEnergia">Não</label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>


				<div class="card card-check">
					<div class="card-header">Forma de Ocupação</div>

					<div class="card-body">
						<div class="row mb-3">
							<div class="col-md-6 small-inputs">
								<label for="merendaEscolar" class="form-label">Aparecer
									no menu:<span class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isFormaOcupacao" id="isFormaOcupacaoS" value="S">
										<label class="form-check-label" for="isFormaOcupacao">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isFormaOcupacao" id="isFormaOcupacaoN" value="N">
										<label class="form-check-label" for="isFormaOcupacao">Não</label>
									</div>
								</div>
							</div>
							<div class="col-md-6 small-inputs">
								<label for="possuiAguaPotavel" class="form-label">Leitura<span
									class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isLeituraFormaOcupacao" id="isLeituraFormaOcupacaoS"
											value="S"> <label class="form-check-label"
											for="isLeituraFormaOcupacao">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isLeituraFormaOcupacao" id="isLeituraFormaOcupacaoN"
											value="N"> <label class="form-check-label"
											for="isLeituraFormaOcupacao">Não</label>
									</div>
								</div>
							</div>

							<div class="col-md-6 small-inputs">
								<label for="possuiAguaPotavel" class="form-label">Escrita<span
									class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isEscritaFormaOcupacao" id="isEscritaFormaOcupacaoS"
											value="S"> <label class="form-check-label"
											for="isEscritaFormaOcupacao">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isEscritaFormaOcupacao" id="isEscritaFormaOcupacaoN"
											value="N"> <label class="form-check-label"
											for="isEscritaFormaOcupacao">Não</label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>


				<div class="card card-check">
					<div class="card-header">Fornecimento de Água</div>

					<div class="card-body">
						<div class="row mb-3">
							<div class="col-md-6 small-inputs">
								<label for="merendaEscolar" class="form-label">Aparecer
									no menu:<span class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isFornecimentoAgua" id="isFornecimentoAguaS" value="S">
										<label class="form-check-label" for="isFornecimentoAgua">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isFornecimentoAgua" id="isFornecimentoAguaN" value="N">
										<label class="form-check-label" for="isFornecimentoAgua">Não</label>
									</div>
								</div>
							</div>
							<div class="col-md-6 small-inputs">
								<label for="possuiAguaPotavel" class="form-label">Leitura<span
									class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isLeituraFornecimentoAgua"
											id="isLeituraFornecimentoAguaS" value="S"> <label
											class="form-check-label" for="isLeituraFornecimentoAgua">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isLeituraFornecimentoAgua"
											id="isLeituraFornecimentoAguaN" value="N"> <label
											class="form-check-label" for="isLeituraFornecimentoAgua">Não</label>
									</div>
								</div>
							</div>

							<div class="col-md-6 small-inputs">
								<label for="possuiAguaPotavel" class="form-label">Escrita<span
									class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isEscritaFornecimentoAgua"
											id="isEscritaFornecimentoAguaS" value="S"> <label
											class="form-check-label" for="isEscritaFornecimentoAgua">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="possuiAguaPotavel" id="isEscritaFornecimentoAguaN"
											value="N"> <label class="isEscritaFornecimentoAgua"
											for="isEscritaFornecimentoAgua">Não</label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="card card-check">
					<div class="card-header">Lingua de ensino</div>

					<div class="card-body">
						<div class="row mb-3">
							<div class="col-md-6 small-inputs">
								<label for="merendaEscolar" class="form-label">Aparecer
									no menu:<span class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isLinguaEnsino" id="isLinguaEnsinoS" value="S">
										<label class="form-check-label" for="isLinguaEnsino">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isLinguaEnsino" id="isLinguaEnsinoN" value="N">
										<label class="form-check-label" for="isLinguaEnsino">Não</label>
									</div>
								</div>
							</div>
							<div class="col-md-6 small-inputs">
								<label for="possuiAguaPotavel" class="form-label">Leitura<span
									class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isLeituraLinguaEnsino" id="isLeituraLinguaEnsinoS"
											value="S"> <label class="form-check-label"
											for="isLeituraLinguaEnsino">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isLeituraLinguaEnsino" id="isLeituraLinguaEnsinoN"
											value="N"> <label class="form-check-label"
											for="isLeituraLinguaEnsino">Não</label>
									</div>
								</div>
							</div>

							<div class="col-md-6 small-inputs">
								<label for="possuiAguaPotavel" class="form-label">Escrita<span
									class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isEscritaLinguaEnsino" id="isEscritaLinguaEnsinoS"
											value="S"> <label class="form-check-label"
											for="isEscritaLinguaEnsino">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isEscritaLinguaEnsino" id="isEscritaLinguaEnsinoN"
											value="N"> <label class="form-check-label"
											for="isEscritaLinguaEnsino">Não</label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>


				<div class="card card-check">
					<div class="card-header">Tipo de Localização</div>

					<div class="card-body">
						<div class="row mb-3">
							<div class="col-md-6 small-inputs">
								<label for="merendaEscolar" class="form-label">Aparecer
									no menu::<span class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="merendaEscolar" id="merendaEscolarS" value="S">
										<label class="form-check-label" for="merendaEscolarS">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="merendaEscolar" id="merendaEscolarN" value="N">
										<label class="form-check-label" for="merendaEscolarN">Não</label>
									</div>
								</div>
							</div>
							<div class="col-md-6 small-inputs">
								<label for="possuiAguaPotavel" class="form-label">Leitura<span
									class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="possuiAguaPotavel" id="possuiAguaPotavelS" value="S">
										<label class="form-check-label" for="possuiAguaPotavelS">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="possuiAguaPotavel" id="possuiAguaPotavelN" value="N">
										<label class="form-check-label" for="possuiAguaPotavelN">Não</label>
									</div>
								</div>
							</div>

							<div class="col-md-6 small-inputs">
								<label for="possuiAguaPotavel" class="form-label">Escrita<span
									class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="possuiAguaPotavel" id="possuiAguaPotavelS" value="S">
										<label class="form-check-label" for="possuiAguaPotavelS">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="possuiAguaPotavel" id="possuiAguaPotavelN" value="N">
										<label class="form-check-label" for="possuiAguaPotavelN">Não</label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>


				<div class="card card-check">
					<div class="card-header">Marca Equipamento</div>

					<div class="card-body">
						<div class="row mb-3">
							<div class="col-md-6 small-inputs">
								<label for="merendaEscolar" class="form-label">Aparecer
									no menu:<span class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isMarcaEquipamento" id="isMarcaEquipamentoS" value="S">
										<label class="form-check-label" for="isMarcaEquipamento">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isMarcaEquipamento" id="isMarcaEquipamentoN" value="N">
										<label class="form-check-label" for="isMarcaEquipamento">Não</label>
									</div>
								</div>
							</div>
							<div class="col-md-6 small-inputs">
								<label for="possuiAguaPotavel" class="form-label">Leitura<span
									class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isLeituraMarcaEquipamento"
											id="isLeituraMarcaEquipamentoS" value="S"> <label
											class="form-check-label" for="isLeituraMarcaEquipamento">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isLeituraMarcaEquipamento"
											id="isLeituraMarcaEquipamentoN" value="N"> <label
											class="form-check-label" for="isLeituraMarcaEquipamento">Não</label>
									</div>
								</div>
							</div>

							<div class="col-md-6 small-inputs">
								<label for="possuiAguaPotavel" class="form-label">Escrita<span
									class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isEscritaMarcaEquipamento"
											id="isEscritaMarcaEquipamentoS" value="S"> <label
											class="form-check-label" for="isEscritaMarcaEquipamento">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isEscritaMarcaEquipamento"
											id="isEscritaMarcaEquipamentoN" value="N"> <label
											class="form-check-label" for="isEscritaMarcaEquipamento">Não</label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>


				<div class="card card-check">
					<div class="card-header">Modalidade Escolar</div>

					<div class="card-body">
						<div class="row mb-3">
							<div class="col-md-6 small-inputs">
								<label for="merendaEscolar" class="form-label">Aparecer
									no menu:<span class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isModalidadeEscolar" id="isModalidadeEscolarS"
											value="S"> <label class="form-check-label"
											for="isModalidadeEscolar">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isModalidadeEscolar" id="isModalidadeEscolarN"
											value="N"> <label class="form-check-label"
											for="isModalidadeEscolar">Não</label>
									</div>
								</div>
							</div>
							<div class="col-md-6 small-inputs">
								<label for="possuiAguaPotavel" class="form-label">Leitura<span
									class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isLeituraModalidadeEscolar"
											id="isLeituraModalidadeEscolarS" value="S"> <label
											class="form-check-label" for="isLeituraModalidadeEscolar">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isLeituraModalidadeEscolar"
											id="isLeituraModalidadeEscolarN" value="N"> <label
											class="form-check-label" for="isLeituraModalidadeEscolar">Não</label>
									</div>
								</div>
							</div>

							<div class="col-md-6 small-inputs">
								<label for="possuiAguaPotavel" class="form-label">Escrita<span
									class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isEscritaModalidadeEscolar"
											id="isEscritaModalidadeEscolarS" value="S"> <label
											class="form-check-label" for="isEscritaModalidadeEscolar">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isEscritaModalidadeEscolar"
											id="isEscritaModalidadeEscolarN" value="N"> <label
											class="form-check-label" for="isEscritaModalidadeEscolar">Não</label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>




				<div class="card card-check">
					<div class="card-header">Orgão Público</div>

					<div class="card-body">
						<div class="row mb-3">
							<div class="col-md-6 small-inputs">
								<label for="merendaEscolar" class="form-label">Aperecer
									no menu:<span class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isOrgaoPublico" id="isOrgaoPublicoS" value="S">
										<label class="form-check-label" for="isOrgaoPublico">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isOrgaoPublico" id="isOrgaoPublicoN" value="N">
										<label class="form-check-label" for="isOrgaoPublico">Não</label>
									</div>
								</div>
							</div>
							<div class="col-md-6 small-inputs">
								<label for="possuiAguaPotavel" class="form-label">Leitura<span
									class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isLeituraOrgaoPublico" id="isLeituraOrgaoPublicoS"
											value="S"> <label class="form-check-label"
											for="isLeituraOrgaoPublico">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isLeituraOrgaoPublico" id="isLeituraOrgaoPublicoN"
											value="N"> <label class="form-check-label"
											for="isLeituraOrgaoPublico">Não</label>
									</div>
								</div>
							</div>

							<div class="col-md-6 small-inputs">
								<label for="possuiAguaPotavel" class="form-label">Escrita<span
									class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isEscritaOrgaoPublico" id="isEscritaOrgaoPublicoS"
											value="S"> <label class="form-check-label"
											for="isEscritaOrgaoPublico">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isEscritaOrgaoPublico" id="isEscritaOrgaoPublicoN"
											value="N"> <label class="form-check-label"
											for="isEscritaOrgaoPublico">Não</label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="card card-check">
					<div class="card-header">Periodicidade:</div>

					<div class="card-body">
						<div class="row mb-3">
							<div class="col-md-6 small-inputs">
								<label for="merendaEscolar" class="form-label">Aparecer
									no menu: <span class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isPeriodicidade" id="isPeriodicidadeS" value="S">
										<label class="form-check-label" for="isPeriodicidade">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isPeriodicidade" id="isPeriodicidadeN" value="N">
										<label class="form-check-label" for="isPeriodicidade">Não</label>
									</div>
								</div>
							</div>
							<div class="col-md-6 small-inputs">
								<label for="possuiAguaPotavel" class="form-label">Leitura<span
									class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isLeituraPeriodicidade" id="isLeituraPeriodicidadeS"
											value="S"> <label class="form-check-label"
											for="isLeituraPeriodicidade">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isLeituraPeriodicidade" id="isLeituraPeriodicidadeN"
											value="N"> <label class="form-check-label"
											for="isLeituraPeriodicidade">Não</label>
									</div>
								</div>
							</div>

							<div class="col-md-6 small-inputs">
								<label for="possuiAguaPotavel" class="form-label">Escrita<span
									class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isEscritaPeriodicidade" id="isEscritaPeriodicidadeS"
											value="S"> <label class="form-check-label"
											for="isEscritaPeriodicidade">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isEscritaPeriodicidade" id="isEscritaPeriodicidadeN"
											value="N"> <label class="form-check-label"
											for="isEscritaPeriodicidade">Não</label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="card card-check">
					<div class="card-header">Provedor Internet</div>

					<div class="card-body">
						<div class="row mb-3">
							<div class="col-md-6 small-inputs">
								<label for="merendaEscolar" class="form-label">Aparecer
									no menu:<span class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isProvedorInternet" id="isProvedorInternetS" value="S">
										<label class="form-check-label" for="isProvedorInternet">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isProvedorInternet" id="isProvedorInternetN" value="N">
										<label class="form-check-label" for="isProvedorInternet">Não</label>
									</div>
								</div>
							</div>
							<div class="col-md-6 small-inputs">
								<label for="possuiAguaPotavel" class="form-label">Leitura<span
									class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isLeituraProvedorInternet"
											id="isLeituraProvedorInternetS" value="S"> <label
											class="form-check-label" for="isLeituraProvedorInternet">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isLeituraProvedorInternet"
											id="isLeituraProvedorInternetN" value="N"> <label
											class="form-check-label" for="isLeituraProvedorInternet">Não</label>
									</div>
								</div>
							</div>

							<div class="col-md-6 small-inputs">
								<label for="possuiAguaPotavel" class="form-label">Escrita<span
									class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isEscritaProvedorInternet"
											id="isEscritaProvedorInternetS" value="S"> <label
											class="form-check-label" for="isEscritaProvedorInternet">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isEscritaProvedorInternet"
											id="isEscritaProvedorInternetN" value="N"> <label
											class="form-check-label" for="isEscritaProvedorInternet">Não</label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>



				<div class="card card-check">
					<div class="card-header">Tipo Dependênca</div>

					<div class="card-body">
						<div class="row mb-3">
							<div class="col-md-6 small-inputs">
								<label for="merendaEscolar" class="form-label">Aparecer
									no menu:<span class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isTipoDependencia" id="isTipoDependenciaS" value="S">
										<label class="form-check-label" for="isTipoDependencia">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isTipoDependencia" id="isTipoDependenciaN" value="N">
										<label class="form-check-label" for="isTipoDependencia">Não</label>
									</div>
								</div>
							</div>
							<div class="col-md-6 small-inputs">
								<label for="possuiAguaPotavel" class="form-label">Leitura<span
									class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isLeituraTipoDependencia"
											id="isLeituraTipoDependenciaS" value="S"> <label
											class="form-check-label" for="isLeituraTipoDependencia">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isLeituraTipoDependencia"
											id="isLeituraTipoDependenciaN" value="N"> <label
											class="form-check-label" for="isLeituraTipoDependencia">Não</label>
									</div>
								</div>
							</div>

							<div class="col-md-6 small-inputs">
								<label for="possuiAguaPotavel" class="form-label">Escrita<span
									class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isEscritaTipoDependencia"
											id="isEscritaTipoDependenciaS" value="S"> <label
											class="form-check-label" for="isEscritaTipoDependencia">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isEscritaTipoDependencia"
											id="isEscritaTipoDependenciaN" value="N"> <label
											class="form-check-label" for="isEscritaTipoDependencia">Não</label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="card card-check">
					<div class="card-header">Tipo Profissional</div>

					<div class="card-body">
						<div class="row mb-3">
							<div class="col-md-6 small-inputs">
								<label for="merendaEscolar" class="form-label">Aparecer
									no menu<span class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isTipoProfissional" id="isTipoProfissionalS" value="S">
										<label class="form-check-label" for="isTipoProfissional">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isTipoProfissional" id="isTipoProfissionalN" value="N">
										<label class="form-check-label" for="isTipoProfissional">Não</label>
									</div>
								</div>
							</div>
							<div class="col-md-6 small-inputs">
								<label for="possuiAguaPotavel" class="form-label">Leitura<span
									class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isLeituraTipoProfissional"
											id="isLeituraTipoProfissionalS" value="S"> <label
											class="form-check-label" for="isLeituraTipoProfissional">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isLeituraTipoProfissional"
											id="isLeituraTipoProfissionalN" value="N"> <label
											class="form-check-label" for="isLeituraTipoProfissional">Não</label>
									</div>
								</div>
							</div>

							<div class="col-md-6 small-inputs">
								<label for="possuiAguaPotavel" class="form-label">Escrita<span
									class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isEscritaTipoProfissional"
											id="isEscritaTipoProfissionalS" value="S"> <label
											class="form-check-label" for="isEscritaTipoProfissional">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isEscritaTipoProfissional"
											id="isEscritaTipoProfissionalN" value="N"> <label
											class="form-check-label" for="isEscritaTipoProfissional">Não</label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>



				<div class="card card-check">
					<div class="card-header">Tratamento de Lixo</div>

					<div class="card-body">
						<div class="row mb-3">
							<div class="col-md-6 small-inputs">
								<label for="merendaEscolar" class="form-label"> Aparecer
									no menu:<span class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isTratamentoLixo" id="isTratamentoLixoS" value="S">
										<label class="form-check-label" for="isTratamentoLixo">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isTratamentoLixo" id="isTratamentoLixoN" value="N">
										<label class="form-check-label" for="isTratamentoLixo">Não</label>
									</div>
								</div>
							</div>
							<div class="col-md-6 small-inputs">
								<label for="possuiAguaPotavel" class="form-label">Leitura<span
									class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isLeituraTratamentoLixo" id="isLeituraTratamentoLixoS"
											value="S"> <label class="form-check-label"
											for="isLeituraTratamentoLixo">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isLeituraTratamentoLixo" id="isLeituraTratamentoLixoN"
											value="N"> <label class="form-check-label"
											for="isLeituraTratamentoLixo">Não</label>
									</div>
								</div>
							</div>

							<div class="col-md-6 small-inputs">
								<label for="possuiAguaPotavel" class="form-label">Escrita<span
									class="red">*</span>
								</label>
								<div class="form-control">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isEscritaTratamentoLixo" id="isEscritaTratamentoLixoS"
											value="S"> <label class="form-check-label"
											for="isEscritaTratamentoLixo">Sim</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio"
											name="isEscritaTratamentoLixo" id="isEscritaTratamentoLixoN"
											value="N"> <label class="form-check-label"
											for="isEscritaTratamentoLixo">Não</label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="card card-check">
					<div class="card-header">Zoneamento</div>

					<div class="card-body">
						<div class="row mb-3">
					<div class="col-md-6 small-inputs">
						<label for="merendaEscolar" class="form-label">Aparecer no menu:<span
							class="red">*</span>
						</label>
						<div class="form-control">
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio"
									name="isZoneamento" id="isZoneamentoS" value="S"> <label
									class="form-check-label" for="isZoneamento">Sim</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio"
									name="merendaEscolar" id="isZoneamentoN" value="N"> <label
									class="form-check-label" for="isZoneamento">Não</label>
							</div>
						</div>
					</div>
					<div class="col-md-6 small-inputs">
						<label for="possuiAguaPotavel" class="form-label">Leitura<span
							class="red">*</span>
						</label>
						<div class="form-control">
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio"
									name="isLeituraZoneamento" id="isLeituraZoneamentoS" value="S">
								<label class="form-check-label" for="isLeituraZoneamento">Sim</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio"
									name="isLeituraZoneamento" id="isLeituraZoneamentoN" value="N">
								<label class="form-check-label" for="isLeituraZoneamento">Não</label>
							</div>
						</div>
					</div>

					<div class="col-md-6 small-inputs">
						<label for="possuiAguaPotavel" class="form-label">Escrita<span
							class="red">*</span>
						</label>
						<div class="form-control">
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio"
									name="isEscritaZoneamento" id="isEscritaZoneamentoS" value="S">
								<label class="form-check-label" for="isEscritaZoneamento">Sim</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio"
									name="isEscritaZoneamento" id="isEscritaZoneamentoN" value="N">
								<label class="form-check-label" for="isEscritaZoneamento">Não</label>
							</div>
						</div>
					</div>
				</div>
					</div>
				</div>

				

				<div class="col-md-12 text-center mt-3">
					<button type="submit" class='btn btn-primary px-5' id='btn-submit'>Cadastrar
						Padrão de Acesso</button>
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
		src="<%=contextPath%>/resources/assets/js/cadastros/novaEscola.js"></script>
	<script charset="UTF-8"  src="<%=contextPath%>/resources/assets/js/comum.js"></script>
	<script charset="UTF-8" 
		src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>
</body>
</html>
