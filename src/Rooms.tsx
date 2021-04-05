import GeneralLayout from './GeneralLayout';
import SimpleTabs from './Tabs'

const RoomsForm = () => {
    return (
        <div>{SimpleTabs()}</div>
    )
}

const Room = () => {
    return (
      GeneralLayout(<RoomsForm />)
    );
}
  
export default Room