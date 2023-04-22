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
import { ClosePageContext, OpenPageContext } from "~/context";

interface ProfileProps {
  id: number;
}

export default function Profile({ id }: ProfileProps) {
  if (!id) return <></>;
  const userId = useSelector<Store, number>((store) => store.user.id || 0);
  const [loading, setLoading] = useState(true); // Идет ли загрузка
  const [data, setData] = useState<GetUserResponse | null>(null); // загруженные данные

  const closePage = useContext(ClosePageContext);
  const openPage = useContext(OpenPageContext);

  // При монтировании получаем инфу о пользователе
  useEffect(() => {
    getUser(id)
      .then((res) => {
        setLoading(false);
        setData(res);
      })
      .catch(() => {
        setLoading(false);
        setData(null);
      });
  }, []);

  return (
    <Modal
      title="Профиль"
      className={styles.modal}
      onClose={() => closePage("profile")}
      refocus={() => openPage({ page: "profile" })}
    >
      <div className={styles.content}>
        {loading ? (
          <p>загрузка...</p>
        ) : data ? (
          <>
            {/* Основная информация профиля */}
            <ProfileMainInfo data={data} />
            {/* Прогресс заполнения профиля */}
            {data.id === userId && <ProfileProgress setData={setData} data={data} />}
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
