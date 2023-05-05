import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";

const TranscriptionForm = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please enter a file", toastOptions);
    } else {
      const formData = new FormData();
      formData.append("audio", file);

      try {
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        };
        setLoading(true);
        const response = await axios.post(
          "https://audio-accuracy.onrender.com/api/v1/transcribe",
          formData,
          config
        );
        setResult(response.data);
        // setFile(null);
        setLoading(false);

      } catch (error) {
        console.error("Error uploading file:", error.message);
        toast.error("Error uploading file", toastOptions);
      }
    }
  };

  return (
    <Container style={{ position: "relative", zIndex: "2 !important" }}>
      <h1 className="text-center my-4 text-white mt-5">
        Audio Transcription Accuracy
      </h1>
      <Form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Form.Group as={Row} controlId="audioFile">
          <Form.Label
            column
            sm={4}
            md={3}
            style={{ fontSize: 20 }}
            className="text-white"
          >
            Audio File
          </Form.Label>
          <Col sm={8} md={9}>
            <Form.Control
              type="file"
              accept=".wav,.mp3"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Col>
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          className="mt-5"
          style={{ width: "150px" }}
        >
          Submit
        </Button>
      </Form>
      {loading && !result ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          {result && (
            <div
              className="result mt-5"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <div
                className="result mt-5"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                }}
              >
                <h3>
                  <strong style={{ color: "#c17676" }}>Transcription:</strong>{" "}
                  <span className="text-white">{result.transcription}</span>
                </h3>
                <h3>
                  <strong style={{ color: "#c17676" }}>Accuracy:</strong>{" "}
                  <span className="text-white"> {result.accuracy}%</span>
                </h3>
              </div>
            </div>
          )}
        </>
      )}

      <ToastContainer style={{ zIndex: "2 !important" }} />
    </Container>
  );
};

export default TranscriptionForm;
