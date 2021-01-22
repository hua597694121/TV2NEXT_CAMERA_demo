1. Rename the .apk file to .zip
2. Unpack the .zip file and remove the META-INF folder
3. Zip the folder again and rename it to .apk
4. Sign the apk:

jarsigner -keystore gmt.keystore -signedjar app-signed.apk -digestalg SHA1 -sigalg MD5withRSA app-debug.apk gmt.keystore
