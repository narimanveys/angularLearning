import { Component, OnInit } from '@angular/core';
//import { Observable } from 'rxjs';
//import { Transaction } from 'src/app/shared/interfaces';
import { TransactionsService } from '../transaction.service';
import { MatTableDataSource,MatTableModule} from '@angular/material/table';



@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
 MatTable: any
  //transactions$: Observable<Transaction[]>
  // date: Date
  // username: string
  // amount: number
  // balance: number
  dataSource; 
  displayedColumns = ['username','date','amount','balance' ];
  constructor(private transactionService: TransactionsService) { }

  ngOnInit(): void {
    this.transactionService.fetch().subscribe(results => {
      if(!results){
        return;
      }
      this.dataSource= new MatTableDataSource(results)
    })
    //this.transactions$= this.transactionService.fetch()
  }
  
}
