import * as firebase from "firebase/app";
import { firebaseApp } from "./firebase.config";
import {
  Auth,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export class UserService {
  private _firebaseApp= firebaseApp;
  private _auth: Auth;

  constructor() {
    this._auth = getAuth(this._firebaseApp);
  }

  async login(email: string, password: string) {
    return await signInWithEmailAndPassword(this._auth, email, password);
  }

  async register(email: string, password: string) {
    return await createUserWithEmailAndPassword(this._auth, email, password);
  }

  async logout() {
    return await this._auth.signOut();
  }
}
