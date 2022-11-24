import { useState, useEffect } from "react"

function getWindowDimensions(){
    const {innerWidth : width}  = window;
    return width;
}

export default function useWindowDimensions () {
    const [windowWidth, setWindowWidth] = useState(getWindowDimensions());

    useEffect(()=>{
        function handleResize(){
            setWindowWidth(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return ()=> window.removeEventListener('resize', handleResize);
    },[]);

    return windowWidth;
};
