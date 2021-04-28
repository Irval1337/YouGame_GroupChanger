function save(type){
  chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {groupChange: localStorage.getItem("groupChange") == "true", selfStyling: localStorage.getItem("selfStyling") == "true",
    customGroups: localStorage.getItem("customGroups"), type:type, customEmoji: localStorage.getItem("customEmoji"), syncGroups: localStorage.getItem("syncGroups")});
})
}

function selfStylingGroups() {
  var checkBoxMain = document.getElementById("groupChange");
  var checkBox = document.getElementById("selfStyling");
  var block = document.getElementById("groupChangeBlock");
  if (checkBox.checked == true && checkBoxMain.checked == true){
    block.style.display = "block";
  } else {
    var blocks = document.getElementsByClassName("popup-block");
    for (let i = 1; i < blocks.length; i++) {
      blocks[i].style.display = "none";
    }
  }

  localStorage.setItem("groupChange", checkBoxMain.checked);
  localStorage.setItem("selfStyling", checkBox.checked);

  save("cb");
}

function customEmoji() {
  var checkBox = document.getElementById("customEmoji");
  localStorage.setItem("customEmoji", checkBox.checked);

  save("cb");
}

function syncGroups() {
  var checkBox = document.getElementById("syncGroups");
  localStorage.setItem("syncGroups", checkBox.checked);

  save("cb");
}

function editStyle() {
  var block = document.getElementById("styleChangeBlock");
  var groupName = document.getElementById("select").value;
  if (groupName != "") {
    block.style.display="block";
    var groups = JSON.parse(localStorage.getItem("customGroups"));
    for (let i = 0; i < groups.length; i++) {
      if (groups[i].name == groupName) {
        document.getElementById("nameTextE").value = groups[i].name;
        document.getElementById("bannerTextE").value = groups[i].banner;
        document.getElementById("userTextE").value = groups[i].username;
        break;
      }
    }
  }
}

function addStyle(){
  var block = document.getElementById("newGroup");
  block.style.display="block";
}

function editGroup(){
  var checkBox = document.getElementById("selfStyling");
  var block = document.getElementById("styleChangeBlock");
  if (checkBox.checked == true){
    block.style.display = "block";
  } else {
    block.style.display = "none";
  }
  
  save("cb");
}

function closeObj1(){
  var block = document.getElementById("styleChangeBlock");
  block.style.display="none";
}

function closeObj2(){
  var block = document.getElementById("newGroup");
  block.style.display="none";
}

function createGroup(){
  if (String(document.getElementById("nameText").value).startsWith("$") != true) {
    var name = document.getElementById("nameText").value;
    var banner = document.getElementById("bannerText").value;
    var username = document.getElementById("userText").value;

    var groups = JSON.parse(localStorage.getItem("customGroups"));
    var group = {
      name: name,
      banner: banner,
      username: username
    };
    groups.push(group);
    localStorage.setItem("customGroups", JSON.stringify(groups));

    newGroup = new Option(name, name);
    document.getElementById("select").appendChild(newGroup);

    document.getElementById("nameText").value = "";
    document.getElementById("bannerText").value = "";
    document.getElementById("userText").value = "";
    closeObj2();

    save("new");
  }
}

function changeGroup(){
  var groupName = document.getElementById("select").value;
  if (groupName != "") {
    var groups = JSON.parse(localStorage.getItem("customGroups"));
    for (let i = 0; i < groups.length; i++) {
      if (groups[i].name == groupName && String(document.getElementById("nameTextE").value).startsWith("$") != true) {
        groups[i].name = document.getElementById("nameTextE").value;
        groups[i].banner = document.getElementById("bannerTextE").value;
        groups[i].username = document.getElementById("userTextE").value;

        document.getElementById("select").options[i] = new Option(groups[i].name, groups[i].name);
        document.getElementById("select").value = groups[i].name;
        break;
      }
    }
  }
  localStorage.setItem("customGroups", JSON.stringify(groups));
  closeObj1();

  save("edit");
}

