
import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import styles from "./View.module.css";
import { writeClient } from "@/sanity/lib/write-client";
import { after} from "next/server";

const view = async ({ id }: { id: string }) => {
  const { views: totalViews } = await client
    .config({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { id });

  console.log(totalViews);

  after(
    async () =>
  await writeClient
    .patch(id)
    .set({ views: totalViews + 1 })
    .commit());

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
