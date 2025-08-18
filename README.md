# 🔳 QR Code Generator

A modern, fast, and customizable QR code generator built with SvelteKit and powered by Appwrite. Generate QR codes for URLs, text, or any content with configurable size and margin options.

## ✨ Features

- **Fast QR Code Generation**: Instant QR code creation using Appwrite's robust backend
- **Customizable Options**: Adjust size (1-1000px) and margin (0-10) to fit your needs
- **Download Support**: Save generated QR codes as PNG images
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Clean Interface**: Intuitive and user-friendly design
- **Real-time Preview**: See your QR code instantly as you type

## 🚀 Quick Start

### Installation

1. Clone the repository:
```sh
git clone https://github.com/adityaoberai/qr-code-generator.git
cd qr-code-generator
```

2. Install dependencies:
```sh
npm install
```

3. Start the development server:
```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## 🛠️ Building for Production

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with:
```sh
npm run preview
```

## 🔧 Configuration

The app uses Appwrite's Avatars API for QR code generation. The configuration is set in `src/lib/appwrite.js`. You can customize:

- **Size**: QR code dimensions (1-1000 pixels)
- **Margin**: White border around the QR code (0-10)
- **Content**: Any text, URL, or data you want to encode

## 📱 Usage

1. **Enter Content**: Type or paste the text, URL, or data you want to encode
2. **Customize**: Adjust the size and margin settings as needed
3. **Generate**: Click "Generate QR Code" to create your QR code
4. **Download**: Save the QR code as a PNG image to your device

## 🛡️ Tech Stack

- **Frontend**: SvelteKit
- **Backend**: Appwrite Avatars API

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.
