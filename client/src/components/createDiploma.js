import { Component } from 'react';
import { connect } from 'react-redux';
import '../css/createDiploma.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import beaver from '../assets/img/beaver.png';
import osu_center from '../assets/img/OSU_alumni_center.jpg';



class createDiploma extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        }
    }

    async componentWillReceiveProps(nextProps) {
        console.log('test', nextProps)

        if (nextProps.contract != null && nextProps.account != null) {
            console.log(nextProps.account);
            let admin = await nextProps.contract.methods.admins(nextProps.account).call();
            console.log(admin);

            let form = document.getElementById('form');
            form.style.visibility = admin ? 'visible' : 'hidden';

            if(!admin)
              window.alert("You do not have permission to access this page.");
        }
    }

    InputsAreValid = () => {
        var NameInput = document.getElementById("name");
        var idInput = document.getElementById("id");
        //var graddateInput = document.getElementById("graduation-date");
        var degreeInput = document.getElementById("degree");
        var collegeInput = document.getElementById("college");
        var majorInput = document.getElementById("major");
        var minorInput = document.getElementById("minor");
        var gpaInput = document.getElementById("gpa");
        var creditsInput = document.getElementById("credits");
        var classesInput = document.getElementById("classestaken");
        var selected = [];
        for (var option of classesInput.options) {
            if (option.selected)
                selected.push(option.value);
        }
        console.log(selected.toString());

        var unspliced = selected.toString().split(",");
        console.log(unspliced);

       // console.log(graddateInput.value);
        console.log(idInput.value);
        console.log(majorInput.value);
        console.dir(minorInput.value);
        console.log(gpaInput.value);
        console.log(classesInput.value);
        console.log(creditsInput.value);
        console.log(collegeInput.value);
        console.log(degreeInput.value);
        console.log(NameInput.value);

        if (selected.toString() == "")
            alert("Need atleast 1 class chosen");

  //      else if (graddateInput.value == "" || graddateInput.value == "<Choose graduation date>")
  //          alert("gradinput");

        else if (idInput.value == null || idInput.value == "" || isNaN(idInput.value))
            alert("id input");
        else if (majorInput.value == "true")
            alert("majorinput");
        else if (minorInput.value == "true")
            alert("minorinput");
        else if (gpaInput.value == null || gpaInput.value == "" || isNaN(gpaInput.value))
            alert("gpainput");
        else if (creditsInput.value == null || creditsInput.value == "" || isNaN(creditsInput.value))
            alert("creditsnput");
        else if (classesInput.value == "Select all class taken")
            alert("classesinput");
        else if (collegeInput.value == "default")
            alert("Collegeinput");
        else if (degreeInput.value == "default")
            alert("degreeinput");
        else if (NameInput.value == "Name")
            alert("Nameinput");
        else {
            return true;
        }
        return false;
    }

    submit = async (e) => {

      e.preventDefault();
      //account, contract may be null
      //this.props.account;
      if (this.InputsAreValid() && this.props.contract && this.props.account) {
          send();
          var adminid = 1;
          var name = document.getElementById("name").value;
          var id = document.getElementById("id").value;
          var gradate = this.state.date.toDateString();
          var degree = document.getElementById("degree").value;
          var college = document.getElementById("college").value;
          var major = document.getElementById("major").value;
          var minor = document.getElementById("minor").value;
          var gpa = Math.round(document.getElementById("gpa").value * 100);
          console.log(gpa)
          var credits = document.getElementById("credits").value;
          var classes = document.getElementById("classestaken");
          var selected = [];
          for (var option of classes.options) {
              if (option.selected)
                  selected.push(option.value);
          }
          var graduated = true;

     //     let gasLimit = await this.state.contract.methods.Add(adminid, id, name, gradate, degree, college, major, minor, gpa, credits, graduated).estimateGas({
  //            from: this.state.account
    //      });
     //     let gasPrice = await window.web3.eth.getGasPrice();
     //     console.log('gasLimit:', gasLimit);
      //    console.log('gasPrice:', gasPrice);
          // console.log('gasPrice:', window.web3.utils.toWei('20', 'gwei'))
                                                        //Add(uint id, string memory _name, string memory _date, string memory _degree, string memory _college, string memory _major, string memory _minor, uint _GPA, uint _credits, bool _graduated, string memory classes) 
          let result = await this.props.contract.methods.Add( id, name, "graddate", degree, college, major, minor, gpa, credits, graduated, selected.toString()).send({
              from: this.props.account
          });
          console.log(result);
          //await this.loadWordChain();
          //await this.checkAdded();
      }
 }

  render() {
    return (
      <div className="add-grad-page">
      <form id='form' style={{visibility: 'hidden'}} onSubmit={this.submit}>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
        <script src="https://cdn.rawgit.com/harvesthq/chosen/gh-pages/chosen.jquery.min.js"></script>
        <link href="https://cdn.rawgit.com/harvesthq/chosen/gh-pages/chosen.min.css" rel="stylesheet" />
          <div className="orangeBox grid-parent" style={{background: 'rgba(215,63,9)', boxShadow: '2px 3px 10px 3px rgba(52,58,64,0.8)', position: 'absolute', width: '66.67%', height: '75%', marginTop: '9%', marginLeft: '16.67%', marginRight: '16.67%', marginBottom: '6%', borderRadius: '5px', opacity: '0.90'}}>
            <div>
              <div className="wrapper"> 
                <div className="holder" style={{height: '60%'}}><img src={beaver} style={{marginTop: '-2%', marginLeft: '33.33%', height: '100%'}} /></div>
                <div className="holder">
                  <p style={{textAlign: 'center', color: 'rgb(255,255,255)', fontSize: '18px', fontWeight: 'bold'}}>Add new graduating student</p>
                  <p style={{marginTop: '-2%', marginLeft: '18%', color: 'rgb(255,255,255)', marginRight: '18%', fontSize: '12px', textAlign: 'center', marginBottom: '0%'}}>Enter the new graduating student's information listed here. Once you are done click the 'confirm' button.</p>
                            </div>
                            <div className="holder" bottom="5%"><label className="category container">Name</label><input className="form-control dataEntry container" type="text" defaultValue="name" id="name" /></div>
                <div className="holder" bottom="5%"><label className="category container">Id</label><input className="form-control dataEntry container" type="number" max={999999999} min={100000000} defaultValue="Id (9-digits)" id="id" /></div>

                            <div className="holder" bottom="15%"><label className="category container">Graduation Date</label>
                                <DatePicker style={{marginLeft: '500px'}} id="datepickr" className="form-control dataEntry container" selected={this.state.date} onChange={date => this.setState({ date: date })} /> 
                            </div>
                <div className="holder"><label className="category">Classes Taken</label><select className="form-control dataEntry" multiple id="classestaken">
                    <optgroup label="Baccore">
                        <option value="WR 121">WR 121</option>
                        <option value="HHS 231">HHS 231</option>
                        <option value="MTH 105">MTH 105</option>
                        <option value="COMM 111">COMM 111</option>
                        <option value="BI 101">BI 101</option>
                        <option value="CH 122">CH 122</option>
                        <option value="ECON 201">ECON 201</option>
                        <option value="HST 101">HST 101</option>
                        <option value="CS 391">CS 391</option>
                    </optgroup>
                </select></div>
              </div>
            </div>
            <div>
              <div className="wrapper">
                <div className="holder" margin-top="6%"><label className="category">College</label><select className="form-control dataEntry" id="college">
                    <optgroup label="This is a group">
                      <option value="default" selected>&lt;Select college&gt;</option>
                      <option value="Agricultural Sciences">Agricultural Sciences</option>
                      <option value="Business">Business</option>
                      <option value="Earth, Ocean, and Atmospheric Sciences">Earth, Ocean, and Atmospheric Sciences</option>
                      <option value="Education">Education</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Forestry">Forestry</option>
                      <option value="Graduate School">Graduate School</option>
                      <option value="Liberal Arts">Liberal Arts</option>
                      <option value="Pharmacy">Pharmacy</option>
                      <option value="Public Health and Human Sciences">Public Health and Human Sciences</option>
                      <option value="Science">Science</option>
                      <option value>Veterinary Medicine</option>
                    </optgroup>
                  </select></div>
                <div className="holder"><label className="category">Major</label><select className="form-control dataEntry" id="major">
                    <optgroup label="This is a group">
                        <option value selected>&lt;Select major&gt;</option>
                        <option value="Agricultural and food business management">Agricultural and food business management</option>
                        <option value="Animal Sciences">Animal Sciences</option>
                        <option value="Anthropology">Anthropology</option>
                        <option value="Biology">Biology</option>
                        <option value="Botany">Botany</option>
                        <option value="Business">Business</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Comparative international agriculture">Comparative international agriculture</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Earth sciences">Earth sciences</option>
                        <option value="Economics">Economics</option>
                        <option value="Education">Education</option>
                        <option value="Environmental economics and policy">Environmental economics and policy</option>
                        <option value="Environmental law and policy">Environmental law and policy</option>
                        <option value="Environmental and occupational health">Environmental and occupational health</option>
                        <option value="Environmental sciences">Environmental sciences</option>
                        <option value="Ethnic studies">Ethnic studies</option>
                        <option value="Fisheries and wildlife sciences">Fisheries and wildlife sciences</option>
                        <option value="French">French</option>
                        <option value="Geography">Geography</option>
                        <option value="German">German</option>
                        <option value="Global health">Global health</option>
                        <option value="Graphic design">Graphic design</option>
                        <option value="Health management and policy">Health management and policy</option>
                        <option value="History">History</option>
                        <option value="Horticulture">Horticulture</option>
                        <option value="Human development and family sciences">Human development and family sciences</option>
                        <option value="Leadership">Leadership</option>
                        <option value="Marine conservation and management">Marine conservation and management</option>
                        <option value="Microbiology">Microbiology</option>
                        <option value="Military history">Military history</option>
                        <option value="Natural resources">Natural resources</option>
                        <option value="Organizational leadership">Organizational leadership</option>
                        <option value="Philosophy">Philosophy</option>
                        <option value="Political science">Political science</option>
                        <option value="Popular music studies">Popular music studies</option>
                        <option value="Psychology">Psychology</option>
                        <option value="Public health">Public health</option>
                        <option value="Queer studies">Queer studies</option>
                        <option value="Religious studies">Religious studies</option>
                        <option value="Spanish">Spanish</option>
                        <option value="Sociology">Sociology</option>
                        <option value="Sustainability">Sustainability</option>
                        <option value="Women, gender, and sexuality studies">Women, gender, and sexuality studies</option>
                        <option value="Writing">Writing</option>
                    </optgroup>
                  </select></div>
                <div className="holder"><label className="category">Minor</label><select className="form-control dataEntry" id="minor">
                    <optgroup label="This is a group">
                      <option value selected>&lt;Select minor&gt;</option>
                      <option value="Agricultural and food business management">Agricultural and food business management</option>
                      <option value="Animal Sciences">Animal Sciences</option>
                      <option value="Anthropology">Anthropology</option>
                      <option value="Biology">Biology</option>
                      <option value="Botany">Botany</option>
                      <option value="Business">Business</option>
                      <option value="Chemistry">Chemistry</option>
                      <option value="Comparative international agriculture">Comparative international agriculture</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Eath sciences">Earth sciences</option>
                      <option value="Economics">Economics</option>
                      <option value="Education">Education</option>
                      <option value="Environmental economics and policy">Environmental economics and policy</option>
                      <option value="Environmental law and policy">Environmental law and policy</option>
                      <option value="Environmental and occupational health">Environmental and occupational health</option>
                      <option value="Environmental sciences">Environmental sciences</option>
                      <option value="Ethnic studies">Ethnic studies</option>
                      <option value="Fisheries and wildlife sciences">Fisheries and wildlife sciences</option>
                      <option value="French">French</option>
                      <option value="Geography">Geography</option>
                      <option value="German">German</option>
                      <option value="Global health">Global health</option>
                      <option value="Graphic design">Graphic design</option>
                      <option value="Health management and policy">Health management and policy</option>
                      <option value="History">History</option>
                      <option value="Horticulture">Horticulture</option>
                      <option value="Human development and family sciences">Human development and family sciences</option>
                      <option value="Leadership">Leadership</option>
                      <option value="Marine conservation and management">Marine conservation and management</option>
                      <option value="Microbiology">Microbiology</option>
                      <option value="Military history">Military history</option>
                      <option value="Natural resources">Natural resources</option>
                      <option value="Organizational leadership">Organizational leadership</option>
                      <option value="Philosophy">Philosophy</option>
                      <option value="Political science">Political science</option>
                      <option value="Popular music studies">Popular music studies</option>
                      <option value="Psychology">Psychology</option>
                      <option value="Public health">Public health</option>
                      <option value="Queer studies">Queer studies</option>
                      <option value="Religious studies">Religious studies</option>
                      <option value="Spanish">Spanish</option>
                      <option value="Sociology">Sociology</option>
                      <option value="Sustainability">Sustainability</option>
                      <option value="Women, gender, and sexuality studies">Women, gender, and sexuality studies</option>
                      <option value="Writing">Writing</option>
                    </optgroup>
                  </select></div>
                <div className="holder"><label className="category">Cumulative GPA</label><input type="checkbox" className="form-control dataEntry" type="number" id="gpa" max={4.0} min={0.0} step="0.01" /></div>
                    <div className="holder"><label className="category">Credits Completed</label><input className="form-control dataEntry" type="number" id="credits" min={0} /></div>
                    <div className="holder" bottom="5%"><label className="category">Degree</label><select className="form-control dataEntry" id="degree">
                        <optgroup label="This is a group">
                            <option value="default" selected>&lt;Select degree&gt;</option>
                            <option value="Associate Degree">Associate Degree</option>
                            <option value="Bachelor's Degree">Bachelor's Degree</option>
                            <option value="Graduate Degree">Graduate Degree</option>
                        </optgroup>
                    </select></div>
                <div className="holder"><label className="category">Confirm</label><button className="btn btn-primary dataEntry" type="submit">Confirm</button></div>
              </div>
            </div>
          </div>
        </form><img src={osu_center} style={{width: '100%', height: '100%'}} />
      </div>
    )
  };
}

function send() {
    console.log("Sendit!!!");
}


function mapStateToProps(state) {
    return {
        web3: state.web3,
        account: state.account,
        contract: state.contract
    }
}

export default connect(mapStateToProps)(createDiploma);
