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
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex" />

<title>POC - Contas</title>
<!-- Bootstrap -->
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

<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
	href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
	rel="stylesheet" />

<!-- Sweetalert -->
<script charset="UTF-8"
	src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script charset="UTF-8" src="sweetalert2.all.min.js"></script>

<!-- FontAwesome -->
<script charset="UTF-8" src="https://kit.fontawesome.com/2476720ce5.js"
	crossorigin="anonymous">
	
</script>

<!-- Css -->
<link rel="stylesheet"
	href="<%=contextPath%>/resources/assets/css/style.css" />
<link rel="stylesheet"
	href="<%=contextPath%>/resources/assets/css/login.css">

</head>

<body>
	<header>
		<img class="logo" style="width: 15%"
			src="<%=contextPath%>/resources/assets/img/logoPrefeitura.png"
			alt="Logo Prefeitura Caxias do Sul" />
	</header>

	<main class="container-section">
		<form class="container-section pb-5" id="formSubmit">
			<section class="mb-5">
				<div class="card">
					<div class="card-body title d-flex align-items-center gap-2">
						<i class="fa-solid fa-clipboard" style="font-size: 26px"></i>
						<h3 class="pt-2" id="tituloForm">Dados do(a) Responsável</h3>
					</div>
				</div>
			</section>
			<section
				class="mb-5 p-5 card col-12 animate__animated animate__bounceInUp d-flex flex-column justify-content-center">
				<h2 id="tituloDados" class="mb-5">Dados Pessoais</h2>
				<input type="text" id="usuarioCadastro" hidden
					value="${funcionario.idUsuario}" />

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="nomeCompleto" class="form-label">Nome
							Completo:<span class="red">*</span>
						</label> <input type="text" id="nomeCompleto" required autocomplete="off"
							name="nomeCompleto" class="form-control" />
					</div>
					<div class="col-md-6">
						<label for="nomeSocial" class="form-label">Nome Social:</label> <input
							type="text" id="nomeSocial" autocomplete="off" name="nomeSocial"
							class="form-control" />
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="relacionamentoId" class="form-label">Relacionamento:<span
							class="red">*</span></label> <select class="form-select" required
							aria-label="Relacionamento" id="relacionamentoId" name="racaId">
							<option selected disabled>Selecione uma opção</option>
						</select>
					</div>
					<div class="col-md-6">
						<label for="email" class="form-label">Email:<span
							class="red">*</span></label> <input type="email" required id="email"
							autocomplete="off" name="email" class="form-control" />
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
					<div class="col-md-6">
						<label for="telefone" class="form-label">Telefone:</label> <input
							type="tel" id="telefone" data-mask="(00) 0000-0000"
							autocomplete="off" name="telefone" class="form-control" />
					</div>
					<div class="col-md-6">
						<label for="celular" class="form-label">Celular:<span
							class="red">*</span></label> <input required type="tel" id="celular"
							data-mask="(00) 00000-0000" autocomplete="off" name="celular"
							class="form-control" />
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6" id="cardCpf">
						<label for="cpf" class="form-label">CPF:<span class="red">*</span></label>
						<input type="text" id="cpf" autocomplete="off" required
							data-mask="000.000.000-00" name="cpf" class="form-control" />
					</div>
					<div class="col-md-6">
						<label for="rgNumero" class="form-label">RG:</label> <input
							type="text" id="rgNumero" autocomplete="off"
							data-mask="00.000.000-0" name="rgNumero" class="form-control" />
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="rgOrgaoExpedidor" class="form-label">Órgão
							Expedidor-RG:</label> <input type="text" id="rgOrgaoExpedidor"
							autocomplete="off" name="rgOrgaoExpedidor" class="form-control" />
					</div>
					<div class="col-md-6">
						<label for="rgUfEmissorId" class="form-label">UF Emissor -
							RG:</label> <select class="form-select" aria-label="RG UF Emissor"
							id="rgUfEmissorId" name="rgUfEmissorId">
							<option selected disabled>Selecione uma opção</option>
						</select>
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="rgDataExpedicao" class="form-label">RG Data de
							Expedição:</label> <input type="date" id="rgDataExpedicao"
							autocomplete="off" name="rgDataExpedicao" class="form-control" />
					</div>
					<div class="col-md-6">
						<label for="racaId" class="form-label">Raça:<span
							class="red">*</span></label> <select required class="form-select"
							aria-label="Raça" id="racaId" name="racaId">
							<option selected disabled>Selecione uma opção</option>
						</select>
					</div>
				</div>
				<div class="row mb-3">
					<div class="col-md-6">
						<label for="paisNascimentoId" class="form-label">País de
							Nascimento:<span class="red">*</span>
						</label> <select class="form-select" aria-label="País de Nascimento"
							id="paisNascimentoId" required name="paisNascimentoId">
							<option selected disabled>Selecione uma opção</option>
						</select>
					</div>
					
					<div class="col-md-6">
						<label for="paisResidencialId" class="form-label">País de Residencia:<span class="red">*</span>
						</label> <select class="form-select" aria-label="País de Residencia"
							id="paisResidenciaId" required name="paisResidenciaId">
							<option selected disabled>Selecione uma opção</option>
						</select>
					</div>
					

					

				</div>

				<div class="row mb-3">
				<div class="col-md-6">
						<label for="ufNascimentoId" class="form-label">UF de
							Nascimento:<span class="red">*</span>
						</label> <select class="form-select" aria-label="UF de Nascimento"
							id="ufNascimentoId" required name="ufNascimentoId">
							<option selected disabled>Selecione uma opção</option>
						</select>
					</div>
					
					<div class="col-md-6">
						<label for="municipioNascimentoId" class="form-label">Município
							de Nascimento:<span class="red">*</span>
						</label> <select class="form-select" aria-label="Município de Nascimento"
							id="municipioNascimentoId" required name="municipioNascimentoId">
							<option selected disabled>Selecione uma opção</option>
						</select>
					</div>
					
				</div>
				<div class="row mb-3">
				<div class="col-md-6">
						<label for="nacionalidadeId" class="form-label">Nacionalidade:<span
							class="red">*</span></label> <select class="form-select"
							aria-label="Município de Nascimento" id="nacionalidadeId"
							required name="nacionalidadeId">
							<option selected disabled>Selecione uma opção</option>
						</select>
					</div>
					
					<div class="col-md-6">
						<label for="sexo" class="form-label">Estado Civil:<span
							class="red">*</span><span class="red">*</span></label>
						<div class="form-control">
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="estadoCivil"
									id="solteiro" value="s" required /> <label
									class="form-check-label" for="solteiro">Solteiro(a)</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="estadoCivil"
									id="casado" value="c" required /> <label
									class="form-check-label" for="casado">Casado(a)</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="estadoCivil"
									id="viuvo" value="v" required /> <label
									class="form-check-label" for="viuvo">Viúvo(a)</label>
							</div>
						</div>
					</div>
					
				</div>
				
				<div class="row mb-3">
						<label for="qualPreencher" class="form-label">Qual deseja preencher?<span
							class="red">*</span>
						</label>
						<div class="form-control card-form qualPreencherSwitch">
							<label for="qualPreencher">Certidão de Nascimento</label>
							<label class="switch"> <input type="checkbox" id="qualPreencher" name="qualPreencher"> <span
								class=" slider slider-certidao"></span>
							</label>
							<label for="qualPreencher">Certidão de Casamento</label>
						</div>
						
						<div class="form-control qualPreencher">
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="qualPreencherCheck"
									id="isCertidaoNascimento" value="s" required /> <label
									class="form-check-label" for="qualPreencherCheck">Certidão de Nascimento</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="qualPreencherCheck"
									id="isCertidaoCasamento" value="c" required /> <label
									class="form-check-label" for="qualPreencherCheck">Certidão de Casamento</label>
							</div>
						</div>
				</div>
				
				<div class="row mb-3">
					<div class="col-md-6" style="display: none" id="rne">
						<label for="isRne" class="form-label">Possui Rne?<span
							class="red">*</span>
						</label>
						<div class="form-control card-form">
							<label for="isRne">Sim</label>
							<label class="switch"> <input type="checkbox" id="isRne" name="isRne"> <span
								class="slider"></span>
							</label>
							<label for="isRne">Não</label>
						</div>
					</div>
				</div>
			</section>
			
			<section
				class="mb-5 p-5 card col-12 animate__animated animate__bounceInUp flex-column justify-content-center" style="display: none" id="rneSec">
				<h2 class="mb-5">RNE</h2>


				<div class="row mb-3">
					<div class="col-md-6">
						<label for="rneNumero" class="form-label">Rne:</label> <input
							type="text" id="rneNumero" autocomplete="off"
							data-mask="00000000-0" name="rneNumero" class="form-control" />
					</div>

					<div class="col-md-6">
						<label for="rneDataExpedicao" class="form-label">Rne Data de
							Expedição:</label> <input type="date" id="rneDataExpedicao"
							autocomplete="off" name="rneDataExpedicao" class="form-control" />
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="rneOrgaoExpedidor" class="form-label">Órgão
							Expedidor-Rne:</label> <input type="text" id="rneOrgaoExpedidor"
							autocomplete="off" name="rneOrgaoExpedidor" class="form-control" />
					</div>
					<div class="col-md-6">
						<label for="rneUfEmissorId" class="form-label">UF Emissor -
							rne:</label> <select class="form-select" aria-label="RG UF Emissor"
							id="rneUfEmissorId" name="rneUfEmissorId">
							<option selected disabled>Selecione uma opção</option>
						</select>
					</div>
				</div>
			</section>
			
			<section
				class="mb-5 p-5 card col-12 animate__animated animate__bounceInUp flex-column justify-content-center" id="certidaoNascimento">
				<h2 id="titulonNascimento" class="mb-5">Certidao de Nascimento</h2>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="certidaoNascimentoNumero" class="form-label">Número:</label>
						<input type="text" id="certidaoNascimentoNumero"
							autocomplete="off" name="certidaoNascimentoNumero"
							class="form-control" />
					</div>
					<div class="col-md-6">
						<label for="certidaoNascimentoCidadeCartorio" class="form-label">Cidade
							do cartório:</label> <input type="text"
							id="certidaoNascimentoCidadeCartorio" autocomplete="off"
							name="certidaoNascimentoCidadeCartorio" class="form-control" />
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="certidaoNascimentoCartorio" class="form-label">Cartório
							de registro:</label> <input type="text" id="certidaoNascimentoCartorio"
							autocomplete="off" name="certidaoNascimentoCartorio"
							class="form-control" />
					</div>
					<div class="col-md-6">
						<label for="certidaoNascimentoUfCartorioId" class="form-label">UF
							do cartório:</label> <select class="form-select"
							aria-label="Certidão de Nascimento UF Cartório"
							id="certidaoNascimentoUfCartorioId"
							name="certidaoNascimentoUfCartorioId">
							<option  selected disabled >Selecione uma opção</option>
						</select>
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="certidaoNascimentoDataEmissao" class="form-label">Data
							de emissão:</label> <input type="date" id="certidaoNascimentoDataEmissao"
							autocomplete="off" name="certidaoNascimentoDataEmissao"
							class="form-control" />
					</div>
					<div class="col-md-6">
						<label for="certidaoNascimentoFolha" class="form-label">Folha:</label>
						<input type="text" id="certidaoNascimentoFolha" autocomplete="off"
							name="certidaoNascimentoFolha" class="form-control" />
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="certidaoNascimentoLivro" class="form-label">Livro:</label>
						<input type="text" id="certidaoNascimentoLivro" autocomplete="off"
							name="certidaoNascimentoLivro" class="form-control" />
					</div>
					<div class="col-md-6">
						<label for="certidaoNascimentoOrdem" class="form-label">Ordem:</label>
						<input type="text" id="certidaoNascimentoOrdem" autocomplete="off"
							name="certidaoNascimentoOrdem" class="form-control" />
					</div>
				</div>
			</section>

			<section
				class="mb-5 p-5 card col-12 animate__animated animate__bounceInUp flex-column justify-content-center" id="certidaoCasamento">
				<h2 id="tituloCasamento" class="mb-5">Certidao de Casamento</h2>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="certidaoCasamentoNumero" class="form-label">Número:</label>
						<input type="text" id="certidaoCasamentoNumero" autocomplete="off"
							name="certidaoCasamentoNumero" class="form-control" />
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
							<option selected disabled >Selecione uma opção</option>
						</select>
					</div>
					<div class="col-md-6">
						<label for="certidaoCasamentoCidadeCartorio" class="form-label">Cidade
							do cartório:</label> <input type="text"
							id="certidaoCasamentoCidadeCartorio" autocomplete="off"
							name="certidaoCasamentoCidadeCartorio" class="form-control" />
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="certidaoCasamentoFolha" class="form-label">Folha:</label>
						<input type="text" id="certidaoCasamentoFolha" autocomplete="off"
							name="certidaoCasamentoFolha" class="form-control" />
					</div>
					<div class="col-md-6">
						<label for="certidaoCasamentoLivro" class="form-label">Livro:</label>
						<input type="text" id="certidaoCasamentoLivro" autocomplete="off"
							name="certidaoCasamentoLivro" class="form-control" />
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="certidaoCasamentoOrdem" class="form-label">Ordem:</label>
						<input type="text" id="certidaoCasamentoOrdem" autocomplete="off"
							name="certidaoCasamentoOrdem" class="form-control" />
					</div>
					<div class="col-md-6">
						<label for="certidaoCasamentoDataEmissao" class="form-label">Data
							de emissão:</label> <input type="date" id="certidaoCasamentoDataEmissao"
							autocomplete="off" name="certidaoCasamentoDataEmissao"
							class="form-control" />
					</div>
				</div>
			</section>
			<section
				class="mb-5 p-5 card col-12 animate__animated animate__bounceInUp d-flex flex-column justify-content-center">
				<h2 id="tituloEndereco" class="mb-5">Endereço</h2>

				<div class="col-md-6">
						<label for="isEnderecoAluno" class="form-label">Utilizar o mesmo endereço do aluno?<span
							class="red">*</span>
						</label>
						<div class="card-form form-control" >
							<label for="isEnderecoAluno">Sim</label>
							<label class="switch"> <input type="checkbox" name="isEnderecoAluno" id="isEnderecoAluno" name="isEnderecoAluno"> <span
								class="slider"></span>
							</label>
							<label for="isEnderecoAluno">Não</label>
						</div>
					</div>
					

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="cep" class="form-label">CEP:</label> <input type="tel"
							class="form-control" id="cep" data-mask="00000-000" name="cep" />
					</div>
					<div class="col-md-6">
						<label for="endereco" class="form-label">Endereço:</label> <input
							type="text" id="endereco" autocomplete="off" name="endereco"
							class="form-control" />
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="numero" class="form-label">Número:</label> <input
							type="text" id="numero" autocomplete="off" name="numero"
							class="form-control" />
					</div>
					<div class="col-md-6">
						<label for="complemento" class="form-label">Complemento:</label> <input
							type="text" id="complemento" autocomplete="off"
							name="complemento" class="form-control" />
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="bairro" class="form-label">Bairro:</label> <input
							type="text" id="bairro" autocomplete="off" name="bairro"
							class="form-control" />
					</div>
					<div class="col-md-6">
						<label for="municipio" class="form-label">Município:</label> <input
							type="text" id="municipio" autocomplete="off" name="municipio"
							class="form-control" />
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="distrito" class="form-label">Distrito:</label> <input
							type="text" id="distrito" autocomplete="off" name="distrito"
							class="form-control" />
					</div>
					<div class="col-md-6">
						<label for="uf" class="form-label">UF:</label> <input type="text"
							id="uf" autocomplete="off" name="uf" class="form-control" />
					</div>
				</div>
			</section>
			<section
				class="mb-5 p-5 card col-12 animate__animated animate__bounceInUp d-flex flex-column justify-content-center">
				<h2 id="tituloEndereco" class="mb-5">Dados Profissionais</h2>
				
				<div class="row mb-3">
                    <div class="col-md-6">
                        <label for="empresa" class="form-label">Empresa:</label>
                        <input type="text" id="empresa" autocomplete="off" name="empresa" class="form-control" />
                    </div>
                    <div class="col-md-6">
                        <label for="ocupacao" class="form-label">Ocupação:</label>
                        <input type="text" id="ocupacao"  autocomplete="off" name="ocupacao" class="form-control" />
                    </div>
                </div>
                
                <div class="row mb-3">
                    <div class="col-md-6">
                        <label for="telefoneComercial" class="form-label">Telefone Comercial:</label>
                        <input type="tel" id="telefoneComercial" data-mask="(00) 00000-0000" autocomplete="off" name="telefoneComercial" class="form-control" />
                    </div>
                </div>
              
			</section>
			
			
				<section
				class="mb-5 p-5 card col-12 animate__animated animate__bounceInUp d-flex flex-column justify-content-center">
				<div class="col-md-12 text-center">
					<button type="submit" class="btn btn-primary px-5" id="btn-submit">Próximo</button>
				</div>
			</section>
			
		</form>
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
		src="<%=contextPath%>/resources/assets/js/reservaVaga/dadosResponsavel.js"></script> 
	<script charset="UTF-8"
		src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>

</body>
</html>