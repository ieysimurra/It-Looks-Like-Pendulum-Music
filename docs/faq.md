# ❓ Frequently Asked Questions (FAQ)

[🇺🇸 English](#english-faq) | [🇧🇷 Português](#faq-em-português)

---

## English FAQ

### 🎵 General Questions

#### What is Interactive Musical Pendulums?
Interactive Musical Pendulums is a web-based application that combines physics simulation of double pendulums with real-time sound synthesis. It's inspired by Steve Reich's "Pendulum Music" (1968) and allows users to create hypnotic soundscapes through chaotic pendulum motion.

#### Who created this project?
This is an open-source project created by the Interactive Musical Pendulums community. It builds upon concepts from Steve Reich's experimental compositions and modern web technologies.

#### Is it free to use?
Yes! Interactive Musical Pendulums is completely free and open-source under the MIT license. You can use, modify, and distribute it freely.

#### Do I need to install anything?
No installation required! It runs entirely in your web browser. Just visit the website and start creating music.

### 🔊 Audio & Sound

#### Why can't I hear any sound?
Several possible reasons:
- **Audio not enabled**: Click anywhere to enable audio (required by browser security)
- **Volume too low**: Check the amplitude slider and your system volume
- **Browser compatibility**: Ensure you're using a supported browser (Chrome 88+, Firefox 85+, Safari 14+, Edge 88+)
- **Audio context suspended**: Try refreshing the page

#### The sound is distorted or crackling. How do I fix it?
- Lower the amplitude slider
- Reduce the number of active pendulums
- Close other audio applications
- Try a different browser
- Check your system's audio settings

#### Can I record the music I create?
Yes! The application includes both audio and video recording features. Click "Start Audio Record" or "Start Video Record" to capture your creations.

#### What audio format are recordings saved in?
Recordings are saved in WebM format with Opus audio codec, which provides excellent quality and compression.

#### Can I use headphones?
Absolutely! Headphones often provide a better experience, especially for hearing the spatial audio effects and subtle harmonic relationships.

### 🎛️ Controls & Interface

#### How do I add a pendulum?
Click the "Add Pendulum" button on the right side of the screen, or press the spacebar.

#### What do all the sliders control?
- **Angle 1 & 2**: Starting positions of the pendulum arms
- **Length 1 & 2**: How long each pendulum arm is
- **Mass 1 & 2**: Weight of each pendulum bob (affects sound frequency)
- **Color Sliders (Red/Blue)**: Control sound timbre and harmony
- **Gravity**: Strength of gravitational pull
- **Amplitude**: Overall volume level

#### Can I hide the controls?
Yes! Click "Show/Hide Controls" or press 'C' to toggle the control panel visibility.

#### How do I reset everything?
Click the "Reset Sketch" button or press 'R' to remove all pendulums and reset parameters.

#### Can I zoom in and out?
Yes! Use the "Zoom In" and "Zoom Out" buttons, or press '+' and '-' keys.

### ⚙️ Technical Questions

#### What browsers are supported?
- **Chrome**: 88 or later
- **Firefox**: 85 or later  
- **Safari**: 14 or later
- **Edge**: 88 or later

#### Does it work on mobile devices?
Yes! The interface is responsive and works on tablets and smartphones, though the experience is optimized for desktop use.

#### Can I use it offline?
Yes! The application includes Progressive Web App (PWA) features, allowing limited offline functionality after your first visit.

#### Why does the pendulum motion look chaotic?
This is intentional! Double pendulums exhibit chaotic behavior, meaning small changes in starting conditions lead to dramatically different motion patterns. This chaos is what creates the unique and unpredictable musical compositions.

#### Is my data being collected?
No personal data is collected by default. Everything runs locally in your browser. Recordings are stored locally on your device.

### 🎨 Creative Usage

#### How do I create harmonious sounds?
- Experiment with mass ratios (try 2:3 for perfect fifths)
- Use similar starting angles for more predictable motion
- Adjust color sliders to fine-tune harmonic content
- Try lower gravity settings for slower, more stable motion

#### Can I recreate Steve Reich's original piece?
While our digital version is inspired by Reich's work, it's a creative interpretation. The original used physical microphones and speakers. You can approximate similar effects by using feedback-like settings.

#### What's the maximum number of pendulums I can have?
The limit is 5 pendulums to ensure optimal performance. Pendulums automatically disappear when they lose energy or after 30 seconds.

#### Can I save my compositions?
Currently, you can record audio/video of your compositions. Saving and loading specific pendulum configurations is planned for future releases.

#### How do I create specific musical scales?
Adjust the mass parameters to create frequency relationships. For example:
- Equal masses create unison
- Mass ratio 2:3 creates perfect fifths
- Experiment with the color sliders to fine-tune harmonic content

### 🐛 Troubleshooting

#### The application won't load. What should I do?
1. Check your internet connection
2. Try refreshing the page (Ctrl+F5 or Cmd+R)
3. Clear your browser cache
4. Try a different browser
5. Disable browser extensions temporarily

#### Pendulums are moving too fast/slow
Adjust the gravity slider - higher values make pendulums swing faster, lower values (including negative) create different motion patterns.

#### The interface looks broken on my screen
This might be a browser compatibility issue. Try:
1. Updating your browser to the latest version
2. Checking your zoom level (should be 100%)
3. Trying a different browser
4. Disabling browser extensions

#### Recording doesn't work
Recording requires HTTPS in most browsers. If you're running locally, try:
1. Using `http://localhost` instead of `http://127.0.0.1`
2. Enabling microphone permissions
3. Trying a different browser

### 📚 Educational Use

#### Can I use this in my classroom?
Absolutely! It's perfect for teaching:
- Physics (chaos theory, pendulum motion)
- Music theory (harmony, frequency relationships)
- Programming (open-source code available)
- Mathematics (differential equations, trigonometry)

#### Are there lesson plans available?
Check our documentation for educational resources and examples. We welcome contributions of lesson plans from educators!

#### Can students contribute to the project?
Yes! We encourage student contributions through:
- Bug reports and feature requests
- Code contributions (with teacher supervision)
- Documentation improvements
- Translation to other languages

---

## FAQ em Português

### 🎵 Perguntas Gerais

#### O que é o Interactive Musical Pendulums?
É uma aplicação web que combina simulação física de pêndulos duplos com síntese sonora em tempo real. É inspirado na obra "Pendulum Music" (1968) de Steve Reich e permite criar paisagens sonoras hipnotizantes através do movimento caótico de pêndulos.

#### Quem criou este projeto?
Este é um projeto open-source criado pela comunidade Interactive Musical Pendulums. Baseia-se em conceitos das composições experimentais de Steve Reich e tecnologias web modernas.

#### É gratuito?
Sim! O Interactive Musical Pendulums é completamente gratuito e open-source sob licença MIT. Você pode usar, modificar e distribuir livremente.

#### Preciso instalar algo?
Não é necessária instalação! Funciona inteiramente no seu navegador. Apenas visite o site e comece a criar música.

### 🔊 Áudio e Som

#### Por que não consigo ouvir som?
Várias razões possíveis:
- **Áudio não habilitado**: Clique em qualquer lugar para habilitar (exigido pela segurança do navegador)
- **Volume muito baixo**: Verifique o slider de amplitude e volume do sistema
- **Compatibilidade do navegador**: Use um navegador compatível (Chrome 88+, Firefox 85+, Safari 14+, Edge 88+)
- **Contexto de áudio suspenso**: Tente atualizar a página

#### O som está distorcido. Como corrigir?
- Diminua o slider de amplitude
- Reduza o número de pêndulos ativos
- Feche outras aplicações de áudio
- Tente um navegador diferente
- Verifique as configurações de áudio do sistema

#### Posso gravar a música que crio?
Sim! A aplicação inclui recursos de gravação de áudio e vídeo. Clique em "Start Audio Record" ou "Start Video Record" para capturar suas criações.

#### Em que formato as gravações são salvas?
As gravações são salvas em formato WebM com codec de áudio Opus, que oferece excelente qualidade e compressão.

### 🎛️ Controles e Interface

#### Como adiciono um pêndulo?
Clique no botão "Add Pendulum" no lado direito da tela, ou pressione a barra de espaço.

#### O que controlam todos os sliders?
- **Angle 1 & 2**: Posições iniciais dos braços do pêndulo
- **Length 1 & 2**: Comprimento de cada braço do pêndulo
- **Mass 1 & 2**: Peso de cada peso do pêndulo (afeta frequência do som)
- **Sliders de Cor (Vermelho/Azul)**: Controlam timbre e harmonia do som
- **Gravity**: Força da atração gravitacional
- **Amplitude**: Nível de volume geral

#### Posso esconder os controles?
Sim! Clique em "Show/Hide Controls" ou pressione 'C' para alternar a visibilidade do painel de controle.

#### Como reset tudo?
Clique no botão "Reset Sketch" ou pressione 'R' para remover todos os pêndulos e resetar parâmetros.

### ⚙️ Questões Técnicas

#### Quais navegadores são suportados?
- **Chrome**: 88 ou posterior
- **Firefox**: 85 ou posterior
- **Safari**: 14 ou posterior
- **Edge**: 88 ou posterior

#### Funciona em dispositivos móveis?
Sim! A interface é responsiva e funciona em tablets e smartphones, embora a experiência seja otimizada para desktop.

#### Posso usar offline?
Sim! A aplicação inclui recursos de Progressive Web App (PWA), permitindo funcionalidade offline limitada após sua primeira visita.

### 🎨 Uso Criativo

#### Como criar sons harmoniosos?
- Experimente com proporções de massa (tente 2:3 para quintas perfeitas)
- Use ângulos iniciais similares para movimento mais previsível
- Ajuste sliders de cor para afinar conteúdo harmônico
- Tente configurações de gravidade mais baixas para movimento mais lento e estável

#### Qual é o número máximo de pêndulos?
O limite é 5 pêndulos para garantir performance ótima. Pêndulos desaparecem automaticamente quando perdem energia ou após 30 segundos.

#### Posso salvar minhas composições?
Atualmente, você pode gravar áudio/vídeo de suas composições. Salvar e carregar configurações específicas de pêndulos está planejado para versões futuras.

### 🐛 Solução de Problemas

#### A aplicação não carrega. O que fazer?
1. Verifique sua conexão com a internet
2. Tente atualizar a página (Ctrl+F5 ou Cmd+R)
3. Limpe o cache do navegador
4. Tente um navegador diferente
5. Desabilite extensões do navegador temporariamente

#### Os pêndulos estão se movendo muito rápido/devagar
Ajuste o slider de gravidade - valores mais altos fazem os pêndulos balançarem mais rápido, valores mais baixos (incluindo negativos) criam padrões de movimento diferentes.

### 📚 Uso Educacional

#### Posso usar isso na minha sala de aula?
Absolutamente! É perfeito para ensinar:
- Física (teoria do caos, movimento pendular)
- Teoria musical (harmonia, relações de frequência)
- Programação (código open-source disponível)
- Matemática (equações diferenciais, trigonometria)

#### Existem planos de aula disponíveis?
Verifique nossa documentação para recursos educacionais e exemplos. Damos boas-vindas a contribuições de planos de aula de educadores!

---

## 🆘 Still Need Help?

### Getting Support

#### Community Support
- **GitHub Discussions**: [Ask questions and share ideas](https://github.com/your-username/interactive-musical-pendulums/discussions)
- **Discord Community**: Join our real-time chat
- **Reddit**: Visit r/InteractiveMusic

#### Bug Reports
- **GitHub Issues**: [Report bugs](https://github.com/your-username/interactive-musical-pendulums/issues)
- Include browser version, operating system, and steps to reproduce

#### Feature Requests
- **GitHub Issues**: [Request new features](https://github.com/your-username/interactive-musical-pendulums/issues)
- Check existing requests before creating new ones

#### Email Support
- **General Questions**: help@interactive-musical-pendulums.org
- **Educational Licensing**: education@interactive-musical-pendulums.org
- **Technical Issues**: technical@interactive-musical-pendulums.org

### Contributing

#### How can I help improve the project?
- **Report Bugs**: Help us find and fix issues
- **Suggest Features**: Share your creative ideas
- **Translate**: Help make it available in more languages
- **Document**: Improve documentation and tutorials
- **Code**: Contribute to the open-source codebase

#### I found a security issue. Who should I contact?
Please report security issues privately to: security@interactive-musical-pendulums.org

---

## 📝 FAQ Contributors

This FAQ is maintained by the community. If you have a question that's not answered here, please:

1. **Ask in GitHub Discussions** - We'll add popular questions to this FAQ
2. **Submit a Pull Request** - Add your question and answer directly
3. **Contact Us** - We'll help you and update the FAQ accordingly

**Last Updated**: January 2025  
**Version**: 1.0.0

---

**Thank you for using Interactive Musical Pendulums! 🎶**