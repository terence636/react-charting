import React from "react";

const Card = (props) => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        src={props.img}
        className="card-img-top"
        alt={`${props.symbol} NEWS`} //"APPLE NEWS"
      />
      <div className="card-body">
        <h5 className="card-title">
          {props.title}
        </h5>
        <p className="card-text">
          {props.summary}
        </p>
        <a
          href={props.url}
          className="btn btn-primary"
        >
          Details...({props.site})
        </a>
      </div>
    </div>
  );
};

export default Card;
