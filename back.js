var timeout = 5;


function removeGroupFromData(username) {
    var users = [];
	var usernames = [];
    if (localStorage.getItem("GroupsData") != null) {
        var from_json = JSON.parse(localStorage.getItem("GroupsData"));
        users = from_json.users;
		usernames = from_json.usernames;
    }
    var index = usernames.indexOf(username);
	if (index >= 0) {
		users.splice(index, 1);
		usernames.splice(index, 1);
	}
    
    let Data = {
        users: users,
		usernames: usernames
    };
    localStorage.setItem("GroupsData", JSON.stringify(Data));
}

function removeGroup(username) {
    if (localStorage.getItem("syncGroups") == "true") {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://groupchanger.irval.dev/RemoveUser.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        xhr.setRequestHeader("Accept", "application/json, text/javascript, */*; q=0.01");
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                console.log("Request was accepted.");
            }
            else {
                console.log("Request Error.");
            }
        }
        xhr.send("Username=" + username);
    }
}

function changeGroup(username, banner, name) {
    if (localStorage.getItem("syncGroups") == "true") {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://groupchanger.irval.dev/UpdateUser.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        xhr.setRequestHeader("Accept", "application/json, text/javascript, */*; q=0.01");
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                console.log("Request was accepted.");
            }
            else {
                console.log("Request Error.");
            }
        }
        xhr.send("Username=" + username + "&BannerStyles=" + banner + "&NameStyles=" + name);
    }
}

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        if (request.type == "edit") {
            var groups = JSON.parse(localStorage.getItem("customGroups"));
            var New = JSON.parse(request.customGroups);
            for (let i = 0; i < groups.length; i++) {
                if (groups[i].name != New[i].name) {
                    var from_json = JSON.parse(localStorage.getItem("GroupsData"));
                    var users = from_json.users;
                    var usernames = from_json.usernames;
                    for (let j = 0; j < users.length; j++) {
                        if (users[j].group == groups[i].name) {
                            changeGroup(users[j].username, New[i].banner, New[i].username);
                            users[j].group = New[i].name;
                        }
                    }
                    let Data = {
                        users: users,
                        usernames: usernames
                    };
                    localStorage.setItem("GroupsData", JSON.stringify(Data));
                    break;
                }
                else if (groups[i].banner != New[i].banner || groups[i].username != New[i].username) {
                    var from_json = JSON.parse(localStorage.getItem("GroupsData"));
                    var users = from_json.users;
                    var usernames = from_json.usernames;
                    for (let j = 0; j < users.length; j++) {
                        if (users[j].group == groups[i].name) {
                            changeGroup(users[j].username, New[i].banner, New[i].username);
                        }
                    }
                }
            }
        }
        if (request.type == "del") {
            var groups = JSON.parse(localStorage.getItem("customGroups"));
            var New = JSON.parse(request.customGroups);

            var from_json = JSON.parse(localStorage.getItem("GroupsData"));
            var users = from_json.users;
            var usernames = from_json.usernames;

            var i = 0;
            for (; i < New.length; i++) {
                if (groups[i].name != New[i].name) {
                    for (let j = 0; j < users.length; j++) {
                        if (users[j].group == groups[i].name) {
                            removeGroup(usernames[j]);
                            users.splice(j, 1);
                            usernames.splice(j, 1);
                        }
                    }
                    break;
                }
            }

            if (New.length == 0) {
                for (let j = 0; j < users.length; j++) {
                    if (users[j].group == groups[0].name) {
                        users.splice(j, 1);
                        usernames.splice(j, 1);
                    }
                }
            }
            else if (i == New.length) {
                for (let j = 0; j < users.length; j++) {
                    if (users[j].group == groups[groups.length - 1].name) {
                        users.splice(j, 1);
                        usernames.splice(j, 1);
                    }
                }
            }

            let Data = {
                users: users,
                usernames: usernames
            };
            localStorage.setItem("GroupsData", JSON.stringify(Data));
        }
        localStorage.setItem("groupChange", request.groupChange);
        localStorage.setItem("selfStyling", request.selfStyling);
        localStorage.setItem("customGroups", request.customGroups);
        localStorage.setItem("customEmoji", request.customEmoji);
        localStorage.setItem("syncGroups", request.syncGroups);

        location.reload();
    }
);

function editExit() {
    document.getElementById("banEditing").remove();
}

function submitBan() {
    var _usernames = document.getElementsByClassName("username");

    var reason = document.getElementById("editBanReason").value;
    var date = document.getElementById("editBanDate").value;

    var from_json = JSON.parse(localStorage.getItem("GroupsData"));
    var users = from_json.users;
    var usernames = from_json.usernames;
    var i = 0;
    for (; i < users.length; i++) {
        if (usernames[i] == _usernames[0].outerText) {
            break;
        }
    }

    var user = {
        group: users[i].group,
        username: users[i].username,
        banReason: reason,
        banDate: date
    }
    users[i] = user;
    var Data = {
        users: users,
        usernames: usernames,
    }
    localStorage.setItem("GroupsData", JSON.stringify(Data));
    location.reload();
}

