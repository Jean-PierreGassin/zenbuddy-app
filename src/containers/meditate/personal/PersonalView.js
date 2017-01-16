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
  TouchableOpacity,
  NativeEventEmitter,
} from 'react-native';

// Consts and Libs
import { AppStyles, AppSizes } from '@theme/';

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
    this.syncUser();
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
          style={AppStyles.primaryPill}
        >
          <Text h4>{moment(session.date).format('dddd, MMM Do YYYY @ h:mma')}</Text>
          <Text>
            My session lasted for {session.length}
            &nbsp;minutes with {session.intervals ? session.intervals : 0}
            &nbsp;session intervals
          </Text>
        </TouchableOpacity>,
      );
    });

    sessions.sort((a, b) => {
      const firstKey = a.key;
      const secondKey = b.key;

      return firstKey < secondKey;
    });

    return this.setState({
      sessions,
    });
  }

  render = () => {
    if (this.state.loading) return <Loading />;
    if (this.state.error) return <Error text={this.state.error} />;

    return (
      <View style={AppStyles.containerCentered}>
        <ScrollView>
          <Spacer size={20} />

          <Text h4>
            Current Zen streak is {this.state.userData.sessionStreak} day(s)!
          </Text>

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
