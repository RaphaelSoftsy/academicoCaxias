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

<title>Centro Universitário Sumaré</title>
<!-- Bootstrap -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
      crossorigin="anonymous"
    />
    <script charset="UTF-8" 
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

    <!-- FontAwesome -->
    <script charset="UTF-8" 
      src="https://kit.fontawesome.com/2476720ce5.js"
      crossorigin="anonymous"
    ></script>
    <link rel="stylesheet" href="<%=contextPath%>/resources/assets/css/style.css" />
    
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
	<body style="background-color: #183153">
    <div class="container">
      <div class="d-flex align-items-center" style="min-height: 100vh">
        <form
          id="form-login"
          class="card p-5 col-6 mx-auto shadow"
        >
          <h1 class="text-center mb-5">Faça o login</h1>
          <div class="form-floating mt-2 mb-3">
            <input
              type="email"
              class="form-control"
              id="user"
              name="email"
              autocomplete="off"
              required
              placeholder="email@email.com"
            />
            <label for="email">Email</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              required
              name="senha"
              autocomplete="off"
              id="senha"
              placeholder="senha"
            />
            <label for="senha">Senha</label>
            <span id="olho" class="olhos-icone"><i id="valor-olho" class="fa-solid fa-eye-slash"></i></span>
          </div>
          <button
            type="submit"
            class="btn btn-primary mt-4 mb-3"
            style="font-size: 18px"
          >
            Login
          </button>
          <a class="text-center link-dark link-offset-2 link-underline-dark" href="home">Trocar perfil de acesso</a>
        </form>
      </div>
    </div>

    <script charset="UTF-8" 
      src="https://code.jquery.com/jquery-3.7.1.js"
      integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4="
      crossorigin="anonymous"
    ></script>
    <script charset="UTF-8" 
      src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
      integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
      crossorigin="anonymous"
    ></script>
    <script charset="UTF-8" 
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"
      integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+"
      crossorigin="anonymous"
    ></script>
    <script charset="UTF-8"  src="<%=contextPath%>/resources/assets/js/comum.js"></script>
    <script charset="UTF-8"  src="<%=contextPath%>/resources/assets/js/loginParceiro.js"></script>
  
  
   
 	
    
</body>
</html>