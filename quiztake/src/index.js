import React, {Component} from "react";
import ReactDOM from "react-dom";
import "./assets/style.css";
import quizService from "./quizService";
import QuestionBox from "./components/QuestionBox";
import Result from "./components/Result";
class QuizTake extends Component{
    state = {
        questionBank: []
    };
    getQuestions = () => {
        quizService().then(question => {
            this.setState({
                questionBank: question,
                score: 0,
                responses: 0
            });
        });
    };

    computeAnswer = (answer,correctAnswer) => {
        if(answer == correctAnswer){
            this.setState({
                score: this.state.score + 1
            });
        }
        this.setState({
            responses: this.state.responses < 5 ? this.state.responses + 1 : 5 
        });
    } 

    playAgain = () => {
        this.getQuestions();
        this.setState({
            score: 0,
            responses: 0
        })
    }

    componentDidMount(){
        this.getQuestions();
    }
    render(){
        return(
            <div className="body">
                <div className="container">
                    <div className="title">QuizTake</div>
                    {
                        this.state.questionBank.length > 0 && 
                        this.state.responses < 5 && 
                        this.state.questionBank.map(
                            ({question, answers, correct, questionId}) => (
                                <QuestionBox question={question} options={answers} key={questionId} selected={
                                    answer=> this.computeAnswer(answer, correct)   
                                }></QuestionBox>
                            )
                        )
                    }

                    {
                        this.state.responses === 5 ? (
                            <Result score={this.state.score} playAgain={this.playAgain}></Result>
                        ) : null
                    }
                </div>
            </div>
        );
    }
}

ReactDOM.render(<QuizTake />, document.getElementById("root"));