import React from "react";
import { STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { Skeleton } from "./ui/skeleton";
import styles from "./UserStartups.module.css";

const UserStartups = async ({ id }: { id: string }) => {
  const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id });
  return (
    <ul className={styles.listContainer}>
      {startups.length > 0 ? (
        startups.map((startup: StartupTypeCard) => (
          <li key={startup._id}>
            <StartupCard post={startup} />
          </li>
        ))
      ) : (
        <p className={styles.empty}>No Posts Yet.</p>
      )}
    </ul>
  );
};

export const StartupCardSkeleton = () => (
  <ul className={styles.listContainer}>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={index}>
        <Skeleton />
      </li>
    ))}
  </ul>
);

export default UserStartups;
