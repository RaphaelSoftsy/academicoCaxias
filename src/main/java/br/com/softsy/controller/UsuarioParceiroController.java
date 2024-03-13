package br.com.softsy.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import br.com.softsy.model.UsuarioInternoVO;
import br.com.softsy.model.UsuarioParceiroVO;

@Controller
public class UsuarioParceiroController {

	@RequestMapping(value = { "cadastroDeUsuarioParceiro" }, method = RequestMethod.GET)
	public String cadastroDeUsuarioParceiro(HttpSession session, Model model) throws Exception {
		if (session.getAttribute("loginFunc") == null) {
			return "login/loginFuncionario";
		}

		return "usuarioParceiro/cadastroDeUsuarioParceiro";
	}

	@RequestMapping(value = { "editarUsuarioParceiro" }, method = RequestMethod.GET)
	public String editarUsuarioParceiro(HttpSession session, Model model) throws Exception {
		if (session.getAttribute("loginFunc") == null) {
			return "login/loginFuncionario";
		}

		return "usuarioParceiro/editarDeUsuarioParceiro";
	}

	@RequestMapping(value = { "listarUsuarioParceiro" }, method = RequestMethod.GET)
	public String listarUsuarioParceiro(HttpSession session, Model model) throws Exception {
		if (session.getAttribute("loginFunc") == null) {
			return "login/loginFuncionario";
		}

		return "usuarioParceiro/listarUsuarioParceiro";
	}

	@RequestMapping(value = { "cadastrarDesconto" }, method = RequestMethod.GET)
	public String cadastrarDesconto(HttpSession session, Model model) throws Exception {
		if (session.getAttribute("loginFunc") == null) {
			return "login/loginFuncionario";
		}

		return "descontos/cadastrarDesconto";
	}
	@RequestMapping(value = { "editarDesconto" }, method = RequestMethod.GET)
	public String editarDesconto(HttpSession session, Model model) throws Exception {
		if (session.getAttribute("loginFunc") == null) {
			return "login/loginFuncionario";
		}

		return "descontos/editarDesconto";
	}
	@RequestMapping(value = { "listarDescontos" }, method = RequestMethod.GET)
	public String listarDescontos(HttpSession session, Model model) throws Exception {
		if (session.getAttribute("loginFunc") == null) {
			return "login/loginFuncionario";
		}
		
		UsuarioInternoVO usuario = new UsuarioInternoVO();
		usuario = (UsuarioInternoVO) session.getAttribute("loginFunc");
		session.setAttribute("funcionario", usuario);

		session.setAttribute("perfil", session.getAttribute("perfil").toString());

		return "descontos/listarDescontos";
	}

	@RequestMapping(value = { "listarCandidatos" }, method = RequestMethod.GET)
	public String listarCandidatos(HttpSession session, Model model) throws Exception {

		if (session.getAttribute("loginParc") == null && session.getAttribute("loginFunc") == null) {
			return "login/home";
		} else if (session.getAttribute("loginFunc") != null) {
			UsuarioInternoVO usuario = new UsuarioInternoVO();
			usuario = (UsuarioInternoVO) session.getAttribute("loginFunc");
			session.setAttribute("funcionario", usuario);

			session.setAttribute("perfil", session.getAttribute("perfil").toString());
		} else {
			UsuarioParceiroVO usuario = new UsuarioParceiroVO();
			usuario = (UsuarioParceiroVO) session.getAttribute("loginParc");
			session.setAttribute("parceiro", usuario);

			session.setAttribute("perfil", session.getAttribute("perfil").toString());
		}

		

		return "usuarioParceiro/candidatos";
	}

}
