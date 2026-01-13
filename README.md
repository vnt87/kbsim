# Mechanical Keyboard Simulator - [kbs.im](https://kbsim.pages.dev)
![kbs.im picture](https://github.com/tplai/kbsim/blob/master/src/assets/images/demo.PNG)

Mechanical Keyboard Simulator is website that simulates typing on a variety of custom keyswitches and offers a simple typing test. Currently, it supports 10+ switches, keyboard layouts, and colors for an customizable, satisfying typing experience.

## Features
- Unique sounds for specific keys
- 1 minute English typing test
- Wide selection of case colors and layouts
- Dark mode

## Currently Supported Switches
- NovelKeys Creams
- Holy Pandas
- Turqoise Tealios
- Gateron Black Inks
- Cherry MX Blacks
- Cherry MX Browns
- Cherry MX Blues
- Kailh Box Navies
- Buckling Spring
- SKCM Blue Alps
- Topre

## Currently Supported Layouts
- Fullsize
- Tenkeyless
- 75%
- 65%
- HHKB

## Requests
Switch and layout requests are open at the moment, feel free to open an issue if you'd like to see a switch or layout added!

# Developers

## Setup
The project has been migrated to a modern Vite stack located in the `vite-app/` directory.

To run the application locally:

```bash
cd vite-app
npm install
npm run dev
```

## Tech Stack
- **Framework**: React 18
- **State Management**: Redux Toolkit
- **Bundler**: Vite
- **Styling**: TailwindCSS v4 + Catalyst UI + Hero Icons
- **Audio**: Howler.js

## Project structure (New Stack)
    vite-app/
    ├── src
    │   ├── assets
    │   │   ├── images                # SVG and PNG assets
    │   │   └── sounds                # Mechanical switch audio files
    │   ├── components
    │   │   ├── ui                    # Catalyst UI components
    │   │   ├── Header.jsx
    │   │   └── Footer.jsx
    │   ├── features
    │   │   ├── keySimulator          # Main keyboard logic
    │   │   ├── typingTest            # Typing speed test
    │   │   ├── store                 # Redux store config
    │   │   └── themeProvider         # Theme state
    │   ├── lib                       # Shared logic (audio, layouts)
    │   ├── App.jsx                   # Main layout
    │   ├── main.jsx                  # Application entry
    │   └── index.css                 # Tailwind config & global styles
    ├── index.html                    # Entry HTML
    ├── package.json
    └── vite.config.js

## Docker Support

We provide a Docker image via GitHub Container Registry (GHCR).

### Run with Docker Compose
A sample `docker-compose.yml` is provided in the root directory. To run the application:

```bash
docker compose up -d
```

The application will be available at `http://localhost:7337`.

### CI/CD
The project uses GitHub Actions to automatically:
- Build and push the Docker image to `ghcr.io/vnt87/kbsim` on every push to main/master.
- Bump the patch version in `vite-app/package.json`.

## Contributing
Pull requests are welcome, but please do create an issue to discuss any major changes.
