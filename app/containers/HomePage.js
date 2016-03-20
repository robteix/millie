import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import * as TalkyActions from '../actions/talky';

function mapStateToProps(state) {
  return {
    selected: state.talky.selected,
    isOpenAddServiceDialog: state.talky.isOpenAddServiceDialog,
    services: state.talky.services,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TalkyActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);