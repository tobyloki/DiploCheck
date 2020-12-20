import { Component } from 'react';
import { connect } from 'react-redux';
import '../css/checkDiploma.css';

import plaque from '../assets/img/plaque.png';
import certImg from '../assets/img/CertImg.png';
import edit from '../assets/img/edit.png';
import deleteIcon from '../assets/img/delete.png';
import line1 from '../assets/img/Line_1.png';
import checkMark from '../assets/img/check_mark.png';
import line2 from '../assets/img/Line_2.png';

class checkDiploma extends Component {
  render() {
    return (
      <div>
        <main className="page lanidng-page">
          <section id="CertificateFinalBackdrop">
            <section id="CertificateBackdrop" />
            <div id="CertContainer">
              <div id="CertContain" style={{opacity: 1, background: '#f2e3bce1', borderRadius: '25px', boxShadow: '10px 10px 20px 0px rgb(54,55,56)'}}>
                <div id="CertImgContainer1"><img id="PlacqueImg" src={plaque} style={{opacity: 1}} /></div>
                <div id="CertImgContainer2"><img id="CertImg" src={certImg} style={{opacity: 1}} /></div>
              </div>
            </div>
          </section>
          <section id="InfoBackdrop">
            <section id="DarkerBackdrop">
              <div id="student_name_options">
                <div className="smallcenter topsmallcenter">
                  <div style={{position: 'absolute', width: '50%', display: 'inline-block', height: 'inherit', bottom: 0}}>
                    <p className="LargeWhite">Jordan Thompson</p>
                    <p className="TinyWhite">#123456</p>
                  </div><button className="btn btn-primary clearbtn" type="button" style={{position: 'absolute', bottom: '5%', left: '55%', borderColor: '#00000000', background: '#00000000'}}><img src={edit} /></button><button className="btn btn-primary clearbtn" type="button" style={{position: 'absolute', bottom: '5%', left: '66%', background: '#00000000', borderColor: '#00000000'}}><img src={deleteIcon} /></button>
                  <div />
                </div>
                <div className="smallcenter bottomsmallcenter"><img src={line1} /></div>
              </div>
              <div id="student_info">
                <div className="inlinepair">
                  <div className="Infopoints moveright">
                    <p className="WhiteUnderlined">Graduated</p><img src={checkMark} />
                  </div>
                  <div className="Infopoints moveright" />
                  <div className="Infopoints moveright">
                    <p className="WhiteUnderlined">Degree</p>
                    <p className="smallwhite">Four Year Undergraduate</p>
                  </div>
                  <div className="Infopoints moveright" />
                  <div className="Infopoints moveright">
                    <p className="WhiteUnderlined">Major</p>
                    <p className="smallwhite">Electrical and Computer Engineering</p>
                  </div>
                  <div className="Infopoints moveright" />
                  <div className="Infopoints moveright">
                    <p className="WhiteUnderlined">Cumulative GPA</p>
                    <p className="smallwhite">3.5</p>
                  </div>
                  <div className="Infopoints moveright" />
                  <div className="Infopoints moveright">
                    <p className="WhiteUnderlined">Courses Completed</p><a className="smallorangelink" href="#">Click to view list</a>
                  </div>
                </div>
                <div className="inlinesmall"><img id="greenline" src={line2} />
                  <div className="Infopoints TypographicContainer">
                    <p className="Typographic">•<br /></p>
                  </div>
                  <div className="Infopoints TypographicContainer">
                    <p className="Typographic">•<br /></p>
                  </div>
                  <div className="Infopoints TypographicContainer">
                    <p className="Typographic">•<br /></p>
                  </div>
                  <div className="Infopoints TypographicContainer">
                    <p className="Typographic">•<br /></p>
                  </div>
                  <div className="Infopoints TypographicContainer">
                    <p className="Typographic">•<br /></p>
                  </div>
                  <div className="Infopoints TypographicContainer">
                    <p className="Typographic">•<br /></p>
                  </div>
                  <div className="Infopoints TypographicContainer">
                    <p className="Typographic">•<br /></p>
                  </div>
                  <div className="Infopoints TypographicContainer">
                    <p className="Typographic">•<br /></p>
                  </div>
                  <div className="Infopoints TypographicContainer">
                    <p className="Typographic">•<br /></p>
                  </div>
                </div>
                <div className="inlinepair">
                  <div className="Infopoints" />
                  <div className="Infopoints">
                    <p className="WhiteUnderlined">Graduation Date</p>
                    <p className="smallwhite">September 28, 2001</p>
                  </div>
                  <div className="Infopoints" />
                  <div className="Infopoints">
                    <p className="WhiteUnderlined">College</p>
                    <p className="smallwhite">Oregon State University</p>
                  </div>
                  <div className="Infopoints" />
                  <div className="Infopoints">
                    <p className="WhiteUnderlined">Minor</p>
                    <p className="smallwhite">Computer Science</p>
                  </div>
                  <div className="Infopoints" />
                  <div className="Infopoints">
                    <p className="WhiteUnderlined">Credits Completed</p>
                    <p className="smallwhite">185</p>
                  </div>
                  <div className="Infopoints" />
                </div>
              </div>
            </section>
          </section>
        </main>
        <footer className="page-footer">
          <div className="container">
            <div className="links"><a href="#">About me</a><a href="#">Contact me</a><a href="#">Projects</a></div>
          </div>
        </footer>
      </div>
    )
  };
}

function mapStateToProps(state){
  return {
    web3: state.web3,
    account: state.account,
    contract: state.contract
  }
}

export default connect(mapStateToProps)(checkDiploma);
