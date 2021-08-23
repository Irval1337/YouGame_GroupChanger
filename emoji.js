var settings = '';

var timeout = 5;

setInterval( () => {
    if (localStorage.getItem("customEmoji") == "true") {
        var block = document.getElementsByClassName("menu-scroller js-emojiFullList")[0];
        if (block != null && block.getElementsByClassName("menu-header js-customHeader").length == 0) {
			var req = new XMLHttpRequest();
			req.open("GET", "https://groupchanger.irval.dev/GetEmoji.php", true);
			req.onload = function (){
				settings = req.responseText;
			}
			req.send(null);
            var data = JSON.parse(settings);

            var example = document.getElementsByClassName("menu-row js-recentBlock ")[0].firstElementChild.firstElementChild;

            var elem = document.createElement("h3");
            elem.className = "menu-header js-customHeader";
            elem.textContent = "Custom Emoji";
            block.insertBefore(elem, block.getElementsByClassName("menu-header js-recentHeader ")[0]);

            elem = document.createElement("div");
            elem.className = "menu-row js-customBlock ";
            elem.innerHTML = '<ul class="emojiList js-customList"></ul>'
            block.insertBefore(elem, block.getElementsByClassName("menu-header js-recentHeader ")[0]);

            for (let i = 0; i < data.emoji.length; i++) {
                var emoji = '<a class="js-emoji" data-shortname="' + data.emoji[i].name + '"><img src="' + data.emoji[i].link + '" class="smilie" alt="[IMG]' + data.emoji[i].link + '[/IMG]" title="' + data.emoji[i].name + '" data-shortname="[IMG]' + data.emoji[i].link + '[/IMG]"></a>';
                var em = example.cloneNode(true);
                em.innerHTML = emoji;
                document.getElementsByClassName("emojiList js-customList")[0].appendChild(em);

                em.onclick = function() {
                    example = document.getElementsByClassName("menu-row js-recentBlock ")[0].firstElementChild.firstElementChild;
                    example.firstElementChild.click();
                    var emojies = document.getElementsByClassName("fr-wrapper")[0].getElementsByClassName("smilie");
                    emojies[emojies.length - 1].outerHTML = '<img src="' + data.emoji[i].link + '" class="smilie fr-fic fr-dii fr-draggable" alt="[IMG]' + data.emoji[i].link + '[/IMG]" title="' + data.emoji[i].name + '" data-shortname="[IMG]' + data.emoji[i].link + '[/IMG]">';
                };
            }
        }
    }
}, timeout)
