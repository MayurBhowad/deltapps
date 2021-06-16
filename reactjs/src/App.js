import logo from './logo.svg';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Search from './components/Search.component';
import NewProduct from './components/NewProduct.component';

function App() {
  //chenage for v1

  return (
    <Router>
      <div className="App" >
        <Route exact path="/" component={Search} />
        <Route exact path="/addproduct" component={NewProduct} />
        {/* <Search /> */}
      </div>
    </Router>
  );
}

export default App;
