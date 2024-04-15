import { Injectable, inject } from '@angular/core';
import { ethers } from 'ethers';
import { ZLend, ZLend2, ZLend2__factory, ZLend__factory } from '../../typechain-types';
import { normalizeToken } from '../../utils/normalize';
import { getEthersProvider } from '../../utils/wagmi-ethers-adapter';
import { wagmiConfig, Web3Service } from './web3.service';


@Injectable({
  providedIn: 'root'
})
export class ZlendService {
  
  web3Service= inject(Web3Service)

  constructor() {
    
    
  }

  
  public async getCurrentUsersDeposit(addressOrContract: string|ZLend2){

    if(typeof addressOrContract === 'string'){
      
      addressOrContract = ZLend2__factory.connect(addressOrContract, this.web3Service.ethersProvider!);
    }
    const account = this.web3Service.account!;
    const deposits: any[] = [];
    let balance = 0;
    const tokenAddressTracker: string[] = [];

    const noOfTokensLent = await addressOrContract.noOfTokensLent();
  

    if (noOfTokensLent.toNumber() > 0) {
      for (let i = 0; i < noOfTokensLent.toNumber(); i++) {
        const currentTokenAddress = await addressOrContract.tokensLent(i, account);

        if (tokenAddressTracker.includes(currentTokenAddress)) {
          continue;
        }

        if (currentTokenAddress.toString() !== ethers.constants.AddressZero) { //  "0x0000000000000000000000000000000000000000"
          const currentToken = await addressOrContract.getTokenFrom(currentTokenAddress);
          

          const normalized = await normalizeToken(this.web3Service.ethersProvider,addressOrContract,currentToken, account);

          balance += parseFloat(normalized!.userTokenLentAmount.inDollars);

          if (Number(normalized!.userTokenLentAmount.inDollars) > 0.0000000000001) {
            deposits.push(normalized);
            tokenAddressTracker.push(currentTokenAddress);
          }
          
        }
      }


    }
    return { deposits, balance };
  }

  public async getCurrentUsersLoans(addressOrContract: string|ZLend2){

    if(typeof addressOrContract === 'string'){
      
      addressOrContract = ZLend2__factory.connect(addressOrContract, this.web3Service.ethersProvider!);
    }
    const account = this.web3Service.account!;
    const loans: any[] = [];
    let balance = 0;
    const tokenAddressTracker: string[] = [];

    const noOfTokensBorrowed = await addressOrContract.noOfTokensBorrowed();

    if (Number(noOfTokensBorrowed) > 0) {
      for (let i = Number(noOfTokensBorrowed) - 1; i >= 0; i--) {
        const currentTokenAddress = await addressOrContract.tokensBorrowed(i, account);

        if (tokenAddressTracker.includes(currentTokenAddress)) {
          continue;
        }

        if (currentTokenAddress.toString() !== ethers.constants.AddressZero) {
          const currentToken = await addressOrContract.getTokenFrom(currentTokenAddress);

          const normalized = await normalizeToken(this.web3Service.ethersProvider,addressOrContract,currentToken, account);

          balance += parseFloat(normalized!.userTokenBorrowedAmount.inDollars);


          if (Number(normalized!.userTokenBorrowedAmount.amount) > 0) {
            loans.push(normalized);
            tokenAddressTracker.push(currentTokenAddress);
          }


        }
      }

    }
    return { loans, balance };
  }

  public async getTokensForDeposit(addressOrContract: string|ZLend){

    if(typeof addressOrContract === 'string'){
      
      addressOrContract = ZLend__factory.connect(addressOrContract, this.web3Service.ethersProvider!);
    }
    const account = this.web3Service.account!;
    const depositAssets: any[] = []

    const tokens = await addressOrContract.getTokensForLendingArray();
    
    for (let i = 0; i < tokens.length; i++){
      const currentToken = tokens[i]

      const newToken = await normalizeToken(this.web3Service.ethersProvider,addressOrContract,currentToken, account);

      depositAssets.push(newToken)


    }

    return depositAssets
  }

  public async getTokensForBorrowing(addressOrContract: string|ZLend){

    if(typeof addressOrContract === 'string'){
      
      addressOrContract = ZLend__factory.connect(addressOrContract, this.web3Service.ethersProvider!);
    }
    const account = this.web3Service.account!;
    const assets: any[] = []

    const tokens = await addressOrContract.getTokensForBorrowingArray();

    
    
    for (let i = 0; i < tokens.length; i++){
      const currentToken = tokens[i]
      
      const newToken = await normalizeToken(this.web3Service.ethersProvider,addressOrContract,currentToken, account);
      
      assets.push(newToken)


    }

    return assets
  }
}
