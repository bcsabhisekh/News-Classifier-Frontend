import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("No Results");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text) {
      const customConfig = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const usersText = { 'text': text };
      const result = await axios.post('http://127.0.0.1:5000/predict', usersText, customConfig);
      setResult(result.data);
    }
    else {
      alert("Please provide the input first");
    }
  }

  return (
    <div className="App">
      <div className="Container">
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#home">News-Classifier</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      <div className="container mt-5 mb-5">

        <Form onSubmit={handleSubmit}>

          <Form.Group className="mb-3" controlId="ControlTextarea">
            <Form.Label><b>News Headline</b></Form.Label>
            <Form.Control onChange={(e) => setText(e.target.value)} value={text} type="text" placeholder="Enter News Headline" as="textarea" rows={9} max-rows="9" />
            <Form.Text className="text-muted">
              Five categories : Tech, Sports, Bussiness, Entertainment, Politics
            </Form.Text>
          </Form.Group>

          <div>
            <Button variant="primary" type="submit">
              Enter
            </Button>
            <Button type="button" onClick={(e) => { setText(""); setResult("No Results"); }} className="btn btn-success ms-3">
              Clear
            </Button>
          </div>

        </Form>
      </div>

      <div className="container">
        <p>News Category :  {result}</p>
      </div>

    </div>
  );
}

export default App;
