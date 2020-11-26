import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import { user } from '../../src/reducers/user';
import { resetUserInfo } from '../../src/actions/index';

const initialState = {
    _id: '',
    birthYear: '',
    email: '',
    favoritePartners: [],
    gender: '',
    nickname: '',
    occupation: '',
    preferredPartner: {
        _id: '',
        birthYear: '',
        gender: '',
        occupation: ''
    },
    promise: 0
};
describe('user', () => {
    it('should provide initial state', () => {
        expect(user(initialState, resetUserInfo)).toEqual(initialState);
    });
});
