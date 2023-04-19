import styles from "./action-buttons.module.css";
import { Button } from "~/components";
import rejectIcon from "~/assets/icons/missions__page/reject.svg";
import acceptIcon from "~/assets/icons/missions__page/accept.svg";

interface ActionButtonsProps {
  reject: Function;
  accept: Function;
}

export default function ActionButtons({ reject, accept }: ActionButtonsProps) {
  return (
    <div className={styles.actionButtons}>
      <Button
        withPadding={false}
        onClick={reject}
        className={styles.actionButton}
      >
        <span>Отклонить</span>
        <img src={rejectIcon} />
      </Button>
      <Button
        withPadding={false}
        onClick={accept}
        className={styles.actionButton}
      >
        <span>Принять</span>
        <img src={acceptIcon} />
      </Button>
    </div>
  );
}
