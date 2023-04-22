import { Button, Input, Modal, Textarea } from "~/components";
import styles from "./profile-progress.module.css";
import { GetUserResponse, changeUser } from "~/services/backend";
import { ChangeEvent, useState } from "react";

interface ProfileProgressProps {
  data: GetUserResponse;
  setData: Function;
}

export default function ProfileProgress({
  data,
  setData,
}: ProfileProgressProps) {
  const [openedModal, setOpenedModal] = useState(false);
  const [fields, setFields] = useState({
    status: data.status,
    aboutme: data.aboutme,
    interests: data.interests,
  });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <>
      <div className={styles.progressSection}>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFiller}
            style={{ width: data.progress + "%" }}
          ></div>
        </div>
        <Button onClick={() => setOpenedModal(true)}>Заполнить данные</Button>
      </div>
      {openedModal ? (
        <Modal
          title="Заполнить данные"
          className={styles.fillDataModal}
          onClose={() => setOpenedModal(false)}
        >
          <div className={styles.fillDataModalContent}>
            {loading ? (
              <p>Загрузка...</p>
            ) : saved ? (
              <p>Сохранено</p>
            ) : (
              <>
                <Input
                  value={fields.status}
                  label="Статус"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFields({ ...fields, status: e.target.value })
                  }
                />
                <Textarea
                  value={fields.aboutme}
                  label="Обо мне"
                  rows={6}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setFields({ ...fields, aboutme: e.target.value })
                  }
                />
                <Input
                  value={fields.interests}
                  label="Интересы"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFields({ ...fields, interests: e.target.value })
                  }
                />
                <Button
                  onClick={() => {
                    setLoading(true);
                    changeUser({
                      id: data.id,
                      ...fields,
                    })
                      .then(() => {
                        setLoading(false);
                        setSaved(true);
                        setTimeout(() => {
                          setData({ ...data, ...fields });
                          setSaved(false);
                          setOpenedModal(false);
                        }, 500);
                      })
                      .catch(() => console.error("ошибка"));
                  }}
                >
                  Сохранить изменения
                </Button>
              </>
            )}
          </div>
        </Modal>
      ) : null}
    </>
  );
}
