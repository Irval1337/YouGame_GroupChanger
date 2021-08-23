if (localStorage.getItem("syncGroups") == "true") {
    localStorage.setItem("selfStyling", "true");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://groupchanger.irval.dev/GetGroups.php", true);
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            var tmp =  localStorage.getItem("SyncGroups");
            console.log("Request was accepted.");
            var User = JSON.parse(this.responseText);
            localStorage.setItem("SyncGroups", this.responseText);

            var from_json = JSON.parse(localStorage.getItem("GroupsData"));
            var users = from_json.users;
            var usernames = from_json.usernames;
            for (let i = 0; i < User.length; i++) {
                var index = usernames.indexOf(User[i].Username);
                if (index < 0) {
					let _User = {
						username: User[i].Username,
						group: "$" + User[i].Username + "$",
						banReason: "Undefined",
						banDate: "Undefined"
					};
                    users.push(_User);
                    usernames.push(_User.username);
                }
            }
            let Data = {
                users: users,
                usernames: usernames
            };
            
            localStorage.setItem("GroupsData", JSON.stringify(Data));

            if (this.responseText != tmp) {
                location.reload();
            }
        }
        else {
            console.log("Request Error.");
        }
    }
    xhr.send();
}