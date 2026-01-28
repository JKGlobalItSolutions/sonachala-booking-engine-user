// import React from 'react';

// function Footer() {
//   return (
//     <footer className="footer pt-4" style={{backgroundColor: "#001524", color: "#ffffff"}}>
//       <div className="container">
//         <div className="row">
//           <div className="col-6 col-sm-3 col-lg-2 mb-4">
//             <h6><b>Help</b></h6>
//             <ul className="list-unstyled">
//               <li><a href="#" className="text-white" style={{textDecoration: "none", fontSize: "0.9rem"}}>FAQ</a></li>
//               <li><a href="#" className="text-white" style={{textDecoration: "none", fontSize: "0.9rem"}}>Privacy policy</a></li>
//               <li><a href="#" className="text-white" style={{textDecoration: "none", fontSize: "0.9rem"}}>Cookies privacy</a></li>
//               <li><a href="#" className="text-white" style={{textDecoration: "none", fontSize: "0.9rem"}}>Terms of use</a></li>
//               <li><a href="#" className="text-white" style={{textDecoration: "none", fontSize: "0.9rem"}}>Help centre</a></li>
//             </ul>
//           </div>
//           <div className="col-6 col-sm-3 col-lg-2 mb-4">
//             <h6><b>Get the App</b></h6>
//             <ul className="list-unstyled">
//               <li><a href="#" className="text-white" style={{textDecoration: "none", fontSize: "0.9rem"}}>IOS app</a></li>
//               <li><a href="#" className="text-white" style={{textDecoration: "none", fontSize: "0.9rem"}}>Android app</a></li>
//             </ul>
//           </div>
//           <div className="col-6 col-sm-3 col-lg-2 mb-4">
//             <h6><b>Company</b></h6>
//             <ul className="list-unstyled">
//               <li><a href="#" className="text-white" style={{textDecoration: "none", fontSize: "0.9rem"}}>About Us</a></li>
//               <li><a href="#" className="text-white" style={{textDecoration: "none", fontSize: "0.9rem"}}>Blog</a></li>
//               <li><a href="#" className="text-white" style={{textDecoration: "none", fontSize: "0.9rem"}}>Careers</a></li>
//               <li><a href="#" className="text-white" style={{textDecoration: "none", fontSize: "0.9rem"}}>PointMAX</a></li>
//             </ul>
//           </div>
//           <div className="col-6 col-sm-3 col-lg-2 mb-4">
//             <h6><b>Destination</b></h6>
//             <ul className="list-unstyled">
//               <li><a href="#" className="text-white" style={{textDecoration: "none", fontSize: "0.9rem"}}>Cities</a></li>
//               <li><a href="#" className="text-white" style={{textDecoration: "none", fontSize: "0.9rem"}}>Spiritual places</a></li>
//               <li><a href="#" className="text-white" style={{textDecoration: "none", fontSize: "0.9rem"}}>Hill Stations</a></li>
//               <li><a href="#" className="text-white" style={{textDecoration: "none", fontSize: "0.9rem"}}>Solo Travel places</a></li>
//             </ul>
//           </div>
//           <div className="col-12 col-lg-4 mb-4">
//             <h6 className="d-flex justify-content-center"><b>Social Networks</b></h6>
//             <ul className="list-unstyled d-flex justify-content-center p-2">
//               <li className="me-2"><a href="#"><img src="/assets/img/footer social meadia icons/Frame 406.png" alt="Facebook" className="rounded-pill" /></a></li>
//               <li className="me-2"><a href="#"><img src="/assets/img/footer social meadia icons/Frame 407.png" alt="Twitter" className="rounded-pill" /></a></li>
//               <li className="me-2"><a href="#"><img src="/assets/img/footer social meadia icons/Frame 408.png" alt="Instagram" className="rounded-pill" /></a></li>
//               <li className="me-2"><a href="#"><img src="/assets/img/footer social meadia icons/Frame 410.png" alt="LinkedIn" className="rounded-pill" /></a></li>
//               <li className="me-2"><a href="#"><img src="/assets/img/footer social meadia icons/Frame 409.png" alt="YouTube" className="rounded-pill" /></a></li>
//             </ul>
//           </div>
//         </div>
//       </div>
//       <div className="horizontal-line bg-white my-3" style={{height: "1px"}}></div>
//       <h6 className="text-center mx-5 pt-3">&copy; 2023 Sonachala pvt .ltd.</h6>
//     </footer>
//   );
// }

