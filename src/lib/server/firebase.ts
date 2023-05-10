import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  setPersistence,
  browserSessionPersistence,
  inMemoryPersistence,
} from "firebase/auth";
import {
  addDoc,
  setDoc,
  getFirestore,
  collection,
  getDoc,
  deleteDoc,
  onSnapshot,
  QuerySnapshot,
  doc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { error } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";
import { preview } from "vite";

const firebaseConfig = {
  apiKey: "AIzaSyA3QfX_I0MvbwxsRvKpBtYO4zHXhYfBvMg",
  authDomain: "myblog-9d23a.firebaseapp.com",
  projectId: "myblog-9d23a",
  storageBucket: "myblog-9d23a.appspot.com",
  messagingSenderId: "1080623836595",
  appId: "1:1080623836595:web:de140ace57a41e502cefc6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

auth.languageCode = "es";
const database = getFirestore(app);

type User = {
  email: string;
  user: string;
  pass: string;
};
type Article = {
  title: string;
  text: string;
  img: string;
  date: string;
  topic: string;
  desc: string;
};

type Preview = {
  title: string;
  preview: string;
  img: string;
  date: string;
  topic: string;
};

export type { Article, Preview, User };

const db = {
  deleteArticle: async (article: string) => {
    // await deleteDoc(doc(database, article));
    try {
      await deleteDoc(doc(database, "articles", article));
      await deleteDoc(doc(database, article, "data"));
    } catch (e) {
      console.error(e);
    }
  },
  editArticle: async (article: Article, pre: Preview) => {
    await setDoc(doc(database, article.title, "data"), article);
    await setDoc(doc(database, "articles", pre.title), pre);
  },
  uploadArtricle: async (pre: Preview, article: Article) => {
    await setDoc(doc(database, article.title, "data"), article);
    await setDoc(doc(database, "articles", pre.title), pre);
  },
  queryPreviews: async () => {
    let articulosNuevos: Preview[] = [];
    const doc: string = "articles";
    const querySnapshot = await getDocs(collection(database, doc));
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Preview;
      articulosNuevos = [...articulosNuevos, data];
    });
    return articulosNuevos;
  },
  queryArticle: async (article: string) => {
    const docRef = doc(database, article, "data");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as Article;
    } else {
      console.error("No such document!");
    }
  },
  logInGoogle: async () => {},
  getUserPassword: async (user: string): Promise<string> => {
    user = user.split("@")[0];
    let usr: User = { email: "", user: "", pass: "" };
    try {
      const docSnap = await getDoc(doc(database, user + "@data", "data"));
      if (docSnap.exists()) {
        usr = docSnap.data() as User;
      } else {
        console.error("No such document!");
      }
    } catch (error) {
      console.error(error);
    }
    return usr.pass;
  },
  getUserData: async (user: string) => {
    user = user.split("@")[0];
    let usr: User = { email: "", user: "", pass: "" };
    try {
      const docSnap = await getDoc(doc(database, user + "@data", "data"));
      if (docSnap.exists()) {
        usr = docSnap.data() as User;
      } else {
        console.error("No such document!");
      }
    } catch (error) {
      console.error(error);
    }
    return usr;
  },
  logIn: async (user: User) => {
    setPersistence(auth, browserSessionPersistence)
      .then(async () => {
        await signInWithEmailAndPassword(auth, user.email, user.pass)
          .then(() => {
            //cookies.set("hola");
            console.log("logged in");
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  },
  logOut: async () => {
    signOut(auth)
      .then(() => {
        console.log("Logged out!");
        throw redirect(303, "/login");
      })
      .catch((e) => {
        console.error(e);
      });
  },
};
export { auth, db, database };
