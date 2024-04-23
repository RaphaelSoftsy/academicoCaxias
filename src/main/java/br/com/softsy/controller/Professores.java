package br.com.softsy.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import br.com.softsy.model.UsuarioInternoVO;
import br.com.softsy.utils.LoginUtils;

@Controller
public class Professores {
	
	@RequestMapping(value = { "professores-deficiencia" }, method = RequestMethod.GET)
	public String professoresDeficiencia(HttpSession session, Model model) throws Exception {
		
		return "professores/deficiencia";
	}

	@RequestMapping(value = { "professores-disciplina" }, method = RequestMethod.GET)
	public String professoresDisciplina(HttpSession session, Model model) throws Exception {
		
		return "professores/disciplina";
	}
	
	@RequestMapping(value = { "professores-escola" }, method = RequestMethod.GET)
	public String professoresEscola(HttpSession session, Model model) throws Exception {
		
		return "professores/escola";
	}

	@RequestMapping(value = { "professores-formacao" }, method = RequestMethod.GET)
	public String professoresFormacao(HttpSession session, Model model) throws Exception {
		
		return "professores/formacao";
	}

	@RequestMapping(value = { "professores" }, method = RequestMethod.GET)
	public String professores(HttpSession session, Model model) throws Exception {
		
		return "professores/professores";
	}

	@RequestMapping(value = { "novoProfessor" }, method = RequestMethod.GET)
	public String novoProfessor(HttpSession session, Model model) throws Exception {
		
		return "professores/novoProfessor";
	}

	@RequestMapping(value = { "editarProfessor" }, method = RequestMethod.GET)
	public String editarProfessor(HttpSession session, Model model) throws Exception {
		
		return "professores/editarProfessor";
	}
	
}
