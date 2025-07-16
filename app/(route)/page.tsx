import Image from "next/image";
import SearchForm from "../../components/SearchForm";
import styles from "./page.module.css";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const session = await auth();
  console.log(session?.id);

  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

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

      <section className="">
        <p className="text-30-semibold text-center  mb-10 mt-10 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>
        <div className={styles.posts_container}>
          <ul className={styles.posts_list}>
            {posts?.length > 0 ? (
              posts.map((post: StartupTypeCard, index: number) => (
                <li key={post?._id}>
                  <StartupCard post={post} />
                </li>
              ))
            ) : (
              <p className="no-results">No Startups Found</p>
            )}
          </ul>
        </div>
      </section>
      <SanityLive />
    </div>
  );
}
