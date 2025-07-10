import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import Image from "next/image";
import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/view";
import styles from "./StartupDetails.module.css";

const md = markdownit();

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });

  if (!post) return notFound();

  const parsedContent = md.render(post?.pitch || "");
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.date}>{formatDate(post?._createdAt)}</p>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.desc}>{post.description}</p>
      </div>
      <img src={post.image} alt="image from startup" className={styles.image} />
      <div className={styles.author}>
        <Link href={`/user/${post.author._id}`}> 
          <Image
            src={post.author.image}
            alt="Author image"
            width={48}
            height={48}
            className={styles.avatar}
          />
        </Link>
        <div className={styles.authorInfo}>
          <p>{post.author.name}</p>
          <p>@{post.author.username}</p>
        </div>
        <span className={styles.category}>{post.category}</span>
      </div>
      <h3 className={styles.detailsTitle}>Startup Details</h3>
      {parsedContent ? (
        <article
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: parsedContent }}
        />
      ) : (
        <p className={styles.content}>No details provided</p>
      )}
      <hr />
      <Suspense fallback={<Skeleton className="view-skeleton" />}>
        <View id={id} />
      </Suspense>
    </div>
  );
};

export default page;
