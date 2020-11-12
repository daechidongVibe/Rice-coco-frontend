import { connect } from 'react-redux';
import { setIsLoaded } from '../actions/index';
import App from '../../App';
import React from 'react';
import { Provider } from 'react-redux';
import store from '../store/index';

const AppContainer = ({ isLoaded, setIsLoaded }) => {
  return (
    <Provider store={store}>
        <App isLoaded={isLoaded} />
    </Provider>
  );
};

const mapStateToProps = state => ({
  isLoaded: state.isLoaded,
});

const mapDispatchToProps = dispatch => ({
  setIsLoaded: isLoaded => { dispatch(setIsLoaded(isLoaded)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
