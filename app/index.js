import { AuthProvider, useAuth } from "./context/authContext";
import { AuditProvider } from "./context/auditContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import login from "./(auth)/login";
import register from "./(auth)/register";
import home from "./(index)/home";

const Stack = createNativeStackNavigator();

export default function Index() {
  return (
    <AuthProvider>
      <AuditProvider>
        <Layout></Layout>
      </AuditProvider>
    </AuthProvider>
  );
}

export const Layout = () => {
  const { authState, onLogout } = useAuth();

  return (
    <Stack.Navigator>
      {authState?.authenticated ? (
        <>
          <Stack.Screen
            name="Home"
            component={home}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={login} />
          <Stack.Screen name="Register" component={register} />
        </>
      )}
    </Stack.Navigator>
  );
};
