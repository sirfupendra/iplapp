import React from "react";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user,logout } = useAuth();
  return (
    <div>
      <nav className={styles.navbar}>
        <h1 className={styles.logo}>IPL Player Analysis</h1>
        <div className={styles.navButtons}>
          {!isAuthenticated() && (
            <button
              className={styles.loginButton}
              onClick={() => navigate("/")}
            >
              Home
            </button>
          )}
          {!isAuthenticated() && (
            <button
              className={styles.loginButton}
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
          {!isAuthenticated() && (
            <button
              className={styles.signupButton}
              onClick={() => navigate("/register")}
            >
              Sign Up
            </button>
          )}

          {isAuthenticated() && (
            <button
              className={styles.profile}
              onClick={() => navigate("/profile")}
            >
              {user}
            </button>
          )}
          {isAuthenticated() && (
            <button
              className={styles.logoutButton}
              onClick={() => logout()}
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
