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
				<h1 id="tituloForm" class="text-center mb-5">Cadastrar Escola</h1>
				<input type="text" id="usuarioCadastro" hidden
					value="${funcionario.idUsuario}" />

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="nome" class="form-label">Nome:<span
							class="red">*</span></label> <input required autocomplete="off"
							type="text" id="nome" name="nome" class="form-control "
							maxlength="255" />
					</div>
					<div class="col-md-6">
						<label for="logoEscola" class="form-label">Logo:<span
							class="red">*</span></label> <input class="form-control "
							required type="file" id="logoEscola" name="logoEscola"> </input>
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="tipoEscola" class="form-label">Tipo:<span
							class="red">*</span></label> <select class="form-select"
							aria-label="Tipo Escola" id="tipoEscola" required
							name="tipoEscola">
							<option selected disabled>Selecione o tipo</option>
							<option value="PU">Pública</option>
							<option value="PV">Privada</option>
						</select>
					</div>
					<div class="col-md-6">
						<label for="email" class="form-label">Email:<span
							class="red">*</span></label> <input type="email" id="email" required
							autocomplete="off" name="email" class="form-control " />
					</div>

				</div>
				<div class="row mb-3">
					<div class="col-md-6" id="cardCNPJ">
						<label for="cnpj" class="form-label">CNPJ:<span
							class="red">*</span></label> <input type="tel" id="cnpj" required
							autocomplete="off" name="cnpj" class="form-control "
							data-mask="00.000.000/0000-00"/>
					</div>
					<div class="col-md-6">
						<label for="codigoInep" class="form-label">Código Inep:<span
							class="red">*</span></label> <input type="tel" id="codigoInep" required
							autocomplete="off" name="codigoInep"
							class="form-control " />
					</div>

				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="isAcessivel" class="form-label">Acessível:<span
							class="red">*</span></label>
						<div class="form-control">
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="isAcessivel"
									id="isAcessivelS" value="S"> <label
									class="form-check-label" for="isAcessivelS">Sim</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="isAcessivel"
									id="isAcessivelN" value="N"> <label
									class="form-check-label" for="isAcessivelN">Não</label>
							</div>
						</div>
					</div>
					<div class="col-md-6">
						<label for="isIndigena" class="form-label">Educação
							Indígena:<span class="red">*</span>
						</label>
						<div class="form-control">
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="isIndigena"
									id="isIndigenaS" value="S"> <label
									class="form-check-label" for="isIndigenaS">Sim</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="isIndigena"
									id="isIndigenaN" value="N"> <label
									class="form-check-label" for="isIndigenaN">Não</label>
							</div>
						</div>
					</div>
				</div>
				<div class="row mb-3">
					<div class="col-md-6">
						<label for="merendaEscolar" class="form-label">Merenda
							Escolar:<span class="red">*</span>
						</label>
						<div class="form-control">
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio"
									name="merendaEscolar" id="merendaEscolarS" value="S"> <label
									class="form-check-label" for="merendaEscolarS">Sim</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio"
									name="merendaEscolar" id="merendaEscolarN" value="N"> <label
									class="form-check-label" for="merendaEscolarN">Não</label>
							</div>
						</div>
					</div>
					<div class="col-md-6">
						<label for="possuiAguaPotavel" class="form-label">Possui
							Água Potável:<span class="red">*</span>
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
				<div class="row mb-3">
					<div class="col-md-6">
						<label for="internetBandaLarga" class="form-label">Internet
							Banda Larga:<span class="red">*</span>
						</label>
						<div class="form-control">
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio"
									name="internetBandaLarga" id="internetBandaLargaS" value="S">
								<label class="form-check-label" for="internetBandaLargaS">Sim</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio"
									name="internetBandaLarga" id="internetBandaLargaN" value="N">
								<label class="form-check-label" for="internetBandaLargaN">Não</label>
							</div>
						</div>
					</div>
					<div class="col-md-6">
						<label for="exameSelecao" class="form-label">Exame
							Seleção:<span class="red">*</span>
						</label>
						<div class="form-control">
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="exameSelecao"
									id="exameSelecaoS" value="S"> <label
									class="form-check-label" for="exameSelecaoS">Sim</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="exameSelecao"
									id="exameSelecaoN" value="N"> <label
									class="form-check-label" for="exameSelecaoN">Não</label>
							</div>
						</div>
					</div>

				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="compartilhaEspaco" class="form-label">Compartilha
							Espaço:<span class="red">*</span>
						</label>
						<div class="form-control">
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio"
									name="compartilhaEspaco" id="compartilhaEspacoS" value="S">
								<label class="form-check-label" for="compartilhaEspacoS">Sim</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio"
									name="compartilhaEspaco" id="compartilhaEspacoN" value="N">
								<label class="form-check-label" for="compartilhaEspacoN">Não</label>
							</div>
						</div>
					</div>
					<div class="col-md-6">
						<label for="usaEspacoEntornoEscolar" class="form-label">Usa
							Espaço Entorno Escolar:<span class="red">*</span>
						</label>
						<div class="form-control">
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio"
									name="usaEspacoEntornoEscolar" id="usaEspacoEntornoEscolarS"
									value="S"> <label class="form-check-label"
									for="usaEspacoEntornoEscolarS">Sim</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio"
									name="usaEspacoEntornoEscolar" id="usaEspacoEntornoEscolarN"
									value="N"> <label class="form-check-label"
									for="usaEspacoEntornoEscolarN">Não</label>
							</div>
						</div>
					</div>

				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="pppAtualizado12Meses" class="form-label">PPP
							Atualizado (12 Meses):<span class="red">*</span>
						</label>
						<div class="form-control">
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio"
									name="pppAtualizado12Meses" id="pppAtualizado12MesesS"
									value="S"> <label class="form-check-label"
									for="pppAtualizado12MesesS">Sim</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio"
									name="pppAtualizado12Meses" id="pppAtualizado12MesesN"
									value="N"> <label class="form-check-label"
									for="pppAtualizado12MesesN">Não</label>
							</div>
						</div>
					</div>
					<div class="col-md-6">
						<label for="numCME" class="form-label">Nº CME:<span
							class="red">*</span></label> <input type="number" id="numCME" required
							autocomplete="off" name="numCME" class="form-control " />
					</div>

				</div>


				<div class="row mb-4">
					<div class="col-md-6">
						<label for="numParecerCME" class="form-label">Nº Parecer
							CME:<span class="red">*</span>
						</label> <input type="number" id="numParecerCME" required
							autocomplete="off" name="numParecerCME"
							class="form-control " />
					</div>
					<div class="col-md-6">
						<label for="dependenciaAdmId" class="form-label">Dependência
							Administrativa:<span class="red">*</span>
						</label> <select class="form-select"
							aria-label="Dependência Administrativa" id="dependenciaAdmId"
							required name="dependenciaAdmId">
							<option selected disabled>Selecione a Dependência</option>
						</select>
					</div>


				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="situacaoFuncionamentoId" class="form-label">Situação
							de Funcionamento:<span class="red">*</span>
						</label> <select class="form-select"
							aria-label="Situação de Funcionamento"
							id="situacaoFuncionamentoId" required
							name="situacaoFuncionamentoId">
							<option selected disabled>Selecione a Situação</option>
						</select>
					</div>
					<div class="col-md-6">
						<label for="formaOcupacaoPredioId" class="form-label">Forma
							de Ocupação do Prédio:<span class="red">*</span>
						</label> <select class="form-select"
							aria-label="Forma de Ocupação do Prédio"
							id="formaOcupacaoPredioId" required name="formaOcupacaoPredioId">
							<option selected disabled>Selecione a Forma de Ocupação</option>
						</select>
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="zoneamentoId" class="form-label">Zoneamento:<span class="red">*</span>
						</label> <select class="form-select"
							aria-label="Zoneamento"
							id="zoneamentoId" required
							name="zoneamentoId">
							<option selected disabled>Selecione o Zoneamento</option>
						</select>
					</div>
					<div class="col-md-6">
						<label for="categoriaEscolaPrivadaId" class="form-label">Categoria Escola Privada:<span class="red">*</span>
						</label> <select class="form-select"
							aria-label="Categoria Escola Privada"
							id="categoriaEscolaPrivadaId" required name="categoriaEscolaPrivadaId">
							<option selected disabled>Selecione a Categoria</option>
						</select>
					</div>
				</div>
				
				<div class="row mb-3">
					<div class="col-md-6">
						<label for="entidadeSuperiorId" class="form-label">Entidade Superior:<span class="red">*</span>
						</label> <select class="form-select"
							aria-label="Entidade Superior"
							id="entidadeSuperiorId" required
							name="entidadeSuperiorId">
							<option selected disabled>Selecione a Entidade</option>
						</select>
					</div>
					<div class="col-md-6">
						<label for="categoriaEscolaPrivadaId" class="form-label">Orgão Público:<span class="red">*</span>
						</label> <select class="form-select"
							aria-label="Orgão Público"
							id="orgaoPublicoId" required name="orgaoPublicoId">
							<option selected disabled>Selecione o Orgão</option>
						</select>
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="localizacaoId" class="form-label">Tipo de
							Localização:<span class="red">*</span>
						</label> <select class="form-select" aria-label="Tipo de Localização"
							id="localizacaoId" required name="localizacaoId">
							<option selected disabled>Selecione o Tipo</option>
						</select>
					</div>
					<div class="col-md-6">
						<label for="cep" class="form-label">CEP:<span class="red">*</span></label>
						<input type='tel' class="form-control" id="cep" required
							data-mask="00000-000" name="cep" />
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="uf" class="form-label">UF:<span class="red">*</span></label>
						<input type='text' class="form-control" id="uf" required disabled
							name="uf" />
					</div>
					<div class="col-md-6">
						<label for="municipio" class="form-label">Município:<span
							class="red">*</span></label> <input type='tel' class="form-control"
							id="municipio" required disabled name="municipio" />
					</div>


				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="bairro" class="form-label">Bairro:<span
							class="red">*</span></label> <input type='text' class="form-control"
							id="bairro" required disabled name="bairro" />
					</div>
					<div class="col-md-6">
						<label for="endereco" class="form-label">Endereço:<span
							class="red">*</span></label> <input type='text' class="form-control"
							id="endereco" required disabled name="endereco" />
					</div>


				</div>

				<div class="row mb-5">
					<div class="col-md-6">
						<label for="numero" class="form-label">Número:<span
							class="red">*</span></label> <input type='number' class="form-control"
							id="numero" required name="numero" />
					</div>
					<div class="col-md-6">
						<label for="latitude" class="form-label">Latitude:<span
							class="red">*</span></label> <input type='number' class="form-control"
							id="latitude" required disabled name="latitude" />
					</div>

					<div class="col-md-6 mt-3">
						<label for="longitude" class="form-label">Longitude:<span
							class="red">*</span></label> <input type='number' class="form-control"
							id="longitude" required disabled name="longitude" />
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
		src="<%=contextPath%>/resources/assets/js/cadastros/novaEscola.js"></script>
	<script src="<%=contextPath%>/resources/assets/js/comum.js"></script>
	<script
		src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>
</body>
</html>
