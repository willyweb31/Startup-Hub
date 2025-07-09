import Image from "next/image";
import SearchForm from "../../components/SearchForm";
import styles from "./page.module.css";
import StartupCard, {StartupTypeCard} from "@/components/StartupCard";
import {client} from "@/sanity/lib/client"
import { STARTUPS_QUERY } from "@/sanity/lib/queries";


export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {

  const query = (await searchParams).query;

  const posts = await client.fetch(STARTUPS_QUERY);
  


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
          <SearchForm query={query} />
        </div>
      </section>

      <section className="section_container">
        <p className="text-30-semibold ">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard, index: number) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No Startups Found</p>
          )}
        </ul>
      </section>
    </div>
  );
}
