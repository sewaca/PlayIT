import Button from "~/components/Button";
import styles from "./close-button.module.css";
import closeIcon from "~/assets/icons/close_icon.svg";

interface CloseButtonProps {
  className?: string;
  [index: string]: any;
}

export default function CloseButton({
  className = "",
  ...rest
}: CloseButtonProps) {
  return (
    <Button
      withPadding={false}
      className={[styles.closeButton, className].join(" ")}
      {...rest}
    >
      <img src={closeIcon} alt="X" />
    </Button>
  );
}
