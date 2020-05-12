import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../../shared/components/FormElements/Input/Input';
import Button from '../../../shared/components/FormElements/Button/Button';
import Card from '../../../shared/components/UIElements/Card/Card';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../../shared/util/validators';
import { useForm } from '../../../shared/hooks/form-hook';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { AuthContext } from '../../../shared/context/auth-context';
import './UpdatePlace.css';

const UpdatePlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlace, setLoadedPlace] = useState();
  const placeId = useParams().placeId;
  const history = useHistory();

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

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const res = await sendRequest(`http://localhost:5000/api/places/${ placeId }`);
        setLoadedPlace(res.place);
        setFormData({
          title: {
            value: res.place.title,
            isValid: false
          },
          description: {
            value: res.place.description,
            isValid: false
          }
        }, true);
      } catch (err) {/* err is handled in our custom http hook */}
    };

    fetchPlace();
  }, [sendRequest, placeId, setFormData]);

  const submitHandler = async event => {
    event.preventDefault();

    try {
      await sendRequest(
        `http://localhost:5000/api/places/${ placeId }`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token
        }
      );
      // history.push('/' + auth.userId + '/places');
      history.push(`/${ auth.userId }/places`);
    } catch (err) {/* err is handled in our custom http hook */}


  };

  if (isLoading) return (
    <div>
      <LoadingSpinner asOverlay />
    </div>
  );

  if (!loadedPlace && !error) return (
    <div className='center'>
      <Card>
        <h2>Could not find place!</h2>
      </Card>
    </div>
  );

  return (
    <React.Fragment>
      <ErrorModal
        error={ error }
        onClear={ clearError } />
      { !isLoading && loadedPlace && (
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
            initialValue={ loadedPlace.title }
            initialValid={ true } />
          <Input
            id='description'
            element='textarea'
            label='Description'
            validators={ [VALIDATOR_MINLENGTH(5)] }
            errorText='Please enter a valid description (at least 5 characters).'
            onInput={ inputHandler }
            initialValue={ loadedPlace.description }
            initialValid={ true } />
          <Button
            type='submit'
            disabled={ !formState.isValid }>
            UPDATE PLACE
          </Button>
        </form>
      ) }
    </React.Fragment>
  );
};

export default UpdatePlace;
