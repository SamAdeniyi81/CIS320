// This calls our back-end Java program that sets our session info
function login() {

    var url = "api/login_servlet";

    // Grab data from the HTML form
    //var sessionKey = $("#sessionKey").val();
    var sessionKey = "loginId";
    var sessionValue = $("#loginId").val();

    // Create a JSON request based on that data
    var dataToServer = {sessionKey : sessionKey, sessionValue : sessionValue};

    // Post
    $.post(url, dataToServer, function (dataFromServer) {
        // We are done. Write a message to our console
        console.log("Finished calling servlet.");
        console.log(dataFromServer);
        // Clear the form
        //$("#sessionKey").val("");
        $("#loginId").val("");
        getLogin();
    });
}

// This gets session info from our back-end servlet.
function getLogin() {

    var url = "api/get_login_servlet";

    $.post(url, null, function (dataFromServer) {
        console.log("Finished calling servlet.");
        console.log("You are here");
        console.log(dataFromServer);
        // Update the HTML with our result
        if(dataFromServer.trim() != "null"){
            $('#getLoginResult').html("You are logged in as '" + dataFromServer + "'");
            $('#logOutSection').show();
        } else {
            $('#logOutSection').hide();
        }
    });
}

// This method calls the servlet that invalidates our session
function logOut() {

    var url = "api/logout_servlet";

    $.post(url, null, function (dataFromServer) {
        console.log("Finished calling servlet.");
        console.log(dataFromServer);
        getLogin();
    });
}

// Hook the functions above to our buttons
button = $('#getLogin');
button.on("click", getLogin);

button = $('#login');
button.on("click", login);

button = $('#logOut');
button.on("click", logOut);

getLogin();