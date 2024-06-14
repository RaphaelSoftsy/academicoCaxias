package br.com.softsy.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

//import br.com.softsy.model.UsuarioInternoVO;
//import br.com.softsy.utils.LoginUtils;

@Controller
public class ReservaVaga {
	
	@RequestMapping(value = { "dadosResponsavel" }, method = RequestMethod.GET)
	public String dadosResponsavel(HttpSession session, Model model) throws Exception {
 
		return "reservaVaga/dadosResponsavel";
	}
	
	@RequestMapping(value = { "escolher-caminho" }, method = RequestMethod.GET)
	public String escolherCaminho(HttpSession session, Model model) throws Exception {
 
		return "reservaVaga/escolherCaminho";
	}
	
	@RequestMapping(value = { "dados-aluno" }, method = RequestMethod.GET)
	public String dadosAluno(HttpSession session, Model model) throws Exception {
 
		return "reservaVaga/dadosAluno";
	}
	
	@RequestMapping(value = { "endereco-aluno" }, method = RequestMethod.GET)
	public String enderecoAluno(HttpSession session, Model model) throws Exception {
 
		return "reservaVaga/enderecoAluno";
	}
	
	@RequestMapping(value = { "listaResponsavel" }, method = RequestMethod.GET)
	public String listaResponsavel(HttpSession session, Model model) throws Exception {
 
		return "reservaVaga/listaResponsavel";
	}
	
	@RequestMapping(value = { "vagaDesejada" }, method = RequestMethod.GET)
	public String vagaDesejada(HttpSession session, Model model) throws Exception {
 
		return "reservaVaga/vagaDesejada";
	}
	
	@RequestMapping(value = { "codigo-reserva" }, method = RequestMethod.GET)
	public String showCodigo(HttpSession session, Model model) throws Exception {
 
		return "reservaVaga/showCodigo";
	}
	
	@RequestMapping(value = { "reserva" }, method = RequestMethod.GET)
	public String reserva(HttpSession session, Model model) throws Exception {
 
		return "reservaVaga/reserva";
	}
	
	@RequestMapping(value = { "reserva-documentos" }, method = RequestMethod.GET)
	public String envioDocumentos(HttpSession session, Model model) throws Exception {
 
		return "reservaVaga/envioDocumentos";
	}

}
