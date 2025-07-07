"use client";

import Link from "next/link";

const reset = () => {
  const form = document.querySelector(".search-from") as HTMLFormElement;

  if (form) form.reset();
};
const SearchFormReset = () => {
  return (
    <button type="reset" className="search-reset-btn" aria-label="Reset search">
      <Link href="/">X</Link>
    </button>
  );
};

export default SearchFormReset;
