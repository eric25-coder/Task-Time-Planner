import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.erico.tasktime',
  appName: 'TaskTime',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
