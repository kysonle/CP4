function getGithubInfo(user) {
    //1. Create an instance of XMLHttpRequest class and send a GET request using it.
    // The function should finally return the object(it now contains the response!)

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if ( this.readyState == 4 && this.status == 200){
            document.getElementById(user).innerHTML = this.responseText
        }
    };
    xhttp.open('GET', `https://api.github.com/users/${user}`, false);
    xhttp.send('');
    return xhttp;
    }

function showUser(user) {
    //2. set the contents of the h2 and the two div elements in the div '#profile' with the user content
    // display user information
    console.log(user);
    // declare variables
    var Name = user.login;
    var ID = user.id;
    var userProURl = user.avatar_url;
    var userPro = new Image();
    userPro.src = user.avatar_url;
    var userURLText = "Github User's URl";
    var userURl = userURLText.link(user.url);

    var profile = document.getElementById("profile");
    //get github users name, ID
    profile.getElementsByTagName("h2")[0].innerText = `User Name: = ${Name} ID: ${ID}`;
    profile.getElementsByClassName("avatar")[0].innerHTML="";
    //get github user avatar
    profile.getElementsByClassName("avatar")[0].appendChild(userPro);
    // get github user information
    profile.getElementsByClassName("information")[0].innerHTML= userURl;
}

function noSuchUser(username) {
    //3. set the elements such that a suitable message is displayed

    var profile = document.getElementById("profile");
    // given message if user is not found
    $('#profile h2').html('<h1></h1>').html('USER NOT FOUND ON GITHUB');
    //reset the avatar of user output
    profile.getElementsByClassName("avatar")[0].innerHTML="";
    ////reset the information of user output
    profile.getElementsByClassName("information")[0].innerHTML= '';
}

$(document).ready(function () {
    $(document).on('keypress', '#username', function (e) {
        //check if the enter(i.e return) key is pressed
        if (e.which == 13) {
            //get what the user enters
            username = $(this).val();
            //reset the text typed in the input
            $(this).val("");
            //get the user's information and store the respsonse
            response = getGithubInfo(username);
            //if the response is successful show the user's details
            if (response.status == 200) {
                showUser(JSON.parse(response.responseText));
                //else display suitable message
            } else {
                noSuchUser(username);
            }
        }
    })
});
