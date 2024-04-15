import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';



import { ethers } from 'ethers';

import contractList from '../../contract-list';
import { wagmiConfig, Web3Service } from '../../core-module/services/web3.service';
import { ZLend, ZLend__factory } from '../../typechain-types';
import { toDp } from '../../utils/numbers';
import { ZlendService } from '../../core-module/services/zlend.service';
import { waitForTransactionReceipt } from '@wagmi/core';
import { AppToastService } from '../../core-module/services/app-toast.service';
import { RouterOutlet } from '@angular/router';
import { ToastsComponent } from '../../core-module/toasts/toasts.component';
import { HeaderComponent } from '../../feature-module/header/header.component';
import { SidebarComponent } from '../../feature-module/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AssetDetailsComponent } from '../asset-details/asset-details.component';


@Component({
  standalone: true,
  selector: 'borrow-assets',
  templateUrl: './borrow-assets.component.html',
  styleUrls: ['./borrow-assets.component.scss'],
  imports: [RouterOutlet, CommonModule, HeaderComponent, SidebarComponent, ToastsComponent,
     NgxSpinnerModule, FormsModule, ReactiveFormsModule, AssetDetailsComponent ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [NgbActiveModal ]

})
export class BorrowAssetsComponent implements OnInit {

  
  web3ServiceConnect$: Subscription|undefined;
  userChain: string|null = 'pol';
  currentChainId: any;
  nativeCoin= '';

  assets: any;
  selectedToken: any;
  zLendContract: ZLend|undefined;
  
  borrowModalVisible = false;
  repayModalVisible=false;
  assetDetailsModalVisible=false;

  borrowFormGroup: FormGroup;
  repayFormGroup: FormGroup;

  validationMessages : {
    [index: string]: any
   } = {
    'amount': {
      'required'  :   'Amount is Required.',
      'min': 'Amount must be at least 0 ',
      'max': 'Amount must be at most 100 '
    },
     
   };

   private modalService = inject(NgbModal);
   activeModal = inject(NgbActiveModal);

  constructor( public web3Service: Web3Service,private spinner: NgxSpinnerService, private fb: FormBuilder, 
    public zLendService: ZlendService, private toastService: AppToastService) { 
    this.borrowFormGroup = this.fb.group({
          
      amount: ['', [Validators.required,Validators.min(0 ),Validators.max(1000000)]],

    })

    this.repayFormGroup = this.fb.group({
          
      amount: ['', [Validators.required,Validators.min(0 ),Validators.max(1000000)]],

    })

  }

  ngOnInit(): void {

    
    this.web3ServiceConnect$ = this.web3Service.chainId$.subscribe(async (chainId)=>{
        
      if(chainId){
        
        this.currentChainId = await this.web3Service.getCurrentChainId();
        // this.nativeCoin = (await this.web3Service.getCurrentChain())?.nativeCurrency;
        this.nativeCoin = this.web3Service.getChain(this.currentChainId)?.nativeCurrency.symbol??'Coin';
       
        
        this.zLendContract = ZLend__factory.connect(contractList[this.currentChainId].zLend!, this.web3Service.ethersSigner!);
        this.assets = await this.zLendService.getTokensForBorrowing(this.zLendContract);
        
                
      }

    });

    
    
    
  }


  getAvailableStats(token){
    let actualAvailable = 0.00;
    let actualAvailableInDollars = 0;

    let userTotalAmountAvailableForBorrowInDollars = token.userTotalAmountAvailableForBorrowInDollars;

    const tokenEquivalent =
      0.999 * ( userTotalAmountAvailableForBorrowInDollars / parseFloat(token.oneTokenToDollar));

    const tokenAvailableInContract = parseFloat(token.availableAmountInContract.amount);
    const tokenAvailableInContractInDollars = this.convertToDollar(token, tokenAvailableInContract)

    
    if (tokenAvailableInContract >= tokenEquivalent) {
      actualAvailable = tokenEquivalent;
      actualAvailableInDollars = this.convertToDollar(token, actualAvailable);
    } else {
      actualAvailable = tokenAvailableInContract;
      actualAvailableInDollars = tokenAvailableInContractInDollars;
    }

    return {
      actualAvailable,
      actualAvailableInDollars
    }
  }

  convertToDollar(token, value){
   return parseFloat(value) * token.oneTokenToDollar;
  }


  openBorrowModal(content: TemplateRef<any>,token){
    
    this.selectedToken = token;

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				// this.closeResult = `Closed with: ${result}`;

        console.log('closed successfully: ', result)
			},
			(reason) => {
				// this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

        console.log('Dismissed successfully: ', reason)
			},
		);


  }

 

  closeBorrowModal(){
      this.borrowModalVisible=false;
  }


  
  async borrowCoin () {

    this.spinner.show();
    const token = this.selectedToken;
    const amount = this.borrowFormGroup.get('amount')?.value;
    const value = ethers.utils.parseEther(amount.toString())
    
    try {
      
      

      const tx = await this.zLendContract!.borrow(value,token.tokenAddress);
      const borrowResult = await tx.wait();

      this.toastService.show('Success!','Your Borrowal has been sent succesfully!');
      
      this.spinner.hide();
      window.location.reload(); 
    } catch (err) {
      console.error('Error borrowing: ',err);
      this.spinner.hide();
      
      
      this.toastService.error('Oops!','Your Borrowing Failed');
    }
  };



  openAssetDetailsModal(assetDetailsModalContent : TemplateRef<any>, token){
    
    this.selectedToken = token;
    console.log('this.selectedToken: ', this.selectedToken)
    this.modalService.open(assetDetailsModalContent, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				// this.closeResult = `Closed with: ${result}`;

        console.log('closed asset successfully: ', result)
			},
			(reason) => {
				// this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

        console.log('Dismissed asset successfully: ', reason)
			},
		);


  }

 



  openRepayModal( token){
    
    this.selectedToken = token;
    this.repayModalVisible=true;


  }

 

  closeRepayModal(){
      this.repayModalVisible=false;
  }


  
  async repayCoin () {

    this.spinner.show();
    const token = this.selectedToken;
    let value = this.repayFormGroup.get('amount')?.value;

    //add interest
    const amount = value + Number(token.borrowAPYRate) * value;

    const amountToPayBackInWei = ethers.utils.parseEther(amount.toString());

    
    try {
      
      let approveHash = await this.web3Service.approveERC20Contract(token.tokenAddress, contractList[this.currentChainId].zLend!, this.web3Service.account!, amountToPayBackInWei);
      const transactionReceipt = waitForTransactionReceipt(wagmiConfig, {
        hash: approveHash,
      })
      
      const tx = await this.zLendContract!.payDebt(token.tokenAddress, ethers.utils.parseEther(value.toString()));
      const repayResult = await tx.wait();

      this.toastService.show('Success!','Your Repayment has been paid succesfully!');
      
      this.spinner.hide();
      window.location.reload(); 
    } catch (err) {
      console.error('Error repaying: ',err);
      this.spinner.hide();
      
      
      this.toastService.error('Oops!','Your Repayment Failed');
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
