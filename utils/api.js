import { AsyncStorage } from 'react-native';

const DECKS_STORAGE_KEY = 'MobileFlashcards:decks';

export function fetchDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(result =>
    JSON.parse(result)
  );
}

export function addDeck(newDeck) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(newDeck));
}

export function deleteDeck(deckId) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(result => {
    const json = JSON.parse(result);
    json[deckId] = undefined;
    delete json[deckId];

    return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(json));
  });
}

export function addCardToDeck(deckId, question) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(result => {
    const json = JSON.parse(result);

    json[deckId].questions = [...(json[deckId].questions || []), question];

    return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(json));
  });
}
