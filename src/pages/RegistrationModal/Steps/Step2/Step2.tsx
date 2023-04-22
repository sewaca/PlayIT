// REACT & REDUX
import { setUserData, Store, UserInfoState, setPage } from "~/store";
import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent, useState } from "react";
// COMPONENTS & STYLES
import { Modal, Input, Button } from "~/components";
import styles from "../../registration-modal.module.css";
import AvatarCrop from "~/features/AvatarCrop/AvatarCrop";

export default function Step2() {
  const [errors, setErrors] = useState({ avatar: "", faculty: "", age: "" });
  const user = useSelector<Store, UserInfoState>((state) => state.user);
  const dispatch = useDispatch();
  const [imageData, setImageData] = useState<undefined | string>(undefined);

  if (user.avatar && errors.avatar) setErrors((errors)=>({...errors, avatar: ""}));
  if (user.faculty && errors.faculty) setErrors((errors)=>({...errors, faculty: ""}));
  if (user.age && errors.age) setErrors((errors)=>({...errors, age: ""}));

  // Валидация введенных данных и переход на следующий шаг регистрации
  const nextStep = () => {
    if (user.avatar && user.age && user.faculty) {
      dispatch(setPage({ page: "registration", step: [1, 2, 3] }));
    }
    setErrors({
      avatar: user.avatar ? "" : "Выберите фото профиля",
      faculty: user.faculty ? "" : "Введите факультет",
      age: user.age ? "" : "Введите возраст",
    });
  };

  return (
    <>
      <Modal
        title="Регистрация"
        className={[styles.regModal, styles.step2].join(" ")}
        onClose={() => dispatch(setPage({ page: "registration", step: [1] }))}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            nextStep();
            return false;
          }}
          className={styles.container}
          noValidate
        >
          <p style={{ fontSize: 15, marginBottom: 24 }}>
            Привет, {user.name?.first} {user.name?.second}
          </p>
          <Input
            required
            name="avatar"
            type="file"
            accept="image/jpg,image/jpeg,image/png"
            label="Прикрепить  фото профиля:"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const file = e.target?.files?.item(0);
              if (!file) return;
              var fr = new FileReader();
              fr.readAsDataURL(file);
              fr.onloadend = () => {
                setImageData((fr.result || undefined) as string | undefined);
              };
            }}
            error={errors.avatar}
          />
          <Input
            label="Факультет"
            required
            style={{ marginTop: 14 }}
            value={user.faculty}
            error={errors.faculty}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              dispatch(
                setUserData({
                  faculty: e.target.value || "",
                })
              )
            }
          />
          <Input
            label="Возраст"
            required
            style={{ marginTop: 14 }}
            type="number"
            value={user.age}
            error={errors.age}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              let val = parseInt(e.target.value);
              dispatch(
                setUserData({
                  age: val || undefined,
                })
              );
            }}
          />
          <Button className={styles.continueButton} onClick={nextStep} type="submit">
            Продолжить
          </Button>
        </form>
      </Modal>
      {imageData ? (
        <AvatarCrop
          image={imageData}
          onFinish={() => setImageData(undefined)}
        />
      ) : null}
    </>
  );
}
