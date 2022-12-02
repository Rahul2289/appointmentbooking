import React, { useContext, useState } from "react";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState();
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    companyUrl: "",
    companyName: "",
  });
  const [Cal_Data, setCal_Data] = useState([]);

  // const [Cal_Data, setCal_Data] = useState(
  //   localStorage.getItem("CalData")
  //     ? JSON.parse(localStorage.getItem("CalData"))
  //     : {}
  // );
  const [cb_section, setCb_section] = useState([]);
  const [next_ques, setnext_ques] = useState([]);
  const [Time_slots, setTime_slots] = useState([]);
  const [value, onChange] = useState(new Date());
  const [boooked_date, setBooked_date] = useState("");
  return (
    <AppContext.Provider
      value={{
        boooked_date,
        value,
        setBooked_date,
        onChange,
        loading,
        setLoading,
        number,
        setNumber,
        error,
        setError,
        userData,
        setUserData,
        setCal_Data,
        Cal_Data,
        setCb_section,
        cb_section,
        next_ques,
        setnext_ques,
        Time_slots,
        setTime_slots,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
