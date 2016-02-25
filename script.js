function onFormSubmitted() {
	parent.postMessage("OPT_QUALIFICATION_SUBMITTED", "https://dev01-ecom2-1800contacts.demandware.net");
}

function onUserQualified() {
	parent.postMessage("OPT_QUALIFICATION_QUALIFIED", "https://dev01-ecom2-1800contacts.demandware.net");
}

function onUserDisqualified() {
	parent.postMessage("OPT_QUALIFICATION_DISQUALIFIED", "https://dev01-ecom2-1800contacts.demandware.net");
}