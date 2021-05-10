/* other files */
import GeneralLayout from './GeneralLayout';
import SimpleTabs from './Tabs'

const RoomsForm = () => {
    return (
        <div className="paddingAppBar">{SimpleTabs()}</div>
    )
}

const Room = () => {
    return (
        GeneralLayout(<RoomsForm />)
    );
}

export default Room