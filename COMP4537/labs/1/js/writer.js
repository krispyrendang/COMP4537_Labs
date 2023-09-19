let rowCount = 1;
let arrayID = [];
let arrayNotes = [];



setInterval(function () {
	function checkTime(i) {
        return (i < 10) ? "0" + i : i;
    }
	saveNotes();
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

function saveNotes(){
	
	arrayNotes.length = 0;  

	let str = "";
	for(let i = 0; i < arrayID.length; i++){

		str = arrayID[i].replaceAll('"','');

		let noteText = JSON.stringify(document.getElementById(str).value);
		arrayNotes.push(noteText);

	}
	localStorage.setItem("notes", arrayNotes);
}

function addNote() {
	let table = document.getElementById("notes");
	let newNote = new Note();
	table.appendChild(newNote);
	let noteID = JSON.stringify(newNote.firstChild.firstChild.id);

	arrayID.push(noteID);
}

function Note() {
	this.tr = document.createElement("tr");
	const id = rowCount;
	this.tr.id = "row "+id;
	
	this.note = document.createElement("td");
	this.text = document.createElement("textarea");
	this.text.id = "text "+id;

	rowCount++;

	this.note.appendChild(this.text);

	this.remove = document.createElement("td");
	this.btn = document.createElement("button");
	this.btn.setAttribute("class", "removeBtn");
	this.btn.textContent = "Remove";
	this.remove.appendChild(this.btn);

	
	this.btn.setAttribute("onclick", "removeRow(this)");

	this.tr.appendChild(this.note);
	this.tr.appendChild(this.remove);

	return this.tr;
}

function removeRow(r) {
	var row = r.parentNode.parentNode.rowIndex;
    var note = '"' + r.parentNode.parentNode.cells[0].firstChild.id + '"';
	for(let i = 0; i < arrayID.length; i++){
		if(arrayID[i] === note){
			arrayID.splice(i, 1);
			arrayNotes.splice(i, 1);

		} 
	}
	document.getElementById("notes").deleteRow(row);
}