function changeBan() {
    var elem = document.createElement('div');
    elem.innerHTML = '<div class="overlay-container is-active" id="banEditing"><div class="overlay" tabindex="-1" role="dialog" aria-hidden="false"><div class="overlay-title"><a class="overlay-titleCloser js-overlayClose" role="button" tabindex="0" aria-label="Закрыть" id="editExit"></a>Редактировать блокировку</div><div class="overlay-content"><class="block" data-xf-init="ajax-submit"><div class="block-container"><div class="block-body"><dl class="formRow formRow--input"><dt> <div class="formRow-labelWrapper"><label class="formRow-label">Причина блокировки</label></div><div class="formRow-labelWrapper" style=" margin-top: 35px; "><label class="formRow-label">Дата блокировки</label></div></dt><dd><input type="text" class="input" name="reason" maxlength="100" id="editBanReason"> <input type="text" class="input" name="date" maxlength="100" id="editBanDate" style=" margin-top: 20px; "></dd></dl><input type="hidden" name="hard_delete" value="0"></div><dl class="formRow formSubmitRow formSubmitRow--sticky" data-xf-init="form-submit-row" style="height: 42px;"><dt></dt><dd><div class="formSubmitRow-main"><div class="formSubmitRow-bar"></div><div class="formSubmitRow-controls"><button type="submit" class="button--primary button button--icon button--icon--edit"><span class="button-text" id="submitBan">Изменить</span></button></div></div></dd></dl></div><input type="hidden" id="editOk"><input type="hidden"></class="block"></div></div></div>';
    document.body.insertBefore(elem, document.body.firstChild);

    document.getElementById("editExit").addEventListener("click", editExit);
    document.getElementById("submitBan").addEventListener("click", submitBan);
    
}

function isGarant(title) {
    if (title.length > 0 && title[0].style != null && title[0].outerHTML != "<span class=\"userTitle\">бесплатно при сделке до 500 RUB<br>10% отсуммы при сделке от 500 RUB</span>"
            && title[0].outerHTML != "<span class=\"userTitle\">10%+50 RUB при сделке до 799 RUB<br>10%при сделке от 800 RUB</span>" && 
            title[0].outerHTML != '<span class="userTitle">бесплатно при сделке до 1000 RUB<br>10% отсуммы при сделке от 1000 RUB</span>'
            && title[0].outerHTML != '<span class="userTitle">бесплатно при сделке до 800 RUB<br>10% от суммы при сделке от 800 RUB</span>') {
                return true;
            }
            else {
                return false;
            }
}

