import { useNavigate } from "react-router";
import { useEffect } from "react";
export const NotFound = (): JSX.Element => {
  useEffect(() => {
    setTimeout(() => {
      const navigate = useNavigate();
      navigate("/", {});
    }, 2000);
  }, []);

  return <h2>Not Found</h2>;
};
