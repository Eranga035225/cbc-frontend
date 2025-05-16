import './App.css'
import Header from './components/header'
import ProductCard from './components/productCard'

function App() {

  return (
    <>
       <Header/>
       <ProductCard name="Appple lap" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quia." price="1000" image="https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI"></ProductCard>
       
    </>
      
  )
}

export default App
