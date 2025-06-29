# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Preset saving and loading system
- Real-time collaboration features
- Mobile optimization
- Plugin architecture
- MIDI controller support
- WebXR integration for immersive experience
- Advanced audio effects (reverb, delay, filters)
- Export to common audio formats (WAV, MP3)

## [1.0.0] - 2025-01-15

### Added
- Initial release of Interactive Musical Pendulums
- Double pendulum physics simulation with realistic chaotic behavior
- Real-time FM sound synthesis using Tone.js
- Interactive control interface with sliders for all parameters
- Support for multiple simultaneous pendulums (up to 5)
- Zoom and pan functionality for better visualization
- Audio and video recording capabilities
- Bilingual support (English and Portuguese)
- Color customization for pendulum bobs
- Gravity and amplitude controls
- Show/hide controls toggle
- Automatic pendulum removal system
- CSV data logging for research purposes
- Responsive design for different screen sizes

### Features
- **Physics Engine**: 
  - Accurate double pendulum simulation
  - Chaotic motion with realistic damping
  - Variable gravity settings
  - Mass and length customization

- **Audio Engine**:
  - FM synthesis with real-time parameter mapping
  - Stereo panning based on pendulum position
  - Harmonicity and modulation index controls
  - Amplitude and volume management
  - Smooth parameter transitions

- **User Interface**:
  - Intuitive slider controls
  - Real-time parameter display
  - Zoom and pan navigation
  - Recording controls
  - Bilingual instructions
  - Responsive layout

- **Recording System**:
  - WebM video recording with audio
  - Audio-only recording option
  - Automatic download links
  - Data logging for analysis

### Technical Details
- Built with p5.js for graphics and animation
- Tone.js for professional audio synthesis
- WebRTC MediaRecorder API for recording
- HTML5 Canvas for smooth 60fps rendering
- CSS3 for responsive styling
- ES6+ JavaScript features

### Browser Compatibility
- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

### Known Issues
- Recording may not work in some browsers without HTTPS
- Large number of pendulums may affect performance on older devices
- Audio context requires user interaction to start

### Documentation
- Complete README with usage instructions
- Contributing guidelines
- Code documentation with JSDoc
- Physics and music theory explanations

### Inspiration
Based on Steve Reich's "Pendulum Music" (1968), this project explores the intersection of physical motion and musical composition through interactive digital media.

### Credits
- **Physics Simulation**: Custom implementation of double pendulum equations
- **Audio Synthesis**: Tone.js library integration
- **Visual Design**: p5.js creative coding framework
- **Recording**: WebRTC MediaRecorder API
- **Internationalization**: Custom bilingual system

### File Structure
```
v1.0.0/
├── index.html          # Main application file
├── sketch.js           # Core p5.js application code
├── style.css           # Styling and responsive design
├── README.md           # Project documentation
├── README_EN.md        # English documentation
├── LICENSE             # MIT license
├── CHANGELOG.md        # This file
└── assets/            # Images and media files
```

### Performance Metrics
- Rendering: 60 FPS on modern browsers
- Audio Latency: <20ms on supported browsers
- Memory Usage: ~50MB for 5 active pendulums
- Load Time: <2 seconds on broadband connection

### Accessibility
- Keyboard navigation support
- Screen reader compatibility
- High contrast color scheme option
- Adjustable font sizes
- Audio descriptions for visual elements

---

## Version History Summary

| Version | Date | Description |
|---------|------|-------------|
| 1.0.0 | 2025-01-15 | Initial release with full feature set |
| 0.9.0 | 2025-01-10 | Beta release with recording features |
| 0.8.0 | 2025-01-05 | Alpha release with audio synthesis |
| 0.7.0 | 2024-12-30 | Physics simulation prototype |
| 0.1.0 | 2024-12-15 | Initial concept and basic pendulum |

---

**Legend:**
- `Added` for new features
- `Changed` for changes in existing functionality
- `Deprecated` for soon-to-be removed features
- `Removed` for now removed features
- `Fixed` for any bug fixes
- `Security` in case of vulnerabilities