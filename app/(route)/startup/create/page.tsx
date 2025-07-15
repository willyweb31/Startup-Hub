import React from "react";
import StartupForm from "@/components/startupForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <>
      <section>
        <h1 className="text-2xl font-bold text-center text-primary my-10">
          Submit Your Start up
        </h1>
      </section>

      <StartupForm />
    </>
  );
};

export default page;