function deleteGroup(){
  var groups = JSON.parse(localStorage.getItem("customGroups"));
  var name = document.getElementById("select").value;
  for (let i = 0; i < groups.length; i++) {
    if (groups[i].name == name) {
      groups.splice(i, 1);
      document.getElementById("select").removeChild(document.getElementById("select").options[i]);
      break;
    }
  }
  localStorage.setItem("customGroups", JSON.stringify(groups));
  closeObj1();

  save("del");
}

if (localStorage.getItem("groupChange") == null) {
  localStorage.setItem("groupChange", true);
}
if (localStorage.getItem("selfStyling") == null) {
  localStorage.setItem("selfStyling", false);
}
if (localStorage.getItem("customEmoji") == null) {
  localStorage.setItem("customEmoji", false);
}
if (localStorage.getItem("syncGroups") == null) {
  localStorage.setItem("syncGroups", false);
}

document.getElementById("groupChange").checked = localStorage.getItem("groupChange") == "true";
document.getElementById("selfStyling").checked = localStorage.getItem("selfStyling") == "true";
document.getElementById("customEmoji").checked = localStorage.getItem("customEmoji") == "true";
document.getElementById("syncGroups").checked = localStorage.getItem("syncGroups") == "true";

if (localStorage.getItem("groupChange") == "true" && localStorage.getItem("selfStyling") == "true") {
  var block = document.getElementById("groupChangeBlock");
  block.style.display = "block";
}

document.getElementById("select").innerHTML = "";

