import './App.css';
import HomePage from './HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SettingsPage from './SettingsPage';
import GamesPage from './GamesPage';
import Quizgame from './Quizgame';
import QuizgamePage2 from './QuizgamePage2';
function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/settings" element={<SettingsPage/>} />
            <Route path="/games" element={<GamesPage/>} />
            <Route path="/quiz" element={<Quizgame/>} />
            <Route path="/quizgamepage2" element={<QuizgamePage2/>} />
          </Routes>
      </Router>
    </div>
  );
}
export default App;
