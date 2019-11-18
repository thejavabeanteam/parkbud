import React from 'react';

export class ScheduleForm extends React.Component {
    render() {
        const {form, nextPage, previousPage, onChange, submitForm} = this.props;
        const monday = "form.schedule.filter(day => {return day.dayOfWeek === \"Monday\"})[0]";
        const tuesday = "form.schedule.filter(day => {return day.dayOfWeek === \"Tuesday\"})[0]";
        const wednesday = "form.schedule.filter(day => {return day.dayOfWeek === \"Wednesday\"})[0]";
        const thursday = "form.schedule.filter(day => {return day.dayOfWeek === \"Thursday\"})[0]";
        const friday = "form.schedule.filter(day => {return day.dayOfWeek === \"Friday\"})[0]";
        return (
            <form onSubmit={(event) => event.preventDefault()}>
                <small>What time do you leave campus on...</small>
                <div>
                    <label htmlFor="monday">Monday?</label>
                    {form.monday && <small>Currently set at {form.monday}</small>}
                    <input
                        name="monday"
                        type="time"
                        onChange={(event) => onChange(event)}
                    />
                </div>
                <div>
                    <label htmlFor="tuesday">Tuesday?</label>
                    <input
                        name="tuesday"
                        type="time"
                        onChange={(event) => onChange(event)}
                    />
                </div>
                <div>
                    <label htmlFor="wednesday">Wednesday?</label>
                    <input
                        name="wednesday"
                        type="time"
                        onChange={(event) => onChange(event)}
                    />
                </div>
                <div>
                    <label htmlFor="thursday">Thursday?</label>
                    <input
                        name="thursday"
                        type="time"
                        onChange={(event) => onChange(event)}
                    />
                </div>
                <div>
                    <label htmlFor="friday">Friday?</label>
                    <input
                        name="friday"
                        type="time"
                        onChange={(event) => onChange(event)}
                    />
                </div>
                <button onClick={previousPage}>Back</button>
                <button onClick={nextPage}>Next</button>
                <button onClick={submitForm} type="submit">Submit</button>
            </form>
        )
    }
}
