import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';


@Component({
  selector: 'app-cliente-read',
  templateUrl: './cliente-read.component.html',
  styleUrls: ['./cliente-read.component.css']
})
export class ClienteReadComponent {

  clientes: Cliente[] = [];     //tem que já ter o models cliente.ts

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'telefone', 'action'];
  dataSource = new MatTableDataSource<Cliente>(this.clientes);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service : ClienteService, 
    private router : Router){}

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
    this.findAll();
  }

  findAll(){
    this.service.findAll().subscribe( (resposta) =>{
      this.clientes = resposta;     
      this.dataSource = new MatTableDataSource<Cliente>(this.clientes);
      this.dataSource.paginator = this.paginator;
    } )
  }

  navigateToCreate():void{
    this.router.navigate(["clientes/create"])    
  } 

}