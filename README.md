# DiploCheck
Many people have submitted fake diplomas to job applications. To mitigate this problem, we will build a Dapp (decentralized app) that can issue and store OSU student diplomas on a blockchain.

## Hackathon Details
Submitted to the [BeaverHacks Winter 2021](https://beaverhacks-winter-2021.devpost.com/). Here's our [project submission](https://devpost.com/software/diplocheck).

## Tools used
#### Design
- [Adobe XD](https://www.adobe.com/products/xd.html)
- [Bootstrap Studio](https://bootstrapstudio.io/)
#### Blockchain
- [Ganache](https://www.trufflesuite.com/ganache)
- [Truffle](https://www.trufflesuite.com/truffle)
- [Metamask](https://metamask.io/)
#### Frontend
- [React](https://reactjs.org/)
- [Bootstrap](https://getbootstrap.com/)
- [Web3](https://web3js.readthedocs.io/en/v1.3.0/)

## Installation
Clone the repo
```bash
git clone https://github.com/tobyloki/DiploCheck.git
```
Launch the smart contract
```bash
cd blockchain
truffle migrate --reset
```
Launch the website
```bash
cd client
npm i
npm start
```
