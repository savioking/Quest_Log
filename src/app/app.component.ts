import { Component, OnInit } from '@angular/core';
import * as jsonData from 'src/assets/quests/quests.json'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'QuestLog';
  nowJsonData = jsonData;
  selectedSubquest!: {
    nome: string;
    descricao: string;
    pecas: {
      objetivo: string;
      status: string;
      resultados: string[];
    }[];
  };

  isPecasOpenData: {isPecasOpen:boolean[],subquestNome:string}[] = [];

  currentIsPecasOpen: boolean[] = []

  selected:boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.selectedSubquest = this.nowJsonData.quests[0].subquests[0]
    this.selected = true
    let newIsPecasOpen = [];
    for (let i = 0; i < this.selectedSubquest.pecas.length; i++) {
      newIsPecasOpen.push(false);
    }
    this.isPecasOpenData.push({subquestNome:this.selectedSubquest.nome,isPecasOpen:newIsPecasOpen});
    this.currentIsPecasOpen = this.isPecasOpenData.find((cur,i)=> {
      return cur.subquestNome = this.selectedSubquest.nome;
    })!.isPecasOpen;
    console.log(this.isPecasOpenData)
  }

  selectSubquest(subquest: { nome: string; descricao: string; pecas: { objetivo: string; status: string; resultados: string[]; }[]; }) {
    // PEGAR ANTIGO, SALVAR isPecasOpen ANTIGO NO LUGAR CERTO
    // PEGAR NOVO, TROCAR currentIsPecasOpen PARA O NOVO
    this.selectedSubquest = subquest
    this.selected = true;
  }

  changePecaOpen(index:number) {
    this.currentIsPecasOpen[index] = !this.currentIsPecasOpen[index]
  }
  
}
