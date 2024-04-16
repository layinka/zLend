import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import {Contract, ethers, utils} from 'ethers';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import contractList from '../../contract-list';
import { AppToastService } from '../../core-module/services/app-toast.service';
import { Web3Service } from '../../core-module/services/web3.service';
import { ZlendService } from '../../core-module/services/zlend.service';
import { ToastsComponent } from '../../core-module/toasts/toasts.component';
import { HeaderComponent } from '../../feature-module/header/header.component';
import { SidebarComponent } from '../../feature-module/sidebar/sidebar.component';
import { ZLend, ZLend__factory } from '../../typechain-types';
import { toDp } from '../../utils/numbers';
import { AssetDetailsComponent } from '../asset-details/asset-details.component';



@Component({
  standalone: true,
  selector: 'deposit-assets',
  templateUrl: './deposit-assets.component.html',
  styleUrls: ['./deposit-assets.component.scss'],
  imports: [RouterOutlet, CommonModule, HeaderComponent, SidebarComponent, ToastsComponent,
    NgxSpinnerModule, FormsModule, ReactiveFormsModule, AssetDetailsComponent ],
 schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [NgbActiveModal ]
})
export class DepositAssetsComponent implements OnInit {

  web3ServiceConnect$: Subscription|undefined;
  
  currentChainId: any;
  nativeCoin= '';

  assets: any;

  selectedToken: any;

  zLendContract: ZLend|undefined;
  
  balance :any ;

  depositFormGroup: FormGroup;

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

  constructor( public web3Service: Web3Service,private spinner: NgxSpinnerService, 
    private fb: FormBuilder, public zLendService: ZlendService, private toastService: AppToastService) {
      this.depositFormGroup = this.fb.group({
          
        amount: ['', [Validators.required,Validators.min(0 ),Validators.max(1000000)]],
  
      })
    }

  ngOnInit(): void {

    
    this.web3ServiceConnect$ = this.web3Service.chainId$.subscribe(async (chainId)=>{
        
      if(chainId){
        

        this.currentChainId = chainId;
        // this.nativeCoin = (await this.web3Service.getCurrentChain())?.nativeCurrency;
        this.nativeCoin = (await this.web3Service.getChain(chainId))?.nativeCurrency.symbol??'Coin';
       
        
        this.zLendContract = ZLend__factory.connect(contractList[this.currentChainId].zLend!, this.web3Service.ethersSigner!);
        this.assets = await this.zLendService.getTokensForDeposit(this.zLendContract);
        this.balance = 0;
               
      }

    });

    

    
    
  }


  openAssetDetailsModal(content: TemplateRef<any>,token){
    
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

      const allowance = await this.web3Service.getERC20Allowance(token.tokenAddress, contractList[this.currentChainId].zLend as `0x${string}`,this.web3Service.account as `0x${string}`);
      console.log('current allowance:', allowance, ', value ', value.toString())
      if(allowance< value.toBigInt()){
        console.log('needs approval')
        await this.web3Service.approveERC20Contract(token.tokenAddress, contractList[this.currentChainId].zLend!,this.web3Service.account!, value.toBigInt());
      }
      

      const tx = await this.zLendContract!.lend(token.tokenAddress, value);
      const depositResult = await tx.wait();

      const zTokenBalance = await zToken.balanceOf(this.web3Service.account);

      await(await zToken.approve(contractList[this.currentChainId].zLend!, zTokenBalance)).wait();

      this.toastService.show('Success!','Your Deposit has been sent succesfully!')
      
      
      this.spinner.hide();
      window.location.reload(); 
    } catch (err) {
      console.error('Error depositing: ',err);
      this.spinner.hide();
      
      
      this.toastService.error('Oops!','Your Deposit Failed');
    }
  };


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
