import { WrapperBuilder } from "@redstone-finance/evm-connector";
import { ethers } from "ethers";
import { erc20Abi } from "viem";
import { wagmiConfig } from "../core-module/services/web3.service";
import { getEthersProvider } from "./wagmi-ethers-adapter";

export const convertToDollar = async (zContract, amount, tokenAddress) => {
  
  const tokenInst = new ethers.Contract(tokenAddress, erc20Abi, getEthersProvider(wagmiConfig));
  if(!tokenInst){
    return undefined;
  }

  // let decimals =  18
  // try{
  //   decimals = await tokenInst.decimals();
  // }catch(err){

  // }

  const symbol = await tokenInst.symbol();
  console.log('symbol: ', symbol)
  const contract = WrapperBuilder.wrap(zContract).usingDataService(
    {
      dataServiceId: "redstone-main-demo",
      uniqueSignersCount: 1,
      dataFeeds: [symbol],
    },
  );
  
  const amountInDollars = await contract.getAmountInDollars(amount, tokenAddress);

  return Number(amountInDollars);
};
