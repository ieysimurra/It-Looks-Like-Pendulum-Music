# 🎶 Pêndulos Musicais Interativos / Interactive Musical Pendulums

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![p5.js](https://img.shields.io/badge/p5.js-ED225D?style=flat&logo=p5.js&logoColor=white)](https://p5js.org/)
[![Tone.js](https://img.shields.io/badge/Tone.js-blue)](https://tonejs.github.io/)

[🇺🇸 English](readme_en.md) | 🇧🇷 Português

Uma aplicação interativa que combina simulação física de pêndulos duplos com síntese sonora em tempo real, inspirada na obra "Pendulum Music" de Steve Reich.

## 🎯 Sobre o Projeto

Este projeto explora a intersecção entre movimento físico e criação musical através de pêndulos duplos virtuais. Cada pêndulo gera sons únicos baseados em suas propriedades físicas (massa, comprimento, ângulo) e posição no espaço, criando paisagens sonoras hipnotizantes e imprevisíveis.

### ✨ Características Principais

- **Simulação Física Realista**: Pêndulos duplos com comportamento caótico autêntico
- **Síntese Sonora Dinâmica**: Sons gerados em tempo real usando Tone.js
- **Interface Intuitiva**: Controles deslizantes para ajuste fino de parâmetros
- **Gravação Integrada**: Capture áudio e vídeo de suas criações
- **Múltiplos Pêndulos**: Suporte para até 5 pêndulos simultâneos
- **Visualização Rica**: Rastros coloridos e animações suaves
- **Responsivo**: Adaptável a diferentes tamanhos de tela

## 🚀 Demonstração

**[▶️ Experimente Online](https://editor.p5js.org/ieysimurra/sketches/t3md26c1C)**

![Demo GIF](assets/demo.gif)

## 🎮 Como Usar

### Controles Básicos

1. **Adicionar Pêndulo**: Clique em "Add Pendulum" para criar um novo pêndulo
2. **Ajustar Parâmetros**: Use os controles deslizantes à esquerda:
   - **Ângulos**: Posição inicial dos braços
   - **Comprimentos**: Tamanho dos braços do pêndulo
   - **Massas**: Peso dos pesos do pêndulo
   - **Cores**: Componentes vermelho e azul dos pesos
   - **Gravidade**: Força gravitacional
   - **Amplitude**: Volume do som

3. **Visualização**:
   - **Zoom In/Out**: Aproximar ou afastar a visualização
   - **Arrastar**: Mover a visualização pela tela
   - **Show/Hide Controls**: Ocultar/mostrar controles

4. **Gravação**:
   - **Start Video Record**: Grava vídeo com áudio
   - **Start Audio Record**: Grava apenas áudio
   - **Download**: Links automáticos para download

### 🎵 Mapeamento Sonoro

| Parâmetro Físico | Parâmetro Sonoro |
|------------------|------------------|
| Massa | Frequência base |
| Posição X | Panorama estéreo |
| Slider Vermelho | Harmonicidade FM |
| Slider Azul | Índice de modulação |
| Amplitude | Volume geral |

## 🛠️ Instalação Local

### Pré-requisitos

- Navegador web moderno
- Servidor web local (opcional, para desenvolvimento)

### Instalação Rápida

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/interactive-musical-pendulums.git
cd interactive-musical-pendulums
```

2. Abra `index.html` no navegador ou inicie um servidor local:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js
npx serve .
```

3. Acesse `http://localhost:8000`

## 📁 Estrutura do Projeto

```
interactive-musical-pendulums/
├── index.html              # Página principal
├── sketch.js              # Código principal p5.js
├── style.css              # Estilos CSS
├── assets/                # Recursos visuais
│   ├── demo.gif
│   ├── screenshots/
│   └── icons/
├── docs/                  # Documentação
│   ├── TUTORIAL.md
│   ├── API.md
│   └── PHYSICS.md
├── examples/              # Exemplos de uso
│   ├── basic-setup.js
│   ├── advanced-config.js
│   └── custom-mappings.js
├── tests/                 # Testes
├── CHANGELOG.md
├── CONTRIBUTING.md
├── LICENSE
└── README.md
```

## 🎨 Personalização

### Adicionando Novos Mapeamentos Sonoros

```javascript
// Exemplo: Mapear velocidade para reverb
let velocity = this.arm1.aVelocity;
let reverbAmount = map(abs(velocity), 0, 0.1, 0, 0.8);
this.reverb.roomSize.rampTo(reverbAmount, 0.1);
```

### Configurando Novos Sintetizadores

```javascript
// Substituir FMSynth por outro tipo
this.synth1 = new Tone.AMSynth({
  harmonicity: 2,
  detune: 0,
  oscillator: { type: 'sine' },
  envelope: {
    attack: 0.1,
    decay: 0.2,
    sustain: 0.3,
    release: 0.4
  }
});
```

## 🔬 Base Científica

### Pêndulos Duplos

O movimento de um pêndulo duplo é governado por equações diferenciais não-lineares que exibem comportamento caótico. Pequenas mudanças nas condições iniciais podem levar a trajetórias completamente diferentes.

### Síntese por Modulação de Frequência (FM)

Utiliza o algoritmo de síntese FM desenvolvido por John Chowning na década de 1970, onde uma onda (moduladora) modula a frequência de outra onda (portadora), criando timbres complexos.

## 📚 Recursos de Aprendizado

- [Tutorial Completo](docs/TUTORIAL.md)
- [Documentação da API](docs/API.md)
- [Fundamentos Físicos](docs/PHYSICS.md)
- [Teoria Musical](docs/MUSIC_THEORY.md)

## 🤝 Contribuindo

Contribuições são bem-vindas! Veja [CONTRIBUTING.md](CONTRIBUTING.md) para diretrizes.

### Como Contribuir

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- **Steve Reich** - Inspiração da obra "Pendulum Music" (1968)
- **p5.js Foundation** - Framework de arte criativa
- **Tone.js Team** - Biblioteca de áudio web
- **Comunidade Open Source** - Contribuições e feedback

## 📊 Status do Projeto

- ✅ Simulação física básica
- ✅ Síntese sonora em tempo real
- ✅ Interface de usuário
- ✅ Gravação de áudio/vídeo
- 🔄 Presets salvos
- 🔄 Modo colaborativo
- 📋 Sistema de plugins
- 📋 Aplicativo mobile

## 📞 Contato

- **Email**: [ieysimurra@gmail.co,](mailto:ieysimurra@gmail.com)
- **GitHub**: [@ieysimurra](https://github.com/ieysimurra)
- **Website**: [em construção](https://seu-site.com)

---

**[⭐ Se gostou do projeto, deixe uma estrela!](https://github.com/ieysimurra/It-Looks-Like-On-December/stargazers)**
