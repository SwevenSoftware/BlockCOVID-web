import accountsActions from "../../src/actions/accountsActions";
import accountApi from '../../src/Api/accountAPI'

describe('Account Action', () => {
    const accountInformation = {
        username: "user",
        password: "password",
        authorities: [
            "USER"
        ]
    }
    const dispatch = () => {

    }
    const getState = () => ({
        login: {
            token: {
                id: "tokenID"
            }
        }
    })

    it('should correctly handle account creation', function() {
        accountsActions.createAccount(accountInformation)(dispatch, getState);
        expect(getState).toBeCalled();
        expect(dispatch).toBeCalled();
    });
})