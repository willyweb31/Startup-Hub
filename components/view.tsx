import Ping from "@/components/Ping";
import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import styles from "./View.module.css";

const view = async ({ id }: { id: string }) => {
  const { views: totalViews } = await client
    .config({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { id });

    console.log(totalViews)

  // TODO: Update the number of views:

  return (
    <div className={styles.viewContainer}>
      <span className={styles.pingWrapper}>
        <span className={styles.ping}></span>
        <span className={styles.pingDot}></span>
      </span>
      <span className={styles.viewsText}> Views: {totalViews}</span>
    </div>
  );
};

export default view;
