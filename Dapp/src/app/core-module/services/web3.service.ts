import { Injectable } from '@angular/core';
// import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
// import { Web3Modal } from '@web3modal/html'
import {   createConfig, fetchBalance, getBalance, getChainId, injected, reconnect, simulateContract, 
  watchAccount, watchChainId, watchConnections, writeContract } from '@wagmi/core';
import { arbitrum, Chain, fantom, base, baseSepolia, fantomTestnet, goerli, mainnet, 
  sepolia, polygon, bsc, bscTestnet, celo, celoAlfajores, 
  hardhat, metisGoerli, etherlinkTestnet, shardeumSphinx } from '@wagmi/core/chains';
import { getAccount, readContract,    getPublicClient, getWalletClient} from '@wagmi/core';

import {erc20Abi} from 'viem'


import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';


import { FallbackTransport, formatUnits, http, parseUnits } from 'viem';
import { type GetChainIdReturnType } from '@wagmi/core'
import { coinbaseWallet, walletConnect } from '@wagmi/connectors';
import { createWeb3Modal } from '@web3modal/wagmi';
import { ethers } from 'ethers';
import { getEthersProvider } from '../../utils/wagmi-ethers-adapter';
import { getEthersSigner } from '../../utils/wagmi-ethers-adapter-signer';
import { dChainTestnet } from './extra-chains';

const projectId = environment.walletConnectProjectId;

const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com', // url must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

//@ts-ignore
export const wagmiConfig = createConfig({
  chains: [hardhat,  /*mainnet, sepolia, baseSepolia, base,*/ dChainTestnet],
  connectors: [
    walletConnect({ projectId: projectId, metadata, showQrModal: false }),
    injected({ shimDisconnect: true }),
    coinbaseWallet({
      appName: metadata.name,
      appLogoUrl: metadata.icons[0]
    })
  ],
  transports: {
    [hardhat.id]: http(),
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [base.id]: http(),
    [baseSepolia.id]: http(),
    [etherlinkTestnet.id]: http(),
    [shardeumSphinx.id]: http(),
    [dChainTestnet.id]: http()
  },
})

