import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col, Button, Carousel } from "react-bootstrap";
import "./App.css";

const App = () => {
  const [carouselImages, setCarouselImages] = useState([]);
  const [interval, setInterval] = useState(2000);
  const [intervalSec, setIntervalSec] = useState(0);
  const [direction, setDirection] = useState("forward");
  let [index, setIndex] = useState(0);

  useEffect(() => {
    fetch(`https://picsum.photos/v2/list?limit=6`)
      .then((response) => response.json())
      .then((data) => setCarouselImages(data));
  }, []);

  const handleIntervalText = (e) => {
    const searchStr = e.target.value * 1000;
    setIntervalSec(searchStr);
  };

  const handleInterval = (selectedIndex) => {
    if (intervalSec !== 0) {
      setInterval(intervalSec);
    }
    if (direction === "reverse") {
      setIndex(index++);
    } else {
      setIndex(index);
    }
  };

  const getDirection = (e) => {
    const selectedDirection = e.target.name;
    setDirection(selectedDirection);
  };

  const handleSelect = (selectedIndex, e) => {
    if (direction === "forward") {
      setIndex(selectedIndex);
    }
    if (direction === "reverse") {
      setIndex(selectedIndex--);
    }
  };

  return (
    <Container>
    <Row>
      <Col md={{ span: 6, offset: 4 }}>
        <h1>Image Carousel</h1>
      </Col>
    </Row>
      <Form>
        <Form.Group
          as={Row}
          className="mb-3 mt-3"
          controlId="formPlaintextDuration"
        >
          <Form.Label column sm="2">
            Duration:
          </Form.Label>
          <Col sm="2">
            <Form.Control onChange={handleIntervalText} type="text" />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formPlaintextDirection"
        >
          <Form.Label column sm="2">
            Direction:
          </Form.Label>
          <Col sm="2">
            <Form.Check
              inline
              label="Forward"
              name="forward"
              type="radio"
              onChange={getDirection}
              checked={direction === "forward"}
            />
            <Form.Check
              inline
              label="Reverse"
              name="reverse"
              type="radio"
              onChange={getDirection}
              checked={direction === "reverse"}
            />
          </Col>
        </Form.Group>
        <Button variant="secondary" onClick={handleInterval}>
          Submit
        </Button>
      </Form>
      <Carousel className="mt-3" onSelect={handleSelect} activeIndex={index}>
        {carouselImages?.map((item) => (
          <Carousel.Item interval={interval}>
            <img
              className="d-block w-100"
              src={item.download_url}
              alt="Not found"
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default App;
