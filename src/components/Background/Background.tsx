import styles from "./background.module.css";
// different bg sizes & extensions
import bg from "~/assets/images/background.png";
import bgWebp from "~/assets/images/background.webp";
import bg2x from "~/assets/images/background2x.png";
import bg2xWebp from "~/assets/images/background2x.webp";

export default function Background() {
  return (
    <picture>
      <source media="(min-width:640px)" type="image/webp" srcSet={bg2xWebp} />
      <source media="(min-width:640px)" srcSet={bg2x} />
      <source srcSet={bgWebp} type="image/webp" />
      <img className={styles.bg} src={bg} />
    </picture>
  );
}
