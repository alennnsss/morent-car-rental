import { Composition, Still } from 'remotion'
import { Cover } from './Cover'
import { Reel } from './Reel'
import { DURATION, FPS, HEIGHT, WIDTH } from './theme'

export const RemotionRoot = () => (
    <>
        <Composition
            id="MorentReel"
            component={Reel}
            durationInFrames={DURATION}
            fps={FPS}
            width={WIDTH}
            height={HEIGHT}
        />
        <Still
            id="CoverHook"
            component={Cover}
            defaultProps={{ variant: 'hook' as const }}
            width={WIDTH}
            height={HEIGHT}
        />
        <Still
            id="CoverProduct"
            component={Cover}
            defaultProps={{ variant: 'product' as const }}
            width={WIDTH}
            height={HEIGHT}
        />
    </>
)
