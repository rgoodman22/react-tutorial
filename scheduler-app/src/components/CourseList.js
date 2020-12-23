import React, { useState } from 'react';
import { Button } from 'rbx';
import {Course, getCourseTerm} from './Course';
import { timeParts } from './Course/times';
import {TermSelector} from './TermSelector';

const addCourseTimes = course => ({
    ...course,
    ...timeParts(course.meets),
});
  
  const addScheduleTimes = schedule => ({
    title: schedule.title,
    courses: Object.values(schedule.courses).map(addCourseTimes)
});

const useSelection = () => {
    const [selected, setSelected] = useState([]);
    const toggle = (x) => {
      setSelected(selected.includes(x) ? selected.filter(y =>y !==x ) : [x].concat(selected))
    };
    return [ selected, toggle ];
};

const CourseList = ({ courses, user}) => {
    const [term, setTerm] = useState('Fall');
    const [selected, toggle] = useSelection();
    const termCourses=courses.filter(course=>term===getCourseTerm(course));
  
    return (
      <React.Fragment>
        <TermSelector state= { {term, setTerm } }></TermSelector>
        <Button.Group>
          { termCourses.map(course => <Course key={ course.id } course={ course } 
                                        state={ { selected, toggle } }
                                        user={ user }/>) }
        </Button.Group>
      </React.Fragment>
    );
  };


export {CourseList, addScheduleTimes};