import Button from "../Button";
import styles from "./navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setPage, Store } from "../../store";

interface NavbarProps {}

export default function Navbar({}: NavbarProps) {
  const userId = useSelector<Store, number>((store) => store.user.id || 0);
  const dispatch = useDispatch();

  return (
    <div className={styles.navbar}>
      <Button
        withPadding={false}
        className={[styles.button, styles.bigButton].join(" ")}
      />
      <Button withPadding={false} className={styles.button}>
        1
      </Button>
      <Button
        withPadding={false}
        className={styles.button}
        onClick={() => dispatch(setPage({ page: "profile", id: userId }))}
      >
        2
      </Button>
      <Button
        withPadding={false}
        className={styles.button}
        onClick={() => dispatch(setPage({ page: "peopleNear" }))}
      >
        3
      </Button>
      <Button
        withPadding={false}
        className={styles.button}
        onClick={() => dispatch(setPage({ page: "messages" }))}
      >
        4
      </Button>
      <Button
        withPadding={false}
        className={styles.button}
        onClick={() => dispatch(setPage({ page: "store" }))}
      >
        5
      </Button>
      <Button
        withPadding={false}
        className={styles.button}
        onClick={() => dispatch(setPage({ page: "missions" }))}
      >
        6
      </Button>
    </div>
  );
}
