var log = [];

function btn_click(param) {
	log.push(param.id.slice(0,-2));
	$('#' + param.id.slice(0,-2)).html(param.value);
}

function guidGenerator() {
	var S4 = function() {
		return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	};
	return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

function getButtons(uid) {
	var btnElems = ['+', 'o', '-'];
	var btnHtml = '';
	for (var i=0; i<btnElems.length; i++) {
		btnHtml += "<input type='button' onclick='btn_click(this)' id='"+uid+"_"+i+"' value='"+btnElems[i]+"' />";
	}
	return btnHtml;
}

function download(filename, text) {
	var pom = document.createElement('a');
	pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	pom.setAttribute('download', filename);

	if (document.createEvent) {
		var event = document.createEvent('MouseEvents');
		event.initEvent('click', true, true);
		pom.dispatchEvent(event);
	}
	else {
		pom.click();
	}
}

$(document).ready(function() {
	$("#aTable > thead > tr:first").append("<th>valence</th>");
	$("#aTable > tbody > tr").append(function(event) {
		var uid = guidGenerator();
		return "<td id='"+uid+"'>"+getButtons(uid)+"</td>";
	});
});

$('#undo').click( function() {
	if (log.length>0) {
		var uid = log.pop();
		$('#' + uid).html(getButtons(uid));
	}
});

$('#run').click( function() {
	var labelMissing = false;
	var arr = $('#aTable').tableToJSON({allowHTML:true});
	var arrNew = arr.slice(0);
	for (var i in arr) {
		for (var key in arr[i]) {
			if (arr[i].hasOwnProperty(key)) {
				// check if a row hasn't been labeled
				if (arr[i][key].startsWith('<input')) {
					var row = Number.parseInt(i)+1;
					alert('Label missing in row ' + row);
					labelMissing = true;
				}
				// transform nested tables to arrays
				if (arr[i][key].startsWith('<table')) {
					var x = [];
					$(arr[i][key]).find("td").each(function() {
						// cast String-wrapped integers to integers
						var tdElem = $(this).text();
						x.push((/^\d+$/.test(tdElem))?parseInt(tdElem):tdElem);
					});
					arrNew[i][key] = x;
				} else if (/^\d+$/.test(arr[i][key])) {
					// cast String-wrapped integers to integers
					arr[i][key] = parseInt(arr[i][key]);
				}

			}
		}
	}
	if (!labelMissing) {
		console.log(arrNew);
		download('output.json', JSON.stringify(arrNew, null, 4));
	}
});
