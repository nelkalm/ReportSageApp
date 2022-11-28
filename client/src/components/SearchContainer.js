import React from "react";
import { FormRow, FormRowSelect } from ".";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/SearchContainer";

const SearchContainer = () => {
  const {
    isLoading,
    search,
    searchProgramSubType,
    programSubTypeOptions,
    sort,
    sortOptions,
    handleChange,
    clearFilters,
  } = useAppContext();

  const handleSearch = (e) => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearFilters();
  };

  return (
    <Wrapper>
      <form action="" className="form">
        <h4>Search report</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="search"
            value={search}
            labelText="Keyword"
            handleChange={handleSearch}
          />
          <FormRowSelect
            labelText="Program"
            name="searchProgramSubType"
            value={searchProgramSubType}
            handleChange={handleSearch}
            list={["All", ...programSubTypeOptions]}
          />
          <FormRowSelect
            labelText="Sort by"
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
