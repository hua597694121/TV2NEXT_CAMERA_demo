# TV2NEXT_CAMERA_demo

# Requirement

- We have two or more cameras to take the pictures every 1 second, we want to show the pictures and the history on the Mobile Phone, the user also can filter pictures with timestamp.



# Questions 
-  What will you do? Describe it from scratch e.g. Concept first and so on…
  
-  Please design the sample UX and design implementation code with any languages 
are allow… 

- If we already have the Web APP, and we want to provide the iOS and Android as the application, how can we do?



# Answers

## Question 1

- Apply camera permission and features;
  
- Create a camera object, and get the number of camera and ID;

- Configuration parameters, specify the camera ID;

- Create a SurfaceVie object to preview imaging;

- Create a timer to take pictures automatically;

- Save the picure data to file and Store the photo URL、shooting timestamp、name、camera ID and other information，and do the local data persistence;

- Release camera resources after timing is complete;

- Create a history page, read local data information to obtain photo entries, and display them in a list;

- Filter photos such as by timestamp, then update the corresponding photo list.

## Question 2

I wrote a simple demo for the requirement. the Involved languages and framekwrok include:
- Language:  Typescrpt + JavaScript + Java + Objective-C
- Framework: Ionic + Angular + Cordova

### anroid
-  1. declare camera permission and feature in manifest to allow use of camera hardware and other related features.
```xml
<uses-feature android:name="android.hardware.camera" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

- 2. Before taking pictures, we need to get the number of cameras and ID. Then have the access to specify which camera to use by ID.
```java
    public static int[] getCameraId() {
        final int mNumberOfCameras = android.hardware.Camera.getNumberOfCameras();
        int mBackCameraId = -1;
        int mFrontCameraId = -1;
        final CameraInfo[] mInfo;

        mInfo = new CameraInfo[mNumberOfCameras];
        for (int i = 0; i < mNumberOfCameras; i++) {
            mInfo[i] = new CameraInfo();
            android.hardware.Camera.getCameraInfo(i, mInfo[i]);
        }

        // get the first (smallest) back and first front camera id
        for (int i = 0; i < mNumberOfCameras; i++) {
            if (mBackCameraId == -1 && mInfo[i].facing == CameraInfo.CAMERA_FACING_BACK) {
                mBackCameraId = i;
            } else if (mFrontCameraId == -1 && mInfo[i].facing == CameraInfo.CAMERA_FACING_FRONT) {
                mFrontCameraId = i;
            }
        }
        return new int[] { mBackCameraId, mFrontCameraId };
    }
```

- 3. Create and open a Camera instance.
  ```java
   Camera.Parameters mParameters mCamera = Camera.open(BACK_CAMERA_ID);

  ```

- 4. Get and set camera parameters, such as previewSize、pictureSize、format
```java
mParameters = mCamera.getParameters();
mParameters.setXXXX();
mCamera.setParameters(mParameters);
```

- 5. Create a SurfaceView and SurfaceHolder to display the live image data coming from a camera
```xml
    <tv2.next.camera.PreviewFrameLayout
        android:id="@+id/frame_layout"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentLeft="true"
        android:layout_toLeftOf="@+id/buttons" >

        <FrameLayout
            android:id="@+id/frame"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content" >

            <SurfaceView
                android:id="@+id/camera_preview"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content" />

        </FrameLayout>
    </tv2.next.camera.PreviewFrameLayout.PreviewFrameLayout>
```

```java
mSurfaceView = (SurfaceView) findViewById(R.id.camera_preview);
mSurfaceHolder = mSurfaceView.getHolder();
mSurfaceHolder.addCallback(this);
mSurfaceHolder.setType(SurfaceHolder.SURFACE_TYPE_PUSH_BUFFERS);
```

then need implements SurfaceHolder.Callback in order to capture the callback events, and start preview.
```java
    @Override
    public void surfaceCreated(SurfaceHolder holder) {
        try {
            if (mCamera != null) {
                mCamera.setPreviewDisplay(mSurfaceHolder);
                mCamera.setDisplayOrientation(orientation);
                mCamera.startPreview();
            }
        } catch (IOException e) { }
    }

    @Override
    public void surfaceChanged(SurfaceHolder holder, int format, int width, int height) { }

    @Override
    public void surfaceDestroyed(SurfaceHolder holder) {
        stopPreview();
        mSurfaceHolder.removeCallback(this);
        mSurfaceHolder = null;
    }
