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
  var groups = [];
  localStorage.setItem("customGroups", JSON.stringify(groups));
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