import { Component, inject } from '@angular/core';
import { ApiService } from '../../core-module/services/api.service';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [],
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss'
})
export class StoreComponent {
  public apiService = inject(ApiService)

  constructor(){
    
  }

  ngOnInit(){
    console.log('inited store')
    // this.apiService.get('/users/me').subscribe(ss=>{
    //   console.log('ss:', ss)
    // })
  }
}
