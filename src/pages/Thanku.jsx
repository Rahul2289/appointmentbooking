import React, { useEffect } from "react";
import scucessImg from "../assets/check success.svg";
import emailIcon from "../assets/email (1).svg";
import nameIcon from "../assets/ID CARD.svg";
import phoneIcon from "../assets/Phone_Call_4_.svg";
import websiteIcon from "../assets/internet (1).svg";
import calenderIcon from "../assets/calendar.svg";

import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

import { useAppContext } from "../context/context";

import { useNavigate } from "react-router-dom";

import { BiArrowBack } from "react-icons/bi";
const Thanku = () => {
  const { width, height } = useWindowSize();

  const {
    boooked_date,
    number,
    userData,
    setCal_Data,
    setNumber,
    setCb_section,
    setnext_ques,
    setUserData,
    setBooked_date,
    setTime_slots,
    onChange,
    mobile,
    setmobile,
  } = useAppContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (userData.name === "") {
      navigate("/");
    }
  }, []);
  const handleBackToForm = (e) => {
    setCal_Data([]);
    setCb_section([]);
    setnext_ques([]);
    setUserData({
      name: "",
      email: "",
      companyUrl: "",
      companyName: "",
    });
    setBooked_date("");
    setTime_slots([]);
    setNumber({
      dialCode: "+91",
      flag: "https://cdn.kcak11.com/CountryFlags/countries/in.svg",
      isoCode: "IN",
      name: "India",
    });
    setmobile("");
    onChange(new Date());
    navigate("/");
  };
  return (
    <div className="thanku">
      <div className="wrapper">
        <div className="back-arrow" onClick={handleBackToForm}>
          <BiArrowBack style={{ fontSize: "21px" }} />
        </div>
        <div className="scucess-img">
          <img src={scucessImg} alt="scucess" />
        </div>
        <h5 className="thanks-text">Thanks! You're booked</h5>
        <p className="thanks-text-info">
          We're looking forward to your demo. If you have any questions prior to
          your demo feel free to reach us at{" "}
          <span>
            {" "}
            <a href="mailto:info@smatbot.com" className="highlight-text">
              info@smatbot.com
            </a>{" "}
            &nbsp;
          </span>
          or call us at{" "}
          <span>
            {" "}
            <a href="tel:+911234567890" className="highlight-text">
              +911234567890.
            </a>
          </span>
        </p>
        <div className="thnaku-info-wrapper">
          <div className="item">
            <img src={nameIcon} alt="" />
            <p>{userData?.name}</p>
          </div>
          <div className="item">
            <img src={emailIcon} alt="" />
            <p>{userData?.email}</p>
          </div>
          <div className="item">
            <img src={phoneIcon} alt="" />
            <p>
              {number?.dialCode} {mobile}
            </p>
          </div>
          <div className="item">
            <img src={websiteIcon} alt="" />
            <p>{userData?.companyUrl}</p>
          </div>
          <div className="item">
            <img src={calenderIcon} alt="" />
            <p>{boooked_date}</p>
          </div>
        </div>

        <h5 className="thanks-text">Acquire, Engage & Support Customers</h5>

        <div className="signup-wrapper">
          <input
            type="email"
            value={userData?.email}
            placeholder="Enter your email address"
            onChange={(e) => console.log(e.target.value)}
          />

          <a
            href={`https://www.smatbot.com/signup?email=${userData?.email}`}
            target="_blank"
          >
            Sign Up
          </a>
        </div>
        <div className="powred-by ">
          <span className="m-l-5">Powered by</span>
          <img src="" alt="" className="m-l-5" />
          <span className="f-s-12 f-s-14 f-w-600 text-light-black">
            SmatBot
          </span>
        </div>
      </div>
      {/* {width > "1000" && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          tweenDuration={10000}
          numberOfPieces={300}
        />
      )} */}
    </div>
  );
};

export default Thanku;
