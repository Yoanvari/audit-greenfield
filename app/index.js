import { AuthProvider, useAuth } from "./(auth)/authContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import login from "./(auth)/login";
import register from "./(auth)/register";
import home from "./(index)/home";

const Stack = createNativeStackNavigator();

export default function Index() {
  return (
    <AuthProvider>
      <Layout></Layout>
    </AuthProvider>
  );
}

export const Layout = () => {
  const { authState, onLogout } = useAuth();

  return (
    <Stack.Navigator>
      {authState?.authenticated ? (
        <Stack.Screen
          name="Home"
          component={home}
          options={{
            headerRight: () => <Button onPress={onLogout} title="Sign Out" />,
          }}
        ></Stack.Screen>
      ) : (
        <>
          <Stack.Screen name="Login" component={login} />
          <Stack.Screen name="Register" component={register} />
          <Stack.Screen name="Home" component={home} />
        </>
      )}
    </Stack.Navigator>
  );
};
