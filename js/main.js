const search = document.getElementById('search');
const matchList = document.getElementById('match-list');
let cities;

(async function () {
  const res = await fetch('../data/cities.json');
  cities = await res.json();
})();

// Search cities.json & filter it
const searchCities = async function (searchText) {
  //using filter method (doesn't work with count as filter method doesn't allow returns)

  // Get matches to current text input
  // console.log(cities);
  /*
  let matches = cities.filter(
    function (city) {
      console.log(this.count);
      //if city name matches then store that in matches arr
      if (this.count < 10 && city.name.match(regex)) {
        this.count++;
        return true;
      }
      break;
    },
    { count: 0 }
  );
  */

  if (searchText.length === 0) {
    matchList.innerHTML = '';
    return;
  }

  let matches = [];
  let count = 0;
  const regex = new RegExp(`^${searchText}`, 'gi');
  for (let i = 0; i < cities.length; i++) {
    const curCity = cities[i];
    if (count < 10 && curCity.name.match(regex)) {
      count++;
      matches.push(curCity);
    } else if (count > 10) {
      break;
    }
  }

  outputHtml(matches);
};

// Show results in HTML
const outputHtml = function (matches) {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) => `
        <div class="card card-body mb-1">
          <h4>
            ${match.name} <span class="text-primary">${match.country}</span>
          </h4>
          <small>
            Lat: ${match.lat}
            Long: ${match.lng}
          </small>
        </div>
      `
      )
      .join('');

    matchList.innerHTML = html;
  }
};

search.addEventListener('input', () => searchCities(search.value));
