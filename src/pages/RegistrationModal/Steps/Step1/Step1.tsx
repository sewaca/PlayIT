import { Modal, Button } from "~/components";
import logo from "~/assets/images/registration_logo.svg";
import styles from "../../registration-modal.module.css";

interface Step1Props {}

export default function Step1({}: Step1Props) {
  // Функция, перенаправляющая пользователя на страницу авторизации вк
  const handleVKLogin = () => {
    const client_id = 51582813; // ID VK приложения
    const cbLink = window.location.href; // redirect url
    const url = `https://oauth.vk.com/authorize?client_id=${client_id}&display=popup&redirect_uri=${cbLink}&scope=email&response_type=token&v=5.120`;
    window.location.href = url;
  };

  return (
    <Modal
      title="Регистрация"
      className={[styles.regModal, styles.step1].join(" ")}
    >
      <div style={{ paddingBottom: "13px" }}>
        <img src={logo} />
        <Button onClick={handleVKLogin} style={{ margin: "12px auto" }}>
          Продолжить через ВК
        </Button>
        <p style={{ maxWidth: 239, margin: "0 auto" }}>
          Нажимая на кнопку “продолжить” вы соглашаетесь с обработкой
          перcональных данных и бесконечный флекс
        </p>
      </div>
    </Modal>
  );
}
