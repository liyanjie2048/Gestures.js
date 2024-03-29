# Liyanjie.Gestures.js

JavaScript手势识别

- #### GestureRecognizer
    声明手势识别器，用于识别手势
  - Usage
    ```javascript
    const element = document.querySelector('.gesturearea');

    //Register gesture recognizers
    registerGestures(
        element,
        [
            //Recognizers here
        ], 
        edgeDistance="default 75",      //识别为边缘的距离(e.detail.startEdge: GestureEdge)
        enable="default true",
        preventDefault="default true",
        stopPropagation="default true"
    );
    
    //Then listen gesture events
    element.addEventListener(
        eventname, //tap|doubletap|longpress|pan|panend|pinch|pinchend|pinchin|pinchout|rotate|rotateend|rotatecw|rotateccw|swipe|swipeend|swipeup|swipedown|swipeleft|swiperight,
        callback);
    ```
  - Also
    ```javascript
    const element = document.querySelector('.gesturearea');
    
    //Register gesture recognizers
    const gestureRecognizer = new GestureRecognizer(
        element,
        [
            //Recognizers here
        ], 
        edgeDistance="default 75",      //识别为边缘的距离(e.detail.startEdge: GestureEdge)
        enable="default true",
        preventDefault="default true",
        stopPropagation="default true"
    );
    document.addEventListener("pointerdown", (e) => element.contains(e.target) && gestureRecognizer.pointerDown(e));
    document.addEventListener("pointermove", (e) => element.contains(e.target) ? gestureRecognizer.pointerMove(e) : gestureRecognizer.pointerLeave(e));
    document.addEventListener("pointerup", (e) => element.contains(e.target) && gestureRecognizer.pointerUp(e));
    
    //Then listen gesture events
    element.addEventListener(
        eventname, //tap|doubletap|longpress|pan|panend|pinch|pinchend|pinchin|pinchout|rotate|rotateend|rotatecw|rotateccw|swipe|swipeend|swipeup|swipedown|swipeleft|swiperight,
        callback);
    ```
- #### LongPressGestureRecognizer
  - Usage
    ```javascript
    [
        new LongPressGestureRecognizer(
            minDuration="default 500",  //识别为LongPress的最小millionseconds
            maxDistance="default 10"    //识别为Tap的最大pointermove distance
        ),
    ]
    ```
- #### PanGestureRecognizer
  - Usage
    ```javascript
    [
        new PanGestureRecognizer(),
    ]
    ```
- #### PinchGestureRecognizer
  - Usage
    ```javascript
    [
        new PinchGestureRecognizer(
            minScale="default 0"  //触发PinchIn、PinchOut的最小scale
        ),
    ]
    ```
- #### RotateGestureRecognizer
  - Usage
    ```javascript
    [
        new RotateGestureRecognizer(
            minAngle="default 10"  //触发RotateLeft、RotateRight的最小angle
        ),
    ]
    ```
- #### SwipeGestureRecognizer
  - Usage
    ```javascript
    [
        new SwipeGestureRecognizer(
            direction="default GestureDirection.Horizontal",  //可以组合：Up|Down==Vertical or Left|Right == Horizontal or Up|Down|Left|Right == Horizontal|Vertical
            maxDuration="default 300",  //识别SwipeUp、SwipeDown、SwipeLeft、SwipeRight的最大millionseconds
            minDistance="default 20"    //识别SwipeUp、SwipeDown、SwipeLeft、SwipeRight的最大pointermove distance
        ),
    ]
    ```
- #### TapGestureRecognizer
  - Usage
    ```javascript
    [
        new TapGestureRecognizer(
            maxDuration="default 200",         //识别DoubleTap的最大millionseconds
            maxDistance="default 10",          //识别为Tap的最大pointermove distance
            allowDoubleTap="default true",
            maxDoubleTapDistance="default 20"  //识别为DoubleTap的最大pointermove distance
        ),
    ]
    ```
- #### 自定义手势识别
    ```typescript
    export class CustomGestureRecognizer implements IRecognizer
    {
        public gestureStart(e: GestureEventArgs)
        {
            //Code here
        }
        public gestureMove(e: GestureEventArgs)
        {
            //Code here
        }
        public gestureEnd(e: GestureEventArgs)
        {
            //Code here
        }
        public gestureLeave(e: GestureEventArgs)
        {
            //Code here
        }
    }
    ```