import React from "react";
import { connect } from "react-redux";
import { getAllDoctorsThunk, addDoctorThunk } from "../redux/doctors";
import { fetchSingleDoctor } from "../redux/singleDoctor";
import { AddDoctor } from "./AddDoctor";
import ReactModal from "react-modal";
import SingleDoctor from "./SingleDoctor";
import { getAppointmentThunk } from "../redux/dcDoctor";
import AppointmentCalendar from "./AppointmentCalendar";
import DoctorDonut from "./datavis/doctor-appointment-donut";

// const customStyles = {
//     content: {
//         top: '50%',
//         left: '50%',
//         right: 'auto',
//         bottom: 'auto',
//         marginRight: '-50%',
//         transform: 'translate(-50%, -50%)'
//     }
// };

export class AllDoctors extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      showDocModal: false,
    };
    this.openModal = this.openModal.bind(this);
    this.openDocModal = this.openDocModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeDocModal = this.closeDocModal.bind(this);
  }
  componentDidMount() {
    ReactModal.setAppElement("body");
    this.props.getAllDoctors();
    this.props.getAppointments();
  }

  openModal() {
    this.setState({ showModal: true });
  }

  openDocModal(id) {
    this.setState({ showDocModal: true });
    this.props.fetchSingleDoctor(id);
    this.props.getAppointments();
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  closeDocModal() {
    this.setState({ showDocModal: false });
  }

  render() {
    const doctors = this.props.doctors;
    const appointments = this.props.appointment;
    return (
      <div >
        <div className="docBox">
          <div id='doctors' className="column">
            <h3>My Doctors</h3>
            <div className="scroll">
              {doctors &&
                doctors.map((doctor) => {
                  return (
                    <div className="listItem" key={doctor.id}>
                      <button
                        className="bigButton"
                        onClick={() => this.openDocModal(doctor.id)}
                      >
                        {doctor.firstName} {doctor.lastName}
                      </button>

                      <ReactModal
                        isOpen={this.state.showDocModal}
                        contentLabel="Single Document"
                        className="popup"
                        ariaHideApp={false}
                      >
                        <button className="close" onClick={this.closeDocModal}>
                          X
                      </button>
                        <SingleDoctor closeTheModal={this.closeDocModal} />
                      </ReactModal>
                    </div>
                  );
                })}
            </div>
            <button onClick={this.openModal}>Add a Doctor</button>
          </div>

          <div id="modal" className="column">
            <ReactModal
              isOpen={this.state.showModal}
              contentLabel="Single Document"
              className="popup"
              ariaHideApp={false}
            >
              <button className="close" onClick={this.closeModal}>
                X
            </button>
              <AddDoctor
                close={this.closeModal}
                currentUser={this.props.currentUser}
                addNewDoctor={this.props.addNewDoctor}
              />
            </ReactModal>
          </div>

          <div id='calendar' className='column'>
            <div>
              {doctors && doctors.length > 0 ? (
                <div>
                  <h3>Add an appointment </h3>
                  <AppointmentCalendar />
                </div>
              ) : null}
            </div>
            <div className="donut">
              {doctors &&
                doctors.length > 0 &&
                appointments &&
                appointments.length > 0 ? (
                  <DoctorDonut appointment={appointments} doctors={doctors} />
                ) : null}
            </div>
          </div>
        </div>

      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    doctor: state.doctor,
    doctors: state.doctors,
    currentUser: state.currentUser,
    appointment: state.appointment,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctors: () => dispatch(getAllDoctorsThunk()),
    addNewDoctor: (newDoctor) => dispatch(addDoctorThunk(newDoctor)),
    fetchSingleDoctor: (id) => dispatch(fetchSingleDoctor(id)),
    getAppointments: () => dispatch(getAppointmentThunk()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AllDoctors);
