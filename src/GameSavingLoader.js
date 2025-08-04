import read from './reader.js';
import json from './parser.js';
import GameSaving from './GameSaving.js';

export default class GameSavingLoader {
  static async load() {
    try {
      const data = await read();
      const jsonData = await json(data);
      const parsedData = JSON.parse(jsonData);
      return new GameSaving(parsedData);
    } catch (error) {
      throw new Error(`Failed to load game saving: ${error}`);
    }
  }
}
