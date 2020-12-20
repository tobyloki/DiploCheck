import { Component } from 'react';
import { connect } from 'react-redux';
import Web3 from 'web3';
import Diploma from '../contracts/Diploma.json';


import '../css/checkDiploma.css';
import '../css/ExpandSearch.css';

import logo from '../assets/img/logo.png';
import user from '../assets/img/user.png';
import admin from '../assets/img/Admin.png';
import search from '../assets/img/search.png';


class Navbar extends Component {
  async componentDidMount() {
    let success = await this.loadWeb3();
    if(success){
      await this.fetchAccount();
      await this.loadContract();

      if(window.ethereum){
        window.ethereum.on('accountsChanged', async (accounts) => {
          this.props.setAccount(accounts[0]);
        });
      }
    }
  }

  loadWeb3 = async () => {
    let web3;

    if(window.ethereum){
      web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    else if(window.web3){
      web3 = new Web3(window.web3.currentProvider);
    }
    else{
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
      return false;
    }

    this.props.setWeb3(web3);
    return true;
  }

  fetchAccount = async () => {
    const accounts = await this.props.web3.eth.getAccounts();
    this.props.setAccount(accounts[0]);
  }

  loadContract = async () => {
    const networkId = await this.props.web3.eth.net.getId();
    const networkData = Diploma.networks[networkId];
    if(networkData){
      const contract = new this.props.web3.eth.Contract(Diploma.abi, networkData.address);
      this.props.setContract(contract);
    } else {
      window.alert('Diploma contract not deployed to detected network!');
    }
    }



    clickadmin = (e) => {
        e.preventDefault();
        console.log("HI");
        window.location = '/creatediploma'
    }
    
    closeadmin = (e) => {
        e.preventDefault();
            document.getElementById("admincontainer").style.visibility = "hidden";
    }

    validate = (e) => {
        e.preventDefault();
        var input = document.getElementById("expandablesearch").value
        console.log(input);
        if (isNaN(input))
            alert("must search the student id!");
        else {
            console.log('checkdiploma?id=' + input);
            window.location = 'checkdiploma?id=' + input;
        }
    }
    temp = (e) => {
        e.preventDefault();
        setTimeout(function () {
            document.getElementById("admincontainer").style.visibility = "visible";
        }, 500); 
    }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark navbar-expand-lg fixed-top bg-white portfolio-navbar osuColoring" style={{borderColor: 'rgb(215,63,9)'}}>
          <div className="container OSUImageContainer"><img id="OsuImage" src={logo} /><button data-toggle="collapse" className="navbar-toggler" data-target="#navbarNav"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon" /></button>
            <div className="collapse navbar-collapse MoveLeft" id="navbarNav" width="400px">
              <ul className="nav navbar-nav ml-auto">
                    <li id="admincontainer" className="nav-item padright"><button className="btn btn-primary headerbtn" id="adminbtn" onClick={this.clickadmin} type="button" src="assets/img/avatar.png" style={{ borderColor: 'rgb(215,63,9)', background: 'rgb(215,63,9)' }}><img className="padright" src={admin} style={{ paddingTop: '0px' }} /><img id="AvatarImg-1" src={user} style={{ width: '50px' }} /></button></li>
                    <li className="nav-item">          <div style={{ textAlign: 'right' }}>
                        <form onSubmit={this.validate} onBlur={this.temp}>
                            <input id="expandablesearch" type="search" placeholder="Search"  onClick={this.closeadmin} />
                        </form>
                    </div> </li>
              </ul>
            </div>
          </div>
            </nav>
        </div>

    )
  };
}
//



function mapStateToProps(state){
  return {
    web3: state.web3,
    account: state.account,
    contract: state.contract
  }
}

function mapDispatchToProps(dispatch){
  return {
    setWeb3: (value) => {
      const action = { type: 'setWeb3', value: value };
      dispatch(action);
    },
    setAccount: (value) => {
      const action = { type: 'setAccount', value: value };
      dispatch(action);
    },
    setContract: (value) => {
      const action = { type: 'setContract', value: value };
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
