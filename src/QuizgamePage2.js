import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './QuizgamePage2.css';

const QuizgamePage2 = () => {
    const [quizType, setQuizType] = useState("");

    useEffect(() => {
      const storedQuizType = localStorage.getItem('quizType');
      if (storedQuizType) {
        setQuizType(storedQuizType); // Retrieve quiz type from localStorage
      }
    }, []);

    const location = useLocation(); // Get the location object
    const navigate = useNavigate(); // Initialize navigate
    const { region, username } = location.state || {};

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [hasCompletedTask, setHasCompletedTask] = useState(false); // Track quiz completion
    const [isQuizCompleted, setIsQuizCompleted] = useState(false); // Track quiz completion status

    // Retrieve form data from localStorage or initialize with default values
    const [formData, setFormData] = useState(() => {
        const storedData = localStorage.getItem('formData');
        return storedData ? JSON.parse(storedData) : {
            dateofbirth: "",
            crickter: "",
            actor: "",
            car: "",
            bike: "",
            place: "",
            teacher: "",
            pet: "",
            hillstation: "",
            commonname: "",
        };
    });

    const questions = [
        { question: "What is your Date of Birth (dateofbirth)?", options: ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], field: 'dateofbirth' },
        { question: "Who is your favourite cricketer?", options: ["", "Sachin Tendulkar", "Virat Kohli", "MS Dhoni", "Ricky Ponting"], field: 'crickter' },
        { question: "Who is your favourite actor?", options: ["", "Shah Rukh Khan", "Salman Khan", "Aamir Khan", "Ranbir Kapoor"], field: 'actor' },
        { question: "Who is your favourite teacher?", options: ["", "Mr. Smith", "Mrs. Johnson", "Mr. Brown", "Ms. Taylor"], field: 'teacher' },
        { question: "What is your favourite bike?", options: ["", "Harley Davidson", "Ducati", "Yamaha", "Kawasaki"], field: 'bike' },
        { question: "What is your favourite hill station?", options: ["", "Ooty", "Coorg", "Ladakh", "Manali"], field: 'hillstation' },
        { question: "What is your favourite pet?", options: ["", "Dog", "Cat", "Both"], field: 'pet' },
        { question: "What is your common name calling by friends?", options: ["", "Chintu", "Nani", "Chinna"], field: 'commonname' },
        { question: "What is your favourite place?", options: ["", "Hyderabad", "Bangalore", "Delhi", "Andhra Pradesh"], field: 'place' },
        { question: "What is your favourite car?", options: ["", "Porsche", "Ducati", "Lamborghini", "Audi"], field: 'car' },
    ];

    useEffect(() => {
        // Fetch user data from Supabase to check if the user has completed the quiz
        const checkIfUserHasCompletedTask = async () => {
            const SUPABASE_URL = 'http://supabasekong-fkogkkkog0c0g80owkcg0c8c.94.130.24.223.sslip.io/rest/v1/quizdata';
            const SUPABASE_ANON_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTczMDk2Mzg4MCwiZXhwIjo0ODg2NjM3NDgwLCJyb2xlIjoiYW5vbiJ9.dSrwCws9VMFzfkVJkVhK_OYO392aF_AXmIAId2I5UDU';
            const SUPABASE_BEARER_KEY = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTczMDk2Mzg4MCwiZXhwIjo0ODg2NjM3NDgwLCJyb2xlIjoic2VydmljZV9yb2xlIn0.jhesUGxEvbryrMPDAlpGwSRCaxoGlFynBAbd0JyQHio';
            const headers = {
                'Content-Type': 'application/json',
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': SUPABASE_BEARER_KEY,
            };

            try {
                const response = await fetch(`${SUPABASE_URL}?username=eq.${username}`, { method: 'GET', headers: headers });
                const data = await response.json();

                if (data.length > 0) {
                    setHasCompletedTask(true); // User has completed the task
                }
            } catch (error) {
                console.error('Error checking user task status:', error);
            }
        };

        if (username) {
            checkIfUserHasCompletedTask();
        }
    }, [username]);

    const handleChange = (event) => {
        const { value } = event.target;
        const updatedFormData = { ...formData, [questions[currentQuestionIndex].field]: value };

        setFormData(updatedFormData);

        // Save the updated formData to localStorage
        localStorage.setItem('formData', JSON.stringify(updatedFormData));
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            postScoreToDatabase(); // Post data when quiz is complete
        }
    };

    const postScoreToDatabase = async () => {
        const SUPABASE_URL = 'http://supabasekong-fkogkkkog0c0g80owkcg0c8c.94.130.24.223.sslip.io/rest/v1/quizdata';
        const SUPABASE_ANON_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTczMDk2Mzg4MCwiZXhwIjo0ODg2NjM3NDgwLCJyb2xlIjoiYW5vbiJ9.dSrwCws9VMFzfkVJkVhK_OYO392aF_AXmIAId2I5UDU';
        const SUPABASE_BEARER_KEY = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTczMDk2Mzg4MCwiZXhwIjo0ODg2NjM3NDgwLCJyb2xlIjoic2VydmljZV9yb2xlIn0.jhesUGxEvbryrMPDAlpGwSRCaxoGlFynBAbd0JyQHio';
        const headers = {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': SUPABASE_BEARER_KEY,
        };

        if (!formData.dateofbirth) {
            console.error('Please select a valid dateofbirth.');
            return;
        }

        try {
            const response = await fetch(SUPABASE_URL, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    username: username,
                    region: region,
                    ...formData, // Post the entire form data
                }),
            });

            if (response.ok) {
                console.log('Data posted successfully!');
                setIsQuizCompleted(true); // Mark the quiz as completed
            } 
            
            else {
                const error = await response.json();
                console.error('Error posting data:', error);
            }
        } catch (error) {
            console.error('Error posting data:', error);
        }
       
    };

    const handleBack = () => {
        navigate('/games'); // Navigate to home page on 'Back' button click
    };

    if (isQuizCompleted) {
        return (
            <div className="text-center">
                <h1>Quiz completed</h1>
                <button className="btn btn-primary mt-3" onClick={handleBack}>
                    Back
                </button>
            </div>
        );
    }

    if (hasCompletedTask) {
        return (
            <div className="completed-task-message text-center">
                <h1>You have completed the task!</h1>
            </div>
        );
    }

    return (
        <div>
            {quizType}
            <section id="question-section" className="buytoken d-flex align-items-center justify-content-center">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className='col-md-12 text-center'>
                            <h1 className='lilita-one-regular'>Welcome to Quiz Questions</h1>
                            <div className='progress'>
                                <div
                                    className='progress-bar'
                                    style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                                >
                                    {currentQuestionIndex + 1} / {questions.length}
                                </div>
                            </div>
                            <div className='question lilita-one-regular'>
                                <p>{questions[currentQuestionIndex].question}</p>

                                <select
                                    className='form-select'
                                    value={formData[questions[currentQuestionIndex].field] || ""}
                                    onChange={handleChange}
                                >
                                    {questions[currentQuestionIndex].options.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                    ))}
                                </select>

                                <button 
                                    className="btn btn-primary mt-3" 
                                    onClick={handleNext}
                                    
                                >
                                    {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default QuizgamePage2;
