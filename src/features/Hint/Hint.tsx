import { Button, Modal } from "~/components";
import styles from "./hint.module.css";
import hintIcon from "~/assets/icons/hint.svg";

interface HintProps {
  text?: string;
  onClose?: Function;
  [index: string]: any;
}

export default function Hint({
  text = "",
  onClose = () => {},
  ...rest
}: HintProps) {
  return (
    <Modal inactive title="Подсказка" {...{ onClose, ...rest }}>
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
