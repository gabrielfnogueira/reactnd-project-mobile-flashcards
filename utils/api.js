import { AsyncStorage } from 'react-native';

const DECKS_STORAGE_KEY = 'MobileFlashcards:decks';

export function fetchDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(result => JSON.parse(result));
}

export function addDeck(newDeck) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(newDeck));
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
