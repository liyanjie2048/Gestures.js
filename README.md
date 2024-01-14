# Liyanjie.Gestures.js

JavaScript����ʶ��

- #### GestureRecognizer
    ��������ʶ����������ʶ������
  - Usage
    ```javascript
    const element = document.querySelector('.gesturearea');
    //Register gesture recognizers
    const gestureRecognizer = new GestureRecognizer(
        [
            //Recognizers here
        ], 
        edgeDistance="default 75",      //ʶ��Ϊ��Ե�ľ���(e.detail.startEdge: GestureEdge)
        enable="default true",
        preventDefault="default true",
        stopPropagation="default true"
    );
    element.addEventListener("pointerdown", (e) => gestureRecognizer.pointerDown(e));
    element.addEventListener("pointermove", (e) => gestureRecognizer.pointerMove(e));
    element.addEventListener("pointerup", (e) => gestureRecognizer.pointerUp(e));
    element.addEventListener("pointerleave", (e) => gestureRecognizer.pointerLeave(e));
    
    //Then listen gesture events
    element.addEventListener(
        eventname, //tap|doubletap|longpress|pan|panend|pinch|pinchend|pinchin|pinchout|rotate|rotateend|rotatecw|rotateccw|swipe|swipeend|swipeup|swipedown|swipeleft|swiperight,
        callback);
    ```
  - Also
    ```javascript
    const element = document.querySelector('.gesturearea');
    const gestureRecognizer = new GestureRecognizerWrapper(
        element,
        [
            //Recognizers here
        ],
        edgeDistance="default 75",      //ʶ��Ϊ��Ե�ľ���(Read from e.detail.edge: GestureEdge)
        enable="default true",
        preventDefault="default true",
        stopPropagation="default true");
  
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
            minDuration="default 500",  //ʶ��ΪLongPress����Сmillionseconds
            maxDistance="default 10"    //ʶ��ΪTap�����pointermove distance
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
            minScale="default 0"  //����PinchIn��PinchOut����Сscale
        ),
    ]
    ```
- #### RotateGestureRecognizer
  - Usage
    ```javascript
    [
        new RotateGestureRecognizer(
            minAngle="default 10"  //����RotateLeft��RotateRight����Сangle
        ),
    ]
    ```
- #### SwipeGestureRecognizer
  - Usage
    ```javascript
    [
        new SwipeGestureRecognizer(
            direction="default GestureDirection.Horizontal",  //������ϣ�Up|Down==Vertical or Left|Right == Horizontal or Up|Down|Left|Right == Horizontal|Vertical
            maxDuration="default 300",  //ʶ��SwipeUp��SwipeDown��SwipeLeft��SwipeRight�����millionseconds
            minDistance="default 20"    //ʶ��SwipeUp��SwipeDown��SwipeLeft��SwipeRight�����pointermove distance
        ),
    ]
    ```
- #### TapGestureRecognizer
  - Usage
    ```javascript
    [
        new TapGestureRecognizer(
            maxDuration="default 200",         //ʶ��DoubleTap�����millionseconds
            maxDistance="default 10",          //ʶ��ΪTap�����pointermove distance
            allowDoubleTap="default true",
            maxDoubleTapDistance="default 20"  //ʶ��ΪDoubleTap�����pointermove distance
        ),
    ]
    ```
- #### �Զ�������ʶ��
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