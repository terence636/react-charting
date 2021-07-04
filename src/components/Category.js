import React from "react";

const Category = (props) => {
  const categoryList = ["ACTIVE", "TOP GAINERS", "TOP LOSERS", "INDEX", "WATCHLISTS"];

  const categoryButtons = categoryList.map((cat, index) => {
    return (
      <button
        className="categoryButtons"
        key={index}
        onClick={() => props.catSelection(cat)}
      >
        {cat}
      </button>
    );
  });

  return <div>{categoryButtons}</div>
};

export default Category;
