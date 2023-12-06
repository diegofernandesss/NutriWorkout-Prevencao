import { BrowserRouter as Router } from 'react-router-dom';
import Routes  from './routers/router'
import { AuthProvider } from './Context/Auth';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe('pk_test_51OB1LfG3MmSCXeR1zgQNcLrnG57OYVqkX7wBksrox22SNCRYxLqjJsjl5kg60Vb1H6zaO5MI0iP80984tP6mdggx00B3mXkcdz');


export const App = () => {
  return (
    <Router>  
      <AuthProvider>
        <Elements stripe={stripePromise}>
          <Routes />
        </Elements>
      </AuthProvider>
    </Router>
  )
}