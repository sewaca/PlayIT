import { Button } from "~/components";
import styles from "./action-buttons.module.css";
// Icons:
import likeIcon from "~/assets/icons/like__people_near.svg";
import dislikeIcon from "~/assets/icons/dislike__people_near.svg";

interface ActionButtonsProps {
  dislike: Function;
  like: Function;
}

export default function ActionButtons({ dislike, like }: ActionButtonsProps) {
  return (
    <div className={styles.buttons}>
      <Button
        withPadding={false}
        className={styles.actionButton}
        onClick={dislike}
      >
        <img src={dislikeIcon} />
      </Button>
      <Button
        withPadding={false}
        className={styles.actionButton}
        onClick={like}
      >
        <img src={likeIcon} />
      </Button>
    </div>
  );
}
