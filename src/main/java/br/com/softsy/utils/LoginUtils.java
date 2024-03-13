package br.com.softsy.utils;

public class LoginUtils {
	
	public static boolean acessoAdmin(String perfil) {
		if("Admin".equalsIgnoreCase(perfil))
			return true;
		else
			return false;
	}
	
	public static boolean acessoFuncionario(String perfil) {
		if("Funcionario".equalsIgnoreCase(perfil))
			return true;
		else
			return false;
	}
	
	
	public static boolean acessoParceiro(String perfil) {
		if("Parceiro".equalsIgnoreCase(perfil))
			return true;
		else
			return false;
	}
	
	public static boolean acessoAdminParceiro(String perfil) {
		if("AdminParceiro".equalsIgnoreCase(perfil))
			return true;
		else
			return false;
	}
}
