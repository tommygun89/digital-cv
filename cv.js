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

function getDiv(lines, start) {
	var title = "";
	for (var lineNr = start; lineNr < lines.length; ++lineNr) {
		title += lines[lineNr];
		if (lines[lineNr].search("</div>") != -1) {
			return title;
		}
	}
}

function getAllCollapsibles(fileContent) {
	var collapsibles = "";
	var title = "";
	var content = "";
	var headingIndex = 0;
	var lines = fileContent.split("\n");

	for (var lineNr = 0; lineNr < lines.length; ++lineNr) {
		if (lines[lineNr].search("collapsible-title") != -1) {
			++headingIndex;
			title = getDiv(lines, lineNr);
		} /* TODO Ends before entire content is parsed, due to exiting at the first </div>, must parse all under the title*/
		else if (lines[lineNr].search("collapsible-body") != -1) {
			content = getDiv(lines, lineNr);
 			collapsibles += buildCollapsible(title, content, headingIndex);
			title = "";
			content = "";
		}
	}
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
