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
	public String login(HttpSession session, Model model) throws Exception {
 
		return "reservaVaga/dadosResponsavel";
	}
	
	@RequestMapping(value = { "escolher-caminho" }, method = RequestMethod.GET)
	public String escolherCaminho(HttpSession session, Model model) throws Exception {
 
		return "reservaVaga/escolherCaminho";
	}
}
