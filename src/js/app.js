import '../css/style.css';
import './plugins';
import locations from './store/locations';
import formUI from './views/form';
import ticketsUI from './views/tickets';
import favTicketUI from './views/favoriteTickets';
import currencyUI from './views/currency';
import favorite from './store/favoriteTickets';
import { getDropdownTrigger } from './plugins/materialize';
import { el } from 'date-fns/locale';

document.addEventListener('DOMContentLoaded', e => {
  const form = formUI.form;
  const container = document.querySelector('.tickets-sections .row');
  const favoriteTicketsBtn = document.querySelector('.dropdown-trigger');

  if(favorite.favoriteTickets.length === 0) {
    favoriteTicketsBtn.classList.add('disabled');
  }

  // Events
  initApp();
  form.addEventListener('submit', e => {
    e.preventDefault();
    onFormSubmit();
  });

  container.addEventListener('click', e => {
    const fav = e.target.closest('.add-favorite');
    if (!fav){
    return;
    } 
    else {
      onFavoriteClick(e, fav);
    }
  }, true);

  document.querySelector('.favorites').addEventListener('click', e => {
    const fav = e.target.closest('.delete-fav');
    if (!fav){
    return;
    } 
    else {
      console.log('click');
      onDeleteFavoriteBtn(e);
    }
  });

  // handlers
  async function initApp() {
    await locations.init();
    formUI.setAutocompleteData(locations.shortCities);
  }

  async function onFormSubmit() {
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currencyValue;

    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });

    ticketsUI.renderTickets(locations.lastSearch);
    console.log(locations.lastSearch);
  }

  function onFavoriteClick(e, elem) {
    elem.classList.add('disabled');
    const index = (e.target.closest('.card')).dataset.index;
    const ticket = locations.lastSearch[index];
      favorite.createObjectOfFavoriteTickets(ticket, index)
      console.log(favorite.favoriteTickets);
      M.toast({html: 'Ticket was added to favorite!', classes: 'green lighten-1'})
      favoriteTicketsBtn.classList.remove('disabled');
      favTicketUI.renderFavTickets(favorite.favoriteTickets);
  }

  function onDeleteFavoriteBtn (e) {
    const favTicket = e.target.closest('.favorite-item');
    const index = (favTicket).dataset.findex;
    console.log(index);
    favTicket.remove();
    if (!document.querySelector('.favorite-item')) {
      favoriteTicketsBtn.classList.add('disabled');
    }

    const filteredTickets = favorite.favoriteTickets.filter((item) => item.indexValue !== index);
    favorite.favoriteTickets = filteredTickets;

    const trigger = document.querySelector('.dropdown-trigger');
    const triggerInstance = getDropdownTrigger(trigger);
    triggerInstance.recalculateDimensions();

      for(let i = 0; i < container.children.length; i++) {
      const elIndex = container.children[i].firstElementChild.dataset.index;
        if (elIndex === index) {
          container.children[i].firstElementChild.lastElementChild.classList.remove('disabled');
        }
    }
  }
});
