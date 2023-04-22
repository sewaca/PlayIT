// REACT & REDUX:
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Store } from "~/store";
// Components & styles
import styles from "./missions.module.css";
import { Modal } from "~/components";
import MissionContent from "./MissionContent";
import ActionButtons from "./ActionButtons";
// BACKEND:
import {
  acceptTask,
  getTask,
  GetTaskResponse,
  rejectTask,
} from "~/services/backend";
import { ClosePageContext, OpenPageContext } from "~/context";

export default function Missions() {
  const userId = useSelector<Store, number>((store) => store.user.id || 0);
  if (!userId) return null;

  const closePage = useContext(ClosePageContext);
  const openPage = useContext(OpenPageContext);

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
  function reject(id: number) {
    rejectTask(id, userId);
    nextTask();
  }

  useEffect(() => {
    getData().then(getData);
  }, []);

  return (
    <Modal
      title="Задания"
      onClose={() => closePage("missions")}
      refocus={() => openPage({ page: "missions" })}
      className={styles.modal}
      swipable
      onLeftSwipe={() => (data.length ? reject(data[0].id) : null)}
      onRightSwipe={() => (data.length ? accept(data[0].id) : null)}
    >
      <div className={styles.content}>
        {!data.length ? (
          <p>Загрузка...</p>
        ) : (
          <>
            <MissionContent data={data[0]} />
            <ActionButtons
              accept={() => accept(data[0].id)}
              reject={() => reject(data[0].id)}
            />
          </>
        )}
      </div>
    </Modal>
  );
}
