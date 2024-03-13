package br.com.softsy.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import br.com.softsy.model.UsuarioInternoVO;
import br.com.softsy.utils.LoginUtils;

@Controller
public class FuncionariosController {

	@RequestMapping(value = { "cadastroFuncionario" }, method = RequestMethod.GET)
	public String cadastroFuncionario(HttpSession session, Model model) throws Exception {
		/*if (session.getAttribute("loginFunc") == null) {
			return "login/loginFuncionario";
		}
		/*
		 * String perfil = session.getAttribute("perfil").toString();
		 * 
		 * if (!LoginUtils.acessoAdmin(perfil)) { return "login/acesssoNegado"; }
		 */
		return "preCadastros/cadastroDeFuncionario";
	}
	
	
	@RequestMapping(value = { "dependencia-administrativa", "dependenciaAdministrativa" }, method = RequestMethod.GET)
	public String dependenciaAdministrativa(HttpSession session, Model model) throws Exception {
		/*if (session.getAttribute("loginFunc") == null) {
			return "login/loginFuncionario";
		}
		/*
		 * String perfil = session.getAttribute("perfil").toString();
		 *
		 * if (!LoginUtils.acessoAdmin(perfil)) { return "login/acesssoNegado"; }
		 */
		return "preCadastros/dependenciaAdministrativa";
	}
	
	
	@RequestMapping(value = { "ato-regulatorio", "atoRegulatorio" }, method = RequestMethod.GET)
	public String atoRegulatorios(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/atosRegulatorios";
	}
	
	@RequestMapping(value = { "fornecimentoDeAgua", "fornecimentoAgua" }, method = RequestMethod.GET)
	public String fornecimentoAgua(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/fornecimentoAgua";
	}
	
	@RequestMapping(value = { "esgotoSanitario", "esgotamentoSanitario" }, method = RequestMethod.GET)
	public String esgotoSanitario(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/esgotoSanitario";
	}
	
	@RequestMapping(value = { "destinacaoLixo" }, method = RequestMethod.GET)
	public String destinacaoLixo(HttpSession session, Model model) throws Exception {
		/*if (session.getAttribute("loginFunc") == null) {
			return "login/loginFuncionario";
		}
		/*
		 * String perfil = session.getAttribute("perfil").toString();
		 * 
		 * if (!LoginUtils.acessoAdmin(perfil)) { return "login/acesssoNegado"; }
		 */
		return "preCadastros/destinacaoLixo";
	}
	
	@RequestMapping(value = { "editarFuncionario" }, method = RequestMethod.GET)
	public String editarFuncionario(HttpSession session, Model model) throws Exception {
//		if (session.getAttribute("loginFunc") == null) {
			//return "login/loginFuncionario";
	//	}

		/*
		 * String perfil = session.getAttribute("perfil").toString();
		 * 
		 * if (!LoginUtils.acessoAdmin(perfil)) { return "login/acesssoNegado"; }
		 */

		return "preCadastros/editarFuncionario";
	}

	

}
