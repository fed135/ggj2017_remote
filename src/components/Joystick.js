import Inferno from 'inferno';
import Component from 'inferno-component';

class Joystick extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div class="joystick-wrapper">
				<div class="joystick-protector"></div>
				<div class="joystick-root"></div>
				<div class="joystick-knob"></div> 
			</div>
		);
	}
}

export default Joystick;