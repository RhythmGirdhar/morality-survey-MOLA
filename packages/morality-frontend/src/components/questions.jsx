import React, { useEffect, useState } from "react";
import { Button, Card, Form, Stack } from "react-bootstrap";
import { useStopwatch } from "react-timer-hook";
import { v4 as uuidv4 } from "uuid";

export const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [uuid, setUuid] = useState();
  useEffect(() => {
    const getQuestions = async () => {
      const url = "http://localhost:5002/api/getQuestions";
      const response = await fetch(url);
      const data = await response.json();
      setQuestions(data);
    };
    getQuestions();
  }, []);

  useEffect(() => {
    setUuid(uuidv4());
  }, []);

  const resetUuid = () => setUuid(uuidv4());

  const submitQuestion = async (submission) => {
    console.log(JSON.stringify(submission));
    const url = "http://localhost:5002/api/submit";
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(submission),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };

  const updateIndexHandler = (submission) => {
    setIndex((index) => index + 1);
    submitQuestion({ ...submission, uuid });
  };

  return questions.length ? (
    index === 10 ? (
      <ThankYouCard />
    ) : (
      <QuestionCard
        question={questions[index]}
        index={index}
        totalLength={questions.length}
        onClick={updateIndexHandler}
        resetUuid={resetUuid}
      />
    )
  ) : null;
};

const ThankYouCard = () => {
  return (
    <Card
      style={{
        width: "40rem",
        height: "20rem",
        boxShadow: `rgba(0, 0, 0, 0.24) 0px 3px 8px`,
      }}
    >
      <Card.Body>
        <Stack
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <h2>Thank you for taking this survey</h2>
        </Stack>
      </Card.Body>
    </Card>
  );
};

const QuestionCard = (props) => {
  const { question, onClick, index, totalLength, resetUuid } = props;
  const [selectedOption, setSelectedOption] = useState("");
  const { seconds, minutes, reset } = useStopwatch({ autoStart: true });

  const options = Object.keys(question)
    .filter((key) => String(key).startsWith("option"))
    .map((key) => question[key]);

  const zeroPad = (num, places) => String(num).padStart(places, "0");

  return (
    <Card
      style={{
        width: "40rem",
        boxShadow: `rgba(0, 0, 0, 0.24) 0px 3px 8px`,
      }}
    >
      <Card.Body>
        <Stack
          direction="horizontal"
          style={{ justifyContent: "space-between" }}
        >
          <h6>{`${zeroPad(minutes, 2)}: ${zeroPad(seconds, 2)}`}</h6>
          <h6>{`${index + 1} / ${totalLength}`}</h6>
        </Stack>
        <Card.Title>{question.questiontext}</Card.Title>
        <Card.Text style={{ paddingTop: "1rem" }}>
          <Form>
            {options.map((option) => (
              <Form.Check
                type="radio"
                label={option}
                value={option}
                checked={option === selectedOption}
                name={`${question.varname}`}
                id={`${question.varname}-option`}
                onChange={(event) => setSelectedOption(event.target.value)}
              />
            ))}
          </Form>
        </Card.Text>
        <Stack style={{ alignItems: "flex-end" }}>
          <Button
            onClick={() => {
              onClick({
                questionId: question.varname,
                answer: selectedOption,
                timeTaken: minutes * 60 + seconds,
              });
              setSelectedOption("");
              reset();
              if (index === 9) {
                resetUuid();
              }
            }}
            variant="primary"
          >
            {index === 9 ? "Submit" : "Next"}
          </Button>
        </Stack>
      </Card.Body>
    </Card>
  );
};
