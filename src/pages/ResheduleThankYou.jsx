import React, { useEffect, useState } from 'react';
import scucessImg from '../assets/check success.svg';
import emailIcon from '../assets/email (1).svg';
import nameIcon from '../assets/ID CARD.svg';
import phoneIcon from '../assets/Phone_Call_4_.svg';
import websiteIcon from '../assets/internet (1).svg';
import calenderIcon from '../assets/calendar.svg';
import homeIcon from '../assets/help_center_desc_home.svg';

import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';

import { useAppContext } from '../context/context';

import { BiArrowBack } from 'react-icons/bi';
const ThankYou = () => {
  const { width, height } = useWindowSize();

  const {boooked_date,  number, userData, setCal_Data, setNumber, setCb_section, setnext_ques, setUserData, setBooked_date,
    setTime_slots, onChange, mobile,setmobile,
  } = useAppContext();

 

 
  const [email, setEmail] = useState(userData.email);
  const handleSignUp = () => {
    window.open(`https://www.smatbot.com/signup?email=${email}`, '_self');
  };
  const BackToSmatBot = () => {

    window.open('https://www.smatbot.com', '_self');
  };

  return (
    <div className='thanku'>
      <div className='wrapper'>
        <div className='back-arrow'>
          <a
            onClick={BackToSmatBot}
            // href='https://www.smatbot.com/'
          >
            {/* <BiArrowBack style={{ fontSize: "21px" }} /> */}
            <img src={homeIcon} alt='' width={'20px'} />
            <span>Home</span>
          </a>
        </div>
        <div className='scucess-img'>
          <img src={scucessImg} alt='scucess' />
        </div>
        <h5 className='thanks-text'>Thanks! You're booked.</h5>
        <p className='thanks-text-info'>
          We're looking forward to your demo. If you have any questions prior to
          your demo feel free to reach us at{' '}
          <span>
            {' '}
            <a
              href='mailto:info@smatbot.com'
              className='highlight-text f-w-600'
            >
              info@smatbot.com
            </a>{' '}
            &nbsp;
          </span>
          or call us at{' '}
          <span>
            {' '}
            <a href='tel:+911234567890' className='highlight-text'>
              +914049520079.
            </a>
          </span>
        </p>
        <div className='thnaku-info-wrapper'>
          <div className='item'>
            <img src={nameIcon} alt='' />
            <p>{userData?.name}</p>
          </div>
          <div className='item'>
            <img src={emailIcon} alt='' />
            <p>{userData?.email}</p>
          </div>
          <div className='item'>
            <img src={phoneIcon} alt='' />
            <p>
              {number?.dialCode} {mobile}
            </p>
          </div>
          <div className='item'>
            <img src={websiteIcon} alt='' />
            <p>{userData?.companyUrl}</p>
          </div>
          <div className='item'>
            <img src={calenderIcon} alt='' />
            <p>{boooked_date}</p>
          </div>
        </div>

        <h5 className='thanks-text'>Acquire, Engage & Support Customers.</h5>

        <div className='signup-wrapper'>
          <input
            type='email'
            value={email}
            placeholder='Enter your email address'
            onChange={(e) => setEmail(e.target.value)}
          />

          <a
            // href={`https://www.smatbot.com/signup?email=${email}`}
            // target='_blank'
            onClick={handleSignUp}
          >
            Sign Up
          </a>
        </div>
        <div className='powred-by '>
          <span className='m-l-5'>Powered by</span>
          {/* <img src="" alt="" className="m-l-5" /> */}
          <a
            href='https://www.smatbot.com'
            className='f-s-10 f-s-14 f-w-600 text-light-black'
          >
            SmatBot
          </a>
        </div>
      </div>
      {width > 1000 && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          tweenDuration={10000}
          numberOfPieces={300}
        />
      )}
    </div>
  );
};

export default ThankYou;
