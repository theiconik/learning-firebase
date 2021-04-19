//console.log(firebase);

const auth = firebase.auth();
//console.log(auth);

const whenSignedIn = document.getElementById("whenSignedIn");
const whenSignedOut = document.getElementById("whenSignedOut");
const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById("signOutBtn");
const userDetails = document.getElementById("userDetails");

const provider = new firebase.auth.GoogleAuthProvider();
console.log(provider);

//console.log(signInBtn);

const signIn = () => {
   auth.signInWithPopup(provider);
}

const signOut = () => auth.signOut();

auth.onAuthStateChanged(user => {
   if(user) {
      whenSignedIn.hidden = false;
      whenSignedOut.hidden = true;
      userDetails.innerHTML = `<h4> Hello ${user.displayName}!</h3> <p>${user.uid}</p>` 
   }else {
      whenSignedIn.hidden = true;
      whenSignedOut.hidden = false;
      userDetails.innerHTML =  '';
   }
})