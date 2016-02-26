function onFormSubmitted() {
	parent.postMessage("OPT_QUALIFICATION_SUBMITTED", "*");
}

function onUserQualified() {
	parent.postMessage("OPT_QUALIFICATION_QUALIFIED", "*");
}

function onUserDisqualified() {
	parent.postMessage("OPT_QUALIFICATION_DISQUALIFIED", "*");
}