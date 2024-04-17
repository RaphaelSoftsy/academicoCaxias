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
	
	@RequestMapping(value = { "listarPessoas" }, method = RequestMethod.GET)
	public String listarPessoas(HttpSession session, Model model) throws Exception {
		
		return "pessoas/pessoas";
	}
	
	@RequestMapping(value = { "editarPessoa" }, method = RequestMethod.GET)
	public String editarPessoa(HttpSession session, Model model) throws Exception {
		
		return "pessoas/editarPessoa";
	}

		@RequestMapping(value = { "pessoas-nacionalidades" }, method = RequestMethod.GET)
	public String pessoasNacionalidades(HttpSession session, Model model) throws Exception {
		
		return "pessoas/nacionalidades";
	}
}
