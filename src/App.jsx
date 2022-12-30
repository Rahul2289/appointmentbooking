import './App.css';
import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AppointForm from './pages/AppointForm';
import CalenderBooking from './pages/CalenderBooking';

import FingerprintJS from '@fingerprintjs/fingerprintjs';
import axios from 'axios';

import Thanku from './pages/Thanku';

import 'react-toastify/dist/ReactToastify.css';

import { useAppContext } from './context/context';
import Protected from './components/Protected';

const fpPromise = FingerprintJS.load();
function App() {
  
  const { Cal_Data } = useAppContext();
  const [visitorId, setVisitorId] = useState('');
  const [geopl, setGeopl] = useState([]);
  const [chatBotUtils, setChatBotUtils] = useState([]);
  const [Init_question, setInit_question] = useState([]);
  const [chatBotUtils_1, setChatBotUtils_1] = useState([]);
  const [next_question, setnext_question] = useState([]);
  const [sheet_id, setSheet_id] = useState([]);

  const new_date = new Date();
  let Time_Zone = new_date.getTimezoneOffset();

  const visitor_Loading = useRef(false);
  const geopl_Loading = useRef(false);


  
/* ------------------------------GETTING VISITOR ID FROM FINGEpRRINT.JS------------------------------------- */  

  useEffect(() => {
    if (visitor_Loading.current === false) {
      const fetch_visitor = async () => {
        const fp = await fpPromise;
        const result = await fp.get();
        setVisitorId(result.visitorId);
      };

      fetch_visitor();
    }
    return () => {
      visitor_Loading.current === true;
    };
  }, []);

  /* ------------------------------GETTING LOCATINON , IPv4 , country_code------------------------------------- */  
  useEffect(() => {
    if (geopl_Loading.current === false) {
      try {
        axios
          .get('https://www.smatbot.com/kya_backend/api/geoIp')
          .then((data) => setGeopl(data.data.response));
      } catch (error) {
        console.log(error);
      }
    }

    return () => {
      geopl_Loading.current === true;
    };
  }, []);


    /* ------------------------------ACTION = read_cb_by_id AND GETTING spreadsheet_id------------------------------------- */  
  let formData_init = new FormData();
  formData_init.append('action', 'read_cb_by_id');
  formData_init.append('chatbot_id', 12763);

  useEffect(() => {
 
      try {
        fetch('https://www.smatbot.com/kya_backend/pagehub/chatbot_utils', {
          method: 'POST',
          body: formData_init,
        })
          .then((res) => res.json())
          .then((data) => setSheet_id(data?.chatbot_details[0].spreadsheet_id));
      } catch (error) {
        console.log(error);
      }
    
  }, []);

   /* ------------------------------ACTION = init_chat AND pOSTING device_print------------------------------------- */  
  const formData_detail = new FormData();
  formData_detail.append('action', 'init_chat');
  formData_detail.append('device_print', `${visitorId}_landing`);
  formData_detail.append('chatbot_id', 12763);
  formData_detail.append('name', 'SmatBot');
  formData_detail.append('language_code', 'default');
  formData_detail.append('book_demo', 1);

  const get_ChatBot_utils = async () => {
    if (visitorId && geopl.IPv4 ) {
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

  useEffect(() => {
    if (visitorId) {
      get_ChatBot_utils();
    }
  }, [visitorId, geopl.IPv4]);


     /* ------------------------------ACTION = init_chat AND pOSTING device_print AND source------------------------------------- */  
  const formData_detail_1 = new FormData();
  formData_detail_1.append('action', 'init_chat');
  formData_detail_1.append('device_print', `${visitorId}_landing`);
  formData_detail_1.append('chatbot_id', 12763);
  formData_detail_1.append(
    'source',
    `{"url":"https://www.smatbot.com/", "date":"${new Date()}","channel":"${'Web'}","timezone":${Time_Zone},"client_ip_address":"${
      geopl.IPv4
    }","user_location":"${
      geopl.location
    }","bot_url":"${'https://www.page.smatbot.com/?name=Demo_Bot&id=12763&book_demo=true'}"}`
  );
  formData_detail_1.append('language_code', 'default');
  formData_detail_1.append('lead_revisited', 1);
  formData_detail_1.append('name', 'SmatBot');
  formData_detail_1.append('lead_revisit_notification', 1);
  formData_detail_1.append('book_demo', 1);

  const fetch_chatbot_utils_2 = async () => {
    if (visitorId && geopl.IPv4 ) {
      try {
        const data = await axios({
          method: 'POST',
          url: 'https://www.smatbot.com/kya_backend/pagehub/chatbot_utils',
          data: formData_detail_1,
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setChatBotUtils(data.data);
        setInit_question(data.data.init_question[0]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetch_chatbot_utils_2();
  }, [geopl.IPv4, visitorId]);
     /* ------------------------------ACTION = answer ------------------------------------- */ 
  const formData_detail_2 = new FormData();
  formData_detail_2.append('action', 'answer');
  formData_detail_2.append('chatbot_id', Init_question.chatbot_id);
  formData_detail_2.append(
    'answer_text',
    'https://www.page.smatbot.com/?name=Demo_Bot&id=12763&book_demo=true'
  );
  formData_detail_2.append('cb_session', chatBotUtils?.cb_session);
  formData_detail_2.append('question_id', Init_question.id);
  formData_detail_2.append('is_logical', Init_question.logical_jump);
  formData_detail_2.append('sequence', Init_question.sequence);
  formData_detail_2.append(
    'option',
    'https://www.page.smatbot.com/?name=Demo_Bot&id=12763&book_demo=true'
  );
  formData_detail_2.append('language_code', chatBotUtils?.language_code);
  formData_detail_2.append('visitor_link_traversal', `${''}`);

  const fetch_chatbot_utils_3 = async () => {
    if (chatBotUtils.cb_session) {
      try {
        const data = await axios({
          method: 'POST',
          url: 'https://www.smatbot.com/kya_backend/pagehub/chatbot_utils',
          data: formData_detail_2,
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setChatBotUtils_1(data.data);
        setnext_question(data.data.next_question[0]);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    fetch_chatbot_utils_3();
  }, [chatBotUtils.cb_session]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <AppointForm
              Cal_Data={Cal_Data}
              chatBotUtils_1={chatBotUtils_1}
              next_question={next_question}
              geopl={geopl}
              sheet_id={sheet_id}
              visitorId={visitorId}
            />
          }
        />
        <Route
          path='/booking'
          element={
             <Protected Cal_Data={Cal_Data}>
              <CalenderBooking />
             </Protected>
          }
        />
        <Route path='/thankYou' element={<Thanku />} />
        {/* <Route path='/thankYou.html' /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
