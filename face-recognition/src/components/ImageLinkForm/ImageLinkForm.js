import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div className="">
            <p className="f3">
                {'This Magic Brain will detect faces in your images. Give it a try!'}
            </p>
            <div className="center">
                <div class="pa4 br3 shadow-5 form center">
                    <input className="f4 pa2 w-70 center" type="text" name="file" onChange={onInputChange}/>
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}; 
export default ImageLinkForm;