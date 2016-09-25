import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import MockDate from 'mockdate';
import chai, { expect } from 'chai';


chai.use(sinonChai);

describe('Actions', () => {
  const appState = {
    newMpg: 20,
    tradeMpg: 10,
    newPpg: 1.50,
    tradePpg: 1.50,
    milesDriven: 100,
    milesDrivenTimeframe: 'week',
    displayResults: false,
    dateModified: null,
    necessaryDataIsProvidedToCalculateSavings: false,
    savings: {
      monthly: 0,
      annual: 0,
      threeYear: 0
    }
  };

  it('should create an action to save fuel savings', () => {
    expect(1).to.be(1);
  });
});
