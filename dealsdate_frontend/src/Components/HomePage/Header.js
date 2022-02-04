import React from 'react'

const Header = () => {
    return (
        <>
            <header>
        <section className="container main-hero-container">
          <div className="row">
            <div className="col-12 col-lg-6 header-left-side d-flex justify-content-center flex-column align-items-start ">
              <h1 className="display-2">
                Deals Date <br /> A Gift For You.
              </h1>
              <p className="main-hero-para">
              Dealsdate is an online gift shopping website providing gift 
              items for special life moments such as birthdays, weddings,
               anniversaries etc. We are creating an application to better serve our target audience.

              </p>
              <h3>Get early access for you</h3>
              <div className="input-group mt-3">
                <input
                  type="text"
                  className="rounded-pill w-50  w-lg-75 me-3 p-2 form-control-text"
                  placeholder="Enter Your Email"
                />
                <div className="input-group-button">Get it now</div>
              </div>
            </div>
            {/*  --------------- main header right side--------------  */}
            <div className="col-12 col-lg-6 header-right-side d-flex justify-content-center
             align-items-center main-herosection-images">
              <img
                src="./images/gift1.jpg"
                alt="heroimg"
                className="img-fluid"
              />
             
            </div>
          </div>
        </section>
      </header>
    </>
 );
};

export default Header


