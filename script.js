// Classe Veiculo (Base)
class Veiculo {
  constructor(modelo, cor, imagemSrc = 'default.jpg') {
      this.modelo = modelo;
      this.cor = cor;
      this.velocidade = 0;
      this.ligado = false;
      this.imagemSrc = imagemSrc; // Caminho da imagem
  }

  ligar() {
      if (!this.ligado) {
          this.ligado = true;
          console.log(`${this.modelo} ligado!`);
          this.tocarSomLigar(); // Tocar som ao ligar
      } else {
          console.log(`${this.modelo} já está ligado!`);
      }
      this.atualizarInformacoes();
  }

  desligar() {
      if (this.ligado) {
          this.ligado = false;
          this.velocidade = 0;
          console.log(`${this.modelo} desligado!`);
      } else {
          console.log(`${this.modelo} já está desligado!`);
      }
      this.atualizarInformacoes();
  }

  acelerar() {
      if (this.ligado) {
          this.velocidade += 10;
          console.log(`Acelerando ${this.modelo}! Velocidade: ${this.velocidade}`);
      } else {
          console.log(`O ${this.modelo} precisa estar ligado para acelerar!`);
      }
      this.atualizarInformacoes();
  }

  frear() {
      if (this.velocidade > 0) {
          this.velocidade -= 10;
          if (this.velocidade < 0) this.velocidade = 0;
          console.log(`Freando ${this.modelo}! Velocidade: ${this.velocidade}`);
      } else {
          console.log(`${this.modelo} já está parado!`);
      }
      this.atualizarInformacoes();
  }

  exibirInformacoes() {
      return `Modelo: ${this.modelo}, Cor: ${this.cor}, Ligado: ${this.ligado ? 'Sim' : 'Não'}, Velocidade: ${this.velocidade} km/h`;
  }

  atualizarInformacoes() {
      const informacoesElement = document.getElementById("informacoesVeiculo");
      informacoesElement.textContent = this.exibirInformacoes();

      const carroBaseElement = document.getElementById("carro-base");
      if (carroBaseElement && carroBaseElement.classList.contains("ativo")) {
          const velocidadeElement = document.getElementById("velocidade");
          velocidadeElement.textContent = `Velocidade: ${this.velocidade} km/h`;

          document.getElementById("status").textContent = this.ligado ? "Ligado" : "Desligado";
          document.getElementById("carro-imagem").src = this.imagemSrc; // Atualiza a imagem
          this.atualizarBarraAceleracao("carro-base");
      }
  }

  atualizarBarraAceleracao(veiculoId) {
      const barraProgresso = document.getElementById(`barra-progresso-${veiculoId}`);
      const porcentagem = Math.min(this.velocidade, 100); // Limita a 100%
      barraProgresso.style.width = `${porcentagem}%`;
  }

  tocarSomLigar() {
      const somLigar = document.getElementById("som-ligar");
      if (somLigar) {
          somLigar.play();
      }
  }
}

// Classe CarroEsportivo (Herança de Veiculo)
class CarroEsportivo extends Veiculo {
  constructor(modelo, cor, imagemSrc = 'default_esportivo.jpg') {
      super(modelo, cor, imagemSrc);
      this.turboAtivado = false;
  }

  ativarTurbo() {
      if (this.ligado) {
          this.turboAtivado = true;
          this.acelerar(); // Turbo dá um boost extra de velocidade
          this.acelerar();
          console.log(`Turbo ativado no ${this.modelo}!`);
      } else {
          console.log(`Ligue o ${this.modelo} para ativar o turbo.`);
      }
      this.atualizarInformacoes();
  }

  exibirInformacoes() {
      return `${super.exibirInformacoes()}, Turbo: ${this.turboAtivado ? 'Ativado' : 'Desativado'}`;
  }

