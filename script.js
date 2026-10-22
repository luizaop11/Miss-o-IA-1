const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaFeedback = document.querySelector(".caixa-feedback");
const textoFeedback = document.querySelector(".texto-feedback");
const botaoProxima = document.querySelector(".botao-proxima");

const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");
const resumoEscolhas = document.querySelector(".resumo-escolhas");
const botaoReiniciar = document.querySelector(".botao-reiniciar");

const progresso = document.querySelector(".progresso");
const numeroPergunta = document.querySelector("#numero-pergunta");
const porcentagem = document.querySelector("#porcentagem");
const barraProgresso = document.querySelector(".barra-progresso-preenchida");
const barraProgressoContainer = document.querySelector(".barra-progresso");

const perguntas = [
  {
    enunciado:
      "O governo criou um lote único de uma pílula que duplica a inteligência e o foco de quem a toma. Como escolher os jovens que vão recebê-la?",

    alternativas: [
      {
        texto:
          "Dar aos alunos com maiores notas, premiando quem já demonstrou esforço e disciplina nos estudos.",
        afirmacao:
          "Você acredita que o potencial máximo deve coroar o mérito e a dedicação prévia do indivíduo."
      },
      {
        texto:
          "Dar aos alunos com maior dificuldade de aprendizado, usando a pílula para equilibrar a capacidade de todos.",
        afirmacao:
          "Você considera que a justiça social deve corrigir as desvantagens antes de cobrar resultados."
      }
    ]
  },

  {
    enunciado:
      'No futuro, cidadãos ganham pontos de "Karma" por boas ações para conseguir morar nos melhores bairros. Um jovem rico passa o dia gravando caridade para a internet e sobe no ranking, enquanto um trabalhador braçal não tem tempo nem energia para acumular pontos. O ranking do jovem rico é justo?',

    alternativas: [
      {
        texto:
          "Sim. O que importa para a sociedade é o volume final de ajuda oferecida, não a facilidade de quem a oferece.",
        afirmacao:
          "Você acredita que o benefício gerado para o coletivo deve ser premiado de forma objetiva."
      },
      {
        texto:
          "Não. O algoritmo deveria considerar as condições financeiras e as oportunidades de cada pessoa.",
        afirmacao:
          "Você considera que o mérito precisa levar em conta as desigualdades e não apenas os resultados."
      }
    ]
  },

  {
    enunciado:
      "A Terra está colapsando e a primeira colônia em Marte ficou pronta, mas as vagas são limitadas. Quem deve ir?",

    alternativas: [
      {
        texto:
          "Os bilionários e os maiores cientistas. Quem financiou tecnologias ou demonstrou conhecimento pode contribuir para a sobrevivência da colônia.",

        afirmacao:
          "Você considera que recursos financeiros e conhecimentos especializados devem ter peso na escolha de quem irá para Marte."
      },
      {
        texto:
          "Cidadãos sorteados de forma igualitária, reunindo pessoas de diferentes classes sociais para recomeçar.",

        afirmacao:
          "Você acredita que a dignidade humana e a diversidade social devem ser consideradas, independentemente da riqueza."
      }
    ]
  },

  {
    enunciado:
      "Em um jogo de realidade virtual que gera dinheiro real, um jogador genial passa 10 anos construindo um império e falece. Ele deixa o império, nível 100, para o filho, que nunca jogou. O que o jogo deve fazer?",

    alternativas: [
      {
        texto:
          "Entregar o império ao filho. O direito de transmitir o fruto do próprio trabalho para quem se ama pode incentivar a dedicação.",

        afirmacao:
          "Você considera que o direito à herança e à propriedade privada deve ser protegido."
      },
      {
        texto:
          "Deletar o império e redistribuir as moedas no servidor. Ninguém deveria começar no topo apenas por ser filho do dono.",

        afirmacao:
          "Você considera que as oportunidades devem ser distribuídas de forma mais igualitária, evitando privilégios herdados."
      }
    ]
  },

  {
    enunciado:
      'Uma inteligência artificial de RH elimina candidatos que usam gírias ou sotaques periféricos em entrevistas de voz, contratando apenas quem fala o "português erudito" das classes altas. A IA deve ser mantida?',

    alternativas: [
      {
        texto:
          "Sim, desde que a comunicação exigida seja realmente relevante para a função e a avaliação seja justa.",

        afirmacao:
          "Você considera que padrões profissionais podem ser importantes, mas devem ter relação com as competências necessárias ao trabalho."
      },
      {
        texto:
          "Não, o sistema deve ser corrigido. A maneira de falar não determina, por si só, o talento profissional.",

        afirmacao:
          "Você considera que sotaques e variedades linguísticas não devem ser confundidos com falta de competência."
      }
    ]
  }
];

