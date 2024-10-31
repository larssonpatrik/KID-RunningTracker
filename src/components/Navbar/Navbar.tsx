import { Text, View } from "react-native";

const Navbar: React.FC = () => {
  return (
    <View
      style={{
        display: "flex",
        height: 85,
        width: "100%",
        backgroundColor: "gray",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 24,
        paddingLeft: 36,
        paddingRight: 36,
      }}
    >
      <Text>Home</Text>
      <Text>Run</Text>
      <Text>Rewards</Text>
      <Text>Profile</Text>
    </View>
  );
};

export default Navbar;
