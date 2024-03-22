import React, { useState } from "react";
import "./Modal.css";

function Modal({ setOpenModal }) {
    
    const [step, setStep] = useState(1);
    const [receivedChrist, setReceivedChrist] = useState(false);
    const [baptizedByImmersion, setBaptizedByImmersion] = useState(false);
    const [baptismCertificate, setBaptismCertificate] = useState(null);
    const [knowsTalents, setKnowsTalents] = useState(null);
    const [talents, setTalents] = useState([{ id: 1, value: '' }]);
    const [fileTypeError, setFileTypeError] = useState('');

    function handleTalentChange(id, event) {
        const newTalents = talents.map(talent => {
          if (talent.id === id) {
            return { ...talent, value: event.target.value };
          }
          return talent;
        });
        setTalents(newTalents);
    }
      
    function addTalent() {
        const newTalent = { id: talents.length + 1, value: '' };
        setTalents([...talents, newTalent]);
    }
      
    function removeTalent(id) {
        setTalents(talents.filter(talent => talent.id !== id));
    }

  
    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        // Check if the file type is PDF or JPG
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg'];
        if (allowedTypes.includes(file.type)) {
            setBaptismCertificate(file);
            setStep(4); // Move to step 4
            setFileTypeError(''); // Clear any previous error messages
        } else {
            // Set an error message for unsupported file types
            setFileTypeError('Unsupported file type. Please upload a PDF or JPG file.');
        }
    }
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      
    };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div>
            <form onSubmit={handleSubmit}>
                {step === 1 && (
                    <div>
                        <p>1. Did you receive Jesus Christ to be your Lord and Savior?</p>
                        <label>
                            <input
                                type="radio"
                                name="receivedChrist"
                                value="yes"
                                onChange={() => {
                                    setReceivedChrist(true);
                                    setStep(step + 1);
                                }}
                            />
                        Yes
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="receivedChrist"
                                value="no"
                                onChange={() => {
                                    setReceivedChrist(false);
                                    setStep(step + 1);
                                }}
                            />
                        No
                        </label>
                    </div>
                )}

                {step === 2 && receivedChrist && (
                    <div>
                        <p>2. Did you get baptized by immersion?</p>
                        <label>
                            <input
                                type="radio"
                                name="baptizedByImmersion"
                                value="yes"
                                onChange={() => {
                                    setBaptizedByImmersion(true);
                                    // setStep(step + 1);
                                }}
                            />
                        Yes
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="baptizedByImmersion"
                                value="no"
                                onChange={() => {
                                    setBaptizedByImmersion(false);
                                    setStep(step + 1);
                                }}
                            />
                        No
                        </label>

                        { baptizedByImmersion && (
                            <div>
                                <p>Upload or take a photo of your Baptism Certificate, then send it. 
                                    If not available now, you have sixty days to provide it. If you lost it, 
                                    provide your (prior) pastor’s Testimonial Letter. </p>
                                <input
                                    type="file"
                                    accept=".pdf,.jpg"
                                    onChange={handleFileUpload}
                                />
                            </div>
                        )}
                    </div>
                )}

                {step === 3 && !baptizedByImmersion && (
                    <div>
                        <p>3. Are you willing today to be baptized?</p>
                        <label>
                            <input
                                type="radio"
                                name="willingToBeBaptized"
                                value="yes"
                                onChange={() => {
                                    setStep(step + 1);
                                }}
                            />
                            Yes
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="willingToBeBaptized"
                                value="no"
                                onChange={() => {
                                    setStep(step + 1);
                                }}
                            />
                            No
                        </label>
                    </div>
                )}

                                
                {step === 4 && baptismCertificate && (
                    <div>
                        <p>3. Do you know your talents and/or spiritual gifts?</p>
                        <label>
                            <input
                                type="radio" 
                                name="knowsTalents"
                                value="yes"
                                checked={knowsTalents === 'yes'}
                                onChange={() => {
                                    setKnowsTalents('yes');
                                    setTalents([{ id: 1, value: '' }]);


                                }}
                            />
                        Yes
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="knowsTalents"
                                value="no"
                                checked={knowsTalents === 'no'}
                                onChange={() => {
                                    setKnowsTalents('no');
                                    setTalents([]);

                                }}
                            />
                        No
                        </label>

                        { knowsTalents === 'yes'  && (
                            <div>
                                {talents.map((talent, index) => (
                                    <div key={talent.id}>
                                        <label>
                                        Talent {index + 1}:
                                            <textarea
                                                value={talent.value}
                                                onChange={(e) => handleTalentChange(talent.id, e)}
                                            />
                                        </label>
                                        <button onClick={() => removeTalent(talent.id)}>Remove</button>
                                    </div>
                                    ))}
                                    <button onClick={addTalent}>Add More Talents</button>
                                    <button type="submit">Next</button>
                            </div>                            
                        )}

                        { knowsTalents === 'no' && (
                            <div>
                                <div>
                                    <p>
                                        Don’t worry! We will help you discover your talents and/or spiritual gifts.                                        
                                    </p>
                                </div>
                                <button type="submit">Next</button>                       
                            </div>                            
                        )}
                    </div>
                )}
            </form>
        </div>

        <div className="footer">
          <button
            onClick={() => {setOpenModal(false);}} id="cancelBtn">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;