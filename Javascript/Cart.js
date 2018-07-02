//create  a variable to hold how many items there are in total and a array to hold all the  products in the cart
var data = {"total":0,"rows":[]};
//When the page loads	
//Loads javascript on window load
window.addEventListener("load",function(){
	//When the page loads check if there is a session 
	if(sessionStorage && sessionStorage.getItem('cart')){
		data = JSON.parse(sessionStorage.getItem( 'cart' ));
		displayShoppingCart();	
	}
	//If popup is showing and the close popup button is clicked its close the popup
	$("#closePopupButton").click(function() {
		closePopup();
	});
	//Updates the popup if the window changes size
	$(window).resize(function(){
		updatePopup();
	});
	
});
function openPopup(alert){
	//Gets <p> element to contain a alert
	var messageAlert = document.getElementById("message");
	messageAlert.innerHTML = alert;
	//Element fades in
	$("#popupContent").fadeIn();
	//Updates the position of  the popup
	updatePopup();
}
function closePopup(){
	//Element fades out
	$("#popupContent").fadeOut();
}
function updatePopup(){
	//Gets the pop container element
	var $popup = $("#popupContent");
	//Centers the popup in the center of the window
	var top = "50px";
	var left = ($(window).width() - $popup.outerWidth()) / 2; 
	$popup.css({
		'top' : top,
		'left' : left
	});
}
//this function manipulates DOM and displays content of our shopping cart
function displayShoppingCart(){
	//Gets the table id 
	var cartTblBody = document.getElementById("cartTblBody");
	//Deletes rows if there is any rows in the table	
    while(cartTblBody.rows.length>0) {
        cartTblBody.deleteRow(0);
    }
		
    //variable to hold total price of shopping cart
    var totalPrice= 0;
    //iterate over array of objects
	for(var i=0;i<data.total;i++){
		//add new row      
        var row = cartTblBody.insertRow();
        //create four cells for each of the product properties 
        var cellName = row.insertCell(0);
        var cellQuantity = row.insertCell(1);
		var cellSize = row.insertCell(2);
        var cellPrice = row.insertCell(3);
           
		//fill cells with values from current product object of our array
        cellName.innerHTML = data.rows[i].product.Name;
        cellQuantity.innerHTML =data.rows[i].product.Quantity;
		cellPrice.innerHTML = "&pound;"+data.rows[i].product.TotalProductPrice;
		cellSize.innerHTML = data.rows[i].product.Size;
		//adds product price to the total price
        totalPrice +=data.rows[i].product.TotalProductPrice;
			
    }
	//fill total price of our shopping cart 
    document.getElementById("total").innerHTML="&pound;"+ totalPrice;
}
function AddtoCart(name,price,size,quantity){
    /* Below we  a create JavaScript Object that will hold five properties:Name,Quantity , Size,Price for one product and 
	Total Price for the quantity that the customer wants of that product */ 
    var product = {};
    //Fill the product object with data
    product.Name=name;
    product.Quantity=quantity;
	product.Price=price;
	product.TotalProductPrice = price;
	product.Size=size;
	
	//Goes through the session storage to check if there is the same product name and product size
	for(var i=0; i<data.total; i++){
		//Gets the session storage for each row 
		var rowdata = data.rows[i];
		//check if there is the same product name and product size being added
		if (rowdata.product.Name == product.Name && rowdata.product.Size == product.Size){
			//if so update the quantity 
			rowdata.product.Quantity += product.Quantity;
			//if quantity is higher than 10 
			if(rowdata.product.Quantity >10){
				// Store it so that  the quantity can only be 10 
				rowdata.product.Quantity =10;
				//Update the total price of that product with the new quantity 10
				rowdata.product.TotalProductPrice =0;
				rowdata.product.TotalProductPrice += product.Price * rowdata.product.Quantity;
				//Display an alert popup about the maximum quantity
				var alert = "You have exceeded the maximum order quantity for this item which is 10."
				//Call popup function 
				openPopup(alert);
				
				//Update the display of the shopping cart
				displayShoppingCart();
				//Update the session storage
				sessionStorage.setItem('cart',JSON.stringify(data));
				return;
			}else{
				//if the quantity is still below 10 then it just adds  the quantity and updates the price
				rowdata.product.TotalProductPrice += product.Price * product.Quantity;
				//Update the display of the shopping cart
				displayShoppingCart();
				//Update the session storage
				sessionStorage.setItem('cart',JSON.stringify(data));
				return;
			}
						
		}
	} 
	//if there is no data for that product then calculate total price for that product
	product.TotalProductPrice = price * quantity;
	
	// and then add  a newly created product to the  shopping cart
	data.total += 1;
	data.rows.push({product});
       
	//Update the display of the shopping cart
    displayShoppingCart();
	//Update the session storage
	sessionStorage.setItem('cart',JSON.stringify(data));
}

