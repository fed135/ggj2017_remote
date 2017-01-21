import Inferno from 'inferno';
import Component from 'inferno-component';

const MAX_PLAYERS = 8;

class Lobby extends Component {
	constructor(props) {
		super(props);

		this.role = window.isMobileDevice?'play':'spectate';
		this.locked = false;
		Net.subscribe('lobby.update', this.handleUpdate.bind(this));
	}

	handleClick() {
		console.log('starting match');
		this.props.nav('controller');
	}

	handleUpdate(packet) {
		Net.match = packet;
		this.setState(this.state);
	}

	buildHeads() {
		return Array.from(new Array(MAX_PLAYERS))
			.map((i, count) => {
				const label = 'player_' + count;
				const state = label + ' head ' + ((count < Net.match.players)? 'deactivated' : 'activated');
				return <div class={ state }></div> 
			})
	}

	render() {
		return (
			<div>
				<h2>Lobby</h2>
				<div class="row">
					<div>{ Net.match.name }</div>
				</div>
				<div class="row">
					<div>{ this.buildHeads() }</div>
				</div>
				<div class="row">
					{ this.role === 'play' ? <button label="Start game" onClick={this.handleClick.bind(this)}>Start game</button> : <div>Waiting for match to start</div> }
				</div>
			</div>
		);
	}
}

export default Lobby;