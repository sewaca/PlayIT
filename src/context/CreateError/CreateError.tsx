import { ReactNode, createContext, useState } from "react";
import Hint from "~/features/Hint/";
import styles from "./createError.module.css";

interface CreateErrorProps {
  children: ReactNode;
}

interface createContextProps {
  title: string;
  text: string;
}

export const CreateErrorContext = createContext(
  (props: createContextProps) => {}
);

export default function CreateErrorWrapper({ children }: CreateErrorProps) {
  const [errors, setErrors] = useState<
    { id: number; title: string; text: string }[]
  >([]);

  const createError = ({ title, text }: createContextProps) => {
    const id: number = parseInt(Math.random().toString().slice(2));
    setErrors((errors) => [
      ...errors,
      {
        id,
        title,
        text,
      },
    ]);
  };

  const closeError = (id: number) => {
    setErrors((errors) => errors.filter((item) => item.id !== id));
  };

  return (
    <CreateErrorContext.Provider value={createError}>
      {children}
      {errors.map((item) => (
        <Hint
          key={item.id}
          title={item.title}
          text={item.text}
          className={styles.modal}
          onClose={() => closeError(item.id)}
        />
      ))}
    </CreateErrorContext.Provider>
  );
}
