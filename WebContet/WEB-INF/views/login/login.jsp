<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>

<%
	String contextPath = request.getContextPath();
%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>  
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex" />

<title>POC - Acadêmico Caxias do Sul</title>
<!-- Bootstrap -->
    <!-- Bootstrap -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
      crossorigin="anonymous"
    />
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
      crossorigin="anonymous"
    ></script>

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
      rel="stylesheet"
    />

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
      rel="stylesheet"
    />
    
    <!-- Sweetalert -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="sweetalert2.all.min.js"></script>

    <!-- FontAwesome -->
    <script
      src="https://kit.fontawesome.com/2476720ce5.js"
      crossorigin="anonymous"
    > </script>
    
    <!-- Css -->
    <link rel="stylesheet" href="<%=contextPath%>/resources/assets/css/style.css" />
    <link rel="stylesheet" href="<%=contextPath%>/resources/assets/css/login.css">
    
    </head>
 
<body>
	<header>
		<img class="logo-sumare"
          	src="http://localhost:8090/front-educacional-caxias/resources/assets/img/logoBranco.png"
          	alt="Logo Prefeitura Caxias do Sul"/>
	</header>

	<main>
		<div class="container-form">
			<form>
			  <div class="mb-3">
			    <label for="inputPassword" class="form-label">Email</label>
			    <input class="form-control form-control-lg email" type="email" aria-label=".form-control-lg example" id="emailInput" required>
			 
			  </div>
			  <div class="mb-3">
	    		<label for="inputPassword" class="form-label">Senha</label>
	          	<div class="input-group ">
	          		<input class="form-control form-control-lg pwd senha type="password" aria-label=".form-control-lg example" id="passwordInput" required >
	            	<button class="btn btn-default reveal" type="button"><i class="fa-regular fa-eye"></i></button>
	          	</div>        
	          </div>
			  <div class="mb-3 form-check">
			    <input type="checkbox" class="form-check-input" id="remeberMeCheck">
			    <label class="form-check-label" for="exampleCheck">Lembrar meu acesso</label>
			  </div>
			</form>
			
			<div class="container-btns">
			<button type="submit" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" id="btnLogin">
			   Entrar
			</button>
			<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" id="btnRecuperarSenha">
			   Esqueci a senha
			</button>
			</div>
		</div>
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


    <script src="<%=contextPath%>/resources/assets/js/login/login.js"></script>
    
    <script src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>

</body>
</html>