import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogoutLink = (props: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const hanldeSumbit = async (e: React.FormEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5031/logout", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        navigate("/log-in");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <a href="#" onClick={hanldeSumbit}>
        {props.children}
      </a>
    </>
  );
};

export default LogoutLink;
