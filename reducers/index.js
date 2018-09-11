import { ADD_DECK, ADD_QUESTION, RECEIVE_DECKS } from '../actions';

function entries(state = {}, action) {
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

export default entries;
