package br.com.softsy.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import br.com.softsy.model.UsuarioInternoVO;
import br.com.softsy.utils.LoginUtils;

@Controller
public class Acessos {

	@RequestMapping(value = { "usuarios" }, method = RequestMethod.GET)
	public String usuarios(HttpSession session, Model model) throws Exception {
		return "acessos/usuarios";
	}
	
	@RequestMapping(value = { "novoUsuario" }, method = RequestMethod.GET)
	public String novoUsuario(HttpSession session, Model model) throws Exception {
		return "acessos/novoUsuario";
	}
	
	@RequestMapping(value = { "padraoAcesso" }, method = RequestMethod.GET)
	public String padraoAcesso(HttpSession session, Model model) throws Exception {
		return "acessos/padraoAcesso";
	}
}
