import Inferno from 'inferno';
import Component from 'inferno-component';

class Splash extends Component {
	constructor(props) {
		super(props);

		this.label = window.isMobileDevice?'Play':'Spectate';
		this.locked = false;

		this.fullScreen = false;
	}

	handleClick() {
		if (!this.locked) {
			if (!this.fullScreen) {
				const tag = document.body;
				const fsEvent = (tag.requestFullScreen)?"requestFullScreen":(tag.mozRequestFullScreen)?"mozRequestFullScreen":(tag.webkitRequestFullScreenWithKeys)?"webkitRequestFullScreenWithKeys":(tag.webkitRequestFullScreen)?"webkitRequestFullScreen":"FullscreenError";

				// Enter full screen
				tag[fsEvent]();	
			}

			this.locked = true;
			var match = '' + document.getElementById('lobby_name').value
			Net.subscribe('lobby.join', this.handleReply.bind(this));
			Net.send('lobby.join', { match, role: this.label.toLowerCase() });
		}
	}

	handleReply(packet) {
		this.locked = false;
		Net.unsubscribe('lobby.join', this.handleReply.bind(this));
		if (packet.state) {
			Net.match = packet;
			this.props.nav('lobby');
		}
		else {
			alert('Match unavailable');
		}

	}

	render() {
		const btnClass = 'btn btn-' + ((this.label === 'Play')? 'success' : 'info');
		return (
			<div>
				<h2>Wave</h2>
				<div class="row">
					<div class="col-sm-6 col-sm-offset-3 form-group col-xs-8 col-xs-offset-2">
						<input id="lobby_name" class="form-control" />
					</div>
				</div>
				<div class="row">
					<div class="col-sm-4 col-sm-offset-4 col-xs-6 col-xs-offset-3">
						<button label={this.label} class={btnClass} onClick={this.handleClick.bind(this)}>{this.label}</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Splash;