import React from 'react';
import * as WebBrowser from 'expo-web-browser';

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the browser for faster OAuth loads (especially on Android)
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};
