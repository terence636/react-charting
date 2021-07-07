import React from "react";
import { Modal, Button} from 'react-bootstrap';

const ModalVerticallyCentered = (props) => {

  return (
    <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
      <img src={props.data.image} />
      {props.data.companyName}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      
      <p><b>Market Cap:</b> {Format(props.data.mktCap)}</p>
      <p><b>Website:</b><a href={props.data.website}>{props.data.website}</a></p>
      <p><b>Description:</b></p>
      <p>{props.data.description}</p>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={props.onHide}>Close</Button>
    </Modal.Footer>
  </Modal>
  );
};


export default ModalVerticallyCentered;

const Format = (labelValue) =>  {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e+9

       ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
       // Six Zeroes for Millions 
       : Math.abs(Number(labelValue)) >= 1.0e+6

       ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
       // Three Zeroes for Thousands
       : Math.abs(Number(labelValue)) >= 1.0e+3

       ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"

       : Math.abs(Number(labelValue));

   }