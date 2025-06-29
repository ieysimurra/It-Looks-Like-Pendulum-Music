# 🤝 Contributing to Interactive Musical Pendulums

[🇺🇸 English](#english) | [🇧🇷 Português](#português)

---

## English

We love your input! We want to make contributing to Interactive Musical Pendulums as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## 🚀 Development Process

We use GitHub to sync code. All code changes happen through pull requests.

### Pull Requests Process

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

## 🐛 Bug Reports

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/your-username/interactive-musical-pendulums/issues); it's that easy!

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

## 💡 Feature Requests

We welcome feature requests! Please provide:

- **Use case**: Describe what you want to accomplish
- **Proposed solution**: If you have ideas on implementation
- **Alternatives considered**: Other ways to achieve the same goal

### Priority Features

- [ ] Preset saving system
- [ ] Real-time collaboration
- [ ] Mobile optimization
- [ ] Plugin architecture
- [ ] MIDI controller support
- [ ] WebXR integration

## 🎨 Code Style

### JavaScript Style Guide

- Use ES6+ features when possible
- Prefer `const` and `let` over `var`
- Use meaningful variable names
- Comment complex physics calculations
- Follow p5.js naming conventions

```javascript
// Good
const pendulumCount = 5;
const maxVelocity = 0.1;

// Bad
var n = 5;
var mv = 0.1;
```

### File Organization

```
src/
├── core/              # Core physics and audio classes
│   ├── Pendulum.js
│   ├── Arm.js
│   └── AudioEngine.js
├── ui/                # User interface components
│   ├── Controls.js
│   └── Recorder.js
├── utils/             # Utility functions
│   ├── math.js
│   └── audio.js
└── examples/          # Example configurations
```

## 🔧 Setting Up Development Environment

1. **Clone your fork**:
```bash
git clone https://github.com/your-username/interactive-musical-pendulums.git
cd interactive-musical-pendulums
```

2. **Install dependencies** (if using build tools):
```bash
npm install
```

3. **Start development server**:
```bash
npm run dev
# or
python -m http.server 8000
```

4. **Run tests**:
```bash
npm test
```

## 🧪 Testing

### Types of Tests

- **Unit Tests**: Test individual functions and classes
- **Integration Tests**: Test component interactions
- **Visual Tests**: Test rendering and animations
- **Audio Tests**: Test sound generation and mapping

### Writing Tests

```javascript
// Example test structure
describe('Pendulum Physics', () => {
  test('should calculate correct angular acceleration', () => {
    const pendulum = new Pendulum(/* parameters */);
    const acceleration = pendulum.calculateAcceleration();
    expect(acceleration).toBeCloseTo(expectedValue, 5);
  });
});
```

## 📖 Documentation

### Code Documentation

- Use JSDoc for function documentation
- Include parameter types and return values
- Provide usage examples

```javascript
/**
 * Creates a new pendulum with specified parameters
 * @param {number} x - X coordinate of anchor point
 * @param {number} y - Y coordinate of anchor point
 * @param {number} length1 - Length of first arm
 * @param {number} length2 - Length of second arm
 * @returns {Pendulum} New pendulum instance
 * @example
 * const pendulum = new Pendulum(100, 100, 50, 75);
 */
```

### User Documentation

- Update README.md for new features
- Add examples to `/examples` directory
- Update API documentation in `/docs`

## 🎵 Audio Development Guidelines

### Sound Design Principles

- Map physical properties to musical parameters logically
- Avoid harsh or unpleasant sounds
- Consider frequency ranges and human hearing
- Test with different amplitude settings

### Adding New Synthesizers

1. Create synthesizer in constructor
2. Map physical parameters to audio parameters
3. Handle cleanup in `remove()` method
4. Document the mapping relationship

## 🌍 Internationalization

### Adding New Languages

1. Create language file: `src/lang/[language-code].js`
2. Add translations for all UI elements
3. Update language selector in UI
4. Add documentation in target language

### Translation Guidelines

- Keep technical terms consistent
- Consider cultural context
- Test with native speakers
- Use clear, simple language

## 📱 Accessibility

### Guidelines

- Provide keyboard navigation
- Include screen reader support
- Ensure color contrast compliance
- Add audio descriptions for visual elements
- Test with assistive technologies

