import GameSavingLoader from '../GameSavingLoader.js';

jest.mock('../reader.js', () => ({
  __esModule: true,
  default: jest.fn()
    .mockImplementationOnce(() => Promise.resolve(new ArrayBuffer(10)))
    .mockImplementationOnce(() => Promise.resolve(new ArrayBuffer(10)))
    .mockRejectedValueOnce(new Error('Read error')),
}));

jest.mock('../parser.js', () => ({
  __esModule: true,
  default: jest.fn()
    .mockImplementationOnce(() => Promise.resolve('{"id":9,"created":1546300800,"userInfo":{"id":1,"name":"Hitman","level":10,"points":2000}}')),
}));

describe('GameSavingLoader (Promise version)', () => {
  test('should load game saving via then/catch', () => GameSavingLoader.load()
    .then((saving) => {
      expect(saving).toEqual({
        id: 9,
        created: 1546300800,
        userInfo: {
          id: 1,
          name: 'Hitman',
          level: 10,
          points: 2000,
        },
      });
    }));

  test('should handle errors via catch', () => GameSavingLoader.load()
    .catch((error) => {
      expect(error.message).toContain('Failed to load game saving');
    }));
});
