import { useAuth, useUser } from "@clerk/clerk-expo";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

const Profile = () => {
  const { signOut } = useAuth();
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);

  const stats = {
    posts: 42,
    followers: 1234,
    following: 890,
  };

  const StatBox = ({ label, value }: { label: string; value: number }) => (
    <View style={styles.statBox}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <Image
            source={{
              uri: user?.imageUrl || "https://via.placeholder.com/150",
            }}
            style={styles.profileImage}
          />
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{user?.fullName || "User Name"}</Text>
            <Text style={styles.username}>
              {user?.emailAddresses[0].emailAddress || "username"}
            </Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <StatBox label="Posts" value={stats.posts} />
          <StatBox label="Followers" value={stats.followers} />
          <StatBox label="Following" value={stats.following} />
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.button, styles.editButton]}
            onPress={() => setIsEditing(true)}
          >
            <MaterialIcons name="edit" size={20} color="white" />
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.settingsButton]}
            onPress={() => {}}
          >
            <MaterialIcons name="settings" size={20} color="#333" />
            <Text style={[styles.buttonText, styles.settingsText]}>
              Settings
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.socialLinks}>
          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome name="twitter" size={20} color="#1DA1F2" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome name="linkedin" size={20} color="#0077B5" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome name="github" size={20} color="#333" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={() => signOut()}>
          <MaterialIcons name="logout" size={20} color="#FF3B30" />
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  username: {
    fontSize: 16,
    color: "#666",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: "#f8f8f8",
  },
  statBox: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
  },
  bioSection: {
    marginBottom: 20,
  },
  bioTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  bioText: {
    fontSize: 16,
    color: "#444",
    lineHeight: 24,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    width: "48%",
  },
  editButton: {
    backgroundColor: "#007AFF",
  },
  settingsButton: {
    backgroundColor: "#f0f0f0",
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 16,
    color: "white",
    fontWeight: "500",
  },
  settingsText: {
    color: "#333",
  },
  socialLinks: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  socialButton: {
    marginHorizontal: 15,
    padding: 10,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#FFF0F0",
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#FF3B30",
    fontWeight: "500",
  },
});

export default Profile;
