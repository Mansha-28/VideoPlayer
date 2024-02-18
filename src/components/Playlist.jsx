import React, { useState } from 'react'
import VideoPlayer from './VideoPlayer';

export default function Playlist() {

    const [videos, setVideos] = useState([
        { id: '1', title: 'Introduction', src: '/ReactJS Tutorial - 1 - Introduction.mp4' },
        { id: '2', title: ' Hello World ', src: '/ReactJS Tutorial - 2 - Hello World.mp4' },
        { id: '3', title: ' Folder Structure', src: '/ReactJS Tutorial - 3 - Folder Structure.mp4' },
        { id: '4', title: ' Components ', src: '/ReactJS Tutorial - 4 - Components.mp4' },
        { id: '5', title: 'Functional Components ', src: '/ReactJS Tutorial - 5 - Functional Components.mp4' },
        { id: '6', title: 'Class Components ', src: '/ReactJS Tutorial - 6 - Class Components.mp4' }
    ])

    const [currentVideo, setCurrentVideo] = useState(null);

    const handleDragStart = (e, index) => {
        e.dataTransfer.setData('index', index);
      };
    
      const handleDragOver = (e) => {
        e.preventDefault();
      };
    
      const handleDrop = (e, dropIndex) => {
        const dragIndex = parseInt(e.dataTransfer.getData('index'));
        const newVideos = [...videos];
        const dragItem = newVideos[dragIndex];
    
        // Remove item from original position
        newVideos.splice(dragIndex, 1);
    
        // Add item to new position
        newVideos.splice(dropIndex, 0, dragItem);
    
        setVideos(newVideos);
      };

      const playVideo = (item) => {
        console.log("playing video", item)
        setCurrentVideo(item);
      }

  return (
    <div className='justify-center items-end'>

        <div className='md:flex'>
            {
                currentVideo && 
                <div className='w-[70%]'>
                    <VideoPlayer src={currentVideo.src} autoplay={false} />
                </div>
            }
            <div className={currentVideo ? 'w-[30%]' : 'w-[40%] m-auto'}>
                <p className='text-xl font-bold bg-gray-300 p-2'>Playlist</p>
                {videos.map((item, index) => (
                <ul
                    className='border-black border-2 p-2 mt-2'
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e)}
                    onDrop={(e) => handleDrop(e, index)}
                    onClick={(e)=>playVideo(item)}
                >
                    {item.title}
                </ul>
                ))}
            </div>
        </div>



    </div>
  )
}
