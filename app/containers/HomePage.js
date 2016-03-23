import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import * as MillieActions from '../actions/millie';

function mapStateToProps(state) {
  return {
    selected: state.millie.selected,
    isOpenAddServiceDialog: state.millie.isOpenAddServiceDialog,
    services: state.millie.services,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(MillieActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
