import moment, {setLanguage} from '../moment.util';

describe('Moment utility', () => {

  it('setLanguage: Should change the momemt local language', () => {
    setLanguage('th');
    expect(moment.locale()).toEqual('th');
  });

});