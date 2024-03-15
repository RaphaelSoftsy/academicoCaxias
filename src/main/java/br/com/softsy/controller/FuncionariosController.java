package br.com.softsy.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

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
	
	@RequestMapping(value = { "modalidade-escolar", "modalidadeEscolar" }, method = RequestMethod.GET)
	public String modalidadeEscolar(HttpSession session, Model model) throws Exception {
		/*if (session.getAttribute("loginFunc") == null) {
			return "login/loginFuncionario";
		}
		/*
		 * String perfil = session.getAttribute("perfil").toString();
		 *
		 * if (!LoginUtils.acessoAdmin(perfil)) { return "login/acesssoNegado"; }
		 */
		return "preCadastros/modalidadeEscolar";
	}
	@RequestMapping(value = { "tipos-dependencias-adm", "tiposDependenciasAdm" }, method = RequestMethod.GET)
	public String tiposDependenciasAdm(HttpSession session, Model model) throws Exception {
		/*if (session.getAttribute("loginFunc") == null) {
			return "login/loginFuncionario";
		}
		/*
		 * String perfil = session.getAttribute("perfil").toString();
		 *
		 * if (!LoginUtils.acessoAdmin(perfil)) { return "login/acesssoNegado"; }
		 */
		return "preCadastros/tiposDependenciasAdm";
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
	
	@RequestMapping(value = { "localizacao", "tipoLocalizacao" }, method = RequestMethod.GET)
	public String localizacao(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/localizacao";
	}
	@RequestMapping(value = { "periodicidade" }, method = RequestMethod.GET)
	public String periodicidade(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/periodicidade";
	}
	
	@RequestMapping(value = { "linguas-ensino", "linguasEnsino" }, method = RequestMethod.GET)
	public String linguasEnsino(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/linguasEnsino";
	}
	
	@RequestMapping(value = { "tratamentoDeLixo", "tratamento-de-lixo" }, method = RequestMethod.GET)
	public String tratamentoDeLixo(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/tratamentoDeLixo";
	}
	
	
	@RequestMapping(value = { "fonteEnergia", "fonteEnergiaEletrcia" }, method = RequestMethod.GET)
	public String fonteEnergia(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/fonteEnergia";
	}
	
	@RequestMapping(value = { "fornecimentoDeAgua", "fornecimentoAgua" }, method = RequestMethod.GET)
	public String fornecimentoAgua(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/fornecimentoAgua";
	}
	
	@RequestMapping(value = { "situacaoFuncionamento", "situacao-funcionamento" }, method = RequestMethod.GET)
	public String situacaoFuncionamento(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/situacaoFuncionamento";
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
	
	@RequestMapping(value = { "forma-ocupacao", "formaOcupacao" }, method = RequestMethod.GET)
	public String formaOcupacao(HttpSession session, Model model) throws Exception {
		/*if (session.getAttribute("loginFunc") == null) {
			return "login/loginFuncionario";
		}
		/*
		 * String perfil = session.getAttribute("perfil").toString();
		 * 
		 * if (!LoginUtils.acessoAdmin(perfil)) { return "login/acesssoNegado"; }
		 */
		return "preCadastros/formaOcupacao";
	}

	

}
