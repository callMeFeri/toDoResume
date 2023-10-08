import { useGlobalContext } from "../context/context-state";
import { useTranslation } from "react-i18next";

import logo from "../assets/images/1738002.avif";
import { useNavigate } from "react-router";
export const Sidebar = () => {
  const { state, clean } = useGlobalContext();
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <nav className={`sidebar ${state.showSideBar ? " " : "collapsed"}`}>
      <div>
        <a className="sidebar-brand d-flex flex-column align-items-center pt-0 mb-0">
          <img src={logo} style={{ height: "280px", width: "280px" }} />
          <p className="mb-0">{t("mainLayOut.title")}</p>
        </a>
        <ul className="sidebar-nav pe-0">
          <li className="sidebar-header fw-bolder fs-lg">
            {" "}
            {t("mainLayOut.manage")}
          </li>
          <li className="sidebar-item">
            <a
              aria-current="page"
              className="sidebar-link active"
              onClick={() => {
                navigate("/boards");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-video align-middle me-2"
              >
                <polygon points="23 7 16 12 23 17 23 7"></polygon>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
              </svg>
              <span className="align-middle me-2">
                {" "}
                {t("mainLayOut.allboards")}
              </span>
            </a>
          </li>
          <li className="sidebar-item">
            <a
              className="sidebar-link"
              onClick={() => {
                navigate("/tasks");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-video align-middle me-2"
              >
                <polygon points="23 7 16 12 23 17 23 7"></polygon>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
              </svg>
              <span className="align-middle me-2">
                {" "}
                {t("mainLayOut.boards-category")}
              </span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" onClick={clean}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-video align-middle me-2"
              >
                <polygon points="23 7 16 12 23 17 23 7"></polygon>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
              </svg>
              <span className="align-middle me-2">
                {" "}
                {t("mainLayOut.clean")}
              </span>
            </a>
          </li>
          <li className="sidebar-header fw-bolder fs-lg">
            {t("mainLayOut.acc-manage")}{" "}
          </li>
          <li className="sidebar-item">
            <a
              className="sidebar-link"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-user align-middle me-2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span className="align-middle me-2"> {t("mainLayOut.exit")}</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
