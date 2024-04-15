/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  TokenLocker,
  TokenLockerInterface,
  VestScheduleStruct,
} from "../../../contracts/Lockers/TokenLocker";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "releaseDate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "releaseAmount",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "hasBeenClaimed",
            type: "bool",
          },
        ],
        internalType: "struct VestSchedule[8]",
        name: "schedule",
        type: "tuple[8]",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "getOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "release",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "releaseETH",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenToSend",
        type: "address",
      },
    ],
    name: "releaseToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "tokenVestSchedule",
    outputs: [
      {
        internalType: "uint256",
        name: "releaseDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "releaseAmount",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "hasBeenClaimed",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x6080346101dd57601f610a2338819003918201601f19168301926001600160401b03929091838511838610176101f7578190604095865283398101916103409283838203126101dd576100518361020d565b9260209461006086830161020d565b9383605f840112156101dd578751936101008501858110838211176101f757895284928401938185116101dd579880989901925b84841061018b57505050505060018060a01b0319946001958694338287541617865560018060a01b03908160009616838754161786551690600254161760025582955b6100ea575b84516107da90816102498239f35b600860ff87811682811015610183578086896101096101129489610221565b51015285610221565b519188101561016f578660056003808b02908186519101558585015160048201550192015115159060ff19835416911617905560ff80961695861461015b5794830194836100d7565b634e487b7160e01b83526011600452602483fd5b634e487b7160e01b85526032600452602485fd5b5050506100dc565b60609998999081858403126101dd578a51918201828110858211176101e2578b5284518252898501518a8301528a8501519081151582036101dd57828b928d6060950152815201930192989798610094565b600080fd5b60246000634e487b7160e01b81526041600452fd5b634e487b7160e01b600052604160045260246000fd5b51906001600160a01b03821682036101dd57565b9060088110156102325760051b0190565b634e487b7160e01b600052603260045260246000fdfe608060408181526004908136101561001657600080fd5b600092833560e01c9081636639016b146104885750806386d1a69f1461028a578063893d20e81461025e578063a7e5c3f3146102125763e545f9411461005b57600080fd5b3461020e576020918260031936011261011e576001600160a01b03928135848116919082900361020a57818560025416146101ae5783516370a0823160e01b808252308583015295908281602481875afa9081156101a4578891610173575b50156101325786541692845195865230908601528085602481855afa938415610129575085936100f3575b506100f09350610552565b80f35b90925083813d8311610122575b61010a818361051a565b8101031261011e576100f0925191386100e5565b8380fd5b503d610100565b513d87823e3d90fd5b606484838088519262461bcd60e51b845283015260248201527f546f6b656e4c6f636b65723a206e6f20546f6b656e20746f2072656c656173656044820152fd5b90508281813d831161019d575b61018a818361051a565b810103126101995751386100ba565b8780fd5b503d610180565b86513d8a823e3d90fd5b9050608492519162461bcd60e51b8352820152603160248201527f546f6b656e4c6f636b65723a2063616e6e6f74207472616e7366726520746f6b604482015270656e206d65616e7420666f72206c6f636b60781b6064820152fd5b8580fd5b8280fd5b503461020e57602036600319011261020e57813592600884101561025b575060036060930260ff6005826003015494830154920154169082519384526020840152151590820152f35b80fd5b838234610286578160031936011261028657905490516001600160a01b039091168152602090f35b5080fd5b5091903461028657816003193601126102865781825b6008808211610351578110158061032d576003908183028092015442101580610340575b6102ef575b505060001981146102dc576001016102a0565b634e487b7160e01b845260118352602484fd5b92909261032d5783830154810180911161031a576005909201600160ff1982541617905538806102c9565b634e487b7160e01b855260118452602485fd5b634e487b7160e01b855260328452602485fd5b50508460ff600583015416156102c4565b505060025484516370a0823160e01b8152308185015291926001600160a01b03918216926020908181602481885afa90811561047e57879161044d575b5080156104005785116103ac575050836100f0949550541690610552565b865162461bcd60e51b815291820152602960248201527f546f6b656e4c6f636b65723a206e6f7420656e6f75676820746f6b656e7320746044820152686f2072656c6561736560b81b606482015260849150fd5b875162461bcd60e51b8152808401839052602160248201527f546f6b656e4c6f636b65723a206e6f20746f6b656e7320746f2072656c6561736044820152606560f81b6064820152608490fd5b90508181813d8311610477575b610464818361051a565b8101031261047357513861038e565b8680fd5b503d61045a565b88513d89823e3d90fd5b919290503461011e578360031936011261011e5747156104d95750508180808060018060a01b0381541647908282156104d0575bf1156104c6575080f35b51903d90823e3d90fd5b506108fc6104bc565b62461bcd60e51b8252602090820152601e60248201527f546f6b656e4c6f636b65723a206e6f2045746820746f2072656c6561736500006044820152606490fd5b90601f8019910116810190811067ffffffffffffffff82111761053c57604052565b634e487b7160e01b600052604160045260246000fd5b916040519060209384830163a9059cbb60e01b815260018060a01b0392836024961686860152604485015260448452608084019267ffffffffffffffff928585108486111761071457169360c0810184811084821117610714576040528684527f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c656460a0820152843b156106d057600094859283809351925af13d156106c2573d9182116106ae579061062392916040519161061688601f19601f840116018461051a565b82523d858884013e610729565b805180610632575b5050505050565b81859181010312610286578301519081159182150361025b57506106585780808061062b565b90602a6084926040519262461bcd60e51b845260048401528201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b6064820152fd5b5050634e487b7160e01b8252506041600452fd5b610623929150606090610729565b60405162461bcd60e51b815260048101889052601d818801527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606490fd5b86634e487b7160e01b60005260416004526000fd5b90919015610735575090565b8151156107455750805190602001fd5b6040519062461bcd60e51b82528160208060048301528251908160248401526000935b82851061078b575050604492506000838284010152601f80199101168101030190fd5b848101820151868601604401529381019385935061076856fea2646970667358221220c90afff6e0e1b55372a0935279f5391cdfc9f69eaa9cbc8b5e07e49561da79c764736f6c63430008110033";

type TokenLockerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TokenLockerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TokenLocker__factory extends ContractFactory {
  constructor(...args: TokenLockerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    tokenAddress: PromiseOrValue<string>,
    owner: PromiseOrValue<string>,
    schedule: VestScheduleStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<TokenLocker> {
    return super.deploy(
      tokenAddress,
      owner,
      schedule,
      overrides || {}
    ) as Promise<TokenLocker>;
  }
  override getDeployTransaction(
    tokenAddress: PromiseOrValue<string>,
    owner: PromiseOrValue<string>,
    schedule: VestScheduleStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      tokenAddress,
      owner,
      schedule,
      overrides || {}
    );
  }
  override attach(address: string): TokenLocker {
    return super.attach(address) as TokenLocker;
  }
  override connect(signer: Signer): TokenLocker__factory {
    return super.connect(signer) as TokenLocker__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TokenLockerInterface {
    return new utils.Interface(_abi) as TokenLockerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TokenLocker {
    return new Contract(address, _abi, signerOrProvider) as TokenLocker;
  }
}
