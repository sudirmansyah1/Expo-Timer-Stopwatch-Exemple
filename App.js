/*This is an Example of Timer/Stopwatch in React Native */
import React, { Component } from 'react';
import { StyleSheet,Text,View, TouchableHighlight, Dimensions, StatusBar } from 'react-native';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
import TimePicker from 'react-native-simple-time-picker';
var width = Dimensions.get('window').width;
export default class TestApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTimerStart: false,
      isStopwatchStart: false,
      timerDuration: 0,
      resetTimer: false,
      resetStopwatch: false,
      
    };
    this.startStopTimer = this.startStopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.startStopStopWatch = this.startStopStopWatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
  }
  startStopTimer() {
    this.setState({isTimerStart: !this.state.isTimerStart, resetTimer: false});
  }
  resetTimer() {
    this.setState({isTimerStart: false, resetTimer: true});
  }
  startStopStopWatch() {
    this.setState({isStopwatchStart: !this.state.isStopwatchStart, resetStopwatch: false});
  }
  resetStopwatch() {
    this.setState({isStopwatchStart: false, resetStopwatch: true});
  }
  getFormattedTime(time) {
      this.currentTime = time;
  }

  seting(hours, minutes) {
    
    var h = hours.hours;
    var m = hours.minutes;
    var r = (h*3600+m*60)*1000;
    if (!r) {
      this.setState({
        timerDuration: 0
      });  
    }
    else{
      this.setState({
        timerDuration: r
      });
    }
  }

  render() {
    let timepause;
    let timestart;
    let stoppause;
    let stopstart;
    const { selectedHours, selectedMinutes } = this.state;
    if (this.state.isStopwatchStart) {
      timestart = <Text style={{textAlign:"center", width: 300, borderRadius:35, backgroundColor:'red', color:'white', marginTop:20, fontWeight: "bold",}}>Can't process Timer, because Stopwatch has been started</Text>
      timepause = <Text></Text>
    }
    else{
      if (this.state.timerDuration == 0) {
        timestart = <Text style={{fontSize: 12.5,textAlign:"center", width: 300, borderRadius:35, backgroundColor:'red', color:'white', marginTop:20, fontWeight: "bold",}}>You can't start timer if you not already set the time</Text>
      }
      else if (!this.state.timerDuration){
        timestart = <Text style={{fontSize: 12.5,textAlign:"center", width: 300, borderRadius:35, backgroundColor:'red', color:'white', marginTop:20, fontWeight: "bold",}}>You can't start timer if you not already set the time</Text>
      }
      else{
        timestart = <TouchableHighlight onPress={this.startStopTimer}><Text style={options.buttons}>{!this.state.isTimerStart ? "START" : "STOP"}</Text></TouchableHighlight>
      }
      if (this.state.isTimerStart) {
        timepause = <Text style={{textAlign:"center", width: 300, borderRadius:35, backgroundColor:'red', color:'white', marginTop:20, fontWeight: "bold",}}>You must press "STOP" to reset timer</Text>
      }
      else{
        timepause = <TouchableHighlight onPress={this.resetTimer}><Text style={options.buttons}>RESET</Text></TouchableHighlight>;
      }
    }
    if (this.state.isTimerStart) {
      stopstart = <Text style={{textAlign:"center", width: 300, borderRadius:35, backgroundColor:'red', color:'white', marginTop:20, fontWeight: "bold",}}>Can't process Stopwatch, because Timer has been started</Text>
      stoppause = <Text></Text>
    }
    else{
      stopstart = <TouchableHighlight onPress={this.startStopStopWatch}><Text style={options.buttons}>{!this.state.isStopwatchStart ? "START" : "STOP"}</Text></TouchableHighlight>
      stoppause = <TouchableHighlight onPress={this.resetStopwatch}><Text style={options.buttons}>RESET</Text></TouchableHighlight>
    }
    return (
      
      <View style={{flex:1,justifyContent:'center',alignItems:'center', backgroundColor:'#fff9e6'}}>
        <StatusBar  
                    backgroundColor = "#b3e6ff"  
                    barStyle = "dark-content"   
                    hidden = {true}    
                    translucent = {true}
                    showHideTransition = {true}  
                />  
        <View style={{marginBottom:10}}>
            <Text style={options.headerk}>
              TIMER & STOPWATCH
            </Text>
            <Text style={options.headerk2}>
              SUDIRMANSYAH - 41517010011
            </Text>
          </View>
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
          
          <Text style={{fontSize:40}}>Stopwatch</Text>
          
          <Stopwatch laps msecs 
            start={this.state.isStopwatchStart}
            //To start
            reset={this.state.resetStopwatch}
            //To reset
            options={options}
            //options for the styling
            getTime={this.getFormattedTime} />
          {stopstart}
          {stoppause}
        </View>
        
        <View style={{flex:1,marginTop:25, alignItems:'center', justifyContent:'center', backgroundColor:'white', width: width}}>

          <Text style={{fontSize:40}}>Timer</Text>
          <View style={{ backgroundColor: '#fff', width: 250, borderRadius: 35, borderWidth:1, borderColor:'black', height: 30, alignItems: 'center', justifyContent: 'center', marginBottom:5 }}>
            <TimePicker
                selectedHours={selectedHours}
                //initial Hourse value
                selectedMinutes={selectedMinutes}
                //initial Minutes value
                hoursUnit=" Hours"
                minutesUnit=" Minutes"
                onChange={(hours, minutes) => this.seting({hours,minutes})}
              />
              
          </View><Text style={{color: 'red'}}>Please press "RESET" first after select time to set timer</Text>
          <Timer 
            totalDuration={this.state.timerDuration} msecs 
            //Time Duration
            start={this.state.isTimerStart}
            //To start
            reset={this.state.resetTimer}
            //To reset
            options={options}
            //options for the styling
            handleFinish={handleTimerComplete}
            //can call a function On finish of the time 
            getTime={this.getFormattedTime} />
          {timestart}
          {timepause}
        </View>
      </View>
    );
  }
}
 
const handleTimerComplete = () =>{alert("Timer has been done, you can press 'STOP' and reset the timer")}
const options = {
  container: {
    marginTop: 5,
    padding: 0,
    borderRadius: 5,
    width: 300,
    alignItems:'center',
    borderColor:'black',
    borderWidth:1,
    backgroundColor:'white'
  },
  text: {
    fontSize: 25,
    color: '#000',
    marginLeft: 7,
  },
  headerk: {
    marginTop:0,
    fontSize:25,  padding: 5,
    width: width,
    textAlign: 'center',
    alignSelf: 'stretch',
    color: '#fff',
    backgroundColor: '#FFC400',
    fontWeight: "bold",
    
  },
  headerk2: {
    marginTop:0,
    fontSize:20,  padding: 5,
    width: width,
    textAlign: 'center',
    alignSelf: 'stretch',
    color: '#fff',
    backgroundColor: '#FFC400',
    
  },
  buttons:{
    fontSize: 20, marginTop:10,
    width: 300,
    textAlign: 'center',
    alignSelf: 'stretch',
    color: '#fff',
    borderRadius: 35,
    backgroundColor: '#ffcf33'
  }
};