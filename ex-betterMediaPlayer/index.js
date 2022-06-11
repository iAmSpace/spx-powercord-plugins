const { Plugin } = require("powercord/entities")
const { React, getModule, getModuleByDisplayName } = require("powercord/webpack")
const { inject, uninject } = require("powercord/injector")
const Settings = require("./components/settings")
const { PipIcon, LoopIcon } = require("./components/Buttons")
const Contols = getModule([ "Controls" ], false).Controls
const MediaPlayer = getModuleByDisplayName("MediaPlayer", false)
const { ModalRoot, ModalSize } = getModule(["ModalRoot"], false)
const { openModal } = getModule(["openModal"], false)
const Alert = require("./components/Alert")
const videoControls = getModule(["videoControls"], false).videoControls
const audioControls = getModule(["audioControls"], false).audioControls
module.exports = class BetterMediaPlayer extends Plugin {
	constructor() {
		super()
	}
	error(e) {
		console.error(this.props.error)
		openModal(props => {
			return React.createElement(ModalRoot, Object.assign({
				size: ModalSize.SMALL,
				children: React.createElement(Alert, {error: e, onClose: props.onClose})
			}, props))
		})
	}
	startPlugin() {
        console.log("test")
		const { get } = this.settings
	    powercord.api.settings.registerSettings("BetterMediaPlayer-settings", {
    	  	category: this.entityID,
    		label: "Better Media Player",
	      	render: Settings
    	})
		inject("BetterMediaPlayer-Contols", Contols.prototype, "render", (_, res) => {
			if (res.props.className === videoControls && get("button_pip", true) === true) {
				res.props.children.splice(get("position_pip", 1), 0, React.createElement(PipIcon, {instance: this}))
			}
			if (res.props.className === videoControls && get("button_loop", true) === true) {
                res.props.children.splice(get("position_loop", 1), 0, React.createElement(LoopIcon, {instance: this, active: get("auto_loop", true)}))
            }
			if (res.props.className === audioControls && get("button_loop_audio", true) === true) {
                res.props.children.splice(get("position_loop", 1), 0, React.createElement(LoopIcon, {instance: this, active: get("auto_loop_audio", true)}))
            }
			return res
		})
		inject("BetterMediaPlayer-AutoLoopVideo", MediaPlayer.prototype, "renderVideo", (_, res) => {
			if(get("auto_loop", true)) 
				res.props.loop = true
			return res
		})
		inject("BetterMediaPlayer-AutoLoopAudio", MediaPlayer.prototype, "renderAudio", (_, res) => {
			if(get("auto_loop_audio", true)) 
				res.props.loop = true
			return res
		})
	}
	pluginWillUnload() {
        powercord.api.settings.unregisterSettings("BetterMediaPlayer-settings")
		uninject("BetterMediaPlayer-Contols")
		uninject("BetterMediaPlayer-AutoLoopVideo")
		uninject("BetterMediaPlayer-AutoLoopAudio")
	}
}