function BuyItem1(){
	// Get all of the products properties
	var name = document.getElementById("name1").innerHTML;
	var price = document.getElementById("price1").value;
	var size = document.getElementById("size1").value;
	var quantity = document.getElementById("quantity1").value;
	// Check if quantity or size select box  has been selected		
	if(quantity =="0"||size=="0"){
		//if not display a popup
		var alert = "Please Select a Quantity or Size";
		openPopup(alert);
					
	}else{
		//if they selected add them to the cart
		AddtoCart(name,parseFloat(price),size,parseInt(quantity));
	}
}
function BuyItem2(){
	// Get all of the products properties
	var name = document.getElementById("name2").innerHTML;
	var price = document.getElementById("price2").value;
	var size = document.getElementById("size2").value;
	var quantity = document.getElementById("quantity2").value;
	// Check if quantity or size select box  has been selected				
	if(quantity =="0"||size=="0"){
		var alert = "Please Select a Quantity or Size";
		openPopup(alert);
	}else{
		//if they selected add them to the cart
		AddtoCart(name,parseFloat(price),size,parseInt(quantity));
	}
}
function BuyItem3(){
	// Get all of the products properties
	var name = document.getElementById("name3").innerHTML;
	var price = document.getElementById("price3").value;
	var size = document.getElementById("size3").value;
	var quantity = document.getElementById("quantity3").value;
	// Check if quantity or size select box  has been selected	
	if(quantity =="0"||size=="0"){
		var alert = "Please Select a Quantity or Size";
		openPopup(alert);
	}else{
		//if they selected add them to the cart
		AddtoCart(name,parseFloat(price),size,parseInt(quantity));
	}
}
function BuyItem4(){
	// Get all of the products properties
	var name = document.getElementById("name4").innerHTML;
	var price = document.getElementById("price4").value;
	var size = document.getElementById("size4").value;
	var quantity = document.getElementById("quantity4").value;
	// Check if quantity or size select box  has been selected	
	if(quantity =="0"||size=="0"){
		var alert = "Please Select a Quantity or Size";
		openPopup(alert);
	}else{
		//if they selected add them to the cart
		AddtoCart(name,parseFloat(price),size,parseInt(quantity));
	}
}
function BuyItem5(){
	// Get all of the products properties
	var name = document.getElementById("name5").innerHTML;
	var price = document.getElementById("price5").value;
	var size = document.getElementById("size5").value;
	var quantity = document.getElementById("quantity5").value;
	// Check if quantity or size select box  has been selected		
	if(quantity =="0"||size=="0"){
		var alert = "Please Select a Quantity or Size";
		openPopup(alert);
	}else{
	//if they selected add them to the cart
		AddtoCart(name,parseFloat(price),size,parseInt(quantity));
	}
}
function BuyItem6(){
	// Get all of the products properties
	var name = document.getElementById("name6").innerHTML;
	var price = document.getElementById("price6").value;
	var size = document.getElementById("size6").value;
	var quantity = document.getElementById("quantity6").value;
	// Check if quantity or size select box  has been selected
	if(quantity =="0"||size=="0"){
		var alert = "Please Select a Quantity or Size";
		openPopup(alert);
	}else{
		//if they selected add them to the cart
		AddtoCart(name,parseFloat(price),size,parseInt(quantity));
	}
}
function BuyItem7(){
	// Get all of the products properties
	var name = document.getElementById("name7").innerHTML;
	var price = document.getElementById("price7").value
	var size = document.getElementById("size7").value;
	var quantity = document.getElementById("quantity7").value;
	// Check if quantity or size select box  has been selected
	if(quantity =="0"||size=="0"){
		var alert = "Please Select a Quantity or Size";
		openPopup(alert);
	}else{
		//if they selected add them to the cart
		AddtoCart(name,parseFloat(price),size,parseInt(quantity));
	}
}
function BuyItem8(){
	// Get all of the products properties
	var name = document.getElementById("name8").innerHTML;
	var price = document.getElementById("price8").value;
	var size = document.getElementById("size8").value;
	var quantity = document.getElementById("quantity8").value;
	// Check if quantity or size select box  has been selected		
	if(quantity =="0"||size=="0"){
		var alert = "Please Select a Quantity or Size";
		openPopup(alert);
	}else{
		//if they selected add them to the cart
		AddtoCart(name,parseFloat(price),size,parseInt(quantity));
	}
}

	
	