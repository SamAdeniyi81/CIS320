function sayHello() {
    console.log('Hello');
}

var formbutton1 = $('#button1');
formbutton1.on("click", sayHello);

//Part 2

function addValues(){
    var firstValue = parseInt(document.getElementById('field1').value);
    var secondValue = parseInt(document.getElementById('field2').value);
    var sum = firstValue + secondValue;
    parseInt(document.getElementById("field3").value = sum);
    }

var formbutton2 = $('#button2');
formbutton2.on("click", addValues);

//Part 3

// Create a function to hide an item
function hideFunction() {
    $("#paragraphToHide").toggle(500);
}

// Attach an action to a button click
var formButton3 = $('#button3');
formButton3.on("click", hideFunction);

//Part 4

function validateFunction(){
    var v1 = $('#phoneField').val();

    var myRegex = /^([0-9]{3})[-]([0-9]{3})[-]([0-9]{4})$/ ;

    if (myRegex.test(v1)) {
        $('#phoneField').text("Ok");
        console.log('Ok');
    }else {
        $('#phoneField').text("Bad");
        console.log('Bad');
    }}

var formButton4 = $('#button4');
formButton4.on("click", validateFunction);


// Create function to JSON'ify
function jsonFunction() {

    // Build the JSON string based on that object's fields

    var firstName = (document.getElementById("firstName").value);
    var lastName = (document.getElementById("lastName").value);
    var email = (document.getElementById("email").value);

    var myObject = {firstName: firstName, lastName: lastName, email: email };

    // Set a field to the JSON result so we can see it.
    var jsonString = JSON.stringify(myObject);

    console.log(jsonString);
}

// Attach an action to a button click
var formButton5 = $('#button5');
formButton5.on("click", jsonFunction);