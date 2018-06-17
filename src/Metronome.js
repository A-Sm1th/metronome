import React, {Component} from 'react';
import './Metronome.css';
import click1 from './click1.wav';
import click2 from './click2.wav';

class Metronome extends Component {
   constructor(props){
       super(props);

       this.state = {
           playing: false,
           count: 0,
           bpm: 100,
           beatsPerMeasure: 2,
           beatCount: 0,
       };

       this.click1 = new Audio(click1);
       this.click2 = new Audio(click2);
   }

   playClick = () => {
       const { count, beatsPerMeasure } = this.state;

       if(count % beatsPerMeasure === 0) {
           this.click2.play();
       } else {
           this.click1.play();
       }

       this.setState(state => ({
           count: (state.count + 1) % state.beatsPerMeasure
       }));
   }

   startStop = () => {
       if(this.state.playing){
           clearInterval(this.timer);
           this.setState({
               playing: false
           });
       } else {
           this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000)
           this.setState({
               count: 0,
               playing: true
           }, this.playClick);
       }
   }

    handleBpmChange = event => {
        const bpm = event.target.value;
        
        if(this.state.playing) {
            clearInterval(this.timer);
            this.timer = setInterval(this.playClick, (60 / bpm) * 1000);

            this.setState({
                count: 0,
                bpm
            });
        } else {
            this.setState({ bpm });
        }
    }

    handleBeatsPerMeasure = event => {
        const beatsPerMeasure = event.target.value;

        if(this.state.playing) {
            clearInterval(this.timer);
            this.timer = setInterval(this.playClick);
            this.setState({
                count:0,
                beatsPerMeasure
            });
        } else {
            this.setState({ beatsPerMeasure });
        }
    }

    render () {
        const { playing, bpm, beatsPerMeasure, beatCount } = this.state;

        return (
            <div className= "metronome">
                <div className="bpm-slider">
                <h1>The Beat Machine</h1>
                <div>{bpm} BPM </div>
                    <input
                        type="range"
                        min="60"
                        max="500"
                        value={bpm}
                        onChange ={this.handleBpmChange} />
                </div>
                <div className="beatsPerMeasure">
                    Beats per 2nd measure:
                </div>
                <div className="beatsPerMeasureInput">
                <input
                    className="beatsPerMeasureInput"
                    type="text" 
                    pattern="[0-9]*" 
                    maxLength="{2}"
                    value={beatsPerMeasure}
                    onChange = {this.handleBeatsPerMeasure}
                    size="4"/>
                </div>
                <div className="beatsPerMeasure">
                    Realised beats : {beatCount}
                </div>
                <button onClick={this.startStop}>
                    {playing ? 'Stop' : 'Start'}
                </button>
            </div>
        );        
    }
}

export default Metronome;