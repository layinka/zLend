import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';

import { ethers } from 'ethers';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppToastService } from '../../core-module/services/app-toast.service';
import { ZlendService } from '../../core-module/services/zlend.service';
import { Web3Service } from '../../core-module/services/web3.service';
import contractList from '../../contract-list';
import { ZLend, ZLend2, ZLend2__factory, ZLend__factory } from '../../typechain-types';
import { toDp } from '../../utils/numbers';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ToastsComponent } from '../../core-module/toasts/toasts.component';
import { HeaderComponent } from '../../feature-module/header/header.component';
import { SidebarComponent } from '../../feature-module/sidebar/sidebar.component';
import { AssetDetailsComponent } from '../asset-details/asset-details.component';

@Component({
  standalone: true,
  selector: 'your-deposits',
  templateUrl: './your-deposits.component.html',
  styleUrls: ['./your-deposits.component.scss'],
  imports: [RouterOutlet, CommonModule, HeaderComponent, SidebarComponent, ToastsComponent,
    NgxSpinnerModule, FormsModule, ReactiveFormsModule, AssetDetailsComponent ],
 schemas: [CUSTOM_ELEMENTS_SCHEMA],
 providers: [NgbActiveModal ]
})
export class YourDepositsComponent implements OnInit {


  deposits: any;

  web3ServiceConnect$: Subscription|undefined;
  
  currentChainId: any;
  nativeCoin= '';

  selectedToken: any;

  zLendContract: ZLend2|undefined;
  
  


  depositFormGroup: FormGroup;
  withdrawFormGroup: FormGroup;

  validationMessages : {
    [index: string]: any
   } = {
    'amount': {
      'required'  :   'Amount is Required.',
      'min': 'Amount must be at least 0 ',
      'max': 'Amount must be at most 100 '
    },
    'startDate' : {
       'required'  :   'Start Date is Required.',
       'past': 'Start Date can not be in the past'
     },
     'endDate' : {
       'required'  :   'End Date is Required.',
       'past': 'End Date can not be in the past',
       //'less': 'End date cannot be less than Start date'
       // 'pattern'   :   'Contact No. should only contain Numbers '
     },
     
   };

   private modalService = inject(NgbModal);
   activeModal = inject(NgbActiveModal);

  constructor( public web3Service: Web3Service,private spinner: NgxSpinnerService, private fb: FormBuilder, 
    private zLendService: ZlendService,  private toastService: AppToastService ) {

      this.depositFormGroup = this.fb.group({
          
        amount: ['', [Validators.required,Validators.min(0 ),Validators.max(1000000)]],
  
      })
  
      this.withdrawFormGroup = this.fb.group({
            
        amount: ['', [Validators.required,Validators.min(0 ),Validators.max(1000000)]],
  
      })

  }

