package br.com.softsy.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

//import br.com.softsy.model.UsuarioInternoVO;
//import br.com.softsy.utils.LoginUtils;

@Controller
public class Login {
	
	@RequestMapping(value = { "login" }, method = RequestMethod.GET)
	public String login(HttpSession session, Model model) throws Exception {
 
		return "login/login";
	}
	
	@RequestMapping(value = { "login/senha" }, method = RequestMethod.GET)
	public String recuperarSenha(HttpSession session, Model model) throws Exception {
 
		return "login/recuperarSenha";
	}
	
	@RequestMapping(value = { "login/escola" }, method = RequestMethod.GET)
	public String escolherEscola(HttpSession session, Model model) throws Exception {
 
		return "login/escolherEscola";
	}
	
	
	
	
	
	
	
}
