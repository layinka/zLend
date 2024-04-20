import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { formatUnits } from 'viem';
import contractList from '../../contract-list';
import { Web3Service } from '../../core-module/services/web3.service';
import { ZlendService } from '../../core-module/services/zlend.service';
import { BorrowAssetsComponent } from '../../pages/borrow-assets/borrow-assets.component';
import { DepositAssetsComponent } from '../../pages/deposit-assets/deposit-assets.component';
import { YourBorrowalsComponent } from '../../pages/your-borrowals/your-borrowals.component';
import { YourDepositsComponent } from '../../pages/your-deposits/your-deposits.component';
import { ZLend, ZLend2, ZLend2__factory, ZLend__factory } from '../../typechain-types';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [BorrowAssetsComponent, DepositAssetsComponent, CommonModule, YourBorrowalsComponent, YourDepositsComponent]
})
export class HomeComponent {
  web3ServiceConnect$: Subscription|undefined;
  
  currentChainId: any;
  nativeCoin= '';

  zLendContract: ZLend2|undefined;

  zlendBalance :any ;
  deposits: any;
  loans: any;
  
  slides: any[] = new Array(1).fill({id: -1, src: '', title: '', subtitle: '', subtitle2: ''});

  constructor(private titleService: Title, public web3Service: Web3Service, public zLendService: ZlendService) { }

  ngOnInit(): void {

    this.titleService.setTitle("ZLend || Defi Lending");

    this.slides[0] = {
      id: 0,
      src: './assets/images/',
      title: 'ZLend',
      subtitle: 'DEFI LEnding',
      subtitle2: '.'
    };

    this.web3ServiceConnect$ = this.web3Service.chainId$.subscribe(async (chainId)=>{
        
      if(chainId){
        this.currentChainId = chainId;
        // this.nativeCoin = (await this.web3Service.getCurrentChain())?.nativeCurrency;
        this.nativeCoin = (await this.web3Service.getChain(chainId))?.nativeCurrency.symbol??'Coin';
       
        
        this.zLendContract = ZLend2__factory.connect(contractList[this.currentChainId].zLend!, this.web3Service.ethersSigner!)

        this.deposits = await this.zLendService.getCurrentUsersDeposit(this.zLendContract);
        
        this.loans = await this.zLendService.getCurrentUsersLoans(this.zLendContract);
        
        this.zlendBalance= formatUnits( (await this.web3Service.getERC20Balance(contractList[this.currentChainId].zLendTokenAddress, this.web3Service.account ) ).value,18);
                
      }

    });

    
    
  }
}
