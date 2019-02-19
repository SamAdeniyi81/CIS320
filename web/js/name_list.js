function updateTable()
{

var url = "api/name_list_get";

$.getJSON(url, null, function(json_result)
    {
        // json_result is an object. You can set a breakpoint, or print
        // it to see the fields. Specifically, it is an array of objects.
        // Here we loop the array and print the first name.
        for (var i = 0; i < json_result.length; i++) {
            var phone = json_result[i].phone;
            var myPhone = phone.substring(0,3) + "-" + phone.substring(3,6) + "-" + phone.substring(6,10);
            $('#datatable tr:first').after('<tr>' +
                '<td>' + json_result[i].id + '</td>' +
                '<td>' + json_result[i].first + '</td>' +
                '<td>' + json_result[i].last + '</td>' +
                '<td>' + json_result[i].email + '</td>' +
                '<td>' + myPhone + '</td>' +
                '<td>' + json_result[i].birthday + '</td>' +
                '</tr>');

        }
        console.log("Done");
    });
}



// Called when "Add Item" button is clicked
function showDialogAdd() {
    // Print that we got here
    console.log("Opening add item dialog");

    // Clear out the values in the form.
    // Otherwise we'll keep values from when we last
    // opened or hit edit.
    // I'm getting it started, you can finish.
    $('#id').val("");
    $('#firstName').val("");
    $('#lastName').val("");
    $('#email').val("");
    $('#phone').val("");
    console.log($('#birthday').val());

    $('#firstName').removeClass("is-valid");
    $('#lastName').removeClass("is-valid");
    $('#email').removeClass("is-valid");
    $('#phone').removeClass("is-valid");
    $('#birthday').removeClass("is-valid");
    $('#firstName').removeClass("is-invalid");
    $('#lastName').removeClass("is-invalid");
    $('#email').removeClass("is-invalid");
    $('#phone').removeClass("is-invalid");
    $('#birthday').removeClass("is-invalid");



    // Show the hidden dialog
    $('#myModal').modal('show');
}

var addItemButton = $('#addItem');
addItemButton.on("click", showDialogAdd)

function saveChanges() {
    console.log("Changes have been saved.")
}

var saveButton = $('#saveChanges');
//saveButton.on("click", saveChanges);

// Function to validate
function validateFunction() {
    // Get the field
    var v1 = $('#firstName').val();
    var v2 = $('#lastName').val();
    var v3 = $('#email').val();
    var v4 = $('#phone').val();
    var v5 = $('#birthday').val();

    var nameReg = /^[a-zA-Z]+(([',.-][a-z])?[a-zA-Z]*)*$/;
    var emailReg = /^[A-Za-z0-9-_.]+@[A-Za-z0-9]+[.]+[A-Za-z0-9]{3,30}$/;
    var phoneReg = /^[0-9]{3}([-]?)[0-9]{3}([-]?)[0-9]{4}$/;
    var birthdayReg = /^[0-9]{4}[-][0-9]{2}[-][0-9]{2}$/i;

// Test the regular expression to see if there is a match
    if (nameReg.test(v1)) {
        $('#result').text("Ok");
        $('#firstName').removeClass("is-invalid");
        $('#firstName').addClass("is-valid");

    } else {
        $('#result').text("Bad");
        $('#firstName').removeClass("is-valid");
        $('#firstName').addClass("is-invalid");
    }

    if (nameReg.test(v2)) {
        $('#result').text("Ok");
        $('#lastName').removeClass("is-invalid");
        $('#lastName').addClass("is-valid");

    } else {
        $('#result').text("Bad");
        $('#lastName').removeClass("is-valid");
        $('#lastName').addClass("is-invalid");
    }

    if (emailReg.test(v3)) {
        $('#result').text("Ok");
        $('#email').removeClass("is-invalid");
        $('#email').addClass("is-valid");

    } else {
        $('#result').text("Bad");
        $('#email').removeClass("is-valid");
        $('#email').addClass("is-invalid");
    }
    if (phoneReg.test(v4)) {
        $('#result').text("Ok");
        $('#phone').removeClass("is-invalid");
        $('#phone').addClass("is-valid");

    } else {
        $('#result').text("Bad");
        $('#phone').removeClass("is-valid");
        $('#phone').addClass("is-invalid");
    }
    if (birthdayReg.test(v5)) {
        $('#result').text("Ok");
        $('#birthday').removeClass("is-invalid");
        $('#birthday').addClass("is-valid");

    } else {
        $('#result').text("Bad");
        $('#birthday').removeClass("is-valid");
        $('#birthday').addClass("is-invalid");
    }


}

saveButton.on("click", validateFunction);

updateTable();
