// ~ REACT
import { useContext, useState } from "react";
import { OpenPageContext } from "~/context";
// ~ REDUX
import { useSelector } from "react-redux";
import { Store } from "../../store";
import { AllPages } from "~/store/pageInfo";
// ~ COMPONENTS & STYLES
import { Button } from "~/components";
import styles from "./navbar.module.css";
import NavbarButton from "./NavbarButton/";
import OpenedNavbar from "./OpenedNavbar/";
// ~ ICONS
import bigButtonImage from "~/assets/icons/navbar_icons/playIt_bigButton.svg";

interface NavbarProps {}

export default function Navbar({}: NavbarProps) {
  // Is opened side menu with all pages buttons
  const [openedMenu, setOpenedMenu] = useState<boolean>(false);
  // Opened pages
  const pages = useSelector<Store, AllPages[]>((store) => store.page.page);

  return (
    <>
      <div className={styles.navbar}>
        <Button
          withPadding={false}
          className={[styles.button, styles.bigButton].join(" ")}
          onClick={() => setOpenedMenu(!openedMenu)}
        >
          <img src={bigButtonImage} alt="Play IT" />
        </Button>
        {pages.map((page) =>
          page !== "" ? <NavbarButton page={page} key={page} /> : null
        )}
      </div>
      {openedMenu ? (
        <OpenedNavbar onClick={() => setOpenedMenu(!openedMenu)} />
      ) : null}
    </>
  );
}
