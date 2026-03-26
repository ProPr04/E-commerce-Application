import React, { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("");

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory,sortOption, setSortOption }}>
      {children}
    </SearchContext.Provider>
  );
};