function listener(event) {
	/*
	SAFETY CATCH
	if (event.origin !== "https://omniture.com/1800contactsSurvey.html") {
		return;
	}
	*/
	document.getElementById("messageReceived").innerHTML = "received: " + event.data
}

if (window.addEventListener) {
	window.addEventListener("message", listener, false)
} else {
	window.attachEvent("onmessage", listener)
}