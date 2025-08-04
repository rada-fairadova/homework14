import GameSavingLoader from '../GameSavingLoader.js';
import GameSaving from '../GameSaving.js';

jest.mock('../reader.js', () => ({
  __esModule: true,
  default: jest.fn()
    .mockResolvedValueOnce(new ArrayBuffer(10))
    .mockResolvedValueOnce(new ArrayBuffer(10))
    .mockRejectedValueOnce(new Error('Read error')),
}));

jest.mock('../parser.js', () => ({
  __esModule: true,
  default: jest.fn()
    .mockResolvedValueOnce('{"id":9,"created":1546300800,"userInfo":{"id":1,"name":"Hitman","level":10,"points":2000}}')
    .mockResolvedValueOnce('{"id":9,"created":1546300800,"userInfo":{"id":1,"name":"Hitman","level":10,"points":2000}}'),
}));

describe('GameSavingLoader', () => {
  test('should load game saving correctly', async () => {
    const saving = await GameSavingLoader.load();
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
  });

  test('should return GameSaving instance', async () => {
    const saving = await GameSavingLoader.load();
    expect(saving).toBeInstanceOf(GameSaving);
  });

  test('should handle errors', async () => {
    await expect(GameSavingLoader.load()).rejects.toThrow('Failed to load game saving');
  });
});
