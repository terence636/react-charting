import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const Category = (props) => {
  const categoryList = ["MOST ACTIVES", "TOP GAINERS", "TOP LOSERS", "WATCHLISTS"];
  
  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));
  const classes = useStyles();

  // <div className={`film-row-fave ${!props.isAdded? "add_to_queue" : "remove_from_queue"}`}
  const categoryButtons = categoryList.map((cat, index) => {
    return (
      // <Button className={classes.button} variant="contained" color="primary" mt={10}
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
