package br.com.softsy.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import br.com.softsy.model.UsuarioInternoVO;
import br.com.softsy.utils.LoginUtils;

@Controller
public class Turmas {
	
	@RequestMapping(value = { "escolas-turmas-editar-turma" }, method = RequestMethod.GET)
	public String turmasEditarTurma(HttpSession session, Model model) throws Exception {
		
		return "turmas/editarTurma";
	}
	
	@RequestMapping(value = { "escolas-turmas-nova-turma" }, method = RequestMethod.GET)
	public String turmasNovaTurma(HttpSession session, Model model) throws Exception {
		
		return "turmas/novaTurma";
	}
	
	@RequestMapping(value = { "escolas-turmas" }, method = RequestMethod.GET)
	public String turmas(HttpSession session, Model model) throws Exception {
		
		return "turmas/turmas";
	}
}
