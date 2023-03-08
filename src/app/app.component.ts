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

  selected:boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.selectedSubquest = this.nowJsonData.quests[0].subquests[0]
    this.selected = true
  }

  selectSubquest(subquest: { nome: string; descricao: string; pecas: { objetivo: string; status: string; resultados: string[]; }[]; }) {
    this.selectedSubquest = subquest
    this.selected = true;
  }
  
}
