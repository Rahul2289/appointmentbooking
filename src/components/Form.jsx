import React, { useState, useEffect } from "react";
import { isValidPhoneNumber } from "react-phone-number-input";
import { MdOutlineArrowDropDown } from "react-icons/md";

import { ColorRing } from "react-loader-spinner";
import checkedIcon from "../assets/check-rounded.svg";

import { useAppContext } from "../context/context";
import { useOutsideClick } from "./WIthClickOutSIde";

const Form = (props) => {
  const {
    countries,
    setcountries,
    initialCountryFlag,
    setInitialCountryFlag,
    mobile,
    setmobile,
    setNumber,
    flagsearchValue,
    setFlagSearchValue,
    dropDownSelect,
    setDropDownSelect,
    fetchCountries,
  } = useAppContext();

  const {
    geopl,
    handleSubmit,
    handleChange,
    userData,
    error,
    nameRegex,
    emailRegex,
    number,
    urlRegEx,
    loading,
  } = props;

  useEffect(() => {
    countries.filter((data) => {
      if (data.isoCode === geopl.country_code) {
        setInitialCountryFlag(data.isoCode.toLowerCase());
        setNumber({
          dialCode: data.dialCode,
          flag: data.flag,
          isoCode: data.isoCode,
          name: data.name,
        });
      }
    });
  }, [geopl]);

  const handlecountrydata = (data) => {
    setNumber({
      dialCode: data.dialCode,
      flag: data.flag,
      isoCode: data.isoCode,
      name: data.name,
    });
    setInitialCountryFlag(data.isoCode.toLowerCase());
    setDropDownSelect(false);
    setFlagSearchValue("");
  };
  const handleDropDown = () => {
    setDropDownSelect(false);
  };

  const ref = useOutsideClick(handleDropDown);

  const [filteredResults, setFilteredResults] = useState([]);

  const searchItems = (searchValue) => {
    setFlagSearchValue(searchValue.trim());
    if (flagsearchValue !== "") {
      const filteredData = countries.filter((item) => {
        return Object.values(item.name)
          .join("")
          .toLowerCase()
          .includes(flagsearchValue.toLowerCase())
          ? Object.values(item.name)
              .join("")
              .toLowerCase()
              .includes(flagsearchValue.toLowerCase())
          : Object.values(item.dialCode).join("").includes(flagsearchValue);
      });

      setFilteredResults(filteredData);
    } else {
      setFilteredResults(countries);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={`form-section ${
          userData.name.length >= 3 &&
          nameRegex.test(userData.name.toLowerCase())
            ? "green-border"
            : "normal-border"
        } ${error === "nameErr" ? "red-border" : "normal-border"} `}
      >
        <div className="input-form">Name</div>
        <input
          type="text"
          placeholder={`${
            error === "nameErr" ? "Enter valid name" : "Enter your Name"
          }`}
          name="name"
          onChange={handleChange}
          value={userData.name}
          required
        />
        {userData.name.length >= 3 &&
          nameRegex.test(userData.name.toLowerCase()) && (
            <img
              src={checkedIcon}
              alt=""
              width="18px"
              height="18px"
              className="m-l-auto m-r-5"
            />
          )}
      </div>
      <div
        className={`form-section ${
          emailRegex.test(userData.email.toLowerCase())
            ? "green-border"
            : "normal-border"
        } ${error === "emailErr" ? "red-border" : "normal-border"}`}
      >
        <div className="input-form">Email</div>
        <input
          type="email"
          placeholder={`${
            error === "emailErr"
              ? "Enter valid email"
              : "Enter your Business Email"
          }`}
          name="email"
          onChange={handleChange}
          value={userData.email}
          required
        />
        {emailRegex.test(userData.email.toLowerCase()) && (
          <img
            src={checkedIcon}
            alt=""
            width="18px"
            height="18px"
            className="m-l-auto m-r-5"
          />
        )}
      </div>
      <div
        className={`form-section ${
          isValidPhoneNumber(`${number?.dialCode}${mobile}`)
            ? "green-border"
            : "normal-border"
        } ${error === "numberErr" ? "red-border" : "normal-border"}`}
        ref={ref}
      >
        <div
          className="flag-input"
          onClick={() => setDropDownSelect(!dropDownSelect)}
        >
          <img
            src={`https://cdn.kcak11.com/CountryFlags/countries/${initialCountryFlag}.svg`}
            alt=""
            width="16px"
          />
          <MdOutlineArrowDropDown />
        </div>
        <div
          className={`country-flag-input-scrool ${
            dropDownSelect ? "show" : "hidden"
          }`}
          // ref={ref}
        >
          <input
            className="country-input-search"
            type="text"
            placeholder="search"
            value={flagsearchValue}
            // onChange={handleSearchFilter}
            onChange={(e) => searchItems(e.target.value)}
          />
          {flagsearchValue.length > 1
            ? filteredResults.map((data, i) => {
                return (
                  <ul className="country-list " role="listbox" key={i}>
                    <li
                      className={`country ${
                        data.dialCode === number.dialCode ? "highlight" : ""
                      }`}
                      data-dial-code={data.dialCode}
                      data-country-code={data.isoCode}
                      role="option"
                      aria-selected="true"
                      onClick={() => handlecountrydata(data)}
                    >
                      <div className="flag in">
                        <img
                          src={data.flag}
                          alt=""
                          width="20px"
                          height="20px"
                        />
                      </div>
                      <span className="country-name">{data.name}</span>
                      <span className="dial-code">{data.dialCode}</span>
                    </li>
                  </ul>
                );
              })
            : countries.map((data, i) => {
                return (
                  <ul className="country-list " role="listbox" key={i}>
                    <li
                      className={`country ${
                        data.dialCode === number.dialCode ? "highlight" : ""
                      }`}
                      data-dial-code={data.dialCode}
                      data-country-code={data.isoCode}
                      role="option"
                      aria-selected="true"
                      onClick={() => handlecountrydata(data)}
                    >
                      <div className="flag in">
                        <img
                          src={data.flag}
                          alt=""
                          width="20px"
                          height="20px"
                        />
                      </div>
                      <span className="country-name">{data.name}</span>
                      <span className="dial-code">{data.dialCode}</span>
                    </li>
                  </ul>
                );
              })}
          {}
        </div>
        <input
          type="tel"
          className=""
          value={mobile}
          onChange={(e) => setmobile(e.target.value)}
          placeholder={`${
            error === "numberErr"
              ? "Enter valid number"
              : "Enter your WhatsApp Number"
          }`}
        />

        {isValidPhoneNumber(`${number?.dialCode}${mobile}`) && (
          <img
            src={checkedIcon}
            alt=""
            width="18px"
            height="18px"
            className="m-l-auto m-r-5 m-l-auto"
          />
        )}
      </div>
      <div
        className={`form-section ${
          userData.companyUrl.trim().toLowerCase().match(urlRegEx)
            ? "green-border"
            : "normal-border"
        } ${error === "urlErr" ? "red-border" : "normal-border"}`}
      >
        <div className="input-form">Website</div>
        <input
          type="text"
          placeholder={`${
            error === "urlErr" ? "Enter valid url" : "Enter your Website URL"
          }`}
          name="companyUrl"
          onChange={handleChange}
          value={userData.companyUrl}
          required
        />
        {userData.companyUrl.trim().toLowerCase().match(urlRegEx) && (
          <img
            src={checkedIcon}
            alt=""
            width="18px"
            height="18px"
            className="m-l-auto m-r-5"
          />
        )}
      </div>

      <div
        className={`form-section ${
          userData.companyName.length > 3 ? "green-border" : "normal-border"
        } ${error === "compNameErr" ? "red-border" : "normal-border"}`}
      >
        <div className="input-form">Company</div>
        <input
          type="text"
          placeholder={`${
            error === "compNameErr"
              ? "Enter valid name"
              : "Enter your Company Name"
          }`}
          name="companyName"
          onChange={handleChange}
          value={userData.companyName}
          required
        />
        {userData.companyName.length > 3 && (
          <img
            src={checkedIcon}
            alt=""
            width="18px"
            height="18px"
            className="m-l-auto m-r-5"
          />
        )}
      </div>
      <button type="submit">
        {loading && (
          <ColorRing
            visible={true}
            height="30"
            width="30"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#ffff", "#ffff", "#ffff", "#ffff", "#ffff"]}
          />
        )}
        <span>Click to Book a Slot</span>{" "}
      </button>
    </form>
  );
};

export default Form;
