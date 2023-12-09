import { memo, useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import {
  Row,
  Card as Cardi,
  Col,
  ListGroup,
  Badge,
  Tab,
  Button,
} from "react-bootstrap";
const style = {
  border: "1px dashed gray",
  padding: "5rem 5rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "move",
};

import UiModal from "../../components/model/model";

export const Card = memo(function Card({
  id,
  text,
  moveCard,
  findCard,
  updateCardText,
  deleteCard,
}) {
  const [texti, setTexti] = useState(text);

  const originalIndex = findCard(id).index;
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveCard(droppedId, originalIndex);
        }
      },
    }),
    [id, originalIndex, moveCard]
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      hover({ id: draggedId }) {
        if (draggedId !== id) {
          const { index: overIndex } = findCard(id);
          moveCard(draggedId, overIndex);
        }
      },
    }),
    [findCard, moveCard]
  );

  const changeText = () => {
    updateCardText(id, texti);
  };

  const opacity = isDragging ? 0 : 1;
  if (id) {
    return (
      <Col
        action
        className="flex-column"
        ref={(node) => drag(drop(node))}
        style={{ opacity }}
      >
        <Cardi>
          <Cardi.Header>
            <Cardi.Title>{id} מיקום רשימה</Cardi.Title>
          </Cardi.Header>
          <Cardi.Body>
            <Cardi.Text>
              {text}
              <br />
            </Cardi.Text>
          </Cardi.Body>
          <Cardi.Footer className=" d-sm-flex justify-content-center align-items-center">
            {/* onClick={() => updateCardText(id, "New Text")} */}
            <UiModal
              className="btn btn-primary m-4"
              todo={changeText}
              text={texti}
              setText={setTexti}
              heder="ערוך רשימה"
            />
            <Button
              className="mb-2"
              variant="danger"
              onClick={() => deleteCard(id)}
            >
              מחק רשימה{" "}
              <span className="btn-icon-end">
                <i className="far fa-window-close" />
              </span>
            </Button>
          </Cardi.Footer>
        </Cardi>
      </Col>
    );
  }
});