async function setBanner(banner, group, name) {
    if (group != "Забаненный") {
        var useGroup = true;
        var groups = JSON.parse(localStorage.getItem("customGroups"));
        for (let i = 0; i < groups.length; i++) {
            if (groups[i].name == group && localStorage.getItem("selfStyling") != "true") {
                useGroup = false;
                break;
            }
        }
        if (useGroup == true && banner.length > 0) {
            if (group.startsWith("$")) {
                if (name.firstChild.classList == null || name.firstChild.classList.contains("username--banned") == false) {
                    banner[banner.length - 1].querySelector("strong").innerHTML = "<b><span style=\"color: #ffffff;\">Synced Group</span></b>" 
                }
            }
            else if (banner.length > 0 && group.indexOf("GRADIENT GROUP (") >= 0) {
                banner[banner.length - 1].querySelector("strong").innerHTML = "<b><span style=\"color: #ffffff;\">Gradient Group</span></b>"
            }
            else if (banner.length > 0) {
                banner[banner.length - 1].querySelector("strong").innerHTML = "<b><span style=\"color: #ffffff;\">" + group +"</span></b>" 
            }
        }
    }
    switch (group) {
        case "Забаненный":
            if (banner.length > 0) {
                banner[banner.length - 1].style.background = "#666363";
                banner[banner.length - 1].style["color"] = "#b3d6e6";
                banner[banner.length - 1].style["font-weight"] = "normal";
                banner[banner.length - 1].querySelector("strong").innerHTML = "<s>Забаненный</s>"
            }
            break;
        case "Тех. Администратор":
            if (banner.length > 0) {
                banner[banner.length - 1].style.background = "#666363";
                banner[banner.length - 1].style["color"] = "#b3d6e6";
                banner[banner.length - 1].style["font-weight"] = "normal";
                banner[banner.length - 1].querySelector("strong").innerHTML = "Тех. Администратор"
            }
            break;
        case "Бот форума":
            if (banner.length > 0) {
                banner[banner.length - 1].style.background = "#20B2AA";
            }
            break;
        case "Read Only":
            if (banner.length > 0) {
                banner[banner.length - 1].style.background = "#a39e9e";
            }
            break;
        case "Новичок":
        case "Новичок+":
        case "Начинающий":
        case "Пользователь":
        case "Участник":
        case "Эксперт":
            if (banner.length > 0) {
                banner[banner.length - 1].style.background = "#666363";
            }
            break;
        case "Олдфаг":
            if (banner.length > 0) {
                banner[banner.length - 1].style.background = "#1D6356";
            }
            break;
        case "YOUGAME ELITE":
        case "Глобальная элита":
            if (banner.length > 0) {
                banner[banner.length - 1].style["background"] = "linear-gradient(90deg, #f94444 0%, #6459f5 100%, #0095dd)";
            }
            break;
        case "Продавец":
            if (banner.length > 0) {
                banner[banner.length - 1].style.background = "#c7673a";
            }
            break;
        case "Премиум":
            if (banner.length > 0) {
                banner[banner.length - 1].style.background = "#969600";
            }
            break;
        case "Unreal Engine Group":
            if (banner.length > 0) {
                banner[banner.length - 1].style.background = "#900153";
            }
            break;
        case "Легенда":
            if (banner.length > 0) {
                banner[banner.length - 1].style["background"] = "linear-gradient(90deg, #04adff 0%, #ff0049 100%, #0095dd)";
            }
            break;
        case "GRADIENT GROUP (1)":
            if (banner.length > 0) {
                banner[banner.length - 1].style["background"] = "linear-gradient(90deg, #2c3e50, #bdc3c7)";
            }
            break;
        case "GRADIENT GROUP (2)":
            if (banner.length > 0) {
                banner[banner.length - 1].style["background"] = "linear-gradient(90deg, #88d5b0, #1f4037)";
            }
            break;
        case "GRADIENT GROUP (3)":
            if (banner.length > 0) {
                banner[banner.length - 1].style["background"] = "linear-gradient(90deg, #82d3cd, #718fc6, #7f7fd5)";
            }
            break;
        case "GRADIENT GROUP (4)":
            if (banner.length > 0) {
                banner[banner.length - 1].style["background"] = "linear-gradient(90deg, #eaafc8, #654ea3)";
            }
            break;
        case "GRADIENT GROUP (5)":
            if (banner.length > 0) {
                banner[banner.length - 1].style["background"] = "linear-gradient(90deg, #df0404, #b0a703, #219203)";
            }
            break;
        case "GRADIENT GROUP (6)":
            if (banner.length > 0) {
                banner[banner.length - 1].style["background"] = "linear-gradient(90deg, #d3ce42, #0447d7)";
            }
            break;
        case "GRADIENT GROUP (7)":
            if (banner.length > 0) {
                banner[banner.length - 1].style["background"] = "linear-gradient(90deg, #4b1248, #f0c27b)";
            }
            break;
        case "GRADIENT GROUP (8)":
            if (banner.length > 0) {
                banner[banner.length - 1].style["background"] = "linear-gradient(90deg, #0575e6, #04c651)";
            }
            break;
        case "GRADIENT GROUP (0)":
            if (banner.length > 0) {
                banner[banner.length - 1].style["background"] = "#d4183b";
                banner[banner.length - 1].style["border-color"] = "#d4183b";
            }
            break;
        case "Дизайнер":
            if (banner.length > 0) {
                banner[banner.length - 1].style.background = "#632084";
            }
            break;
        case "Кодер":
            if (banner.length > 0) {
                banner[banner.length - 1].style.background = "#483D8B";
            }
            break;
        case "Куратор":
            if (banner.length > 0) {
                banner[banner.length - 1].style.background = "#1f61a2";
            }
            break;
        case "Модератор":
            if (banner.length > 0) {
                banner[banner.length - 1].style.background = "#023c75";
            }
            break;
        case "Арбитр":
            if (banner.length > 0) {
                banner[banner.length - 1].style.background = "#086761";
            }
            break;
        case "Старший Модератор":
            if (banner.length > 0) {
                banner[banner.length - 1].style.background = "#265571";
            }
            break;
        case "Главный Модератор":
            if (banner.length > 0) {
                banner[banner.length - 1].style.background = "#006400";
            }
            break;
        case "Администратор":
            if (banner.length > 0) {
                banner[banner.length - 1].style.background = "#7d2226";
            }
            break;
        default:
            if (banner.length > 0) {
                if (localStorage.getItem("syncGroups") == "true") {
                    if (name.firstChild.classList == null || name.firstChild.classList.contains("username--banned") == false) {
                        var groups = JSON.parse(localStorage.getItem("SyncGroups"));
                        for (let i1 = 0; i1 < groups.length; i1++) {
                            if (groups[i1].Username == name.outerText) {
                                var styles = groups[i1].BannerStyles.split(";");
                                for (let j = 0; j < styles.length; j++) {
                                    banner[banner.length - 1].style[styles[j].substring(0, styles[j].indexOf(":")).trim()] = styles[j].substring(styles[j].indexOf(":") + 1).trim();
                                }
                                break;
                            }
                        }
                    }
                }
                if (localStorage.getItem("selfStyling") == "true") {
                    var groups = JSON.parse(localStorage.getItem("customGroups"));
                    for (let i = 0; i < groups.length; i++) {
                        if (groups[i].name == group) {
                            var styles = groups[i].banner.split(";");
                            for (let j = 0; j < styles.length; j++) {
                                banner[banner.length - 1].style[styles[j].substring(0, styles[j].indexOf(":")).trim()] = styles[j].substring(styles[j].indexOf(":") + 1).trim();
                            }
                            break;
                        }
                    }
                }
            }
            break;
    }
}

