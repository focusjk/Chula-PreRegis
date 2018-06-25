import 'react-select/dist/react-select.css';

import React, { Component } from 'react';

import Select from 'react-select';

class SearchPanel extends Component {
    constructor(props){
        super(props);
        this.state = {
            startTime: {value: 800, label: '8.00'},
            endTime: {value: 1700, label: '17.00'},
            time: null,
            courseNo: '',
            name: '',
            searchResult: this.props.subject,
            day: null,
        };
        
        this.onNameChange = this.onNameChange.bind(this);
        this.onCourseNoChange = this.onCourseNoChange.bind(this);
        this.onFilter = this.onFilter.bind(this);
        this.onFilterDay = this.onFilterDay.bind(this);
        this.onStartTimeChange = this.onStartTimeChange.bind(this);
        this.onEndTimeChange = this.onEndTimeChange.bind(this);
        this.onDayChange = this.onDayChange.bind(this);
    }

    onFilter(name, courseNo, day) {
        let copyResult = [];
        copyResult = this.props.subject.filter((subject) => { 
            return (
                ( name == null || name.length == 0 || subject.name.indexOf(name) >= 0 ) &&
                ( courseNo == null || courseNo.length == 0 || subject.courseNo.indexOf(courseNo) >= 0 ) &&
                this.onFilterDay(subject, day)
            )
        })
        this.setState({
            searchResult: copyResult,
        });
    }

    onFilterDay(subject, day) {
        let available = false;

        if(day == null) day = { value: 0};
        for(var i = 0; i < subject.time.length; i++) {
            if(day.value == 0 || subject.time[i].day == day.value) {
                available = true;
            }
        }
        return available;
    }
    
    onStartTimeChange(time) {
        this.setState({
            startTime: time,
        });
    }

    onEndTimeChange(time) {
        this.setState({
            endTime: time,
        });
    }

    onDayChange(day) {
        this.onFilter(this.state.name, this.state.courseNo, day);
        this.setState({
            day: day,
        });
    }

    onCourseNoChange() {
        this.onFilter(this.state.name, this.refs.courseNo.value, this.state.day);
        this.setState({
            courseNo: this.refs.courseNo.value,
        });
    }
    
    onNameChange() {
        this.onFilter(this.refs.name.value, this.state.courseNo, this.state.day);
        this.setState({
            name: this.refs.name.value,
        });
        console.log(this.refs.name.value);
    }

    timeOption() {
        return [
            {value: 800, label: '8.00'},
            {value: 850, label: '8.30'},
            {value: 900, label: '9.00'},
            {value: 950, label: '9.30'},
            {value: 1000, label: '10.00'},
            {value: 1050, label: '10.30'},
            {value: 1100, label: '11.00'},
            {value: 1150, label: '11.30'},
            {value: 1200, label: '12.00'},
            {value: 1250, label: '12.30'},
            {value: 1300, label: '13.00'},
            {value: 1350, label: '13.30'},
            {value: 1400, label: '14.00'},
            {value: 1450, label: '14.30'},
            {value: 1500, label: '15.00'},
            {value: 1550, label: '15.30'},
            {value: 1600, label: '16.00'},
            {value: 1650, label: '16.30'},
        ];
    }

    dayOption() {
        return [
            { value: 1, label: 'Monday' },
            { value: 2, label: 'Tuesday' },
            { value: 3, label: 'Wednesday' },
            { value: 4, label: 'Thursday' },
            { value: 5, label: 'Friday' },
            { value: 6, label: 'Saturday' },
            { value: 7, label: 'Sunday' }, 
        ];
    }

    day(value) {
        let copyDay = this.dayOption();
        let nameDay = '';
        for(var i = 0; i < copyDay.length; i++ ){
            if(value == copyDay[i].value){
                nameDay = copyDay[i].label;
            }
        }
        return nameDay;
    }

    time(value) {
        let copyTime = this.timeOption();
        let nameTime = '';
        for(var i = 0; i < copyTime.length; i++ ){
            if(value == copyTime[i].value){
                nameTime = copyTime[i].label;
            }
        }
        return nameTime;
    }

  render() {
    return (
        <div className="col-xs-3">
            <div className="panel panel-default" >
                <div className="input-group"> 
                    <span className="input-group-addon"><i className="glyphicon glyphicon-calendar"></i></span>  
                    <Select  
                        options={ this.dayOption() }
                        value={ this.state.day }
                        placeholder="Day"
                        onChange={ this.onDayChange }
                        className="text-left selectstyle"
                    />
                </div>

                <div className="input-group" >
                    <span className="input-group-addon"><i className="glyphicon glyphicon-tag"></i></span>
                    <input 
                        type="text" 
                        className="form-control" 
                        ref="courseNo" 
                        placeholder="Course NO. : 88888888" 
                        value={this.state.courseNo} 
                        onChange={() => this.onCourseNoChange()} 
                    />
                </div>

                <div className="input-group">
                    <span className="input-group-addon"><i className="glyphicon glyphicon-book"></i></span>
                    <input 
                        type="text" 
                        className="form-control"
                        ref="name" 
                        placeholder="Course Name : Gen Phy II" 
                        value={this.state.name} onChange={() => this.onNameChange()} 
                    />
                </div>
                <div className="blackline" style={{ marginTop: '30px', marginBottom: '20px'}} />

                <div className="col-sm-12">    
                    <div className="resultstyle">
                        ( Result : {this.state.searchResult.length} { this.state.searchResult.length >= 2 ? 'classes )' : 'class )' }
                    </div>
                    <ul className="list-group">
                        { 
                            this.state.searchResult.map((element) => { 
                                return (
                                    <div className="list-group-item" onClick={() => this.showOnTable()}>
                                        <div className="courseNostyle" > { element.courseNo } </div>
                                        <div className="namestyle" > { element.name } </div>
                                        { element.onList && 
                                            <button onClick={()=> this.props.falseOnlist(element.index)} className="checkbuttonstyle">
                                                <span className="glyphicon glyphicon-check" style={{ display: 'inline'}} ></span>
                                            </button>
                                        }
                                        { !element.onList && 
                                            <button onClick={()=> this.props.trueOnlist(element.index)} className="checkbuttonstyle">
                                                <span className="glyphicon glyphicon-unchecked" style={{ display: 'inline'}} ></span>
                                            </button>
                                        }
                                        <div className="text-left" > 
                                            { 
                                                element.time.map((time) => {
                                                    return(
                                                        <div>
                                                            <div style={{ display: 'inline', padding: '0 10px 0 25%'}} >{ this.day(time.day) }</div>

                                                            { this.time(time.start)} - { this.time(time.end) }
                                                        </div>
                                                    )}
                                                ) 
                                            } 
                                        </div>
                                    </div>
                                )}
                            )
                        }
                    </ul>
                </div>
                    
            </div>
        </div>
    );
  }
}

export default SearchPanel;