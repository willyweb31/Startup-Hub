import React from "react";
import { STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { Skeleton } from "./ui/skeleton";

const UserStartups = async ({ id }: { id: string }) => {
  const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id });
  return (
    <>
      {startups.length > 0 ? (
        startups.map((startup: StartupTypeCard) => (
          <StartupCard key={startup._id} post={startup} />
        ))
      ) : (
        <p>No Posts Yet.</p>
      )}
    </>
  );
};

export const StartupCardSkeletong = () =>(
    <>
    {[0,1,2,3,4].map((index:number ) =>(
        <li key ={(index)}>
            <Skeleton />
        </li>
    ))}
    </>
)


export default UserStartups;
