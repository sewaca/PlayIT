import { AllPages } from "~/store/pageInfo";
import styles from "./navbar-button.module.css";
import { Button } from "~/components/";

interface NavbarButtonProps {
  page: Exclude<AllPages, "">;
  fullwidth?: boolean;
}

export default function NavbarButton({
  page,
  fullwidth = false,
}: NavbarButtonProps) {
  return (
    <Button
      className={[styles.navbarButton, fullwidth ? styles.fullWidth : ""].join(
        " "
      )}
    ></Button>
  );
}
