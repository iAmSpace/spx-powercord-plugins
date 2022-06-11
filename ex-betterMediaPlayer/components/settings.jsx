const { SwitchItem, Category, SliderInput } = require('powercord/components/settings')
const { React } = require('powercord/webpack')
const FakeMessage = require("./FakeMessage")
class Group extends React.Component {
    constructor(props) {
        super(props)
        this.state = { toggled: false }
    }
    render() {
        return (<Category name={this.props.name} description={this.props.description} opened={this.state.toggled} onChange={() => this.setState({ toggled: !this.state.toggled })}>{this.props.children}</Category>)
    } 
}
module.exports = class Settings extends React.PureComponent {
	constructor(props) {
		super(props)
	}
	render() {
		const { getSetting, updateSetting, toggleSetting } = this.props
		return (
            <>
                <Group name="Demo" description="Fake message to see how it works">
                    <FakeMessage />
                </Group>
                <Group name="Loop" description="Loop configuration">
                    <SwitchItem value={getSetting("button_loop", true)} note="Loop videos in a simple click" onChange={() => toggleSetting("button_loop")}>Loop button for videos</SwitchItem>
                    <SwitchItem value={getSetting("button_loop_audio", true)} note="Loop audios in a simple click" onChange={() => toggleSetting("button_loop_audio")}>Loop button for audios</SwitchItem>
                    <SliderInput
                        stickToMarkers
                        minValue={ 0 }
                        maxValue={ 6 }
                        initialValue={ getSetting("position_loop", 1) }
                        markers={[0,1,2,3,4,5]}
                        defaultValue={ getSetting("position_loop", 1) }
                        onValueChange={ v => updateSetting("position_loop", v) }
                        note="Move the loop button to different spots"
                    >Position for the loop button</SliderInput>
                    <SwitchItem value={getSetting("auto_loop", true)} note="Automatically loop videos" onChange={() => toggleSetting("auto_loop")}>Auto loop videos</SwitchItem>
                    <SwitchItem value={getSetting("auto_loop_audio", true)} note="Automatically loop audios" onChange={() => toggleSetting("auto_loop_audio")}>Auto loop audios</SwitchItem>
                </Group>
                <Group name="Picture in picture" description="Picture in picture configuration">
                    <SwitchItem value={getSetting("button_pip", true)} note="Picture In Picture in a simple click" onChange={() => toggleSetting("button_pip")}>PIP button</SwitchItem>
                    <SliderInput
                        stickToMarkers
                        minValue={ 0 }
                        maxValue={ 6 }
                        initialValue={ getSetting("position_pip", 1) }
                        markers={[0,1,2,3,4,5]}
                        defaultValue={ getSetting("position_pip", 1) }
                        onValueChange={ v => updateSetting("position_pip", v) }
                        note="Move the PIP button to different spots"
                    >Position for the PIP button</SliderInput>
                </Group>
            </>
		)
	}
}
