function logout(){

firebase.auth().signOut().then(function() {
window.location.href = "../dockpage.html";
}, function(error) {
  console.error('Sign Out Error', error);
});
}