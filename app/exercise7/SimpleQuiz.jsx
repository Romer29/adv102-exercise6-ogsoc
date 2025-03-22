import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const QuizApp = () => {
    const [numQuestions, setNumQuestions] = useState('10');
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [quizStarted, setQuizStarted] = useState(false);
    const router = useRouter();

    const fetchQuestions = async () => {
        const amount = Math.max(10, Math.min(30, parseInt(numQuestions, 10)));
        try {
            const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=18&type=multiple`);
            const data = await response.json();
            if (data.results) {
                const formattedQuestions = data.results.map(q => ({
                    ...q,
                    answers: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5)
                }));
                setQuestions(formattedQuestions);
                setCurrentIndex(0);
                setScore(0);
                setSelectedAnswer(null);
                setQuizCompleted(false);
                setQuizStarted(true);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch questions');
        }
    };

    const handleAnswer = (answer) => {
        setSelectedAnswer(answer);
        if (answer === questions[currentIndex].correct_answer) {
            setScore(score + 1);
        }
        setTimeout(() => {
            if (currentIndex + 1 < questions.length) {
                setCurrentIndex(currentIndex + 1);
                setSelectedAnswer(null);
            } else {
                setQuizCompleted(true);
            }
        }, 1000);
    };

    return (
        <View style={{ flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
            <TouchableOpacity style={{ position: 'absolute', top: 40, left: 20, padding: 10 }} onPress={() => router.push("../(tabs)/exercises")}> 
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            {!quizStarted && (
                <Text style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>Simple Quiz using API</Text>
            )}
            {!quizStarted ? (
                <View style={{ alignItems: 'center' }}>
                    <TextInput
                        value={numQuestions}
                        onChangeText={setNumQuestions}
                        keyboardType="numeric"
                        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
                        placeholder="Enter number of questions (10-30)"
                    />
                    <TouchableOpacity onPress={fetchQuestions} style={{ padding: 10, backgroundColor: '#0D082E', borderRadius: 5 }}>
                        <Text style={{ color: '#fff', textAlign: 'center', fontSize: 16 }}>Start Quiz</Text>
                    </TouchableOpacity>
                </View>
            ) : quizCompleted ? (
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Quiz Completed!</Text>
                    <Text style={{ fontSize: 20 }}>Score: {score}/{questions.length}</Text>
                    <TouchableOpacity onPress={() => setQuizStarted(false)} style={{ marginTop: 20, padding: 10, backgroundColor: '#007BFF', borderRadius: 5 }}>
                        <Text style={{ color: '#fff', fontSize: 16 }}>Retry Quiz</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', flexGrow: 1, paddingVertical: '20%' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>Q{currentIndex + 1}: {questions[currentIndex].question}</Text>
                    {questions[currentIndex].answers.map((answer, index) => (
                        <TouchableOpacity key={index} onPress={() => handleAnswer(answer)}
                            style={{ padding: 10, marginVertical: 5, backgroundColor: selectedAnswer === answer ? '#ccc' : '#ddd', borderRadius: 5, width: '80%', alignItems: 'center' }}>
                            <Text>{answer}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}
        </View>
    );
};

export default QuizApp;
