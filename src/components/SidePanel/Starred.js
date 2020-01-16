import React from 'react';
import { connect } from 'react-redux';
import { setCurrentChannel, setPrivateChannel } from "../../actions";
import {Icon, Label, Menu} from "semantic-ui-react";

class Starred extends React.Component {
    state = {
        activeChannel: '',
        starredChannels: []
    };

    setActiveChannel = channel => {
        this.setState({
            activeChannel: channel.id
        });
    };

    changeChannel = channel => {
        this.setActiveChannel(channel);
        this.props.setCurrentChannel(channel);
        console.log(channel);
        this.props.setPrivateChannel(false);
    };

    displayChannels = starredChannel => (
        starredChannel.length > 0 && starredChannel.map(channel => (
            <Menu.Item
                key={channel.id}
                onClick={() => this.changeChannel(channel)}
                name={channel.Name}
                style={{opacity: 0.7}}
                active={channel.id === this.state.activeChannel}
            >
                # {channel.name}
            </Menu.Item>
        ))
    );

    render() {
        const { starredChannels } = this.state;
        return (
            <Menu.Menu className="menu">
                <Menu.Item>
                    <span>
                        <Icon name="star" /> STARRED
                    </span>{" "}
                    ({ starredChannels.length })
                </Menu.Item>
                {this.displayChannels(starredChannels)}
            </Menu.Menu>
        );
    }
}

export default connect(null, { setCurrentChannel, setPrivateChannel})(Starred);