# SharePal Mobile App

![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Change the input sections

   Delete app/index.tsx email and password default values.

   ```bash
   const [email, setEmail] = useState(process.env.EXPO_PUBLIC_EMAIL);
   const [password, setPassword] = useState(process.env.EXPO_PUBLIC_PASSWORD);
   ```

3. Start the app

   ```bash
    npx expo start
   ```

##### Disclaimer : If you don't have .env file this project don't run in your local machine. If you want to run locally contact this address `mustafa.dede.0016@gmail.com`
