# 🎶 Interactive Musical Pendulums / Pêndulos Musicais Interativos

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![p5.js](https://img.shields.io/badge/p5.js-ED225D?style=flat&logo=p5.js&logoColor=white)](https://p5js.org/)
[![Tone.js](https://img.shields.io/badge/Tone.js-blue)](https://tonejs.github.io/)

🇺🇸 English | [🇧🇷 Português](README.md)

An interactive application that combines double pendulum physics simulation with real-time sound synthesis, inspired by Steve Reich's "Pendulum Music".

## 🎯 About the Project

This project explores the intersection between physical movement and musical creation through virtual double pendulums. Each pendulum generates unique sounds based on its physical properties (mass, length, angle) and spatial position, creating hypnotizing and unpredictable soundscapes.

### ✨ Key Features

- **Realistic Physics Simulation**: Double pendulums with authentic chaotic behavior
- **Dynamic Sound Synthesis**: Real-time generated sounds using Tone.js
- **Intuitive Interface**: Slider controls for fine parameter adjustment
- **Integrated Recording**: Capture audio and video of your creations
- **Multiple Pendulums**: Support for up to 5 simultaneous pendulums
- **Rich Visualization**: Colored trails and smooth animations
- **Responsive**: Adaptable to different screen sizes

## 🚀 Demo

**[▶️ Try Online](https://editor.p5js.org/ieysimurra/sketches/t3md26c1C)**

![Demo GIF](assets/demo.gif)

## 🎮 How to Use

### Basic Controls

1. **Add Pendulum**: Click "Add Pendulum" to create a new pendulum
2. **Adjust Parameters**: Use the sliders on the left:
   - **Angles**: Initial position of the arms
   - **Lengths**: Size of pendulum arms
   - **Masses**: Weight of the pendulum bobs
   - **Colors**: Red and blue components of the bobs
   - **Gravity**: Gravitational force
   - **Amplitude**: Sound volume

3. **Visualization**:
   - **Zoom In/Out**: Zoom in or out of the visualization
   - **Drag**: Move the visualization around the screen
   - **Show/Hide Controls**: Hide/show controls

4. **Recording**:
   - **Start Video Record**: Records video with audio
   - **Start Audio Record**: Records audio only
   - **Download**: Automatic download links

### 🎵 Sound Mapping

| Physical Parameter | Sound Parameter |
|-------------------|-----------------|
| Mass | Base frequency |
| X Position | Stereo panning |
| Red Slider | FM Harmonicity |
| Blue Slider | Modulation index |
| Amplitude | Overall volume |

## 🛠️ Local Installation

### Prerequisites

- Modern web browser
- Local web server (optional, for development)

### Quick Setup

1. Clone the repository:
```bash
git clone https://github.com/your-username/interactive-musical-pendulums.git
cd interactive-musical-pendulums
```

2. Open `index.html` in browser or start a local server:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js
npx serve .
```

3. Access `http://localhost:8000`

## 📁 Project Structure

```
interactive-musical-pendulums/
├── index.html              # Main page
├── sketch.js              # Main p5.js code
├── style.css              # CSS styles
├── assets/                # Visual resources
│   ├── demo.gif
│   ├── screenshots/
│   └── icons/
├── docs/                  # Documentation
│   ├── TUTORIAL.md
│   ├── API.md
│   └── PHYSICS.md
├── examples/              # Usage examples
│   ├── basic-setup.js
│   ├── advanced-config.js
│   └── custom-mappings.js
├── tests/                 # Tests
├── CHANGELOG.md
├── CONTRIBUTING.md
├── LICENSE
└── README.md
```

## 🎨 Customization

### Adding New Sound Mappings

```javascript
// Example: Map velocity to reverb
let velocity = this.arm1.aVelocity;
let reverbAmount = map(abs(velocity), 0, 0.1, 0, 0.8);
this.reverb.roomSize.rampTo(reverbAmount, 0.1);
```

### Configuring New Synthesizers

```javascript
// Replace FMSynth with another type
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

## 🔬 Scientific Foundation

### Double Pendulums

The movement of a double pendulum is governed by non-linear differential equations that exhibit chaotic behavior. Small changes in initial conditions can lead to completely different trajectories.

### Frequency Modulation (FM) Synthesis

Uses the FM synthesis algorithm developed by John Chowning in the 1970s, where one wave (modulator) modulates the frequency of another wave (carrier), creating complex timbres.

## 📚 Learning Resources

- [Complete Tutorial](docs/TUTORIAL.md)
- [API Documentation](docs/API.md)
- [Physics Fundamentals](docs/PHYSICS.md)
- [Music Theory](docs/MUSIC_THEORY.md)

## 🤝 Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### How to Contribute

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Steve Reich** - Inspiration from "Pendulum Music" (1968)
- **p5.js Foundation** - Creative coding framework
- **Tone.js Team** - Web audio library
- **Open Source Community** - Contributions and feedback

## 📊 Project Status

- ✅ Basic physics simulation
- ✅ Real-time sound synthesis
- ✅ User interface
- ✅ Audio/video recording
- 🔄 Saved presets
- 🔄 Collaborative mode
- 📋 Plugin system
- 📋 Mobile app

## 📞 Contact

- **Email**: [ieysimurra@gmail.com](mailto:ieysimurra@gmail.com)
- **GitHub**: [@ieysimurra](https://github.com/ieysimurra)
- **Website**: [under_construction](https://your-website.com)

---

**[⭐ If you liked the project, leave a star!](https://github.com/ieysimurra/It-Looks-Like-On-December/stargazers)**
