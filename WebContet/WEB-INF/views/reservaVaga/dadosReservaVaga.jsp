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
<link rel="stylesheet"
	href="<%=contextPath%>/resources/assets/css/reservaVaga.css" />
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
					<i class="fa-solid fa-circle-info" style="font-size: 24px"></i> <span>Dados
						da reserva de vagas</span>
				</div>
			</div>
		</section>

		<section
			class="p-5 card col-12 animate__animated animate__bounceInUp d-flex flex-column justify-content-center">
			<div class="d-flex justify-content-end gap-2">
				<button type="button" class="btn btn-secondary"
					data-bs-dismiss="modal">Fechar</button>
				<button type="submit" id='reprovar' class="btn btn-danger"
					data-bs-dismiss="modal">Reprovar</button>
				<button type="submit" id='aprovar' data-bs-dismiss="modal"
					class="btn btn-success">Aprovar</button>
			</div>
			<nav>
				<div class="nav nav-tabs mb-3" id="nav-tab" role="tablist">
					<button class="nav-link active" id="nav-dados-aluno-tab"
						data-bs-toggle="tab" data-bs-target="#nav-dados-aluno"
						type="button" role="tab" aria-controls="nav-dados-aluno"
						aria-selected="true">Dados do Aluno</button>
					<button class="nav-link" id="nav-responsavel-tab"
						data-bs-toggle="tab" data-bs-target="#nav-responsavel"
						type="button" role="tab" aria-controls="nav-responsavel"
						aria-selected="false">Responsáveis</button>
					<button class="nav-link" id="nav-doc-tab" data-bs-toggle="tab"
						data-bs-target="#nav-doc" type="button" role="tab"
						aria-controls="nav-doc" aria-selected="false">Documentos</button>
					<button class="nav-link" id="nav-disabled-tab" data-bs-toggle="tab"
						data-bs-target="#nav-disabled" type="button" role="tab"
						aria-controls="nav-disabled" aria-selected="false">Ficha
						Médica</button>
				</div>
			</nav>
			<div class="tab-content" id="nav-tabContent">
				<div class="tab-pane fade show active mb-4" id="nav-dados-aluno"
					role="tabpanel" aria-labelledby="nav-dados-aluno-tab" tabindex="0">
					<h2 id="tituloDados" class="mb-3">Dados Pessoais</h2>
					<%-- 	<input type="text" id="usuarioCadastro" hidden
					name="usuarioCadastro" value="${funcionario.idUsuario}" /> --%>

					<div class="row mb-3">
						<div class="col-md-6">
							<label for="nomeCompleto" class="form-label">Nome
								Completo:<span class="red">*</span>
							</label> <input type="text" id="nomeCompleto" required autocomplete="off"
								name="nomeCompleto" class="form-control" />
						</div>
						<div class="col-md-6">
							<label for="tipoIngressoId" class="form-label">Tipo
								Ingresso: </label> <select class="form-select"
								aria-label="Tipo Ingresso" id="tipoIngressoId"
								name="tipoIngressoId">
								<option selected disabled>Selecione uma opção</option>
							</select>
						</div>
					</div>

					<div class="row mb-3">
						<div class="col-md-6">
							<label for="nomeMae" class="form-label">Nome da Mãe: </label> <input
								type="text" id="nomeMae" autocomplete="off" name="nomeMae"
								class="form-control" />
						</div>
						<div class="col-md-6">
							<label for="nomePai" class="form-label">Nome do Pai: </label> <input
								type="text" id="nomePai" autocomplete="off" name="nomePai"
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
										id="feminino" value="F" required /> <label
										class="form-check-label" for="feminino">Feminino</label>
								</div>
								<div class="form-check form-check-inline">
									<input class="form-check-input" type="radio" name="sexo"
										id="masculino" value="M" required /> <label
										class="form-check-label" for="masculino">Masculino</label>
								</div>
							</div>
						</div>

						<div class="col-md-6">
							<label for="dtNascimento" class="form-label">Data de
								Nascimento:<span class="red">*</span>
							</label> <input type="date" id="dtNascimento" required autocomplete="off"
								name="dtNascimento" class="form-control" />
						</div>
					</div>


					<div class="row mb-3">
						<div class="col-md-6" id="cardCpf">
							<label for="cpf" class="form-label">CPF:</label> <input
								type="text" id="cpf" autocomplete="off"
								data-mask="000.000.000-00" name="cpf" class="form-control" />
						</div>
						<!-- <div class="col-md-6">
						<label for="rgNumero" class="form-label">RG:</label> <input
							type="text" id="rgNumero" autocomplete="off"
							data-mask="00.000.000-0" name="rgNumero" class="form-control" />
					</div> -->

						<div class="col-md-6">
							<label for="racaId" class="form-label">Raça:</label> <select
								class="form-select" aria-label="Raça" id="racaId" name="racaId">
								<option selected disabled>Selecione uma opção</option>
							</select>
						</div>
					</div>

					<div class="row mb-3">
						<div class="col-md-6">
							<label for="paisNascimentoId" class="form-label">País de
								Nascimento:</label> <select class="form-select"
								aria-label="País de Nascimento" id="paisNascimentoId" required
								name="paisNascimentoId">
								<option selected disabled>Selecione uma opção</option>
							</select>
						</div>

						<div class="col-md-6">
							<label for="ufNascimentoId" class="form-label">UF de
								Nascimento: </label> <select class="form-select"
								aria-label="UF de Nascimento" id="ufNascimentoId" required
								name="ufNascimentoId">
								<option selected disabled>Selecione uma opção</option>
							</select>
						</div>

					</div>

					<div class="row mb-3">
						<div class="col-md-6"
							style="display: flex; flex-direction: column;">
							<label for="municipioNascimentoId" class="form-label">Município
								de Nascimento: </label> <select class="form-select"
								aria-label="Município de Nascimento" id="municipioNascimentoId"
								required disabled name="municipioNascimentoId">
								<option selected disabled>Selecione uma opção</option>
							</select>
						</div>
						<div class="col-md-6">
							<label for="nacionalidadeId" class="form-label">Nacionalidade:</label>
							<select class="form-select" aria-label="Município de Nascimento"
								id="nacionalidadeId" required name="nacionalidadeId">
								<option selected disabled>Selecione uma opção</option>
							</select>
						</div>
					</div>
					<div class="row mb-3">
						<div class="col-md-6">
							<label for="estadoCivil" class="form-label">Estado Civil:</label>
							<div class="form-control">
								<div class="form-check form-check-inline">
									<input class="form-check-input" type="radio" name="estadoCivil"
										id="estadoCivil" value="so" /> <label
										class="form-check-label" for="solteiro">Solteiro(a)</label>
								</div>
								<div class="form-check form-check-inline">
									<input class="form-check-input" type="radio" name="estadoCivil"
										id="estadoCivil" value="ca" /> <label
										class="form-check-label" for="casado">Casado(a)</label>
								</div>
								<div class="form-check form-check-inline">
									<input class="form-check-input" type="radio" name="estadoCivil"
										id="estadoCivil" value="vi" /> <label
										class="form-check-label" for="viuvo">Viúvo(a)</label>
								</div>
								<div class="form-check form-check-inline">
									<input class="form-check-input" type="radio" name="estadoCivil"
										id="estadoCivil" value="di" /> <label
										class="form-check-label" for="divorciado">Divorciado(a)</label>
								</div>
							</div>
						</div>
					</div>


					<div class="row mb-5">
						<div class="col-md-6" style="display: none" id="rne">
							<label for="isRne" class="form-label">Possui Rne?<span
								class="red">*</span>
							</label>
							<div class="form-control card-form">
								<label for="isRne">Sim</label> <label class="switch"> <input
									type="checkbox" id="isRne" name="isRne"> <span
									class="slider"></span>
								</label> <label for="isRne">Não</label>
							</div>
						</div>
					</div>

					<h2 id="tituloCasamento" class="mb-3">RG</h2>
					<div class="row mb-3">
						<div class="col-md-6">
							<label for="rgNumero" class="form-label">RG:</label> <input
								type="text" id="rgNumero" autocomplete="off"
								data-mask="00.000.000-0" name="rgNumero" class="form-control" />
						</div>

						<div class="col-md-6" id="rgDataExpedicaoDiv">
							<label for="rgDataExpedicao" class="form-label">RG Data
								de Expedição:</label> <input type="date" id="rgDataExpedicao"
								autocomplete="off" name="rgDataExpedicao" class="form-control" />
						</div>
					</div>

					<div class="row mb-3">
						<div class="col-md-6">
							<label for="rgOrgaoExpedidor" class="form-label">Órgão
								Expedidor-RG:</label> <input type="text" id="rgOrgaoExpedidor"
								autocomplete="off" name="rgOrgaoExpedidor" class="form-control" />
						</div>
						<div class="col-md-6">
							<label for="rgUfEmissorId" class="form-label">UF Emissor
								- RG:</label> <select class="form-select" aria-label="RG UF Emissor"
								id="rgUfEmissorId" name="rgUfEmissorId">
								<option selected disabled>Selecione uma opção</option>
							</select>
						</div>
					</div>

					<div class="row mb-3 mt-3">
						<label for="qualPreencher" class="form-label">Qual deseja
							preencher?<span class="red">*</span>
						</label>
						<div class="form-control w-100 card-form qualPreencherSwitch">
							<label for="qualPreencher">Certidão de Nascimento</label> <label
								class="switch"> <input type="checkbox"
								id="qualPreencher" name="qualPreencher"> <span
								class="slider slider-certidao"></span>
							</label> <label for="qualPreencher">Certidão de Casamento</label>
						</div>

						<div class="form-control qualPreencher">
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio"
									name="qualPreencherCheck" id="isCertidaoNascimento" value="s" />
								<label class="form-check-label" for="qualPreencherCheck">Certidão
									de Nascimento</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio"
									name="qualPreencherCheck" id="isCertidaoCasamento" value="c" />
								<label class="form-check-label" for="qualPreencherCheck">Certidão
									de Casamento</label>
							</div>
						</div>
					</div>

					<div id="certidaoNascimento" class="mt-5">
						<h2 id="titulonNascimento" class="mb-3">Certidão de
							Nascimento</h2>

						<div class="row mb-3">
							<div class="col-md-6">
								<label for="certidaoNascimentoNumero" class="form-label">Número:</label>
								<input type="text" id="certidaoNascimentoNumero"
									autocomplete="off" name="certidaoNascimentoNumero"
									class="form-control" />
							</div>

							<div class="col-md-6">
								<label for="certidaoNascimentoCartorio" class="form-label">Cartório
									de registro:</label> <input type="text" id="certidaoNascimentoCartorio"
									autocomplete="off" name="certidaoNascimentoCartorio"
									class="form-control" />
							</div>

						</div>

						<div class="row mb-3">

							<div class="col-md-6">
								<label for="certidaoNascimentoUfCartorioId" class="form-label">UF
									do cartório:</label> <select class="form-select"
									aria-label="Certidão de Nascimento UF Cartório"
									id="certidaoNascimentoUfCartorioId"
									name="certidaoNascimentoUfCartorioId">
									<option selected value="" disabled>Selecione uma opção</option>
								</select>
							</div>

							<div class="col-md-6">
								<label for="certidaoNascimentoCidadeCartorio" class="form-label">Cidade
									do cartório:</label> <select class="form-select"
									aria-label="Certidão de Nascimento UF Cartório"
									id="certidaoNascimentoMunicipioCartorioId"
									name="certidaoNascimentoMunicipioCartorioId" disabled>
									<option selected value="" disabled>Selecione uma opção</option>
								</select>
							</div>
						</div>

						<div class="row mb-3">
							<div class="col-md-6" id='certidaoNascimentoDataEmissaoDiv'>
								<label for="certidaoNascimentoDataEmissao" class="form-label">Data
									de emissão:</label> <input type="date"
									id="certidaoNascimentoDataEmissao" autocomplete="off"
									name="certidaoNascimentoDataEmissao" class="form-control" />
							</div>
							<div class="col-md-6">
								<label for="certidaoNascimentoFolha" class="form-label">Folha:</label>
								<input type="text" id="certidaoNascimentoFolha"
									autocomplete="off" name="certidaoNascimentoFolha"
									class="form-control" />
							</div>
						</div>

						<div class="row mb-3">
							<div class="col-md-6">
								<label for="certidaoNascimentoLivro" class="form-label">Livro:</label>
								<input type="text" id="certidaoNascimentoLivro"
									autocomplete="off" name="certidaoNascimentoLivro"
									class="form-control" />
							</div>
							<div class="col-md-6">
								<label for="certidaoNascimentoOrdem" class="form-label">Ordem:</label>
								<input type="text" id="certidaoNascimentoOrdem"
									autocomplete="off" name="certidaoNascimentoOrdem"
									class="form-control" />
							</div>
						</div>

					</div>
					<div id="certidaoCasamento" class="mt-5">
						<h2 id="tituloCasamento" class="mb-3">Certidão de Casamento</h2>

						<div class="row mb-3">
							<div class="col-md-6">
								<label for="certidaoCasamentoNumero" class="form-label">Número:</label>
								<input type="text" id="certidaoCasamentoNumero"
									autocomplete="off" name="certidaoCasamentoNumero"
									class="form-control" />
							</div>
							<div class="col-md-6">
								<label for="certidaoCasamentoCartorio" class="form-label">Cartório
									de registro:</label> <input type="text" id="certidaoCasamentoCartorio"
									autocomplete="off" name="certidaoCasamentoCartorio"
									class="form-control" />
							</div>
						</div>

						<div class="row mb-3">
							<div class="col-md-6">
								<label for="certidaoCasamentoUfCartorioId" class="form-label">UF
									do cartório:</label> <select class="form-select"
									aria-label="Certidão de Casamento UF Cartório"
									id="certidaoCasamentoUfCartorioId"
									name="certidaoCasamentoUfCartorioId">
									<option selected disabled value="">Selecione uma opção</option>
								</select>
							</div>
							<div class="col-md-6">
								<label for="certidaoCasamentoCidadeCartorioId"
									class="form-label">UF do cartório:</label> <select
									class="form-select"
									aria-label="Certidão de Casamento UF Cartório"
									id="certidaoCasamentoCidadeCartorioId"
									name="certidaoCasamentoCidadeCartorioId" disabled>
									<option selected disabled value="">Selecione uma opção</option>
								</select>
							</div>
						</div>

						<div class="row mb-3">
							<div class="col-md-6">
								<label for="certidaoCasamentoFolha" class="form-label">Folha:</label>
								<input type="text" id="certidaoCasamentoFolha"
									autocomplete="off" name="certidaoCasamentoFolha"
									class="form-control" />
							</div>
							<div class="col-md-6">
								<label for="certidaoCasamentoLivro" class="form-label">Livro:</label>
								<input type="text" id="certidaoCasamentoLivro"
									autocomplete="off" name="certidaoCasamentoLivro"
									class="form-control" />
							</div>
						</div>

						<div class="row mb-3">
							<div class="col-md-6">
								<label for="certidaoCasamentoOrdem" class="form-label">Ordem:</label>
								<input type="text" id="certidaoCasamentoOrdem"
									autocomplete="off" name="certidaoCasamentoOrdem"
									class="form-control" />
							</div>
							<div class="col-md-6" id='certidaoCasamentoDataEmissaoDiv'>
								<label for="certidaoCasamentoDataEmissao" class="form-label">Data
									de emissão:</label> <input type="date"
									id="certidaoCasamentoDataEmissao" autocomplete="off"
									name="certidaoCasamentoDataEmissao" class="form-control" />
							</div>
						</div>
					</div>

				</div>
				<div class="tab-pane fade mb-4" id="nav-responsavel" role="tabpanel"
					aria-labelledby="nav-responsavel-tab" tabindex="0">

					<h2 id="tituloDados" class="mb-3">Dados Pessoais</h2>
					<input type="text" id="usuarioCadastroResponsavel" hidden
						value="${funcionario.idUsuario}" />

					<div class="row mb-3">
						<div class="col-md-6">
							<label for="nomeCompletoResponsavel" class="form-label">Nome
								Completo:<span class="red">*</span>
							</label> <input type="text" id="nomeCompletoResponsavel" required
								autocomplete="off" name="nomeCompletoResponsavel"
								class="form-control" />
						</div>
						<div class="col-md-6">
							<label for="nomeSocialResponsavel" class="form-label">Nome
								Social:</label> <input type="text" id="nomeSocialResponsavel"
								autocomplete="off" name="nomeSocialResponsavel"
								class="form-control" />
						</div>
					</div>

					<div class="row mb-3">
						<div class="col-md-6">
							<label for="relacionamentoIdResponsavel" class="form-label">Relacionamento:<span
								class="red">*</span></label> <select class="form-select" required
								aria-label="Relacionamento" id="relacionamentoIdResponsavel"
								name="relacionamentoIdResponsavel">
								<option selected disabled>Selecione uma opção</option>
							</select>
						</div>
						<div class="col-md-6">
							<label for="emailResponsavel" class="form-label">Email:<span
								class="red">*</span></label> <input type="email" required
								id="emailResponsavel" autocomplete="off" name="emailResponsavel"
								class="form-control" />
						</div>
					</div>

					<div class="row mb-3">
						<div class="col-md-6">
							<label for="sexoResponsavel" class="form-label">Sexo:<span
								class="red">*</span></label>
							<div class="form-control">
								<div class="form-check form-check-inline">
									<input class="form-check-input" type="radio"
										name="sexoResponsavel" id="sexo_FResponsavel" value="F"
										required /> <label class="form-check-label"
										for="sexo_FResponsavel">Feminino</label>
								</div>
								<div class="form-check form-check-inline">
									<input class="form-check-input" type="radio"
										name="sexoResponsavel" id="sexo_MResponsavel" value="M"
										required /> <label class="form-check-label"
										for="sexo_MResponsavel">Masculino</label>
								</div>
							</div>
						</div>

						<div class="col-md-6">
							<label for="dtNascimentoResponsavel" class="form-label">Data
								de Nascimento:<span class="red">*</span>
							</label> <input type="date" id="dtNascimentoResponsavel" required
								autocomplete="off" name="dtNascimentoResponsavel"
								class="form-control" />
						</div>
					</div>

					<div class="row mb-3">
						<div class="col-md-6">
							<label for="telefoneResponsavel" class="form-label">Telefone:</label>
							<input type="tel" id="telefoneResponsavel"
								data-mask="(00) 0000-0000" autocomplete="off"
								name="telefoneResponsavel" class="form-control" />
						</div>
						<div class="col-md-6">
							<label for="celularResponsavel" class="form-label">Celular:<span
								class="red">*</span></label> <input required type="tel"
								id="celularResponsavel" data-mask="(00) 00000-0000"
								autocomplete="off" name="celularResponsavel"
								class="form-control" />
						</div>
					</div>

					<div class="row mb-3">
						<div class="col-md-6" id="cardCpfResponsavel">
							<label for="cpfResponsavel" class="form-label">CPF:<span
								class="red">*</span></label> <input type="text" id="cpfResponsavel"
								autocomplete="off" required data-mask="000.000.000-00"
								name="cpfResponsavel" class="form-control" />
						</div>
						<div class="col-md-6">
							<label for="rgNumeroResponsavel" class="form-label">RG:</label> <input
								type="text" id="rgNumeroResponsavel" autocomplete="off"
								data-mask="00.000.000-0" name="rgNumeroResponsavel"
								class="form-control" />
						</div>
					</div>

					<div class="row mb-3">
						<div class="col-md-6">
							<label for="rgOrgaoExpedidorResponsavel" class="form-label">Órgão
								Expedidor-RG:</label> <input type="text"
								id="rgOrgaoExpedidorResponsavel" autocomplete="off"
								name="rgOrgaoExpedidorResponsavel" class="form-control" />
						</div>
						<div class="col-md-6">
							<label for="rgUfEmissorIdResponsavel" class="form-label">UF
								Emissor - RG:</label> <select class="form-select"
								aria-label="RG UF Emissor" id="rgUfEmissorIdResponsavel"
								name="rgUfEmissorIdResponsavel">
								<option selected disabled>Selecione uma opção</option>
							</select>
						</div>
					</div>

					<div class="row mb-3">
						<div class="col-md-6" id='rgDataExpedicaoDivResponsavel'>
							<label for="rgDataExpedicaoResponsavel" class="form-label">RG
								Data de Expedição:</label> <input type="date"
								id="rgDataExpedicaoResponsavel" autocomplete="off"
								name="rgDataExpedicaoResponsavel" class="form-control" />
						</div>
						<div class="col-md-6">
							<label for="racaIdResponsavel" class="form-label">Raça:<span
								class="red">*</span></label> <select required class="form-select"
								aria-label="Raça" id="racaIdResponsavel"
								name="racaIdResponsavel">
								<option selected disabled>Selecione uma opção</option>
							</select>
						</div>
					</div>

					<div class="row mb-3">
						<div class="col-md-6">
							<label for="paisNascimentoIdResponsavel" class="form-label">País
								de Nascimento:<span class="red">*</span>
							</label> <select class="form-select" aria-label="País de Nascimento"
								id="paisNascimentoIdResponsavel" required
								name="paisNascimentoIdResponsavel">
								<option selected disabled>Selecione uma opção</option>
							</select>
						</div>

						<div class="col-md-6">
							<label for="paisResidenciaIdResponsavel" class="form-label">País
								de Residencia:<span class="red">*</span>
							</label> <select class="form-select" aria-label="País de Residencia"
								id="paisResidenciaIdResponsavel" required
								name="paisResidenciaIdResponsavel">
								<option selected disabled>Selecione uma opção</option>
							</select>
						</div>
					</div>

					<div class="row mb-3">
						<div class="col-md-6">
							<label for="ufNascimentoIdResponsavel" class="form-label">UF
								de Nascimento:<span class="red">*</span>
							</label> <select class="form-select" aria-label="UF de Nascimento"
								id="ufNascimentoIdResponsavel" required
								name="ufNascimentoIdResponsavel">
								<option selected disabled>Selecione uma opção</option>
							</select>
						</div>

						<div class="col-md-6">
							<label for="municipioNascimentoIdResponsavel" class="form-label">Município
								de Nascimento:<span class="red">*</span>
							</label> <select class="form-select" aria-label="Município de Nascimento"
								id="municipioNascimentoIdResponsavel" required
								name="municipioNascimentoIdResponsavel" disabled>
								<option selected disabled>Selecione uma opção</option>
							</select>
						</div>
					</div>

					<div class="row mb-3">
						<div class="col-md-6">
							<label for="nacionalidadeIdResponsavel" class="form-label">Nacionalidade:<span
								class="red">*</span></label> <select class="form-select"
								aria-label="Nacionalidade" id="nacionalidadeIdResponsavel"
								required name="nacionalidadeIdResponsavel">
								<option selected disabled>Selecione uma opção</option>
							</select>
						</div>

						<div class="col-md-6">
							<label for="estadoCivilResponsavel" class="form-label">Estado
								Civil:</label>
							<div class="form-control">
								<div class="form-check form-check-inline">
									<input class="form-check-input" type="radio"
										name="estadoCivilResponsavel" id="estadoCivilResponsavel"
										value="so" /> <label class="form-check-label"
										for="estadoCivilResponsavel">Solteiro(a)</label>
								</div>
								<div class="form-check form-check-inline">
									<input class="form-check-input" type="radio"
										name="estadoCivilResponsavel" id="estadoCivilResponsavel"
										value="ca" /> <label class="form-check-label"
										for="estadoCivilResponsavel">Casado(a)</label>
								</div>
								<div class="form-check form-check-inline">
									<input class="form-check-input" type="radio"
										name="estadoCivilResponsavel" id="estadoCivilResponsavel"
										value="vi" /> <label class="form-check-label"
										for="estadoCivilResponsavel">Viúvo(a)</label>
								</div>
								<div class="form-check form-check-inline">
									<input class="form-check-input" type="radio"
										name="estadoCivilResponsavel" id="estadoCivilResponsavel"
										value="di" /> <label class="form-check-label"
										for="estadoCivilResponsavel">Divorciado(a)</label>
								</div>
							</div>
						</div>
					</div>

					<div class="row mb-3">
						<label for="qualPreencherResponsavel" class="form-label">Qual
							deseja preencher?<span class="red">*</span>
						</label>
						<div class="form-control w-100 card-form qualPreencherSwitch">
							<label for="qualPreencherResponsavel">Certidão de
								Nascimento</label> <label class="switch"> <input type="checkbox"
								id="qualPreencherResponsavel" name="qualPreencherResponsavel">
								<span class="slider slider-certidao"></span>
							</label> <label for="qualPreencherResponsavel">Certidão de
								Casamento</label>
						</div>

						<div class="form-control qualPreencher">
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio"
									name="qualPreencherCheckResponsavel"
									id="isCertidaoNascimentoResponsavel" value="s" /> <label
									class="form-check-label" for="qualPreencherCheckResponsavel">Certidão
									de Nascimento</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio"
									name="qualPreencherCheckResponsavel"
									id="isCertidaoCasamentoResponsavel" value="c" /> <label
									class="form-check-label" for="qualPreencherCheckResponsavel">Certidão
									de Casamento</label>
							</div>
						</div>
					</div>

					<div id="certidaoNascimentoResponsavel" class="mt-5">
						<h2 id="titulonNascimentoResponsavel" class="mb-3">Certidao
							de Nascimento</h2>

						<div class="row mb-3">
							<div class="col-md-6">
								<label for="certidaoNascimentoNumeroResponsavel"
									class="form-label">Número:</label> <input type="text"
									id="certidaoNascimentoNumeroResponsavel" autocomplete="off"
									name="certidaoNascimentoNumeroResponsavel" class="form-control" />
							</div>

							<div class="col-md-6">
								<label for="certidaoNascimentoCartorioResponsavel"
									class="form-label">Cartório de registro:</label> <input
									type="text" id="certidaoNascimentoCartorioResponsavel"
									autocomplete="off" name="certidaoNascimentoCartorioResponsavel"
									class="form-control" />
							</div>
						</div>

						<div class="row mb-3">
							<div class="col-md-6">
								<label for="certidaoNascimentoUfCartorioIdResponsavel"
									class="form-label">UF do cartório:</label> <select
									class="form-select"
									aria-label="Certidão de Nascimento UF Cartório"
									id="certidaoNascimentoUfCartorioIdResponsavel"
									name="certidaoNascimentoUfCartorioIdResponsavel">
									<option selected disabled>Selecione uma opção</option>
								</select>
							</div>

							<div class="col-md-6">
								<label for="certidaoNascimentoMunicipioCartorioIdResponsavel"
									class="form-label">Cidade do cartório:</label> <select
									class="form-select"
									aria-label="Certidão de Nascimento UF Cartório"
									id="certidaoNascimentoMunicipioCartorioIdResponsavel"
									name="certidaoNascimentoMunicipioCartorioIdResponsavel"
									disabled>
									<option selected value="" disabled>Selecione uma opção</option>
								</select>
							</div>
						</div>

						<div class="row mb-3">
							<div class="col-md-6"
								id='certidaoNascimentoDataEmissaoDivResponsavel'>
								<label for="certidaoNascimentoDataEmissaoResponsavel"
									class="form-label">Data de emissão:</label> <input type="date"
									id="certidaoNascimentoDataEmissaoResponsavel"
									autocomplete="off"
									name="certidaoNascimentoDataEmissaoResponsavel"
									class="form-control" />
							</div>
							<div class="col-md-6">
								<label for="certidaoNascimentoFolhaResponsavel"
									class="form-label">Folha:</label> <input type="text"
									id="certidaoNascimentoFolhaResponsavel" autocomplete="off"
									name="certidaoNascimentoFolhaResponsavel" class="form-control" />
							</div>
						</div>

						<div class="row mb-3">
							<div class="col-md-6">
								<label for="certidaoNascimentoLivroResponsavel"
									class="form-label">Livro:</label> <input type="text"
									id="certidaoNascimentoLivroResponsavel" autocomplete="off"
									name="certidaoNascimentoLivroResponsavel" class="form-control" />
							</div>
							<div class="col-md-6">
								<label for="certidaoNascimentoOrdemResponsavel"
									class="form-label">Ordem:</label> <input type="text"
									id="certidaoNascimentoOrdemResponsavel" autocomplete="off"
									name="certidaoNascimentoOrdemResponsavel" class="form-control" />
							</div>
						</div>
					</div>

					<div id="certidaoCasamentoResponsavel" class="mt-5">
						<h2 id="tituloCasamentoResponsavel" class="mb-3">Certidao de
							Casamento</h2>

						<div class="row mb-3">
							<div class="col-md-6">
								<label for="certidaoCasamentoNumeroResponsavel"
									class="form-label">Número:</label> <input type="text"
									id="certidaoCasamentoNumeroResponsavel" autocomplete="off"
									name="certidaoCasamentoNumeroResponsavel" class="form-control" />
							</div>
							<div class="col-md-6">
								<label for="certidaoCasamentoCartorioResponsavel"
									class="form-label">Cartório de registro:</label> <input
									type="text" id="certidaoCasamentoCartorioResponsavel"
									autocomplete="off" name="certidaoCasamentoCartorioResponsavel"
									class="form-control" />
							</div>
						</div>

						<div class="row mb-3">
							<div class="col-md-6">
								<label for="certidaoCasamentoUfCartorioIdResponsavel"
									class="form-label">UF do cartório:</label> <select
									class="form-select"
									aria-label="Certidão de Casamento UF Cartório"
									id="certidaoCasamentoUfCartorioIdResponsavel"
									name="certidaoCasamentoUfCartorioIdResponsavel">
									<option selected disabled>Selecione uma opção</option>
								</select>
							</div>
							<div class="col-md-6">
								<label for="certidaoCasamentoCidadeCartorioIdResponsavel"
									class="form-label">Município do Cartório</label> <select
									class="form-select"
									aria-label="Certidão de Casamento UF Cartório"
									id="certidaoCasamentoCidadeCartorioIdResponsavel"
									name="certidaoCasamentoCidadeCartorioIdResponsavel" disabled>
									<option selected disabled value="">Selecione uma opção</option>
								</select>
							</div>
						</div>

						<div class="row mb-3">
							<div class="col-md-6">
								<label for="certidaoCasamentoFolhaResponsavel"
									class="form-label">Folha:</label> <input type="text"
									id="certidaoCasamentoFolhaResponsavel" autocomplete="off"
									name="certidaoCasamentoFolhaResponsavel" class="form-control" />
							</div>
							<div class="col-md-6">
								<label for="certidaoCasamentoLivroResponsavel"
									class="form-label">Livro:</label> <input type="text"
									id="certidaoCasamentoLivroResponsavel" autocomplete="off"
									name="certidaoCasamentoLivroResponsavel" class="form-control" />
							</div>
						</div>

						<div class="row mb-3">
							<div class="col-md-6">
								<label for="certidaoCasamentoOrdemResponsavel"
									class="form-label">Ordem:</label> <input type="text"
									id="certidaoCasamentoOrdemResponsavel" autocomplete="off"
									name="certidaoCasamentoOrdemResponsavel" class="form-control" />
							</div>
							<div class="col-md-6"
								id='certidaoCasamentoDataEmissaoDivResponsavel'>
								<label for="certidaoCasamentoDataEmissaoResponsavel"
									class="form-label">Data de emissão:</label> <input type="date"
									id="certidaoCasamentoDataEmissaoResponsavel" autocomplete="off"
									name="certidaoCasamentoDataEmissaoResponsavel"
									class="form-control" />
							</div>
						</div>
					</div>

					<h2 id="tituloEnderecoResponsavel" class="mb-3 mt-5">Endereço</h2>

					<div class="col-md-6" id="enderecoAlunoSwitchResponsavel">
						<label for="isEnderecoAlunoResponsavel" class="form-label">Utilizar
							o mesmo endereço do aluno?<span class="red">*</span>
						</label>
						<div class="card-form form-control">
							<label for="isEnderecoAlunoResponsavel">Sim</label> <label
								class="switch"> <input type="checkbox"
								name="isEnderecoAlunoResponsavel"
								id="isEnderecoAlunoResponsavel"> <span class="slider"></span>
							</label> <label for="isEnderecoAlunoResponsavel">Não</label>
						</div>
					</div>

					<div class="row mb-3">
						<div class="col-md-6">
							<label for="cepResponsavel" class="form-label">CEP:</label> <input
								type="tel" class="form-control" id="cepResponsavel"
								data-mask="00000-000" name="cepResponsavel" />
						</div>
						<div class="col-md-6">
							<label for="enderecoResponsavel" class="form-label">Endereço:</label>
							<input type="text" id="enderecoResponsavel" autocomplete="off"
								name="enderecoResponsavel" class="form-control" />
						</div>
					</div>

					<div class="row mb-3">
						<div class="col-md-6">
							<label for="numeroResponsavel" class="form-label">Número:</label>
							<input type="text" id="numeroResponsavel" autocomplete="off"
								name="numeroResponsavel" class="form-control" />
						</div>
						<div class="col-md-6">
							<label for="complementoResponsavel" class="form-label">Complemento:</label>
							<input type="text" id="complementoResponsavel" autocomplete="off"
								name="complementoResponsavel" class="form-control" />
						</div>
					</div>

					<div class="row mb-3">
						<div class="col-md-6">
							<label for="bairroResponsavel" class="form-label">Bairro:</label>
							<input type="text" id="bairroResponsavel" autocomplete="off"
								name="bairroResponsavel" class="form-control" />
						</div>
						<div class="col-md-6">
							<label for="municipioResponsavel" class="form-label">Município:</label>
							<input type="text" id="municipioResponsavel" autocomplete="off"
								name="municipioResponsavel" class="form-control" />
						</div>
					</div>

					<div class="row mb-3">
						<div class="col-md-6">
							<label for="distritoResponsavel" class="form-label">Distrito:</label>
							<input type="text" id="distritoResponsavel" autocomplete="off"
								name="distritoResponsavel" class="form-control" />
						</div>
						<div class="col-md-6">
							<label for="ufResponsavel" class="form-label">UF:</label> <input
								type="text" id="ufResponsavel" autocomplete="off"
								name="ufResponsavel" class="form-control" />
						</div>
					</div>
					<h2 id="tituloEnderecoResponsavel" class="mb-3 mt-5">Dados
						Profissionais</h2>

					<div class="row mb-3">
						<div class="col-md-6">
							<label for="empresaResponsavel" class="form-label">Empresa:</label>
							<input type="text" id="empresaResponsavel" autocomplete="off"
								name="empresaResponsavel" class="form-control" />
						</div>
						<div class="col-md-6">
							<label for="ocupacaoResponsavel" class="form-label">Ocupação:</label>
							<input type="text" id="ocupacaoResponsavel" autocomplete="off"
								name="ocupacaoResponsavel" class="form-control" />
						</div>
					</div>

					<div class="row mb-3">
						<div class="col-md-6">
							<label for="telefoneComercialResponsavel" class="form-label">Telefone
								Comercial:</label> <input type="tel" id="telefoneComercialResponsavel"
								data-mask="(00) 00000-0000" autocomplete="off"
								name="telefoneComercialResponsavel" class="form-control" />
						</div>
					</div>
				</div>
				<div class="tab-pane fade" id="nav-doc" role="tabpanel"
					aria-labelledby="nav-doc-tab" tabindex="0">

					<h2 id="tituloDocumentos" class="mb-3">Aprovação documentos</h2>

					<div class="d-flex justify-content-end gap-2">
						<button type="button" class="btn btn-secondary"
							data-bs-dismiss="modal">Fechar</button>
						<button type="submit" id='reprovar' class="btn btn-danger"
							data-bs-dismiss="modal">Reprovar</button>
						<button type="submit" id='aprovar' data-bs-dismiss="modal"
							class="btn btn-success">Aprovar</button>
					</div>

				</div>
				<div class="tab-pane fade" id="nav-disabled" role="tabpanel"
					aria-labelledby="nav-disabled-tab" tabindex="0">Profile 3</div>
			</div>
		</section>
	</main>

	<script charset="UTF-8"
		src="https://cdn.sheetjs.com/xlsx-0.20.1/package/dist/xlsx.full.min.js"></script>

	<script charset="UTF-8" src="https://code.jquery.com/jquery-3.7.1.js"
		integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4="
		crossorigin="anonymous"></script>
	<script charset="UTF-8"
		src="https://cdn.jsdelivr.inet/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
		integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
		crossorigin="anonymous"></script>
	<script charset="UTF-8"
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"
		integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+"
		crossorigin="anonymous"></script>
	<script charset="UTF-8"
		src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js"></script>

	<script charset="UTF-8"
		src="<%=contextPath%>/resources/assets/js/reservaVaga/dadosReservaVaga.js"></script>
	<script charset="UTF-8"
		src="<%=contextPath%>/resources/assets/js/comum.js"></script>
	<script charset="UTF-8"
		src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>
</body>
</html>
