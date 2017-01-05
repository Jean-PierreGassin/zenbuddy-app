/**
 * Session Container
 *
 */
import { connect } from 'react-redux';

// The component we're mapping to
import SessionRender from './SessionView';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  user: state.user,
});

// Any actions to map to the component?
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SessionRender);
