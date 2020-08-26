import React, {Component} from 'react';
class DCDoctorForm extends Component {
  constructor() {
    super();
    this.state = {
      isClicked: false,
      time: '',
      doctorId: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    const doctorId = this.props.doctor.id;
    this.setState({doctorId});
    const target = evt.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(evt) {
    evt.preventDefault();
    this.props.addAppointment(this.state);
    this.setState({
      isClicked: false,
      time: '',
      doctorId: 0
    })
  }
  render() {
    const doctor = this.props.doctor;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          {doctor.firstName}{doctor.lastName}
          <input
          type='checkbox'
          name='isClicked'
          onChange={this.handleChange}
          />
        </label>
        {
          this.state.isClicked ?
          <div>
          <div>
            <label>
              Time of your appointment
              <input
                className='input'
                placeholder='HH:MM'
                type='text'
                name='time'
                onChange={this.handleChange}
                value={this.state.time}
              />
            </label>
          </div>
          <button type="submit">
            Submit
          </button>
          </div> : null
        }
      </form>
    )
  }
}
export default DCDoctorForm;