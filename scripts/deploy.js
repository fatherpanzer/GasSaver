const { ethers } = require("hardhat");

async function main() {
    const GasSaver = await ethers.getContractFactory("GasSaver");
    const gasSaver = await GasSaver.deploy();
    await gasSaver.deployed();

    console.log("GasSaver deployed to:", gasSaver.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
