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
	
	@RequestMapping(value = { "padrao-acesso" }, method = RequestMethod.GET)
	public String padraoDeAcesso(HttpSession session, Model model) throws Exception {
 
		return "cadastros/padraoDeAcesso";
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
	
	@RequestMapping(value = { "escola-energia-eletrica", "escolaEnergiaEletrica" }, method = RequestMethod.GET)
	public String escolaEnergiaEletrica(HttpSession session, Model model) throws Exception {
		
		return "escolas/energiaEletrica";
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

	@RequestMapping(value = { "escola-disciplinas" }, method = RequestMethod.GET)
	public String disciplinas(HttpSession session, Model model) throws Exception {
		
		return "escolas/disciplinas";
	}

	@RequestMapping(value = { "nova-disciplina" }, method = RequestMethod.GET)
	public String novaDisciplina(HttpSession session, Model model) throws Exception {
		
		return "escolas/novaDisciplina";
	}

	@RequestMapping(value = { "editar-disciplina" }, method = RequestMethod.GET)
	public String editarDisciplina(HttpSession session, Model model) throws Exception {
		
		return "escolas/editarDisciplina";
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
}
