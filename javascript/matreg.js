
var matpicURL;







function plateCheck(){
// var plate = document.getElementById("plate").value;


// var ref = firebase.database().ref("matatus");
// ref.orderByChild("numberPlate").equalTo(plate).on("child_added", function(snapshot) {
//   if(snapshot != null){
//   	window.alert("THE NUMBERPLATE IS ALREADY TAKEN");
//   	return;
//   }
// });
 matpicupload();

}

function isNotempty(){

var email = document.getElementById("mail").value;
var firstname = document.getElementById("oname").value;
var surname = document.getElementById("otname").value;
var sacco = document.getElementById("sacco").value;
var password = document.getElementById("wpass").value;
var number = document.getElementById("phone").value;
var cpass = document.getElementById("cpass").value;
var matname =document.getElementById("mname").value;
var plate = document.getElementById("plate").value;
var wifiname = document.getElementById("wname").value;
var address = document.getElementById("madd").value;

var dfirstname = document.getElementById("dname").value;
var dsurname = document.getElementById("dsname").value;


var cfirstname = document.getElementById("conname").value;
var csurname = document.getElementById("conSname").value;

	

if(cfirstname == "" || csurname =="" ){
		window.alert("Your conductor field is empty!");
		return;
	}


	if(dfirstname == "" || dsurname =="" ){
		window.alert("Your driver field is empty!");
		return;
	}
	if(firstname == "" ){
		window.alert("Your owner name field is empty!");
		return;
	}
	if(email == "" ){
		window.alert("Your email address field is empty!");
		return;
	}


	if(surname == "" ){
		window.alert("Your other names field is empty!");
		return;
	}

	if(sacco == "" ){
		window.alert("Your sacco field is empty!");
		return;
	}



	if(password == "" ){
		window.alert("Your Wifi password field is empty!");
		return;
	}

		if(number == "" ){
		window.alert("Your Telephone Number field is empty!");
		return;
	}

	if(plate == "" ){
		window.alert("Your number plate field is empty!");
		return;
	}

	if(wifiname == "" ){
		window.alert("Your Wifi name field is empty!");
		return;
	}

	if(address == "" ){
		window.alert("Your Mac address field is empty!");
		return;
	}


	if(cpass == "" ){
		window.alert("Your confirm wifi Password field is empty!");
		return;
	}

 mvalidate();
}


function validatedetails(){
	var firstname = document.getElementById("oname").value;
var surname = document.getElementById("otname").value;
	
	var alphabetic = /^[A-z]+$/;

	if(firstname.match(alphabetic) && surname.match(alphabetic)){
		validateconductor();
	}else{
		window.alert("Check that the names provides contain only alphabets and longer that 3 letters");
	}

}

function validateconductor(){

var cfirstname = document.getElementById("conname").value;
var csurname = document.getElementById("conSname").value;
	
	var alphabetic = /^[A-z]+$/;

	if( cfirstname.match(alphabetic) && csurname.match(alphabetic)){
		validatedriver();
	}else{
		window.alert("Check that the conductor names provides contain only alphabets and longer that 3 letters");
	}

}


function validatedriver(){

var dfirstname = document.getElementById("dname").value;
var dsurname = document.getElementById("dsname").value;

	
	var alphabetic = /^[A-Za-z]+$/;

	if( dfirstname.match(alphabetic) && dsurname.match(alphabetic)){
		Validate();
	}else{
		window.alert("Check that the  driver names provides contain only alphabets and longer that 3 letters");
	}

}

function Validate(){
	var email = document.getElementById('mail').value;
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


	if (email.match(mailformat)) {
		plateCheck();
	}else{
		window.alert("Wrong email format:  Ensure email follows the format, your@domain.com");
	}


}



function mvalidate(){
	var cpass = document.getElementById("wpass").value;
	var password = document.getElementById('cpass').value;


	if(password.match(cpass)){
		validatedetails();
}else{
	window.alert("Your passwords dont match!");
}

}


function matpicupload(){
	var storage = firebase.storage();
	var matpicture = document.getElementById('matpic');
	var password = document.getElementById("wpass").value;
var address = document.getElementById("madd").value;
var upload = document.getElementById("matatupicUpload");
var file = matpicture.files[0];
var matclip = file.name;
var bbsid= address.slice(0,5);
var valid = bbsid+"_"+password+"_"+bbsid;

	var storageRef = storage.ref().child('matatus/'+valid+"/"+matclip);

	var task = storageRef.put(file);
	task.on('state_changed',
		function progress(snapshot){
			var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;

			upload.value = percentage;
				if(upload.value == 100){
				window.alert("Upload Completed!")
			}

		},
		
		function error(){
			window.alert("ERROR UPLOADING")
		},
		function good(){
			matpicURL = task.snapshot.downloadURL;
			createMat();
		}
		);
	
	


}


function createMat(){

var firstname = document.getElementById("oname").value;
var surname = document.getElementById("otname").value;

var dfirstname = document.getElementById("dname").value;
var dsurname = document.getElementById("dsname").value;


var cfirstname = document.getElementById("conname").value;
var csurname = document.getElementById("conSname").value;


var sacco = document.getElementById("sacco").value;
var password = document.getElementById("wpass").value;
var number = document.getElementById("phone").value;
var cpass = document.getElementById("cpass").value;
var matname =document.getElementById("mname").value;
var plate = document.getElementById("plate").value;
var wifiname = document.getElementById("wname").value;
var address = document.getElementById("madd").value;
var location = document.getElementById("loc").value;
var classtype = document.getElementById("class").value;
var email = document.getElementById('mail').value;

var bbsid= address.slice(0,5);
var valid = bbsid+"_"+password+"_"+bbsid;

var connames = cfirstname+" "+csurname;
var driverName = dfirstname+" "+dsurname;
var owner = firstname+" "+surname;
firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  
var errorMessage = error.message;

window.alert(errorMessage);
console.log(errorMessage);

});

firebase.auth().onAuthStateChanged(function(user){
	if(user){


var userinfo = firebase.auth().currentUser;
var uid = userinfo.uid;

firebase.database().ref('matatus/'+valid).set({
 	sacco: sacco,
   ownerName: owner,
   mobile: number,
   matatu: matname,
   conductor: connames,
   driver: driverName,
   wifiName: wifiname,
   numberPlate: plate,
   macAddress: bbsid,
   location: location,
   category : classtype,
   password: password,
   verify: valid,
   email: email,
   matatuPicture: matpicURL

  });
}});

window.alert("YOU HAVE SUCCESSFULLY ADDED A NEW MATATU! REFRESH PAGE TO ADD ANOTHER");
//redirect()
}

