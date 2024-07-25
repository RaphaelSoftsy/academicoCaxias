const contaId = localStorage.getItem('contaId');
const candidatoId = localStorage.getItem('idCandidato');
var status = false

$(document).ready(function() {
	$('#documentForm').submit(function(e) {
		e.preventDefault();
		const filesArray = [];

		const certidaoNascimentoFile = $('#certidaoNascimento')[0].files[0];
		const comprovanteResidenciaFile = $('#comprovanteResidencia')[0].files[0];

		if (certidaoNascimentoFile) {
			convertToBase64(certidaoNascimentoFile, function(base64String) {
				filesArray.push({
					candidatoId: Number(candidatoId),
					docFileServer: base64String
				});
				checkAndUpload();
			});
		}

		if (comprovanteResidenciaFile) {
			convertToBase64(comprovanteResidenciaFile, function(base64String) {
				filesArray.push({
					candidatoId: Number(candidatoId),
					docFileServer: base64String
				});
				checkAndUpload();
			});
		}

		function checkAndUpload() {
			if (filesArray.length === 2) {
				filesArray.forEach(fileObj => {
					$.ajax({
						url: url_base + "/candidatoDocumentoIngresso",
						type: "POST",
						contentType: "application/json",
						data: JSON.stringify(fileObj),
						dataType: "json",
						success: function(data) {
							status = true
						},
						error: function(xhr, status, error) {
							console.error('Erro na requisição:', error);
							
						}
					});
				});
				if (status) {
					Swal.fire({
						title: "Cadastrado com sucesso",
						icon: "success",
					})
					window.location.href = "reserva-declaracao";
				} else {
					Swal.fire({
						icon: "error",
						title: "Oops...",
						text: "Não foi possível realizar esse comando!",
					});
				}

			} else {
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Por favor, envie os dois documentos requeridos.",
				});
			}
		}

		function convertToBase64(file, callback) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = function() {
				const base64String = reader.result.split(',')[1];
				callback(base64String);
			};
			reader.onerror = function(error) {
				console.error('Erro na leitura do arquivo:', error);
			};
		}
	});
});
