import { Spinner } from "react-bootstrap";

const Loading = ({ fullscreen = true }) => {
  if (!fullscreen) {
    return <Spinner animation="border" />;
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center">
      <Spinner animation="border" />
    </div>
  );
};

export default Loading;
