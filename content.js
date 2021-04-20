window.onload = function() {class user {
    username = null
    group = null
	banReason = "Undefined"
	banDate = "Undefined"
}

function setGroup(group) {
    var username = document.getElementsByClassName("username")[0].outerText;
    var users = [];
	var usernames = [];
    if (localStorage.getItem("GroupsData") != null) {
        var from_json = JSON.parse(localStorage.getItem("GroupsData"));
        users = from_json.users;
		usernames = from_json.usernames;
    }
	var index = usernames.indexOf(username);
	if (index >= 0) {
		users[index].group = group;
	}
	else {
    	var User = new user();
    	User.username = username;
    	User.group = group;
    	users.push(User);
		usernames.push(username);
	}
    let Data = {
        users: users,
		usernames: usernames
    };

    localStorage.setItem("GroupsData", JSON.stringify(Data));
}

function removeGroup() {
    var username = document.getElementsByClassName("username")[0].outerText;
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

	if (document.getElementsByClassName("username")[0].outerText == document.getElementsByClassName("p-navgroup-linkText")[0].outerText) {
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "https://irval.host/GroupChanger/RemoveUser.php", true);
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

if (localStorage.getItem("groupChange") == null) {
	localStorage.setItem("groupChange", "true");
	localStorage.setItem("selfStyling", "false");
	localStorage.setItem("customGroups", "[]");
}

if (localStorage.getItem("groupChange") == "true" && document.body.getAttribute("data-template") == "member_view" && document.location.href.startsWith("https://yougame.biz/irval/") == false && document.location.href.startsWith("https://yougame.bz/irval/") == false) {
	const select = document.createElement("select");
    select.style["background"] = "#151d20";
    select.style["color"] = "#fff";
    select.style["border-color"] = "rgba(255,255,255,0.1) rgba(242,242,242,0.1) rgba(242,242,242,0.1) rgba(255,255,255,0.1)";

	select.setAttribute("class", "button extension__item-report remove_select");
	select.setAttribute("id", "extension_report_select");
	let option = document.createElement("option");
	option.text = "Управление группой";
	option.setAttribute("selected", "");
	select.add(option);

	option = document.createElement("option");
	option.text = "Очистить";
	select.add(option);

	option = document.createElement("option");
	option.text = "Забаненный";
	select.add(option);

	option = document.createElement("option");
	option.text = "Read Only";
	select.add(option);

	option = document.createElement("option");
	option.text = "Новичок";
	select.add(option);

	option = document.createElement("option");
	option.text = "Новичок+";
	select.add(option);

	option = document.createElement("option");
	option.text = "Начинающий";
	select.add(option);

	option = document.createElement("option");
	option.text = "Пользователь";
	select.add(option);

	option = document.createElement("option");
	option.text = "Участник";
	select.add(option);

	option = document.createElement("option");
	option.text = "Эксперт";
	select.add(option);

	option = document.createElement("option");
	option.text = "Олдфаг";
	select.add(option);

	option = document.createElement("option");
	option.text = "Глобальная элита";
	select.add(option);

	option = document.createElement("option");
	option.text = "Продавец";
	select.add(option);

	option = document.createElement("option");
	option.text = "Премиум";
	select.add(option);

	option = document.createElement("option");
	option.text = "Unreal Engine Group";
	select.add(option);

	option = document.createElement("option");
	option.text = "Легенда";
	select.add(option);

	option = document.createElement("option");
	option.text = "YOUGAME ELITE";
	select.add(option);

	option = document.createElement("option");
	option.text = "GRADIENT GROUP (0)";
	select.add(option);

	option = document.createElement("option");
	option.text = "GRADIENT GROUP (1)";
	select.add(option);

	option = document.createElement("option");
	option.text = "GRADIENT GROUP (2)";
	select.add(option);

	option = document.createElement("option");
	option.text = "GRADIENT GROUP (3)";
	select.add(option);

	option = document.createElement("option");
	option.text = "GRADIENT GROUP (4)";
	select.add(option);

	option = document.createElement("option");
	option.text = "GRADIENT GROUP (5)";
	select.add(option);

	option = document.createElement("option");
	option.text = "GRADIENT GROUP (6)";
	select.add(option);

	option = document.createElement("option");
	option.text = "GRADIENT GROUP (7)";
	select.add(option);

	option = document.createElement("option");
	option.text = "GRADIENT GROUP (8)";
	select.add(option);

	option = document.createElement("option");
	option.text = "Дизайнер";
	select.add(option);

	option = document.createElement("option");
	option.text = "Кодер";
	select.add(option);

	option = document.createElement("option");
	option.text = "Куратор";
	select.add(option);

	option = document.createElement("option");
	option.text = "Арбитр";
	select.add(option);

	option = document.createElement("option");
	option.text = "Модератор";
	select.add(option);

	option = document.createElement("option");
	option.text = "Старший Модератор";
	select.add(option);

	option = document.createElement("option");
	option.text = "Главный Модератор";
	select.add(option);

	option = document.createElement("option");
	option.text = "Администратор";
	select.add(option);
	
	option = document.createElement("option");
	option.text = "Тех. Администратор";
	select.add(option);

	if (localStorage.getItem("selfStyling") == "true") {
		var groups = JSON.parse(localStorage.getItem("customGroups"));
		for (let i = 0; i < groups.length; i++) {
			option = document.createElement("option");
			option.text = groups[i].name;
			option.id = "customGroup";
			select.add(option);
		}
	}

	var containers = document.getElementsByClassName("buttonGroup");
    containers[containers.length - 1].appendChild(select);

	let path = '#extension_report_select';

	$(path).change(function () {
		var val = $(path + " option:selected").text();

		var token = document.getElementsByName("_xfToken")[0].getAttribute("value");
		var username = document.getElementsByClassName("username")[0].outerText;
		var users = [];
		var usernames = [];
		var group = "Новичок";

		if (localStorage.getItem("GroupsData") != null) {
			var from_json = JSON.parse(localStorage.getItem("GroupsData"));
			users = from_json.users;
			usernames = from_json.usernames;
		}
		var index = usernames.indexOf(username);
		if (index >= 0) {
			group = users[index].group;
		}

		if ((group == "Read Only" && val != "Read Only") || (val == "Read Only" && group != "Read Only")) {
			var xhr = new XMLHttpRequest();
			xhr.open("POST", location.href + '/ignore/', true);
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
			xhr.send("_xfToken=" + token + "&_xfResponseType=json&_xfWithData=1");
		}

		if ($(path + " option:selected").attr("id") == "customGroup" && document.getElementsByClassName("username")[0].outerText == document.getElementsByClassName("p-navgroup-linkText")[0].outerText) {
			var xhr = new XMLHttpRequest();
			xhr.open("POST", "https://irval.host/GroupChanger/AddUser.php", true);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
			xhr.setRequestHeader("Accept", "application/json, text/javascript, */*; q=0.01");
			xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			xhr.onreadystatechange = function () {
				if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
					console.log("Request was accepted.");
				}
				else {
					console.log("Request Error. ");
				}
			}
			var info = "";
			var groups = JSON.parse(localStorage.getItem("customGroups"));
			for (let i = 0; i < groups.length; i++) {
				if (groups[i].name == val) {
					info = "Username=" + document.getElementsByClassName("username")[0].outerText + "&BannerStyles=" + groups[i].banner + "&NameStyles=" + groups[i].username;
					break;
				}
			}
			xhr.send(info);
		}

		switch (val) {
            case "Очистить":
                removeGroup();
				document.location.reload();
                break;
			default:
                if (val != "Управление группой") {
                    setGroup(val);
					document.location.reload();
                }
				break;
		}
	});
}

if (document.location.href.startsWith("https://yougame.biz/irval/") == true || document.location.href.startsWith("https://yougame.bz/irval/") == true) {
	var parent = document.getElementsByClassName("p-body-sidebar is-active")[0];
	if (parent.firstElementChild.innerText.startsWith("Статус пользователя") == false) {
		let el = document.createElement('div');
		el.innerHTML = "<div class=\"block\" data-widget-section=\"userWhoSaw\" data-widget-id=\"15\" data-widget-key=\"xc_profile_views\" data-widget-definition=\"xc_profile_views\"><div class=\"block-container\"><h3 class=\"block-minorHeader\">Статус пользователя</h3><div class=\"block-body\"><div class=\"view-count center\"><span class=\"viewCount\">Developer</span></div></div></div></div>";
		parent.insertBefore(el, parent.firstElementChild);
	} 
}

var username = document.getElementsByClassName("username")[0].outerText;
var usernames = [];
if (localStorage.getItem("GroupsData") != null) {
    var from_json = JSON.parse(localStorage.getItem("GroupsData"));
	usernames = from_json.usernames;
}
var index = usernames.indexOf(username);
if (document.body.getAttribute("data-template") == "member_view" && index >= 0) {
	var parent = document.getElementsByClassName("p-body-sidebar is-active")[0];
	if (parent.firstElementChild.innerText.startsWith("Статус пользователя") == false) {
		let el = document.createElement('div');
		el.innerHTML = "<div class=\"block\" data-widget-section=\"userWhoSaw\" data-widget-id=\"15\" data-widget-key=\"xc_profile_views\" data-widget-definition=\"xc_profile_views\"><div class=\"block-container\"><h3 class=\"block-minorHeader\">Статус пользователя</h3><div class=\"block-body\"><div class=\"view-count center\"><span class=\"viewCount\">Custom Group</span></div></div></div></div>";
		parent.insertBefore(el, parent.firstElementChild);
	}
}
};