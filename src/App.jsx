import { BrowserRouter as Router } from 'react-router-dom';
import Routes  from './routers/router'
import { AuthProvider } from './Context/Auth';

export const App = () => {
  return (
    <Router>  
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Router>
  )
}