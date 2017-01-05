/**
 * Friends Container
 *
 */
import { connect } from 'react-redux';

// The component we're mapping to
import FriendsRender from './FriendsView';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
});

// Any actions to map to the component?
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FriendsRender);
