/**
 * Settings Container
 *
 */
import { connect } from 'react-redux';

// The component we're mapping to
import SettingsRender from './SettingsView';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
});

// Any actions to map to the component?
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsRender);
