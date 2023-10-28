import { ChangLanguage } from "../components/changLan";
import { useNavigate } from "react-router";
import { Sidebar } from "./sideBar";
import { useGlobalContext } from "../context/context-state";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NavPage } from "./navigation";
export const MainLayout = () => {
  const token = localStorage.getItem("token");
  const { state, showSideBar } = useGlobalContext();
  const navigate = useNavigate();
  const currentUrl = useLocation().pathname;

  useEffect(() => {
    state.component = currentUrl;
  }, [currentUrl]);
  if (!token) {
    navigate("/login");
  }

  return (
    <div className="wrapper" style={{ minHeight: "100h" }}>
      <nav className={`sidebar ${state.showSideBar ? " " : "collapsed"}`}>
        <Sidebar />
      </nav>

      <div className="main">
        <nav className="navbar">
          <a className="sidebar-toggle" onClick={showSideBar}>
            <i className="hamburger align-self-center"></i>
          </a>
          <div className="d-flex align-items-center gap-3 ms-auto me-1">
            <ChangLanguage />
          </div>
        </nav>

        <main className="content">
          <NavPage />
        </main>
      </div>
    </div>
  );
};
