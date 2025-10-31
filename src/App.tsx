import { MantineProvider, createTheme } from "@mantine/core";
import RouterProvider from "./routes/RouteProvider/RouteProvider";
import { Notifications } from "@mantine/notifications";

import "./styles/index.scss";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

const theme = createTheme({
  /** Put your mantine theme override here */
});

function App() {
  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <RouterProvider />
    </MantineProvider>
  );
}

export default App;