  ngOnInit(): void {

    
    this.web3ServiceConnect$ = this.web3Service.chainId$.subscribe(async (chainId)=>{
        
      if(chainId){
        
        this.currentChainId = await this.web3Service.getCurrentChainId();
        // this.nativeCoin = (await this.web3Service.getCurrentChain())?.nativeCurrency;
        this.nativeCoin = (await this.web3Service.getChain(chainId))?.nativeCurrency.symbol??'Coin';
       
        
        this.zLendContract = ZLend2__factory.connect(contractList[this.currentChainId].zLend!, this.web3Service.ethersSigner!);
        this.deposits = await this.zLendService.getCurrentUsersDeposit(this.zLendContract);

      //   const p= [
      //     {
      //         name: "XTZ",
      //         address: "0xE3cB58467250bd4178d737A87B87dc7AE00Dad62",
      //         feed_address: "0xf49f81b3d2F2a79b706621FA2D5934136352140c",
      //         LTV: ethers.utils.parseUnits ("0.85"), // Loan-to-Value (LTV) Ratio, Lower is better
      //         interest_rate: ethers.utils.parseUnits ("0.017"), // interest paid to depositors
      //         borrow_stable_rate: ethers.utils.parseUnits ("0.03"), // interest paid by borrowers
      //         toUsd: 1.08,
      //         decimal: 18
      //     },
      //     {
      //         name: "USDC",
      //         address: "0x00aC989ddB7aEc2405a7f456De9E432c60A94283",
      //         feed_address: "0xf49f81b3d2F2a79b706621FA2D5934136352140c",
      //         LTV: ethers.utils.parseUnits ("0.85"), // Loan-to-Value (LTV) Ratio, Lower is better
      //         interest_rate: ethers.utils.parseUnits ("0.017"), // interest paid to depositors
      //         borrow_stable_rate: ethers.utils.parseUnits ("0.03"), // interest paid by borrowers
      //         toUsd: 0.99910,
      //         decimal: 6
      //     },
      //     {
      //         name: "USDT",
      //         address: "0x7EaCAC40f0474F846A4A313Dc668177098B530bE",
      //         feed_address: "0xf49f81b3d2F2a79b706621FA2D5934136352140c",
      //         LTV: ethers.utils.parseUnits ("0.8"), // Loan-to-Value (LTV) Ratio, Lower is better
      //         interest_rate: ethers.utils.parseUnits ("0.011"), // interest paid to depositors
      //         borrow_stable_rate: ethers.utils.parseUnits ("0.027"), // interest paid by borrowers
      //         toUsd: 0.9932,
      //         decimal: 18
      //     },
          
      // ]

      // for(let p1 of p){
        
      //   let tx= await this.zLendContract.updateTokenPrice(p1.address, ethers.utils.parseUnits(p1.toUsd.toString(), p1.decimal), p1.decimal)
      //   const receipt = await tx.wait()

      //   console.log('tx is ', receipt)
      // }
        
        
                
    }

    });    
    
  }



  openWithdrawModal(content: TemplateRef<any>,token){
    
    this.selectedToken = token;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				// this.closeResult = `Closed with: ${result}`;

        // console.log('closed successfully: ', result)
			},
			(reason) => {
				// this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

        // console.log('Dismissed successfully: ', reason)
			},
		);
  }

  
  async withdrawCoin () {

    this.spinner.show();
    const token = this.selectedToken;
    const amount = this.withdrawFormGroup.get('amount')?.value;
    const value = ethers.utils.parseEther(amount.toString())
    
    try {
      
      

      const tx = await this.zLendContract!.withdraw(token.tokenAddress, value);
      const withdrawResult = await tx.wait();

      this.toastService.show('Success!','Your Withdrawal has been sent succesfully!');
      
      this.spinner.hide();
      window.location.reload(); 
    } catch (err) {
      console.error('Error withdrawing: ',err);
      this.spinner.hide();
      
      
      this.toastService.error('Oops!','Your Deposit Failed');
    }
  };

  openDepositModal(content: TemplateRef<any>,token){
    
    this.selectedToken = token;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				// this.closeResult = `Closed with: ${result}`;

        // console.log('closed successfully: ', result)
			},
			(reason) => {
				// this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

        // console.log('Dismissed successfully: ', reason)
			},
		);
  }

 


  
  async depositCoin () {

    this.spinner.show();
    const token = this.selectedToken;
    const amount = this.depositFormGroup.get('amount')?.value;
    const value = ethers.utils.parseEther(amount.toString())
    
    const tokenInst = this.web3Service.getERC20ContractWithSigner(token.tokenAddress);
    const zToken = this.web3Service.getERC20ContractWithSigner(contractList[this.currentChainId].zLendTokenAddress!); 

    try {
      
      await this.web3Service.approveERC20Contract(token.tokenAddress, contractList[this.currentChainId].zLend!,this.web3Service.account!, value);

      const tx = await this.zLendContract!.lend(token.tokenAddress, value);
      const depositResult = await tx.wait();

      const zTokenBalance = await zToken.balanceOf(this.web3Service.account);

      await(await zToken.approve(contractList[this.currentChainId].zLend!, zTokenBalance)).wait();

      this.toastService.show('Success!','Your Deposit has been sent succesfully!');
      
      this.spinner.hide();
      window.location.reload(); 
    } catch (err) {
      console.error('Error depositing: ',err);
      this.spinner.hide();
      
      
      this.toastService.error('Oops!','Your Deposit Failed');
    }
  }


  todp(amount, dp){
    return toDp(amount, dp);
  }


  objectKeys(o: any){
    if(!o){
      return []
    }
    return Object.keys(o)
  }

}
