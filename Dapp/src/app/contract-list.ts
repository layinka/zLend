
export interface ContractListArray {
    [index: number]: {
        chainId: number,
        
        zLend?: string,
        zLendTokenAddress?: string,
        
        
    };
}

const contractList: ContractListArray =  {
    1: {
        chainId: 1,

    },
    
    31337: {// Hardhat test
        // chainId: 31337,
        // zLend: '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707', 
        // zLendTokenAddress: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',  
        
        chainId: 31337,
        "zLend":"0xa85233C63b9Ee964Add6F2cffe00Fd84eb32338f",
        "zLendTokenAddress":"0x3Aa5ebB10DC797CAC828524e59A333d0A371443c" 
        
    }, 
    137: {//Polygon mainnet
        chainId: 137,
        zLend: '0x1eE9906e6AB8c53655c875119a396584cfe8FaaF', 
        zLendTokenAddress: '0xAA2a95A342b774512c64799597bD75389e7d3C7a', 
    },
    80001: { //Polygon mumbai
        chainId: 80001,
        zLend: '0x932102Bc1916f9d74E271dB6685aba0276f112F2', 
        zLendTokenAddress: '0xED2E8410ECd1e71dDd0d9E045dc8ADA7C4509278', 
    },

    1001: {//Klaytyn testnet
        chainId: 80001,
        zLend: '0xE3cB58467250bd4178d737A87B87dc7AE00Dad62', 
        zLendTokenAddress: '0x9ED133F814534B89c530909b9EfBAf226e6C9A4f', 
    },

    51: { // Apothem - XDC testnet
        chainId: 51,
        zLend: '0x3FCa62e61909455186BeaB7C9647bC66472e3bEe', 
        zLendTokenAddress: '0xE7B1D4a5264d5984d1f06F559aA0B712222275CC', 
    },

    9000: { // EVMOS - testnet
        chainId: 9000,
        zLend: '0x5749660ac9B78078Ec251dc08570B1BCDe028c02', 
        zLendTokenAddress: '0x6400809865E8aff1EfE04DFDD948DFb0619331c2', 
    },

    128123: { // etherlink
        chainId: 128123,
        "zLend": "0x3FCa62e61909455186BeaB7C9647bC66472e3bEe",
        "zLendTokenAddress": "0xE7B1D4a5264d5984d1f06F559aA0B712222275CC" 
    },

    8082: { //shardeum
        chainId: 8082,
        zLend: '0x5749660ac9B78078Ec251dc08570B1BCDe028c02', 
        zLendTokenAddress: '0x6400809865E8aff1EfE04DFDD948DFb0619331c2', 
    },

    2713017997578000: { //dChain testnet
        chainId: 2713017997578000,
        zLend: "0xE47050824F0Ec836a3A0EA0bfcdBfbF4743bEe77",
        zLendTokenAddress: "0x03333b101F653D5ad13BDd9f524b760e0cCe9f8b"
    }
    
};

export default contractList;