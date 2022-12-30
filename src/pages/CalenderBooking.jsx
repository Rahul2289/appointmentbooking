import React, { useState, useEffect } from 'react';

import calenderIcon from '../assets/calendar (1).svg';
import profileIcon from '../assets/icons8-administrator-male-48.png';
import manIcon from '../assets/man (4).svg';

import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

import { available_timezones_shedular } from './../utils';

import moment from 'moment-timezone';

import SelectSearch from 'react-select-search';
import 'react-select-search/style.css';

import { MdOutlineArrowDropDown } from 'react-icons/md';

import { useAppContext } from '../context/context';

import { ColorRing, Watch } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
const CalenderBooking = () => {
  const [checked, setChecked] = useState(true);
  const [timeing, setTimeing] = useState('00:00 PM');
  const [timer_loader, setTimer_loader] = useState(false);
  const navigate = useNavigate();
  const {
    Cal_Data, cb_section, next_ques, Time_slots, setTime_slots, loading, setLoading, value, onChange, boooked_date, setBooked_date,
    standardTimeing,setStandardTimeing,   disable,   setdisable,  sectionID,  setSectionID,  mobile,  userData,  resheaduleDate
  } = useAppContext();
console.log(resheaduleDate);
  // calender default otions = Cal_Data 
  let data = (Cal_Data && Cal_Data.length > 0 )? JSON.parse(Cal_Data) : {};
  useEffect(() => {
    try {
      if (cb_section.length === 0 && sectionID.length === 0 ) {
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

 
  //date range
  let min_date = 0;
  let max_date = 25;
   min_date = data?.date_range[0]  ;
   max_date = data?.date_range[1];
  let current_date = new Date();
  let show_def_date;
  if (data?.date_range[0] == 'a') {
    min_date = !1;
  } else {
    show_def_date = true;
    let date = new Date(min_date);
    min_date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
  if (data?.date_range[1] == 'b') {
    max_date = !1;
  } else {
    let date = new Date(max_date);
    max_date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  //period

  let past_days = data?.period[0];
  let future_days = data?.period[1];

  if (past_days != 'a' && past_days != null) {
    let past_date = new Date();
    past_date.setDate(past_date.getDate() - parseInt(past_days));
    min_date = new Date(
      past_date.getFullYear(),
      past_date.getMonth(),
      past_date.getDate()
    );
  }
  let future_date = new Date();
  if (future_days != 'b' && future_days != null) {
    future_date.setDate(future_date.getDate() + parseInt(future_days));
    max_date = new Date(
      future_date.getFullYear(),
      future_date.getMonth(),
      future_date.getDate()
    );
  }



  //weaak days

  let total_week_days = [1, 2, 3, 4, 5, 6, 7];

  let block_days = total_week_days.filter(function (n) {
    return !this.has(n);
  }, new Set(data?.weekdays));
 


  const defaultTimeZone = moment.tz.guess();
  const timeZonesList = moment.tz.names();



  let current_Day = value?.toString().split(' ')[0];
  let current_month = value?.toString().split(' ')[1];
  let current_Date = value?.toString().split(' ')[2];
  let current_year = value?.toString().split(' ')[3];
  let current_time = value?.toString().split(' ')[4];

  let Month_number = moment().month(current_month).format('M');

  
 
/* ------------------------------convert standard time------------------------------------- */

  const convertStandardTime = (timeStr) => {
    const [time, modifier] = timeStr.toString().split(' ');
    let [hours, minutes] = time.toString().split(':');
    if (hours === '12') {
      hours = '00';
    }
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${minutes}`;
  };


  let options = available_timezones_shedular.map((time) => ({
    value: `(GMT${time.value}) ${time.name} `,
    name: `(GMT${time.value}) ${time.name} `,
  }));
  const timeZone_value = standardTimeing
    .split(' ')[0]
    .split('T')[1]
    .split(')')[0];

  const Start_time_value = `${current_year}-${Month_number}-${current_Date}T00:00:00${timeZone_value}`;
  const End_time_value = `${current_year}-${Month_number}-${current_Date}T23:59:59${timeZone_value}`;
  const Current_Time_value = `${current_year}-${Month_number}-${current_Date}${moment(
    new Date().toLocaleTimeString().split(' '),
    'h:mm:ss A'
  ).format('HH:mm:ss')}${data?.timezone}`;
 
/* ------------------------------GET TIME  SLOTS BASED ON DATE ------------------------------------- */
  const get_slots = async () => {
    if (value) {
      try {
        setTimer_loader(true);
        const res = await axios.get(
          `https://www.smatbot.com/kya_backend/pagehub/getSlots?chatbot_id=${
            next_ques?.chatbot_id ? next_ques?.chatbot_id :  12763
          }&question_id=${next_ques?.id ? next_ques?.id : 580881}&cb_session=${
            cb_section.cb_session ?  cb_section.cb_session : sectionID
          }&starttime=${encodeURIComponent(
            Start_time_value
          )}&endtime=${encodeURIComponent(End_time_value)}&interval=${
            data?.interval
          }&bookings_per_slot=${
            data?.bookings_per_slot
          }&timezone=${timeZone_value}
         ${
           value.toString().substring(0, 15) ===
           new Date().toString().substring(0, 15)
             ? `&current_time=${encodeURIComponent(Current_Time_value)}`
             : ''
         }
          `
        );

        setTime_slots(res.data?.data);
        setTimer_loader(false);
        setTimeing('00:00 PM');
        setdisable(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

 /* ------------------------------GET TIME ZONE SLOTS------------------------------------- */
  const get_slots_timezone = async (time) => {
    const timeZone_values =  time.split(' ')[0].split('T')[1].split(')')[0] ;
      console.log(timeZone_values);
      setStandardTimeing(time)
  const Start_time_values = `${current_year}-${Month_number}-${current_Date}T00:00:00${timeZone_values}`;
  const End_time_values = `${current_year}-${Month_number}-${current_Date}T23:59:59${timeZone_values}`;
    if ( timeZone_values && timeZone_values.length>0) {
      try {
        setTimer_loader(true);
        const res = await axios.get(
          `https://www.smatbot.com/kya_backend/pagehub/getSlots?chatbot_id=${next_ques?.chatbot_id ? next_ques?.chatbot_id :  12763}&question_id=${next_ques?.id ? next_ques?.id : 580881}&cb_session=${
          cb_section.cb_session ?  cb_section.cb_session : sectionID
        }&starttime=${encodeURIComponent(
            Start_time_values
          )}&endtime=${encodeURIComponent(End_time_values)}&interval=${
            data?.interval
          }&bookings_per_slot=${data?.bookings_per_slot} ${
            value.toString().substring(0, 15) ===
            new Date().toString().substring(0, 15)
              ? `&current_time=${encodeURIComponent(Current_Time_value)}`
              : ''
          }
          `
        );

        setTime_slots(res.data?.data);
        setTimer_loader(false);
        setTimeing('00:00 PM');
        setdisable(true);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleDropdown = () => {
    let focusInput = document.querySelector('.select-search-container');
    focusInput.classList.add('select-search-has-focus');
    document.querySelector('.select-search-input').focus();
  };

  const changeDayNameToFull = () => {
    if (current_Day === 'Mon') {
      current_Day = 'Monday';
    } else if (current_Day === 'Tue') {
      current_Day = 'Tuesday';
    } else if (current_Day === 'Wed') {
      current_Day = 'Wednesday';
    } else if (current_Day === 'Thu') {
      current_Day = 'Thursday';
    } else if (current_Day === 'Fri') {
      current_Day = 'Friday';
    } else if (current_Day === 'Sat') {
      current_Day = 'Saturday';
    } else {
      current_Day = 'Sunday';
    }
  };
  changeDayNameToFull();

  
  const handleTimeing = (e) => {
    setChecked(!checked);
    // setTimeing(checked ? e.target.textContent : "00:00 PM");
    setTimeing(e.target.textContent);
  };

  useEffect(() => {
    if (timeing != '00:00 PM') {
      setdisable(false);
    }
  }, [timeing]);

 /* ------------------------------ getting slotes based on changeing the date------------------------------------ */
  useEffect(() => {
    if (value) {
      get_slots();
    }
  }, [value]);

  /* ------------------------------ACTION = answer AND sending booking slot  ------------------------------------- */
  const Conform_booked_Data = new FormData();
  Conform_booked_Data.append('action', 'answer');
  Conform_booked_Data.append(
    'answer_text',
    `${current_Date} ${current_month} ${current_year} at ${timeing}`
  );
  Conform_booked_Data.append('cb_session', cb_section.cb_session ?  cb_section.cb_session : sectionID);
  Conform_booked_Data.append('question_id', next_ques.id);
  Conform_booked_Data.append('is_logical', 1);
  Conform_booked_Data.append('sequence', next_ques?.sequence);
  Conform_booked_Data.append('chatbot_id', next_ques?.chatbot_id);
  Conform_booked_Data.append('option', 'sometext');
  Conform_booked_Data.append('visitor_link_traversal', '');
  Conform_booked_Data.append('language_code', 'default');
  const conformed_booking = async () => {
    try {
      const res = await axios({
        method: 'POST',
        url: 'https://www.smatbot.com/kya_backend/pagehub/chatbot_utils',
        data: Conform_booked_Data,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  let Booked_Time_Zone = standardTimeing
    ?.split(' ')[0]
    ?.split('+')[1]
    ?.split(')')[0];
  
  let Booked_time = `T${convertStandardTime(timeing)}:00`;
  let Booked_date = `${current_year}-${Month_number}-${current_Date}${Booked_time}${timeZone_value}`;

   /* ------------------------------ posting the reshesdile data to google sheet------------------------------------- */
const postToGoogleSheet =async()=>{
  try {
    const data = await axios.get(`https://script.google.com/macros/s/AKfycbxm-Q_gTTrl6xWDfd5kDTekuLp6GICMzi2RqtL3lcz96ao2dtqO5pDGXxaTiUOwf_oEhg/exec?email=${userData.email}&mobile_number=${mobile}&slot=${current_Day}, ${current_month} ${current_Date}, ${timeing} |  ${standardTimeing && standardTimeing}&status=Rescheduled&reason=${`NA`}`)
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

  /* ------------------------------ Booking the appointment Conformed------------------------------------- */
  const booked_Data = new FormData();
  booked_Data.append('chatbot_id', next_ques?.chatbot_id ? next_ques?.chatbot_id :  12763);
  booked_Data.append('cb_session', cb_section.cb_session ?  cb_section.cb_session : sectionID);
  booked_Data.append('question_id', next_ques?.id);
  booked_Data.append('time', Booked_date);

  const handleBookTheSlot = async () => {
    if (timeing != '00:00 PM') {
      try {
        setLoading(true);
        localStorage.setItem(
          'BOOKEDDATE',
          JSON.stringify(
            `  ${current_Day}, ${current_month} ${current_Date}, ${timeing} |  ${
              standardTimeing && standardTimeing
            }`
          )
        );
        toast.success('Your slot is Booked', {
          position: 'top-center',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        const res = await axios({
          method: 'POST',
          url: 'https://www.smatbot.com/kya_backend/pagehub/createAppointment',
          data: booked_Data,
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        setBooked_date(
          `  ${current_Day}, ${current_month} ${current_Date}, ${timeing} |  ${
            standardTimeing && standardTimeing
          }`
        );

        conformed_booking();

           setTimeout(() => {
             window.open('../../thankYou.html', '_self');
            setLoading(false);
         }, 500);
         if (sectionID.length>0) {
          postToGoogleSheet()
         }
       
        } catch (error) {
        console.log(error);
      }
    } else {
      toast.error('Select time slot', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };
   /* ------------------------------ getting slotes based on changeing the time zone ------------------------------------ */
const handleOnchangeStandardTimeing =(e)=>{
  setStandardTimeing(e)
  if(e && e.length>0){
  get_slots_timezone(e)
  }
}

  return (
    <div className='container'>
      <div className='wrapper'>
        <div className='left-calender'>
          <p className='m-b-20 f-s-12 f-s-14 f-w-600 text-center'>
            Select a slot to schedule a Demo.
          </p>
          <div className=' select-section'>
            <SelectSearch
              value={standardTimeing}
              options={options}

              onChange={handleOnchangeStandardTimeing}
              search
              // setStandardTimeing placeholder="Search country"
            />
            <span className='downIcon' onClick={handleDropdown}>
              {' '}
              <MdOutlineArrowDropDown />
            </span>
          </div>
          <Calendar
            onChange={onChange}
            value={value}
            minDate={data?.date_range[0] === 'a' ? new Date() : min_date}
            tileDisabled={
              ({ date, view }) =>
                view === 'month' &&
                // block_days.some((weak) => date.getDay() === weak)
                block_days.some((weak) =>
                  weak === 7 ? date.getDay() === 0 : date.getDay() === weak
                )
              //   ||
              // (date.getFullYear() === new Date(2022, 11, 25).getFullYear() &&
              //   date.getMonth() === new Date(2022, 11, 25).getMonth() &&
              //   date.getDate() === new Date(2022, 11, 25).getDate())
            }
            maxDate={data?.date_range[0] === 'b' ? new Date() : max_date}
          />

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
        {    (sectionID && sectionID.length>0)  && 
        <> 
        <div className='formetTimer'>
            <h6>Former Time</h6>
            <div className= 'row'>
              <img src={calenderIcon} alt="" />
              <h6> {  resheaduleDate}</h6>
            </div>
          </div>
          <div className='under-line'></div>
          </> 
          }
          
          <p className='m-b-20 f-s-12 f-s-14 f-w-600'>
            Select the time and then click on Schedule.
          </p>

          <h5 className='f-s-12 f-s-14 f-w-600 m-b-20'>
            {current_Date} {current_month} {current_year}, {current_Day}
          </h5>
          <div className='timeing-button-wrapper'>
            {timer_loader ? (
              <Watch
                height='70'
                width='70'
                radius='48'
                color='#465def'
                ariaLabel='watch-loading'
                wrapperStyle={{
                  justifyContent: 'center',
                  height: '100%',
                }}
                wrapperClassName='watch-loader'
                visible={true}
              />
            ) : (
              Time_slots.length > 0 &&
              Time_slots.map((time, i) => (
                <button
                  type='checkbox'
                  key={i}
                  className={`timeing-button ${
                    timeing === time ? 'active-btn' : ''
                  } `}
                  onClick={handleTimeing}
                >
                  {time}
                </button>
              ))
            )}
            {}
            {timer_loader
              ? ''
              : Time_slots.length === 0 && (
                  <p className='no-slots-text'>{data?.no_slots_message}</p>
                )}
          </div>

          <div className='under-line'></div>

          <div className='flex-row m-b-30 '>
            <img src={manIcon} alt='' width='30px' height='30px' />
            <div className='m-l-5'>
              <p className='f-s-12 f-s-14 f-w-600 m-b-5'>Vikram Goud</p>
              <p className='f-s-10   f-w-600 text-blue'>
                Head of Sales | SmatBot
              </p>
            </div>
          </div>

          <div className='m-b-30 flex-row'>
            <img src={calenderIcon} alt='' width='30px' height='30px' />
            <span className='m-l-10 f-s-10  f-w-600 text-blue line-h-16'>
              {current_Day}, {current_month} {current_Date}, {timeing} |{' '}
              {standardTimeing && standardTimeing}
            </span>
          </div>

          <div className='under-line'></div>
          <button
            className={` ${disable ? `btndisable` : 'sheadule-btn'}`}
            type='submit'
            onClick={handleBookTheSlot}
          >
            {loading && (
              <ColorRing
                visible={true}
                height='30'
                width='30'
                ariaLabel='blocks-loading'
                wrapperStyle={{}}
                wrapperClass='blocks-wrapper'
                colors={['#ffff', '#ffff', '#ffff', '#ffff', '#ffff']}
              />
            )}
            <span className='f-s-14'>Looks Good! Schedule it.</span>
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CalenderBooking;
