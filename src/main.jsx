import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './css/dashboard-styles.css'
import './css/styles.css'
import '@fontsource/poppins/400.css';  
import '@fontsource/poppins/600.css';  

export function loadBotpress() {
  // Evita cargar dos veces
  if (window.botpressLoaded) return;
  window.botpressLoaded = true;

  // Cargar scripts dinámicamente
  const injectScript = src => {
    return new Promise(resolve => {
      const s = document.createElement('script');
      s.src = src;
      s.async = true;
      s.onload = resolve;
      document.body.appendChild(s);
    });
  };

  Promise.all([
    injectScript('https://cdn.botpress.cloud/webchat/v2.5/inject.js'),
    injectScript('https://files.bpcontent.cloud/2025/05/09/07/20250509071356-CJ5HT4GQ.js')
  ]).then(() => {
    window.botpress.init({
      "botId": "42f48e67-bc62-403a-a148-18649560a507",
      "user": {
        "data": { 
          "jwt_token": localStorage.getItem('token')
        }
      },
      "configuration": {
        "botName": "stock-ia-agent",
        "botAvatar": "https://files.bpcontent.cloud/2025/05/09/18/20250509180101-MJCERHVJ.svg",
        "botDescription": "Agente de Soporte al Cliente de Stock IA.",
        "fabImage": "https://files.bpcontent.cloud/2025/05/09/18/20250509180101-MJCERHVJ.svg",
        "website": {},
        "email": {},
        "phone": {},
        "termsOfService": {},
        "privacyPolicy": {},
        "color": "#1d4ed8",
        "variant": "soft",
        "themeMode": "light",
        "fontFamily": "inter",
        "radius": 1,
        "allowFileUpload": false
      },
      "clientId": "956afd6e-f4cc-4b4d-bd52-0a6e72bd209c"
    });

    window.botpress.updateUser({
      "data": {
        "jwt_token": localStorage.getItem('token')
      }
    });
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
