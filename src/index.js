var fs = require('fs');
var path = require('path');
var tableify = require('tableify');

var inputJson = path.join(__dirname, '..', 'dist', 'input.json');
var outputHtml = path.join(__dirname, '..', 'dist', 'output.html');

function buildHtml(done) {
	console.log('Reading JSON...');
	fs.readFile(inputJson, "utf8", function(err, data) {
		if (err) return done(err);
		var html = '<html>'+
			'<body>'+
				'<button id="undo">Undo</button>'+
				'<table id="aTable" border="1">'+
					tableify(JSON.parse(data)).slice(7,-8)+
				'</table>'+
				'<br>'+
				'<button id="run">Save</button>'+
				'<script src="../src/jquery-1.9.1.min.js"></script>'+
				'<script src="../src/jquery.tabletojson.js"></script>'+
				'<script src="../src/tablerow-labelr.js"></script>'+
			'</body>'+
		'</html>';
		writeHtml(html, done);
	});
}

function writeHtml(data, done) {
	console.log('Writing HTML...');
	fs.writeFile(outputHtml, data, function(err) {
		if (err) return done(err);
		console.log('HTML written to ' + outputHtml);
		done();
	});
}

buildHtml(function(err) {
	if (err) return handleError(err);
});
