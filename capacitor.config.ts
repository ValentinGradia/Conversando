import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'chat.app',
  appName: 'chat',
  webDir: 'www',
  server : {
    androidScheme: 'https'
  },
  plugins : {
    SplashScreen : {
      launchAutoHide : false
    }
  }
};

export default config;
