import React from 'react';
import { Grid, Header, Icon, Dropdown, Image } from 'semantic-ui-react';
import firebase from "../../firebase";
import { connect } from 'react-redux';

class UserPanel extends React.Component {
    state = {
        user: this.props.currentUser
    };

    /*componentDidMount() {
        this.setState({ user: this.props.currentUser });
        console.log(this.state.user);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            user: nextProps.currentUser
        })
    }*/

    dropdownOptions = () => [
        {
            key: "user",
            text: <span>Signed in as <strong>{this.state.user.displayName}</strong></span>,
            /*text: (
                <span>
                    Signed in as{" "}
                    <strong>{ this.state.user && this.state.user.displayName }</strong>
                </span>
            ),*/
            disabled: true
        },
        {
            key: "avatar",
            text: <span>Change Avatar </span>,
            disabled: true
        },
        {
            key: "signout",
            text: <span onClick={this.handleSignout}>Sign Out</span>
        }
    ];

    handleSignout = () => {
        firebase
            .auth()
            .signOut()
            .then(() => console.log("sign out"));
    };

    render() {
        // console.log(this.props.currentUser);
        console.log(this.state.user);
        const { user } =  this.state;
        const { primaryColor } = this.props;

        return (
            <Grid style={{ background: primaryColor}}>
                <Grid.Column>
                    <Grid.Row style={{ padding: '1.2em', margin: 0 }}>
                        {/* App Header */}
                        <Header inverted floated="left" as="h2">
                            <Icon name="code"/>
                            <Header.Content>DevChat</Header.Content>
                        </Header>

                        {/* User Dropdown */}
                        <Header style={{ padding: '0.25em' }} as="h4" inverted>
                            <Dropdown trigger={
                                <span>
                                <Image src={user.photoURL} spaced="right" avatar/>
                                    {user.displayName}
                            </span>
                            } options={
                                this.dropdownOptions()
                            } />
                        </Header>
                    </Grid.Row>

                </Grid.Column>
            </Grid>
        )
    }
}

export default UserPanel;