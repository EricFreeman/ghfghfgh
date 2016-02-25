function onFormSubmitted() {
	parent.postMessage("{ 'test':'FormSubmitted', 'something':'djfksljfd' }","https://dev01-ecom2-1800contacts.demandware.net");
}

function onUserQualified() {
	parent.postMessage("{ 'test':'UserQualified', 'something':'djfksljfd' }","https://dev01-ecom2-1800contacts.demandware.net");
}

function onUserDisqualified() {
	parent.postMessage("{ 'test':'UserDisqualified', 'something':'djfksljfd' }","https://dev01-ecom2-1800contacts.demandware.net");
}