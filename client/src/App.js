import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './redux/store'
import Navbar from './components/Navbar';
import checkDiploma from './components/checkDiploma';
import createDiploma from './components/createDiploma';
// import ExpandSearch from './components/ExpandSearch';

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
      
  //   }
  // }

  render() {
    return (
      <Provider store={store}>
        <div className='App'>
          <Navbar/>

          <Router>
            <Switch>
              <Route exact path='/checkDiploma' component={checkDiploma} />
              <Route exact path='/createDiploma' component={createDiploma} />
              {/* <Route exact path='/ExpandSearch' component={ExpandSearch} /> */}
              <Redirect to='/createDiploma' />
            </Switch>
          </Router>
        </div>
      </Provider>
    )
  };
}

export default App;