let atual = 0;
let escolhas = [];

function atualizarProgresso(percentual) {
  const total = perguntas.length;
  const numeroAtual = Math.min(atual + 1, total);

  numeroPergunta.textContent =
    atual >= total
      ? "Jornada concluída"
      : `Pergunta ${numeroAtual} de ${total}`;

  porcentagem.textContent = `${percentual}%`;
  barraProgresso.style.width = `${percentual}%`;

  barraProgressoContainer.setAttribute("aria-valuenow", percentual);
}

function mostraPergunta() {
  if (atual >= perguntas.length) {
    mostraResultado();
    return;
  }

  const perguntaAtual = perguntas[atual];

  caixaResultado.hidden = true;
  caixaFeedback.hidden = true;
  caixaAlternativas.hidden = false;
  progresso.hidden = false;

  caixaPerguntas.textContent = perguntaAtual.enunciado;
  caixaAlternativas.replaceChildren();

  atualizarProgresso(
    Math.round(((atual + 1) / perguntas.length) * 100)
  );

  botaoProxima.textContent =
    atual === perguntas.length - 1
      ? "Ver resultado →"
      : "Próxima pergunta →";

  perguntaAtual.alternativas.forEach((alternativa, indice) => {
    const botao = document.createElement("button");
    botao.type = "button";

    const letra = document.createElement("span");
    letra.className = "letra-alternativa";
    letra.textContent = String.fromCharCode(65 + indice);

    const texto = document.createElement("span");
    texto.textContent = alternativa.texto;

    botao.append(letra, texto);

    botao.addEventListener("click", () => {
      selecionarAlternativa(alternativa);
    });

    caixaAlternativas.appendChild(botao);
  });
}

function selecionarAlternativa(alternativa) {
  if (caixaFeedback.hidden === false) {
    return;
  }

  escolhas[atual] = alternativa;

  caixaAlternativas.hidden = true;
  caixaFeedback.hidden = false;

  textoFeedback.textContent = alternativa.afirmacao;
  botaoProxima.focus();
}

function proximaPergunta() {
  if (caixaFeedback.hidden) {
    return;
  }

  atual++;
  mostraPergunta();

  if (atual < perguntas.length) {
    caixaPerguntas.focus();
  }
}

function mostraResultado() {
  caixaPerguntas.textContent = "";
  caixaAlternativas.hidden = true;
  caixaFeedback.hidden = true;
  progresso.hidden = false;

  caixaResultado.hidden = false;
  resumoEscolhas.replaceChildren();

  atualizarProgresso(100);

  textoResultado.textContent =
    "Ao longo desta jornada, você refletiu sobre os riscos, as oportunidades e a responsabilidade no uso da inteligência artificial. O futuro não depende apenas da tecnologia, mas também das decisões das pessoas que a desenvolvem e utilizam. Suas escolhas ajudam a revelar diferentes perspectivas sobre mérito, igualdade e justiça social.";

  escolhas.forEach((escolha, indice) => {
    const item = document.createElement("article");
    item.className = "item-resumo";

    const titulo = document.createElement("strong");
    titulo.textContent =
      `Pergunta ${indice + 1}: ${escolha.texto}`;

    const mensagem = document.createElement("p");
    mensagem.textContent = escolha.afirmacao;

    item.append(titulo, mensagem);
    resumoEscolhas.appendChild(item);
  });

  botaoReiniciar.focus();
}

function reiniciarJogo() {
  atual = 0;
  escolhas = [];

  caixaPerguntas.textContent = "";
  textoFeedback.textContent = "";
  textoResultado.textContent = "";

  caixaAlternativas.replaceChildren();
  resumoEscolhas.replaceChildren();

  caixaResultado.hidden = true;
  caixaFeedback.hidden = true;
  caixaAlternativas.hidden = false;
  progresso.hidden = false;

  mostraPergunta();
  caixaPerguntas.focus();
}

botaoProxima.addEventListener("click", proximaPergunta);
botaoReiniciar.addEventListener("click", reiniciarJogo);

mostraPergunta();