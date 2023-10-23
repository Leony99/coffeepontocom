import { StyleSheet } from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';

type Props = {
    onComplete: (status: boolean) => void;
}

export function Splash({ onComplete }: Props) {

    function onPlaybackStatusUpdate(status: AVPlaybackStatus) {
        if (status.isLoaded) {
            if(status.didJustFinish) {
                return(
                    onComplete(true)
                )
            }
        }
    }

    return (
        <Video
        style = {StyleSheet.absoluteFill}
        resizeMode = {ResizeMode.COVER}
        source = {require("../assets/splash.mp4")}
        shouldPlay = {true}
        isLooping = {false}
        onPlaybackStatusUpdate={onPlaybackStatusUpdate}>
        </Video>
    )
}