export const chains: Record<number, Chain> = {
  1: mainnet,
  84532: baseSepolia,
  8453: base,
  11155111: sepolia,
  128123: etherlinkTestnet,
  8082: shardeumSphinx,
  31337: hardhat,
  2713017997578000: dChainTestnet
} 

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  
  w3modal: any;

  private _chainId$ = new BehaviorSubject<number|undefined>(undefined);
  
  public chainId$ = this._chainId$.asObservable()

  public get chainId(){
    
    return this._chainId$.value;
  }

  private _account$ = new BehaviorSubject<string|undefined>(undefined);
  
  public account$ = this._account$.asObservable()

  public get account(){
    
    return this._account$.value;
  }

  unwatchAccount : any;

  unwatchNetwork : any;

  // private _connected$ = new BehaviorSubject<boolean|undefined>(undefined);
  
  // public connected$ = this._connected$.asObservable()

  // public get connected(){
    
  //   return this._connected$.value;
  // }

  // unwatchConnection : any;

  ethersProvider?: ethers.providers.FallbackProvider | ethers.providers.JsonRpcProvider| ethers.providers.BaseProvider;
  ethersSigner?: any;

  constructor() {
    setTimeout(() => {
      reconnect(wagmiConfig).then((reconnected)=>{
        console.log('Recoon: ', reconnected)
        setTimeout(async ()=>{
          try{
            
    
            
            const {address, isConnected} = getAccount(wagmiConfig);
            if(isConnected){
              this._account$.next(address)
            }else{
              await this.w3modal.open();
            }
            
            const chainId   = getChainId(wagmiConfig);
            if(chainId ){
              this.ethersProvider = getEthersProvider(wagmiConfig)
              this.ethersSigner = await getEthersSigner(wagmiConfig)
              this._chainId$.next(chainId );
            }
    
            //Update chainId on change
            this.unwatchNetwork = watchChainId(wagmiConfig,      
              {
                onChange:  async (chainId) => {
                  console.log('Chain ID changed!', chainId)
                  if(chainId ){
                    this.ethersProvider = getEthersProvider(wagmiConfig)
                    this.ethersSigner = await getEthersSigner(wagmiConfig)
                    this._chainId$.next(chainId );
    
                  }else{
                    this._chainId$.next(undefined);
                  }
                },
              }
            ); 
            
            this.unwatchAccount = watchAccount(wagmiConfig, {
              onChange: (account) => {
                if(account && account.isConnected){
                  this._account$.next(account.address);
                }else{
                  this._account$.next(undefined);
                }
                
              }
            })
          }catch(err){
            console.error('Error intializing web3service', err)
          }
          
            
        }, 150)
      }).catch((err)=>{
        console.error('Err reconn:', err)
      })
      this.w3modal = createWeb3Modal({
        wagmiConfig: wagmiConfig,
        projectId: projectId,
        enableAnalytics: true, // Optional - defaults to your Cloud configuration
        enableOnramp: true, // Optional - false as default
  
      })
    }, 300);
    

    


    
    

    

    // this.unwatchConnection = watchConnections(wagmiConfig, {
    //   onChange: (connected) => {
    //     if(connected && connected[0].connector.){
    //       this._account$.next(account.address);
    //     }else{
    //       this._account$.next(undefined);
    //     }
        
    //   }
    // })



  }


  async getAccountInfo() {
    return getAccount(wagmiConfig);
  }

  getCurrentChainId() {
    const c: GetChainIdReturnType = getChainId(wagmiConfig);
    return c;
  }

  getChainName(chainId: number){
    const chain = chains[chainId]
    if(chain){
      return chain.name
    }else{
      return undefined
    }

  }

  getChain(chainId: number){
    const chain = chains[chainId]
    if(chain){
      return chain
    }else{
      return undefined
    }

  }

  
  async getERC20Balance(tokenAddress?: string, account?: string) {
    
    return await getBalance(wagmiConfig, {
      address: account as `0x${string}`,      
      token: tokenAddress as `0x${string}`
    });
  }
 


  async getERC20Allowance(tokenAddress: string|`0x${string}`, contractToApprove: string|`0x${string}`, account?: string|`0x${string}`,
   chainId? :any) {

    if(!account){
      account=this.account;
    }
    
    
    //@ts-ignore
    const allowance = await readContract(wagmiConfig, {
      address: tokenAddress as `0x${string}`,
      abi: erc20Abi,      
      functionName: 'allowance',
      args: [account as `0x${string}`, contractToApprove as `0x${string}`],
      chainId
    })
    
    return allowance;
  }


  async approveERC20Contract(tokenAddress: string, contractToApprove: string, 
    account: string, amount, chainId? :any){

    
    //@ts-ignore
    // const simu = await simulateContract(wagmiConfig, {
    //   address: tokenAddress as `0x${string}`,
    //   abi: erc20Abi,      
    //   account: account as `0x${string}`,
    //   functionName: 'approve',
    //   args: [ contractToApprove as `0x${string}`, amount],
    //   chainId
    // })
 
    //@ts-ignore
    return await writeContract(wagmiConfig,{
      address: tokenAddress as `0x${string}`,
      abi: erc20Abi,      
      account: account as `0x${string}`,
      functionName: 'approve',
      args: [ contractToApprove as `0x${string}`, amount],
      chainId
    });

    
  }

  
  public getERC20ContractWithSigner (address: string) {
    
    const cContract = new ethers.Contract(address, erc20Abi, this.ethersSigner);
    return cContract;
  }

  // async fetchTotalSupply(tokenAddress: string){
  //   const t= await this.getTokenInfo(tokenAddress as `0x${string}`)
  //   if(t){
  //     return t.totalSupply.value
  //   }

  //   return undefined
  // }
}



