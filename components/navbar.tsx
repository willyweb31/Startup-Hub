import React from "react";
import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";

async function navbar() {
  const session = await auth();

  return (
    <header className=" px-3 py-3  bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo"
            width={100}
            height={20}
            style={{ borderRadius: "50px", padding: "10px" }}
          />
        </Link>
        <div className="flex items-center gap-5 text-black ">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span>Create </span>
              </Link>
              <form
                action={async () => {
                  "use server";

                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">Log Out</button>
              </form>

              <Link href={`/user/${session?.id}`}>{session?.user?.name}</Link>
              <span></span>
            </>
          ) : (
            <form
              action={async () => {
                "use server";

                await signIn("github");
              }}
            >
              <button type="submit"> Log In</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
}

export default navbar;
