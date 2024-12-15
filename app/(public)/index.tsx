import { Colors } from "@/constants/Colors";
import { useOAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function index() {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleGoogleLogin = async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/login.png")}
        style={styles.loginImage}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Select your way in to the App</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleGoogleLogin}
          >
            <View style={styles.loginButtonContent}>
              <Ionicons name="logo-google" size={24}  />
              <Text style={styles.loginButtonText}>Continue with Google</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 20,
    backgroundColor: Colors.background,
  },
  loginImage: {
    width: "100%",
    height: 350,
    resizeMode: "cover",
  },
  title: {
    fontSize: 17,
  },
  buttonContainer: {
    marginHorizontal: 20,
  },
  loginButton: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Ensures proper spacing
  },
  loginButtonText: {
    color: "#000",
    fontSize: 15,
  },
  loginButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
});