// export default Footer;




import React from 'react';
import { Link } from 'react-router-dom';


import logo from "../assets/image/componetimsges/logo.png";
import componislogo from "../assets/image/componetimsges/footerimg.png";

import smedia1 from "../assets/image/componetimsges/smedia1.png";
import smedia2 from "../assets/image/componetimsges/smedia2.png";
import smedia3 from "../assets/image/componetimsges/smedia3.png";
import smedia4 from "../assets/image/componetimsges/smedia4.png";
import smedia5 from "../assets/image/componetimsges/smedia5.png";



function Footer() {

  return (


    // <footer className="footer pt-4" style={{backgroundColor: "#001524", color: "#ffffff"}}>
    //   <div className="container">
    //     <div className="row">
    //       <div className="col-6 col-sm-3 col-lg-2 mb-4">
    //         <h6><b>Help</b></h6>
    //         <ul className="list-unstyled">
    //           <li><a href="#" className="text-white" style={{textDecoration: "none", fontSize: "0.9rem"}}>FAQ</a></li>
    //           <li><a href="#" className="text-white" style={{textDecoration: "none", fontSize: "0.9rem"}}>Privacy policy</a></li>
    //           <li><a href="#" className="text-white" style={{textDecoration: "none", fontSize: "0.9rem"}}>Cookies privacy</a></li>
    //           <li><a href="#" className="text-white" style={{textDecoration: "none", fontSize: "0.9rem"}}>Terms of use</a></li>
    //           <li><a href="#" className="text-white" style={{textDecoration: "none", fontSize: "0.9rem"}}>Help centre</a></li>
    //         </ul>
    //       </div>
    //       <div className="col-6 col-sm-3 col-lg-2 mb-4">
    //         <h6><b>Get the App</b></h6>
    //         <ul className="list-unstyled">
    //           <li><a href="#" className="text-white" style={{textDecoration: "none", fontSize: "0.9rem"}}>IOS app</a></li>
    //           <li><a href="#" className="text-white" style={{textDecoration: "none", fontSize: "0.9rem"}}>Android app</a></li>
    //         </ul>
    //       </div>
    //       <div className="col-6 col-sm-3 col-lg-2 mb-4">
    //         <h6><b>Company</b></h6>
    //         <ul className="list-unstyled">
    //           <li><a href="#" className="text-white" style={{textDecoration: "none", fontSize: "0.9rem"}}>About Us</a></li>
    //           <li><a href="#" className="text-white" style={{textDecoration: "none", fontSize: "0.9rem"}}>Blog</a></li>
    //           <li><a href="#" className="text-white" style={{textDecoration: "none", fontSize: "0.9rem"}}>Careers</a></li>
    //           <li><a href="#" className="text-white" style={{textDecoration: "none", fontSize: "0.9rem"}}>PointMAX</a></li>
    //         </ul>
    //       </div>
    //       <div className="col-6 col-sm-3 col-lg-2 mb-4">
    //         <h6><b>Destination</b></h6>
    //         <ul className="list-unstyled">
    //           <li><a href="#" className="text-white" style={{textDecoration: "none", fontSize: "0.9rem"}}>Cities</a></li>
    //           <li><a href="#" className="text-white" style={{textDecoration: "none", fontSize: "0.9rem"}}>Spiritual places</a></li>
    //           <li><a href="#" className="text-white" style={{textDecoration: "none", fontSize: "0.9rem"}}>Hill Stations</a></li>
    //           <li><a href="#" className="text-white" style={{textDecoration: "none", fontSize: "0.9rem"}}>Solo Travel places</a></li>
    //         </ul>
    //       </div>
    //       <div className="col-12 col-lg-4 mb-4">
    //         <h6 className="d-flex justify-content-center"><b>Social Networks</b></h6>
    //         <ul className="list-unstyled d-flex justify-content-center p-2">
    //           <li className="me-2"><a href="#"><img src="/assets/img/footer social meadia icons/Frame 406.png" alt="Facebook" className="rounded-pill" /></a></li>
    //           <li className="me-2"><a href="#"><img src="/assets/img/footer social meadia icons/Frame 407.png" alt="Twitter" className="rounded-pill" /></a></li>
    //           <li className="me-2"><a href="#"><img src="/assets/img/footer social meadia icons/Frame 408.png" alt="Instagram" className="rounded-pill" /></a></li>
    //           <li className="me-2"><a href="#"><img src="/assets/img/footer social meadia icons/Frame 410.png" alt="LinkedIn" className="rounded-pill" /></a></li>
    //           <li className="me-2"><a href="#"><img src="/assets/img/footer social meadia icons/Frame 409.png" alt="YouTube" className="rounded-pill" /></a></li>
    //         </ul>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="horizontal-line bg-white my-3" style={{height: "1px"}}></div>
    //   <h6 className="text-center mx-5 pt-3">&copy; 2023 Sonachala pvt .ltd.</h6>
    // </footer>






    <footer className="bg-dark text-white pt-4 pb-2">
      <div className="container-fluid">
        <div className="row text-center text-md-start align-items-start">
          {/* Logo with Social Media below */}
          <div className="col-lg-6 mt-5 mb-md-0">
            <div className="d-flex justify-content-center justify-content-md-start mb-3">
              <img
                src={logo}
                alt="Logo"
                width="300"
                height="200"
                className="rounded-5"
              />
            </div>

            {/* Social Media Icons Row */}
            <div className="d-flex justify-content-center justify-content-md-start mb-5">
              <div className="d-flex gap-4">
                <Link to="/linkedin">
                  <img
                    src={smedia1}
                    alt="LinkedIn"
                    width="50"
                    height="50"
                    style={{ borderRadius: "50%" }}
                  />
                </Link>
                <Link to="/instagram">
                  <img
                    src={smedia2}
                    alt="Instagram"
                    width="50"
                    height="50"
                    style={{ borderRadius: "50%" }}
                  />
                </Link>
                <Link to="/twitter">
                  <img
                    src={smedia3}
                    alt="Twitter"
                    width="50"
                    height="50"
                    style={{ borderRadius: "50%" }}
                  />
                </Link>
                <Link to="/facebook">
                  <img
                    src={smedia4}
                    alt="Facebook"
                    width="50"
                    height="50"
                    style={{ borderRadius: "50%" }}
                  />
                </Link>
                <Link to="/youtube">
                  <img
                    src={smedia5}
                    alt="YouTube"
                    width="50"
                    height="50"
                    style={{ borderRadius: "50%" }}
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* Explore, Company, Help */}
          <div className="col-lg-6 mt-5">
            <div className="row">
              <div className="col-4">
                <h6 className="text-white fw-bold mb-3">EXPLORE</h6>
                <p className="mb-1 small"><Link to="/Support-form" className="text-white text-decoration-none">India Services</Link></p>
                <p className="mb-1 small"><Link to="/Agent" className="text-white text-decoration-none">IRCTC Agent</Link></p>
                <p className="mb-1 small"><Link to="/Agent" className="text-white text-decoration-none">No. 1 B2B</Link></p>
              </div>
              <div className="col-4">
                <h6 className="text-white fw-bold mb-3">COMPANY</h6>
                <p className="mb-1 small"><Link to="/about" className="text-white text-decoration-none">About Us</Link></p>
                <p className="mb-1 small"><Link to="/Hotel-patner" className="text-white text-decoration-none">GST/ MSME Certified</Link></p>
                <p className="mb-1 small"><Link to="/Agent" className="text-white text-decoration-none">Career</Link></p>
              </div>
              <div className="col-4">
                <h6 className="text-white fw-bold mb-3">HELP</h6>
                <p className="mb-1 small"><Link to="/" className="text-white text-decoration-none">Privacy Policy</Link></p>
                <p className="mb-1 small"><Link to="/Agreement-form" className="text-white text-decoration-none">Terms & Conditions</Link></p>
                <p className="mb-1 small"><Link to="/Support-form" className="text-white text-decoration-none">Support</Link></p>
              </div>
            </div>

            {/* Payment/Company Logos Row */}
            <div className="d-flex justify-content-center justify-content-md-end mt-4">
              <img src={componislogo} alt="Paytm" height="60" />
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="text-center mt-3 small text-muted">
          © 2025 SONACHALA Developers Pvt. Ltd.
        </div>
        <div className="text-center">Copyright © 2025 Sonachala All rights reserved.</div>
      </div>

    </footer>








  );
}

export default Footer;
