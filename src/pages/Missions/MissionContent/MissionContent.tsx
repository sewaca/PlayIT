import React from "react";
import styles from "./mission-content.module.css";
import { GetTaskResponse } from "~/services/backend/tasks/get";
import { Button } from "~/components/";

interface MissionContentProps {
  data: GetTaskResponse;
}

export default function MissionContent({ data }: MissionContentProps) {
  return (
    <>
      <p className={styles.level}>Уровань: {data.difficulty}</p>
      <Button withPadding={false} className={styles.avatar}>
        <img src={data.image} />
      </Button>
      <p className={styles.name}>
        {data.name}, {data.age}
      </p>
      <p className={styles.description}>{data.description}</p>
    </>
  );
}
