import update from "immutability-helper";
import { memo, useCallback, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import axios from "axios";
import { Card } from "./Card";
import { ItemTypes } from "./ItemTypes";
import {
  Button,
  Row,
  Card as Cardi,
  Col,
  ListGroup,
  Badge,
  Tab,
} from "react-bootstrap";
import UiModal from "../../components/model/model";

export const Container = memo(function Container(user) {
  const [cards, setCards] = useState([]);
  const [ifCardsChange, setIfCardsChange] = useState(true);
  const [dataChange, setDataChange] = useState(false);
  const [texti, setTexti] = useState("");

  const findCard = useCallback(
    (id) => {
      const card = cards.filter((c) => `${c.id}` === id)[0];
      return {
        card,
        index: cards.indexOf(card),
      };
    },
    [cards]
  );

  const save = async (product) => {
    setIfCardsChange(!ifCardsChange);
    postLists();
  };

  const fetchLists = async () => {
    const formData = {
      email: user.user,
    };
    console.log("user", formData);
    if (user.user) {
      try {
        const response = await axios.post(
          `https://kiglerserver.com/api/v1/todoRouter/byEmail`,
          formData
        );

        console.log("response", response.data[0].list);
        setCards(response.data[0].list);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }
  };

  const postLists = async () => {
    const updatedItems = cards.map((item, index) => ({
      ...item,
      id: index + 1,
    }));

    const formData = {
      email: user.user,
      list: updatedItems,
    };

    if (user.user) {
      try {
        const response = await axios.post(
          `https://kiglerserver.com/api/v1/todoRouter`,
          formData
        );

        console.log("response", response.data.list);
        setCards(response.data.list);
        setDataChange(true);
        setIfCardsChange(!ifCardsChange);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }
  };

  useEffect(() => {
    fetchLists();
  }, [user]);

  const moveCard = useCallback(
    (id, atIndex) => {
      const { card, index } = findCard(id);
      setCards(
        update(cards, {
          $splice: [
            [index, 1],
            [atIndex, 0, card],
          ],
        })
      );
    },
    [findCard, cards, setCards]
  );

  useEffect(() => {
    // Generate a new array with updated IDs
    const updatedItems = cards.map((item, index) => ({
      ...item,
      id: index + 1,
    }));

    setCards(updatedItems);
  }, [ifCardsChange]);

  const todo = () => {
    const id3 = parseInt(cards.length + 1);
    setCards([...cards, { id: id3, text: texti }]);
    setIfCardsChange(!ifCardsChange);
  };

  const console2 = () => {
    setIfCardsChange(!ifCardsChange);
    console.log("updatedItems2", cards);
    console.log("updatedItems2", texti);
  };

  const updateCardText = (id, newText) => {
    id = parseInt(id);
    const cardIndex = cards.findIndex((card) => card.id === id);

    if (cardIndex !== -1) {
      setCards(
        update(cards, {
          [cardIndex]: {
            text: { $set: newText },
          },
        })
      );
    } else {
      console.error(`Card with id ${id} not found.`);
    }
    setIfCardsChange(!ifCardsChange);
  };

  const deleteCard = (id) => {
    const { index } = findCard(id);
    setCards(update(cards, { $splice: [[index, 1]] }));
    setIfCardsChange(!ifCardsChange);
  };

  const [, drop] = useDrop(() => ({ accept: ItemTypes.CARD }));
  return (
    <div ref={drop}>
      <Cardi>
        <div className="card-body">
          <div className="d-flex align-items-end pb-4 justify-content-between">
            <div className="col-xl-2 col-xxl-3 col-lg-6 col-sm-6">
              <div className="widget-stat card bg-danger">
                <div className="card-body  p-4">
                  <div className="media">
                    <span className="me-3">
                      <i className="flaticon-381-calendar-1"></i>
                    </span>
                    <div className="media-body text-white text-end">
                      <p className="mb-1">רשומות</p>
                      <h3 className="text-white">{cards.length}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-end pb-4 justify-content-end">
              <UiModal
                todo={todo}
                text={texti}
                setText={setTexti}
                heder="הוסף רשימה"
              />
              <Button className="m-2" onClick={save} variant="success">
                שמור שינוים{" "}
                <span className="btn-icon-end">
                  <i className="fa fa-check" />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </Cardi>

      <Row>
        <Col>
          {cards && cards.length > 0
            ? cards.map((card) => (
                <Card
                  key={card.id}
                  id={`${card.id}`}
                  text={card.text}
                  moveCard={moveCard}
                  findCard={findCard}
                  updateCardText={updateCardText}
                  deleteCard={deleteCard}
                />
              ))
            : null}
        </Col>
      </Row>

      <Button onClick={console2} variant="success">
        שמור שינוים{" "}
        <span className="btn-icon-end">
          <i className="fa fa-check" />
        </span>
      </Button>

      {dataChange ? <div>המידע נשלח לשרת ונשמר</div> : null}
    </div>
  );
});
