import './App.css';
import Home from './Pages/Home';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Members from './Pages/Members';
import Resources from './Pages/Resources';
import WhyUs from './Pages/WhyUs';
import PagesNotFound from './Pages/PagesNotFound';
import Anouncements from "./Pages/Anouncements"
import Dashboard from './Pages/Dashboard';
function App() {
  return (
    <div className="App">
      <Router>
        <>
        </>
        <Routes>
          <Route exact path='/' element={<><Navbar />< Home />
          </>}></Route>
          <Route exact path='/members' element={<><Navbar />< Members />
          </>}></Route>
          <Route exact path='/resources' element={<><Navbar />< Resources />
          </>}></Route>
          <Route exact path='/anouncements' element={<><Navbar />< Anouncements />
          </>}></Route>
          <Route exact path='/why' element={<><Navbar />< WhyUs /> 
          </>}></Route>
          <Route exact path='/resources' element={<><Navbar />< Resources />
          </>}></Route>
          <Route exact path='/dashboard' element={<>< Dashboard /></>}></Route>
          <Route path='*' element={<PagesNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
