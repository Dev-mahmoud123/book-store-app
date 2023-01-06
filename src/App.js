import "./App.css";
import AddForm from "./components/AddForm";
import BookContainer from "./components/books/BookContainer";
import Container from "./components/Container";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Container>
        <AddForm/>
        <BookContainer />
      </Container>
    </div>
  );
}

export default App;
