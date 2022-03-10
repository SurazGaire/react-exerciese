import { useState } from "react";

const Button = ({onClick,text}) => {
  return(
    <button onClick={onClick} > {text} </button>
  )

}

const Statistics = ({text,value}) => {
  return(
    <div>
        <table>
          <tbody>
            <tr>
              <td>{text}</td>
              <td>{value}</td>
            </tr>
          </tbody>
        </table>
    </div>
  )
} 
const App = () =>{
  const [countClick,allFeedback] = useState({good:0,neutral: 0, bad:0})

  const goodFeedback = () => {
    allFeedback({...countClick,good:countClick.good + 1})
  }

  const neutralFeedback = () => {
    allFeedback({...countClick,neutral:countClick.neutral + 1})
  }
  
  const badFeedback = () => {
    allFeedback({...countClick,bad:countClick.bad + 1})
  }

  const totalFeedbacks = () => {
    return countClick.good + countClick.neutral + countClick.bad;
  }

  const averageFeedbacks = () => {
    return (countClick.good + countClick.neutral + countClick.bad)/3;
  }

  if(totalFeedbacks()=== 0){
    return (
      <div>
      <h1>give feedback</h1>
      <Button onClick={goodFeedback} text='Good'/>
      <Button onClick={neutralFeedback} text='Neutral'/>
      <Button onClick={badFeedback} text='Bad'/>
      <h1>statistics</h1>
      <p>No feedback given</p>
      </div>
    )
  }
  return(
    <div>
      <h1>give feedback</h1>
      <Button onClick={goodFeedback} text='Good'/>
      <Button onClick={neutralFeedback} text='Neutral'/>
      <Button onClick={badFeedback} text='Bad'/>
      <h1>statistics</h1>
      <Statistics text='good' value={countClick.good} />
      <Statistics text='neutral' value={countClick.neutral} />
      <Statistics text='bad' value={countClick.bad} />
      <Statistics text='total' value={totalFeedbacks()} />
      <Statistics text='average' value={averageFeedbacks()} />
    </div>
    
  )
}

export default App;
