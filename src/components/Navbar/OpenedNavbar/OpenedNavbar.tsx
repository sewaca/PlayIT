import React from "react";
import styles from "./opened-navbar.module.css";
import Modal from "~/components/Modal/Modal";
import verticalLogo from "~/assets/icons/navbar_icons/vertical_playit_logo.svg";
import NavbarButton from "../NavbarButton/NavbarButton";

interface OpenedNavbarProps {
  onClick?: Function;
}

const pages: ("profile" | "peopleNear" | "missions" | "store" | "messages")[] =
  ["profile", "peopleNear", "messages", "store", "missions"];

export default function OpenedNavbar({
  onClick = () => {},
}: OpenedNavbarProps) {
  return (
    <div className={styles.OpenedNavbarModal}>
      <div className={styles.sidebar}>
        <img src={verticalLogo} />
      </div>
      <div className={styles.buttons}>
        {pages.map((page) => (
          <NavbarButton page={page} key={page} fullwidth onClick={onClick} />
        ))}
      </div>
    </div>
  );
}
