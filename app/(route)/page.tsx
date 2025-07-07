import Image from "next/image";
import SearchForm from "../components/SearchForm";
import styles from "./page.module.css";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {

  const query = (await searchParams).query;

  return (
    <div className={styles.pageContainer}>
      <section className={styles.heroSection}>
        <h1 className="text-4xl bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text font-bold text-center bg-white">
          Pitch Your Startup, <br /> Connect With Entrepreneurs
        </h1>
        <p className={styles.subtitle}>
          Submit Ideas, Vote on Pitches and Get Noticed
        </p>
        <div className={styles.formWrapper}>
          <SearchForm query ={query} />
        </div>
      </section>
    </div>
  );
}
