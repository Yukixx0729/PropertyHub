import { useNavigate } from "react-router-dom";

const LogoutLink = (props: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const hanldeSumbit = async (e: React.FormEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    fetch("http://localhost:5031/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      credentials: "include",
    })
      .then((data) => {
        if (data.ok) {
          navigate("/log-in");
        } else {
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <span>
      <a href="#" onClick={hanldeSumbit} className="btn btn-primary mx-2">
        {props.children}
      </a>
    </span>
  );
};

export default LogoutLink;