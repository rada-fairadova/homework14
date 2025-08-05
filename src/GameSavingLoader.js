import read from './reader.js';
import json from './parser.js';
import GameSaving from './GameSaving.js';

export default class GameSavingLoader {
  static load() {
    return read()
      .then((data) => json(data))
      .then((jsonData) => {
        const parsedData = JSON.parse(jsonData);
        return new GameSaving(parsedData);
      })
      .catch((error) => {
        throw new Error(`Failed to load game saving: ${error}`);
      });
  }
}
