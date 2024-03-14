package br.com.softsy.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import br.com.softsy.model.UsuarioInternoVO;
import br.com.softsy.utils.LoginUtils;

@Controller
public class Cadastros {
	
	@RequestMapping(value = { "escolas" }, method = RequestMethod.GET)
	public String escolas(HttpSession session, Model model) throws Exception {
 
		return "cadastros/escolas";
	}
	
	@RequestMapping(value = { "nova-escola" }, method = RequestMethod.GET)
	public String novaEscola(HttpSession session, Model model) throws Exception {
 
		return "cadastros/novaEscola";
	}
	
	@RequestMapping(value = { "editar-escola" }, method = RequestMethod.GET)
	public String editarEscola(HttpSession session, Model model) throws Exception {
 
		return "cadastros/editarEscola";
	}

}
