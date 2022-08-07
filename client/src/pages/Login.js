import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../components/css/login.css";
import { notificationHandler } from "../components/Notification";
import { useUserContext } from "../context & data/UserContext";

const LoginHandler = async (data) => {
  try {
    const res = await axios.post("/api/auth/login", data);
    if (res.statusText === "OK") {
      localStorage.setItem("isAuth", true);
      localStorage.setItem("token", res.data.encodedToken);
      notificationHandler({
        type: "success",
        content: "Successfully Logged In",
      });
    } else {
      notificationHandler({
        type: "warning",
        content: "Your Password/Email Id Is Wrong, Try Again",
      });
    }
  } catch (error) {
    notificationHandler({
      type: "warning",
      content: "Server Is Not Responding, Try Again Later",
    });
    console.error(error);
  }
};

const LoginPage = () => {
  const [action, setAction] = useState("login");
  const navigate = useNavigate();
  const { dispatch } = useUserContext();
  const { state } = useLocation();
  let pathName = state?.pathname ?? "/";

  useEffect(() => {
    if (
      localStorage.getItem("isAuth") &&
      localStorage.getItem("isAuth") !== "false" &&
      localStorage.getItem("token").length > 25
    )
      navigate(-1);
  }, [navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let data = {};
    for (let x of formData) {
      data[x[0]] = x[1];
    }

    LoginHandler(data).then((res) => {
      setTimeout(() => {
        dispatch({ for: "userData", type: "update" });
        navigate(pathName);
      }, 2000);
    });
  };

  return (
    <div className="section loginPage">
      <div className="container">
        {action === "login" ? (
          <div className="login_comp flex flex-col p2">
            <h2 className="head2">Login</h2>
            <form className="login_form flex flex-col" onSubmit={submitHandler}>
              <label htmlFor="username">Uername</label>
              <div className="input">
                <input type="text" id="username" name="email" required />
              </div>
              <label htmlFor="password">Password</label>
              <div className="input">
                <input type="password" id="password" name="password" required />
              </div>
              <label className="checkbox">
                <input type="checkbox" />
                Remember Me
              </label>
              <button className="btn-sec" type="submit">
                Login
              </button>
              <button type="button" onClick={() => setAction("signup")}>
                Create An Account {">"}
              </button>
              <button
                type="button"
                onClick={() => {
                  LoginHandler({
                    email: "hell@gmail.com",
                    password: "12345678",
                  }).then((res) => {
                    setTimeout(() => {
                      dispatch({ for: "userData", type: "update" });
                      navigate(pathName);
                    }, 2000);
                  });
                }}
              >
                Login As Guest {">"}
              </button>
            </form>
          </div>
        ) : (
          <SignUp setAction={() => setAction("login")} />
        )}
      </div>
    </div>
  );
};

const SignUp = ({ setAction }) => {
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let data = {};
    for (let x of formData) {
      data[x[0]] = x[1];
    }

    (async () => {
      try {
        const res = await axios.post("/api/auth/signup", data);
        notificationHandler({
          type: "success",
          content: "Successfully Signed Up",
        });
        setTimeout(() => {
          setAction();
        }, 2000);
      } catch (error) {
        notificationHandler({
          type: "warning",
          content: "Server Error Try Again Later",
        });
        console.error(error);
      }
    })();
  };

  return (
    <div className="signup_comp flex flex-col p2">
      <h2 className="head2">Sign Up</h2>
      <form onSubmit={submitHandler} className="signup_form flex flex-col">
        <label htmlFor="full_name">Full Name</label>
        <div className="input">
          <input type="full_name" id="full_name" required name="full_name" />
        </div>
        <label htmlFor="email">Email</label>
        <div className="input">
          <input type="email" id="email" required name="email" />
        </div>
        <label htmlFor="password">Password</label>
        <div className="input">
          <input type="password" id="password" name="password" required />
        </div>

        <label className="checkbox">
          <input type="checkbox" name="terms" />I accept all the terms &nspb;
          conditions
        </label>

        <button className="btn-sec" type="submit">
          Create An Account
        </button>
        <button onClick={setAction} type="button">
          Already Have An Account {">"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
