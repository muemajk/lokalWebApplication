

function login(){
 var email = document.getElementById('email').value;
var password = document.getElementById('password').value;


 firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {

  var errorMessage = error.message;



console.log(error);

});

 firebase.auth().onAuthStateChanged(function(user){
	if(user){
		window.location.href = "content/Upload.html";
	
}
 });
}

function signup(){
var musician = document.getElementById('mus').checked;
var matatu = document.getElementById("mat").checked

	if (matatu == true) {
		window.location.href="registration/matreg.html";
	}

	if (musician == true) {
		window.location.href = "registration/register.html";
	}
}





