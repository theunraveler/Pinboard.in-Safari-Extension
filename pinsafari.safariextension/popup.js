safari.self.addEventListener('message', handleMessage, false);

function removeWho(who) {
	who=document.getElementById(who);
    if(who.parentNode) {
		who.parentNode.removeChild(who);
	}
}

function wsCloseWindow() {
	removeWho('ws-popup-container');
	safari.self.tab.dispatchMessage("heyExtensionBar","activate");
}

function handleMessage(msgEvent) {
	var messageName = msgEvent.name;
	var messageData = msgEvent.message;
	if (messageName === 'save') {
		var newdiv = document.createElement('div');
		newdiv.setAttribute('id', 'ws-popup-container');
		newdiv.innerHTML = messageData;
		document.body.appendChild(newdiv);
		var cButton = document.getElementById('ws-close-button');
		cButton.addEventListener('click',wsCloseWindow,false);
	}
}