# Book App

A comprehensive book reading application built with React, TypeScript, and Firebase. Features book discovery, personalized recommendations, reviews, quizzes, and reading progress tracking.

## Features

- **Book Discovery**: Browse and discover new books with personalized recommendations
- **Reading Progress**: Track your reading progress and maintain a personal bookshelf
- **Reviews & Ratings**: Write and read book reviews from the community
- **Interactive Quizzes**: Test your knowledge with book-related quizzes
- **User Profiles**: Personalized reading profiles and statistics
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Backend**: Firebase (Firestore, Authentication, Storage)
- **Styling**: CSS with modern design patterns
- **MCP Integration**: Vercel and GitHub MCP servers for enhanced development

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase project

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/book-app.git
cd book-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Add your Firebase configuration and API keys
```

4. Start the development server:
```bash
npm run dev
```

### Firebase Setup

1. Create a Firebase project at https://console.firebase.google.com
2. Enable Firestore, Authentication, and Storage
3. Update your Firebase configuration in the environment variables
4. Deploy Firestore rules and indexes

## Environment Variables

Create a `.env` file with the following variables:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_OPENROUTER_API_KEY=your_openrouter_api_key
GITHUB_TOKEN=your_github_token
```

## Deployment

### Vercel Deployment

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Firebase Hosting

```bash
npm run build
firebase deploy
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## MCP Integration

This project integrates with:
- **Vercel MCP**: For deployment and project management
- **GitHub MCP**: For repository management and automation
- **Firebase MCP**: For database and authentication management
