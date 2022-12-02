import React, { useState } from "react";
import { isValidPhoneNumber } from "react-phone-number-input";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { ColorRing } from "react-loader-spinner";
import checkedIcon from "../assets/check-rounded.svg";

const Form = (props) => {
  const {
    handleSubmit,
    handleChange,
    userData,
    error,
    emailRegex,
    number,
    urlRegEx,
    loading,
    setNumber,
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={`form-section ${
          userData.name.length >= 3 ? "green-border" : "normal-border"
        } ${error === "nameErr" ? "red-border" : "normal-border"} `}
      >
        <div className="input-form">Name</div>
        <input
          type="text"
          placeholder={`${
            error === "nameErr" ? "Enter valid name" : "Enter your name"
          }`}
          name="name"
          onChange={handleChange}
          value={userData.name}
          required
        />
        {userData.name.length >= 3 && (
          <img
            src={checkedIcon}
            alt=""
            width="20px"
            height="20px"
            className="m-l-5 m-r-5"
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
            error === "emailErr" ? "Enter valid email" : "Enter your Email"
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
            width="20px"
            height="20px"
            className="m-l-5 m-r-5"
          />
        )}
      </div>
      <div
        className={`form-section ${
          isValidPhoneNumber(`${number?.formattedValue}`)
            ? "green-border"
            : "normal-border"
        } ${error === "numberErr" ? "red-border" : "normal-border"}`}
      >
        <PhoneInput
          placeholder={`${
            error === "numberErr" ? "Enter valid number" : "Enter mobile number"
          }`}
          country="in"
          value={number ? number.value : ""}
          onChange={(value, country, e, formattedValue) =>
            setNumber({
              rawPhone: value?.slice(number?.country?.dialCode.length),
              value,
              country,
              e,
              formattedValue,
            })
          }
          inputProps={{
            name: "phone",
            required: true,
            autoFocus: false,
            autoComplete: "off",
          }}
          preferredCountries={["in", "us"]}
          enableSearchField
          enableSearch
          searchClass="search-class"
          searchStyle={{ margin: "0", width: "97%", height: "30px" }}
          disableSearchIcon
          searchPlaceholder="search "
          // disableCountryCode
          // disableInitialCountryGuess
        />
        {number?.value && isValidPhoneNumber(`${number?.formattedValue}`) && (
          <img
            src={checkedIcon}
            alt=""
            width="20px"
            height="20px"
            className="m-l-5 m-r-5 m-l-auto"
          />
        )}
      </div>
      <div
        className={`form-section ${
          userData.companyUrl.match(urlRegEx) ? "green-border" : "normal-border"
        } ${error === "urlErr" ? "red-border" : "normal-border"}`}
      >
        <div className="input-form">Website</div>
        <input
          type="text"
          placeholder={`${
            error === "urlErr" ? "Enter valid url" : "Enter website url"
          }`}
          name="companyUrl"
          onChange={handleChange}
          value={userData.companyUrl}
          required
        />
        {userData.companyUrl.match(urlRegEx) && (
          <img
            src={checkedIcon}
            alt=""
            width="20px"
            height="20px"
            className="m-l-5 m-r-5"
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
            error === "compNameErr" ? "Enter valid name" : "Enter Company name"
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
            width="20px"
            height="20px"
            className="m-l-5 m-r-5"
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
        <span> Continue to book a slot</span>{" "}
      </button>
    </form>
  );
};

export default Form;
