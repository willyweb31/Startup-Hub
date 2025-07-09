import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import styles from "./StartupCard.module.css";
import { Author, Startup } from "@/sanity/types";

export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  const {
    _createdAt,
    views,
    title,
    author,
    description,
    category,
    _id,
    image,
  } = post;

  return (
    <li className={styles.card}>
      <div className={styles.header}></div>
      <p className={styles.date}>{formatDate(_createdAt)}</p>
      <div className={styles.views}>
        <EyeIcon className="size-6 text-primary" />
        <span className="tex-16-medium">{views}</span>
      </div>

      <div className={styles.main + " mt-5 gap-5"}>
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="text-16-medium line-clamp-1">{author?.name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className={styles.title + " line-clamp-1"}>{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${author?._id}`}>
          <Image
            src="https://placehold.co/600x400"
            alt="placeholder"
            width={100}
            height={100}
            className={styles.avatar}
          />
        </Link>
      </div>
      <Link href={`/startup/${_id}`}>
        <p className={styles.desc}>{description}</p>
        <img src={image} alt="placeholder" className={styles.img} />
      </Link>
      <div className={styles.footer + " gap-3 mt-5"}>
        <Link href={`?query=${category?.toLowerCase()}`}>
          <p className={styles.category}>{category}</p>
        </Link>
        <Button className="startup-card_btn " asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export default StartupCard;
