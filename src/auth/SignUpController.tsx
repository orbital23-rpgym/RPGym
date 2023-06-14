import { createUserWithEmailAndPassword } from "firebase/auth";
import SignUpForm from "./SignUpForm";
import { auth, db } from "src/firebase-init";
import { User } from "src/user/User";
import { useRouter } from "expo-router";

export default function SignUpController() {
  const router = useRouter();

  /**
   * Creates new user.
   *
   * @param email User email address
   * @param username User username
   * @param password1 Password
   * @param password2 Confirm password
   * @returns Promise that is fulfilled when signup completes.
   * @throws Error when sign up fails.
   */
  function submit(
    email: string,
    username: string,
    password1: string,
    password2: string,
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      // Local input validation
      if (email === "") {
        reject(new Error("Email must not be empty"));
      } else if (password1 === "") {
        reject(new Error("Password must not be empty"));
      } else if (password1 !== password2) {
        reject(new Error("Passwords do not match"));
      } else if (username === "") {
        reject(new Error("Username must not be empty"));
      }
      // Create new Firebase Authentication user
      createUserWithEmailAndPassword(auth, email, password1)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // Create user data
          // Assume user email not null as we are only using email/password auth.
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          User.create(user.uid, username, user.email!)
            .then((user) => {
              resolve();
              router.replace("(tabs)/");
            })
            .catch((error) => reject(error));
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          switch (errorCode) {
            case "auth/email-already-in-use":
              reject(
                new Error("An account with that email address already exists"),
              );
              break;
            case "auth/weak-password":
              reject(new Error("Password must be at least 6 characters long"));
              break;
            case "auth/invalid-email":
              reject(new Error("Invalid email address"));
              break;
            default:
              reject(new Error("Error: " + errorMessage));
          }
        });
    });
  }

  return <SignUpForm onSubmit={submit} />;
}
