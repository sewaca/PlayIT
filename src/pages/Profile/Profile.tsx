// REACT & REDUX
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage, Store } from "~/store";
// COMPONENTS & STYLES
import { Modal } from "~/components";
import styles from "./profile.module.css";
// BACKEND
import { getUser, GetUserResponse } from "~/services/backend/";
import ProfileProgress from "./ProfileProgress";
import ProfileMainInfo from "./ProfileMainInfo";
import { useContext } from "react";
import { ClosePageContext } from "~/context";

interface ProfileProps {
  id: number;
  onClose?: Function;
}

export default function Profile({ id, onClose = undefined }: ProfileProps) {
  if (!id) return <></>;

  const [loading, setLoading] = useState(true); // Идет ли загрузка
  const [data, setData] = useState<GetUserResponse | null>(null); // загруженные данные

  const closePage = useContext(ClosePageContext);
  const userId = useSelector<Store, number>((store) => store.user.id || 0);

  // При монтировании получаем инфу о пользователе
  useEffect(() => {
    getUser(id).then((res) => {
      setLoading(false);
      setData(res);
    });
  }, []);

  return (
    <Modal
      title="Профиль"
      className={styles.modal}
      onClose={onClose || (() => closePage("profile"))}
    >
      <div className={styles.content}>
        {loading ? (
          <p>загрузка...</p>
        ) : data ? (
          <>
            {/* Основная информация профиля */}
            <ProfileMainInfo data={data} />
            {/* Прогресс заполнения профиля */}
            {data.id === userId && <ProfileProgress progress={data.progress} />}
            {/* Обо мне */}
            {data.aboutme && <p className={styles.aboutme}>{data.aboutme}</p>}
            {/* Дополнительные поля */}
            {data.interests && (
              <div className={styles.additionalField}>
                <span className={styles.title}>Интересы:</span>
                <span>{data.interests}</span>
              </div>
            )}
          </>
        ) : (
          <p>Ошибка! Не удалось загрузить данные</p>
        )}
      </div>
    </Modal>
  );
}
