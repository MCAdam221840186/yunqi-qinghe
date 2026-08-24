"use client";

import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { useMemo, useState } from "react";
import {
  categoryLabels,
  gradeBandLabels,
  gradeBands,
  readingCategories,
  type ReadingBook,
  type ReadingCategory,
  type ReadingGradeBand,
} from "@/lib/reading-types";
import styles from "./ReadingCatalogExplorer.module.css";

type GradeFilter = "all" | ReadingGradeBand;
type CategoryFilter = "all" | ReadingCategory;

interface ReadingCatalogExplorerProps {
  readonly books: readonly ReadingBook[];
}

function normalizeSearch(value: string): string {
  return value
    .normalize("NFKC")
    .toLocaleLowerCase("zh-CN")
    .replace(/\s+/g, "");
}

export default function ReadingCatalogExplorer({
  books,
}: ReadingCatalogExplorerProps) {
  const [query, setQuery] = useState("");
  const [gradeFilter, setGradeFilter] = useState<GradeFilter>("all");
  const [categoryFilter, setCategoryFilter] =
    useState<CategoryFilter>("all");

  const normalizedQuery = normalizeSearch(query.trim());
  const filteredBooks = useMemo(
    () =>
      books.filter((book) => {
        const matchesGrade =
          gradeFilter === "all" || book.gradeBand === gradeFilter;
        const matchesCategory =
          categoryFilter === "all" || book.category === categoryFilter;
        const searchableText = normalizeSearch(
          `${book.title}${book.creditLine ?? ""}${book.note ?? ""}`,
        );
        const matchesQuery =
          normalizedQuery.length === 0 ||
          searchableText.includes(normalizedQuery);

        return matchesGrade && matchesCategory && matchesQuery;
      }),
    [books, categoryFilter, gradeFilter, normalizedQuery],
  );

  const hasFilters =
    query.length > 0 || gradeFilter !== "all" || categoryFilter !== "all";

  const clearFilters = () => {
    setQuery("");
    setGradeFilter("all");
    setCategoryFilter("all");
  };

  return (
    <section className={styles.explorer} aria-labelledby="catalog-title">
      <div className={styles.controls}>
        <div className={styles.searchField}>
          <label htmlFor="reading-book-search">搜索书名、作者或译者</label>
          <div className={styles.searchInputWrap}>
            <MagnifyingGlass size={20} weight="regular" aria-hidden="true" />
            <input
              id="reading-book-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="例如：夏洛、冰波、彝族"
              autoComplete="off"
            />
            {query && (
              <button
                type="button"
                className={styles.clearQuery}
                onClick={() => setQuery("")}
                aria-label="清空搜索词"
              >
                <X size={17} weight="bold" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        <fieldset className={styles.filterGroup}>
          <legend>年级段</legend>
          <div className={styles.filterButtons}>
            <button
              type="button"
              aria-pressed={gradeFilter === "all"}
              onClick={() => setGradeFilter("all")}
            >
              全部年级
            </button>
            {gradeBands.map((gradeBand) => (
              <button
                key={gradeBand}
                type="button"
                aria-pressed={gradeFilter === gradeBand}
                onClick={() => setGradeFilter(gradeBand)}
              >
                {gradeBandLabels[gradeBand]}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className={styles.filterGroup}>
          <legend>内容类别</legend>
          <div className={styles.filterButtons}>
            <button
              type="button"
              aria-pressed={categoryFilter === "all"}
              onClick={() => setCategoryFilter("all")}
            >
              全部类别
            </button>
            {readingCategories.map((category) => (
              <button
                key={category}
                type="button"
                aria-pressed={categoryFilter === category}
                onClick={() => setCategoryFilter(category)}
              >
                {categoryLabels[category]}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className={styles.resultBar}>
        <h2 id="catalog-title">完整书目</h2>
        <p aria-live="polite" aria-atomic="true">
          当前显示 <strong>{filteredBooks.length}</strong> 条，共 {books.length} 条
        </p>
        {hasFilters && filteredBooks.length > 0 && (
          <button type="button" onClick={clearFilters}>
            清除筛选
          </button>
        )}
      </div>

      {filteredBooks.length === 0 ? (
        <div className={styles.empty} role="status">
          <h3>没有找到相符书目</h3>
          <p>可以换一个关键词，或恢复全部年级与类别。</p>
          <button type="button" onClick={clearFilters}>
            清除筛选
          </button>
        </div>
      ) : (
        <div className={styles.catalog}>
          {gradeBands.map((gradeBand) => {
            const gradeBooks = filteredBooks.filter(
              (book) => book.gradeBand === gradeBand,
            );
            if (gradeBooks.length === 0) return null;

            return (
              <section
                key={gradeBand}
                className={styles.gradeSection}
                aria-labelledby={`${gradeBand}-title`}
              >
                <div className={styles.gradeHeading}>
                  <h3 id={`${gradeBand}-title`}>
                    {gradeBandLabels[gradeBand]}
                  </h3>
                  <p>{gradeBooks.length} 条</p>
                </div>

                <div className={styles.categoryGrid}>
                  {readingCategories.map((category) => {
                    const categoryBooks = gradeBooks.filter(
                      (book) => book.category === category,
                    );
                    if (categoryBooks.length === 0) return null;

                    return (
                      <section
                        key={category}
                        className={styles.categoryGroup}
                        aria-labelledby={`${gradeBand}-${category}-title`}
                      >
                        <div className={styles.categoryHeading}>
                          <h4 id={`${gradeBand}-${category}-title`}>
                            {categoryLabels[category]}
                          </h4>
                          <span>{categoryBooks.length}</span>
                        </div>
                        <ol className={styles.bookList}>
                          {categoryBooks.map((book) => (
                            <li key={book.id} value={book.order}>
                              <span className={styles.bookOrder} aria-hidden="true">
                                {book.order.toString().padStart(2, "0")}
                              </span>
                              <div className={styles.bookCopy}>
                                <p className={styles.bookTitle}>《{book.title}》</p>
                                {book.creditLine && (
                                  <p className={styles.creditLine}>
                                    {book.creditLine}
                                  </p>
                                )}
                                {book.note && (
                                  <p className={styles.bookNote}>{book.note}</p>
                                )}
                              </div>
                            </li>
                          ))}
                        </ol>
                      </section>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </section>
  );
}
