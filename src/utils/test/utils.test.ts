import { convertObjectToString, removeSameObjectFromArray } from '../utils';

describe('removeSameObjectFromArray', () => {
  it('removeTest', () => {
    const o = [
      {
        name: 'gildong',
        id: '1',
      },
      {
        name: 'gildong',
        id: '1',
      },
    ];
    expect(removeSameObjectFromArray(o)).toEqual([
      { name: 'gildong', id: '1' },
    ]);
  });
});

describe('convertTest', () => {
  it('convert', () => {
    expect(convertObjectToString({ id: 1 })).toBe('id,1');
  });
});
