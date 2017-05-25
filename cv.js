function getAsCollapsible(title, content) {
	var collapsible = document.getElementById('collapsible-group').innerText;
	collapsible.replace("TITLE", title);
	collapsible.replace("CONTENT", content);
	return collapsible;
}

function getAllCollapsibles(fileContent) {
	var collapsibles = "";
	var title = "";
	var content = "";
	
	for (var lineNr = 0; lineNr < fileContent.length; ++lineNr) {	
		if (fileContent[lineNr].substr(0, 1) == "H") {
			title = fileContent[lineNr].substr(2);
		}
		else if (fileContent[lineNr].substr(0, 1) == "B") {
			content += fileContent[lineNr].substr(2);
			content += "\n";
		}
		else if (fileContent[lineNr].substr(0, 1) == "E") {
			collapsibles += getAsCollapsible(title, content);
			title = "";
			content = "";
		}
	}

	return collapsibles;
}

function updateDivContent(fileContent) {	
	alert(fileContent);
}

function getCvAsCollapsibles(file) {
	alert(file);
	var rawFile = new XMLHttpRequest();
	rawFile.onreadystatechange = function() {
		if (rawFile.readyState == XMLHttpRequest.DONE && rawFile.status == 0) {
			alert(rawFile.getAllResponseHeaders());
			fileContent = rawFile.response;
			updateDivContent(fileContent);
		};
	};
	rawFile.open("GET", file, true);
	rawFile.send();
}
