# How to Connect Your App to Firebase

Follow these steps to set up your Firebase backend and connect it to this React application.

## 1. Create a Firebase Project
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **"Add project"** and give it a name (e.g., "Sentinel").
3. (Optional) Enable Google Analytics and click **"Create project"**.

## 2. Register Your Web App
1. On the project overview page, click the **Web icon** (`</>`) to add an app.
2. Register the app with a nickname.
3. You will see a `firebaseConfig` object. **Copy this.**

## 3. Configure the React App
1. Open `src/firebase.js` in this project.
2. Replace the placeholder values in the `firebaseConfig` object with the ones you copied:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```

## 4. Enable Authentication
1. In the Firebase Sidebar, go to **Build > Authentication**.
2. Click **"Get Started"**.
3. Go to the **"Sign-in method"** tab.
4. Enable **Email/Password** and click **Save**.

## 5. Enable Firestore Database
1. In the Firebase Sidebar, go to **Build > Firestore Database**.
2. Click **"Create database"**.
3. Select a location and start in **"Test mode"** (to allow development without strict rules initially).
4. Click **Create**.

## 6. Run the App
1. Run `npm run dev` in your terminal.
2. Your app should now be fully connected!

> [!WARNING]
> Never commit your real API keys to a public repository. Use `.env` files for production applications.
