import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "src/firebase-init";
import { useState } from "react";
import { useRouter } from "expo-router";
import LoginForm from "./LoginForm";
import { useAuthentication } from "library/hooks/useAuthentication";

export default function LoginController() {
  const router = useRouter();

  /**
   * Logs in.
   *
   * @param email User email address
   * @param password Password
   * @returns Promise that is fulfilled when signup completes.
   * @throws Error when sign up fails.
   */
  function submit(email: string, password: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      // Local input validation
      if (email === "" || password === "") {
        reject(new Error("Incorrect email or password."));
      }
      // Sign in with Firebase Authentication
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          router.replace("(tabs)/");
        })
        .catch((error) => {
          const errorCode = error.code;
          if (
            errorCode === "auth/invalid-email" ||
            errorCode === "auth/wrong-password"
          ) {
            reject(new Error("Incorrect email or password."));
          } else {
            reject(new Error("Error signing in. Try again later?"));
          }
        });
    });
  }

  return <LoginForm onSubmit={submit} />;
}
