import { Navigate } from "react-router-dom";

const Protected = ({ Cal_Data, children }) => {
  if (Cal_Data.length === 0) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default Protected;
