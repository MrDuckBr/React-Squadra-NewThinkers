
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';
import Task from "./pages/Task";
import ListTask from "./pages/ListTask";
import {Layout} from 'antd';
import 'antd/dist/antd.css';


function App() {
  
  return (
    <Layout.Content style={{padding:20}}>
    <Router>
    <Link to="/">Listas de Tarefa</Link> 
      <Switch>
      <Route exact path="/">
        <ListTask/>
      </Route>
      <Route exact path="/list/:id">
      <Task/>
      </Route>
      </Switch>
    </Router>
    </Layout.Content>
  )
}

export default App;
