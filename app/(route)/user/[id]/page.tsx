import React, { Suspense } from "react";
import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import UserStartups, { StartupCardSkeleton } from "@/components/UserStartups";
import styles from "./UserProfile.module.css";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
  if (!user) return notFound();

  return (
    <section className={styles.profileSection}>
      <div className={styles.glow + " " + styles["glow-purple"]}></div>
      <div className={styles.glow + " " + styles["glow-blue"]}></div>
      <div className={styles.profileHeader}>
        <h3>{user.name}</h3>
        <Image
          src={user.image}
          alt={user.name}
          width={180}
          height={180}
          className={styles.profilePic}
        />
        <p>@{user.name}</p>
        <p>{user.bio}</p>
      </div>
      <div className={styles.startupsSection}>
        <p>{session?.id === id ? "Your" : "All"} Startups</p>
        <Suspense fallback={<StartupCardSkeleton />}>
          <UserStartups id={id} />
        </Suspense>
      </div>
    </section>
  );
};

export default page;
