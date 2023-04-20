// REACT & REDUX:
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Store } from "~/store";
// COMPONENTS & STYLES
import styles from "./people-near.module.css";
import { Modal } from "~/components/";
import PersonInfo from "./PersonInfo";
import ActionButtons from "./ActionButtons";
// BACKEND:
import { useContext } from "react";
import { ClosePageContext, OpenPageContext } from "~/context";
import {
  getPeopleNear,
  GetPeopleNearResponse,
  likePerson,
  dislikePerson,
} from "~/services/backend/";

// TODO: Следует декомпозировать да и просто прибраться тут

interface PeopleNearProps {}

export default function PeopleNear({}: PeopleNearProps) {
  // Берем данные из Redux:
  const userId = useSelector<Store, number | undefined>(
    (store) => store.user.id
  );
  if (!userId) return null;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<GetPeopleNearResponse[]>([]);

  const closePage = useContext(ClosePageContext);
  const openPage = useContext(OpenPageContext);

  // ~ Функции
  // Показываем следующего пользователя и сразу подгружаем еще одного
  const nextOffer = () => {
    if (!data.slice(1).length) setLoading(true);
    setData((data) => data.slice(1));
    loadUser();
  };

  // Подгружаем пользователя
  const loadUser = () => {
    if (data.length === 0) setLoading(true);
    return getPeopleNear(userId)
      .then((res) => {
        setData((data) => [...data, res]);
        setLoading(false);
      })
      .catch(console.error);
  };

  // Функции, срабатывающие при лайке/дизлайке профиля
  const like = () => {
    if (data.length === 0) return;
    likePerson({ id: userId, liked: data[0].id });
    nextOffer();
  };

  const dislike = () => {
    if (data.length === 0) return;
    dislikePerson({ id: userId, disliked: data[0].id });
    nextOffer();
  };

  // Первый рендер
  useEffect(() => {
    // Загрузим первого юзера
    loadUser()
      // Затем загрузим второго, чтобы потом не ждать
      .then(loadUser);
  }, []);

  return (
    <Modal
      className={styles.modal}
      title="Люди рядом"
      swipable
      onLeftSwipe={dislike}
      onRightSwipe={like}
      onClose={() => closePage("peopleNear")}
      refocus={() => openPage({ page: "peopleNear" })}
    >
      <div className={styles.content}>
        {loading ? (
          <p>Загрузка...</p>
        ) : data[0] ? (
          <>
            <PersonInfo data={data[0]} />
            <ActionButtons {...{ like, dislike }} />
          </>
        ) : null}
      </div>
    </Modal>
  );
}
