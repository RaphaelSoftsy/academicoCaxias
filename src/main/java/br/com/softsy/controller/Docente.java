package br.com.softsy.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import br.com.softsy.model.UsuarioInternoVO;
import br.com.softsy.utils.LoginUtils;

@Controller
public class Docente {

	@RequestMapping(value = { "professorDisciplina" }, method = RequestMethod.GET)
	public String professorDisciplina(HttpSession session, Model model) throws Exception {
		return "docente/professorDisciplina";
	}
	
	@RequestMapping(value = { "professorEscola" }, method = RequestMethod.GET)
	public String professorEscola(HttpSession session, Model model) throws Exception {
		return "docente/professorEscola";
	}
}
