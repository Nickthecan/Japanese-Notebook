import { useState } from 'react'
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from '/src/pages/Home.jsx';
import Vocabulary from '/src/pages/Vocabulary.jsx';
function App() {

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route index element={<Home />}/>
					<Route path='/' element={<Home />}/>
					<Route path='/vocabulary-words' element={<Vocabulary />}/>
				</Routes>
			</BrowserRouter>
		</>
	)
  }

export default App
