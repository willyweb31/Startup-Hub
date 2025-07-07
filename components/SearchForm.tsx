import React from "react";
import Form from "next/form";
import SearchFormReset from "./SearchFormReset";
import styles from "./SearchForm.module.css";

const SearchForm = ({ query }: { query?: string }) => {
  return (
    <form action="/" className={styles.searchForm}>
      <input
        name="query"
        defaultValue={query}
        className={styles.searchInput}
        placeholder="Search Startups"
      />
      <div className={styles.actions}>
        {query && <SearchFormReset />}
        <button type="submit" className={styles.searchBtn}>
          S
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
