var reader;

function canRunFileAPI() {
	if (!window.File)       return false;
	if (!window.FileReader) return false;
	if (!window.FileList)   return false;
	if (!window.Blob)       return false;

	return true;
}

function getAsCollapsible(title, content) {
	var collapsible = document.getElementById('collapsible-group').innerHtml;
	collapsible.replace("TITLE", title);
	collapsible.replace("CONTENT", content);
	return collapsible;
}

function getAllCollapsibles(fileContent) {
	var collapsibles = "";
	// Find headers -> make as title
	// Find content, including points, lists etc -> make as content
	// call getAsCollapsible for each title
	// append to collapsibles
	// Return collapsibles
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

function displayCV() {
	var el document.getElementById('cv-collapsible');
	el.innerHtml = readCVFile();
}