
var musicURL;
var clipURL;
var con;
var uid;
var id;
var studio;





function checklogin(){
	firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    
  } else {
    window.location.href = "../dockpage.html";
  }
});
}

function upload(){
	var storage = firebase.storage();
	var upload = document.getElementById('musicUpload');

	var music = document.getElementById('mus');
	var file = music.files[0];
	var musicName = file.name;

	var storageRef = storage.ref().child('music/'+musicName);

	var task = storageRef.put(file);
	task.on('state_changed',
		function progress(snapshot){
			var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;

			upload.value = percentage;
		}
		,
		function error(){
	
		},
		function good(){
			musicURL = task.snapshot.downloadURL;
			
			clipupload();

		}
		);
	
	


}

function emptyclip(){
	var clip = document.getElementById('clip').value;

	if(clip == ""){
		window.alert("Empty Clip Field");
		return;
	}else{
		isvalidclip();
		
	}

}

function clipupload(){
	var storage = firebase.storage();
	var upload = document.getElementById('clipUpload');

	var clip = document.getElementById('clip');
	var file = clip.files[0];
	var clipName = file.name;

	var storageRef = storage.ref().child('clips/'+clipName);

	var task = storageRef.put(file);
	task.on('state_changed',
		function progress(snapshot){
			var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;

			upload.value = percentage;
				if(upload.value == 100){
				//window.alert("Upload Completed!")

var con = confirm("Do you want to upload more content?");

if (con == true) {


return true;
}else{
	firebase.auth().signOut().then(function() {
window.location.href = "../dockpage.html";
}, function(error) {
  console.error('Sign Out Error', error);
});
}
			}

		}
		,
		function error(){
	
		},
		function good(){
			clipURL = task.snapshot.downloadURL;
			
			getinfo();

		}
		);
	}
	




function isitEmpty(){


var music = document.getElementById("musicname").value;

var Album = document.getElementById("alname").value;

	
	if(music == "" ){
		window.alert("Your Music field is empty!");
		return;
	}

	if(Album == "" ){
		window.alert("Your Album field is empty!");
		return;
	}





	emptymusic();
}


function  emptymusic(){
	var music = document.getElementById('mus').value;
	if (music == "") {
		window.alert("Music field is empty");
		return;
	}else{
		isvalidmusic();
		
	}
}




function getinfo(){


var userinfo = firebase.auth().currentUser;
 uid = userinfo.uid;
	getartistname();
}






function getartistname(){
var call = firebase.database().ref();
	var ref = call.child('musicians/'+uid+'/Artistname');
	ref.on('value', function(artist){
		con = artist.val();
		getartistStudio();
	});



}


function getartistStudio(){
	var call = firebase.database().ref();
	var ref = call.child('musicians/'+uid+'/Studios');
	ref.on('value', function(artist){
		studio = artist.val();
		content();
	});
}





function content(){





var music = document.getElementById("musicname").value;




var location = document.getElementById("loc").value;

var price = document.getElementById("price").value;
var genre = document.getElementById("genre").value;
var listens = 0;
var connector = location +"_"+genre;




var userinfo = firebase.auth().currentUser;
var uid = userinfo.uid;
id = Math.floor((Math.random() * 10000) + 1)+uid;
 
firebase.database().ref('music/'+id).set({
	userID: uid,
    Music: music,
    Studio: studio,
    Artist: con,
    Genre: genre,
    Price: price,
   	Location: location,
   	genreLocation: connector,
   	Clipart_url: clipURL,
   	Music_url: musicURL,
   	Listens: listens

  });


}


function isvalidmusic(){
	var music = document.getElementById('mus').value; 
  var extension = music.substr(music.lastIndexOf('.') + 1).toLowerCase();
  var allowedExtensions = 'mp3';
  if (music.length > 0)
     {
          if (allowedExtensions.indexOf(extension) === -1) 
             {
               window.alert('Invalid file Format. Only ' + allowedExtensions+ ' are allowed for music fields.');
               return;
             }else{
             	emptyclip();
             }
    }
}


function isvalidclip(){
	var clip = document.getElementById('clip').value;
  var extension = clip.substr(clip.lastIndexOf('.') + 1).toLowerCase();
  var allowedExtensions = ['jpeg','jpg','png'];
  if (clip.length > 0)
     {
          if (allowedExtensions.indexOf(extension) === -1) 
             {
               window.alert('Invalid file Format. Only ' + allowedExtensions.join(', ')+ ' are allowed for clip field.');
               return;
             }else{
             	upload();
             }
    }
}



