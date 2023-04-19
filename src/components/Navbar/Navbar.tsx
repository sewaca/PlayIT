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
import bigButtonImage from "~/assets/icons/playIt_bigButton.svg";

interface NavbarProps {}

export default function Navbar({}: NavbarProps) {
  // Is opened side menu with all pages buttons
  const [openedMenu, setOpenedMenu] = useState<boolean>(false);
  // Opened pages
  const pages = useSelector<Store, AllPages[]>((store) => store.page.page);

  // TODO: REWORK!
  const openPage = useContext(OpenPageContext);

  return (
    <div className={styles.navbar}>
      <Button
        withPadding={false}
        className={[styles.button, styles.bigButton].join(" ")}
        onClick={() => setOpenedMenu(!openedMenu)}
      >
        <img src={bigButtonImage} alt="Play IT" />
      </Button>

      {/* TODO: REWORK ME */}
      <Button
        withPadding={false}
        className={styles.button}
        onClick={() => openPage({ page: "registration", step: [1] })}
      >
        1
      </Button>
      <Button
        withPadding={false}
        className={styles.button}
        onClick={() => openPage({ page: "profile", id: -1 })}
      >
        2
      </Button>
      <Button
        withPadding={false}
        className={styles.button}
        onClick={() => openPage({ page: "peopleNear" })}
      >
        3
      </Button>
      <Button
        withPadding={false}
        className={styles.button}
        onClick={() => openPage({ page: "messages" })}
      >
        4
      </Button>
      <Button
        withPadding={false}
        className={styles.button}
        onClick={() => openPage({ page: "store" })}
      >
        5
      </Button>
      <Button
        withPadding={false}
        className={styles.button}
        onClick={() => openPage({ page: "missions" })}
      >
        6
      </Button>
    </div>
  );
}
