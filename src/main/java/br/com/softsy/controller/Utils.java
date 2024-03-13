package br.com.softsy.controller;

import java.io.File;
import java.io.IOException;
import java.util.Calendar;
import java.util.Date;
import java.util.concurrent.TimeUnit;

import javax.servlet.http.HttpSession;

import org.apache.commons.io.FilenameUtils;
import org.springframework.web.multipart.MultipartFile;

import br.com.softsy.model.Usuario;

public class Utils {
	
	
	public static boolean ehNumerico(String string) {
		return (string.matches("-?\\d+(\\.\\d+)?"));
	}
	
	public static void createFolderIfNotExists(String dirName) throws SecurityException {
		File theDir = new File(dirName);

		// if the directory does not exist, create it
		if (!theDir.exists()) {
		    System.out.println("creating directory: " + theDir.getName());
		    boolean result = false;

		    try{
		        theDir.mkdir();
		        result = true;
		    } 
		    catch(SecurityException se){
		        //handle it
		    }        
		    if(result) {    
		        System.out.println("DIR created");  
		    }
		}

	}
	
	public static void salvaArquivoDiretorio(String name, MultipartFile mfile, String path) throws SecurityException, IllegalStateException, IOException {
		String extension = FilenameUtils.getExtension(mfile.getOriginalFilename());
		File file =  new File(path + name +"."+extension);
		
		createFolderIfNotExists(path);
		
		//se existir o arquivo, remove para salvar novamente
		removeArquivos(path + name +".pdf");
		removeArquivos(path + name +".jpg");
		
		
		
	    mfile.transferTo(file);
	}

	
	public static String primeiraMaiscula(String str) 
    { 
  
        // Create a char array of given String 
        char ch[] = str.toCharArray(); 
        for (int i = 0; i < str.length(); i++) { 
  
            // If first character of a word is found 
            if (i == 0 && ch[i] != ' ' ||  
                ch[i] != ' ' && ch[i - 1] == ' ') { 
  
                // If it is in lower-case 
                if (ch[i] >= 'a' && ch[i] <= 'z') { 
  
                    // Convert into Upper-case 
                    ch[i] = (char)(ch[i] - 'a' + 'A'); 
                } 
            } 
  
            // If apart from first character 
            // Any one is in Upper-case 
            else if (ch[i] >= 'A' && ch[i] <= 'Z')  
  
                // Convert into Lower-Case 
                ch[i] = (char)(ch[i] + 'a' - 'A');             
        } 
  
        // Convert the char array to equivalent String 
        String st = new String(ch); 
        return st; 
    } 
	
	public static String validaSessao(HttpSession session, String perfil) {
		if(session.getAttribute("usuario") == null) {
			if(perfil == null || perfil.equalsIgnoreCase("usuarioParceiro"))
				return "login";
			if(perfil.equalsIgnoreCase("funcionario"))
				return "login";
			
			
		}
		
		Usuario usuario = (Usuario)session.getAttribute("usuario");
		if(perfil == null) {
			return null;
		}
		
		else if(!usuario.getPerfil().equalsIgnoreCase(perfil)) {
			session.invalidate();
			if(perfil.equalsIgnoreCase("funcionario"))
				return "login";
			if(perfil.equalsIgnoreCase("usuarioParceiro"))
				return "login";
			
			
		}
		
		return null;
	}
	
	public static boolean existeImagem(String id, String path) {
		File tempFile = new File(path+id+".jpg");
		return tempFile.exists();
	}
	
	public static boolean existePdf(String id, String path) {
		File tempFile = new File(path+id+".pdf");
		return tempFile.exists();
	}
	
	public static long dateDiff(Date firstDate, Date secondDate) {
		long diffInMillies = Math.abs(secondDate.getTime() - firstDate.getTime());
		return TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS);

	}
	
	
	public static Integer retornaApenasNumerosInteiro(String str) {
		return Integer.parseInt(str.replaceAll("\\D+",""));
	}
	
	public static String retornaApenasNumeros(String str) {
		return str.replaceAll("\\D+","");
	}
	
	public static String getAnoAtual() {
		Date date = new Date();
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		return Integer.toString(cal.get(Calendar.YEAR));
	}
	
	
	private static void removeArquivos(String file) {
		File currentFile = new File(file);
	    currentFile.delete();
	}
	
	
	
	
}


