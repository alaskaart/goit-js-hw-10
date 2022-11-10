function countryListTemplate(data) {
  return data
    .map(({ flags, name }) => {
      return `<li class="list__item country-box">
         <img class="icon" width=120 src=${flags.svg} alt="dots icon"> <p class="country-name">${name}</p> </li>`;
    })
    .join(' ');
}

function renderCard(data) {
  return data.map(({ flags, capital, population, name, languages }) => {
    console.log(languages);
    return `<ul class="list">
      <li class="country-box">
      <img class="icon" width=120 src=${
        flags.svg
      } alt="dots icon"><p class="country-name">${name}</p>
      </li>
     
      <p class="country-item"><span class="part-item">Capital: </span>${capital}</p>
      <p class="country-item"><span class="part-item">Population: </span>${population}</p>
      <p class="country-item"><span class="part-item">Languages: </span>${languages
        .map(el => {
          return el.name;
        })
        .join(', ')}</p>
       </ul>`;
  });
}

export { renderCard, countryListTemplate };
