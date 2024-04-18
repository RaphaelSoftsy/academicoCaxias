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
	
	@RequestMapping(value = { "turmas-editar-turma" }, method = RequestMethod.GET)
	public String turmasEditarTurma(HttpSession session, Model model) throws Exception {
		
		return "turmas/editarTurma";
	}
	
	@RequestMapping(value = { "turmas-nova-turma" }, method = RequestMethod.GET)
	public String turmasNovaTurma(HttpSession session, Model model) throws Exception {
		
		return "turmas/novaTurma";
	}
	
	@RequestMapping(value = { "escolas-turmas" }, method = RequestMethod.GET)
	public String turmas(HttpSession session, Model model) throws Exception {
		
		return "turmas/turmas";
	}
	
	@RequestMapping(value = { "turmas-areas-conhecimento" }, method = RequestMethod.GET)
	public String turmasAreaConhecimento(HttpSession session, Model model) throws Exception {
		
		return "turmas/areaConhecimento";
	}
	
	@RequestMapping(value = { "turmas-componentes-curriculares" }, method = RequestMethod.GET)
	public String turmasComponentesCurriculares(HttpSession session, Model model) throws Exception {
		
		return "turmas/componentesCurriculares";
	}
	
	@RequestMapping(value = { "turmas-dias-semana" }, method = RequestMethod.GET)
	public String turmasDiasSemana(HttpSession session, Model model) throws Exception {
		
		return "turmas/diasSemana";
	}

	@RequestMapping(value = { "turmas-professores" }, method = RequestMethod.GET)
	public String turmasProfessores(HttpSession session, Model model) throws Exception {
		
		return "turmas/professores";
	}
	
}
