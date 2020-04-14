import { Component, OnInit, ViewChild } from '@angular/core';
import { TransactionsService } from '../transaction.service';
import { MatTableDataSource,MatTableModule} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
 


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  dataSource; 
  displayedColumns = ['username','date','amount','balance' ];
  constructor(private transactionService: TransactionsService) { }

  ngOnInit(): void {
    this.transactionService.fetch().subscribe(results => {
      if(!results){
        return;
      }
      this.dataSource= new MatTableDataSource(results)
      this.dataSource.sort=this.sort;
    })
  }
  
}
