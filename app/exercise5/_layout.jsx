import { Stack } from "expo-router";

export default function Layout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="Registerscreen"
          options={{
            headerShown: false,
            title: "Registerscreen",
            headerTitle: "Registerscreen",
          }}
        />
      </Stack>
    </>
  );
}
