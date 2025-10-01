import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { RainbowKitProvider } from "./providers/RainbowKitProvider";
import { AuthProvider } from "./providers/AuthProvider";

function App() {
  return (
    <RainbowKitProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </RainbowKitProvider>
  );
}

export default App;
