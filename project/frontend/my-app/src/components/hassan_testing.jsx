import React, { useEffect, useState } from "react";
const imageUrl = process.env.REACT_APP_API_URL+"/test1";
const imageUrl2 = "C:/Users/Hp/Desktop/demo_image.jpg";

export default function ImgReturner() {
    const [img, setImg] = useState();

    const fetchImage = async () => {
        const res = await fetch(imageUrl);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImg(imageObjectURL);
    };

    useEffect(() => {
        fetchImage();
    }, []);

    return (
        <>
            <p>DOES THIS WORK!</p>
            <img src={imageUrl2} alt="icons" width={20} height={20} />
        </>
    );
}