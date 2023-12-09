import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Card, Col, Button, Modal, Container } from "react-bootstrap";

const UiModal = ({ todo, text, setText, heder }) => {
  const [basicModal, setBasicModal] = useState(false);

  const todo1 = () => {
    todo();
    setBasicModal(false);
    if (heder === "הוסף רשימה") {
      setText("");
    }
  };

  return (
    <div className="h-80">
      <Row>
        <Col>
          <div className="bootstrap-modal">
            <Button
              variant="primary"
              className="mb-2 me-2"
              onClick={() => setBasicModal(true)}
            >
              {heder}
              <span className="btn-icon-end">
                <i className="fa fa-plus color-info" />
              </span>
            </Button>
            <Modal className="fade" show={basicModal}>
              <Modal.Header>
                <Modal.Title>Modal title</Modal.Title>
                <Button
                  variant=""
                  className="btn-close"
                  onClick={() => setBasicModal(false)}
                ></Button>
              </Modal.Header>
              <Modal.Body>
                <div
                  className="form-floating mb-3"
                  style={{ textAlign: "right", margin: "auto" }}
                >
                  <input
                    style={{ textAlign: "right", margin: "auto" }}
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  ></input>
                  {/* <label htmlFor="exampleInputEmail1" className="form-label">
                    {text}
                  </label> */}
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={todo1} variant="primary">
                  שמור רשימה{" "}
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default UiModal;
