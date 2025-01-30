import React from "react";

interface FilterProps {
  filterName: string;
  handleFilterName: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Filter: React.FC<FilterProps> = ({ filterName, handleFilterName }) => {
  return (
    <div>
      filter shown with:{" "}
      <input value={filterName} onChange={handleFilterName} />
    </div>
  );
};

export default Filter;
