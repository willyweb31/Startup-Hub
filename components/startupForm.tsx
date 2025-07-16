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
import { useRouter } from "next/navigation";
import styles from "./StartupForm.module.css";
import { createPitch } from "@/lib/actions";

const startupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const router = useRouter();
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

      const result = await createPitch(prevState, formData, pitch);

      if (result.status === "SUCCESS") {
        toast("Your pitch was submitted successfully!");
      }

      router.push(`'startup/${result._id}`);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);

        toast("There was an error with your inputs try again");
        return { ...prevState, error: "validation failed", status: "ERROR" };
      }

      toast("There was an error with your inputs try again");
      return {
        ...prevState,
        error: "An unexpected error has occured",
        status: "ERROR",
      };
    }
  };
  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className={styles.formContainer}>
      <div className={styles.field}>
        <label htmlFor="title" className={styles.label}>
          Title
        </label>
        <Input id="title" name="title" required placeholder="Startup Title" />

        {errors.title && <p className={styles.error}>{errors.title}</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor="description" className={styles.label}>
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          required
          placeholder="Startup Description"
        />

        {errors.description && (
          <p className={styles.error}>{errors.description}</p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="category" className={styles.label}>
          Category
        </label>
        <Input
          id="category"
          name="category"
          required
          placeholder="Startup Category (Tech, Health, Education)"
        />

        {errors.category && <p className={styles.error}>{errors.category}</p>}
      </div>
      <div className={styles.field}>
        <label htmlFor="link" className={styles.label}>
          Image URL
        </label>
        <Input id="link" name="link" required placeholder="Startup Link" />

        {errors.link && <p className={styles.error}>{errors.link}</p>}
      </div>

      <div className={styles.field} data-color-mode="light">
        <label htmlFor="pitch" className={styles.label}>
          {" "}
          Pitch
        </label>
        <div className={styles.mdEditor}>
          <MDEditor
            value={pitch}
            onChange={(value) => setPitch(value as string)}
            id="pitch"
            preview="edit"
            height={300}
            style={{ borderRadius: 20, overflow: "hidden" }}
            textareaProps={{
              placeholder:
                "Briefly describe your idea and the problem it solves",
            }}
          />
        </div>
        {errors.pitch && <p className={styles.error}>{errors.pitch}</p>}
      </div>

      <div className={styles.buttonArea}>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Submitting..." : "Submit Your Pitch"}
          <Send></Send>
        </Button>
      </div>
    </form>
  );
};

export default startupForm;
