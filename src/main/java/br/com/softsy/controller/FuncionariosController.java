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
		return "funcionarios/cadastroDeFuncionario";
	}
	
	@RequestMapping(value = { "ato-regulatorio", "atoRegulatorio" }, method = RequestMethod.GET)
	public String atoRegulatorio(HttpSession session, Model model) throws Exception {
 
		return "preCadastros/atoRegulatorio";
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

	@RequestMapping(value = { "listarFuncionarios" }, method = RequestMethod.GET)
	public String listarFuncionarios(HttpSession session, Model model) throws Exception {
		/*if (session.getAttribute("loginFunc") == null) {
			return "login/loginFuncionario";
		}
*/
		return "funcionarios/listarFuncionario";
	}
	
	//Lojista ---------------------------------------------------------------------------------- //
	
	@RequestMapping(value = { "cadastroDeLojista" }, method = RequestMethod.GET)
	public String cadastroDeLojista(HttpSession session, Model model) throws Exception {
		
		
		return "lojista/cadastroDeLojista";
	}
	
	@RequestMapping(value = { "listarLojista" }, method = RequestMethod.GET)
	public String listarLojista(HttpSession session, Model model) throws Exception {
		
		
		return "lojista/listarLojista";
	}
	
	@RequestMapping(value = { "editarLojista" }, method = RequestMethod.GET)
	public String editarLojista(HttpSession session, Model model) throws Exception {
		
		
		return "lojista/editarLojista";
	}
	
	
	
	
	//categorias ------------------------------------------------------------------------------- //
	
	@RequestMapping(value = { "cadastroDeCategoria" }, method = RequestMethod.GET)
	public String cadastroDeCategoria(HttpSession session, Model model) throws Exception {
		
		
		return "categoria/cadastroDeCategoria";
	}
	
	@RequestMapping(value = { "listarCategoria" }, method = RequestMethod.GET)
	public String listarCategoria(HttpSession session, Model model) throws Exception {
		
		
		return "categoria/listarCategoria";
	}
	
	// Sub-categoria ----------------------------------------------------------------------------//
	
	@RequestMapping(value = { "cadastroDeSubCategoria" }, method = RequestMethod.GET)
	public String cadastroDeSubCategoria(HttpSession session, Model model) throws Exception {
		
		
		return "sub-categoria/cadastroDeSubCategoria";
	}
	
	@RequestMapping(value = { "listarSubCategoria" }, method = RequestMethod.GET)
	public String listarSubCategoria(HttpSession session, Model model) throws Exception {
		
		
		return "sub-categoria/listarSubCategoria";
	}
	
	
	//cargo ------------------------------------------------------------------------------------- //
	
	@RequestMapping(value = { "cadastroDeCargo" }, method = RequestMethod.GET)
	public String cadastroDeCargo(HttpSession session, Model model) throws Exception {
		
		
		return "cargo/cadastroDeCargo";
	}
	
	@RequestMapping(value = { " listarCargos" }, method = RequestMethod.GET)
	public String listarCargos(HttpSession session, Model model) throws Exception {
		
		
		return "cargo/listarCargos";
	}
	
	@RequestMapping(value = { " editarCargo" }, method = RequestMethod.GET)
	public String editarCargo(HttpSession session, Model model) throws Exception {
		
		
		return "cargo/editarCargo";
	}
	
	//produto ------------------------------------------------------------------------------------//
	
	@RequestMapping(value = { "cadastroDeProduto" }, method = RequestMethod.GET)
	public String cadastroDeProduto(HttpSession session, Model model) throws Exception {
		
		
		return "produto/cadastroDeProduto";
	}
	
	@RequestMapping(value = { "listarProduto" }, method = RequestMethod.GET)
	public String listarProduto(HttpSession session, Model model) throws Exception {
		
		
		return "produto/listarProduto";
	}
	
	//colaboradores ------------------------------------------------------------------------------------//
	
		@RequestMapping(value = { "cadastroDeColaboradores" }, method = RequestMethod.GET)
		public String cadastroDeColaboradores(HttpSession session, Model model) throws Exception {
			
			
			return "colaboradores/cadastroDeColaboradores";
		}
		
		@RequestMapping(value = { "listarColaboradores" }, method = RequestMethod.GET)
		public String listarColaboradores(HttpSession session, Model model) throws Exception {
			
			
			return "colaboradores/listarColaboradores";
		}
		
		@RequestMapping(value = { "editarColaborador" }, method = RequestMethod.GET)
		public String editarColaborador(HttpSession session, Model model) throws Exception {
			
			
			return "colaboradores/editarColaborador";
		}
		
	

}
