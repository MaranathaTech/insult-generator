# 🔥 Insult Generator

A fun, family-friendly web application that generates witty comebacks and roasts for any message you input!

## Features

- **Family-Friendly**: All insults are clever and clean - no offensive content
- **Context-Aware**: The app analyzes your message and provides contextual responses
- **Multiple Categories**: Wit, sarcasm, gentle roasts, and creative comebacks
- **Beautiful UI**: Modern, responsive design with smooth animations
- **Instant Response**: Fast API powered by Next.js

## How It Works

1. Enter any message in the text area
2. Click "Get Roasted!" to receive your witty comeback
3. Click "Give Me Another!" for a different insult using the same message
4. Enjoy the creative roasts!

## Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **API**: Next.js API Routes
- **Deployment**: Ready for Vercel, Netlify, or any Node.js hosting

## Getting Started

First, install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Endpoint

The app includes a REST API endpoint at `/api/insult` that accepts POST requests:

```javascript
// Request
POST /api/insult
Content-Type: application/json

{
  "message": "Your message here"
}

// Response
{
  "insult": "Your witty comeback here"
}
```

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com/new):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/MaranathaTech/insult-generator)

## Contributing

Feel free to contribute new insults, improve the UI, or add features! Please keep all content family-friendly.

## License

MIT License - feel free to use this project for learning or fun!