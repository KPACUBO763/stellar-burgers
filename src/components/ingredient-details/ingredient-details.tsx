import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import {
  getIngredientsSelector,
  getIsLoadingIngredientsSelector
} from '@slices';

export const IngredientDetails: FC = () => {
  const ingredients = useSelector(getIngredientsSelector);
  const params = useParams();
  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === params.id!
  );
  const isLoading = useSelector(getIsLoadingIngredientsSelector);

  if (!ingredientData) {
    return <Preloader />;
  }

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <IngredientDetailsUI ingredientData={ingredientData} />
      )}
    </>
  );
};
