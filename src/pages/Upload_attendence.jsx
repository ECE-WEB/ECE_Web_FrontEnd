import React, { useState } from "react";
import "../styles/Upload_attendence.css";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  const [midWat, setMidWat] = useState("MID");
  return (
    <div className="container">
        <h4 className="text"> <img src="src/Components/Images/ic_round-upload.png" alt="⬆" /> Upload Attendence</h4>
        <br /><br />
        <div className="form-box">

            <div className="row">
                <div className="col-6">
                    <label>Select Year</label></div>
                <div className="col-1">
                    :
                </div>
                <div className="col-5">
                    <div className="box">                    
                        <select>
                        <option>Select Year</option>
                        <option>1st Year</option>
                        <option>2nd Year</option>
                        <option>3rd Year</option>
                        <option>4th Year</option>
                    </select>
                    </div>
                </div>
            </div>
            <br />
            <div className="form-group">
                <div className="row">
                    <div className="col-6">
                        <label>Select SEM</label></div>
                        <div className="col-1">:</div>
                        <div className="col-5">
                            <div className="box">
                            <select> 
                                <option>Select Sem</option>
                                <option>Sem 1</option>
                                <option>Sem 2</option>
                            </select>
                            </div>
                        </div>
                    </div>
                    <br />

                </div>
            <div className="form-group">
            <div className="row">
                    <div className="col-6">
                        <label>Select mid</label></div>
                        <div className="col-1">:</div>
                        <div className="col-5">
                            <div className="box">
                            <select> 
                                <option>Select mid</option>
                                <option>Mid 1</option>
                                <option>Mid 2</option>
                                <option>Mid 3</option>
                            </select>
                            </div>
                        </div>
                    </div>
            </div>
    </div>


    <div className="buttons d-flex flex-column">
    <button className="file-btn">
        <img id="file-btn" src="src/Components/Images/mdi_file.png" alt="📁" /> Select file
    </button> 
    <button className="upload-btn">
        <img src="src/Components/Images/ic_round-upload.png" alt="⬆" /> Upload Attendence
    </button>
</div>

    </div>

  );
}
export default App;