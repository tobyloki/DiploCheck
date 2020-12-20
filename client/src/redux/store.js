import { createStore } from 'redux';

const initialState = {
  web3: null,
  account: null,
  contract: null
};

const reducer = (state = initialState, action) => {
  switch(action.type){
    case 'setWeb3':
      return Object.assign({}, state, { web3: action.value });
    case 'setAccount':
      return Object.assign({}, state, { account: action.value });
    case 'setContract':
      return Object.assign({}, state, { contract: action.value });
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;