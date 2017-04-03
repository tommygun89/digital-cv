var reader;

function canRunFileAPI() {
	if (!window.File)       return false;
	if (!window.FileReader) return false;
	if (!window.FileList)   return false;
	if (!window.Blob)       return false;

	return true;
}

function getAsCollapsible(title, content) {
	// Return the content of one collapsible, e.g. one header and its content
}

function getAllCollapsibles(fileContent) {
	// Return entire collapsible content, e.g. all headers as collapsibles
}

function displayCV() {
	var el document.getElementById('cv-collapsible');
	el.innerHtml = readCVFile();
}

function readCVFile() {
	if (!canRunFileAPI()) return;

	var fileContent = "";
	if (filePath.files && filePath.files[0]) {	
		reader = new FileReader();
		reader.onload = function(e) {
			fileContent = e.target.result;
		};
		reader.readAsText(filePath.files[0])
	}
	else if (ActiveXObject && filePath) {
		try {
			reader = new ActiveXObject("Scripting.FileSystemObject");
			var file = reader.OpenTextFile(filePath, 1);
			fileContent = file.ReadAll();
			file.Close();
		}
		catch (exception) {
			if (exception.number == -2146827859) 
				alert("Unable to access local files due to browser security settings.");
		}
	}

	return getAllCollapsibles(fileContent);
}
