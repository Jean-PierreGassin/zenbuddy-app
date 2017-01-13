/**
 * Personal Screen
 *  - Allows the user to sit through a meditation session
 *
 */
import moment from 'moment';
import iCloudStorage from 'react-native-icloudstore';
import React, { Component, PropTypes } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  NativeEventEmitter,
  InteractionManager,
} from 'react-native';

// Consts and Libs
import { AppStyles, AppSizes } from '@theme/';

// Components
import { Text, Spacer } from '@ui/';
import Loading from '@components/general/Loading';
import Error from '@components/general/Error';

// Styles
const styles = StyleSheet.create({});

// Component
class PersonalView extends Component {
  static componentName = 'PersonalView';

  constructor(props) {
    super(props);

    this.state = {
      error: '',
      loading: true,
      userData: [],
      sessions: [],
    };
  }

  componentWillMount = () => {
    this.eventEmitter = new NativeEventEmitter(iCloudStorage);
    this.eventEmitter.addListener('iCloudStoreDidChangeRemotely', () => this.syncUser());

    this.setState({
      loading: false,
      userData: this.props.user,
    });
  }

  componentDidMount = () => {
    this.renderHistoryPills();
  }
  
  syncUser = () => {
    iCloudStorage.getItem('user').then((response) => {
      if (response) {
        const userData = JSON.parse(response);

        this.props.updateMe({
          ...userData,
        });

        this.setState({
          userData,
        });
        
        this.renderHistoryPills();
      }
    });
  }

  renderHistoryPills = () => {
    const sessions = [];

    if (!this.state.userData.sessionHistory) {
      this.setState({
        error: 'No sessions recorded yet',
      });

      return sessions;
    }

    this.state.userData.sessionHistory.forEach((session, key) => {
      sessions.push(
        <TouchableOpacity
          key={key}
          activeOpacity={0.7}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          style={AppStyles.primaryPill}>
          <Text h4>{moment(session.date).format('MMMM Do YYYY @ h:mma')}</Text>
          <Text>My session lasted for {session.length} minutes with {session.intervals ? session.intervals : 0} session intervals</Text>
        </TouchableOpacity>
      );
    });

    sessions.sort((a, b) => {
      return a.key < b.key;
    });

    this.setState({
      sessions,
    });
    console.log(sessions);
  }

  render = () => {
    if (this.state.loading) return <Loading />;
    if (this.state.error) return <Error text={this.state.error} />;

    return (
      <View style={AppStyles.containerCentered}>
        <ScrollView>
          <Spacer size={20} />

          <Text h4>My current Zen streak is {this.state.userData.sessionStreak} day(s), keep it up!</Text>

          <Spacer size={10} />

          <Text h3>Session history</Text>

          {this.state.sessions}
        </ScrollView>
      </View>
    );
  }
}

// Export Component
export default PersonalView;
