import Inferno from 'inferno';
import Component from 'inferno-component';

class Knob extends Component {
	constructor(props) {
		super(props);

		this.knob = {
			size: window.innerHeight * 0.3,
			x: (window.innerWidth * 0.25) - ((window.innerHeight * 0.3) * 0.5),
			y: window.innerHeight * 0.35,
			rX: (window.innerWidth * 0.25) - ((window.innerHeight * 0.3) * 0.5),
			rY: window.innerHeight * 0.35
		};

		this.origin = {
			x: null,
			y: null
		};

		this.force = {
			x: 0,
			y: 0
		};

		this.pressed = false;

		this.updateTimer = null;

		this.maxTilt = (window.innerWidth * 0.1);

		window.addEventListener('mouseup', this.handleRelease.bind(this));
		window.addEventListener('mouseleave', this.handleRelease.bind(this));
		setTimeout(() => {
			document.getElementById('joystick-wrapper')
				.addEventListener('mouseleave', this.handleRelease.bind(this));
		}, 1000);
	}

	dist(x1, y1, x2, y2) {
		return Math.sqrt(Math.pow((x2 - x1),2) + Math.pow((y2 - y1),2));
	}

	handlePress(evt) {
		this.updateTimer = window.requestAnimationFrame(this.refreshStick.bind(this));
		this.pressed = true;
		this.origin.x = evt.x;
		this.origin.y = evt.y;
	}

	handleRelease(evt) {
		this.pressed = false;
		this.origin.x = null;
		this.origin.y = null;
	}

	refreshStick() {
		this.force.x = Math.min(1, Math.max(-1, (this.knob.x - this.knob.rX)/this.maxTilt));
		this.force.y = Math.min(1, Math.max(-1, (this.knob.y - this.knob.rY)/this.maxTilt));

		//console.log(this.force);
		Net.send('player.move', {
			x: this.force.x,
			y: this.force.y,
			ts: Date.now(),
			color: Net.match.color,
			match: Net.match.name
		});

		if (this.pressed) {
			this.updateTimer = window.requestAnimationFrame(this.refreshStick.bind(this));
		}
		else {
			this.knob.x = this.knob.rX;
			this.knob.y = this.knob.rY;
		}

		// re-render joystick
		this.setState(this.state);
	}

	handleMove(evt) {
		// Update force
		if (this.pressed) {
			this.knob.x = this.knob.rX + (evt.x - this.origin.x);
			this.knob.y = this.knob.rY + (evt.y - this.origin.y);
		}
	}

	render() {
		return (
			<div class="joystick-knob" style={{
				width: this.knob.size +'px',
				height: this.knob.size + 'px',
				top: this.knob.y + 'px',
				left: this.knob.x + 'px'
			}} onMouseDown={ this.handlePress.bind(this) } onMouseMove={ this.handleMove.bind(this) } />
		);
	}
}

export default Knob;