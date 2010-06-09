PinSafariTextSelection = new Object; // I'm not sure, do we need to namespace work?

PinSafariTextSelection.replyToMessage = function(aMessageEvent) {
   if (aMessageEvent.name === "addtopinboard_get_selection")
   {
        var textSelection = '';
        if (document.getSelection) {
            textSelection = document.getSelection();
        }
        var messageResponse = encodeURIComponent(textSelection); //must pass back data URI encoded
    	safari.self.tab.dispatchMessage("addtopinboard_get_selection", messageResponse);
    }
}
safari.self.addEventListener("message", PinSafariTextSelection.replyToMessage, false);