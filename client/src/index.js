import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import Web3 from 'web3';

import configuration from '../../build/contracts/Lottery.json';

const CONTRACT_ADDRESS = configuration.networks['5777'].address;
const CONTRACT_ABI = configuration.abi;

const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

let account;

const getPlayers = async () => {
    const players = await contract.methods.getPlayers().call();
    const table = document.getElementById('players');
    table.innerHTML = '';
    players.forEach(async (player) => {
        const row = table.insertRow();
        const address = row.insertCell();
        const name = row.insertCell();
        const amount = row.insertCell();
        const status = row.insertCell();
        address.innerHTML = player.address;
        name.innerHTML = player.name;
        amount.innerHTML = player.amount;
        status.innerHTML = player.status;
    });
}

const main = async () => {
    const accounts = await web3.eth.requestAccounts();
    account = accounts[0];
    const balance = await web3.eth.getBalance(account);
    document.getElementById('account').innerHTML = `Account: ${account}`;
    document.getElementById('balance').innerHTML = `Balance: ${balance}`;

    getPlayers();
}

main();