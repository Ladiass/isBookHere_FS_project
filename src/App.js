import './App.css';
import Navbar from "./component/Navbar";
import { BrowserRouter,Switch,Route } from "react-router-dom";
// eslint-disable-next-line
import Footer from "./component/Footer";
import HomePage from "./component/pages/HomePage"
// eslint-disable-next-line 
import PageNotFound from "./component/pages/PageNotFound";
import SearchPage from "./component/pages/search.page";
import SearchItems from "./component/pages/Search.items";
import LogReg from "./component/pages/Forms/LogReg";
import Tags from "./component/pages/Tags"
// import Users from "./component/Users";
import AddBook from "./component/pages/Forms/Book.add";
import EditBook from "./component/pages/Forms/Book.edit";
import MyBooks from "./component/pages/myBooks";
import Alert from "./component/Alert";
import UserDetails from "./component/pages/UserDetails"
import ProductDetails from "./component/pages/ProductShow";
import Cart from "./component/pages/Cart";
import Orders from "./component/pages/Orders";


function App() {
  
  return (
    <>
      <BrowserRouter>
          <Alert />
          <Navbar />
          <main>
            <Switch>
                <Route path="/Login" component={LogReg} />
                <Route path="/Register" component={LogReg} />

                <Route path="/search/booksname" component={SearchItems} />
                <Route path="/search" component={SearchPage} />

                <Route path="/tags" component={Tags}/>
                <Route path="/cart" component={Cart}/>
                <Route path="/myorder" component={Orders}/>
                <Route path="/books/edt/:id" component={EditBook}/>
                <Route path="/books/add" component={AddBook}/>
                <Route path="/books/mybooks" component={MyBooks}/>
                <Route path="/books/:id" component={ProductDetails}/>

                <Route path="/users/:id" component={UserDetails}/>
                <Route path="/404" component={PageNotFound}/>

                <Route component={HomePage}/>
            </Switch>
          </main>
          {/* <Footer/> */}
      </BrowserRouter>
      
    </>
  );
}

export default App;
