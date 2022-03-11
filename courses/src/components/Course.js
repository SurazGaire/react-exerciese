import React from 'react';

const Course = ({course}) => {
    const parts = course.parts;
    console.log(parts);
    let totalExe = parts.reduce((tot,parts)=> tot = tot + parts.exercises,0);
   return(
       <div>
            <h1>{course.name}</h1>
            <ul>
                {parts.map(parts=><li key={parts.id}>{parts.name} {parts.exercises}</li>)}

                <h5>total of {totalExe} exercises</h5>
            </ul>
       </div>
    )
}

export default Course