import React, { useState } from 'react'
import VideoPlayer from './VideoPlayer';

export default function Playlist() {

    const [videos, setVideos] = useState([
        { id: '1', title: 'Video 1', src: '/song.mp4' },
        { id: '2', title: 'Video 2', src: '/song.mp4' },
        { id: '3', title: 'Video 3', src: 'video.mp4' },
        { id: '4', title: 'Video 4', src: 'video.mp4' },
        { id: '5', title: 'Video 5', src: 'video.mp4' },
        { id: '6', title: 'Video 6', src: 'video.mp4' },
        { id: '7', title: 'Video 7', src: 'video.mp4' },
        { id: '8', title: 'Video 8', src: 'video.mp4' },
        { id: '9', title: 'Video 9', src: 'video.mp4' },
        { id: '10', title: 'Video 10', src: 'video.mp4' },
        { id: '11', title: 'Video 11', src: 'video.mp4' },
        { id: '12', title: 'Video 12', src: 'video.mp4' },
        { id: '13', title: 'Video 13', src: 'video.mp4' }
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

        <div className='flex'>
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