  atualizarInformacoes() {
      super.atualizarInformacoes();

      const carroEsportivoElement = document.getElementById("carro-esportivo");
      if (carroEsportivoElement && carroEsportivoElement.classList.contains("ativo")) {
          const velocidadeElement = document.getElementById("velocidade-esportivo");
          velocidadeElement.textContent = `Velocidade: ${this.velocidade} km/h`;

          document.getElementById("status-esportivo").textContent = this.ligado ? "Ligado" : "Desligado";
          document.getElementById("turbo-status").textContent = `Turbo: ${this.turboAtivado ? 'Ativado' : 'Desativado'}`;
          document.getElementById("carro-esportivo-imagem").src = this.imagemSrc; // Atualiza a imagem
          this.atualizarBarraAceleracao("carro-esportivo");
      }
  }

  atualizarBarraAceleracao(veiculoId) {
      const barraProgresso = document.getElementById(`barra-progresso-${veiculoId}`);
      const porcentagem = Math.min(this.velocidade, 100); // Limita a 100%
      barraProgresso.style.width = `${porcentagem}%`;
  }
}

// Classe Caminhao (Herança de Veiculo)
class Caminhao extends Veiculo {
  constructor(modelo, cor, capacidadeCarga, imagemSrc = 'default_caminhao.jpg') {
      super(modelo, cor, imagemSrc);
      this.capacidadeCarga = capacidadeCarga;
      this.cargaAtual = 0;
  }

  carregar(peso) {
      if (this.ligado) {
          if (this.cargaAtual + peso <= this.capacidadeCarga) {
              this.cargaAtual += peso;
              console.log(`Caminhão ${this.modelo} carregado com ${peso} kg. Carga atual: ${this.cargaAtual} kg.`);
          } else {
              console.log(`Caminhão ${this.modelo} excedeu a capacidade de carga. Carga máxima: ${this.capacidadeCarga} kg.`);
          }
      } else {
          console.log(`Ligue o ${this.modelo} para carregar.`);
      }
      this.atualizarInformacoes();
  }

  exibirInformacoes() {
      return `${super.exibirInformacoes()}, Carga: ${this.cargaAtual}/${this.capacidadeCarga} kg`;
  }

  atualizarInformacoes() {
      super.atualizarInformacoes();

      const caminhaoElement = document.getElementById("caminhao");
      if (caminhaoElement && caminhaoElement.classList.contains("ativo")) {
          const velocidadeElement = document.getElementById("velocidade-caminhao");
          velocidadeElement.textContent = `Velocidade: ${this.velocidade} km/h`;

          document.getElementById("status-caminhao").textContent = this.ligado ? "Ligado" : "Desligado";
          document.getElementById("carga-status").textContent = `Carga: ${this.cargaAtual}/${this.capacidadeCarga} kg`;
          document.getElementById("caminhao-imagem").src = this.imagemSrc; // Atualiza a imagem
          this.atualizarBarraAceleracao("caminhao");
      }
  }

  atualizarBarraAceleracao(veiculoId) {
      const barraProgresso = document.getElementById(`barra-progresso-${veiculoId}`);
      const porcentagem = Math.min(this.velocidade, 100); // Limita a 100%
      barraProgresso.style.width = `${porcentagem}%`;
  }
}

// Criando objetos
const meuCarro = new Veiculo("Pagani Zonda R", "Preto", "pagani R.jpg");
const ferrari = new CarroEsportivo("Ferrari", "Vermelha", "fcr.webp");
const scania = new Caminhao("Scania", "Azul", 10000, "Scania-30-G.webp");

