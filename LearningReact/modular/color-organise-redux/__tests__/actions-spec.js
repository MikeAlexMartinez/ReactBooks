import storeFactory from '../src/store/index';
import { addColor } from '../src/actions';

describe('addColor', () => {

  let store;

  const colors = [
    {
      'id': '8658c1d0-9eda-4a90-95e1-8001e8eb6036',
      'title': 'Ocean Blue',
      'color': '#0070ff',
      'rating': 3,
      'timestamp': 'Sat Mar 12 2016 16:12:09 GMT-0800 (PST)'
    },
    {
      'id': 'f9005b4e-975e-433d-a646-79df172e1dbb',
      'title': 'Tomato',
      'color': '#d10012',
      'rating': 2,
      'timestamp': 'Fri Mar 11 2016 12:00:00 GMT-0800 (PST)'
    },
    {
      'id': '58d9caee-6ea6-4d7b-9984-65b145031979',
      'title': 'Lawn',
      'color': '#67bf4f',
      'rating': 1,
      'timestamp': 'Thu Mar 10 2016 01:11:12 GMT-0800 (PST)'
    }
  ];

  beforeAll(() => {
    store = storeFactory({colors});
    store.dispatch(addColor('Dark Blue', '#000033'));
  });

  it('should add a new color', () =>
    expect(store.getState().colors.length).toBe(4));
    
  it('should add a unique id', () =>
    expect(store.getState().colors[3].id.length).toBe(36));
        
  it('should set rating to 0', () =>
    expect(store.getState().colors[3].rating).toBe(0));
  
  it('should set timestamp', () =>
    expect(store.getState().colors[3].timestamp).toBeDefined());

});
