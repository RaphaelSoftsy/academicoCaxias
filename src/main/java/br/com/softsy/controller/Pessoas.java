package br.com.softsy.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import br.com.softsy.model.UsuarioInternoVO;
import br.com.softsy.utils.LoginUtils;

@Controller
public class Pessoas {
	
	@RequestMapping(value = { "novaPessoa" }, method = RequestMethod.GET)
	public String novaPessoa(HttpSession session, Model model) throws Exception {
		
		return "pessoas/novaPessoa";
	}
	
	@RequestMapping(value = { "listaPessoa" }, method = RequestMethod.GET)
	public String listaPessoa(HttpSession session, Model model) throws Exception {
		
		return "pessoas/pessoa";
	}
	
	
}
