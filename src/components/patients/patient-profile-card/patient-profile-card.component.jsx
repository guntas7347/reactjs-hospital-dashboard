import { Card, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { calculateAge } from "../../../utils/functions";

const PatientProfileCard = ({ patientData }) => {
  const { name, imgUrl, patientType, doctor, gender, dob } = patientData;
  return (
    <Card as={Col} className="mx-1 my-1">
      <Card.Img
        className="mx-auto my-4 rounded-circle"
        style={{ width: "8rem" }}
        src={imgUrl}
        alt={"Missing Image"}
      />
      <Card.Body>
        <Card.Title className="text-center">{name}</Card.Title>
        <Card.Text className="text-center">
          {patientType} <br />
          <div>{doctor}</div>
        </Card.Text>

        <div className="d-flex justify-content-center">
          <ListGroup horizontal>
            <ListGroupItem>{gender}</ListGroupItem>
            <ListGroupItem>{calculateAge(dob)} Years</ListGroupItem>
          </ListGroup>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PatientProfileCard;
