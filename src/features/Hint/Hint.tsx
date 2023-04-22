import { Button, Modal } from "~/components";
import styles from "./hint.module.css";
import hintIcon from "~/assets/icons/hint.svg";

interface HintProps {
  title?: string;
  text?: string;
  onClose?: Function;
  [index: string]: any;
}

export default function Hint({
  title = "Подсказка",
  text = "",
  onClose = () => {},
  ...rest
}: HintProps) {
  return (
    <Modal inactive {...{ title, onClose, ...rest }}>
      <div className={styles.container}>
        <div className={styles.row}>
          <img src={hintIcon} />
          <span>{text}</span>
        </div>
        <Button onClick={onClose} className={styles.button}>
          Ок
        </Button>
      </div>
    </Modal>
  );
}
