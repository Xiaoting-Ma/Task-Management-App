# DuoTask

DuoTask is a task management application designed to help users efficiently organize and manage their tasks. The application leverages modern web technologies to provide a seamless user experience.

## Features

- User authentication using Firebase Authentication
- Task creation, editing, and deletion
- Task categorization and prioritization
- Responsive design for desktop and mobile devices
- Real-time updates with Firestore
- Backend API with Node.js and Express
- Database management using PostgreSQL via Supabase
- Deployment on Vercel with continuous integration and automated deployment

## Technologies Used

- **Frontend**: React, Material-UI, Axios
- **Backend**: Node.js, Express
- **Database**: PostgreSQL (Supabase)
- **Authentication**: Firebase Authentication
- **Hosting**: Vercel
- **CI/CD**: GitHub Actions

## Project Setup

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed
- Firebase account and project setup
- Supabase account and project setup
- Vercel account for deployment

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Xiaoting-Ma/Task-Management-App.git
   cd Task-Management-App

2. Install the dependencies:

    ```bash
    npm install

### Firebase Configuration

1. Go to the Firebase Console and create a new project.

2. Enable Authentication and Firestore.

3. Obtain your Firebase config object and add it to your project:

    ```javascript
    // src/firebaseConfig.js
    const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
    };

    export default firebaseConfig;

### Supabase Configuration

1. Go to the Supabase Console and create a new project.

2. Obtain your Supabase URL and public API key, then add them to your environment variables:

    ```env
    // .env
    REACT_APP_SUPABASE_URL=https://your-supabase-url.supabase.co
    REACT_APP_SUPABASE_ANON_KEY=your-public-api-key

### Running the Application

1. Start the development server:

    ```bash
    npm start
2. Open your browser and navigate to http://localhost:3000.

### Deployment

The application is deployed on Vercel. To deploy your own version:

1. Push your code to GitHub.
2. Go to the Vercel Dashboard and import your GitHub repository.
3. Configure your environment variables in the Vercel project settings.
4. Deploy your application.

## Usage

1. Register or log in with your account.
2. Create, edit, or delete tasks.
3. Organize tasks by categories and priorities.
4. View and manage tasks in real-time.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/your-feature-name).
3. Commit your changes (git commit -m 'Add some feature').
4. Push to the branch (git push origin feature/your-feature-name).
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact

If you have any questions, feel free to reach out:

- Name: Xiaoting Ma
- Email: xiaoting.ma012@gmail.com
- GitHub: [Xiaoting-Ma](https://github.com/Xiaoting-Ma)