```

- 6. Capturing picture, and save data to file. we need invoke takePicture() and implement PictureCallback interface.
```java
    mCamera.takePicture(null, null, pictureCallBack);

    private PictureCallback pictureCallBack = new Camera.PictureCallback() {

        @Override
        public void onPictureTaken(byte[] data, Camera camera) {
            File pictureFile = getOutputMediaFile(MEDIA_TYPE_IMAGE);
            try {
                FileOutputStream fos = new FileOutputStream(pictureFile);
                fos.write(data);
                fos.close();
            } catch (IOException e) {
            }
        }
    };
```

- 7. in order to take picture automatically each one second, can use a handle as a timer.
```java
    private static final int MSG_STOP_PICTURE = 14;
    private static final int MSG_TAKE_PICTURE = 15;
    private static final int INTERVAL = 1000;
    private int mPassedSecond = 0;
    private Handler mHandler = new Handler() {
        @Override
        public void handleMessage(android.os.Message msg) {
            if (msg.what == MSG_STOP_PICTURE) {
                stopTakePicture();
            } else if (msg.what == MSG_TAKE_PICTURE) {
                mPassedSecond++;
                if (mPassedSecond <= mTargetCount) {
                    startTakePicture(mCameraId);
                    mHandler.sendEmptyMessageDelayed(MSG_TAKE_PICTURE, INTERVAL);
                }
            }
        };
    };
```


## Question 3
- we can use the Ionic Framework, an advanced HTML5 mobile application framework , to develop hybrid application.
we can add mobile platform and build it via ionic and cordova CLI, installed global by npm tool.
```shell
ionic cordova platform add [android / ios]
ionic cordova build android/ios --prod ---release
```

- At the same time, the native api bridge and call are carried out through Cordova integrated with the IONIC framework

- for the Camera requirement. need use Plugman CLI to customize a  cordova plugin to use camera functions  on Android and iOS platform.
- - here is the steps to create a customize native plugin by plugman.
```shell
# install the global plugman tool
npm install -g plugman

# create a plugin
plugman create --name cordova-plugin-hxl-camera --plugin_id cordova-plugin-camera --plugin_version 0.0.1

# add a plugin platform, such as android
plugman platform add --platform_name android

### make www direcotry and create a Camera.js file, define the bridge method to commucation with js and android/ios native api. like
#   exec(successCallback, errorCallback, 'Camera', 'takePicture', args)
#   exec(successCallback, errorCallback, 'Camera', 'getCameraIDs', args)

# use npm cli to generate a package.json configration
npm init

