# Market Anomaly Detection Project

## Overview
A sophisticated market monitoring system powered by AI to detect anomalies and provide real-time investment insights.

## Features
- Real-time market monitoring
- AI-powered anomaly detection
- Investment strategy recommendations
- Historical data analysis
- Interactive data visualization

## Getting Started

### Prerequisites
- Node.js (recommended version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository
```sh
git clone <YOUR_REPOSITORY_URL>
cd market-anomaly-detection
```

2. Install dependencies
```sh
npm install
# or
yarn install
```

3. Start the development server
```sh
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:8080`

## Building for Production

```sh
npm run build
# or
yarn build
```

## Deployment

This project can be deployed to various platforms:

### Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### Vercel
1. Import your GitHub repository
2. Vercel will automatically detect the correct settings
3. Deploy

### GitHub Pages
1. Enable GitHub Pages in your repository settings
2. Add the following to your GitHub Actions workflow:
```yaml
- name: Build
  run: npm run build
```

### AWS Amplify
1. Connect your repository
2. Follow the automatic build settings
3. Deploy

## Technologies Used
- React
- TypeScript
- Vite
- shadcn/ui
- Tailwind CSS
- Recharts for data visualization

## License
This project is licensed under the MIT License - see the LICENSE file for details.
