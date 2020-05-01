import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../../shared/components/FormElements/Input/Input';
import Button from '../../../shared/components/FormElements/Button/Button';
import Card from '../../../shared/components/UIElements/Card/Card';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../../shared/util/validators';
import { useForm } from '../../../shared/hooks/form-hook';
import './UpdatePlace.css';

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl: 'https://cdn.pixabay.com/photo/2015/12/08/00/40/empire-state-building-1081929_1280.jpg',
    address: '20 W 34th St, New York, NY 10001, United States',
    coordinates: {
      lat: 40.7484405,
      lng: -73.9878531
    },
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Emp. State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl: 'https://cdn.pixabay.com/photo/2015/12/08/00/40/empire-state-building-1081929_1280.jpg',
    address: '20 W 34th St, New York, NY 10001, United States',
    coordinates: {
      lat: 40.7484405,
      lng: -73.9878531
    },
    creator: 'u2'
  },
];

const UpdatePlace = () => {
  const [isLoading, setIsLoading] = useState(true);
  const placeId = useParams().placeId;

  const [formState, inputHandler, setFormData] = useForm({
    title: {
      value: '',
      isValid: false
    },
    description: {
      value: '',
      isValid: false
    }
  }, false); // initially false

  const indentifiedPlace = DUMMY_PLACES.find(place => place.id === placeId);

  useEffect(() => {
    if (indentifiedPlace) {
      setFormData({
        title: {
          value: indentifiedPlace.title,
          isValid: true
        },
        description: {
          value: indentifiedPlace.description ,
          isValid: true
        }
      }, true);
    }
    setIsLoading(false);
  }, [setFormData, indentifiedPlace]);

  if (!indentifiedPlace) return (
    <div className='center'>
      <Card>
        <h2>Could not find place!</h2>
      </Card>
    </div>
  );

  const submitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs); // send data to the backend
  };

  if (isLoading) return (
    <div>
      <h2>Loading...</h2>
    </div>
  );

  return (
    <form
      className='place-form'
      onSubmit={ submitHandler }>
      <Input
        id='title'
        element='input'
        type='text'
        label='Title'
        validators={ [VALIDATOR_REQUIRE()] }
        errorText='Please enter a valid title.'
        onInput={ inputHandler }
        initialValue={ formState.inputs.title.value }
        initialValid={ formState.inputs.title.isValid } />
      <Input
        id='description'
        element='textarea'
        label='Description'
        validators={ [VALIDATOR_MINLENGTH(5)] }
        errorText='Please enter a valid description (at least 5 characters).'
        onInput={ inputHandler }
        initialValue={ formState.inputs.description.value }
        initialValid={ formState.inputs.description.isValid } />
      <Button
        type='submit'
        disabled={ !formState.isValid }>
          UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
