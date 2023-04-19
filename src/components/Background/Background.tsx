import styles from "./background.module.css";
// different bg sizes & extensions
import bg from "~/assets/images/background.png";
import bgWebp from "~/assets/images/background.webp";
import bg2x from "~/assets/images/background2x.png";
import bg2xWebp from "~/assets/images/background2x.webp";
import bg3x from "~/assets/images/background3x.jpg";
import bg3xWebp from "~/assets/images/background3x.webp";
import bg4x from "~/assets/images/background4x.jpg";
import bg4xWebp from "~/assets/images/background4x.webp";

export default function Background() {
  return (
    <picture>
      <source media="(min-width:1900px)" type="image/webp" srcSet={bg4xWebp} />
      <source media="(min-width:1900px)" srcSet={bg4x} />
      <source media="(min-width:1440px)" type="image/webp" srcSet={bg3xWebp} />
      <source media="(min-width:1440px)" srcSet={bg3x} />
      <source media="(min-width:640px)" type="image/webp" srcSet={bg2xWebp} />
      <source media="(min-width:640px)" srcSet={bg2x} />
      <source srcSet={bgWebp} type="image/webp" />
      <img className={styles.bg} src={bg} loading="lazy" />
    </picture>
  );
}
