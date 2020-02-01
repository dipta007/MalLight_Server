import React from 'react';

const Footer = () => (
  <footer className="page-footer font-small blue-grey lighten-5">
    <div className="text-center text-md-left">
      <div className="dark-grey-text flex">
        
        <div className="text-center flex-1">
          <h5 className="text-uppercase font-weight-bold">Location</h5>
          <hr className="teal accent-3 mb-2 mt-0 d-inline-block mx-auto" style={{ width: "80px" }} />
          <h6>
            United City,
            Madani Ave, <br /> <br />
            Dhaka 1212
          </h6>
        </div>

        <div className="text-center flex-1">
          <h5 className="text-uppercase font-weight-bold">Teammates</h5>
          <hr className="teal accent-3 mb-2 mt-0 d-inline-block mx-auto" style={{ width: "80px" }} />
          <h5>
            ⦿ Wakil Ahmad <br /> <br />
            ⦿ Easin Arafat Roman <br /> <br />
            ⦿ Shubhashis Roy Dipta 
          </h5>
        </div>

        <div className="text-center flex-1">
          <h5 className="text-uppercase font-weight-bold">About UIU</h5>
          <hr className="teal accent-3 mb-2 mt-0 d-inline-block mx-auto" style={{ width: "80px" }} />
          <p className="dont-break-out">
          United International University or UIU is a private university located in Dhaka, Bangladesh, The government of Bangladesh approved the establishment of United International University in 2003 under the Private University Act of 1992. Financial support came from the United Group, a Bangladeshi business conglomerate
          </p>
        </div>

      </div>
    </div>
    <div className="footer-copyright text-center text-black-50 py-3">
      Copyright © Department of Computer Science and Engineering, United International University 2020
    </div>
  </footer>
);

export default Footer;
