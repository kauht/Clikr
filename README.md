# Clikr 🗿

A modern, cross-platform auto-clicker built with **Tauri**, **React**, and **TypeScript**.

![Clikr UI](images/clikr_UI.png)

## ✨ Features

- **📱 Cross-Platform**: Works on Windows, macOS, and Linux
- **🎨 Modern UI**: Beautiful dark/light theme with smooth animations and transitions
- **⌨️ Custom Keybindings**: Set custom hotkeys


## 🐧 Usage

### Requirements

- **Node.js**
- **Rust**
- **pnpm**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kauht/Clikr
   cd clikr
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run in development mode**
   ```bash
   pnpm tauri dev
   ```


## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Rust (Tauri)
- **UI Components**: Shadcn/UI + Lucide icons
- **Styling**: Tailwind CSS

## Development Progress

### ✅ Completed

- [x] Center the "Auto Clicker" label
- [x] Make nav bar buttons work
- [x] Improve color scheme
- [x] Make color palette instead of manually entering colors 
- [x] Make theme work (use Tailwind dark/light mode feature)
- [x] Disable inspect element and right click
- [x] Add Backend-Frontend variables for clicker interval
- [x] Make start/stop functions
- [x] Think of a better name for this app
- [x] Improve Select box dropdown component

### 🚧 In Progress / Planned

- [ ] Panic key and option "stop on key press"
- [ ] Change icon for "Record & Playback" button
- [ ] Make "Click Options" and "Cursor Position" icons different
- [ ] Fix click options slider
- [ ] Make click options select slider into a component
- [ ] Make custom click keybind selector work
- [ ] Make hotkey selector work
- [ ] Improve settings menu transition animation
- [ ] Add splash screen on startup
- [ ] Clean up code
- [ ] Optimizations
- [ ] Add DPI scaling settings (default changes based on resolution)
- [ ] Add presets options to the settings
- [ ] Add Coordinates selector feature for custom X and Y
- [ ] Make icon for this app*
- [ ] Change out cross-platform mouse library with my own
- [ ] Add menu for Record & Playback button
- [ ] Find domain for website

## 🤝 Contributing

Contributions are always welcome! Feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
---

**Made with ❤️ by [@kauht](https://discord.gg/WVMHUgrgeH)**
