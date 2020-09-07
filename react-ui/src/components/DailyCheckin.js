import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getScoreThunk, addScoreThunk } from "../redux/dcCondition";
import { getAppointmentThunk, addAppointmentThunk } from "../redux/dcDoctor";
import { getMedicationThunk, addMedicationThunk } from "../redux/dcMedication";
import DCMedicationForm from "./DCMedicationForm";
import DCConditionForm from "./DCConditionForm";
import DCDoctorForm from "./DCDoctorForm";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";
import { getTodayScoreThunk } from "../redux/dcTodayScore";
import { getTodayAppointmentThunk } from "../redux/dcTodayAppointment";
import { getTodayMedsThunk } from "../redux/dcTodayMed";
import { getAllDoctorsThunk } from "../redux/doctors";
// import Form, { Page } from "react-form-carousel";
import DCSummary from "./DCSummary";
import Carousel from "react-elastic-carousel";

class DailyCheckin extends Component {
  constructor() {
    super();
    this.state = {
      showDocModal: false,
      showMedModal: false,
      showCondModal: false,
    };
    this.openDocModal = this.openDocModal.bind(this);
    this.openMedModal = this.openMedModal.bind(this);
    this.openCondModal = this.openCondModal.bind(this);
    this.closeDocModal = this.closeDocModal.bind(this);
    this.closeMedModal = this.closeMedModal.bind(this);
    this.closeCondModal = this.closeCondModal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getScore();
    this.props.getAppointment();
    this.props.getMedication();
    this.props.getTodayScore();
    this.props.getTodayMeds();
    this.props.getTodayAppointment();
    this.props.getAllDoctors();
    ReactModal.setAppElement("body");
  }
  openCondModal() {
    this.setState({ showCondModal: true });
    this.props.getScore();
  }
  openDocModal() {
    this.setState({ showDocModal: true });
    this.props.getAppointment();
  }
  openMedModal() {
    this.setState({ showMedModal: true });
    this.props.getMedication();
  }
  closeDocModal() {
    this.setState({ showDocModal: false });
  }
  closeCondModal() {
    this.setState({ showCondModal: false });
  }
  closeMedModal() {
    this.setState({ showMedModal: false });
  }
  onSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };
  render() {
    const doctors = this.props.doctors;
    const score = this.props.score;
    const med = this.props.med;
    const appointment = this.props.appointment;
    const date = String(new Date()).slice(0, 15);
    const todayScore = this.props.todayScore;
    const todayAppointment = this.props.todayAppointment;
    const todayMed = this.props.todayMed;

    console.log("score", score);
    return (
      // <div>
      //   <h1>Daily Check-in</h1>
      //   <h3>{date}</h3>
      <div className="main">
        <Carousel itemsToShow={1} className="carousel">
          <div>
            <div>
              <h2>Conditions</h2>

              <div>
                {score.length > 0
                  ? "What conditions are you dealing with today today?"
                  : null}
              </div>
              {score && score.length > 0
                ? score.map((condition) => {
                    return (
                      <div key={condition.id}>
                        <DCConditionForm
                          condition={condition}
                          addScore={this.props.addScore}
                        />
                      </div>
                    );
                  })
                : "You don't have any conditions"}
              <div>
                {score && score.length === 0 ? (
                  <Link to="/conditions">Add Condition</Link>
                ) : null}
              </div>
            </div>
          </div>

          <div>
            <div>
              <div>
                <h2>Appointments</h2>
                {doctors.length > 0
                  ? "Do you have an appointment with a doctor today?"
                  : null}
              </div>
              {doctors && doctors.length > 0
                ? doctors.map((doc) => {
                    return (
                      <div key={doc.id}>
                        <DCDoctorForm
                          doc={doc}
                          addAppointment={this.props.addAppointment}
                        />
                      </div>
                    );
                  })
                : "You don't have any appointment"}
            </div>
            <div>
              {appointment && appointment.length === 0 ? (
                <Link to="/doctors">Add Doctor</Link>
              ) : null}
            </div>
          </div>

          <div>
            <h2>Medications</h2>
            <div>
              {med.length > 0 ? "What medications are you taking today?" : null}

              {med && med.length > 0
                ? med.map((eachMed) => {
                    return (
                      <div key={eachMed.id}>
                        <DCMedicationForm
                          eachMed={eachMed}
                          addMedication={this.props.addMedication}
                        />
                      </div>
                    );
                  })
                : "You don't have any medications"}
            </div>
            <div>
              {med && med.length === 0 ? (
                <Link to="/medications">Add Medication</Link>
              ) : null}
            </div>
          </div>

          <div>
            <h4>Thanks for submitting your daily checkin for {date}!</h4>
            {todayScore.length > 0 ||
            todayAppointment.length > 0 ||
            todayMed > 0 ? (
              <DCSummary />
            ) : null}
          </div>
        </Carousel>
      </div>
    );

    {
      /* <div>
          <div>
            Some text
              <button
              className="bigButton"
              type="button"
              onClick={() => this.openCondModal()}
            >
              Conditions
              </button>
          </div>
          <ReactModal
            isOpen={this.state.showCondModal}
            contentLabel="Single Document"
          >
            <div>
              <div>
                {
                  score.length > 0 ? 'What conditions are you dealing with today today?' : null
                }
              </div>
              {(score && score.length > 0) ?
                score.map((condition) => {
                  return (
                    <div key={condition.id}>
                      <DCConditionForm
                        condition={condition}
                        addScore={this.props.addScore}
                      />
                    </div>
                  );
                }) : "You don't have any conditions"}
              <div>
                {
                  (score && score.length === 0) ? <Link to="/conditions">Add Condition</Link> : null
                }
              </div>
            </div>
            <button onClick={this.closeCondModal}>Done</button>
          </ReactModal>
        </div> */
    }
    {
      /* <div>

            <div>
              Some text
                <button
                className="bigButton"
                type="button"
                onClick={() => this.openDocModal()}
              >
                Doctors
                </button>
            </div>

          <ReactModal
            isOpen={this.state.showDocModal}
            contentLabel="Single Document"
          >
            <div>
              <div>
                {
                  doctors.length > 0 ? 'Do you have an appointment with a doctor today?' : null
                }
              </div>
              {
                (doctors && doctors.length > 0) ?
                  doctors.map((doc) => {

                    return (
                      <div key={doc.id}>
                        <DCDoctorForm
                          doc={doc}
                          addAppointment={this.props.addAppointment}
                        />
                      </div>
                    );
                  }) : "You don't have any appointment"
              }
            </div>
            <div>
              {
                (appointment && appointment.length === 0) ? <Link to="/doctors">Add Doctor</Link> : null
              }
            </div>
            <button onClick={this.closeDocModal}>Done</button>
          </ReactModal>
        </div> */
    }
    {
      /* <div>
          <div>
            Some text
            <button
              className="bigButton"
              type="button"
              onClick={() => this.openMedModal()}
            >
              Medications
            </button>
          </div>
          <ReactModal
            isOpen={this.state.showMedModal}
            contentLabel="Single Document"
          >
            <div>
              <div>
                {med.length > 0
                  ? "What medications are you taking today?"
                  : null}
              </div>
              {med && med.length > 0
                ? med.map((eachMed) => {
                    return (
                      <div key={eachMed.id}>
                        <DCMedicationForm
                          eachMed={eachMed}
                          addMedication={this.props.addMedication}
                        />
                      </div>
                    );
                  })
                : "You don't have any medications"}
            </div>
            <div>
              {med && med.length === 0 ? (
                <Link to="/medications">Add Medication</Link>
              ) : null}
            </div>
            <button onClick={this.closeMedModal}>Done</button>
          </ReactModal>
        </div>
        <div>
          {todayScore.length > 0 ||
          todayAppointment.length > 0 ||
          todayMed > 0 ? (
            <DCSummary />
          ) : null}
        </div> */
    }
    // </div>
  }
}
const mapStateToProps = (state) => {
  return {
    score: state.score,
    appointment: state.appointment,
    med: state.med,
    todayScore: state.todayScore,
    todayAppointment: state.todayAppointment,
    todayMed: state.todayMed,
    doctors: state.doctors,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctors: () => dispatch(getAllDoctorsThunk()),
    getScore: () => dispatch(getScoreThunk()),
    addScore: (score) => dispatch(addScoreThunk(score)),
    getAppointment: () => dispatch(getAppointmentThunk()),
    addAppointment: (appointment) => dispatch(addAppointmentThunk(appointment)),
    getMedication: () => dispatch(getMedicationThunk()),
    addMedication: (med) => dispatch(addMedicationThunk(med)),
    getTodayScore: () => dispatch(getTodayScoreThunk()),
    getTodayAppointment: () => dispatch(getTodayAppointmentThunk()),
    getTodayMeds: () => dispatch(getTodayMedsThunk()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DailyCheckin);
