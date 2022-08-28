const inquirer = require('inquirer');

const acoes = require("./settings/acoes");
const perguntas = require('./settings/perguntas');
const funcoes = require('./funcoes');

function funcaoAindaPorDeinir(){
    console.log("Você ainda não definiu essa função.");
}

funcoes.listar          = funcoes.listar            ? funcoes.listar          : funcaoAindaPorDeinir;
funcoes.descrever       = funcoes.descrever         ? funcoes.descrever       : funcaoAindaPorDeinir;
funcoes.adicionar       = funcoes.adicionar         ? funcoes.adicionar       : funcaoAindaPorDeinir;
funcoes.atribuirServico = funcoes.atribuirServico   ? funcoes.atribuirServico : funcaoAindaPorDeinir;
funcoes.vacinar         = funcoes.vacinar           ? funcoes.vacinar         : funcaoAindaPorDeinir;
funcoes.remover         = funcoes.remover           ? funcoes.remover         : funcaoAindaPorDeinir;


function tratarRespostas(respostas) {
    switch(respostas.acao){

        case acoes.LISTAR:
            funcoes.listar();
        break


        case acoes.DESCREVER:
            funcoes.descrever(respostas.idCachorroParaDescrever);
        break;


        case acoes.ADICIONAR:
            funcoes.adicionar(
                {
                    nome: respostas.nomeDoCachorro,
                    sexo: respostas.sexoDoCachorro,
                    castrado: respostas.cachorroCastrado=="Sim",
                    dataDeNascimento: respostas.dataNascimentoDoCachorro,
                    peso: respostas.pesoDoCachorro
                }
            );
        break;


        case acoes.VACINAR:
            funcoes.vacinar(respostas.idDoCachorroVacina, respostas.vacina);
        break;


        case acoes.SERVICO:
            funcoes.atribuirServico(respostas.idDoCachorroServico, respostas.servico);
        break


        case acoes.REMOVER:
            if(respostas.confirmaRemocao){
                funcoes.remover(respostas.idCachorroParaRemover)
            }
        break;

        case acoes.SAIR:
            process.exit(0);

    }
}

function startInquire(){
    inquirer.prompt(perguntas)
    .then(
        respostas => {
            console.clear();
            tratarRespostas(respostas);
            startInquire();
        }
    )
}

console.clear();
startInquire();

