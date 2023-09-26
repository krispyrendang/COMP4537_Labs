setInterval(function () {
    function checkTime(i) {
        return (i < 10) ? "0" + i : i;
    }
	retrieveNotes();
    var today = new Date();
	var h = checkTime(today.getHours());
	var m = checkTime(today.getMinutes());
	var s = checkTime(today.getSeconds());

	if(h<12){
		document.getElementById("timestamp").innerText = "stored at: " + h + ":" + m + ":" + s + "AM";
	} else {
		document.getElementById("timestamp").innerText = "stored at: " + (h-12) + ":" + m + ":" + s + "PM";
	}
}, 2000);

function retrieveNotes(){''
    let arr = localStorage.getItem("notes");
	let str = "";
	let flag = 0;

    let list = document.getElementById("savedNotes");
    list.innerHTML = ""; 

	for(let i = 0; i < arr.length; i++){ 
        
		if(arr[i] === '"'){ 
			if(flag){
				flag = 0;
            
                let note = document.createElement("div"); 
                let text = document.createElement("textarea");

                text.innerText = str;

                note.appendChild(text);
                list.appendChild(note);

                str = "";
			}else {
				flag = 1;
			}
		} else if(arr[i] != ',' && flag){
			str += arr[i];

		}

	}
}