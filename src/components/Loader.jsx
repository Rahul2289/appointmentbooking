import React from 'react'

const Loader = () => {
  return (
    <div id="preloader">
    <div id="ctn-preloader" className="ctn-preloader">
        <div className="animation-preloader">
            <div className="spinner"></div>
            <div className="txt-loading" >
                <span data-text-preloader="S" className="letters-loading">S                        </span>
                <span data-text-preloader="m" className="letters-loading">m                        </span>
                <span data-text-preloader="a" className="letters-loading">a                        </span>
                <span data-text-preloader="t" className="letters-loading">t                        </span>
                <span data-text-preloader="B" className="letters-loading">B                        </span>
                <span data-text-preloader="o" className="letters-loading">o                        </span>
                <span data-text-preloader="t" className="letters-loading">t                        </span>
            </div>
                   </div>
        <div className="loader">
            <div className="row">
                <div className="col-lg-3 loader-section section-left">
                    <div className="bg"></div>
                </div>
                <div className="col-lg-3 loader-section section-left">
                    <div className="bg"></div>
                </div>
                <div className="col-lg-3 loader-section section-right">
                    <div className="bg"></div>
                </div>
                <div className="col-lg-3 loader-section section-right">
                    <div className="bg"></div>
                </div>
            </div>
        </div>
    </div>
</div>

  )
}

export default Loader