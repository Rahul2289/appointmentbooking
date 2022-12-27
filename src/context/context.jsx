import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [disable, setdisable] = useState(true);
  const [number, setNumber] = useState({
    dialCode: '+91',
    flag: 'https://cdn.kcak11.com/CountryFlags/countries/in.svg',
    isoCode: 'IN',
    name: 'India',
  });
  const [mobile, setmobile] = useState('');
  const [error, setError] = useState('');
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    companyUrl: '',
    companyName: '',
  });
  const [initialCountryFlag, setInitialCountryFlag] = useState('in');
  const [Cal_Data, setCal_Data] = useState([]);
  const [dropDownSelect, setDropDownSelect] = useState(false);
  const [countries, setcountries] = useState([]);
  const [cb_section, setCb_section] = useState([]);
  const [next_ques, setnext_ques] = useState([]);
  const [Time_slots, setTime_slots] = useState([]);
  const [value, onChange] = useState(new Date());
  const [sectionID, setSectionID] = useState('');
  const [standardTimeing, setStandardTimeing] = useState(
    `(GMT+05:30) IST, New Delhi `
  );
  const [boooked_date, setBooked_date] = useState('');
  const [flagsearchValue, setFlagSearchValue] = useState('');
  const fetchCountries = async () => {
    try {
      const data = await axios.get(
        'https://gist.githubusercontent.com/kcak11/4a2f22fb8422342b3b3daa7a1965f4e4/raw/2cc0fcb49258c667f1bc387cfebdfd3a00c4a3d5/countries.json'
      );
      setcountries(data.data);
    } catch (error) {
      console.log(error);
    }
  };
 

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
        countries,
        setcountries,
        initialCountryFlag,
        setInitialCountryFlag,
        mobile,
        setmobile,
        flagsearchValue,
        setFlagSearchValue,
        fetchCountries,
        dropDownSelect,
        setDropDownSelect,
        standardTimeing,
        setStandardTimeing,
        disable,
        setdisable,
        sectionID,
         setSectionID
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
