import React, { useRef } from 'react';

import Button from '../Button/Button';
import './ImageUpload.css';

const ImageUpload = props => {
  const filePickerRef = useRef();

  const pickedHandler = event => {
    console.log(event.target);
  };

  const pickImagehandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className='form-control'>
      <input
        type='file'
        id={ props.id }
        ref={ filePickerRef }
        style={ { display: 'none' } }
        accept='.jpg,.png,.jpeg'
        onChange={ pickedHandler } />

      <div className={ `image-upload ${ props.center && 'center' }` }>
        <div className='image-upload__preview'>
          <img
            src=''
            alt='Preview' />
        </div>
        <Button
          type='button'
          onClick={ pickImagehandler }>Upload Image</Button>
      </div>
    </div>
  );
};

export default ImageUpload;
