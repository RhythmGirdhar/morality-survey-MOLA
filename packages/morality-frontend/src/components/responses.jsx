import { Card, Stack, Button } from "react-bootstrap";
export const Responses = () => {
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
          <h2>You can download the survey responses</h2>
          <Button
            onClick={() => window.open("http://localhost:5002/api/responses")}
          >
            Download
          </Button>
        </Stack>
      </Card.Body>
    </Card>
  );
};
