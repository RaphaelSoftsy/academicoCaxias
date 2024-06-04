package br.com.softsy.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class PreCadastrosController {

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
	
	@RequestMapping(value = { "modalidade", "modalidadeEscolar" }, method = RequestMethod.GET)
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
	
	
	
	@RequestMapping(value = {"novaDependenciasAdm" }, method = RequestMethod.GET)
	public String novaDependenciasAdm(HttpSession session, Model model) throws Exception {
		/*if (session.getAttribute("loginFunc") == null) {
			return "login/loginFuncionario";
		}
		/*
		 * String perfil = session.getAttribute("perfil").toString();
		 *
		 * if (!LoginUtils.acessoAdmin(perfil)) { return "login/acesssoNegado"; }
		 */
		return "preCadastros/dependenciaAdministrativa2";
	}
	
	@RequestMapping(value = {"dependenciasAdm" }, method = RequestMethod.GET)
	public String dependenciasAdm(HttpSession session, Model model) throws Exception {
		/*if (session.getAttribute("loginFunc") == null) {
			return "login/loginFuncionario";
		}
		/*
		 * String perfil = session.getAttribute("perfil").toString();
		 *
		 * if (!LoginUtils.acessoAdmin(perfil)) { return "login/acesssoNegado"; }
		 */
		return "preCadastros/dependenciasAdm";
	}
	@RequestMapping(value = {"editarDependenciaAdm" }, method = RequestMethod.GET)
	public String editarDependenciaAdm(HttpSession session, Model model) throws Exception {
		/*if (session.getAttribute("loginFunc") == null) {
			return "login/loginFuncionario";
		}
		/*
		 * String perfil = session.getAttribute("perfil").toString();
		 *
		 * if (!LoginUtils.acessoAdmin(perfil)) { return "login/acesssoNegado"; }
		 */
		return "preCadastros/editarDependenciaAdministrativa2";
	}
	/*@RequestMapping(value = { "tipos-dependencias-adm", "tiposDependenciasAdm" }, method = RequestMethod.GET)
	public String tiposDependenciasAdm(HttpSession session, Model model) throws Exception {
		if (session.getAttribute("loginFunc") == null) {
			return "login/loginFuncionario";
		}
		/*
		 * String perfil = session.getAttribute("perfil").toString();
		 *
		 * if (!LoginUtils.acessoAdmin(perfil)) { return "login/acesssoNegado"; }
		 
		return "preCadastros/tiposDependenciasAdm";
	}
	*/
	@RequestMapping(value = { "telefones"}, method = RequestMethod.GET)
	public String telefones(HttpSession session, Model model) throws Exception {
		/*if (session.getAttribute("loginFunc") == null) {
			return "login/loginFuncionario";
		}
		/*
		 * String perfil = session.getAttribute("perfil").toString();
		 *
		 * if (!LoginUtils.acessoAdmin(perfil)) { return "login/acesssoNegado"; }
		 */
		return "preCadastros/telefones";
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
	@RequestMapping(value = { "tipoAtoRegulatorio"}, method = RequestMethod.GET)
	public String tipoAtoRegulatorio(HttpSession session, Model model) throws Exception {
		/*if (session.getAttribute("loginFunc") == null) {
			return "login/loginFuncionario";
		}
		/*
		 * String perfil = session.getAttribute("perfil").toString();
		 *
		 * if (!LoginUtils.acessoAdmin(perfil)) { return "login/acesssoNegado"; }
		 */
		return "preCadastros/tipoAtoRegulatorio";
	}
	
	@RequestMapping(value = { "zoneamento"}, method = RequestMethod.GET)
	public String zoneamento(HttpSession session, Model model) throws Exception {
		/*if (session.getAttribute("loginFunc") == null) {
			return "login/loginFuncionario";
		}
		/*
		 * String perfil = session.getAttribute("perfil").toString();
		 *
		 * if (!LoginUtils.acessoAdmin(perfil)) { return "login/acesssoNegado"; }
		 */
		return "preCadastros/zoneamento";
	}
	
	
	@RequestMapping(value = { "ato-regulatorio", "atoRegulatorio" }, method = RequestMethod.GET)
	public String atoRegulatorios(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/atosRegulatorios";
	}
	
	@RequestMapping(value = { "categoriaEscolaPrivada" }, method = RequestMethod.GET)
	public String categoriaEscolaPrivada(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/categoriaEscolaPrivada";
	}
	
	@RequestMapping(value = { "localizacao", "tipoLocalizacao" }, method = RequestMethod.GET)
	public String localizacao(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/localizacao";
	}
	@RequestMapping(value = { "entidadeSuperior" }, method = RequestMethod.GET)
	public String entidadeSuperior(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/entidadeSuperior";
	}
	@RequestMapping(value = { "periodicidade" }, method = RequestMethod.GET)
	public String periodicidade(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/periodicidade";
	}
	
	@RequestMapping(value = { "orgaoPublico" }, method = RequestMethod.GET)
	public String orgaoPublico(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/orgaoPublico";
	}
	
	@RequestMapping(value = { "provedorInternet" }, method = RequestMethod.GET)
	public String provedorInternet(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/provedorInternet";
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
	
	@RequestMapping(value = { "acessar-escolas", "acessarEscolas" }, method = RequestMethod.GET)
	public String acessarEscolas(HttpSession session, Model model) throws Exception {
		/*if (session.getAttribute("loginFunc") == null) {
			return "login/loginFuncionario";
		}
		/*
		 * String perfil = session.getAttribute("perfil").toString();
		 * 
		 * if (!LoginUtils.acessoAdmin(perfil)) { return "login/acesssoNegado"; }
		 */
		return "escolas/acessarEscolas";
	}
	
	@RequestMapping(value = { "escola-marca-equipamento" }, method = RequestMethod.GET)
	public String marcaEquipamento(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/marcaEquipamento";
	}
	
	@RequestMapping(value = { "cargo-professor" }, method = RequestMethod.GET)
	public String cargoProfessor(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/cargoProfessor";
	}
	


	@RequestMapping(value = { "componentes-curriculares" }, method = RequestMethod.GET)
	public String componentesCurriculares(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/componentesCurriculares";
	}
	
	@RequestMapping(value = { "forma-organ-ensino" }, method = RequestMethod.GET)
	public String organEnsino(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/organEnsino";
	}
	
	@RequestMapping(value = { "instrutor-pedagogico" }, method = RequestMethod.GET)
	public String instrPedagogico(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/instrPedagogico";
	}
	
	@RequestMapping(value = { "raca" }, method = RequestMethod.GET)
	public String raca(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/raca";
	}
	@RequestMapping(value = { "nacionalidade" }, method = RequestMethod.GET)
	public String nacionalidade(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/nacionalidade";
	}
	@RequestMapping(value = { "nivel-escolaridade" }, method = RequestMethod.GET)
	public String nivelEscolaridade(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/nivelEscolaridade";
	}
	
	@RequestMapping(value = { "tipo-profissional" }, method = RequestMethod.GET)
	public String tipoProfissional(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/tipoProfissional";
	}
	
	@RequestMapping(value = { "tipo-dependencia" }, method = RequestMethod.GET)
	public String tipoDependencia(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/tipoDependencia";
	}
	
	@RequestMapping(value = { "tipo-ensino-medio" }, method = RequestMethod.GET)
	public String tipoEnsinoMedio(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/tipoEnsinoMedio";
	}
	
	@RequestMapping(value = { "turno-professor" }, method = RequestMethod.GET)
	public String turnoProfessor(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/turnoProfessor";
	}
	
	@RequestMapping(value = { "tipo-atendimento" }, method = RequestMethod.GET)
	public String tipoAtendimento(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/tipoAtendimento";
	}
	
	@RequestMapping(value = { "tipo-medicao" }, method = RequestMethod.GET)
	public String tipoMedicao(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/tipoMedicao";
	}
	
	@RequestMapping(value = { "situacao-professor" }, method = RequestMethod.GET)
	public String situacaoProfessor(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/situacaoProfessor";
	}
	
	@RequestMapping(value = { "deficiencias" }, method = RequestMethod.GET)
	public String deficiencia(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/deficiencia";
	}
	
	@RequestMapping(value = { "equipamentos" }, method = RequestMethod.GET)
	public String equipamento(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/equipamento";
	}
	
	@RequestMapping(value = { "ufs" }, method = RequestMethod.GET)
	public String uf(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/uf";
	}
	
	@RequestMapping(value = { "municipios" }, method = RequestMethod.GET)
	public String municipio(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/municipio";
	}
	
	@RequestMapping(value = { "paises" }, method = RequestMethod.GET)
	public String pais(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/pais";
	}
	
	@RequestMapping(value = { "turnos" }, method = RequestMethod.GET)
	public String turno(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/turno";
	}

	@RequestMapping(value = { "periodo-letivo" }, method = RequestMethod.GET)
	public String periodoLetivo(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/periodoLetivo";
	}
}
