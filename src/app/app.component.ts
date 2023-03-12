import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
    concluida:boolean,
    pecas: {
      objetivo: string;
      status: string;
      resultados: string[];
    }[];
  };

  isPecasOpenData: {isPecasOpen:boolean[],subquestNome:string}[] = [];

  currentIsPecasOpen: boolean[] = []

  selected:boolean = false;
  sideBarOpen:boolean = false;

  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {
    this.selectedSubquest = this.nowJsonData.quests[0].subquests[0]
    this.selected = true
    for (let k = 0; k < this.nowJsonData.quests.length; k++) {
      const quest = this.nowJsonData.quests[k];
      
      for (let j = 0; j < quest.subquests.length; j++) {
        const subquest = quest.subquests[j];
        let newIsPecasOpen = [];
        
        for (let i = 0; i < subquest.pecas.length; i++) {
          newIsPecasOpen.push(true);
        }
        this.isPecasOpenData.push({subquestNome:subquest.nome,isPecasOpen:newIsPecasOpen});
      }
    }
    this.currentIsPecasOpen = JSON.parse(JSON.stringify(this.getPecasOpen(this.selectedSubquest.nome)!.isPecasOpen))
    console.log(this.isPecasOpenData)
  }

  async selectSubquest(subquest: { nome: string; descricao: string; concluida:boolean; pecas: { objetivo: string; status: string; resultados: string[]; }[]; }) {

    let rightID = this.getPecasOpenPos(this.selectedSubquest.nome);

    if(rightID == -1) {
      this.toastr.warning('Não foi possível encontrar a subquest')
      return;
    }

    this.isPecasOpenData[rightID].isPecasOpen = JSON.parse(JSON.stringify(this.currentIsPecasOpen))
    
    this.currentIsPecasOpen = JSON.parse(JSON.stringify(this.getPecasOpen(subquest.nome)!.isPecasOpen));

    this.selectedSubquest = subquest
    this.selected = true;
    
  }

  changePecaOpen(index:number) {
    this.currentIsPecasOpen[index] = !this.currentIsPecasOpen[index]
  }

  getPecasOpen(nome:string) {
    return this.isPecasOpenData.find((cur,i)=> {
      return cur.subquestNome == nome;
    });
  }

  getPecasOpenPos(nome:string) {
    return this.isPecasOpenData.findIndex((cur,i)=> {
      return cur.subquestNome == nome;
    });
  }

  toggleSideBar() {
    this.sideBarOpen = !this.sideBarOpen
  }
  
}
