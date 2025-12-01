import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDQVFFb7fw3n-Uw4fSRWACVbOzsFYPQjfs",
  authDomain: "ecoliving-772e8.firebaseapp.com",
  projectId: "ecoliving-772e8",
  storageBucket: "ecoliving-772e8.firebasestorage.app",
  messagingSenderId: "612306415588",
  appId: "1:612306415588:web:fd3e5d2c345f36f6d6e1f1",
  measurementId: "G-XRPC43JGQ9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


window.register = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(userCredential.user, {
      displayName: email.split("@")[0]  
    });

    window.location.href = "index.html";
  } catch (error) {
    alert(error.message);
  }
};


window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "index.html";
  } catch (error) {
    alert(error.message);
  }
};

window.logout = function () {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
};

onAuthStateChanged(auth, (user) => {
  const loginBtn = document.getElementById("btn-login");
  const registerBtn = document.getElementById("btn-register");
  const userBox = document.getElementById("user-box");
  const userName = document.getElementById("user-name");

  if (!loginBtn || !userBox) return;

  if (user) {
    loginBtn.style.display = "none";
    registerBtn.style.display = "none";

    userName.textContent = user.displayName || user.email;
    userBox.style.display = "flex";

  } else {
    loginBtn.style.display = "inline-flex";
    registerBtn.style.display = "inline-flex";
    userBox.style.display = "none";
  }
});
