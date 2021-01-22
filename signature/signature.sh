#!/usr/bin/env bash

APK_TYPE="$1"
SRC_RELEASE_APK_PATH="../platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk"
SRC_DEBUG_APK_PATH="../platforms/android/app/build/outputs/apk/debug/app-debug.apk"
SRC_APK_PATH=""
TYPE_RELEASE="release"
TYPE_DEBUG="debug"
KEYSTORE_PWD="android.gmt"

if [ "$APK_TYPE" == "$TYPE_RELEASE" ]; then
   SRC_APK_PATH=$SRC_RELEASE_APK_PATH
elif [ "$APK_TYPE" == "$TYPE_DEBUG" ]; then
   SRC_APK_PATH=$SRC_DEBUG_APK_PATH
else
   echo "================================================="
   echo "Usage:"
   echo "./signature.sh $TYPE_RELEASE (sign release apk)"
   echo "./signature.sh $TYPE_DEBUG (sign debug apk)"
   echo "================================================="
   exit 0
fi

if [ -z "$SRC_APK_PATH" ]; then
   echo "Error: apk path is null, exit"
   exit 0
elif [ ! -e "$SRC_APK_PATH" ];then
   echo "Error: apk path ($SRC_APK_PATH) not exist, exit"
   exit 0
fi

rm *.apk
cp $SRC_APK_PATH app.apk
mv app.apk app.zip
zip -d app.zip META-INF/*
mv app.zip app.apk

expect -c "
set timeout -1;
spawn -noecho jarsigner -keystore gmt.keystore -signedjar app-signed.apk -digestalg SHA1 -sigalg SHA1withRSA app.apk gmt.keystore;
while (true) {
expect {
    \"Enter Passphrase for keystore:\" {
        send $KEYSTORE_PWD\r
        break
    }
    \"输入密钥库的密码短语:\" {
        send $KEYSTORE_PWD\r
        break
    }
    timeout {
    break
}
};
}
interact;
"
zipalign -v 4 app-signed.apk app-signed-zipalign.apk
