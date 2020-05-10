import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../../components/PlaceList/PlaceList.js';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const userId = useParams().userId;
  console.log('userId', userId);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await sendRequest(`http://localhost:5000/api/places/user/${ userId }`);
        setLoadedPlaces(res.places);
      } catch (err) {/* err is handled in our custom http hook */}
    };

    fetchPlaces();
  }, [sendRequest, userId]);

  return (
    <React.Fragment>
      <ErrorModal
        error={ error }
        onClear={ clearError } />
      { isLoading && (
        <div className='center'>
          <LoadingSpinner asOverlay />
        </div>
      ) }
      { !isLoading && loadedPlaces && <PlaceList items={ loadedPlaces } /> }
    </React.Fragment>
  );
};

export default UserPlaces;
