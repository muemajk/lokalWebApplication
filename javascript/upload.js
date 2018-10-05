function logout(){

firebase.auth().signOut().then(function() {
  window.open('dockpage.html');
  window.close();
}, function(error) {
  console.error('Sign Out Error', error);
});
}