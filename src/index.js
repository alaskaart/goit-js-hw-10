import './css/styles.css';

import debounce from 'lodash.debounce';

import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

import { fetchCountries } from './js/fetchCountries';
import { renderCard, countryListTemplate } from './js/renderCard';

const DEBOUNCE_DELAY = 300;

const refs = {
  countryListEl: document.querySelector('.country-list'),
  countryInfoEl: document.querySelector('.country-info'),
  searchEl: document.querySelector('#search-box'),
};

refs.searchEl.addEventListener(
  'input',
  debounce(onInputSearch, DEBOUNCE_DELAY)
);

function onInputSearch(event) {
  const searchQuery = event.target.value.trim().toLowerCase();
  if (!searchQuery) {
    refs.countryInfoEl.innerHTML = '';
    refs.countryListEl.innerHTML = '';
    return;
  }

  clearInput();

  fetchCountries(searchQuery)
    .then(countryName => {
      if (countryName.length > 10) {
        return Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      if (countryName.length === 1) {
        refs.countryInfoEl.innerHTML = renderCard(countryName);
        return;
      }
      if (countryName.length >= 1 && countryName.length <= 10) {
        refs.countryListEl.innerHTML = countryListTemplate(countryName);
        return;
      }
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function clearInput() {
  refs.countryInfoEl.innerHTML = '';
  refs.countryListEl.innerHTML = '';
}
