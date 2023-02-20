import React from 'react'
import stopWatch from '../assets/Layer 2.svg';
import videoIcon from '../assets/Layer 34.svg';
const Conform = () => {
  return (
    <div className='ConformCOntainer'>
        <div className='ConformWrapper'>
        <div className='left'>
          <p className='m-b-10 text-color-lightblue-1  f-w-600 f-s-14  f-s-18'>
            SmatBot
          </p>
          <h2 className='m-b-20 f-s-20 f-s-24 text-light-black'>
            Resheadule a Demo with SmatBot
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

        <div className='btnGrp' >
            <button>Resheadule</button>
            <button>Cancel</button>
        </div>
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
        </div>
    </div>
  )
}

export default Conform