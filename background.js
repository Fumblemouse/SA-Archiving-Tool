function onRequest(request, sender, sendResponse) {
	var threadid = request.threadid
	
	chrome.pageAction.setPopup({
		"tabId": sender.tab.id, 
		"popup": "popup.html?threadid=" + threadid
	});
	chrome.pageAction.show(sender.tab.id);
	sendResponse({});
}
chrome.extension.onRequest.addListener(onRequest);
