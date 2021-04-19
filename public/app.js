// Checking for SDKs that we pulled i.e auth and firestore.
//console.log(firebase);

// Authentication
const auth = firebase.auth();
//console.log(auth);

const whenSignedIn = document.getElementById("whenSignedIn");
const whenSignedOut = document.getElementById("whenSignedOut");
const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById("signOutBtn");
const userDetails = document.getElementById("userDetails");

const provider = new firebase.auth.GoogleAuthProvider();
//console.log(provider);


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


// Firestore
const db = firebase.firestore();

const createThing = document.getElementById('createThing');
const thingsList  = document.getElementById('thingsList');

let thingsRef;
let unsubscribe;

auth.onAuthStateChanged(user => {
   if(user) {
      thingsRef = db.collection('things')

      createThing.onclick = () => {
         thingsRef.add(
            {
               uid: user.uid,
               name: faker.commerce.productName(),
               createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }
         )
      }

      unsubscribe = thingsRef.where('uid', '==', user.uid).onSnapshot(querySnapshot => {
         const items = querySnapshot.docs.map(doc=> {
            return `<li>${doc.data().name}</li>`
         });

         thingsList.innerHTML = items.join('');
      })
   } else {
      unsubscribe && unsubscribe();
   }
}) 


