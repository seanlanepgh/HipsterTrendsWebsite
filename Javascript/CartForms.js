//create  a variable to hold how many items there are in total and a array to hold all the  products in the cart and the totalprice of the cart
var data = {"total":0,"rows":[],"totalprice":0};
//declare variables
var quantityValid =0;
var methodPrice =0;
//When the page loads	
//Loads javascript 
$(function(){
	//When the page loads check if there is a session 
	if(sessionStorage && sessionStorage.getItem('cart')){
		//get data and display the cart if there is a session
		data = JSON.parse(sessionStorage.getItem( 'cart' ));
		displayShoppingCart();
		
		//Add submit and validation to the submit payment button 
		var form = document.getElementById("Form");
		var submitPayment = document.getElementById("SubmitPaymentBtn");
		submitPayment.onclick = function Submit(){
										// Use a boolean variable to check if the input in the text fields is valid
										var flag = true ;
										//Does each input field by using a class given to all of them
										$('input.required').each(function() {
											
											if(flag == false){
											
											}
											// if the input field is empty then set  flag as false
											else if(!$(this).val()){
												flag = false;
											}
										});
										/* if flag is true we submit the form however because this is dummy form 
										we  then clear sessionStorage and reload to simulate how a submitted form would act*/ 	
										if(flag) {
											sessionStorage.clear();
											location.reload();
										}else{
											// Display this alert if field are empty
											var alert = "Complete all fields of the delivery form and Payment Form !"
											//Call popup function 
											openPopup(alert);
										}
									}
		//if the user changes the radio button
		$('.radio').change(function () {
			if($("input[type='radio'].radio").is(':checked')) {
				//update the order table
				methodPrice =  parseInt($("input[type='radio'].radio:checked").val());
				displayOrder();
			}
		});	
		//if the user changes the select box
		$('Select').change(function () {
			//get the new quantity value from that select box
			quantity = parseInt($(this).find('option:selected').val());
			//Gets id as the id has the row number
			var id = $(this).attr('id');
			var row = id.slice(-1);
			//Gets the session storage for each row 
			var rowdata = data.rows[row];
			//updates session storage 
			rowdata.product.Quantity = quantity;
			rowdata.product.TotalProductPrice = rowdata.product.Price* rowdata.product.Quantity;
			sessionStorage.setItem('cart',JSON.stringify(data));
			//then reloads the page
			location.reload();
		});
		//If popup is showing and the close popup button is clicked its close the popup
		$("#closePopupButton").click(function() {
			closePopup();
		});
		//Updates the popup if the window changes size
		$(window).resize(function(){
			updatePopup();
		});
		
	}else{
		var checkOutButton = document.getElementById("checkOut");
		checkOutButton.disabled = true;
		checkOutButton.className= "disableCheckOut";
	}			
});
//this function manipulates the  DOM and displays content of our shopping cart
function displayShoppingCart(){
	//Gets the table id 
    var cartTblBody=document.getElementById("cartTblBody");
	//Deletes rows if there is any rows in the table
    while(cartTblBody.rows.length>0) {
		cartTblBody.deleteRow(0);
    }
	//variable to hold total price of shopping cart
    var totalPrice = 0;
    //iterate over array of objects
	for(var i=0;i<data.total;i++){
		//add new row      
        var row = cartTblBody.insertRow();
        //create four cells for each of the product properties 
        var cellName = row.insertCell(0);
        var cellQuantity = row.insertCell(1);
		var cellSize = row.insertCell(2);
        var cellPrice = row.insertCell(3);
			
		cellName.innerHTML = data.rows[i].product.Name;
		//Create a Select Box which allows the user to change the quantity
        var select=document.createElement("SELECT");
		select.id="Selectid"+i;
		var option=document.createElement("OPTION");
		//Increments quantityValid if the quantity select box is zero and this is used to disable the checkout button
		if(data.rows[i].product.Quantity>0){
			quantityValid++;
		}
		//Assign the quantity that the user has selected on previous product pages
		option.value = data.rows[i].product.Quantity;
		option.innerHTML =data.rows[i].product.Quantity;
		option.id="OptionId"+i;
		//add that option to the select box
		select.appendChild(option);	
		// Makes sure that the quantity the user selected is not duplicated in the select box
		for(var sameQuant=0; sameQuant<11;sameQuant++){
			if(sameQuant == data.rows[i].product.Quantity){
					
			}else{
				option=document.createElement("OPTION");
				option.value = sameQuant ;
				option.id="OptionId"+i;
				option.innerHTML= sameQuant;
				select.appendChild(option);
			}
		}
		//Add the select box to the quantity cell
		cellQuantity.appendChild(select);
		cellPrice.innerHTML = "&pound;"+data.rows[i].product.TotalProductPrice;
		cellSize.innerHTML = data.rows[i].product.Size;
		totalPrice+=parseInt(data.rows[i].product.TotalProductPrice);
		//Stores the totalprice of the cart
		data.totalprice = totalPrice;
    }
	//fill total cost of our shopping cart 
    document.getElementById("total").innerHTML="&pound;" + data.totalprice;
		
	var checkOutButton = document.getElementById("checkOut");
	//Check to disable or enable the checkout button using quantityValid
	if (quantityValid == 0 ){
		checkOutButton.disabled = true;
		checkOutButton.className= "disableCheckOut";
	}else{
		checkOutButton.disable = false;
	}
}
//Function that hides the cart and shows your order table ,delivery and payment forms
function displayDeliveryForm(){
	var showDeliverForm =document.getElementById("deliveryForm");
	showDeliverForm.className="showDeliveryForm";
	var hideCartTable =document.getElementById("cartTable");
	hideCartTable.className ="hideCartTable";
	//Calls displayOrder function
	displayOrder();
}
//Displays the order table
function displayOrder(){
	//Gets the table id 
    var orderedProductsTblBody=document.getElementById("orderTblBody");
	//Deletes rows if there is any rows in the table
    while(orderedProductsTblBody.rows.length>0) {
        orderedProductsTblBody.deleteRow(0);
    }
		
    //variable to hold total price of shopping cart
	var totalPrice = 0;
    //iterate over array of objects
	for(var i=0;i<data.total;i++){
			 
        //add new row      
        var row=orderedProductsTblBody.insertRow();
        //create four cells for  each of the product properties 
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
        totalPrice+=parseInt(data.rows[i].product.TotalProductPrice);
		
    }
	//add delivery method price to the total price
	data.totalprice =  methodPrice + totalPrice;
	//add to the delivery method cell the method cost
	document.getElementById("deliveryMethod").innerHTML= "Delivery Method Cost: &pound;" + methodPrice;
    //fill total cost of our shopping cart 
    document.getElementById("orderTotal").innerHTML="&pound;" + data.totalprice;
}
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