// Função genérica para interagir com os veículos
function interagir(veiculo, acao, valor) {
  switch (acao) {
      case 'ligar':
          veiculo.ligar();
          break;
      case 'desligar':
          veiculo.desligar();
          break;
      case 'acelerar':
          veiculo.acelerar();
          break;
      case 'frear':
          veiculo.frear();
          break;
      case 'ativarTurbo':
          if (veiculo instanceof CarroEsportivo) {
              veiculo.ativarTurbo();
          } else {
              console.log("Essa ação não é suportada para este veículo.");
          }
          break;
      case 'carregar':
          if (veiculo instanceof Caminhao) {
              veiculo.carregar(parseInt(valor));
          } else {
              console.log("Essa ação não é suportada para este veículo.");
          }
          break;
      default:
          console.log("Ação inválida.");
  }
}

// Adicionando event listeners aos botões
document.querySelectorAll('button[data-acao]').forEach(button => {
  button.addEventListener('click', function() {
      const acao = this.dataset.acao;
      const veiculoNome = this.dataset.veiculo;
      let veiculo;

      switch (veiculoNome) {
          case 'meuCarro':
              veiculo = meuCarro;
              break;
          case 'ferrari':
              veiculo = ferrari;
              break;
          case 'scania':
              veiculo = scania;
              break;
          default:
              console.log("Veículo inválido.");
              return;
      }

      let valor = document.getElementById('carga') ? document.getElementById('carga').value : null;

      interagir(veiculo, acao, valor);
  });
});

// Função para exibir o veículo selecionado
function exibirVeiculo(veiculoId) {
  // Oculta todos os veículos
  document.querySelectorAll('.veiculo-container').forEach(veiculo => {
      veiculo.classList.remove('ativo');
  });

  // Exibe o veículo selecionado
  const veiculoSelecionado = document.getElementById(veiculoId);
  if (veiculoSelecionado) {
      veiculoSelecionado.classList.add('ativo');
  }
}

// Adiciona event listeners aos botões do menu
document.getElementById('menu-veiculos').querySelectorAll('button').forEach(button => {
  button.addEventListener('click', function() {
      const veiculoId = this.dataset.veiculo;
      exibirVeiculo(veiculoId);
      atualizarFormularioEdicao(veiculoId); // Atualiza o formulário ao selecionar o veículo
  });
});

// Edição de Veículos
document.getElementById('salvar-veiculo').addEventListener('click', function() {
  const veiculoAtivoId = document.querySelector('.veiculo-container.ativo').id;
  const modelo = document.getElementById('modelo').value;
  const cor = document.getElementById('cor').value;
  const imagemInput = document.getElementById('imagem');
  const imagemArquivo = imagemInput.files[0];

  let veiculo;
  switch (veiculoAtivoId) {
      case 'carro-base':
          veiculo = meuCarro;
          break;
      case 'carro-esportivo':
          veiculo = ferrari;
          break;
      case 'caminhao':
          veiculo = scania;
          break;
      default:
          console.log("Veículo inválido.");
          return;
  }

  veiculo.modelo = modelo;
  veiculo.cor = cor;

  // Atualizar a imagem se um novo arquivo foi selecionado
  if (imagemArquivo) {
      const leitor = new FileReader();
      leitor.onload = function(e) {
          veiculo.imagemSrc = e.target.result;
          veiculo.atualizarInformacoes(); // Atualiza a exibição do veículo
      }
      leitor.readAsDataURL(imagemArquivo);
  } else {
      veiculo.atualizarInformacoes(); // Atualiza a exibição do veículo
  }
});

function atualizarFormularioEdicao(veiculoId) {
  let veiculo;
  switch (veiculoId) {
      case 'carro-base':
          veiculo = meuCarro;
          break;
      case 'carro-esportivo':
          veiculo = ferrari;
          break;
      case 'caminhao':
          veiculo = scania;
          break;
      default:
          console.log("Veículo inválido.");
          return;
  }

  document.getElementById('modelo').value = veiculo.modelo;
  document.getElementById('cor').value = veiculo.cor;
  document.getElementById('imagem').value = ''; // Limpa o campo de imagem
}

// Exibe o primeiro veículo por padrão (opcional)
exibirVeiculo('carro-base');
atualizarFormularioEdicao('carro-base');