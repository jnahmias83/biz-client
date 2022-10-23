import { FunctionComponent } from "react";

interface FooterProps {
  myName: string;
}

const Footer: FunctionComponent<FooterProps> = ({ myName }) => {
  return (
    <>
      <div className="text-light bg-dark p-2 w-100" style={{zIndex:2,position:"absolute"}}>
        {" "}
        © {myName} 2022 - all right reserved{" "}
      </div>
    </>
  );
};

export default Footer;
