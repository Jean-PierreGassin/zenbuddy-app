/**
 * Navbar Elements
 *
 */
import { connect } from 'react-redux';

// The component we're mapping to
import NavbarMenuButtonRender from './NavbarMenuButtonView';

// What data from the store shall we send to the component?
const mapStateToProps = () => ({});

// Any actions to map to the component?
const mapDispatchToProps = {};

// Export Component
exports.NavbarMenuButton = connect(mapStateToProps, mapDispatchToProps)(NavbarMenuButtonRender);
