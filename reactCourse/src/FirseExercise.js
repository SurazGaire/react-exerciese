

const App = () => {
    const course = {
      name: 'Half Stack Application Development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10
        },
        {
          name: 'Using props to pass data',
          exercises: 7
        },
        {
          name: 'State of a component',
          exercises: 14
        }
      ]
  
    }
   
    return (
      <div>
        <Header course={course} />
        <Content parts = {course.parts} />
      </div>
    )
  }
  
  const Header = (props) => {
    console.log(props.name);
    return (<h1>{props.name}</h1>)
  }
  
  const Content = (props) => {
    console.log(props);
    return(
      <div>
      <p>{props.name}</p>
      </div>
    )
  }
  
  // const Total = () => {
  
  // }
  
  
  
  export default App;
  