if (localStorage.getItem("groupChange") == null) {
	localStorage.setItem("groupChange", "true");
	localStorage.setItem("selfStyling", "false");
	localStorage.setItem("customGroups", '[{"name":"Lolz1","banner":"background: linear-gradient(13deg, #007a98 , #0fdc91);","username":"background: linear-gradient(20deg, #006eff, #00ff81 52%, #fff 50%, #93cbff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 0 0 7px #00ffcf80;"},{"name":"Lolz2","banner":"background: linear-gradient(94.22deg, #F23108 -1.97%, #FF5252 7.72%, #FF3528 8.41%, #ED9024 9.09%, #FFA030 27.08%, #FCAA49 47.13%, #FCB35D 48.21%, #FFB763 63.58%, #FFA843 78.29%, #FBA846 89.95%, #FF3528 90.97%, #FF5252 91.84%, #F23108 101.53%); box-shadow: inset 0px 0px 0px 2px #FF9E3673, inset 0px 0px 0px 4px #ffda831c; -webkit-text-fill-color: #fff; text-shadow: 0px 5px 3px #FF7D5599, 0px -5px 3px #FF7D5599, 0px 8px 1px #ff90763d, 0px 0px 9px #fff;","username":"background: linear-gradient(80deg, #FF2E00 32%, #EF9E00 3% ); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 1px 3px 34px rgba(255, 193, 71, 0.13), 3px 1px 15px rgba(236, 78, 11, 0.45);"},{"name":"Lolz3","banner":"background: linear-gradient(-225deg, rgb(51 51 51 / 1) 0%, rgb(41 41 41) 48%, rgb(41 41 41) 100%);     color: #ffffff;text-shadow:     0px -2px 2px #f0f0f0","username":"color: #ffffff;text-shadow:  0px -2px 2px #f0f0f0"},{"name":"Lolz4","banner":"background: linear-gradient(106.32deg, rgb(10, 114, 252) 8.32%, #005aff 8.33%, #0094ff 90.46%, rgb(2, 133, 255) 90.65%);     text-shadow: 2px 0px 6px #ffffff1a, 2px 0px 6px #00f7ff, 2px 0px 8px #00ffdd, 2px 0px 8px #4f7dff, 0 9px 0px #ffffff26, 0 -11px 0px #ffffff26, 0 -1px 0 #4559d0, 0 1px 0 #4559d0, 0 1px 0 #4559d0, -1px 0 0 #4559d0, 1px 0 7px #4559d0, -1px 0 0 #4559d0, 1px 0 0 #4559d0, -1px -1px 0 #4559d0; };","username":"color: #00c4ff; text-shadow: 0 0 7px #006bffc7, 0px 0px 0px #4083ff, 0px 1px 0px #0014ffc7, 0px 1px 10px #1b00ff, -1px 1px 0px #0014ffc7, 1px 0px 0px #0014ffc7, -1px -1px 0px #0014ffc7;"},{"name":"Lolz5","banner":"background: linear-gradient(20deg, #0a7cde 0%, #57fff3 100%,#0095dd);","username":"background: linear-gradient(264deg, #0a7cde, #57fff3);     text-shadow: 0 0 6px #00ccffbd;     -webkit-background-clip: text;     -webkit-text-fill-color: transparent;"},{"name":"Lolz6","banner":"background: repeating-linear-gradient(45deg, #00000040, #ffffff40, #00000040, #ffffff40, #00000040, #ffffff40, #00000040, #ffffff40, #00000040), linear-gradient(180deg, #fff 0%, #fff 33.33333%, #0039a6 33.33333%, #0039a6 66.66666%, #d52b1e 66.66666%, #d52b1e 100%);text-shadow:                     0 0 3px #ffffff, 0px 1px 0px #ffffff, 0px 3px 0px #ffffff4f, 0px 5px 0px #ffffff2e;     color: #fff;     border-radius: 0px","username":"background: repeating-linear-gradient(45deg, #ffffff80, #00000080, #ffffff80, #00000080, #ffffff80, #00000080, #ffffff80, #00000080, #ffffff80, #00000080), linear-gradient(180deg, #fff 0%, #fff 43%, #0058ff 20%, #0058ff 62%, #f00 62%), linear-gradient(180deg, #fff 0%, #fff 43%, #0058ff 20%, #0058ff 62%, #f00 62%), linear-gradient(180deg, #fff 0%, #fff 43%, #0058ff 20%, #0058ff 62%, #f00 62%);text-shadow:   0 0 8px #ffffff40;-webkit-background-clip: text;-webkit-text-fill-color: transparent"},{"name":"Lolz7","banner":"background: background: #28CB3E; background: -webkit-linear-gradient(bottom right, #28CB3E, #0C7D43); background: -moz-linear-gradient(bottom right, #28CB3E, #0C7D43); background: linear-gradient(to top left, #28CB3E, #0C7D43);text-shadow:        #28CB3E 3px 3px 8px, #68ff16 -2px 3px 9px","username":"background: linear-gradient(90deg, #03FF03, #136E0C); -webkit-background-clip: text; -webkit-text-fill-color: transparent;text-shadow:         0px 0px 9px #00bd8d"}]');
}

