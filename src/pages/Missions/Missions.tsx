// REACT & REDUX:
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setPage, Store } from "~/store";
// Components & styles
import styles from "./missions.module.css";
import { Modal } from "~/components";
import MissionContent from "./MissionContent";
import ActionButtons from "./ActionButtons";
// BACKEND:
import { acceptTask, getTask, GetTaskResponse } from "~/services/backend";

export default function Missions() {
  const userId = useSelector<Store, number>((store) => store.user.id || 0);
  if (!userId) return null;

  const dispatch = useDispatch();

  const [data, setData] = useState<GetTaskResponse[]>([]);

  const getData = () =>
    getTask(userId).then((res) => setData((d) => [...d, res]));

  function nextTask() {
    setData((d) => d.slice(1));
    getData();
  }
  function accept(id: number) {
    acceptTask(id, userId);
    nextTask();
  }

  useEffect(() => {
    getData().then(getData);
  }, []);

  return (
    <Modal
      title="Задания"
      onClose={() => dispatch(setPage({ page: "" }))}
      className={styles.modal}
      swipable
      onLeftSwipe={nextTask}
      onRightSwipe={accept}
    >
      <div className={styles.content}>
        {!data.length ? (
          <p>Загрузка...</p>
        ) : (
          <>
            <MissionContent data={data[0]} />
            <ActionButtons
              accept={() => accept(data[0].id)}
              reject={nextTask}
            />
          </>
        )}
      </div>
    </Modal>
  );
}
