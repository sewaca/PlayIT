import { useDispatch } from "react-redux";
import { setPage } from "~/store";
import { GetPeopleNearResponse } from "~/services/backend";
import { Button } from "~/components";
import styles from "./person-info.module.css";
import { useContext } from "react";
import { OpenPageContext } from "~/context";

interface PersonInfoProps {
  data: GetPeopleNearResponse;
}

export default function PersonInfo({ data }: PersonInfoProps) {
  const openPage = useContext(OpenPageContext);
  return (
    <>
      <Button
        withPadding={false}
        className={styles.avatar}
        onClick={(e: MouseEvent) => {
          e.stopPropagation();
          openPage({ page: "profile", id: data.id });
        }}
      >
        <img src={data.avatar} />
      </Button>
      <span className={styles.name}>
        {data.name.first} {data.name.second}, {data.faculty}
      </span>
      <span className={styles.description}>{data.description}</span>
    </>
  );
}
