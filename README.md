# QR Code Generator

A modern, fast, and customizable QR code generator built with SvelteKit and powered by Appwrite. Generate QR codes for URLs, text, or any content with configurable size and margin options.

## Features

- **Fast QR Code Generation**: Instant QR code creation using Appwrite's robust backend
- **Customizable Options**: Adjust size (1-1000px) and margin (0-10) to fit your needs
- **Download Support**: Save generated QR codes as PNG images
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Clean Interface**: Intuitive and user-friendly design
- **Real-time Preview**: See your QR code instantly as you type

## Quick Start

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

3. Set up environment variables:
   - Copy the example environment file:
   ```sh
   cp .env.example .env
   ```
   - Open the `.env` file and add your Appwrite configuration:
   ```env
   PUBLIC_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
   PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here
   ```

4. Start the development server:
```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building for Production

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with:
```sh
npm run preview
```

## Appwrite Configuration

This project uses Appwrite's Avatars API. To use this API, you must follow these steps:

1. Create an account at [Appwrite Cloud](https://cloud.appwrite.io/) or self-host Appwrite
2. Create a new project
3. Copy your project ID and endpoint from the Settings page
4. Update your `.env` file with these values

### Environment Variables

The app requires the following environment variables to be set in your `.env` file:

- **PUBLIC_APPWRITE_ENDPOINT**: The Appwrite server endpoint (default: `https://fra.cloud.appwrite.io/v1`)
- **PUBLIC_APPWRITE_PROJECT_ID**: Your Appwrite project ID (you can use any valid project ID as this uses the public Avatars API)

## Usage

1. **Enter Content**: Type or paste the text, URL, or data you want to encode
2. **Customize**: Adjust the size and margin settings as needed
3. **Generate**: Click "Generate QR Code" to create your QR code
4. **Download**: Save the QR code as a PNG image to your device

### QR Code Customization

You can customize the QR code generation with the following options:

- **Size**: QR code dimensions (1-1000 pixels)
- **Margin**: White border around the QR code (0-10)
- **Content**: Any text, URL, or data you want to encode

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you have any questions or need help, please open an issue on GitHub.
