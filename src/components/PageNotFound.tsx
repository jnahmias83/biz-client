import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { getIsAdmin, getIsLogged } from "../services/usersService";
import Navbar from "./Navbar";

interface PageNotFoundProps {}

const PageNotFound: FunctionComponent<PageNotFoundProps> = () => {
  return (
    <>
      {getIsLogged() ? (<Navbar isLogged={getIsLogged()} isAdmin={getIsAdmin()} /> ) : (<Navbar isLogged={false} isAdmin={false} /> )}
      <div className="container m-5">
        <img
          src="https://www.lifewire.com/thmb/pGMhoCAF5a56wvVtPAWct8HdUPc=/3000x2000/filters:fill(auto,1)/404-not-found-error-explained-2622936-Final-fde7be1b7e2e499c9f039d97183e7f52.jpg"
          width="300"
        />
        <br /><br />
        {getIsLogged() ? (
          <Link to="/home">
            <button className="btn btn-primary">Back To Home Page</button>
          </Link>
        ) : (
          <Link to="/signIn">
            <button className="btn btn-primary">Back To Sign In Page</button>
          </Link>
        )}
      </div>
    </>
  );
};

export default PageNotFound;
