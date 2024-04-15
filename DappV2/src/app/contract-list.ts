
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
        chainId: 31337,
        zLend: '0x1eE9906e6AB8c53655c875119a396584cfe8FaaF', 
        zLendTokenAddress: '0xAA2a95A342b774512c64799597bD75389e7d3C7a',      
        
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
        zLend: '0x6D096DA092FDF203c2886d88aD773A237822fD82', 
        zLendTokenAddress: '0x9ED133F814534B89c530909b9EfBAf226e6C9A4f', 
    },

    8082: { //shardeum
        chainId: 8082,
        zLend: '0x5749660ac9B78078Ec251dc08570B1BCDe028c02', 
        zLendTokenAddress: '0x6400809865E8aff1EfE04DFDD948DFb0619331c2', 
    }
    
};

export default contractList;