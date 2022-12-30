import { Navigate } from "react-router-dom";

const Protected = ({ Cal_Data, children }) => {
      /* ------------------------------IF NO DATA IS pRASENT IN CALENDER DEFAULT OpTIONS THEN NAVIGATE TO FORM------------------------------------- */ 
  if (Cal_Data.length === 0) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default Protected;
