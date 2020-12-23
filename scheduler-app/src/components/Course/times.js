import {terms} from '../TermSelector';
import {db} from '../../shared/firebase';

const getCourseTerm = course => (
    terms[course.id.charAt(0)]
);

const getCourseNumber = course => (
    course.id.slice(1, 4)
)

const hasConflict = (course, selected) => (
    selected.some(selection => courseConflict(course, selection))
);

const courseConflict = (course1,course2) => (
    course1 !== course2
    && getCourseTerm(course1) === getCourseTerm(course2)
    && daysOverlap(course1.days, course2.days) && hoursOverlap(course1.hours, course2.hours)
);

const days = ["M", "Tu", "W", "Th", "F"];

const daysOverlap = (days1, days2) => {
    const dOverlap = (day) => days1.includes(day) && days2.includes(day);
    return days.some(dOverlap);
};
  
const hoursOverlap = (hours1, hours2) => (
    Math.max(hours1.start, hours2.start) < Math.min(hours1.end, hours2.end)
);

const meetsPat = /^ *((?:M|Tu|W|Th|F)+) +(\d\d?):(\d\d) *[ -] *(\d\d?):(\d\d) *$/;
const timeParts = meets => {
    const [match, days, hh1, mm1, hh2, mm2] = meetsPat.exec(meets) || [];
    return !match ? {} : {
        days,
        hours: {
        start: hh1 * 60 + mm1 * 1,
        end: hh2 * 60 + mm2 * 1
        }
    };
};

const saveCourse = (course, meets) => {
    db.child('courses').child(course.id).update({meets})
        .catch(error => alert(error));
};

const moveCourse = course => {
    const meets = prompt('Enter new meeting data, in this format:', course.meets);
    if (!meets) return;
    const {days} = timeParts(meets);
    if (days) saveCourse(course, meets); 
    else moveCourse(course);
};



export { getCourseTerm, getCourseNumber, hasConflict, moveCourse, timeParts };