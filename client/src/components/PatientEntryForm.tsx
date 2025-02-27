import { useState, FormEvent, ChangeEvent } from "react";
import { addMedication } from "../api/medicationAPI"; //the function to add feedback from the API
import './dashbord.css'

// Define the FeedbackForm component
const PatientEntryForm = () => {
  // State to manage the feedback form data
  const [patientData, setPatientData] = useState({
    medicationName: '',
    dosage: '',
    startDate: '',
    symptoms: ''
  });

  // Handle changes in the input fields
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPatientData({
      ...patientData,
      [name]: value //?? I'M NOT SURE IF THIS IS RIGHT.
    });
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Send the USER MEDICATION data to the server
      await addMedication(patientData);
      // Reload the page to reflect the new USER MEDICATION
      // window.location.reload();
    } catch (err) {
      console.error('Failed to add medication input', err);  // Log any errors that occur
    }
  };

  return (
    <section className="feedback-form">
      <form
        className="flex-row justify-center justify-space-between-md align-center"
        id="feedback-form"
        onSubmit={handleSubmit}  // Attach the submit handler
      >
        <div className="col-12 col-lg-9">
          <p>Enter your medication's name</p>
          <input
            name="medicationName"
            id="medicationName"
            placeholder="name"
            value={patientData.medicationName}
            className="form-input w-100"
            onChange={handleChange}  // Attach the change handler
          />
        </div>
        <div className="col-12 col-lg-9">
          <p>What dosage are you taking?</p>
          <input
            name="dosage"
            id="dosage"
            placeholder="25mg"
            value={patientData.dosage}
            className="form-input w-100"
            onChange={handleChange}  // Attach the change handler
          />
        </div>
        <div className="col-12 col-lg-9">
          <p>When did you start taking this this medication?</p>
          <input
            name="startDate"
            id="startDate"
            placeholder="mm/dd/year"
            value={patientData.startDate}
            className="form-input w-100"
            onChange={handleChange}  // Attach the change handler
          />
        </div>
        <div className="col-12">
          <p>Please list the symptoms you're experiencing that this medication is supposed to address:</p>
          <textarea
            name="symptoms"
            placeholder="Enter symptoms' text here"
            value={patientData.symptoms}
            className="form-input w-100"
            onChange={handleChange}  // Attach the change handler
          ></textarea>
        </div>
        <div className="col-12 col-lg-3">
          {/* Submit button for the feedback form */}
          <button className="btn btn-primary btn-block py-3" type="submit">
            Search
          </button>
        </div>
      </form>

    </section>
  )
};

export default PatientEntryForm;
