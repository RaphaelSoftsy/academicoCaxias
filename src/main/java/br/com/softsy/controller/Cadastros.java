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
	
	@RequestMapping(value = { "cadastro-usuario" }, method = RequestMethod.GET)
	public String cadastroUsuario(HttpSession session, Model model) throws Exception {
 
		return "cadastros/novoUsuario";
	}
	
	
	@RequestMapping(value = { "cadastroConta" }, method = RequestMethod.GET)
	public String cadastroConta(HttpSession session, Model model) throws Exception {
 
		return "cadastros/novaConta";
	}
	
	
	@RequestMapping(value = { "escolas" }, method = RequestMethod.GET)
	public String escolas(HttpSession session, Model model) throws Exception {
 
		return "cadastros/escolas";
	}
	
	@RequestMapping(value = { "configuracao-acesso" }, method = RequestMethod.GET)
	public String padraoDeAcesso(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/padraoDeAcesso";
	}
	
	@RequestMapping(value = { "nova-escola" }, method = RequestMethod.GET)
	public String novaEscola(HttpSession session, Model model) throws Exception {
 
		return "cadastros/novaEscola";
	}
	
	@RequestMapping(value = { "editar-escola" }, method = RequestMethod.GET)
	public String editarEscola(HttpSession session, Model model) throws Exception {
 
		return "cadastros/editarEscola";
	}
	
	@RequestMapping(value = { "escola-internet" }, method = RequestMethod.GET)
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
	
	@RequestMapping(value = { "escola-linguas-de-ensino", "escolaLinguasDeEnsino" }, method = RequestMethod.GET)
	public String escolaLinguasDeEnsino(HttpSession session, Model model) throws Exception {
		
		return "escolas/linguasEnsino";
	}
	
	@RequestMapping(value = { "escola-fornecimento-de-agua", "escolaFornecimentoAgua" }, method = RequestMethod.GET)
	public String escolaFornecimentoAgua(HttpSession session, Model model) throws Exception {
		
		return "escolas/fornecimentoAgua";
	}
	
	@RequestMapping(value = { "escola-esgotamento-sanitario", "escolaEsgotamentoSanitario" }, method = RequestMethod.GET)
	public String escolaEsgotamentoSanitario(HttpSession session, Model model) throws Exception {
		
		return "escolas/esgotamentoSanitario";
	}
	
	@RequestMapping(value = { "escola-licenciamento-sanitario", "escolaLicenciamentoSanitario" }, method = RequestMethod.GET)
	public String escolaLicenciamentoSanitario(HttpSession session, Model model) throws Exception {
		
		return "escolas/licenciamentoSanitario";
	}
	
	@RequestMapping(value = { "escola-telefones", "escolaTelefones" }, method = RequestMethod.GET)
	public String escolaTelefones(HttpSession session, Model model) throws Exception {
		
		return "escolas/telefones";
	}
	
	@RequestMapping(value = { "escola-predios-compartilhados", "escolaPrediosCompartilhados" }, method = RequestMethod.GET)
	public String escolaPrediosCompartilhados(HttpSession session, Model model) throws Exception {
		
		return "escolas/prediosCompartilhados";
	}
	
	@RequestMapping(value = { "escola-horario-funcionamento", "escolaHorarioFuncionamento" }, method = RequestMethod.GET)
	public String escolaHorarioFuncionamento(HttpSession session, Model model) throws Exception {
		
		return "escolas/horarioFuncionamento";
	}
	
	@RequestMapping(value = { "escola-ppci", "escolaPpci" }, method = RequestMethod.GET)
	public String escolaPpci(HttpSession session, Model model) throws Exception {
		
		return "escolas/ppci";
	}
	
	@RequestMapping(value = { "escola-regime-escolar", "escolaRegimeEscolar" }, method = RequestMethod.GET)
	public String escolaRegimeEscolar(HttpSession session, Model model) throws Exception {
		
		return "escolas/regimeEscolar";
	}
	
	@RequestMapping(value = { "escola-equipamento" }, method = RequestMethod.GET)
	public String escolaEquipamento(HttpSession session, Model model) throws Exception {
		
		return "escolas/equipamento";
	}
	
	@RequestMapping(value = { "escola-profissional" }, method = RequestMethod.GET)
	public String escolaProfissional(HttpSession session, Model model) throws Exception {
		
		return "escolas/profissional";
	}
	
	@RequestMapping(value = { "escola-instrutor-pedagogico" }, method = RequestMethod.GET)
	public String escolaInstrPedagogico(HttpSession session, Model model) throws Exception {
		
		return "escolas/instrPedagogico";
	}
	
	@RequestMapping(value = { "escola-dependencias" }, method = RequestMethod.GET)
	public String escolaDependencia(HttpSession session, Model model) throws Exception {
		
		return "escolas/dependencia";
	}
	
	@RequestMapping(value = { "escola-termo-colaboracao" }, method = RequestMethod.GET)
	public String escolaTermoColaboracao(HttpSession session, Model model) throws Exception {
		
		return "escolas/termoColaboracao";
	}

	
	@RequestMapping(value = { "escola-agua" }, method = RequestMethod.GET)
	public String escolaAgua(HttpSession session, Model model) throws Exception {
		
		return "escolas/agua";
	}
	
	
	@RequestMapping(value = { "escola-dispostivo" }, method = RequestMethod.GET)
	public String escolaDispositivo(HttpSession session, Model model) throws Exception {
		
		return "escolas/dispositivo";
	}
	
	@RequestMapping(value = { "escola-lixo" }, method = RequestMethod.GET)
	public String escolaLixo(HttpSession session, Model model) throws Exception {
		
		return "escolas/lixo";
	}
	
	@RequestMapping(value = { "escola-esgoto" }, method = RequestMethod.GET)
	public String escolaEsgoto(HttpSession session, Model model) throws Exception {
		
		return "escolas/esgoto";
	}
	
	@RequestMapping(value = { "escola-energia-eletrica" }, method = RequestMethod.GET)
	public String escolaEnergia(HttpSession session, Model model) throws Exception {
		
		return "escolas/energiaEletrica";
	}
	
	@RequestMapping(value = { "escola-infraestrutura" }, method = RequestMethod.GET)
	public String escolaInfraestutura(HttpSession session, Model model) throws Exception {
		
		return "escolas/infraestrutura";
	}
	
	@RequestMapping(value = { "tipo-telefone" }, method = RequestMethod.GET)
	public String tipoTelefone(HttpSession session, Model model) throws Exception {
		
		return "preCadastros/tipoTelefone";
	}
	
	@RequestMapping(value = { "novo-telefone" }, method = RequestMethod.GET)
	public String novoTelefone(HttpSession session, Model model) throws Exception {
		
		return "escolas/novoTelefone";
	}
	
	

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
	
	@RequestMapping(value = { "modalidades", "modalidadeEscolar" }, method = RequestMethod.GET)
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
	
	@RequestMapping(value = { "concurso" }, method = RequestMethod.GET)
	public String concurso(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/concurso";
	}
	
	@RequestMapping(value = { "oferta-concurso" }, method = RequestMethod.GET)
	public String ofertaConcurso(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/ofertaConcurso";
	}
	
	@RequestMapping(value = { "tipo-ingresso" }, method = RequestMethod.GET)
	public String tipoIngresso(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/tipoIngresso";
	}
	@RequestMapping(value = { "papel-pessoa" }, method = RequestMethod.GET)
	public String papelPessoa(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/papelPessoa";
	}
	
	//Login
	
	@RequestMapping(value = { "login" }, method = RequestMethod.GET)
	public String login(HttpSession session, Model model) throws Exception {
 
		return "login/login";
	}
	
	@RequestMapping(value = { "login/senha" }, method = RequestMethod.GET)
	public String recuperarSenha(HttpSession session, Model model) throws Exception {
 
		return "login/recuperarSenha";
	}
	
	@RequestMapping(value = { "login/conta" }, method = RequestMethod.GET)
	public String escolherEscola(HttpSession session, Model model) throws Exception {
 
		return "login/escolherConta";
	}
	
	@RequestMapping(value = { "feriado-conta" }, method = RequestMethod.GET)
	public String feriadosConta(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/feriadoConta";
	}
	
	@RequestMapping(value = { "feriado-escola" }, method = RequestMethod.GET)
	public String feriadosEscola(HttpSession session, Model model) throws Exception {
 
		return "escolas/feriadoEscola";
	}
	
	@RequestMapping(value = { "agenda" }, method = RequestMethod.GET)
	public String agenda(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/agenda";
	}
	
	@RequestMapping(value = { "agenda-anexo" }, method = RequestMethod.GET)
	public String agendaAnexo(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/agendaAnexo";
	}
	
	

}
