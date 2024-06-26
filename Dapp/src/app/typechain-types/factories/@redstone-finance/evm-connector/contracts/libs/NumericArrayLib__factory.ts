/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  NumericArrayLib,
  NumericArrayLibInterface,
} from "../../../../../@redstone-finance/evm-connector/contracts/libs/NumericArrayLib";

const _abi = [
  {
    inputs: [],
    name: "CanNotPickMedianOfEmptyArray",
    type: "error",
  },
];

const _bytecode =
  "0x60808060405234601757603a9081601d823930815050f35b600080fdfe600080fdfea2646970667358221220d69aa1c8b89dc29f954a47de82a09afe0532fc7fdf9f2d996d6c78d3040641d764736f6c63430008110033";

type NumericArrayLibConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: NumericArrayLibConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class NumericArrayLib__factory extends ContractFactory {
  constructor(...args: NumericArrayLibConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<NumericArrayLib> {
    return super.deploy(overrides || {}) as Promise<NumericArrayLib>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): NumericArrayLib {
    return super.attach(address) as NumericArrayLib;
  }
  override connect(signer: Signer): NumericArrayLib__factory {
    return super.connect(signer) as NumericArrayLib__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NumericArrayLibInterface {
    return new utils.Interface(_abi) as NumericArrayLibInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): NumericArrayLib {
    return new Contract(address, _abi, signerOrProvider) as NumericArrayLib;
  }
}
