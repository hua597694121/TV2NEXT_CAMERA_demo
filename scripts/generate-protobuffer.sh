DIR=src/proto-resources
OUT_DIR=src/proto-model

for PROTO in $DIR/*.*
do
  JS=${PROTO##*/}
  echo pbjs $PROTO to $OUT_DIR/${JS/proto/js}
  pbjs -t static-module -w commonjs \
    -o $OUT_DIR/${JS/proto/js} \
    $PROTO \
    --force-number --no-encode --no-decode --no-verify

    echo pbts $OUT_DIR/${JS/proto/d.ts}
    pbts -o $OUT_DIR/${JS/proto/d.ts} $OUT_DIR/${JS/proto/js}
done
