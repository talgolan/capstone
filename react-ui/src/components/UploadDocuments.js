import React, { Component } from "react";
import { uploadDocumentThunk } from '../redux/documents'
import { connect } from 'react-redux'
import axios from 'axios'
import UploadForm from "./UploadForm";


export class UploadDocuments extends Component {
  constructor() {
    super()
    this.state = {
      selectedFile: null,
      targetFile: {},
      description: '',
      type: '',
      doctorId: '',
      conditionId: ''
    }
    this.uploadHandler = this.uploadHandler.bind(this)
    this.handleFileRead = this.handleFileRead.bind(this)
    this.sendFile = this.sendFile.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleFileRead(e) {
    if (e.target.files[0]) {
      const targetFile = Array.from(e.target.files)
      let reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.onload = () => {
        this.setState({
          selectedFile: reader.result,
          targetFile: targetFile[0]
        })
      }
    }

  }

  async sendFile() {
    const file = await axios.post(
      `https://api.cloudinary.com/v1_1/elementhealth/image/upload`,
      { file: this.state.selectedFile, upload_preset: 'capstone' }
    )
    return file.data.secure_url
  }

  async uploadHandler(e) {
    e.preventDefault()
    const { targetFile, selectedFile } = this.state
    // console.log(targetFile)
    const fileTypes = ['image/png', 'image/jpeg', 'image/gif']
    if (fileTypes.every(fileType => targetFile.type !== fileType)) {
      alert(`'${targetFile.type}' is not a supported format`)
    } else if (targetFile.size > 150000) {
      alert(`'${targetFile.name}' is too large, please pick a smaller file`)
    } else {
      const description = e.target.description.value
      const type = e.target.type.value
      const doctorId = e.target.doctorId.value
      const conditionId = e.target.conditionId.value

      let formData = {}
      if (selectedFile) {
        const imageUrl = await this.sendFile()
        formData = {
          description,
          type,
          doctorId,
          conditionId,
          imageUrl
        }
      } else {
        formData = {
          description,
          type,
          doctorId,
          conditionId
        }
      }
      this.props.uploadDocumentThunk(formData)
      this.props.closeUploadModal()
    }
  }

  render() {
    return (
      <UploadForm {...this.state} uploadHandler={this.uploadHandler} handleFileRead={this.handleFileRead} handleChange={this.handleChange} />
    );
  };
}

const mapDispatch = { uploadDocumentThunk }

export default connect(null, mapDispatch)(UploadDocuments);

