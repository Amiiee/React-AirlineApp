import { BrowserRouter } from "react-router-dom";
import Header from "./components/core/Header/Header";
import Footer from "./components/core/Footer/Footer";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Layout></Layout>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
