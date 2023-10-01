import usFlag from "../assets/images/en.svg";
import peFlag from "../assets/images/pe.svg";
import lan from "../assets/images/language.svg";
import { useState, useRef, useEffect } from "react";
import { ReactNode } from "react";
import { useGlobalContext } from "../context/context-state";

export const ChangLanguage = (): JSX.Element => {
  const [showLanMenu, setShowLanMenu] = useState<boolean>(false);
  const ref = useRef<null>(null);
  const { language, changeLanguage, state } = useGlobalContext();
  useEffect(() => {
    const clickedOutSide = (e: { target: ReactNode }) => {
      if (showLanMenu && ref.current && !ref.current.contains(e.target)) {
        setShowLanMenu(false);
      }
    };
    document.addEventListener("mouseup", clickedOutSide);
    return () => {
      document.removeEventListener("mouseup", clickedOutSide);
    };
  }, [showLanMenu]);

  useEffect(() => {
    setShowLanMenu(false);
  }, [state.language]);
  return (
    <div className="dropdown ">
      <a className="nav-flag dropdown-toggle">
        <img
          src={lan}
          alt="select language"
          onClick={() => setShowLanMenu(!showLanMenu)}
        />
      </a>
      <div
        ref={ref}
        className={`dropdown-menu dropdown-menu-end ${
          showLanMenu ? "show" : undefined
        }`}
      >
        <a
          className="dropdown-item fw-bolder d-flex align-items-center gap-2"
          style={{ textAlign: language === "pe" ? "right" : "left" }}
          onClick={() => changeLanguage("pe")}
        >
          <img src={peFlag} width="20" className="ms-2" />
          <span className="align-middle">فارسی</span>
        </a>
        <a
          className="dropdown-item fw-bolder d-flex align-items-center gap-2"
          style={{ textAlign: language === "pe" ? "right" : "left" }}
          onClick={() => changeLanguage("en")}
        >
          <img src={usFlag} width="20" className="ms-2" />
          <span className="align-middle">English</span>
        </a>
      </div>
    </div>
  );
};
