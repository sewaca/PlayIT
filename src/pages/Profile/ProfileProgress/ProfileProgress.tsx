import { Button } from "~/components";
import styles from "./profile-progress.module.css";

interface ProfileProgressProps {
  progress: number;
}

export default function ProfileProgress({ progress }: ProfileProgressProps) {
  return (
    <div className={styles.progressSection}>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFiller}
          style={{ width: progress + "%" }}
        ></div>
      </div>
      <Button>Заполнить данные</Button>
    </div>
  );
}
