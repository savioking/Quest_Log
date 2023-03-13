# QuestLog

Esse projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 14.2.7.

Este é um app que mostra as missões atuais e concluídas, assim como os passos, objetivos e eventos delas, de um grupo de RPG narrado por mim na plataforma [Firecast]()

## Dados

Os dados exibidos neste app são armazenados em um arquivo JSON. Quando traduzidos para typescript têm o seguinte formato de objeto:
```typescript
{
    quests: {
        nome: string;
        subquests: {
            nome: string;
            descricao: string;
            concluida: boolean;
            pecas: {
                objetivo: string;
                status: "falha" | "progresso" | "sucesso";
                resultados: string[];
            }[];
        }[];
    }[];
}
```