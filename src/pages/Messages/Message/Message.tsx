import { Button } from "~/components";
import styles from "./message.module.css";

interface MessageProps {
  id: number;
  avatar: string;
  name: string;
  lastMessage: string;
}

export default function Message({
  id,
  avatar,
  name,
  lastMessage,
}: MessageProps) {
  return (
    <Button className={styles.message}>
      <img className={styles.avatar} src={avatar} />
      <div className={styles.col}>
        <p className={styles.name}>{name}</p>
        <p className={styles.lastMessage}>{lastMessage}</p>
      </div>
    </Button>
  );
}
