import { Component } from 'react';
import { connect } from 'react-redux';
import '../css/createDiploma.css';
import '../css/checkDiploma.css';
import '../css/modal.css';
import Web3 from 'web3';
import Diploma from '../contracts/Diploma.json';

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
        if (this.state.editing) {
            console.log('sending updated student details');
            let result = await this.props.contract.methods.Edit(this.state.id, this.state.name, this.state.graduationDate, this.state.degree, this.state.college, this.state.major, this.state.minor, this.state.GPA, this.state.credits, this.state.graduated, this.state.classesTaken).send({
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
        window.alert("button wants to delete student " + this.state.id);
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
                                                <input className="form-control dataEntry" type="name" name="student-name" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} /> :
                                                <p className="LargeWhite">{this.state.name}</p>
                                        }
                                        <p className="TinyWhite">{this.state.id}</p>
                                    </div>
                                    <button className="btn btn-primary clearbtn" type="button" style={{ position: 'absolute', bottom: '5%', left: '55%', borderColor: '#00000000', background: '#00000000' }} onClick={this.handleClickEdit}><img src={edit} />
                                        {this.state.editing ? 'DONE' : 'EDIT'}
                                    </button>
                                    <button className="btn btn-primary clearbtn" type="button" style={{ position: 'absolute', bottom: '5%', left: '70%', background: '#00000000', borderColor: '#00000000' }} onClick={this.handleClickDelete}><img src={deleteIcon} /></button>
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
                                                <input className="form-control noRight" type="name" name="student-degree" value={this.state.degree} onChange={e => this.setState({ degree: e.target.value })} /> :
                                                <p className="smallwhite">{this.state.degree}</p>
                                        }
                                    </div>
                                    <div className="Infopoints moveright" />
                                    <div className="Infopoints moveright">
                                        <p className="WhiteUnderlined">Major</p>
                                        {
                                            this.state.editing ?
                                                <input className="form-control noRight" type="name" name="student-major" value={this.state.major} onChange={e => this.setState({ major: e.target.value })} /> :
                                                <p className="smallwhite">{this.state.major}</p>
                                        }
                                    </div>
                                    <div className="Infopoints moveright" />
                                    <div className="Infopoints moveright">
                                        <p className="WhiteUnderlined">Cumulative GPA</p>
                                        {
                                            this.state.editing ?
                                                <input className="form-control noRight" type="name" name="student-GPA" value={this.state.GPA} onChange={e => this.setState({ GPA: e.target.value })} /> :
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
                                                        <input className="form-control noRight" type="name" name="student-classesTaken" value={this.state.classesTaken} onChange={e => this.setState({ classesTaken: e.target.value })} /> :
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
                                                <input className="form-control noLeft" type="name" name="student-graduationDate" value={this.state.graduationDate} onChange={e => this.setState({ graduationDate: e.target.value })} /> :
                                                <p className="smallwhite">{this.state.graduationDate}</p>
                                        }
                                    </div>
                                    <div className="Infopoints" />
                                    <div className="Infopoints">
                                        <p className="WhiteUnderlined">College</p>
                                        {
                                            this.state.editing ?
                                                <input className="form-control noLeft" type="name" name="student-college" value={this.state.college} onChange={e => this.setState({ college: e.target.value })} /> :
                                                <p className="smallwhite">{this.state.college}</p>
                                        }
                                    </div>
                                    <div className="Infopoints" />
                                    <div className="Infopoints">
                                        <p className="WhiteUnderlined">Minor</p>
                                        {
                                            this.state.editing ?
                                                <input className="form-control noLeft" type="name" name="student-minor" value={this.state.minor} onChange={e => this.setState({ minor: e.target.value })} /> :
                                                <p className="smallwhite">{this.state.minor}</p>
                                        }
                                    </div>
                                    <div className="Infopoints" />
                                    <div className="Infopoints">
                                        <p className="WhiteUnderlined">Credits Completed</p>
                                        {
                                            this.state.editing ?
                                                <input className="form-control noLeft " type="name" name="student-credits" value={this.state.credits} onChange={e => this.setState({ credits: e.target.value })} /> :
                                                <p className="smallwhite">{this.state.credits}</p>
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
