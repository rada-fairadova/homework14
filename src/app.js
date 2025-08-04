import GameSavingLoader from './GameSavingLoader.js';

GameSavingLoader.load()
  .then(() => {
  })
  .catch((error) => {
    throw error;
  });
