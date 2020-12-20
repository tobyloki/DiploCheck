import { Component } from 'react';
import { connect } from 'react-redux';
import '../css/createDiploma.css';
import '../css/checkDiploma.css';
import '../css/modal.css';
import Web3 from 'web3';
import Diploma from '../contracts/Diploma.json';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import plaque from '../assets/img/plaque.png';
import certImg from '../assets/img/CertImg.png';
import edit from '../assets/img/edit.png';
import deleteIcon from '../assets/img/delete.png';
import line1 from '../assets/img/Line_1.png';
import checkMark from '../assets/img/check_mark.png';
import line2 from '../assets/img/Line_2.png';

class checkDiploma extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            id: 0,
            exists: false,
            name: 'No student',
            graduationDate: '3000-1-1',
            newDate: new Date(),
            degree: 'No Degree',
            college: 'No college',
            major: 'No major',
            minor: 'No minor',
            GPA: 0,
            credits: 0,
            graduated: false,
            classesTaken: 'No Classes Taken'
        }
    }

    handleClickEdit = async () => {
        if (this.state.editing && this.InputsAreValid() && this.props.contract != null) {
            var temp = this.state.GPA;
            this.setState({ GPA: Math.round(temp * 100) });
            console.log('sending updated student details');
            let result = await this.props.contract.methods.Edit(this.state.id, this.state.name, this.state.graduationDate, this.state.degree, this.state.college, this.state.major, this.state.minor, Math.round(this.state.GPA*100), this.state.credits, this.state.graduated, this.state.classesTaken).send({
                from: this.props.account
            });
            console.log(result);
        } else {
            console.log('edit mode');
        }

        this.setState(state => ({
            editing: !state.editing
        }));
    }

    handleClickDelete = async () => {
        await window.alert("Are you sure you want to delete student: " + this.state.id);
        let result = await this.props.contract.methods.Delete(this.state.id).send({
            from: this.props.account
        });
        console.log(result);
        window.location.reload()
    }

    async componentDidMount() {
        /* modal to display classes*/
        var modal = document.getElementById("displayClasses");
        var btn = document.getElementById("openModal");
        var span = document.getElementsByClassName("close")[0];
        btn.onclick = function () {
            modal.style.display = "block";
        }
        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
        }
    }

    async componentWillReceiveProps(nextProps) {
        console.log('test', nextProps)
        console.log(nextProps.contract);

        if (nextProps.contract != null && nextProps.account != null) {
            console.log(nextProps.account);
            let admin = await nextProps.contract.methods.admins(nextProps.account).call();
            console.log(admin);

            let adminEdit = document.getElementById('adminEdit');
            let adminDelete = document.getElementById('adminDelete');
            adminEdit.style.visibility = admin ? 'visible' : 'hidden';
            adminDelete.style.visibility = admin ? 'visible' : 'hidden';
        }

        if (nextProps.contract != null) {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const id = urlParams.get('id');
            console.log(id);
            if (id != undefined && !isNaN(id)) {
                let student = await nextProps.contract.methods.students(parseInt(id)).call();
                console.log("student: ");
                console.log(student);
                if (student.exists)
                    this.setStudentValues(id, student);
                else
                    window.alert("No student with that id!");
                console.log("Invalid id")
            } else {
                window.alert("Id entered is not a number");
                console.log("Invalid id")
            }
        } else {
            console.log("CONTRACT NOT LOADED");
        }
    }

    setStudentValues = async (id, student) => {
        this.setState({
            id: id,
            exists: student.exists,
            name: student.name,
            graduationDate: student.graduationDate,
            degree: student.degree,
            college: student.college,
            major: student.major,
            minor: student.minor,
            GPA: student.GPA,
            credits: student.credits,
            graduated: student.graduated,
            classesTaken: student.classesTaken
        });
    }

    hasGraduated = () => {
        if (this.state.graduated) {
            return (
                <div>
                    <p className="WhiteUnderlined">Graduated</p><img src={checkMark} />
                </div>
            );
        } else {
            return (
                <div>
                    <p className="WhiteUnderlined">Has NOT Graduated</p>
                </div>
            );
        }
    }

    calculateGPA = () => {
        return (parseFloat(this.state.GPA / 100)).toFixed(2);
    }

    getGraduationDate = () => {
        if (this.state.graduated) {
            return (
                <div>
                    <p className="WhiteUnderlined">Graduated On</p>
                </div>
            );
        } else {
            return (
                <div>
                    <p className="WhiteUnderlined">Planned Graduation Date</p>
                </div>
            );
        }
    }

    InputsAreValid = () => {
        console.log("inputsarevalid is called");
        var NameInput = this.state.name
        //var graddateInput = document.getElementById("graduation-date");
        var degreeInput = this.state.degree;
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
        this.setState({ classesTaken: selected.toString() });

        console.log(this.state.classesTaken);

        if (selected.toString() == "")
            alert("Need atleast 1 class chosen");
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

    render() {
        return (
            <div>

                <main className="page lanidng-page">
                    <section id="CertificateFinalBackdrop">
                        <section id="CertificateBackdrop" />
                        <div id="CertContainer">
                            <div id="CertContain" style={{ opacity: 1, background: '#f2e3bce1', borderRadius: '25px', boxShadow: '10px 10px 20px 0px rgb(54,55,56)' }}>
                                <div id="CertImgContainer1"><img id="PlacqueImg" src={plaque} style={{ opacity: 1 }} /></div>
                                <div id="CertImgContainer2"><img id="CertImg" src={certImg} style={{ opacity: 1 }} /><div id="NameDiv"><p id="StudentCertName">{this.state.name}</p></div></div>
                            </div>
                        </div>
                    </section>
                    <section id="InfoBackdrop">
                        <section id="DarkerBackdrop">
                            <div id="student_name_options">
                                <div className="smallcenter topsmallcenter">
                                    <div style={{ position: 'absolute', width: '50%', display: 'inline-block', height: 'inherit', bottom: 0 }}>
                                        {
                                            this.state.editing ?
                                                <input className="form-control pushDown container" type="text" id="name" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} /> :
                                                <p className="LargeWhite">{this.state.name}</p>
                                        }
                                        <p className="TinyWhite">{this.state.id}</p>
                                    </div>
                                    <button id='adminEdit' className="btn btn-primary clearbtn" type="button" style={{ position: 'absolute', bottom: '5%', left: '55%', borderColor: '#00000000', background: '#00000000' }} onClick={this.handleClickEdit}><img src={edit} />
                                        {this.state.editing ? 'DONE' : 'EDIT'}
                                    </button>
                                    <button id='adminDelete' className="btn btn-primary clearbtn" type="button" style={{ position: 'absolute', bottom: '5%', left: '70%', background: '#00000000', borderColor: '#00000000' }} onClick={this.handleClickDelete}><img src={deleteIcon} /></button>
                                    <div />
                                </div>
                                <div className="smallcenter bottomsmallcenter"><img src={line1} /></div>
                            </div>
                            <div id="student_info">
                                <div className="inlinepair">
                                    <div className="Infopoints moveright">
                                        {this.hasGraduated()}
                                    </div>
                                    <div className="Infopoints moveright" />
                                    <div className="Infopoints moveright">
                                        <p className="WhiteUnderlined">Degree</p>
                                        {
                                            this.state.editing ?
                                                <div>
                                                    <select className="form-control noRight" id="degree" value={this.state.degree} onChange={e => this.setState({ degree: e.target.value })}>
                                                    <optgroup label="This is a group">
                                                        <option value="default" selected>&lt;Select degree&gt;</option>
                                                        <option value="Associate Degree">Associate's</option>
                                                        <option value="Bachelor's Degree">Bachelor's</option>
                                                        <option value="Graduate Degree">Graduate's Degree</option>
                                                    </optgroup>
                                                </select> </div> :
                                                <p className="smallwhite">{this.state.degree}</p>
                                        }
                                    </div>
                                    <div className="Infopoints moveright" />
                                    <div className="Infopoints moveright">
                                        <p className="WhiteUnderlined">Major</p>
                                        {
                                            this.state.editing ?
                                                <div><select className="form-control noRight" id="major" value={this.state.major}  onChange={e => this.setState({ major: e.target.value })}>
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
                                                </select></div>:
                                                <p className="smallwhite">{this.state.major}</p>
                                        }
                                    </div>
                                    <div className="Infopoints moveright" />
                                    <div className="Infopoints moveright">
                                        <p className="WhiteUnderlined">Cumulative GPA</p>
                                        {
                                            this.state.editing ?
                                                <div ><input type="checkbox" className="form-control noRight" type="number" id="gpa" max={4.0} min={0.0} step="0.01" onChange={e => this.setState({ GPA: e.target.value })}/></div>:
                                                <p className="smallwhite">{this.calculateGPA()}</p>
                                        }
                                    </div>
                                    <div className="Infopoints moveright" />
                                    <div className="Infopoints moveright">
                                        <p className="WhiteUnderlined">Courses Completed</p><button className="smallorangelink modalButton" id="openModal">Click to view list</button>
                                        <div id="displayClasses" className="modal">
                                            <div className="modal-header">
                                                <h2>Classes Taken</h2>
                                                <span className="close">&times;</span>
                                            </div>
                                            <div className="modal-content">
                                                <p className="smallwhite">{this.calculateGPA()}</p>
                                                {
                                                    this.state.editing ?
                                                        <div ><select style={{ marginLeft: '0px'}} className="form-control noRight " multiple id="classestaken">
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
                                                        </select></div> :
                                                        <p>{this.state.classesTaken}</p>
                                                }
                                            </div>
                                            <div className="modal-header" style={{ padding: '30px' }}></div>
                                        </div>
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
                                        {this.getGraduationDate()}
                                        {
                                            this.state.editing ?
                                                <div className="holder noLeft" bottom="15%">
                                                    <DatePicker  style={{ marginLeft: '0px', Width: '25vw' }}  className="form-control noLeft container" selected={ this.state.newDate} onChange={date => this.setState({ newDate: date })} />
                                                </div>
                                                 :
                                                <p className="smallwhite">{this.state.graduationDate}</p>
                                        }
                                    </div>
                                    <div className="Infopoints" />
                                    <div className="Infopoints">
                                        <p className="WhiteUnderlined">College</p>
                                        {
                                            this.state.editing ?
                                                <div className="holder noLeft" margin-top="6%"><select className="form-control noLeft" id="college" value={this.state.college} onChange={e => this.setState({ college: e.target.value })}>
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
                                                </select></div>:
                                                <p className="smallwhite">{this.state.college}</p>
                                        }
                                    </div>
                                    <div className="Infopoints" />
                                    <div className="Infopoints">
                                        <p className="WhiteUnderlined">Minor</p>
                                        {
                                            this.state.editing ?
                                                <div className="holder noLeft"><select className="form-control noLeft" id="minor" value={this.state.minor} onChange={e => this.setState({ minor: e.target.value })}>
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
                                                </select></div>:
                                                <p className="smallwhite">{this.state.minor}</p>
                                        }
                                    </div>
                                    <div className="Infopoints" />
                                    <div className="Infopoints">
                                        <p className="WhiteUnderlined">Credits Completed</p>
                                        {
                                            this.state.editing ?
                                                <div className="holder noLeft"><input className="form-control noLeft" type="number" id="credits" min={0} value={this.state.credits} onChange={e => this.setState({ credits: e.target.value })}/></div>
                                                : <p className="smallwhite">{this.state.credits}</p>
                                        }
                                    </div>
                                    <div className="Infopoints" />
                                </div>
                            </div>
                        </section>
                    </section>
                </main>
            </div>
        )
    }
};


function mapStateToProps(state) {
    return {
        web3: state.web3,
        account: state.account,
        contract: state.contract
    }
}

export default connect(mapStateToProps)(checkDiploma);
