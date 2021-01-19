#import <UIKit/UIKit.h>

@interface UIImage (CropScaleOrientation)

- (UIImage*)imageByScalingAndCroppingForSize:(CGSize)targetSize;
- (UIImage*)imageCorrectedForCaptureOrientation;
- (UIImage*)imageCorrectedForCaptureOrientation:(UIImageOrientation)imageOrientation;
- (UIImage*)imageByScalingNotCroppingForSize:(CGSize)targetSize;

@end