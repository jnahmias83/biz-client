import { useFormik } from "formik";
import { FunctionComponent } from "react";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { findUser, getIsAdmin, getIsLogged } from "../services/usersService";
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
      onSubmit: (values: User) => {
        findUser(values)
          .then((result) => {
            sessionStorage.setItem("Islogged", "true");
            sessionStorage.setItem("token", result.data.token);
            successMsg("You logged successfully");
            navigate('/about');
          })
          .catch((err) => {
            errorMsg(err.response.data);
          });
      },
    });
  
    return (
      <>
        <Navbar isLogged={false} isAdmin={false} />
        <form className="mx-auto w-25" onSubmit={formik.handleSubmit}>
          <h1 className="display-5 text-center my-3">LOGIN</h1>
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
            <p className="text-danger">{formik.errors.email}</p>
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
            <p className="text-danger">{formik.errors.password}</p>
          ) : null}
          <div>
            <button
              type="submit"
              className="btn btn-secondary w-100"
              disabled={!(formik.isValid && formik.dirty)}
            >
              Submit
            </button>
            <p className="tect-center mt-3">
              <Link to="/SignUp">New user?Register here</Link>
            </p>
          </div>
        </form>
      </>
    );
}
 
export default SignIn;