import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Layout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let IconComponent;
          if (route.name === "index") {
            iconName = "home";
            IconComponent = FontAwesome;
          } else if (route.name === "exercises") {
            iconName = "quiz";
            IconComponent = MaterialIcons;
          }
          return (
            <IconComponent
              name={iconName}
              size={size || 24}
              color={focused ? "rgb(100,108,143)" : "black"}
            />
          );
        },
        tabBarActiveTintColor: "rgb(100,108,143)",
        tabBarInactiveTintColor: "rgb(13,8,46)",
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="exercises"
        options={{
          title: "Exercises",
        }}
      />
    </Tabs>
  );
}
