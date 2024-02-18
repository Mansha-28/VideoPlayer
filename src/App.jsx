import Playlist from './components/Playlist'

function App() {

  return (
    <div className='text-center'>
      <p className='m-5 text-3xl font-bold'>Video Player</p>
      
      <div className='mx-2'>
        <Playlist />
      </div>
    </div>
  )
}

export default App
