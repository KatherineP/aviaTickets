class FavoriteTickets {
  constructor(){
    this.favoriteTickets = [];
  }
  createObjectOfFavoriteTickets(ticket, index) {
    ticket.indexValue = index;
    this.favoriteTickets.push(ticket);
  }
}
const favorite = new FavoriteTickets();

export default favorite;