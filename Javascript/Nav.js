//This function is called only on screen sizes that are for mobiles
function dropdownMenu(){
	//When the Menu Handle Element is Clicked it toggles the class to display or hide parts of the Menu
	var menu= document.getElementById("menu");
	var checkClass = menu.className;
	if( checkClass =="noShowing"){
		menu.className="Showing";
		
	}
	else{
		menu.className="noShowing";
	}
}