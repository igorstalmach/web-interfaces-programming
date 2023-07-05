import React, { useContext, useEffect } from "react";
import styles from "./Login.module.scss";
import Form from "react-bootstrap/Form";
import { UserContext } from "../../common/providers/UserProvider";
import axios from "axios";
import { IUser } from "../../common/interfaces/IUser";
import { useNavigate } from "react-router";
import { useLocalStorage } from "../../common/hooks/useLocalStorage";
import { toast } from "react-toastify";
import {
  logInWithGithub,
  logInWithGoogle,
  useUser,
} from "../../common/firebase/authService";
import google from "../../assets/images/google-icon.png";
import github from "../../assets/images/github-icon.png";

export const Login = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [validUsers, setValidUsers] = React.useState<IUser[]>([]);
  const [storedUser, setStoredUser] = useLocalStorage("websiteUser");
  const firebaseUser = useUser();

  useEffect(() => {
    axios.get("data/users.json").then((response) => {
      setValidUsers(response.data);
    });
  }, []);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const enteredEmail = (
      document.getElementById("formBasicEmail") as HTMLInputElement
    ).value;
    const enteredPassword = (
      document.getElementById("formBasicPassword") as HTMLInputElement
    ).value;

    const validUser = validUsers.find(
      (validUser) =>
        validUser.email === enteredEmail &&
        validUser.password === enteredPassword
    );

    if (!validUser) {
      toast.error("Invalid email or password.");
      return;
    }

    setUser(validUser);
    setStoredUser(validUser);
    toast.success("Login successful. Have a great day!");

    navigate("/");
  };

  const handleGoogleLogin = async () => {
    await logInWithGoogle();
    await handleProviderLogin();
  };

  const handleGithubLogin = async () => {
    await logInWithGithub();
    await handleProviderLogin();
  };

  const handleProviderLogin = async () => {
    if (!firebaseUser) {
      toast.error("Login unsuccessful. Please try again.");
      return;
    }

    if (firebaseUser.displayName !== null && firebaseUser.email !== null) {
      setUser({
        name: firebaseUser?.displayName,
        email: firebaseUser?.email,
        uid: firebaseUser?.uid,
      });
      setStoredUser({
        name: firebaseUser?.displayName,
        email: firebaseUser?.email,
        uid: firebaseUser?.uid,
      });

      toast.success("Login successful. Have a great day!");
    }

    navigate("/");
  };

  return (
    <div className={styles.container}>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            Psst! johndoe@example.com
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
          <Form.Text className="text-muted">password123</Form.Text>
        </Form.Group>
        <div className={styles.buttonContainer}>
          <button
            className={styles.button}
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className={styles.button}
            type="button"
            onClick={handleGoogleLogin}
          >
            <img src={google} alt="Google icon" />
            Sign in with Google
          </button>
          <button
            className={styles.button}
            type="button"
            onClick={handleGithubLogin}
          >
            <img src={github} alt="Github icon" />
            Sign in with GitHub
          </button>
        </div>
      </Form>
    </div>
  );
};
