import React from "react";
// import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';


const Category = (props) => {
  const categoryList = ["30 MOST ACTIVES", "30 TOP GAINERS", "30 TOP LOSERS", "WATCHLISTS"];

  // <div className={`film-row-fave ${!props.isAdded? "add_to_queue" : "remove_from_queue"}`}
  const categoryButtons = categoryList.map((cat, index) => {
    return (
      <button
        className={`categoryButtons ${cat.includes(props.category.toUpperCase())? "selected":""}`}
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
