import os
import cv2

def extract_frames(video_path, output_folder, fps, width, height):
    # Create the output folder if it doesn't exist
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Open the video file
    cap = cv2.VideoCapture(video_path)

    # Get the total number of frames in the video
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

    # Calculate the interval between frames based on the desired fps
    interval = int(cap.get(cv2.CAP_PROP_FPS) / fps)

    # Read the video frame by frame and save as images
    frame_number = 0
    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # Skip frames based on the interval
        if frame_number % interval == 0:
            # Resize the frame to the desired width and height
            frame = cv2.resize(frame, (width, height))

            # Save the frame as an image file
            image_path = os.path.join(output_folder, f"frame_{frame_number:04d}.jpg")
            cv2.imwrite(image_path, frame)

        frame_number += 1

    # Release the video capture object
    cap.release()

    print(f"Total frames in the video: {total_frames}")
    print(f"Extracted {frame_number} frames.")
    print(f"Frames saved in folder: {output_folder}")

if __name__ == "__main__":

  
    extract_frames('./aa.mp4', './output/', 24, 30, 30)