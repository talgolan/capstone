import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ReactModal from "react-modal";
import { fetchMedications } from "../redux/medications";
import AddMedication from "./AddMedication";
// import RemoveMedication from "./RemoveMedication";
import SingleMedication from "./SingleMedication";

class Medications extends React.Component {
  constructor() {
    super();
    this.state = { isSelected: false, selected: null, add: false };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }
  componentDidMount() {
    ReactModal.setAppElement("body");
    this.props.fetchMedications();
  }

  handleSelect(medication) {
    this.setState({ isSelected: true, selected: medication, add: false });
  }

  handleAdd() {
    this.setState({ isSelected: false, selected: null, add: true });
  }

  handleClose() {
    this.setState({ isSelected: false, selected: null, add: false });
  }

  handleRemove(id) {
    this.props.remove(id);
    this.handleClose();
  }

  render() {
    const { medications } = this.props;

    return (
      <div className="main">
        <div className="column">
          <h3>My Saved Medications</h3>
          <div className="scroll">
            {medications &&
              medications.map((medication) => {
                return (
                  <div className="listItem" key={medication.id}>
                    <>
                      <button
                        className="bigButton"
                        type="button"
                        onClick={() => this.handleSelect(medication)}
                      >
                        {medication.name}
                      </button>
                    </>
                  </div>
                );
              })}
          </div>
          <button type="button" onClick={() => this.handleAdd()}>
            Add a Medication
          </button>
          <ReactModal
            isOpen={this.state.add}
            contentLabel="Single Document"
            className="popup"
          >
            <button
              className="close"
              type="button"
              onClick={() => this.handleClose()}
            >
              X
            </button>
            <AddMedication close={this.handleClose} />
          </ReactModal>
          <ReactModal
            isOpen={this.state.isSelected}
            contentLabel="Single Document"
            className="popup"
          >
            <button
              className="close"
              type="button"
              onClick={() => this.handleClose()}
            >
              X
            </button>
            <SingleMedication
              selected={this.state.selected}
              // remove={remove}
              close={this.handleClose}
            />
          </ReactModal>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    medications: state.medications,
    currentUser: state.currentUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchMedications: () => dispatch(fetchMedications()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Medications);
