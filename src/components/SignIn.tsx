import { useFormik } from "formik";
import { FunctionComponent } from "react";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { findUser } from "../services/usersService";
import { User } from "../interfaces/User";
import { errorMsg, successMsg } from "../services/feedbacksService";
import Navbar from "./Navbar";

interface SignInProps {}

const SignIn: FunctionComponent<SignInProps> = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: yup.object({
      email: yup.string().required().email("Invalid Email"),
      password: yup
        .string()
        .required()
        .min(8, "Too short! Should be a least 8 characters"),
    }),
    onSubmit: (values: User,{resetForm}) => {
      findUser(values)
        .then((result) => {
          sessionStorage.setItem("Islogged", "true");
          sessionStorage.setItem("token", result.data.token);
          successMsg("You logged successfully");
          navigate("/home");
        })
        .catch((err) => {
          errorMsg(err.response.data);
          resetForm();
        });
    },
  });

  return (
    <>
      <Navbar isLogged={false} isAdmin={false} />
      <div
        style={{
          backgroundImage: `url("signIn_bg_img.jpg")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          height: "35rem",
        }}
      >
        <form className="mx-auto w-input py-2" onSubmit={formik.handleSubmit}>
          <h1 className="display-5 text-center my-3">Sign In</h1>
          <div className="mb-3 form-floating">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Email"
            />
            <label htmlFor="email">Email address</label>
          </div>
          {formik.touched.email && formik.errors.email ? (
            <p style={{color:'white',fontWeight:"bold"}}>{formik.errors.email}</p>
          ) : null}
          <div className="mb-3 form-floating">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Password"
            />
            <label htmlFor="password">Password</label>
          </div>
          {formik.touched.password && formik.errors.password ? (
            <p style={{color:'white',fontWeight:"bold"}}>{formik.errors.password}</p>
          ) : null}
          <div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={!(formik.isValid && formik.dirty)}
            >
              <strong>Submit</strong>
            </button>
            <p className="tect-center mt-3">
              <Link to="/SignUp">
                <strong
                  style={{
                    color: "white",
                    fontSize: "20px",
                    textDecoration: "underline",
                  }}
                >
                  New user? Sign Up here
                </strong>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;
