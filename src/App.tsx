import { Layout } from "./components/layout";
import { AppRoutes } from "./components/routes";
import "bootstrap/dist/css/bootstrap.min.css";
import { ROUTES } from "./constants";

function App() {
  return (
    <Layout>
      <AppRoutes routes={ROUTES} />
    </Layout>
  );
}

export default App;
