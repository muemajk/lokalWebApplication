








function createUser(){

var firstname = document.getElementById("fname").value;
var surname = document.getElementById("sname").value;
var Aname = document.getElementById("aname").value;
var email = document.getElementById('mail').value;

var location = document.getElementById("location").value;

var studio = document.getElementById("studio").value;
var genre = document.getElementById("genre").value;
var password = document.getElementById('password').value;






var email = document.getElementById('mail').value;
var password = document.getElementById('password').value;



firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  
var errorMessage = error.message;

window.alert(errorMessage);
console.log(errorMessage);

});

firebase.auth().onAuthStateChanged(function(user){
	if(user){


		var userinfo = firebase.auth().currentUser;
var uid = userinfo.uid;


firebase.database().ref('musicians/'+uid).set({
    name: firstname,
    secondname: surname,
    email: email,
    Password: password,
    Artistname: Aname,
    Genre: genre,
    Studios : studio,
   	Location: location
  });


window.alert("Successfully added");
	window.location.href = "../content/upload.html";
	}
});



}




function isempty(){

var firstname = document.getElementById("fname").value;
var surname = document.getElementById("sname").value;
var Aname = document.getElementById("aname").value;

var studio = document.getElementById("studio").value;

	
	if(firstname == "" ){
		window.alert("Your Firstname field is empty!");
		return;
	}
	if(surname == "" ){
		window.alert("Your Surname field is empty!");
		return;
	}

	if(Aname == "" ){
		window.alert("Your Artist name field is empty!");
		return;
	}


	if(studio == "" ){
		window.alert("Your Recording Studios field is empty!");
		return;
	}



 validatedetails();
}


function validatedetails(){
	var firstname = document.getElementById("fname").value;
var surname = document.getElementById("sname").value;

	var alphabetic = /^[A-z]+$/;

	if( firstname.match(alphabetic) && surname.match(alphabetic)){
		Validate()
	}else{
		window.alert("Check that the names provides contain only alphabets and has more than 3 letters");
	}

}

function Validate(){
	var email = document.getElementById('mail').value;
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


	if (email.match(mailformat)) {
		mvalidate();
	}else{
		window.alert("Wrong email format:  Ensure email follows the format, your@domain.com");
	}


}

function mvalidate(){
	var password = document.getElementById('password').value;
	var passformat =  new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");


	if (password.match(passformat)) {
		createUser();
	}else{
		window.alert("Wrong password format:  Ensure that the password has Uppercase lowercase numbers and character values(!@#$%.^&*)");
	}

}



