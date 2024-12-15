import { useFonts } from "expo-font";
import { Slot, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { ClerkLoaded, ClerkProvider, useAuth, useUser } from "@clerk/clerk-expo";
import { tokenCache } from "@/cache";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

const InitialLayout = () => {
    const { isLoaded, isSignedIn } = useAuth();
    const segments = useSegments();
    const router = useRouter();

   useEffect(() => {
     if (!isLoaded) return;
  
     const inTabsGroup = segments[0] === "(auth)";
  
     if (isSignedIn && !inTabsGroup) {
       router.replace("/(auth)/(tabs)/home");
     } else if (!isSignedIn && inTabsGroup) {
       router.replace("/(public)");
     }
   }, [isSignedIn]);
  return <Slot />;
};

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });


  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <InitialLayout />
        {/* <StatusBar style="auto" /> */}
      </ClerkLoaded>
    </ClerkProvider>
  );
}
