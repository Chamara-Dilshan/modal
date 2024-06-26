import React, { useState } from "react";
import "./Modal.css";

function Modal({ setOpenModal }) {
    
    const [step, setStep] = useState(1);
    const [receivedChrist, setReceivedChrist] = useState(false);
    const [baptizedByImmersion, setBaptizedByImmersion] = useState(false);
    const [baptismCertificate, setBaptismCertificate] = useState(null);
    const [knowsTalents, setKnowsTalents] = useState(null);
    const [talents, setTalents] = useState([{ id: 1, value: '' }]);
    const [willingToBeBaptized, setWillingToBeBaptized] = useState(null);
    const [lifeToJesusChrist, setLifeToJesusChrist] = useState(null);
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
            {/* <button
                onClick={() => {
                setOpenModal(false);
                }}
            >
                X
            </button> */}
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    {step === 1 && (
                        <div>
                            <p>Did you receive Jesus Christ to be your Lord and Savior?</p>
                            <div style={{display:"flex"}}>
                                <div style={{ marginRight: '60px' }}>
                                    <label>
                                        <input
                                            type="radio"
                                            name="receivedChrist"
                                            value="yes"
                                            onChange={() => {
                                                setReceivedChrist(true);
                                                setStep(step + 1);
                                            }}
                                            style={{marginRight: '5px' }}

                                        />
                                    Yes
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input
                                            type="radio"
                                            name="receivedChrist"
                                            value="no"
                                            onChange={() => {
                                                setReceivedChrist(false);
                                                setStep(step + 1);
                                            }}
                                            style={{marginRight: '5px' }}
                                        />
                                    No
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && !receivedChrist && (
                        <div>
                            <p>Are you willing today to give your life to Jesus Christ? </p>
                            <div style={{display:"flex"}}>
                                <div style={{ marginRight: '60px' }}>
                                    <label>
                                        <input
                                            type="radio"
                                            name="lifeToJesusChrist"
                                            value="yes"
                                            checked={lifeToJesusChrist === 'yes'}
                                            onChange={() => {
                                                setLifeToJesusChrist('yes');
                                            }}
                                            style={{marginRight: '5px' }}
                                        />
                                        Yes
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input
                                            type="radio"
                                            name="lifeToJesusChrist"
                                            value="no"
                                            checked={lifeToJesusChrist === 'no'}
                                            onChange={() => { 
                                                setLifeToJesusChrist('no');
                                            }}
                                            style={{marginRight: '5px' }}
                                        />
                                        No
                                    </label>
                                </div>
                            </div>

                            { lifeToJesusChrist === 'yes' && (
                                <div>
                                    <p>wonderful! Please fill out this form:   <a href="/baptism-form">I Give My Life To Jesus Christ </a>.</p>                                
                                </div>
                            )}

                            {lifeToJesusChrist === 'no'  && (
                                <div>
                                    <p>Thanks! We respect your answer. But we will keep you in our prayers.</p>                                
                                    <button 
                                        type="button"
                                        onClick={() => setStep(4)}
                                    >
                                        Next
                                    </button>
                                </div>
                                
                            )}
                        </div>
                    )}


                    {step === 2 && receivedChrist && (
                        <div>
                            <p>Did you get baptized by immersion?</p>
                            <div style={{display:"flex"}}>
                                <div style={{ marginRight: '60px' }}>
                                    <label>
                                        <input
                                            type="radio"
                                            name="baptizedByImmersion"
                                            value="yes"
                                            onChange={() => {
                                                setBaptizedByImmersion(true);
                                            }}
                                            style={{marginRight: '5px' }}
                                        />
                                    Yes
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input
                                            type="radio"
                                            name="baptizedByImmersion"
                                            value="no"
                                            onChange={() => {
                                                setBaptizedByImmersion(false);
                                                setStep(step + 1);
                                            }}
                                            style={{marginRight: '5px' }}
                                        />
                                    No
                                    </label>
                                </div>
                            </div>

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
                            <p>Are you willing today to be baptized?</p>
                            <div style={{display:"flex"}}>
                                <div style={{ marginRight: '60px' }}>
                                    <label>
                                        <input
                                            type="radio"
                                            name="willingToBeBaptized"
                                            value="yes"
                                            onChange={() => {
                                                setWillingToBeBaptized(true);
                                            }}
                                            style={{marginRight: '5px' }}
                                        />
                                        Yes
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input
                                            type="radio"
                                            name="willingToBeBaptized"
                                            value="no"
                                            onChange={() => {
                                                setStep(step + 1);
                                            }}
                                            style={{marginRight: '5px' }}
                                        />
                                        No
                                    </label>
                                </div>
                            </div>

                            { willingToBeBaptized && (
                                <div>
                                    <p>Wonderful! Please fill out the form:  <a href="/baptism-form">I Want To Be Baptized</a>.</p>                                
                                </div>
                            )}
                        </div>
                    )}


                    {/* {(step === 4 && baptismCertificate)||step === 4 && (*/}
                    {step === 4 && (
                        <div>
                            <p>Do you know your talents and/or spiritual gifts?</p>
                            <div style={{display:"flex"}}>
                                <div style={{ marginRight: '40px' }}>
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
                                            style={{marginRight: '5px' }}
                                        />
                                    Yes
                                    </label>
                                </div>
                                <div>
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
                                            style={{marginRight: '5px' }}
                                        />
                                    No
                                    </label>
                                </div>
                            </div>

                            { knowsTalents === 'yes'  && (
                                <div>
                                    <div>
                                        <p>
                                            please list all your Talents or Gifts.                                         
                                        </p>
                                    </div>
                                    {talents.map((talent, index) => (
                                        <div key={talent.id} style={{display:"flex"}}>
                                            <div>
                                                <label>
                                                    {index + 1}.
                                                </label>
                                                {/* <textarea
                                                    value={talent.value}
                                                    onChange={(e) => handleTalentChange(talent.id, e)}
                                                />  */}
                                                <input 
                                                    type='text' 
                                                    placeholder='       Enter Your talent' 
                                                    value={talent.value}
                                                    onChange={(e) => handleTalentChange(talent.id, e)}
                                                    style={{
                                                        borderRadius: '20px',   
                                                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                                                        backgroundColor: '#F5F5F5',    
                                                        height: '25px',
                                                        border: 'none', 
                                                        marginLeft: '10px',
                                                        marginBottom: '10px'
                                                                                                           
                                                    }} 
                                                />                                             
                                            </div>
                                            <div style={{display:"flex"}}>
                                                <div style={{ marginRight: '10px', marginLeft:'50px' }}>
                                                    <button onClick={addTalent}>+</button>
                                                </div>
                                                <div >
                                                    <button onClick={() => removeTalent(talent.id)}>-</button>
                                                </div>
                                            </div>                                            
                                        </div>
                                    ))}
                                    <br></br>
                                    <div>
                                        <button type="submit">Next</button>
                                    </div>                                        
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