## 🚀 Release Process

### Version Numbering

We use [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes

### Release Checklist

- [ ] Update CHANGELOG.md
- [ ] Update version numbers
- [ ] Run full test suite
- [ ] Update documentation
- [ ] Create release notes
- [ ] Tag release in Git

## 📞 Getting Help

- **Discord**: [Join our community](https://discord.gg/your-server)
- **GitHub Discussions**: Ask questions and share ideas
- **Email**: [maintainers@example.com](mailto:maintainers@example.com)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## Português

Adoramos sua contribuição! Queremos tornar a contribuição para Interactive Musical Pendulums o mais fácil e transparente possível, seja:

- Reportando um bug
- Discutindo o estado atual do código
- Enviando uma correção
- Propondo novos recursos
- Tornando-se um mantenedor

## 🚀 Processo de Desenvolvimento

Usamos GitHub para sincronizar código. Todas as mudanças de código acontecem através de pull requests.

### Processo de Pull Requests

1. Faça fork do repo e crie sua branch a partir de `main`.
2. Se você adicionou código que deve ser testado, adicione testes.
3. Se você mudou APIs, atualize a documentação.
4. Certifique-se de que a suíte de testes passa.
5. Certifique-se de que seu código segue as convenções.
6. Abra o pull request!

## 🐛 Relatórios de Bug

Usamos issues do GitHub para rastrear bugs públicos. Reporte um bug [abrindo uma nova issue](https://github.com/your-username/interactive-musical-pendulums/issues); é simples assim!

**Bons Relatórios de Bug** tendem a ter:

- Um resumo rápido e/ou contexto
- Passos para reproduzir
  - Seja específico!
  - Forneça código de exemplo se possível
- O que você esperava que acontecesse
- O que realmente acontece
- Notas (possivelmente incluindo por que você acha que isso pode estar acontecendo, ou coisas que tentou que não funcionaram)

## 💡 Solicitações de Recursos

Damos boas-vindas a solicitações de recursos! Por favor, forneça:

- **Caso de uso**: Descreva o que você quer realizar
- **Solução proposta**: Se você tem ideias sobre implementação
- **Alternativas consideradas**: Outras maneiras de alcançar o mesmo objetivo

### Recursos Prioritários

- [ ] Sistema de salvamento de presets
- [ ] Colaboração em tempo real
- [ ] Otimização mobile
- [ ] Arquitetura de plugins
- [ ] Suporte a controladores MIDI
- [ ] Integração WebXR

## 🎨 Estilo de Código

### Guia de Estilo JavaScript

- Use recursos ES6+ quando possível
- Prefira `const` e `let` ao invés de `var`
- Use nomes de variáveis significativos
- Comente cálculos físicos complexos
- Siga convenções de nomenclatura do p5.js

```javascript
// Bom
const quantidadePendulos = 5;
const velocidadeMaxima = 0.1;

// Ruim
var n = 5;
var vm = 0.1;
```

### Organização de Arquivos

```
src/
├── core/              # Classes principais de física e áudio
│   ├── Pendulum.js
│   ├── Arm.js
│   └── AudioEngine.js
├── ui/                # Componentes de interface
│   ├── Controls.js
│   └── Recorder.js
├── utils/             # Funções utilitárias
│   ├── math.js
│   └── audio.js
└── examples/          # Configurações de exemplo
```

## 🧪 Testes

### Tipos de Testes

- **Testes Unitários**: Testam funções e classes individuais
- **Testes de Integração**: Testam interações entre componentes
- **Testes Visuais**: Testam renderização e animações
- **Testes de Áudio**: Testam geração de som e mapeamento

## 📖 Documentação

### Documentação de Código

- Use JSDoc para documentação de funções
- Inclua tipos de parâmetros e valores de retorno
- Forneça exemplos de uso

## 🌍 Internacionalização

### Adicionando Novos Idiomas

1. Criar arquivo de idioma: `src/lang/[código-idioma].js`
2. Adicionar traduções para todos os elementos da UI
3. Atualizar seletor de idioma na UI
4. Adicionar documentação no idioma de destino

## 📄 Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a Licença MIT.