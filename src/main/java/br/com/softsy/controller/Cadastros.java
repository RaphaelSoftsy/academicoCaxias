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
	
	@RequestMapping(value = { "link-internet" }, method = RequestMethod.GET)
	public String linkInternet(HttpSession session, Model model) throws Exception {
 
		return "escolas/linkInternet";
	}
	
	@RequestMapping(value = { "edicao-link-internet" }, method = RequestMethod.GET)
	public String edicaoLinkInternet(HttpSession session, Model model) throws Exception {
 
		return "escolas/edicaoLinkInternet";
	}
	
	@RequestMapping(value = { "cadastro-link-internet" }, method = RequestMethod.GET)
	public String cadastroLinkInternet(HttpSession session, Model model) throws Exception {
 
		return "escolas/newLinkInternet";
	}
	
	@RequestMapping(value = { "escola-modalidades", "escolaModalidades" }, method = RequestMethod.GET)
	public String escolaModalidades(HttpSession session, Model model) throws Exception {
		
		return "escolas/escolaModalidade";
	}
	
	@RequestMapping(value = { "escola-tratamento-de-lixo", "escolaTratamentoDeLixo" }, method = RequestMethod.GET)
	public String escolaTratamentoDeLixo(HttpSession session, Model model) throws Exception {
		
		return "escolas/tratamentoDeLixo";
	}
	
	@RequestMapping(value = { "escola-destinacao-de-lixo", "escolaDestinacaoLixo" }, method = RequestMethod.GET)
	public String escolaDestinacaoLixo(HttpSession session, Model model) throws Exception {
		
		return "escolas/destinacaoLixo";
	}
}
