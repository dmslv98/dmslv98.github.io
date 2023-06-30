import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {
id_cli = '';

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
    private router : Router,
    private service : ClienteService,
    private route: ActivatedRoute){}

  ngOnInit(): void {
     this.id_cli = this.route.snapshot.paramMap.get('id')! 
     this.findById(); 
  }

  findById(): void {
    this.service.findById(this.id_cli).subscribe(resposta =>{
    this.cliente = resposta;
  })
  }

  update():void {
    this.service.update(this.cliente).subscribe((resposta) => {
      this.router.navigate(['clientes'])
      this.service.message('Cliente atualizado com sucesso!')
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

  cancel():void{
    this.router.navigate(["clientes"])
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
