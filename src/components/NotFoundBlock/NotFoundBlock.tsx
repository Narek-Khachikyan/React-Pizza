import { FC } from "react";
import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.emoji}>🥲</div> <br />
      <h1 className={styles.text}>Nothing Found</h1>
    </div>
  );
};

export default NotFoundBlock;
