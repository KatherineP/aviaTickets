import currencyUI from './currency';

class FavoriteTicketUI {
  constructor(currency) {
    this.container = document.getElementById('dropdown1');
    this.getCurrencySymbol = currency.getCurrencySymbol.bind(currency);
  }

  
  renderFavTickets(tickets) {
    const currency = this.getCurrencySymbol();
    this.clearContainer();
    tickets.forEach(ticket => {
      const template = FavoriteTicketUI.favoriteTicketTemplate(ticket, currency);
      this.container.insertAdjacentHTML('afterbegin', template);
    });
  }

  clearContainer() {
    this.container.innerHTML = '';
  }

static favoriteTicketTemplate(ticket, currency){
  return `
  <div class="favorite-item  d-flex align-items-start" data-findex="${ticket.indexValue}">
                <img
                  src="http://pics.avs.io/200/200/${ticket.airline}.png"
                  class="favorite-item-airline-img"
                />
                <div class="favorite-item-info d-flex flex-column">
                  <div
                    class="favorite-item-destination d-flex align-items-center"
                  >
                    <div class="d-flex align-items-center mr-auto">
                      <span class="favorite-item-city">${ticket.origin_name}</span>
                      <i class="medium material-icons">flight_takeoff</i>
                    </div>
                    <div class="d-flex align-items-center">
                      <i class="medium material-icons">flight_land</i>
                      <span class="favorite-item-city">${ticket.destination_name}</span>
                    </div>
                  </div>
                  <div class="ticket-time-price d-flex align-items-center">
                    <span class="ticket-time-departure">${ticket.departure_at}</span>
                    <span class="ticket-price ml-auto">${currency}${ticket.price}</span>
                  </div>
                  <div class="ticket-additional-info">
                    <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
                    <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
                  </div>
                  <a
                    class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto delete-fav"
                    >Delete</a
                  >
                </div>
              </div>
  `;
}
}

const favTicketUI = new FavoriteTicketUI(currencyUI);

export default favTicketUI;