if (localStorage.getItem("customGroups") == null) {
  localStorage.setItem("customGroups", '[{"name":"Lolz1","banner":"background: linear-gradient(13deg, #007a98 , #0fdc91);","username":"background: linear-gradient(20deg, #006eff, #00ff81 52%, #fff 50%, #93cbff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 0 0 7px #00ffcf80;"},{"name":"Lolz2","banner":"background: linear-gradient(94.22deg, #F23108 -1.97%, #FF5252 7.72%, #FF3528 8.41%, #ED9024 9.09%, #FFA030 27.08%, #FCAA49 47.13%, #FCB35D 48.21%, #FFB763 63.58%, #FFA843 78.29%, #FBA846 89.95%, #FF3528 90.97%, #FF5252 91.84%, #F23108 101.53%); box-shadow: inset 0px 0px 0px 2px #FF9E3673, inset 0px 0px 0px 4px #ffda831c; -webkit-text-fill-color: #fff; text-shadow: 0px 5px 3px #FF7D5599, 0px -5px 3px #FF7D5599, 0px 8px 1px #ff90763d, 0px 0px 9px #fff;","username":"background: linear-gradient(80deg, #FF2E00 32%, #EF9E00 3% ); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 1px 3px 34px rgba(255, 193, 71, 0.13), 3px 1px 15px rgba(236, 78, 11, 0.45);"},{"name":"Lolz3","banner":"background: linear-gradient(-225deg, rgb(51 51 51 / 1) 0%, rgb(41 41 41) 48%, rgb(41 41 41) 100%);     color: #ffffff;text-shadow:     0px -2px 2px #f0f0f0","username":"color: #ffffff;text-shadow:  0px -2px 2px #f0f0f0"},{"name":"Lolz4","banner":"background: linear-gradient(106.32deg, rgb(10, 114, 252) 8.32%, #005aff 8.33%, #0094ff 90.46%, rgb(2, 133, 255) 90.65%);     text-shadow: 2px 0px 6px #ffffff1a, 2px 0px 6px #00f7ff, 2px 0px 8px #00ffdd, 2px 0px 8px #4f7dff, 0 9px 0px #ffffff26, 0 -11px 0px #ffffff26, 0 -1px 0 #4559d0, 0 1px 0 #4559d0, 0 1px 0 #4559d0, -1px 0 0 #4559d0, 1px 0 7px #4559d0, -1px 0 0 #4559d0, 1px 0 0 #4559d0, -1px -1px 0 #4559d0; };","username":"color: #00c4ff; text-shadow: 0 0 7px #006bffc7, 0px 0px 0px #4083ff, 0px 1px 0px #0014ffc7, 0px 1px 10px #1b00ff, -1px 1px 0px #0014ffc7, 1px 0px 0px #0014ffc7, -1px -1px 0px #0014ffc7;"},{"name":"Lolz5","banner":"background: linear-gradient(20deg, #0a7cde 0%, #57fff3 100%,#0095dd);","username":"background: linear-gradient(264deg, #0a7cde, #57fff3);     text-shadow: 0 0 6px #00ccffbd;     -webkit-background-clip: text;     -webkit-text-fill-color: transparent;"},{"name":"Lolz6","banner":"background: repeating-linear-gradient(45deg, #00000040, #ffffff40, #00000040, #ffffff40, #00000040, #ffffff40, #00000040, #ffffff40, #00000040), linear-gradient(180deg, #fff 0%, #fff 33.33333%, #0039a6 33.33333%, #0039a6 66.66666%, #d52b1e 66.66666%, #d52b1e 100%);text-shadow:                     0 0 3px #ffffff, 0px 1px 0px #ffffff, 0px 3px 0px #ffffff4f, 0px 5px 0px #ffffff2e;     color: #fff;     border-radius: 0px","username":"background: repeating-linear-gradient(45deg, #ffffff80, #00000080, #ffffff80, #00000080, #ffffff80, #00000080, #ffffff80, #00000080, #ffffff80, #00000080), linear-gradient(180deg, #fff 0%, #fff 43%, #0058ff 20%, #0058ff 62%, #f00 62%), linear-gradient(180deg, #fff 0%, #fff 43%, #0058ff 20%, #0058ff 62%, #f00 62%), linear-gradient(180deg, #fff 0%, #fff 43%, #0058ff 20%, #0058ff 62%, #f00 62%);text-shadow:   0 0 8px #ffffff40;-webkit-background-clip: text;-webkit-text-fill-color: transparent"},{"name":"Lolz7","banner":"background: background: #28CB3E; background: -webkit-linear-gradient(bottom right, #28CB3E, #0C7D43); background: -moz-linear-gradient(bottom right, #28CB3E, #0C7D43); background: linear-gradient(to top left, #28CB3E, #0C7D43);text-shadow:        #28CB3E 3px 3px 8px, #68ff16 -2px 3px 9px","username":"background: linear-gradient(90deg, #03FF03, #136E0C); -webkit-background-clip: text; -webkit-text-fill-color: transparent;text-shadow:         0px 0px 9px #00bd8d"}]');
}
var groups = JSON.parse(localStorage.getItem("customGroups"));

for (let i = 0; i < groups.length; i++) {
  var newGroup = new Option(groups[i].name, groups[i].name);
  document.getElementById("select").appendChild(newGroup);
}

document.getElementById("groupChange").addEventListener("click", selfStylingGroups); 
document.getElementById("selfStyling").addEventListener("click", selfStylingGroups); 
document.getElementById("customEmoji").addEventListener("click", customEmoji); 
document.getElementById("syncGroups").addEventListener("click", syncGroups); 
document.getElementById("addGroup").addEventListener("click", addStyle); 
document.getElementById("editGroup").addEventListener("click", editStyle);
document.getElementById("closeObj1").addEventListener("click", closeObj1);
document.getElementById("createGroup").addEventListener("click", createGroup); 
document.getElementById("closeObj2").addEventListener("click", closeObj2);
document.getElementById("changeGroup").addEventListener("click", changeGroup);
document.getElementById("deleteGroup").addEventListener("click", deleteGroup);

document.querySelector("select").addEventListener('change', function (e) {
  var block = document.getElementById("styleChangeBlock");
  if (block.style.display == "block") {
    editStyle();
  }
})