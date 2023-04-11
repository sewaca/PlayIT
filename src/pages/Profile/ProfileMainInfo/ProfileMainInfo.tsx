import styles from "./profile-main-info.module.css";
// TYPE
import { GetUserResponse } from "~/services/backend";

interface ProfileMainInfoProps {
  data: GetUserResponse;
}

export default function ProfileMainInfo({ data }: ProfileMainInfoProps) {
  return (
    <div className={styles.mainInfo}>
      <div className={styles.avatar}>
        <img src={data.avatar} alt="" />
      </div>
      <div className={styles.info}>
        <p>{data.name.first}</p>
        <p>{data.name.second}</p>
        <p>{data.faculty}</p>
        <p>{data.status}</p>
      </div>
    </div>
  );
}