if (localStorage.getItem("GroupsData") == null) {
    localStorage.setItem("GroupsData", "{\"users\":[], \"usernames\":[]}");
}
var from_json = JSON.parse(localStorage.getItem("GroupsData"));
var users = from_json.users;
var usernames = from_json.usernames;

setInterval( () => {
    if (localStorage.getItem("groupChange") == "true") {
    var _usernames = $("[class^='username']");
    for (let i = 0; i < _usernames.length; i++) {
        var index = usernames.indexOf(_usernames[i].outerText);
        if (_usernames[i].outerText.startsWith("@") && index < 0)
            index = usernames.indexOf(_usernames[i].outerText.substring(1));
        if (index >= 0) {
            if (_usernames[i].lastChild.style == null && _usernames[i].innerHTML.indexOf("<strong>") < 0 || _usernames[i].firstChild.classList == null) {
                continue;
            }
			if (_usernames[i].innerHTML.indexOf("<strong>") >= 0) {
				if (_usernames[i].querySelector("strong").outerText != _usernames[i].outerText) {
					_usernames[i].innerHTML = '<strong>' + _usernames[i].outerText + '</strong>';
				}
			}
            var group = users[index].group;
            var parent = _usernames[i].parentElement.parentElement.parentElement.parentElement;
            var banner = parent.getElementsByClassName("userBanner");
            var setBanner_ = true;
            if (document.getElementsByClassName("blockMessage blockMessage--error").length != 0 && document.getElementsByClassName("formRow-explain").length != 0) {
                if (i > 0) {
                    setBanner_ = false;
                }
            }
            _usernames[i].lastChild.style["-webkit-background-clip"] = "unset";
            _usernames[i].lastChild.style["-webkit-text-fill-color"] = "unset";
            _usernames[i].lastChild.style["background"] = "unset";
            _usernames[i].lastChild.style["text-decoration"] = "unset";
            if (setBanner_ == true) {
                setBanner(banner, group, _usernames[i]);
            }
            var def = ["Куратор", "Модератор", "Старший Модератор", "Арбитр", "Главный Модератор", "Администратор", "Забаненный", "Read Only", "Новичок", "Новичок+", "Начинающий", "Пользователь", "Участник", "Эксперт",
            "Олдфаг", "YOUGAME ELITE", "Глобальная элита", "Продавец", "Премиум", "Unreal Engine Group", "Легенда", "GRADIENT GROUP (", "Бот форума", "Тех. Администратор"];
            var groups = ["Куратор", "Модератор", "Старший Модератор", "Арбитр", "Главный Модератор", "Администратор", "Тех. Администратор"];
            var title = _usernames[i].parentElement.parentElement.getElementsByClassName("userTitle");
            if (isGarant(title)) {
                var _title = title[0].outerText;
                if (_title.startsWith("Куратор раздел") == true) {
                    _title = "Куратор";
                }
                if (_title == "Модератор форума") {
                    _title = "Модератор";
                }
                if (_title.startsWith("GRADIENT GROUP (")) {
                    _title = "GRADIENT GROUP (";
                }
                if (groups.includes(group) == false && def.includes(group) == true) {
                    title[0].outerText = "";
                }
            }

            switch (group) {
                case "Забаненный":
                    _usernames[i].lastChild.style.color = "#b1b0b0";
                    _usernames[i].lastChild.style["text-decoration"] = "line-through";
                    _usernames[i].lastChild.style["font-weight"] = "inherit";
                    break;
                case "Read Only":
                    _usernames[i].lastChild.style.color = "#b7b1b1";
                    break;
                case "Новичок":
                case "Новичок+":
                case "Начинающий":
                case "Пользователь":
                case "Участник":
                case "Эксперт":
                    _usernames[i].lastChild.style.color = "#b1b0b0";
                    break;
                case "Олдфаг":
                    _usernames[i].lastChild.style.color = "#23AF8B";
                    break;
                case "YOUGAME ELITE":
                case "Глобальная элита":
                    _usernames[i].lastChild.style["background"] = "linear-gradient(90deg, #f94444 0%, #6459f5 100%, #0095dd)";
                    _usernames[i].lastChild.style["-webkit-background-clip"] = "text";
                    _usernames[i].lastChild.style["-webkit-text-fill-color"] = "transparent";
                    break;
                case "Продавец":
                    _usernames[i].lastChild.style.color = "#f37e47";
                    break;
                case "Премиум":
                    _usernames[i].lastChild.style.color = "#f1f104";
                    break;
                case "Unreal Engine Group":
                    _usernames[i].lastChild.style.color = "#fe0091";
                    break;
                case "Легенда":
                    _usernames[i].lastChild.style["background"] = "linear-gradient(90deg, #04adff 0%, #ff0049 100%, #0095dd)";
                    _usernames[i].lastChild.style["-webkit-background-clip"] = "text";
                    _usernames[i].lastChild.style["-webkit-text-fill-color"] = "transparent";
                    break;
                case "GRADIENT GROUP (1)":
                    _usernames[i].lastChild.style["background"] = "linear-gradient(90deg, #5c84ac 0%, #e6ecf1 100%, #0095dd)";
                    _usernames[i].lastChild.style["-webkit-background-clip"] = "text";
                    _usernames[i].lastChild.style["-webkit-text-fill-color"] = "transparent";
                    break;
                case "GRADIENT GROUP (2)":
                    _usernames[i].lastChild.style["background"] = "linear-gradient(90deg, #baffdf 0%, #346557 100%, #0095dd)";
                    _usernames[i].lastChild.style["-webkit-background-clip"] = "text";
                    _usernames[i].lastChild.style["-webkit-text-fill-color"] = "transparent";
                    break;
                case "GRADIENT GROUP (3)":
                    _usernames[i].lastChild.style["background"] = "linear-gradient(90deg, #adfff9 0%, #93b9ff 100%, #7f7fd5)";
                    _usernames[i].lastChild.style["-webkit-background-clip"] = "text";
                    _usernames[i].lastChild.style["-webkit-text-fill-color"] = "transparent";
                    break;
                case "GRADIENT GROUP (4)":
                    _usernames[i].lastChild.style["background"] = "linear-gradient(90deg, #ffeef5 0%, #654ea3 100%, #0095dd)";
                    _usernames[i].lastChild.style["-webkit-background-clip"] = "text";
                    _usernames[i].lastChild.style["-webkit-text-fill-color"] = "transparent";
                    break;
                case "GRADIENT GROUP (5)":
                    _usernames[i].lastChild.style["background"] = "linear-gradient(90deg, #f00, #fff200, #1e9600)";
                    _usernames[i].lastChild.style["-webkit-background-clip"] = "text";
                    _usernames[i].lastChild.style["-webkit-text-fill-color"] = "transparent";
                    break;
                case "GRADIENT GROUP (6)":
                    _usernames[i].lastChild.style["background"] = "linear-gradient(90deg, #fff94c 0%, #004ff9 100%, #0095dd)";
                    _usernames[i].lastChild.style["-webkit-background-clip"] = "text";
                    _usernames[i].lastChild.style["-webkit-text-fill-color"] = "transparent";
                    break;
                case "GRADIENT GROUP (7)":
                    _usernames[i].lastChild.style["background"] = "linear-gradient(90deg, #8f2589 0%, #ffc56b 100%, #0095dd)";
                    _usernames[i].lastChild.style["-webkit-background-clip"] = "text";
                    _usernames[i].lastChild.style["-webkit-text-fill-color"] = "transparent";
                    break;
                case "GRADIENT GROUP (8)":
                    _usernames[i].lastChild.style["background"] = "linear-gradient(90deg, #0575e6 0%, #03de5a 100%, #0095dd)";
                    _usernames[i].lastChild.style["-webkit-background-clip"] = "text";
                    _usernames[i].lastChild.style["-webkit-text-fill-color"] = "transparent";
                    break;
                case "Тех. Администратор":
                    _usernames[i].lastChild.style.color = "#ffffff";
                    break;
                case "Бот форума":
                    _usernames[i].lastChild.style.color = "#20B2AA";
                    break;
                case "GRADIENT GROUP (0)":
                    _usernames[i].lastChild.className = "username";
                    break;
                case "Дизайнер":
                    _usernames[i].lastChild.style.color = "#ae3ce6";
                    break;
                case "Кодер":
                    _usernames[i].lastChild.style.color = "#6A5ACD";
                    break;
                case "Куратор":
                    _usernames[i].lastChild.style.color = "#4c8ccc";
                    var title = _usernames[i].parentElement.parentElement.getElementsByClassName("userTitle");
                    if (isGarant(title)) {
                        title[0].innerHTML = "Куратор раздела «uGame Secret Section»";
                        title[0].style["color"] = "#bbd6e6";
                    }
                    break;
                case "Модератор":
                    _usernames[i].lastChild.style.color = "#1d6dbd";
                    var title = _usernames[i].parentElement.parentElement.getElementsByClassName("userTitle");
                    if (isGarant(title)) {
                        title[0].innerHTML = "Модератор форума";
                        title[0].style["color"] = "#bbd6e6";
                    }
                    break;
                case "Арбитр":
                    _usernames[i].lastChild.style.color = "#17a79e";
                    var title = _usernames[i].parentElement.parentElement.getElementsByClassName("userTitle");
                    if (isGarant(title)) {
                        title[0].innerHTML = "Арбитр";
                        title[0].style["color"] = "#bbd6e6";
                    }
                    break;
                case "Старший Модератор":
                    _usernames[i].lastChild.style.color = "#428db9";
                    var title = _usernames[i].parentElement.parentElement.getElementsByClassName("userTitle");
                    if (isGarant(title)) {
                        title[0].innerHTML = "Старший Модератор";
                        title[0].style["color"] = "#bbd6e6";
                    }
                    break;
                case "Главный Модератор":
                    _usernames[i].lastChild.style.color = "#2DAF4A";
                    var title = _usernames[i].parentElement.parentElement.getElementsByClassName("userTitle");
                    if (isGarant(title)) {
                        title[0].innerHTML = "Главный Модератор";
                        title[0].style["color"] = "#bbd6e6";
                    }
                    break;
                case "Администратор":
                    _usernames[i].lastChild.style.color = "#ec2d35";
                    var title = _usernames[i].parentElement.parentElement.getElementsByClassName("userTitle");
                    if (isGarant(title)) {
                        title[0].innerHTML = "Администратор";
                        title[0].style["color"] = "#bbd6e6";
                    }
                    break;
                default:
                    var isBad = false;
                    if (localStorage.getItem("syncGroups") == "true") {
                        if (_usernames[i].firstChild.classList.contains("username--banned") == false) {
                            var groups = JSON.parse(localStorage.getItem("SyncGroups"));
                            var i1 = 0;
                            for (; i1 < groups.length; i1++) {
                                if (groups[i1].Username == usernames[index]) {
                                    var styles = groups[i1].NameStyles.split(";").filter(element => element != "");
                                    for (let j = 0; j < styles.length; j++) {
                                        _usernames[i].lastChild.style[styles[j].substring(0, styles[j].indexOf(":")).trim()] = styles[j].substring(styles[j].indexOf(":") + 1).trim();
                                    }
                                    break;
                                }
                            }
                            isBad = i1 == groups.length;
                        }
                    }
                    if (localStorage.getItem("selfStyling") == "true") {
                        var groups = JSON.parse(localStorage.getItem("customGroups"));
						var i1 = 0;
                        for (; i1 < groups.length; i1++) {
                            if (groups[i1].name == group) {
                                var styles = groups[i1].username.split(";").filter(element => element != "");
                                for (let j = 0; j < styles.length; j++) {
                                    _usernames[i].lastChild.style[styles[j].substring(0, styles[j].indexOf(":")).trim()] = styles[j].substring(styles[j].indexOf(":") + 1).trim();
                                }
                                break;
                            }
                        }
                        if (i1 == groups.length && isBad == true) {
                            removeGroupFromData(usernames[index]);
                            continue;
                        }
                    }
                    break;
            }

            if (_usernames[i].getElementsByTagName("i").length != 0) {
                var elem = _usernames[i].getElementsByTagName("i")[0];
                elem.style["color"] = "#fff";
                elem.style["background"] = _usernames[i].lastChild.style.background != "unset" ? String(_usernames[i].lastChild.style.background).replace("90deg", "270deg").replace(" text", "") : _usernames[i].lastChild.style.color;
                elem.style["background-size"] = "150% 150%";
                elem.style["-webkit-background-clip"] = "text";
                elem.style["background-clip"] = "text";
                elem.style["-webkit-text-fill-color"] = "transparent";
                elem.style["text-fill-color"] = "transparent";
                elem.style["animation"] = "unset";
            }

            if (document.body.getAttribute("data-template") == "thread_view") {
                if (group == "Забаненный") {
                    if (_usernames[i].parentElement.className != "message-name") {
                        continue;
                    }
                    var msg = _usernames[i].parentElement.parentElement.parentElement.parentElement.parentElement;
                    var text = msg.getElementsByClassName("message-content js-messageContent")[0];
                    if (text.getElementsByClassName("blockMessage blockMessage--error blockMessage--iconic").length == 0) {
                        let el = document.createElement('div');
                        el.innerHTML = "<div class=\"blockMessage blockMessage--error blockMessage--iconic\">Обратите внимание, пользователь заблокирован на форуме. Не рекомендуется проводить сделки.</div>";
                        text.insertBefore(el, text.firstChild);
                    }
                }
                var msg = _usernames[i].parentElement.parentElement.parentElement.parentElement.parentElement;
                var text = msg.getElementsByClassName("message-content js-messageContent")[0];
                    if (text != null) {
                    var ban = text.getElementsByClassName("blockMessage blockMessage--error blockMessage--iconic");
                    if (group != "Забаненный" && ban.length > 0) {
                        text.removeChild(ban[0]);
                    }
                }
            }

            if (document.body.getAttribute("data-template") == "member_view") {
                if (group == "Забаненный") {
                    var j = 0;
                    for (; j < users.length; j++) {
                        if (usernames[j] == _usernames[0].outerText) {
                            break;
                        }
                    }

                    if (i != 0) {
                        continue;
                    }
                    var content = _usernames[i].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
                    if (content.getElementsByClassName("blockMessage blockMessage--error").length == 0) {
                        let el = document.createElement('div');
                        el.innerHTML = '<div class="blockMessage blockMessage--error"><p class="formRow-explain"><strong><i class="fa--xf far fa-user-times fa-fw" aria-hidden="true" title="Пользователь заблокирован"></i> Пользователь заблокирован</strong></p>	<p class="block-rowMessage block-rowMessage--warning block-rowMessage--iconic">Не рекомендуем проводить сделки до истечения срока блокировки пользователя. Если пользователь уже обманул вас каким-либо образом, обратитесь в наш арбитражный отдел, чтобы мы могли как можно скорее решить проблему. </p><p class="formRow-explain"><strong><i class="fa--xf far fa-user-circle fa-fw" aria-hidden="true" title="Заблокировал(а)"></i> Заблокировал(а)</strong>: <a href="/irval/" class="username " dir="auto" data-user-id="210082"><span class="username--style47 username--staff username--moderator">Irval</span></a> <br><strong><i class="fa--xf far fa-calendar fa-fw" aria-hidden="true" title="Дата блокировки"></i> Дата блокировки</strong>: ' + users[j].banDate + '<br><strong><i class="fa--xf far fa-flag fa-fw" aria-hidden="true" title="Окончание блокировки"></i> Окончание блокировки</strong>: Никогда <br><strong><i class="fa--xf far fa-comment fa-fw" aria-hidden="true" title="Причина блокировки"></i> Причина блокировки</strong>: ' + users[j].banReason + '<br><strong><i class="fa--xf far fa-fire fa-fw" aria-hidden="true" title="Автоматически срабатывает"></i> Автоматически срабатывает:</strong> Нет</p></div>';
                        content.insertBefore(el, content.children[1]);

                        el = document.createElement('div');
                        el.innerHTML = '<div class="memberHeader-actionTop"><div class="buttonGroup"><a class="button--link button" id="changeBan" data-xf-click="overlay"><span class="button-text">Редактировать блокировку</span></a></div></div>';
                        document.getElementsByClassName("memberHeader-content memberHeader-content--info")[0].insertBefore(el, document.getElementsByClassName("memberHeader-content memberHeader-content--info")[0].firstChild);

                        document.getElementById("changeBan").addEventListener("click", changeBan); 
                    }
                }
            }
        }
    }

    if (location.href.startsWith("https://yougame.biz/market/") && document.getElementsByClassName("block-minorHeader").length > 0) {
        var index = usernames.indexOf(document.getElementsByClassName("block-minorHeader")[0].outerText);
        if (index >= 0) {
            var group = users[index].group;
            setBanner( document.getElementsByClassName("block-minorHeader")[0].parentElement.parentElement.getElementsByClassName("userBanner"), group, document.getElementsByClassName("block-minorHeader")[0]);
        }
    }

    if (document.location.href == "https://yougame.biz/" || document.location.href == "https://yougame.bz/") {
        var blocks = document.getElementsByClassName("block");
        for (let i = 0; i < blocks.length; i++) {
            if (blocks[i].getAttribute("data-widget-section") != "staffMembers") {
                continue;
            }
            var staff = blocks[i].getElementsByClassName("username");
            for (let j = 0; j < staff.length; j++) {
                var index = usernames.indexOf(staff[j].outerText);
                if (index >= 0) {
                    var def = ["Куратор", "Модератор", "Старший Модератор", "Арбитр", "Главный Модератор", "Администратор", "Забаненный", "Read Only", "Новичок", "Новичок+", "Начинающий", "Пользователь", "Участник", "Эксперт",
                    "Олдфаг", "YOUGAME ELITE", "Глобальная элита", "Продавец", "Премиум", "Unreal Engine Group", "Легенда", "GRADIENT GROUP (", "Бот форума"];
                    var groups = ["Куратор", "Модератор", "Старший Модератор", "Арбитр", "Главный Модератор", "Администратор"];
                    if (groups.includes(users[index].group) == false && def.includes(users[index].group) == true) {
                        staff[j].parentElement.parentElement.parentElement.parentElement.removeChild(staff[j].parentElement.parentElement.parentElement);
                    }

                }
            }
            break;
        }
    }
}
}, timeout)
