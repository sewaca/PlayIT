// ~ REACT
import { useContext } from "react";
import { OpenPageContext } from "~/context";
// ~ REDUX
import { useSelector } from "react-redux";
import { Store, Page } from "~/store";
import styles from "./navbar-button.module.css";
import { Button } from "~/components/";
// ~ IMAGES
import registrationPageIcon from "~/assets/icons/navbar_icons/registration.icon.svg";
import profilePageIcon from "~/assets/icons/navbar_icons/profile.icon.svg";
import peopleNearPageIcon from "~/assets/icons/navbar_icons/peopleNear.icon.svg";
import missionsPageIcon from "~/assets/icons/navbar_icons/missions.icon.svg";
import storePageIcon from "~/assets/icons/navbar_icons/store.icon.svg";
import messagesPageIcon from "~/assets/icons/navbar_icons/messages.icon.svg";

type Pages = Exclude<Page, "">;
type PagesInfo = { [index in Pages]: string };
// Иконки страниц
const icons: PagesInfo = {
  registration: registrationPageIcon,
  profile: profilePageIcon,
  peopleNear: peopleNearPageIcon,
  missions: missionsPageIcon,
  store: storePageIcon,
  messages: messagesPageIcon,
};
// Названия страниц
const titles: PagesInfo = {
  registration: "Регистрация",
  profile: "Профиль",
  peopleNear: "Люди рядом",
  missions: "Задания",
  store: "Магазин",
  messages: "Диалоги",
};


interface NavbarButtonProps {
  page: Exclude<Page, "">;
  fullwidth?: boolean;
  onClick?: Function;
}

export default function NavbarButton({
  page,
  fullwidth = false,
  onClick = () => {},
}: NavbarButtonProps) {
  const openPage = useContext(OpenPageContext);
  const userId = useSelector<Store, number | undefined>(
    (state) => state.user.id
  );

  return (
    <Button
      withPadding={false}
      className={[styles.navbarButton, fullwidth ? styles.fullWidth : ""].join(
        " "
      )}
      onClick={() => {
        openPage(
          page === "registration"
            ? { page, step: [1] }
            : page === "profile"
            ? { page, id: userId }
            : { page }
        );
        onClick();
      }}
    >
      <div className={styles.icon}>
        <img src={icons[page]} />
      </div>
      <span>{titles[page]}</span>
    </Button>
  );
}
