import React from "react";
import { connect } from "react-redux";
import { getAppointmentThunk } from "../redux/dcDoctor";
import { getAllDoctorsThunk, addDoctorThunk } from "../redux/doctors";
import { getAllConditionsThunk, addConditionThunk } from "../redux/conditions";
import ReactModal from "react-modal";
import AddDoctor from "../components/AddDoctor";
import AddConditionForm from "../components/AddConditionForm";
import AddMedication from "../components/AddMedication";
import { fetchMedications } from "../redux/medications";
import { getChartThunk } from "../redux/score";

export class HomeAddButtons extends React.Component {
  constructor() {
    super();
    this.state = {
      showDoctorModal: false,
      showConditionModal: false,
      showMedicineModal: false,
    };
    this.openDoctorModal = this.openDoctorModal.bind(this);
    this.openConditionModal = this.openConditionModal.bind(this);
    this.openMedicineModal = this.openMedicineModal.bind(this);
    this.closeDoctorModal = this.closeDoctorModal.bind(this);
    this.closeConditionModal = this.closeConditionModal.bind(this);
    this.closeMedicineModal = this.closeMedicineModal.bind(this);
  }

  openDoctorModal() {
    this.setState({ showDoctorModal: true });
  }
  openConditionModal() {
    this.setState({ showConditionModal: true });
  }
  openMedicineModal() {
    this.setState({ showMedicineModal: true });
  }

  closeDoctorModal() {
    this.setState({ showDoctorModal: false });
  }
  closeConditionModal() {
    this.setState({ showConditionModal: false });
  }
  closeMedicineModal() {
    this.setState({ showMedicineModal: false });
  }

  componentDidMount() {
    ReactModal.setAppElement("body");
    this.props.getAllDoctors();
    this.props.getAppointments();
    this.props.getAllConditions();
    this.props.getMedications();
    this.props.getChart();
  }

  render() {
    return (
      <div id="addButtons">
        <div>
          <button onClick={this.openDoctorModal}>Add a Doctor</button>
          <ReactModal
            className="popup"
            isOpen={this.state.showDoctorModal}
            contentLabel="Example Modal"
          >
            <button
              className="close"
              type="button"
              onClick={() => this.closeDoctorModal()}
            >
              X
            </button>
            <AddDoctor
              close={this.closeDoctorModal}
              currentUser={this.props.currentUser}
              addNewDoctor={this.props.addNewDoctor}
            />
          </ReactModal>
        </div>

        <div>
          <button type="button" onClick={this.openMedicineModal}>
            Add a Medication
          </button>
          <ReactModal
            className="popup"
            isOpen={this.state.showMedicineModal}
            contentLabel="Single Document"
          >
            <button
              className="close"
              type="button"
              onClick={() => this.closeMedicineModal()}
            >
              X
            </button>
            <>
              <AddMedication close={this.closeMedicineModal} />
            </>
          </ReactModal>
        </div>

        <div>
          <button onClick={this.openConditionModal}>Add a Condition</button>
          <ReactModal
            className="popup"
            isOpen={this.state.showConditionModal}
            contentLabel="Single Document"
          >
            <button
              className="close"
              type="button"
              onClick={() => this.closeConditionModal()}
            >
              X
            </button>
            <AddConditionForm
              close={this.closeConditionModal}
              currentUser={this.props.currentUser}
              addCondition={this.props.addCondition}
            />
          </ReactModal>
        </div>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => ({
  getAllDoctors: () => dispatch(getAllDoctorsThunk()),
  getAppointments: () => dispatch(getAppointmentThunk()),
  getAllConditions: () => dispatch(getAllConditionsThunk()),
  addCondition: (condition) => dispatch(addConditionThunk(condition)),
  addNewDoctor: (newDoctor) => dispatch(addDoctorThunk(newDoctor)),
  getMedications: () => dispatch(fetchMedications()),
  getChart: () => dispatch(getChartThunk()),
});

export default connect(null, mapDispatch)(HomeAddButtons);
