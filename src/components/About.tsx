import { FunctionComponent, useEffect, useState } from "react";
import { User } from "../interfaces/User";
import { errorMsg } from "../services/feedbacksService";
import { getIsAdmin, getUser, getIsLogged } from "../services/usersService";
import Navbar from "./Navbar";

interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    password: "",
    biz: false,
  });

  useEffect(() => {
    getUser()
      .then((result) => setUser(result.data))
      .catch((err) => errorMsg(err.response.data));
  }, []);
  return (
    <>
      <Navbar isLogged={getIsLogged()} isAdmin={getIsAdmin()} />
      <h1 className="display-5 text-center my-3">YOUR PROFILE</h1>
      <div className="container">
        <img src="data:image/png;base64,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" />
        <h4>Name: {user.name}</h4>
        <h4>Email: {user.email}</h4>
        <h4>
          {user.biz ? (
            <>
              Business: <i className="fa-solid fa-check"></i>
            </>
          ) : (
            <>
              Business: <i className="fa-solid fa-circle-xmark"></i>
            </>
          )}
        </h4>
      </div>
    </>
  );
};

export default About;
