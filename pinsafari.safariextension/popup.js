safari.self.addEventListener('message', handleMessage, false);
var http_request;

function wsCloseWindow() {
	popup=document.getElementById('ws-popup-container');
  if(popup.parentNode) {
		popup.parentNode.removeChild(popup);
	}
}

function wsSubmitRequest(event) {
	var form = event.target.parentNode;
	var query = '';
	for (i = 0; i <= 2; i++) {
		query += (query) ? '&' : '';
		query += form[i].name + '=' + encodeURI(form[i].value);
	}
	makePostRequest('https://api.pinboard.in/v1/posts/add', query);
}

function makePostRequest(postUrl, params) {
	var username = safari.extension.secureSettings.pinboardUser;
	var password = safari.extension.secureSettings.pinboardPass;
	
	http_request = false;
	try { 
		http_request = new XMLHttpRequest();
	} catch(e) {
		document.getElementById('ws-text').innerHTML = '<h2>Failed to Establish Connection</h2>';
		setTimeout('wsCloseWindow()', 1200);
	}

	http_request.onreadystatechange = resultsMessage;
	http_request.open('GET', postUrl + '?' + params, true, username, password);
	http_request.send(null);
	
	document.getElementById('ws-form').innerHTML = '<img src="'+safari.extension.baseURI+'throbber.gif" />';
}

function resultsMessage() {
	if (http_request.readyState == 4) {
		if (http_request.status == 200) {
			document.getElementById('ws-text').innerHTML = '<h2>Bookmark Saved</h2>';
			setTimeout('wsCloseWindow()', 1200);
		} else {
			document.getElementById('ws-text').innerHTML = '<h2>Failed to Add Bookmark</h2>';
			setTimeout('wsCloseWindow()', 1200);
		}
	}
}

function handleMessage(msgEvent) {
	var messageName = msgEvent.name;
	var messageData = msgEvent.message;
	if (messageName === 'open') {
		var newdiv = document.createElement('div');
		newdiv.setAttribute('id', 'ws-popup-container');
		newdiv.innerHTML = messageData;
		document.body.appendChild(newdiv);
		var submitButton = document.getElementById('ws-submit-button');
		submitButton.addEventListener('click',wsSubmitRequest,false);
		var closeButton = document.getElementById('ws-close-button');
		closeButton.addEventListener('click',wsCloseWindow,false);
	}
}