function buildCollapsible(title, content, index) {
	var collapsible = document.getElementById('collapsible-group').innerText;
	collapsible = collapsible.replace("TITLE", title);
	collapsible = collapsible.replace("CONTENT", content);
	collapsible = collapsible.replace("INDEX", index);
	collapsible = collapsible.replace("INDEX", index);
	return collapsible;
}

function formatTitle(title) {
	return "<b>" + title + "</b>";
}

function formatContent(content) {
	return content;
}

function getAllCollapsibles(fileContent) {
	var collapsibles = "";
	var title = "";
	var content = "";
	var headingIndex = 0;
	var lines = fileContent.split("\n");

	for (var lineNr = 0; lineNr < lines.length; ++lineNr) {
		if (lines[lineNr].substr(0, 1) == "H") {
			++headingIndex;
			title = lines[lineNr].substr(2);
		}
		else if (lines[lineNr].substr(0, 1) == "B") {
			content += lines[lineNr].substr(2);
		}
		else if (lines[lineNr].substr(0, 1) == "E") {
			collapsibles += buildCollapsible(formatTitle(title),
													formatContent(content),
													headingIndex);
			title = "";
			content = "";
		}
	}
	alert(collapsibles);
	return collapsibles;
}

function updateDivContent(fileContent) {
	var collapsibles = getAllCollapsibles(fileContent);
	document.getElementById('built').innerHTML = collapsibles;
}

function getCvAsCollapsibles() {
	var fileInput = document.getElementById('fileInput');
	fileInput.addEventListener('change', function(e) {
		var file = fileInput.files[0];
		var textType = /text.*/;
		if (file.type.match(textType)) {
			var reader = new FileReader();
			reader.onload = function(event) {
				if (reader.readyState === FileReader.DONE) {
					updateDivContent(event.target.result);
				}
			};
			reader.readAsText(file);
		}
	});
}
