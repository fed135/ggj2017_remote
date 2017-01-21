import Inferno from 'inferno';
import Component from 'inferno-component';

import Joystick from './Joystick';

class Controller extends Component {
	constructor(props) {
		super(props);
	}

	handleButtonPress() {
		Net.send('player.punch', { player: Net.match.color, match: Net.match.name, ts: Date.now() });
	}

	render() {
		return (
			<div class="controller row">
				<div class="sec col-xs-6 col-sm-6">
					<Joystick />
				</div>
				<div class="sec col-xs-6 col-sm-6">
					<div class="action-button" onClick={ this.handleButtonPress.bind(this) }>Action</div>
				</div>
			</div>
		);
	}
}

export default Controller;