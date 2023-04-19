import { useDispatch } from "react-redux";
import { setPage } from "~/store";
// COMPONENTS & STYLES
import styles from "./messages.module.css";
import { Modal } from "~/components";
import Message from "./Message/";
import { useContext } from "react";
import { ClosePageContext, OpenPageContext } from "~/context";

interface MessagesProps {}

const dialogs = [...Array(3)].map(() => ({
  id: Math.floor(Math.random() * 1000000),
  name: "Приора Заниженная",
  lastMessage: "Привет, говнюшка",
  avatar: "https://vjoy.cc/wp-content/uploads/2020/10/1-36-1024x1024-1.jpg",
}));

const finishedDialogs = [...Array(8)].map(() => ({
  id: Math.floor(Math.random() * 1000000),
  name: "Приора Заприореная",
  lastMessage: "Молодец, говнюшка",
  avatar:
    "https://gas-kvas.com/uploads/posts/2023-01/1673315774_gas-kvas-com-p-anime-neonovie-risunki-50.jpg",
}));

export default function Messages({}: MessagesProps) {
  const openPage = useContext(OpenPageContext);
  const closePage = useContext(ClosePageContext);
  
  return (
    <Modal
      title="Диалоги"
      onClose={() => closePage("messages")}
      refocus={() => openPage({ page: "messages" })}
      className={styles.messagesModal}
    >
      <div className={styles.content}>
        <div className={styles.list}>
          {dialogs.map((item) => (
            <Message key={item.id} {...item} />
          ))}
        </div>
        <p className={styles.splitter}>Выполненые задания</p>
        <div className={styles.list}>
          {finishedDialogs.map((item) => (
            <Message key={item.id} {...item} />
          ))}
        </div>
      </div>
    </Modal>
  );
}
