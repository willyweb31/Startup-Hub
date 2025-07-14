"use client";
import React, { useState } from "react";
import { z } from "zod";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { useActionState } from "react";
import { formSchema } from "../lib/validation";
import { toast } from "sonner";
import { useRouter } from "next/router";

const startupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const router = useRouter
  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };

      await formSchema.parseAsync(formValues);
      console.log(formValues);

      

    //   const result = await createIdea(prevState,formData, pitch)

      // cosole.log(result)
    //   if(result.status === "SUCCESS"){
    //     toast("Your pitch was submitted successfully!");
    //   }

    //   router.push(`'startup/${result.id}`)
    
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);

        return { ...prevState, error: "validation failed", status: "ERROR" };
        
      }

      toast("There was an error with your inputs try again");

      return {
        ...prevState,
        error: "An unexpected error has occured",
        status: "ERROR",
      };
      
    }
    toast("There was an error with your inputs try again");
  };
  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="startup-form">
      <div>
        <label htmlFor="title">Title</label>
        <Input id="title" name="title" required placeholder="Startup Title" />

        {errors.title && <p>{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <Textarea
          id="description"
          name="description"
          required
          placeholder="Startup Description"
        />

        {errors.description && <p>{errors.description}</p>}
      </div>

      <div>
        <label htmlFor="category">Category</label>
        <Input
          id="category"
          name="category"
          required
          placeholder="Startup Category (Tech, Health, Education)"
        />

        {errors.category && <p>{errors.category}</p>}
      </div>
      <div>
        <label htmlFor="link">Image URL</label>
        <Input id="link" name="link" required placeholder="Startup Link" />

        {errors.link && <p>{errors.link}</p>}
      </div>

      <div data-color-mode="light">
        <label htmlFor="pitch"> Pitch</label>
        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder: "Briefly describe your idea and the problem it solves",
          }}
        />

        {errors.pitch && <p>{errors.pitch}</p>}
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Submitting..." : "Submit Your Pitch"}
        <Send></Send>
      </Button>
    </form>
  );
};

export default startupForm;
