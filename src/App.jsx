import AllEvents from './components/AllEvents'
import SelectedEvents from './components/SelectedEvents'
import './App.css'

function App() {
  return (
    <div className="w-screen h-screen grid grid-cols-2 divide-black divide-x font-sans">
      <AllEvents />
      <SelectedEvents />
    </div>
  );
}

export default App
