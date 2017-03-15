/**
 * Personal Screen
 *  - Allows the user to sit through a meditation session
 *
 */
import moment from 'moment';
import iCloudStorage from 'react-native-icloudstore';
import React, { Component } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  NativeEventEmitter,
} from 'react-native';

// Consts and Libs
import { AppStyles } from '@theme/';

// Components
import { Text, Spacer } from '@ui/';
import Loading from '@components/general/Loading';
import Error from '@components/general/Error';

// Component
class PersonalView extends Component {
  static componentName = 'PersonalView';

  static propTypes = {
    user: React.PropTypes.shape({}).isRequired,
    updateMe: React.PropTypes.func.isRequired,
  }

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

  componentWillReceiveProps = (newProps) => {
    if (newProps.user && newProps.user.sessionHistory) {
      this.setState({
        error: '',
        userData: newProps.user,
      });

      setTimeout(() => {
        this.renderHistoryPills();
      });
    }
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
    const newSessions = [];

    if (!this.state.userData.sessionHistory) {
      this.setState({
        error: 'No sessions recorded yet',
      });

      return newSessions;
    }

    this.state.userData.sessionHistory.forEach((session) => {
      newSessions.push(
        <View key={session.date} style={[AppStyles.row]}>
          <View style={[AppStyles.flex1]} />

          <TouchableOpacity
            activeOpacity={0.7}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
            style={AppStyles.primaryPill}
          >
            <Text h4>{moment(session.date).format('dddd, MMM Do YYYY @ h:mma')}</Text>
            <Text>
              My session lasted for {session.length}
              &nbsp;minutes with {session.intervals ? session.intervals : 0}
              &nbsp;session intervals
            </Text>
          </TouchableOpacity>

          <View style={[AppStyles.flex1]} />
        </View>,
      );
    });

    return this.setState({
      sessions: newSessions,
    });
  }

  render = () => {
    if (this.state.loading) return <Loading />;
    if (this.state.error) return <Error text={this.state.error} />;

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          AppStyles.container,
        ]}
      >
        <Spacer size={30} />

        <View style={[AppStyles.row]}>
          <View style={[AppStyles.flex1]} />

          <View style={[AppStyles.flex10]}>
            <Text h4>
              Current Zen streak is {this.state.userData.sessionStreak} day(s)!
            </Text>
          </View>

          <View style={[AppStyles.flex1]} />
        </View>


        <Spacer size={10} />

        <View style={[AppStyles.row]}>
          <View style={[AppStyles.flex1]} />

          <View style={[AppStyles.flex10]}>
            <Text h3>Session history - {this.state.sessions.length} total</Text>
          </View>

          <View style={[AppStyles.flex1]} />
        </View>

        {this.state.sessions}

        <Spacer size={30} />
      </ScrollView>
    );
  }
}

// Export Component
export default PersonalView;
