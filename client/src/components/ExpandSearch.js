import { Component } from 'react';

import '../css/ExpandSearch.css';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class ExpandSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      name: 'Joe',
      date: new Date()
    }
  }

  handleClick = () => {
    if(this.state.editing){
      console.log('sending updated student details');
    } else {
      console.log('edit mode');
    }

    this.setState(state => ({
      editing: !state.editing
    }));
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>
          {this.state.editing ? 'DONE' : 'EDIT'}
        </button>
        {
          this.state.editing ?
          <input className="form-control dataEntry" type="name" name="gpa" value={this.state.name} onChange={e => this.setState({name: e.target.value})}/> :
          <p>{this.state.name}</p>
        }
        <form>
          <DatePicker selected={this.state.date} onChange={date => this.setState({date: date})} />
        </form>
      </div>
    )
  };
}

export default ExpandSearch;
