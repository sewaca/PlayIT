import Hint from "~/features/Hint";
import { useDispatch } from "react-redux";
import { setPage } from "~/store/pageInfo";

export default function HintAfter2Step() {
  const dispatch = useDispatch();

  return (
    <Hint
      text="Расскажи о себе и получи дополнительные флекскоины!"
      onClose={() =>
        dispatch(setPage({ page: "registration", step: [1, 2, 3] }))
      }
      style={{ maxWidth: 262, top: "27vh", left: "7vw" }}
    />
  );
}
