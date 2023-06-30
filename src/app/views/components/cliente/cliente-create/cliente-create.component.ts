import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent {

  cliente: Cliente = {
			id:  "",
			nome:  "",
			cpf:  "",
			telefone:  ""		
	}

  nome = new FormControl("", [Validators.minLength(5)])
  cpf = new FormControl("", [Validators.minLength(11)])
  telefone = new FormControl("", [Validators.minLength(11)])


  constructor(
    private service : ClienteService, 
    private router : Router){}

  ngOnInit(): void {      
  }

  cancel():void{
    this.router.navigate(["clientes"])
  }

  create():void {
		this.service.create(this.cliente).subscribe( (resposta) =>{
        this.router.navigate(["clientes"])
        this.service.message('Cliente criado com sucesso')
    }, err =>{
        //console.log(err)
        if(err.error.error.match('já cadastrado')) {
          this.service.message(err.error.error)
        }else if(err.error.error.match('Erro na validacao')) {
          console.log(err)        
          //this.service.message(err.error.error)
          this.service.message("CPF Inválido")
        }        
    })
	}

  errorValidNome(){
    if(this.nome.invalid){
      return 'O nome deve ter no mínimo 5 caracteres';
    }
    return false;
  }  

  errorValidCpf(){
    if(this.cpf.invalid){
      return 'O CPF deve ter no mínimo 11 caracteres';
    }
    return false;
  }

  errorValidTelefone(){
      if(this.telefone.invalid){
        return 'O telefone deve ter no mínimo 11 caracteres';
      }
      return false;
  }

}