# import customize plugin to project
ionic cordova plugin add cordova-plugin-hxl-camera
```

- - then write the native api to implement camera feature, and create a plugin.xml to declare all related file and js interface. 
```xml
<plugin xmlns="http://apache.org/cordova/ns/plugins/1.0" xmlns:android="http://schemas.android.com/apk/res/android" id="cordova-plugin-camera" version="0.0.1">
    <name>Camera</name>

    <engines>
        <engine name="cordova" version=">=7.1.0"/>
        <engine name="cordova-android" version=">=6.3.0" />
    </engines>

    <js-module src="www/CameraConstants.js" name="Camera">
        <clobbers target="Camera" />
    </js-module>

    <js-module src="www/CameraPopoverOptions.js" name="CameraPopoverOptions">
        <clobbers target="CameraPopoverOptions" />
    </js-module>

    <js-module src="www/Camera.js" name="camera">
        <clobbers target="navigator.camera" />
    </js-module>

    <!-- android -->
    <platform name="android">
        <config-file target="res/xml/config.xml" parent="/*">
            <feature name="Camera">
                <param name="android-package" value="tv2.next.camera.CameraLauncher"/>
            </feature>
        </config-file>
        <config-file target="AndroidManifest.xml" parent="/*">
            <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
        </config-file>
        <config-file target="AndroidManifest.xml" parent="application">
          <provider
              android:name="tv2.next.camera.FileProvider"
              android:authorities="${applicationId}.provider"
              android:exported="false"
              android:grantUriPermissions="true" >
              <meta-data
                  android:name="android.support.FILE_PROVIDER_PATHS"
                  android:resource="@xml/camera_provider_paths"/>
          </provider>
        </config-file>

        <source-file src="src/android/CameraLauncher.java" target-dir="src/tv2/next/camera" />
        <source-file src="src/android/CordovaUri.java" target-dir="src/tv2/next/camera" />
        <source-file src="src/android/FileHelper.java" target-dir="src/tv2/next/camera" />
        <source-file src="src/android/ExifHelper.java" target-dir="src/tv2/next/camera" />
        <source-file src="src/android/FileProvider.java" target-dir="src/tv2/next/camera" />
        <source-file src="src/android/xml/camera_provider_paths.xml" target-dir="res/xml" />

        <js-module src="www/CameraPopoverHandle.js" name="CameraPopoverHandle">
            <clobbers target="CameraPopoverHandle" />
          </js-module>

        <preference name="ANDROID_SUPPORT_V4_VERSION" default="27.+"/>
        <framework src="com.android.support:support-v4:$ANDROID_SUPPORT_V4_VERSION"/>

      </platform>

     <!-- ios -->
     <platform name="ios">
         <config-file target="config.xml" parent="/*">
             <feature name="Camera">
                 <param name="ios-package" value="CDVCamera" />
             </feature>
             <preference name="CameraUsesGeolocation" value="false" />
         </config-file>

         <js-module src="www/ios/CameraPopoverHandle.js" name="CameraPopoverHandle">
            <clobbers target="CameraPopoverHandle" />
         </js-module>

         <header-file src="src/ios/CDVCamera.h" />
         <source-file src="src/ios/CDVCamera.m" />
         <header-file src="src/ios/CDVExif.h" />
         <framework src="ImageIO.framework" weak="true" />
         <framework src="CoreGraphics.framework" />
         <framework src="AVFoundation.framework" />

     </platform>
```
- -  then via Cordova CallbackContext to return a async Promise object or Observable if set keepResult(true).
```java
                JSONObject data = new JSONObject();
                data.put("name", fileName);
                data.put("timeStamp", System.currentTimeMillis());
                data.put("date", date);
                data.put("id", id);
                data.put("url", js_out);
                this.callbackContext.success(data);
```

```oc
                NSMutableDictionary* returnObj = [NSMutableDictionary dictionary];
                [returnObj setValue:name forKey:@"name"];
                [returnObj setValue:timeStamp forKey:@"timeStamp"];
                [returnObj setValue:dateStr forKey:@"date"];
                [returnObj setValue:id forKey:@"id"];
                [returnObj setValue:toBase64(data) forKey:@"url"];
                result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:returnObj];
```

- -  on web, define a camera wich specified name in plugin plugin.xml <js-module>, to exec the takePicture api.
```ts
  const options = {
            quality: 80,
            destinationType: DestinationType.DATA_URL,
            encodingType: EncodingType.PNG,
            mediaType: MediaType.PICTURE,
            saveToPhotoAlbum: true,
            sourceType: PictureSourceType.CAMERA,
            targetWidth: 1200,
            targetHeight: 1600,
            cameraId:1
        }
        navigator.camera.getPicture(
            (data: PhotoInfo) => {
                console.log('Camera.getPicture: ' + JSON.stringify(data))
                this.storagePhotoInfo(data)
                this.toastService.popToast('Photo alreay saved!', Ion_Color.Success)
            },
            (error: any) => {
                console.log('openCamera error: ' + JSON.stringify(error))
            },
            options
        )
    }
```

- Based on Ionic + Cordovca framework, I used my spare time to write a simple demo, and upload it to GitHub, you can download and view the Implementation code and commit log.
https://github.com/hua597694121/TV2NEXT_CAMERA_demo.git


##  Last
What makes me sorry is that maybe the time plan is not in place, so in this demo, i have not created a custom camera application, but use the Intent to evoke the system camera app and take pictures. and missed timer requirement. So there are some discrepancies in the requirements. If there are more opportunities, I will fill this demand.

if you can't install the ipa file by iTunes or other tools, such as i4Tool, please tell me  your Apple email or your device ID, i can invate you join in the test group or updete the profile,
and after that , you can have the access to install the Hoc ipa.