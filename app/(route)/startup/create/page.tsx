import React from 'react'
import StartupForm from "@/components/startupForm";
import {auth} from "@/auth"
import {redirect} from "next/navigation";

const page = async () => {
    const session = await auth();

    if (!session) redirect('/');

  return (
    <>
    <section>
        <h1 className='heading'>Submit Your Start up</h1>
    </section>

     <StartupForm />
    
    </>
  )
}

export default page