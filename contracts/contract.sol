// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Lottery {
    address public manager; // Loterijos valdytojo adresas
    address[] public players; // Masyvas, kuriame saugomi dalyvių adresai

    constructor() {
        manager = msg.sender; // Sutarties sudarytojas yra vadovas
    }

    // Funkcija, leidžianti naudotojams dalyvauti loterijoje siunčiant eterį
    function enter() public payable {
        require(msg.value > 0.2 ether, "Minimum contribution is 0.2 ether");
        players.push(msg.sender); // Add the sender's address to the array of players
    }

    // Pseudoatsitiktinio laimėtojo generavimo funkcija
    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.basefee, block.timestamp, players)));
    }

    // Funkcija išrinkti laimėtoją ir išsiųsti jam visą likutį
    function pickWinner() public restricted {
        require(players.length > 0, "No players in the lottery");
        
        uint index = random() % players.length;
        address winner = players[index];
        
        // Pervesti visą sutarties likutį laimėtojui
        payable(winner).transfer(address(this).balance);
        
        // Iš naujo nustatyti kito raundo žaidėjų sąrašą
        players = new address[](0);
    }

    // Modifikatorius, leidžiantis apriboti tam tikras funkcijas tik valdytojui
    modifier restricted() {
        require(msg.sender == manager, "Only the manager can call this function");
        _;
    }

    // Dabartinio žaidėjų sąrašo gavimo funkcija
    function getPlayers() public view returns (address[] memory) {
        return players;
    }
}
