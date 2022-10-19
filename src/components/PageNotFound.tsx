import { FunctionComponent } from "react";

interface PageNotFoundProps {}

const PageNotFound: FunctionComponent<PageNotFoundProps> = () => {
  return (
    <>
      <div className="container m-5">
        <img
          src="https://www.lifewire.com/thmb/pGMhoCAF5a56wvVtPAWct8HdUPc=/3000x2000/filters:fill(auto,1)/404-not-found-error-explained-2622936-Final-fde7be1b7e2e499c9f039d97183e7f52.jpg"
          width="300"
        />
      </div>
    </>
  );
};

export default PageNotFound;
