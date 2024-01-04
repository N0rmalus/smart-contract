# Loterijos Smart Kontraktas

## Apie

Šis Ethereum smart kontraktas leidžia vartotojams dalyvauti de-centralizuotoje loterijoje. Kontraktas yra parašytas Solidity kalba ir veikia Ethereum blokų grandinėje.

## Funkcionalumas

### 1. Dalyvavimas loterijoje

Vartotojai gali dalyvauti loterijoje siųsdami Ether sumą, didesnę nei 0.01 Ether.

```solidity
function enter() public payable {
  require(msg.value > 0.2 ether, "Minimum contribution is 0.2 ether");
  players.push(msg.sender);
}
```

### 2. Nugalėtojo pasirinkimas

Kontraktas automatiškai pasirenka nugalėtoją pagal atsitiktinumo principą.

```solidity
function pickWinner() public restricted {
  require(players.length > 0, "Loterijoje nėra dalyvių");
  
  uint index = random() % players.length;
  address winner = players[index];
  
  payable(winner).transfer(address(this).balance);
  
  players = new address[](0);
}
```

## Frontend

Šiam smart kontraktui yra sukurtas vartotojo sąsaja (deja, neveikianti), kuri leistų lengvai dalyvauti loterijoje, stebėti esamus dalyvius ir vykdyti kitas operacijas.

