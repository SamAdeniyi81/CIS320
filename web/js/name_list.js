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
                '<td><button type="button" name="delete" ' + 'class="deleteButton btn" ' + 'value="' + json_result[i].id + '">Delete</button>' + '</td>' +
                '</tr>');
        }
        var buttons = $(".deleteButton");
        buttons.on("click", deleteItem);
    });
}

updateTable();

    function deleteItem(e) {
        var jsonId = {"id": e.target.value};

        var url = "api/name_list_delete";

        $.ajax({
            type: 'POST',
            url: url,
            data: JSON.stringify(jsonId),
            success: function (dataFromServer) {
                refreshFields();
            },
            contentType: "application/json",
            dataType: 'text'
        });
}

var addItemButton = $('#addItem');
addItemButton.on("click", showDialogAdd)

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
    $('#birthday').val();

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

var saveButton = $('#saveChanges');
saveButton.on("click", saveChanges);

function saveChanges() {
    console.log("Changes are being saved.");
    validateFunction();
}


// Function to validate
function validateFunction() {

    var valid = true;

    // Get the field
    var v1 = $('#firstName').val();
    var v2 = $('#lastName').val();
    var v3 = $('#email').val();
    var v4 = $('#phone').val();
    var v5 = $('#birthday').val();

    var nameReg = /^[a-zA-Z]+(([',.-][a-z])?[a-zA-Z]*)*$/;
    var emailReg = /^[A-Za-z0-9-_.]+@[A-Za-z0-9]+[.]+[A-Za-z0-9.]{3,30}$/;
    var phoneReg = /^[0-9]{3}([-]?)[0-9]{3}([-]?)[0-9]{4}$/;
    var birthdayReg = /^[0-9]{4}[-][0-9]{2}[-][0-9]{2}$/i;

    // var firstName = (document.getElementById("firstName").value);
    // var lastName = (document.getElementById("lastName").value);
    // var email = (document.getElementById("email").value);
    // var phone = (document.getElementById("phone").value);
    // var birthday = (document.getElementById("birthday").value);

//Test the regular expression to see if there is a match
    if (nameReg.test(v1)) {
        $('#result').text("Ok");
        $('#firstName').removeClass("is-invalid");
        $('#firstName').addClass("is-valid");

    } else {
        $('#result').text("Bad");
        $('#firstName').removeClass("is-valid");
        $('#firstName').addClass("is-invalid");
        valid = false;
    }

    if (nameReg.test(v2)) {
        $('#result').text("Ok");
        $('#lastName').removeClass("is-invalid");
        $('#lastName').addClass("is-valid");

    } else {
        $('#result').text("Bad");
        $('#lastName').removeClass("is-valid");
        $('#lastName').addClass("is-invalid");
        valid = false;
    }

    if (emailReg.test(v3)) {
        $('#result').text("Ok");
        $('#email').removeClass("is-invalid");
        $('#email').addClass("is-valid");

    } else {
        $('#result').text("Bad");
        $('#email').removeClass("is-valid");
        $('#email').addClass("is-invalid");
        valid = false;
    }
    if (phoneReg.test(v4)) {
        $('#result').text("Ok");
        $('#phone').removeClass("is-invalid");
        $('#phone').addClass("is-valid");

    } else {
        $('#result').text("Bad");
        $('#phone').removeClass("is-valid");
        $('#phone').addClass("is-invalid");
        valid = false;
    }
    if (birthdayReg.test(v5)) {
        $('#result').text("Ok");
        $('#birthday').removeClass("is-invalid");
        $('#birthday').addClass("is-valid");

    } else {
        $('#result').text("Bad");
        $('#birthday').removeClass("is-valid");
        $('#birthday').addClass("is-invalid");
        valid = false;
    }

    if(valid){
        var jsonData = {
            "first":v1,
            "last":v2,
            "email":v3,
            "phone":v4,
            "birthday":v5
        };
        jqueryPostJSONAction(jsonData);
     }
}

function jqueryPostJSONAction(jsonData) {

    var url = "api/name_list_edit";

    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(jsonData),
        success: function(dataFromServer) {
            console.log(dataFromServer);
            refreshFields();
        },
        contentType: "application/json",
        dataType: 'text'
        });
    }

    function refreshFields() {

    for(var i = $("#datatable tr").length-1; i > 0 ; i--) {
        $("#datatable tr")[i].remove();
    }
        $('#myModal').modal('hide');
        updateTable();
}



