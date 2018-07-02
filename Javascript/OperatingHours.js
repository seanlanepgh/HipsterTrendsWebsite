//Loads javascript on window load
	window.addEventListener("load",function(e){
	loadTables();
	});
function loadTables(){
	// gets aside element id 
	var aside = document.getElementById("Aside"); 
	
	//Creates the first tables tags and stores them in variables
	var table = document.createElement("table");
	var tableBody = document.createElement("tbody");
	var row = document.createElement("tr");
	var cell = document.createElement("th");
	var cellText = document.createTextNode("Mon");
	//Append Text to a cell then adding it to a row
	cell.appendChild(cellText);
	row.appendChild(cell);
	// Creates the table header row
	//Creates a new cell element with  text within the cell then adds its to the row
	cell = document.createElement("th");
	cellText = document.createTextNode("Tue");	
	cell.appendChild(cellText);
	row.appendChild(cell);
	
	//Creates a new cell element with  text within the cell then adds its to the row
	cell = document.createElement("th");
	cellText = document.createTextNode("Wed");									
	cell.appendChild(cellText);
	row.appendChild(cell);
	//Creates a new cell element with  text within the cell then adds its to the row
	cell = document.createElement("th");
	cellText = document.createTextNode("Thu");									
	cell.appendChild(cellText);
	row.appendChild(cell);
	//Adds  table header row of the table to the table body tag <tbody>
	tableBody.appendChild(row);
	
	//Creates the second row element
	row = document.createElement("tr");
	//Repeats the 
	for (var Column = 0; Column <=3 ; Column ++) {
		cell = document.createElement("td");
		cellText = document.createTextNode("7am - 10pm");								
									  
		cell.appendChild(cellText);
		row.appendChild(cell);
									

	}
	tableBody.appendChild(row);
	
	 //add the table body tag to the table tag 
	table.appendChild(tableBody);
	
	//adds the table tag to the aside element using its id
	aside.appendChild(table);
	
	//create new variables for table 2 tags 
	var table2 = document.createElement("table");
	var tableBody2 = document.createElement("tbody");
	var row2 = document.createElement("tr");
	var cell2 = document.createElement("th")
	var cellText2 = document.createTextNode("Fri");	
	cell2.appendChild(cellText2);
	row2.appendChild(cell2);	
	
	cell2 = document.createElement("th");
	cellText2 = document.createTextNode("Sat");									
	cell2.appendChild(cellText2);
	row2.appendChild(cell2);
	cell2 = document.createElement("th");
	cellText2 = document.createTextNode("Sun");									
	cell2.appendChild(cellText2);
	row2.appendChild(cell2);
	tableBody2.appendChild(row2);
	row2 = document.createElement("tr");
	cell2 = document.createElement("td");
	cellText2 = document.createTextNode("7am - 10pm");								
	cell2.appendChild(cellText2);
	row2.appendChild(cell2);
	cell2 = document.createElement("td");
	cellText2 = document.createTextNode("6am - 11pm");								
	cell2.appendChild(cellText2);
	row2.appendChild(cell2);
	cell2 = document.createElement("td");
	cellText2 = document.createTextNode("7am - 5pm");								
	cell2.appendChild(cellText2);
	row2.appendChild(cell2);
	tableBody2.appendChild(row2);
	
	//adds the table body tag to the table tag 
	table2.appendChild(tableBody2);
	
	// adds the second table to the aside element using its id
	aside.appendChild(table2);
}
