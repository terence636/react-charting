import React from "react";
import {AddToQueue, RemoveFromQueue} from "@material-ui/icons"

const AddToWatch = (props) => {

  return (

    <div className={`film-row-fave ${!props.isFave? "add_to_queue" : "remove_from_queue"}`} onClick={props.onAddWatchListToggle}>
      <p className="material-icons">
        {!props.isFave ? <AddToQueue /> : <RemoveFromQueue/>}
      </p>
    </div>
  );
};


export default AddToWatch;