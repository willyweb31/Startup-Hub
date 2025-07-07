import Image from "next/image";
import SearchForm from "../../components/SearchForm";
import styles from "./page.module.css";
import StartupCard from "@/components/StartupCard";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

  const posts = [
    {
      _createdAt: new Date(),
      views: 55,
      author: { _id: 1, name:'Will', },
      _id: 1,
      description: "this is a description",
      image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwallpapers.com%2Flive&psig=AOvVaw20JPRWix6cQdVaH6oQaYcm&ust=1751989229372000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIir6s-Kq44DFQAAAAAdAAAAABAE",
      category: "Robots",
      title: "We Robots",
    },
  ];

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
            posts.map((post:StartupCardType, index: number) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className='no-results'>No Startups Found</p>
          )
            
          
        }
        </ul>
      </section>
    </div>
  );
}
