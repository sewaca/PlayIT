import ReactCrop, { Crop } from "react-image-crop";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { Button } from "~/components";
import styles from "./avatar-crop.module.css";
import { setUserData } from "~/store";

interface AvatarCropProps {
  image: string;
  onFinish?: Function;
}

export default function AvatarCrop({
  image: imageSrc,
  onFinish = () => {},
}: AvatarCropProps) {
  const [crop, setCrop] = useState<Crop>();
  const imageRef = useRef<HTMLImageElement | null>(null);
  const dispatch = useDispatch();

  const getCroppedImage = () => {
    const canvas = document.createElement("canvas");
    const image = new Image();
    image.src = imageSrc;
    image.addEventListener("load", () => {
      const maxWidth = 0.95 * document.body.clientWidth;
      const maxHeight = 0.95 * document.body.clientHeight - 40;

      // real width (height) of image / rendered width (height)
      const multiplier = {
        width:
          image.width /
          Math.min(
            maxWidth,
            maxHeight / (image.height / image.width),
            image.width
          ),
        height:
          image.height /
          Math.min(
            maxHeight,
            maxWidth / (image.width / image.height),
            image.height
          ),
      };

      canvas.width = (crop?.width || 0) * multiplier.width;
      canvas.height = (crop?.height || 0) * multiplier.height;

      const ctx = canvas.getContext("2d");
      ctx?.drawImage(
        image,
        (crop?.x || 0) * multiplier.width * -1,
        (crop?.y || 0) * multiplier.height * -1
      );
      dispatch(
        setUserData({
          avatar: canvas.toDataURL("image/jpg", 1) || undefined,
        })
      );
    });
  };

  const handleSubmit = () => {
    getCroppedImage();
    onFinish();
  };

  return (
    <div className={styles.CropModal}>
      <ReactCrop
        className={styles.CropBlock}
        crop={crop}
        aspect={1}
        ruleOfThirds={true}
        onChange={(c) => setCrop(c)}
      >
        <img ref={imageRef} src={imageSrc} />
      </ReactCrop>
      <div className={styles.buttonsLine}>
        <Button onClick={onFinish}>Отмена</Button>
        <Button onClick={handleSubmit}>OK</Button>
      </div>
    </div>
  );
}
