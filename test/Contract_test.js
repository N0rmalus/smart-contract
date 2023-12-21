const Lottery = artifacts.require("Lottery");

contract("Lottery", (accounts) => {
    let lotteryInstance;

    beforeEach(async () => {
        lotteryInstance = await Lottery.new({ from: accounts[0] });
    });

    it("should allow a player to enter", async () => {
        await lotteryInstance.enter({ from: accounts[1], value: web3.utils.toWei("2", "ether") });
        const players = await lotteryInstance.getPlayers();
        assert.equal(players.length, 1, "Player not added");
        assert.equal(players[0], accounts[1], "Wrong player address");
    });

    it("should pick a winner", async () => {
        await lotteryInstance.enter({ from: accounts[1], value: web3.utils.toWei("2", "ether") });
        await lotteryInstance.enter({ from: accounts[2], value: web3.utils.toWei("2", "ether") });
        
        const initialBalance = await web3.eth.getBalance(accounts[1]);
        
        await lotteryInstance.pickWinner({ from: accounts[0] });
        
        const finalBalance = await web3.eth.getBalance(accounts[1]);
        const difference = finalBalance - initialBalance;
        
        assert(difference > web3.utils.toWei("1.5", "ether"), "Winner not paid");
        
        const players = await lotteryInstance.getPlayers();
        assert.equal(players.length, 0, "Players not reset");
    });
});
