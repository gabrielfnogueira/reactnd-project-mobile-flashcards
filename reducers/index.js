import { ADD_DECK, ADD_QUESTION, RECEIVE_DECKS, DELETE_DECK } from '../actions';

function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      };
    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      };
    case DELETE_DECK:
      const aux = { ...state };
      aux[action.deckId] = undefined;
      delete aux[action.deckId];

      return aux;
    case ADD_QUESTION:
      return {
        ...state,
        [action.deckId]: {
          ...state[action.deckId],
          questions: [...state[action.deckId].questions, ...action.question]
        }
      };
    default:
      return state;
  }
}

export default decks;
