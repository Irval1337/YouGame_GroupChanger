var styles = '';
var req = new XMLHttpRequest();
req.open("GET", "https://groupchanger.irval.dev/GetStyles.php", true);
req.onload = function (){
    styles = req.responseText;
	var styleSheet = document.createElement("style");
	styleSheet.innerText = styles;
	document.head.appendChild(styleSheet);
}
req.send(null);