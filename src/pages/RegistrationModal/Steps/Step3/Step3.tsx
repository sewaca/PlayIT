// COMPONENTS & STYLES
import { Button, Input, Modal, Textarea } from "~/components";
import styles from "../../registration-modal.module.css";
// REACT & REDUX
import { useDispatch, useSelector } from "react-redux";
import { setPage, setUserData, Store, UserInfoState } from "~/store";
import { ChangeEvent } from "react";

export default function Step3() {
  const dispatch = useDispatch();
  const user = useSelector<Store, UserInfoState>((store) => store.user);

  return (
    <Modal
      title="Регистрация"
      className={[styles.regModal, styles.step3].join(" ")}
      onClose={() => dispatch(setPage({ page: "registration", step: [1, 2] }))}
    >
      <div className={styles.container}>
        <Input
          label="Статус"
          className={styles.input}
          value={user.status}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            dispatch(setUserData({ status: e.target.value }))
          }
        />
        <Textarea
          label="О себе"
          rows={3}
          className={styles.input}
          value={user.aboutme}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            dispatch(setUserData({ aboutme: e.target.value }))
          }
        />
        <Input
          label="Интересы"
          className={styles.input}
          value={user.interests}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            dispatch(setUserData({ interests: e.target.value }))
          }
        />
        <Button
          className={styles.button}
          onClick={() => {
            dispatch(setPage({ page: "profile", id: user.id as number }));
          }}
        >
          Зарегистрироваться
        </Button>
      </div>
    </Modal>
  );
}
