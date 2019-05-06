import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../produto/produto.service';
import { Router } from '@angular/router';
import { Produto } from '../produto/produto';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {


produto: any;

constructor(
  private produtoService: ProdutoService,
  
   private router: Router) { }

   ngOnInit() {
    this.produto = this.produtoService.getAll();
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }

  delete(key:string){
    this.produtoService.delete(key);
}

edit(produto: Produto, key: string) {
  this.router.navigate(['/cadastro'])
 
}
}
