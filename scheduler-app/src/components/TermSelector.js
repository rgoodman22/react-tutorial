import { Button } from 'rbx';
import { buttonColor } from '../tools';

const terms = { F: 'Fall', W: 'Winter', S: 'Spring'};

const TermSelector = ({ state }) => {
    return (
      <Button.Group hasAddons>
        { Object.values(terms)
            .map(value => <Button key={value}
                                  color={ buttonColor (value===state.term)}
                                  onClick={ () => state.setTerm(value)}
                                  >{ value }</Button>
            )
        }
      </Button.Group>
    );
};

export {terms, TermSelector};

