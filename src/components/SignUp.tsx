import { useFormik } from "formik";
import { FunctionComponent } from "react";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../services/usersService";
import { User } from "../interfaces/User";
import { errorMsg, successMsg } from "../services/feedbacksService";
import Navbar from "./Navbar";

interface SignUpProps {}

const SignUp: FunctionComponent<SignUpProps> = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { name: "", email: "", password: "", biz: false },
    validationSchema: yup.object({
      name: yup.string().required().min(2),
      email: yup.string().required().email("Invalid Email"),
      password: yup
        .string()
        .required()
        .min(8, "Too short! Should be a least 8 characters"),
      biz: yup.boolean().required(),
    }),
    onSubmit: (values: User,{resetForm}) => {
      addUser(values)
        .then((result) => {
          sessionStorage.setItem("Islogged", "true");
          sessionStorage.setItem("token", result.data.token);
          successMsg("You registered successfully");
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
          backgroundImage: `url("signUp_bg_img.jpg")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          height: "35rem",
        }}
      >
        <form className="mx-auto w-input py-2" onSubmit={formik.handleSubmit}>
          <h1 className="display-5 text-center my-3">Sign Up</h1>
          <div className="mb-3 form-floating">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Name"
            />
            <label htmlFor="name">Name</label>
          </div>
          {formik.touched.name && formik.errors.name ? (
            <p style={{color:'white',fontWeight:"bold"}}>{formik.errors.name}</p>
          ) : null}
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
          <div className=" form-check form-switch">
            <input
              type="checkbox"
              className="form-check-input"
              id="biz"
              name="biz"
              role="switch"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label className="form-check-label" htmlFor="biz">
              <span style={{ fontSize: "20px", color: "blue" }}>Business</span>
            </label>
          </div>
          {formik.touched.biz && formik.errors.biz ? (
            <p style={{color:'white',fontWeight:"bold"}}>{formik.errors.biz}</p>
          ) : null}
          <div>
            <button
              type="submit"
              className="btn btn-primary w-100 my-2"
              disabled={!(formik.isValid && formik.dirty)}
            >
              <strong>Submit</strong>
            </button>
            <p className="tect-center mt-3">
              <Link to="/SignIn">
                <strong style={{color:"white",fontSize:"20px",textDecoration:"underline"}}>Already have user? Sign In here</strong>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
