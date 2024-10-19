import React, { useState } from 'react';
import { ethers } from 'ethers';
import GasSaverAbi from './abis/GasSaver.json';

const CONTRACT_ADDRESS = '0xYourDeployedContractAddress';  // Замените на ваш адрес контракта

function App() {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [transactions, setTransactions] = useState([]);

    const connectWallet = async () => {
        const { ethereum } = window;
        if (ethereum) {
            const prov = new ethers.providers.Web3Provider(ethereum);
            setProvider(prov);

            const sign = prov.getSigner();
            setSigner(sign);

            const gasSaverContract = new ethers.Contract(CONTRACT_ADDRESS, GasSaverAbi, sign);
            setContract(gasSaverContract);

            console.log('Wallet connected');
        } else {
            console.log('No wallet found');
        }
    };

    const addTransaction = (targetAddress, data) => {
        setTransactions([...transactions, { targetAddress, data }]);
    };

    const executeBatch = async () => {
        const targetAddresses = transactions.map(tx => tx.targetAddress);
        const data = transactions.map(tx => tx.data);

        const tx = await contract.executeBatch(targetAddresses, data);
        await tx.wait();
        console.log('Batch executed');
    };

    return (
        <div className="App">
            <button onClick={connectWallet}>Connect Wallet</button>
            {/* Логика добавления и отправки транзакций */}
            <button onClick={executeBatch}>Execute Batch</button>
        </div>
    );
}

export default App;
