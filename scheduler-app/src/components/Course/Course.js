import { Button } from 'rbx';
import { buttonColor } from '../../tools';
import { getCourseNumber, getCourseTerm, hasConflict, moveCourse } from './times';

const Course = ({ course, state, user }) => (
    <Button color ={ buttonColor(state.selected.includes(course)) }
      onClick = { () => state.toggle(course)}
      onDoubleClick={ user ? () => moveCourse(course) : null }
      disabled={ hasConflict(course, state.selected) }
      >
      { getCourseTerm(course) } CS { getCourseNumber(course) }: { course.title }
    </Button>
  );

export {Course, getCourseTerm};