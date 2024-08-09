import { LightningElement, track } from 'lwc';

// Datos del quiz (simulados)
const quizDataMock = [
    {
        id: 1,
        text: 'What is 2 + 2?',
        answers: [
            { id: '1', text: '4', isChecked: false },
            { id: '2', text: '5', isChecked: false },
            { id: '3', text: '6', isChecked: false }
        ]
    },
    {
        id: 2,
        text: 'What is the capital of France?',
        answers: [
            { id: '4', text: 'Paris', isChecked: false },
            { id: '5', text: 'Rome', isChecked: false },
            { id: '6', text: 'Berlin', isChecked: false }
        ]
    }
];

export default class QuizComponent extends LightningElement {
    @track quizData = [];
    @track currentQuestionIndex = 0;

    connectedCallback() {
        // Clonar los datos para evitar mutaciones inesperadas
        this.quizData = JSON.parse(JSON.stringify(quizDataMock));
    }

    get currentQuestion() {
        return this.quizData[this.currentQuestionIndex];
    }

    handleCheckboxChange(event) {
        const questionId = this.currentQuestion.id;
        const answerId = event.target.dataset.answer;
        const isChecked = event.target.checked;

        // Actualizar isChecked en el objeto de respuesta correspondiente
        const answer = this.currentQuestion.answers.find(answer => answer.id === answerId);
        console.log('answer: ',answer);
        if (answer) {
            answer.isChecked = isChecked;
        }
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
        }
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.quizData.length - 1) {
            this.currentQuestionIndex++;
        }
    }

    submitQuiz() {
        // Salida de respuestas seleccionadas para cada pregunta
        console.log('Selected Answers:', this.quizData);
        // Aquí normalmente enviarías los datos al servidor o realizarías acciones adicionales
    }
}
