import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  // const [number, setNumber] = useState({
  //   dialCode: "",
  //   flag: "",
  //   isoCode: "",
  //   name: "",
  // });
  const [number, setNumber] = useState({
    dialCode: "+91",
    flag: "https://cdn.kcak11.com/CountryFlags/countries/in.svg",
    isoCode: "IN",
    name: "India",
  });
  const [mobile, setmobile] = useState("");
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    companyUrl: "",
    companyName: "",
  });
  const [initialCountryFlag, setInitialCountryFlag] = useState("in");
  const [Cal_Data, setCal_Data] = useState([]);
  const [dropDownSelect, setDropDownSelect] = useState(false);
  // const [Cal_Data, setCal_Data] = useState(
  //   localStorage.getItem("CalData")
  //     ? JSON.parse(localStorage.getItem("CalData"))
  //     : {}
  // );
  const [countries, setcountries] = useState([]);
  const [cb_section, setCb_section] = useState([]);
  const [next_ques, setnext_ques] = useState([]);
  const [Time_slots, setTime_slots] = useState([]);
  const [value, onChange] = useState(new Date());
  const [standardTimeing, setStandardTimeing] = useState(
    `(GMT+05:30) IST, New Delhi `
  );
  const [boooked_date, setBooked_date] = useState("");
  const [flagsearchValue, setFlagSearchValue] = useState("");
  const fetchCountries = async () => {
    try {
      const data = await axios.get(
        "https://gist.githubusercontent.com/kcak11/4a2f22fb8422342b3b3daa7a1965f4e4/raw/2cc0fcb49258c667f1bc387cfebdfd3a00c4a3d5/countries.json"
      );
      setcountries(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetch_country_init = () => {
    let indiaCountry = {};
    let unitedCountry = {};
    let americaCountry = {};
    let filterIndia = countries.filter((res) => res.name === "India");
    filterIndia.map((data) => {
      indiaCountry.name = data.name;
      indiaCountry.dialCode = data.dialCode;
      indiaCountry.flag = data.flag;
      indiaCountry.isoCode = data.isoCode;
    });
    let filterunitedKingdom = countries.filter(
      (res) => res.name === "United Kingdom"
    );
    filterunitedKingdom.map((data) => {
      unitedCountry.name = data.name;
      unitedCountry.dialCode = data.dialCode;
      unitedCountry.flag = data.flag;
      unitedCountry.isoCode = data.isoCode;
    });
    let filteramerica = countries.filter((res) => res.name === "United States");
    filteramerica.map((data) => {
      americaCountry.name = data.name;
      americaCountry.dialCode = data.dialCode;
      americaCountry.flag = data.flag;
      americaCountry.isoCode = data.isoCode;
    });
    countries.unshift(unitedCountry);
    countries.unshift(americaCountry);
    countries.unshift(indiaCountry);
  };

  // useEffect(() => {
  //   fetch_country_init();
  // }, [countries]);

  console.log(countries);
  // useEffect(() => {
  //   if (flagsearchValue) {
  //     const filteredData = countries.filter((value) =>
  //       value.name
  //         .toLowerCase()
  //         .trim()
  //         .includes(flagsearchValue.toLowerCase().trim())
  //     );
  //     setcountries(filteredData);
  //   } else {
  //     fetchCountries();
  //   }
  // }, [flagsearchValue]);
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
