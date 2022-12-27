import { isValidPhoneNumber } from 'react-phone-number-input';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import stopWatch from '../assets/Layer 2.svg';
import videoIcon from '../assets/Layer 34.svg';

import Form from './../components/Form';
import { nameRegex, emailRegex, urlRegEx } from './../utils';
import axios from 'axios';
import { useAppContext } from '../context/context';
import { useOutsideClick } from './../components/WIthClickOutSIde';
import Loader from './../components/Loader';

function AppointForm({
  geopl,
  chatBotUtils_1,
  next_question,
  sheet_id,
  visitorId,
}) {


  const {
    cb_section,
    Cal_Data,
    loading,
    setLoading,
    number,
    setNumber,
    error,
    setError,
    userData,
    setUserData,
    setCal_Data,
    setCb_section,
    setnext_ques,
    mobile,
    setmobile,
    fetchCountries,
    flagsearchValue,
    setFlagSearchValue,
    countries,
    setcountries,
    setDropDownSelect,
    sectionID, setSectionID
  } = useAppContext();

  const navigate = useNavigate();

  const handleHeaderClick = (event) => {
    event.stopPropagation();
  };
 
 
if (window.location.href.includes('reschedule')) {
let action = window.location.href.split('action=')[1]
let SECTIONID = action.split('=')[1]
setSectionID(SECTIONID)
}



  useEffect(() => {
    fetchCountries();
  }, []);


  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const formData_detail_data = new FormData();
  formData_detail_data.append('action', 'answer');
  formData_detail_data.append(
    'answer_text',
    `{"Name":"${userData.name}","Country Code":"${number?.isoCode} ${number?.dialCode}","Phone Number":"${mobile}","Business Email":"${userData?.email}","Company Website":"${userData?.companyUrl}","Company name":"${userData?.companyName}"}`
  );

  formData_detail_data.append('cb_session', chatBotUtils_1?.cb_session);
  formData_detail_data.append('question_id', next_question?.id);
  formData_detail_data.append('is_logical', next_question?.logical_jump);
  formData_detail_data.append('sequence', next_question?.sequence);
  formData_detail_data.append('chatbot_id', next_question?.chatbot_id);
  formData_detail_data.append('option', 'sometext');
  formData_detail_data.append('visitor_link_traversal', '');
  formData_detail_data.append('language_code', 'default');

  const post_Form_data = async () => {
    if (next_question?.id && chatBotUtils_1?.cb_session) {
      try {
        const data = await axios({
          method: 'POST',
          url: 'https://www.smatbot.com/kya_backend/pagehub/chatbot_utils',
          data: formData_detail_data,
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setCal_Data(data?.data?.next_question[0]?.default_options);
        setCb_section(data?.data);
        setnext_ques(data?.data?.next_question[0]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const send_alert_data = new FormData();
  send_alert_data.append('action', 'send_alert');
  send_alert_data.append('cb_session', chatBotUtils_1?.cb_session);
  send_alert_data.append('chatbot_id', next_question?.chatbot_id);
  send_alert_data.append(
    'url',
    'https://www.page.smatbot.com/?name=Demo_Bot&id=12763&book_demo=true'
  );
  send_alert_data.append('source', 'https://www.page.smatbot.com/');
  send_alert_data.append('name', 'SmatBot');
  send_alert_data.append('client_ip_address', geopl?.IPv4);
  send_alert_data.append('user_location', geopl?.location);
  send_alert_data.append('last_question_answered', 0);
  send_alert_data.append('sheet_id', sheet_id);
  send_alert_data.append('timestamp', new Date());
  send_alert_data.append(
    'hours',
    new Date().toString().split(' ')[4].split(':')[0]
  );

  const send_alert_Post_data = async () => {
    if (next_question?.chatbot_id) {
      try {
        const res = await axios({
          method: 'POST',
          url: 'https://www.smatbot.com/kya_backend/pagehub/chatbot_utils',
          data: send_alert_data,
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const formData_detail = new FormData();
  formData_detail.append('action', 'init_chat');
  formData_detail.append('device_print', `${visitorId}_landing`);
  formData_detail.append('chatbot_id', 12763);
  formData_detail.append('language_code', 'default');

  const get_ChatBot_utils = async () => {
    if (visitorId) {
      try {
        await axios({
          method: 'POST',
          url: 'https://www.smatbot.com/kya_backend/pagehub/chatbot_utils',
          data: formData_detail,
          headers: { 'Content-Type': 'multipart/form-data' },
        }).then((data) => console.log(data));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      userData.name.length >= 3 &&
      nameRegex.test(userData.name.toLowerCase())
    ) {
      if (emailRegex.test(userData.email.toLowerCase())) {
        if (isValidPhoneNumber(`${number?.dialCode}${mobile}`)) {
          if (userData.companyUrl.trim().toLowerCase().match(urlRegEx)) {
            if (userData.companyName.length > 3) {
              localStorage.setItem(
                'userData',
                JSON.stringify({ ...userData, number, mobile })
              );
              console.log(userData);
              setLoading(true);
              post_Form_data();

              // get_ChatBot_utils();

              send_alert_Post_data();
            } else {
              setError('compNameErr');
              setUserData({ ...userData, companyName: '' });
            }
          } else {
            setError('urlErr');
            setUserData({ ...userData, companyUrl: '' });
          }
        } else {
          setError('numberErr');
          setmobile('');
        }
      } else {
        setError('emailErr');
        setUserData({ ...userData, email: '' });
      }
    } else {
      setError('nameErr');
      setUserData({ ...userData, name: '' });
    }
  };

  useEffect(() => {
    if (Cal_Data.length > 0 && cb_section) {
      setTimeout(() => {
        setLoading(false);
         navigate('/booking');
      }, 1500);
    }
  }, [Cal_Data]);



  const reshudle_detail_data = new FormData();
  reshudle_detail_data.append('bot_id', 12763);
  reshudle_detail_data.append('session_id', sectionID);

  const reshudle_demo = async () => {
    if (sectionID && sectionID.length>0) {
      try {
        const data = await axios({
          method: 'POST',
          url: 'https://www.smatbot.com/kya_backend/singleChatEmailView/singleChatView',
          data: reshudle_detail_data,
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      
     let res = JSON.parse(data.data.qna_prev[0].answer_text) 
     let response = data.data.qna_prev[data.data.qna_prev.length-1].default_options
      setCal_Data(response)
      setUserData({
        name: res.Name,
        email: res['Business Email'],
        companyUrl: res['Company Website'],
        companyName: res['Company name'],
      })
      setmobile(res['Phone Number'])
      setNumber({
        dialCode: res['Country Code'].split(' ')[1],
        isoCode: res['Country Code'].split(' ')[0]
      })
      setnext_ques(data.data.qna_prev[data.data.qna_prev.length-1])
       
    
      } catch (error) {
        console.log(error);
      }
    }
  };
  




  useEffect(() => {
    if ( sectionID.length>0 ) {
      reshudle_demo()
    }
  }, [next_question?.id])

  return (
    <div className='container' onClick={handleHeaderClick}>
       {window.location.href.includes('reschedule') ? <> <Loader/> </> : <> 
       <div className='wrapper'>
        <div className='left'>
          <p className='m-b-10 text-color-lightblue-1  f-w-600 f-s-14  f-s-18'>
            SmatBot
          </p>
          <h2 className='m-b-20 f-s-20 f-s-24 text-light-black'>
            Book a Demo with SmatBot
          </h2>
          <div className='row m-b-20'>
            <img src={stopWatch} alt='stopwatch' width='20px' height='20px' />
            <p className='text-color-lightblue-1  f-w-600 f-s-14 f-s-18 m-l-20'>
              {' '}
              30 Minutes
            </p>
          </div>
          <div className='row m-b-20'>
            <img src={videoIcon} alt='videoIcon' width='20px' height='20px' />
            <p className='text-color-lightblue-1  f-w-600 f-s-14  f-s-18 m-l-20'>
              {' '}
              Confirmation details will be sent by email.
            </p>
          </div>
          <p className='m-b-20 text-light-blue f-w-500 f-s-14 f-s-18'>Hey!</p>
          <p className='m-b-20 inline-h-30 text-light-blue f-w-500 f-s-14 f-s-18'>
            We are delighted that you are interested in SmatBot. This call will
            help us get to know each other and show you ways that SmatBot can
            help your organization.
          </p>
          <div className='powred-by '>
            <span className='m-l-5'>Powered by</span>
            {/* <img src="" alt="" className="m-l-5" /> */}
            <a
              href='https://www.smatbot.com'
              target='_blank'
              className='f-s-10 f-s-14 f-w-600 text-light-black'
            >
              SmatBot
            </a>
          </div>
        </div>
        <div className='right'>
          <h5 className='text-blue  m-b-20 f-w-500 f-s-14 f-s-18 m-w-85'>
            Please share your details so we can customize our demo to match your
            needs.
          </h5>

          <Form
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            userData={userData}
            error={error}
            nameRegex={nameRegex}
            emailRegex={emailRegex}
            number={number}
            urlRegEx={urlRegEx}
            loading={loading}
            setNumber={setNumber}
            geopl={geopl}
          />
        </div>
      </div></>}

    </div>
  );
}

export default AppointForm;
