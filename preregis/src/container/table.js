import React, { Component } from 'react';

import SubjectBar from '../components/subject_bar';

class Table extends Component {
    constructor(props) {
        super(props);
    }

    renderSubjects(subject) {
        return (
            <SubjectBar period={subject.period} name={subject.name} />
        );
    }

    renderTimePeriods(timePeriod) {
        return (
            <div style={{ display: 'inline', width: '10%'}}>
                <div 
                    className="timeperiod" 
                    style={{ width: '5%' , paddingLeft: `${timePeriod.length<2 ? `10px`: `0`}`}}
                > 
                    {timePeriod}
                </div>
                <div className="timeperiod" style={{ width: '5%' }}> </div>
            </div>
        );
    }

    renderDay(index) {
        let label = '';
        if(index == 1)label = 'Monday';
        else if(index == 2)label = 'Tueday';
        else if(index == 3)label = 'Wednesday';
        else if(index == 4)label = 'Thursday';
        else if(index == 5)label = 'Friday';
        else if(index == 6)label = 'Saturday';
        else if(index == 7)label = 'Sunday';

        return (
            <div className="daystyle" >
                {label}
            </div>
        );
    }

    renderClass(detail, idx) {
        if(detail.courseNo == null){
            return (
                <div style={{ height: '100%', display: 'inline-block', width: '5%'}}></div>
            );
        } else {
            return (
                <div className="classstyle" style={{width: `${detail.period*5}%`}}>
                    { detail.name }
                </div>
            );
        }
    }

    

    render() {
        let time_periods = ['8', '9', '10', '11', '12', '13', '14', '15', '16' ,'17'];
        return (

            <div>
                <div className="jumbotron">
                    <div className="col-sm-8 text-left my-table" >
                        <div className="blackline" />
                        <div className="row" style={{ width: '100%' }} > 
                            <div className="col-xs-2"></div>
                            <div className="col-xs-10 no-padding" style={{ height: '100%' }}>{time_periods.map(this.renderTimePeriods)}</div>
                        </div>
                        <div className="blackline" style={{ marginBottom: '5px'}} />
                        {
                            this.props.classOnTable.map((day, index)=> {
                                return(
                                    <div className="row" style={{ width: '100%', height: '60px' }}>
                                        <div className="col-xs-2">{ this.renderDay(index+1) }</div>
                                        <div className="col-xs-10 no-padding" style={{ paddingLeft: '13px', height: '100%', display: 'flex' }}>{ day.map((detail, idx) => { return this.renderClass(detail, idx) }) }</div> 
                                    </div>  
                                )
                            })
                        }
                        <div className="blackline" style={{ marginTop: '5px'}}/>
                    </div>          
                </div>

                <div style={{ width : '800px', right: 0, marginTop: '20px'}} >
                    {

                        this.props.subject.map((element) => {
                            return(
                                <div style={{display: 'inline-block'}}>
                                    { element.onList==false ? '' :
                                        <div style={{border: '1px solid lightgray', padding: '10px', margin: '5px'}}>
                                            <div className="courseNostyle" > { element.courseNo } </div>
                                            <div className="namestyle" > { element.name } </div>
                                            <button onClick={()=> this.props.falseOnlist(element.index)}>
                                                <span className="glyphicon glyphicon-remove" style={{ display: 'inline'}} ></span>
                                            </button>
                                        </div> 
                                    }
                                </div>
                                
                            )}
                        )
                    }
                </div>
            </div>
    );
  }
}

export default Table;

