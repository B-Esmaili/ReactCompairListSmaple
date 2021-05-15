import '../styles/globals.css'
import {Grommet} from 'grommet';
import configureStore from '../components/store';
import { Provider } from "react-redux";

const initialState = {  
  products: [],
  compairList : []
};

const store = configureStore(initialState);

function MyApp({ Component, pageProps }) {
  return  <Provider store={store}>
    <Grommet>
      <Component {...pageProps} />
      </Grommet>
    </Provider>
}

export default MyApp
