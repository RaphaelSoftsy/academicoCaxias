package br.com.softsy.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import br.com.softsy.model.UsuarioInternoVO;
import br.com.softsy.model.UsuarioParceiroVO;

@Controller
public class IndexController {

// Página index do EAD

	//@RequestMapping(value = { "", "/", "index", "home" }, method = RequestMethod.GET)
	//public String home(HttpSession session, Model model) throws Exception {

	//	return "login/login";
	//}
	
	@RequestMapping(value = { "", "/", "index", "home" }, method = RequestMethod.GET)
	public String home(HttpSession session, Model model) throws Exception {

		return "funcionarios/listarFuncionario";
	}

	

	@RequestMapping(value = { "/sessaoFuncionario" }, method = RequestMethod.POST)
	public String sessaoFuncionario(HttpSession session, Model model,
			@RequestBody UsuarioInternoVO usuario) {
		session.removeAttribute("loginFunc");
		session.setAttribute("loginFunc", usuario);
		
		session.removeAttribute("perfil");
		session.setAttribute("perfil", "Funcionario");
		
		return "funcionarios/listarFuncionario";
	}
	
	@RequestMapping(value = { "/sessaoParceiro" }, method = RequestMethod.POST)
	public String sessaoParceiro(HttpSession session, Model model,
			@RequestBody UsuarioParceiroVO usuario) {
		session.removeAttribute("loginParc");
		session.setAttribute("loginParc", usuario);
		
		session.removeAttribute("perfil");
		session.setAttribute("perfil", "Parceiro");
		
		return "usuarioParceiro/candidatos";
	}
	
	@RequestMapping(value = { "/logoff" }, method = RequestMethod.GET)
	public String sessaoFuncionario(HttpSession session, Model model) {
		session.removeAttribute("loginFunc");
		session.removeAttribute("loginParc");
		return "redirect:/home";
	}
	
}
