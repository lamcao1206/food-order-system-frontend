import { MantineProvider, createTheme } from "@mantine/core";
import RouterProvider from "./routes/RouteProvider/RouteProvider";
import "./styles/index.scss";

const theme = createTheme({
  /** Put your mantine theme override here */
});

function App() {
  return (
    <MantineProvider theme={theme}>
      <RouterProvider />
    </MantineProvider>
  );
}

export default App;
