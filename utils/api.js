import { AsyncStorage } from 'react-native';
import uuidv4 from './uuidv4';

const DECKS_STORAGE_KEY = 'MobileFlashcards:decks';

export function fetchDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY);
}

export function addDeck(title) {
  return AsyncStorage.mergeItem(
    DECKS_STORAGE_KEY,
    JSON.stringify({
      [uuidv4()]: {
        title: title
      }
    })
  );
}

export function addCardToDeck(id, card) {
  return AsyncStorage.mergeItem(
    DECKS_STORAGE_KEY,
    JSON.stringify({
      [id]: {
        questions: [card]
      }
    })
  );
}
